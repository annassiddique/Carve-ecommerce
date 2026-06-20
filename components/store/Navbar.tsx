'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { ShoppingBag, Menu, X, Search } from 'lucide-react'
import { useCartStore } from '@/store/cartStore'
import CartDrawer from './CartDrawer'
import SearchOverlay from './SearchOverlay'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const { itemCount, openCart } = useCartStore()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const navLinks = [
    { label: 'Shop All', href: '/shop' },
    { label: 'Perfumes', href: '/shop/perfumes' },
    { label: 'Jewellery', href: '/shop/jewellery' },
    { label: 'Collections', href: '/collections' },
  ]

  return (
    <>
      {/* Outer wrapper: always fixed full-width, pointer-events-none so it doesn't block content */}
      <motion.header
        className="fixed top-0 left-0 right-0 z-40 pointer-events-none"
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        {/* Inner nav: becomes the floating capsule on scroll */}
        <motion.nav
          className="flex items-center justify-between pointer-events-auto"
          animate={
            scrolled
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
                  boxShadow:
                    '0 8px 32px rgba(0,0,0,0.28), inset 0 0 0 1px rgba(184,153,86,0.2)',
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
            backdropFilter: scrolled ? 'blur(18px)' : 'blur(0px)',
            WebkitBackdropFilter: scrolled ? 'blur(18px)' : 'blur(0px)',
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
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="font-body text-xs tracking-widest uppercase text-carve-champagne/80 hover:text-carve-gold transition-colors duration-200"
              >
                {link.label}
              </Link>
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
            className="fixed inset-0 z-30 flex flex-col justify-start pt-24 px-8 pb-10 bg-carve-forest/98 backdrop-blur-xl md:hidden"
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            {navLinks.map((link, i) => (
              <motion.div
                key={link.href}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.08, duration: 0.3 }}
              >
                <Link
                  href={link.href}
                  className="block py-5 font-display text-3xl text-carve-champagne/80 hover:text-carve-gold transition-colors border-b border-carve-sage/20 last:border-0"
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </Link>
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
