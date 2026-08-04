import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { connectDB } from '@/lib/mongodb'
import Order from '@/models/Order'
import { sendStatusEmail } from '@/lib/email'

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    await connectDB()
    const { id } = await params
    const order = await Order.findById(id).lean()

    if (!order) {
      return NextResponse.json({ success: false, error: 'Order not found' }, { status: 404 })
    }

    return NextResponse.json({ success: true, data: order })
  } catch (error) {
    console.error('[GET /api/orders/[id]]', error)
    return NextResponse.json({ success: false, error: 'Failed to fetch order' }, { status: 500 })
  }
}

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
    }

    await connectDB()
    const { id } = await params
    const body = await req.json()

    const allowedFields = ['orderStatus', 'paymentStatus', 'notes', 'whatsappConfirmed', 'screenshotUrl']
    const update: Record<string, unknown> = {}
    for (const field of allowedFields) {
      if (body[field] !== undefined) update[field] = body[field]
    }

    // Fetch before update so we can compare what changed and have customer details
    const before = await Order.findById(id).lean() as {
      customer: { name: string; email: string }
      orderNumber: string
      total: number
      paymentMethod: string
      orderStatus: string
      paymentStatus: string
    } | null

    const order = await Order.findByIdAndUpdate(id, update, { new: true })

    if (!order || !before) {
      return NextResponse.json({ success: false, error: 'Order not found' }, { status: 404 })
    }

    // Fire customer notification in background when a meaningful status changes
    const orderStatusChanged = body.orderStatus && body.orderStatus !== before.orderStatus
    const paymentStatusChanged = body.paymentStatus && body.paymentStatus !== before.paymentStatus

    if (orderStatusChanged || paymentStatusChanged) {
      sendStatusEmail({
        orderNumber: before.orderNumber,
        customerName: before.customer.name,
        customerEmail: before.customer.email,
        total: before.total,
        ...(orderStatusChanged ? { orderStatus: body.orderStatus } : {}),
        ...(paymentStatusChanged ? { paymentStatus: body.paymentStatus } : {}),
      }).catch((err) => console.error('[email] sendStatusEmail error:', err))
    }

    return NextResponse.json({ success: true, data: order })
  } catch (error) {
    console.error('[PATCH /api/orders/[id]]', error)
    return NextResponse.json({ success: false, error: String(error) }, { status: 500 })
  }
}
