import { notFound } from 'next/navigation'
import { connectDB } from '@/lib/mongodb'
import Order from '@/models/Order'
import { IOrder } from '@/types'
import { formatPrice } from '@/lib/utils'
import Image from 'next/image'
import Badge from '@/components/ui/Badge'
import OrderStatusControls from './OrderStatusControls'

async function getOrder(id: string): Promise<IOrder | null> {
  try {
    await connectDB()
    const order = await Order.findById(id).lean()
    if (!order) return null
    return JSON.parse(JSON.stringify(order))
  } catch {
    return null
  }
}

export default async function OrderDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const order = await getOrder(id)
  if (!order) notFound()

  const paymentBadgeMap: Record<string, 'gold' | 'green' | 'red' | 'gray' | 'yellow'> = {
    pending: 'gray',
    screenshot_submitted: 'yellow',
    approved: 'green',
    rejected: 'red',
  }
  const orderBadgeMap: Record<string, 'gold' | 'green' | 'red' | 'gray' | 'yellow'> = {
    pending: 'gray',
    confirmed: 'gold',
    processing: 'yellow',
    shipped: 'gold',
    delivered: 'green',
    cancelled: 'red',
  }

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <p className="font-body text-xs tracking-widest uppercase text-carve-mink mb-1">Order</p>
          <h1 className="font-display text-3xl text-carve-charcoal">{order.orderNumber}</h1>
        </div>
        <a href="/dashboard/orders" className="font-body text-sm text-carve-mink hover:text-carve-gold">
          ← Back to Orders
        </a>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Main info */}
        <div className="lg:col-span-2 space-y-5">
          {/* Items */}
          <div className="bg-carve-ivory border border-carve-champagne rounded-sm p-5">
            <h2 className="font-display text-xl text-carve-charcoal mb-4">Items</h2>
            <div className="divide-y divide-carve-smoke">
              {order.items.map((item, i) => (
                <div key={i} className="flex items-center gap-4 py-3">
                  <div className="relative w-14 h-14 rounded-sm overflow-hidden bg-carve-smoke flex-shrink-0">
                    {item.image && <Image src={item.image} alt={item.name} fill className="object-cover" sizes="56px" />}
                  </div>
                  <div className="flex-1">
                    <p className="font-body text-sm font-medium text-carve-charcoal">{item.name}</p>
                    <p className="font-body text-xs text-carve-mink">x{item.quantity}</p>
                  </div>
                  <span className="font-body text-sm font-medium text-carve-charcoal">
                    {formatPrice(item.price * item.quantity)}
                  </span>
                </div>
              ))}
            </div>
            <div className="border-t border-carve-champagne pt-3 mt-3 space-y-1">
              <div className="flex justify-between font-body text-sm text-carve-mink">
                <span>Subtotal</span><span>{formatPrice(order.subtotal)}</span>
              </div>
              <div className="flex justify-between font-display text-lg text-carve-charcoal font-medium">
                <span>Total</span><span>{formatPrice(order.total)}</span>
              </div>
            </div>
          </div>

          {/* Customer */}
          <div className="bg-carve-ivory border border-carve-champagne rounded-sm p-5">
            <h2 className="font-display text-xl text-carve-charcoal mb-4">Customer</h2>
            <div className="space-y-2 font-body text-sm">
              <p><span className="text-carve-mink w-20 inline-block">Name</span>{order.customer.name}</p>
              <p><span className="text-carve-mink w-20 inline-block">Email</span>{order.customer.email}</p>
              <p><span className="text-carve-mink w-20 inline-block">Phone</span>{order.customer.phone}</p>
              <p><span className="text-carve-mink w-20 inline-block">Address</span>{order.customer.address}</p>
              <p><span className="text-carve-mink w-20 inline-block">City</span>{order.customer.city}</p>
            </div>
          </div>

          {/* EasyPaisa screenshot */}
          {order.paymentMethod === 'easypaisa' && order.screenshotUrl && (
            <div className="bg-carve-ivory border border-yellow-200 rounded-sm p-5">
              <h2 className="font-display text-xl text-carve-charcoal mb-4">Payment Screenshot</h2>
              <div className="relative w-full max-w-sm aspect-[3/4] rounded-sm overflow-hidden border border-carve-champagne">
                <Image
                  src={order.screenshotUrl}
                  alt="Payment screenshot"
                  fill
                  className="object-contain"
                  sizes="(max-width: 600px) 100vw, 400px"
                />
              </div>
            </div>
          )}
        </div>

        {/* Sidebar — controls */}
        <div className="space-y-5">
          {/* Status badges */}
          <div className="bg-carve-ivory border border-carve-champagne rounded-sm p-5">
            <h2 className="font-display text-lg text-carve-charcoal mb-4">Status</h2>
            <div className="space-y-3">
              <div>
                <p className="font-body text-xs tracking-widest uppercase text-carve-mink mb-1.5">Payment</p>
                <Badge variant={paymentBadgeMap[order.paymentStatus] || 'gray'}>
                  {order.paymentStatus.replace(/_/g, ' ')}
                </Badge>
              </div>
              <div>
                <p className="font-body text-xs tracking-widest uppercase text-carve-mink mb-1.5">Order</p>
                <Badge variant={orderBadgeMap[order.orderStatus] || 'gray'}>
                  {order.orderStatus}
                </Badge>
              </div>
              <div>
                <p className="font-body text-xs tracking-widest uppercase text-carve-mink mb-1.5">Payment Method</p>
                <span className="font-body text-sm text-carve-charcoal capitalize">{order.paymentMethod}</span>
              </div>
            </div>
          </div>

          {/* Controls */}
          <OrderStatusControls order={order} />
        </div>
      </div>
    </div>
  )
}
