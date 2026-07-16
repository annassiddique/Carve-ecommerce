'use client'
import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { ShoppingBag, Menu, X, Search, ChevronDown } from 'lucide-react'
import { useCartStore } from '@/store/cartStore'
import CartDrawer from './CartDrawer'
import SearchOverlay from './SearchOverlay'

interface DropdownItem {
  label: string
  href: string
}

interface NavItem {
  label: string
  href?: string
  dropdown?: DropdownItem[]
}

const navItems: NavItem[] = [
  {
    label: 'Perfumes',
    href: '/shop/perfumes',
    dropdown: [
      { label: 'For Him', href: '/shop/perfumes?subcategory=For+Him' },
      { label: 'For Her', href: '/shop/perfumes?subcategory=For+Her' },
      { label: 'Unisex', href: '/shop/perfumes?subcategory=Unisex' },
      { label: 'Bestsellers', href: '/shop/perfumes?sort=featured' },
    ],
  },
  {
    label: 'Jewelry',
    href: '/shop/jewellery',
    dropdown: [
      { label: 'Earrings', href: '/shop/jewellery?subcategory=Earrings' },
      { label: 'Necklaces', href: '/shop/jewellery?subcategory=Necklaces' },
      { label: 'Rings', href: '/shop/jewellery?subcategory=Rings' },
      { label: 'Bracelets', href: '/shop/jewellery?subcategory=Bracelets' },
      { label: 'Sets', href: '/shop/jewellery?subcategory=Sets' },
    ],
  },
  { label: 'Gift Sets', href: '/collections' },
  {
    label: 'New Arrivals',
    href: '/shop?sort=newest',
    dropdown: [
      { label: 'Jewelry', href: '/shop/jewellery?sort=newest' },
      { label: 'Perfumes', href: '/shop/perfumes?sort=newest' },
    ],
  },
  {
    label: 'About',
    dropdown: [
      { label: 'Our Story', href: '/about' },
      { label: 'CARVE Promise', href: '/about#promise' },
    ],
  },
  { label: 'Contact', href: '/contact' },
]

