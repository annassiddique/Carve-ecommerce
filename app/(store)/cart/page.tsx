'use client'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { Minus, Plus, Trash2, ShoppingBag } from 'lucide-react'
import { useCartStore } from '@/store/cartStore'
import { formatPrice } from '@/lib/utils'
import Button from '@/components/ui/Button'

export default function CartPage() {
  const { items, updateQuantity, removeItem, subtotal, clearCart } = useCartStore()

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-carve-ivory pt-24 flex items-center justify-center">
        <div className="text-center">
          <ShoppingBag size={48} className="text-carve-champagne mx-auto mb-4" />
          <h1 className="font-display text-3xl text-carve-charcoal mb-2">Your cart is empty</h1>
          <p className="font-body text-sm text-carve-mink mb-6">Start with a signature scent or piece.</p>
          <Link href="/shop">
            <Button variant="primary" size="lg">Shop Now</Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-carve-ivory pt-24">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="font-display text-4xl md:text-5xl text-carve-charcoal mb-10">
            Shopping Cart
          </h1>

          <div className="grid lg:grid-cols-3 gap-10">
            {/* Items */}
            <div className="lg:col-span-2">
              <div className="divide-y divide-carve-champagne">
                {items.map((item) => (
                  <motion.div
                    key={item.productId}
                    className="flex gap-5 py-6"
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <div className="relative w-20 h-24 md:w-24 md:h-28 rounded-sm overflow-hidden bg-carve-smoke shrink-0">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover"
                        sizes="96px"
                      />
                    </div>

                    <div className="flex-1">
                      <Link
                        href={`/product/${item.slug}`}
                        className="font-body font-medium text-carve-charcoal hover:text-carve-forest transition-colors"
                      >
                        {item.name}
                      </Link>
                      <p className="font-body text-sm text-carve-gold font-medium mt-1">
                        {formatPrice(item.price)}
                      </p>

                      <div className="flex items-center justify-between mt-4">
                        <div className="flex items-center border border-carve-champagne rounded-sm">
                          <button
                            onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                            className="px-3 py-2 text-carve-mink hover:text-carve-charcoal"
                          >
                            <Minus size={12} />
                          </button>
                          <span className="px-3 font-body text-sm text-carve-charcoal">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                            className="px-3 py-2 text-carve-mink hover:text-carve-charcoal"
                          >
                            <Plus size={12} />
                          </button>
                        </div>

                        <div className="flex items-center gap-4">
                          <span className="font-body font-medium text-carve-charcoal">
                            {formatPrice(item.price * item.quantity)}
                          </span>
                          <button
                            onClick={() => removeItem(item.productId)}
                            className="text-carve-mink hover:text-red-500 transition-colors"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              <button
                onClick={clearCart}
                className="font-body text-xs text-carve-mink hover:text-red-500 transition-colors mt-4 tracking-widest uppercase"
              >
                Clear Cart
              </button>
            </div>

            {/* Summary */}
            <div className="lg:col-span-1">
              <div className="bg-carve-smoke border border-carve-champagne rounded-sm p-6 sticky top-24">
                <h2 className="font-display text-xl text-carve-charcoal mb-6">Order Summary</h2>

                <div className="space-y-3 mb-6">
                  <div className="flex justify-between font-body text-sm text-carve-mink">
                    <span>Subtotal ({items.length} items)</span>
                    <span>{formatPrice(subtotal())}</span>
                  </div>
                  <div className="flex justify-between font-body text-sm text-carve-mink">
                    <span>Shipping</span>
                    <span>{subtotal() >= 3000 ? 'Free' : formatPrice(200)}</span>
                  </div>
                </div>

                <div className="border-t border-carve-champagne pt-4 mb-6">
                  <div className="flex justify-between items-center">
                    <span className="font-body text-sm font-medium text-carve-charcoal uppercase tracking-wider">Total</span>
                    <span className="font-display text-2xl text-carve-charcoal">
                      {formatPrice(subtotal() + (subtotal() >= 3000 ? 0 : 200))}
                    </span>
                  </div>
                </div>

                {subtotal() < 3000 && (
                  <p className="font-body text-xs text-carve-mink mb-4">
                    Add {formatPrice(3000 - subtotal())} more for free shipping.
                  </p>
                )}

                <Link href="/checkout">
                  <Button variant="primary" size="lg" className="w-full">
                    Proceed to Checkout
                  </Button>
                </Link>

                <Link href="/shop" className="block mt-3">
                  <Button variant="outline" size="md" className="w-full">Continue Shopping</Button>
                </Link>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
