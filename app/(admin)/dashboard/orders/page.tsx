import { connectDB } from '@/lib/mongodb'
import Order from '@/models/Order'
import { IOrder } from '@/types'
import OrderCard from '@/components/admin/OrderCard'
import Link from 'next/link'

const tabs = [
  { label: 'All', value: 'all' },
  { label: 'Pending Approval', value: 'screenshot_submitted' },
  { label: 'Confirmed', value: 'confirmed' },
  { label: 'Shipped', value: 'shipped' },
]

async function getOrders(paymentStatus?: string, orderStatus?: string): Promise<IOrder[]> {
  try {
    await connectDB()
    const filter: Record<string, unknown> = {}
    if (paymentStatus && paymentStatus !== 'all') filter.paymentStatus = paymentStatus
    if (orderStatus && orderStatus !== 'all') filter.orderStatus = orderStatus

    const orders = await Order.find(filter).sort({ createdAt: -1 }).limit(50).lean()
    return JSON.parse(JSON.stringify(orders))
  } catch {
    return []
  }
}

export default async function OrdersPage({
  searchParams,
}: {
  searchParams: Promise<{ paymentStatus?: string; orderStatus?: string }>
}) {
  const { paymentStatus, orderStatus } = await searchParams
  const orders = await getOrders(paymentStatus, orderStatus)
  const pendingCount = orders.filter((o) => o.paymentStatus === 'screenshot_submitted').length

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="font-display text-3xl text-carve-charcoal">Orders</h1>
        <p className="font-body text-sm text-carve-mink mt-1">{orders.length} orders</p>
      </div>

      {/* Filter tabs */}
      <div className="flex gap-2 mb-6 overflow-x-auto">
        {tabs.map((tab) => (
          <Link
            key={tab.value}
            href={tab.value === 'all' ? '/dashboard/orders' : `/dashboard/orders?paymentStatus=${tab.value}`}
            className={`flex items-center gap-2 px-4 py-2 rounded-sm font-body text-xs tracking-widest uppercase border transition-all whitespace-nowrap ${
              (tab.value === 'all' && !paymentStatus) || paymentStatus === tab.value
                ? 'bg-carve-forest text-carve-ivory border-carve-forest'
                : 'border-carve-champagne text-carve-mink hover:border-carve-gold'
            }`}
          >
            {tab.label}
            {tab.value === 'screenshot_submitted' && pendingCount > 0 && (
              <span className="bg-yellow-400 text-yellow-900 text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center">
                {pendingCount}
              </span>
            )}
          </Link>
        ))}
      </div>

      {orders.length === 0 ? (
        <div className="bg-carve-ivory border border-carve-champagne rounded-sm p-12 text-center">
          <p className="font-display text-xl text-carve-charcoal">No orders yet</p>
        </div>
      ) : (
        <div className="grid gap-3">
          {orders.map((order) => (
            <OrderCard key={order._id} order={order} />
          ))}
        </div>
      )}
    </div>
  )
}
