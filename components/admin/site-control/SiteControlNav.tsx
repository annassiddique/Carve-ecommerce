'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Megaphone, ImageIcon, Phone, BookOpen, CreditCard } from 'lucide-react'

const tabs = [
  { label: 'Announcement', href: '/dashboard/site-control/announcement', icon: Megaphone, desc: 'Promo bar above navbar' },
  { label: 'Homepage', href: '/dashboard/site-control/homepage', icon: ImageIcon, desc: 'Hero banners & slides' },
  { label: 'Contact', href: '/dashboard/site-control/contact', icon: Phone, desc: 'WhatsApp, email, Instagram' },
  { label: 'About', href: '/dashboard/site-control/about', icon: BookOpen, desc: 'Brand story & promise' },
  { label: 'Payment', href: '/dashboard/site-control/payment', icon: CreditCard, desc: 'EasyPaisa & shipping' },
]

export default function SiteControlNav() {
  const pathname = usePathname()

  return (
    <div className="flex gap-2 mb-8 overflow-x-auto pb-1">
      {tabs.map(({ label, href, icon: Icon, desc }) => {
        const active = pathname.startsWith(href)
        return (
          <Link
            key={href}
            href={href}
            className={`flex items-center gap-2.5 px-4 py-2.5 rounded-sm border transition-all whitespace-nowrap font-body text-xs tracking-widest uppercase ${
              active
                ? 'bg-carve-forest text-carve-ivory border-carve-forest'
                : 'border-carve-champagne text-carve-mink hover:border-carve-forest hover:text-carve-charcoal'
            }`}
            title={desc}
          >
            <Icon size={13} />
            {label}
          </Link>
        )
      })}
    </div>
  )
}