function DropdownMenu({ items }: { items: DropdownItem[] }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 8 }}
      transition={{ duration: 0.18, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="absolute top-full left-1/2 -translate-x-1/2 mt-3 min-w-[160px] rounded-2xl border border-carve-gold/20 shadow-2xl overflow-hidden z-50"
      style={{
        background: 'rgba(26, 61, 43, 0.72)',
        backdropFilter: 'blur(20px) saturate(1.6)',
        WebkitBackdropFilter: 'blur(20px) saturate(1.6)',
        boxShadow: '0 12px 40px rgba(0,0,0,0.5), inset 0 0 0 1px rgba(200,169,110,0.12)',
      }}
    >
      {items.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className="block px-5 py-3 font-body text-xs tracking-widest uppercase text-carve-champagne/70 hover:text-carve-gold hover:bg-white/5 transition-colors duration-150 border-b border-white/5 last:border-0 whitespace-nowrap"
        >
          {item.label}
        </Link>
      ))}
    </motion.div>
  )
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null)
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const { itemCount, openCart } = useCartStore()
  const pathname = usePathname()

  const isProductPage = pathname.startsWith('/product/')
  const hasBg = scrolled || isProductPage

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleMouseEnter = (label: string) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    setOpenDropdown(label)
  }

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => setOpenDropdown(null), 120)
  }

  const toggleMobileItem = (label: string) => {
    setMobileExpanded((prev) => (prev === label ? null : label))
  }

  return (
    <>
      <motion.header
        className="fixed top-0 left-0 right-0 z-40 pointer-events-none"
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        <motion.nav
          className="flex items-center justify-between pointer-events-auto"
          animate={
            hasBg
              ? {
                  marginTop: 14,
                  marginLeft: 24,
                  marginRight: 24,
                  paddingTop: 13,
                  paddingBottom: 13,
                  paddingLeft: 28,
                  paddingRight: 28,
                  borderRadius: 9999,
                  backgroundColor: 'rgba(27, 43, 38, 0.88)',
                  boxShadow: '0 8px 32px rgba(0,0,0,0.28), inset 0 0 0 1px rgba(184,153,86,0.2)',
                }
              : {
                  marginTop: 0,
                  marginLeft: 0,
                  marginRight: 0,
                  paddingTop: 22,
                  paddingBottom: 22,
                  paddingLeft: 24,
                  paddingRight: 24,
                  borderRadius: 0,
                  backgroundColor: 'rgba(27, 43, 38, 0)',
                  boxShadow: '0 0px 0px rgba(0,0,0,0)',
                }
          }
          transition={{ duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] }}
          style={{
            backdropFilter: hasBg ? 'blur(18px)' : 'blur(0px)',
            WebkitBackdropFilter: hasBg ? 'blur(18px)' : 'blur(0px)',
          }}
        >
          {/* Logo */}
          <Link
            href="/"
            className="font-display text-2xl font-semibold tracking-[0.15em] text-carve-champagne hover:text-carve-gold transition-colors duration-300"
          >
            CARVE
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-6">
            {navItems.map((item) => (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() => item.dropdown && handleMouseEnter(item.label)}
                onMouseLeave={() => item.dropdown && handleMouseLeave()}
              >
                {item.href ? (
                  <Link
                    href={item.href}
                    className="flex items-center gap-1 font-body text-xs tracking-widest uppercase text-carve-champagne/80 hover:text-carve-gold transition-colors duration-200 py-1"
                  >
                    {item.label}
                    {item.dropdown && <ChevronDown size={11} className="opacity-60 mt-px" />}
                  </Link>
                ) : (
                  <button className="flex items-center gap-1 font-body text-xs tracking-widest uppercase text-carve-champagne/80 hover:text-carve-gold transition-colors duration-200 py-1">
                    {item.label}
                    {item.dropdown && <ChevronDown size={11} className="opacity-60 mt-px" />}
                  </button>
                )}

                <AnimatePresence>
                  {item.dropdown && openDropdown === item.label && (
                    <DropdownMenu items={item.dropdown} />
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>

          {/* Right icons */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSearchOpen(true)}
              className="text-carve-champagne/80 hover:text-carve-gold transition-colors duration-200"
              aria-label="Search"
            >
              <Search size={18} />
            </button>
            <button
              onClick={openCart}
              className="relative text-carve-champagne/80 hover:text-carve-gold transition-colors duration-200"
            >
              <ShoppingBag size={18} />
              {itemCount() > 0 && (
                <span className="absolute -top-2 -right-2 bg-carve-gold text-carve-forest text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center font-body">
                  {itemCount()}
                </span>
              )}
            </button>
            <button
              className="md:hidden text-carve-champagne/80 hover:text-carve-gold transition-colors duration-200"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </motion.nav>
      </motion.header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="fixed inset-0 z-30 flex flex-col justify-start pt-20 pb-10 bg-carve-forest/98 backdrop-blur-xl md:hidden overflow-y-auto"
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            {navItems.map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.06, duration: 0.3 }}
                className="border-b border-carve-gold/10 last:border-0"
              >
                {item.dropdown ? (
                  <>
                    <button
                      onClick={() => toggleMobileItem(item.label)}
                      className="flex items-center justify-between w-full px-8 py-5 font-display text-2xl text-carve-champagne/80 hover:text-carve-gold transition-colors"
                    >
                      {item.label}
                      <ChevronDown
                        size={18}
                        className={`transition-transform duration-200 ${mobileExpanded === item.label ? 'rotate-180' : ''}`}
                      />
                    </button>
                    <AnimatePresence>
                      {mobileExpanded === item.label && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.25 }}
                          className="overflow-hidden bg-carve-gold/5"
                        >
                          {item.dropdown.map((sub) => (
                            <Link
                              key={sub.href}
                              href={sub.href}
                              onClick={() => setMobileOpen(false)}
                              className="block px-12 py-3 font-body text-sm tracking-widest uppercase text-carve-champagne/60 hover:text-carve-gold transition-colors border-t border-carve-gold/8"
                            >
                              {sub.label}
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </>
                ) : (
                  <Link
                    href={item.href!}
                    className="block px-8 py-5 font-display text-2xl text-carve-champagne/80 hover:text-carve-gold transition-colors"
                    onClick={() => setMobileOpen(false)}
                  >
                    {item.label}
                  </Link>
                )}
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <CartDrawer />
      <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  )
}
