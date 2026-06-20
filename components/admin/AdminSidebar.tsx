'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { signOut } from 'next-auth/react'
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  LogOut,
  PlusCircle,
} from 'lucide-react'

const navItems = [
  { label: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { label: 'Products', href: '/dashboard/products', icon: Package },
  { label: 'Add Product', href: '/dashboard/products/new', icon: PlusCircle },
  { label: 'Orders', href: '/dashboard/orders', icon: ShoppingCart },
]

export default function AdminSidebar() {
  const pathname = usePathname()

  return (
    <aside className="w-56 min-h-screen bg-carve-charcoal flex flex-col">
      <div className="px-6 py-6 border-b border-carve-mink/20">
        <h1 className="font-display text-xl font-semibold tracking-[0.15em] text-carve-champagne">
          CARVE
        </h1>
        <p className="font-body text-[10px] tracking-widest uppercase text-carve-mink mt-1">
          Admin
        </p>
      </div>

      <nav className="flex-1 py-6 px-3">
        {navItems.map(({ label, href, icon: Icon }) => {
          const active = pathname === href || (href !== '/dashboard' && pathname.startsWith(href))
          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 px-3 py-3 rounded-sm mb-1 transition-all font-body text-sm ${
                active
                  ? 'bg-carve-forest text-carve-ivory'
                  : 'text-carve-champagne/60 hover:bg-carve-mink/20 hover:text-carve-champagne'
              }`}
            >
              <Icon size={16} />
              {label}
            </Link>
          )
        })}
      </nav>

      <div className="px-3 pb-6">
        <button
          onClick={() => signOut({ callbackUrl: '/login' })}
          className="flex items-center gap-3 px-3 py-3 rounded-sm w-full text-left text-carve-champagne/40 hover:text-red-400 transition-colors font-body text-sm"
        >
          <LogOut size={16} />
          Sign Out
        </button>
      </div>
    </aside>
  )
}
