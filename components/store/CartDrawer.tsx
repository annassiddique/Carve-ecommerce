'use client'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Plus, Minus, Trash2, ShoppingBag } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { useCartStore } from '@/store/cartStore'
import { formatPrice } from '@/lib/utils'
import Button from '@/components/ui/Button'

export default function CartDrawer() {
  const { isOpen, closeCart, items, updateQuantity, removeItem, subtotal, activeBundleSavings } = useCartStore()
  const bundleSavings = activeBundleSavings()

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 z-50 bg-carve-charcoal/60 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
          />

          {/* Drawer */}
          <motion.div
            className="fixed top-0 right-0 h-full w-full max-w-md bg-carve-ivory z-50 flex flex-col shadow-2xl"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-carve-champagne">
              <div className="flex items-center gap-3">
                <ShoppingBag size={18} className="text-carve-forest" />
                <h2 className="font-display text-xl text-carve-charcoal">
                  Your Cart{' '}
                  {items.length > 0 && (
                    <span className="text-carve-mink text-sm font-body">({items.length})</span>
                  )}
                </h2>
              </div>
              <button
                onClick={closeCart}
                className="text-carve-mink hover:text-carve-charcoal transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto px-6 py-4">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full gap-4 text-center">
                  <ShoppingBag size={40} className="text-carve-champagne" />
                  <p className="font-display text-xl text-carve-charcoal">Your cart is empty</p>
                  <p className="font-body text-sm text-carve-mink">
                    Add a fragrance or piece of jewellery to begin.
                  </p>
                  <Button variant="primary" onClick={closeCart} className="mt-2">
                    <Link href="/shop">Continue Shopping</Link>
                  </Button>
                </div>
              ) : (
                <ul className="space-y-4">
                  {items.map((item) => (
                    <li key={item.productId} className="flex gap-4 py-4 border-b border-carve-smoke">
                      <div className="relative w-20 h-20 rounded-sm overflow-hidden bg-carve-smoke flex-shrink-0">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-cover"
                          sizes="80px"
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-body text-sm font-medium text-carve-charcoal line-clamp-2">
                          {item.name}
                        </h3>
                        <p className="font-body text-sm text-carve-gold font-medium mt-1">
                          {formatPrice(item.price)}
                        </p>
                        <div className="flex items-center justify-between mt-2">
                          <div className="flex items-center gap-2 border border-carve-champagne rounded-sm">
                            <button
                              onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                              className="p-1.5 text-carve-mink hover:text-carve-charcoal transition-colors"
                            >
                              <Minus size={12} />
                            </button>
                            <span className="font-body text-xs w-6 text-center text-carve-charcoal">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                              className="p-1.5 text-carve-mink hover:text-carve-charcoal transition-colors"
                            >
                              <Plus size={12} />
                            </button>
                          </div>
                          <button
                            onClick={() => removeItem(item.productId)}
                            className="text-carve-mink hover:text-red-500 transition-colors"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="px-6 py-5 border-t border-carve-champagne bg-carve-smoke">
                {bundleSavings > 0 && (
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-body text-xs text-carve-gold tracking-wide">Bundle Savings</span>
                    <span className="font-body text-sm text-carve-gold font-medium">-{formatPrice(bundleSavings)}</span>
                  </div>
                )}
                <div className="flex justify-between items-center mb-4">
                  <span className="font-body text-sm text-carve-mink uppercase tracking-wider">Subtotal</span>
                  <span className="font-display text-xl text-carve-charcoal font-medium">
                    {formatPrice(subtotal())}
                  </span>
                </div>
                <p className="font-body text-xs text-carve-mink mb-4">
                  Shipping calculated at checkout
                </p>
                <Link href="/checkout" onClick={closeCart}>
                  <Button variant="primary" size="lg" className="w-full">
                    Proceed to Checkout
                  </Button>
                </Link>
                <Link href="/cart" onClick={closeCart}>
                  <Button variant="outline" size="md" className="w-full mt-2">
                    View Cart
                  </Button>
                </Link>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
