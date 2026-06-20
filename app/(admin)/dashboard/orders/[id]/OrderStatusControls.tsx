'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import { IOrder } from '@/types'
import Button from '@/components/ui/Button'

const orderStatuses = ['pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled'] as const

export default function OrderStatusControls({ order }: { order: IOrder }) {
  const router = useRouter()
  const [loading, setLoading] = useState<string | null>(null)
  const [notes, setNotes] = useState(order.notes || '')

  const updateOrder = async (update: Record<string, unknown>, actionName: string) => {
    setLoading(actionName)
    try {
      const res = await fetch(`/api/orders/${order._id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(update),
      })
      const data = await res.json()
      if (data.success) {
        toast.success(`Order ${actionName} successfully`)
        router.refresh()
      } else {
        toast.error('Failed to update order')
      }
    } finally {
      setLoading(null)
    }
  }

  return (
    <div className="bg-carve-ivory border border-carve-champagne rounded-sm p-5 space-y-5">
      <h2 className="font-display text-lg text-carve-charcoal">Actions</h2>

      {/* Payment approval (EasyPaisa) */}
      {order.paymentMethod === 'easypaisa' && order.paymentStatus === 'screenshot_submitted' && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-sm p-4">
          <p className="font-body text-xs font-medium text-yellow-700 mb-3 uppercase tracking-wider">
            Payment Approval Required
          </p>
          <div className="flex gap-2">
            <Button
              variant="primary"
              size="sm"
              loading={loading === 'approve'}
              onClick={() => updateOrder({ paymentStatus: 'approved', orderStatus: 'confirmed' }, 'approve')}
            >
              Approve
            </Button>
            <Button
              variant="outline"
              size="sm"
              loading={loading === 'reject'}
              onClick={() => updateOrder({ paymentStatus: 'rejected' }, 'reject')}
              className="border-red-300 text-red-600 hover:bg-red-50 hover:border-red-400"
            >
              Reject
            </Button>
          </div>
        </div>
      )}

      {/* Order status */}
      <div>
        <label className="block font-body text-xs tracking-widest uppercase text-carve-mink mb-2">
          Update Order Status
        </label>
        <select
          defaultValue={order.orderStatus}
          onChange={(e) => updateOrder({ orderStatus: e.target.value }, 'status update')}
          className="w-full bg-carve-smoke border border-carve-champagne text-carve-charcoal px-3 py-2 text-sm font-body focus:outline-none focus:border-carve-gold rounded-sm"
        >
          {orderStatuses.map((s) => (
            <option key={s} value={s}>
              {s.charAt(0).toUpperCase() + s.slice(1)}
            </option>
          ))}
        </select>
      </div>

      {/* Notes */}
      <div>
        <label className="block font-body text-xs tracking-widest uppercase text-carve-mink mb-2">
          Internal Notes
        </label>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          rows={3}
          placeholder="Add notes for this order..."
          className="w-full bg-carve-smoke border border-carve-champagne text-carve-charcoal placeholder-carve-champagne/50 px-3 py-2 text-sm font-body focus:outline-none focus:border-carve-gold rounded-sm"
        />
        <Button
          variant="outline"
          size="sm"
          loading={loading === 'notes'}
          onClick={() => updateOrder({ notes }, 'notes')}
          className="mt-2"
        >
          Save Notes
        </Button>
      </div>
    </div>
  )
}
