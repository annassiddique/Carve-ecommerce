import Link from 'next/link'
import { IOrder } from '@/types'
import { formatPrice } from '@/lib/utils'
import Badge from '@/components/ui/Badge'

function getStatusBadge(status: IOrder['orderStatus']) {
  const map: Record<IOrder['orderStatus'], { variant: 'gold' | 'green' | 'red' | 'gray' | 'yellow'; label: string }> = {
    pending: { variant: 'gray', label: 'Pending' },
    confirmed: { variant: 'gold', label: 'Confirmed' },
    processing: { variant: 'yellow', label: 'Processing' },
    shipped: { variant: 'gold', label: 'Shipped' },
    delivered: { variant: 'green', label: 'Delivered' },
    cancelled: { variant: 'red', label: 'Cancelled' },
  }
  return map[status] || { variant: 'gray', label: status }
}

function getPaymentBadge(status: IOrder['paymentStatus']) {
  const map: Record<IOrder['paymentStatus'], { variant: 'gold' | 'green' | 'red' | 'gray' | 'yellow'; label: string }> = {
    pending: { variant: 'gray', label: 'Pending' },
    screenshot_submitted: { variant: 'yellow', label: 'Screenshot Submitted' },
    approved: { variant: 'green', label: 'Approved' },
    rejected: { variant: 'red', label: 'Rejected' },
  }
  return map[status] || { variant: 'gray', label: status }
}

export default function OrderCard({ order }: { order: IOrder }) {
  const statusBadge = getStatusBadge(order.orderStatus)
  const paymentBadge = getPaymentBadge(order.paymentStatus)
  const needsAttention = order.paymentStatus === 'screenshot_submitted'

  return (
    <Link href={`/dashboard/orders/${order._id}`}>
      <div className={`bg-carve-ivory border rounded-sm p-4 hover:border-carve-gold transition-all cursor-pointer ${
        needsAttention ? 'border-yellow-300 bg-yellow-50/50' : 'border-carve-champagne'
      }`}>
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <p className="font-body text-sm font-medium text-carve-charcoal">{order.orderNumber}</p>
              {needsAttention && (
                <span className="w-2 h-2 rounded-full bg-yellow-400 flex-shrink-0" />
              )}
            </div>
            <p className="font-body text-xs text-carve-mink">{order.customer.name} · {order.customer.city}</p>
            <p className="font-body text-xs text-carve-mink">{order.items.length} item(s)</p>
          </div>
          <div className="flex flex-col items-end gap-2">
            <p className="font-body text-sm font-medium text-carve-charcoal">{formatPrice(order.total)}</p>
            <Badge variant={statusBadge.variant}>{statusBadge.label}</Badge>
          </div>
        </div>
        <div className="flex items-center gap-2 mt-3">
          <span className="font-body text-xs text-carve-mink uppercase tracking-widest">
            {order.paymentMethod === 'cod' ? 'COD' : 'EasyPaisa'}
          </span>
          <span className="text-carve-champagne">·</span>
          <Badge variant={paymentBadge.variant}>{paymentBadge.label}</Badge>
        </div>
      </div>
    </Link>
  )
}
