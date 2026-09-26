export const dynamic = 'force-dynamic'
export const revalidate = 0

import { connectDB } from '@/lib/mongodb'
import Product from '@/models/Product'
import Order from '@/models/Order'
import { ShoppingCart, Package, AlertCircle, TrendingUp } from 'lucide-react'
import StatsWidget from '@/components/admin/StatsWidget'
import { formatPrice } from '@/lib/utils'
import Link from 'next/link'
import { IOrder } from '@/types'

async function getStats() {
  try {
    await connectDB()
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    const [totalOrders, pendingPayments, totalProducts, lowStock, totalRevenue, todayOrders] =
      await Promise.all([
        Order.countDocuments(),
        Order.countDocuments({ paymentStatus: 'screenshot_submitted' }),
        Product.countDocuments(),
        Product.countDocuments({ stock: { $lt: 5 }, inStock: true }),
        Order.aggregate([
          { $match: { paymentStatus: 'approved' } },
          { $group: { _id: null, total: { $sum: '$total' } } },
        ]),
        Order.countDocuments({ createdAt: { $gte: today } }),
      ])

    return {
      totalOrders,
      pendingPayments,
      totalProducts,
      lowStock,
      totalRevenue: totalRevenue[0]?.total || 0,
      todayOrders,
    }
  } catch {
    return { totalOrders: 0, pendingPayments: 0, totalProducts: 0, lowStock: 0, totalRevenue: 0, todayOrders: 0 }
  }
}

async function getRecentOrders(): Promise<IOrder[]> {
  try {
    await connectDB()
    const orders = await Order.find().sort({ createdAt: -1 }).limit(5).lean()
    return JSON.parse(JSON.stringify(orders))
  } catch {
    return []
  }
}

const statusColors: Record<string, string> = {
  pending: 'text-yellow-600 bg-yellow-50',
  confirmed: 'text-blue-600 bg-blue-50',
  processing: 'text-purple-600 bg-purple-50',
  shipped: 'text-indigo-600 bg-indigo-50',
  delivered: 'text-green-700 bg-green-50',
  cancelled: 'text-red-600 bg-red-50',
}

export default async function DashboardPage() {
  const [stats, recentOrders] = await Promise.all([getStats(), getRecentOrders()])

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="font-display text-3xl text-carve-charcoal">Dashboard</h1>
        <p className="font-body text-sm text-carve-mink mt-1">Welcome back, Admin.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 mb-10">
        <StatsWidget
          title="Total Orders"
          value={stats.totalOrders}
          subtitle={`${stats.todayOrders} today`}
          icon={ShoppingCart}
        />
        <StatsWidget
          title="Pending Approvals"
          value={stats.pendingPayments}
          subtitle="EasyPaisa screenshots"
          icon={AlertCircle}
          variant={stats.pendingPayments > 0 ? 'warning' : 'default'}
        />
        <StatsWidget
          title="Total Products"
          value={stats.totalProducts}
          subtitle={stats.lowStock > 0 ? `${stats.lowStock} low stock` : 'All stocked'}
          icon={Package}
          variant={stats.lowStock > 0 ? 'warning' : 'default'}
        />
        <StatsWidget
          title="Revenue"
          value={formatPrice(stats.totalRevenue)}
          subtitle="Approved payments"
          icon={TrendingUp}
          variant="success"
        />
      </div>

      {/* Recent Orders */}
      <div className="bg-carve-ivory border border-carve-champagne rounded-sm p-5 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-display text-xl text-carve-charcoal">Recent Orders</h2>
          <Link href="/dashboard/orders" className="font-body text-xs tracking-widest uppercase text-carve-mink hover:text-carve-gold transition-colors">
            View All →
          </Link>
        </div>
        {recentOrders.length === 0 ? (
          <p className="font-body text-sm text-carve-mink">No orders yet.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full font-body text-sm">
              <thead>
                <tr className="border-b border-carve-champagne text-left">
                  <th className="pb-2 text-xs tracking-widest uppercase text-carve-mink font-normal">Order</th>
                  <th className="pb-2 text-xs tracking-widest uppercase text-carve-mink font-normal">Customer</th>
                  <th className="pb-2 text-xs tracking-widest uppercase text-carve-mink font-normal">Total</th>
                  <th className="pb-2 text-xs tracking-widest uppercase text-carve-mink font-normal">Status</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map((order) => (
                  <tr key={order._id} className="border-b border-carve-champagne/50 last:border-0">
                    <td className="py-2.5">
                      <Link href={`/dashboard/orders/${order._id}`} className="text-carve-forest hover:text-carve-gold transition-colors">
                        #{order.orderNumber}
                      </Link>
                    </td>
                    <td className="py-2.5 text-carve-charcoal">{order.customer.name}</td>
                    <td className="py-2.5 text-carve-charcoal">{formatPrice(order.total)}</td>
                    <td className="py-2.5">
                      <span className={`px-2 py-0.5 rounded-sm text-xs font-medium ${statusColors[order.orderStatus] || 'text-carve-mink bg-carve-champagne/30'}`}>
                        {order.orderStatus}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Quick links */}
      <div className="grid md:grid-cols-2 gap-4">
        <div className="bg-carve-ivory border border-carve-champagne rounded-sm p-5">
          <h2 className="font-display text-xl text-carve-charcoal mb-4">Quick Actions</h2>
          <div className="space-y-2">
            <a href="/dashboard/products/new" className="flex items-center gap-2 font-body text-sm text-carve-forest hover:text-carve-gold transition-colors">
              + Add New Product
            </a>
            <a href="/dashboard/orders?paymentStatus=screenshot_submitted" className="flex items-center gap-2 font-body text-sm text-yellow-700 hover:text-carve-gold transition-colors">
              Review Pending Payments ({stats.pendingPayments})
            </a>
            <a href="/dashboard/orders" className="flex items-center gap-2 font-body text-sm text-carve-forest hover:text-carve-gold transition-colors">
              View All Orders
            </a>
          </div>
        </div>

        <div className="bg-carve-ivory border border-carve-champagne rounded-sm p-5">
          <h2 className="font-display text-xl text-carve-charcoal mb-4">Store Status</h2>
          <div className="space-y-2">
            <div className="flex justify-between font-body text-sm">
              <span className="text-carve-mink">Active Products</span>
              <span className="text-carve-charcoal font-medium">{stats.totalProducts}</span>
            </div>
            <div className="flex justify-between font-body text-sm">
              <span className="text-carve-mink">Low Stock Alerts</span>
              <span className={stats.lowStock > 0 ? 'text-yellow-600 font-medium' : 'text-carve-charcoal font-medium'}>
                {stats.lowStock}
              </span>
            </div>
            <div className="flex justify-between font-body text-sm">
              <span className="text-carve-mink">Orders Today</span>
              <span className="text-carve-charcoal font-medium">{stats.todayOrders}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
