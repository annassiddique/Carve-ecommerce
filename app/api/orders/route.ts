import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { connectDB } from '@/lib/mongodb'
import Order from '@/models/Order'
import { sendOrderEmails } from '@/lib/email'
import { sendWhatsAppNotification } from '@/lib/whatsapp'

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
    }

    await connectDB()
    const { searchParams } = new URL(req.url)

    const filter: Record<string, unknown> = {}

    const status = searchParams.get('status')
    if (status && status !== 'all') filter.orderStatus = status

    const payment = searchParams.get('payment')
    if (payment && payment !== 'all') filter.paymentMethod = payment

    const paymentStatus = searchParams.get('paymentStatus')
    if (paymentStatus) filter.paymentStatus = paymentStatus

    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '20')
    const skip = (page - 1) * limit

    const [orders, total] = await Promise.all([
      Order.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit).lean(),
      Order.countDocuments(filter),
    ])

    return NextResponse.json({
      success: true,
      data: orders,
      pagination: { page, limit, total, pages: Math.ceil(total / limit) },
    })
  } catch (error) {
    console.error('[GET /api/orders]', error)
    return NextResponse.json({ success: false, error: 'Failed to fetch orders' }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    await connectDB()
    const body = await req.json()

    const subtotal = body.items.reduce(
      (sum: number, item: { price: number; quantity: number }) => sum + item.price * item.quantity,
      0
    )

    const total = body.total ?? subtotal
    const shippingFee = total - subtotal

    const paymentStatus =
      body.paymentMethod === 'easypaisa' && body.screenshotUrl
        ? 'screenshot_submitted'
        : 'pending'

    const order = await Order.create({
      ...body,
      subtotal,
      total,
      paymentStatus,
      orderNumber: 'ORD-' + Date.now() + '-' + Math.floor(Math.random() * 1000),
    })

    await Promise.all([
      sendOrderEmails({
      orderNumber: order.orderNumber,
      customer: body.customer,
      items: body.items,
      subtotal,
      shippingFee,
      total,
      paymentMethod: body.paymentMethod,
      screenshotUrl: body.screenshotUrl,
    }),
      sendWhatsAppNotification({
        orderNumber: order.orderNumber,
        customerName: body.customer?.name ?? 'Unknown',
        total,
        paymentMethod: body.paymentMethod,
        city: body.customer?.city ?? '',
      }),
    ])

    return NextResponse.json({ success: true, data: order }, { status: 201 })
  } catch (error) {
    console.error('[POST /api/orders]', error)
    return NextResponse.json({ success: false, error: String(error) }, { status: 500 })
  }
}
