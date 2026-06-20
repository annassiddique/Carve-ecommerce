'use client'
import { useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { Minus, Plus, ChevronDown, ChevronUp } from 'lucide-react'
import { IProduct } from '@/types'
import { formatPrice } from '@/lib/utils'
import Button from '@/components/ui/Button'
import Badge from '@/components/ui/Badge'
import MoodBoard from '@/components/store/MoodBoard'
import RelatedProducts from '@/components/store/RelatedProducts'
import { useCart } from '@/hooks/useCart'

function Accordion({ title, children }: { title: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="border-b border-carve-champagne">
      <button
        className="flex items-center justify-between w-full py-4 text-left"
        onClick={() => setOpen(!open)}
      >
        <span className="font-body text-sm font-medium tracking-wider uppercase text-carve-charcoal">
          {title}
        </span>
        {open ? <ChevronUp size={16} className="text-carve-mink" /> : <ChevronDown size={16} className="text-carve-mink" />}
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="pb-5 font-body text-sm text-carve-mink leading-relaxed">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function ProductDetailClient({ product }: { product: IProduct }) {
  const [activeImg, setActiveImg] = useState(0)
  const [qty, setQty] = useState(1)
  const [added, setAdded] = useState(false)
  const { addToCart } = useCart()

  const handleAddToCart = () => {
    addToCart({
      productId: product._id,
      name: product.name,
      image: product.images[0] || '',
      price: product.price,
      quantity: qty,
      slug: product.slug,
    })
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  const hasDiscount = product.comparePrice && product.comparePrice > product.price

  return (
    <>
      {/* Product Hero */}
      <section className="pt-20 bg-carve-ivory">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="grid md:grid-cols-2 gap-12 items-start">
            {/* Left — Gallery */}
            <div>
              <div className="relative aspect-square rounded-sm overflow-hidden bg-carve-smoke mb-4">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeImg}
                    className="absolute inset-0"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4 }}
                  >
                    <Image
                      src={product.images[activeImg] || 'https://picsum.photos/seed/carve-product/800/800'}
                      alt={product.name}
                      fill
                      className="object-cover"
                      priority
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Thumbnails */}
              {product.images.filter(Boolean).length > 1 && (
                <div className="flex gap-3 overflow-x-auto scrollbar-hide">
                  {product.images.filter(Boolean).slice(0, 5).map((img, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveImg(i)}
                      className={`relative w-16 h-16 flex-shrink-0 rounded-sm overflow-hidden border-2 transition-colors ${
                        i === activeImg ? 'border-carve-gold' : 'border-carve-champagne hover:border-carve-mink'
                      }`}
                    >
                      <Image src={img} alt={`${product.name} ${i + 1}`} fill className="object-cover" sizes="64px" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Right — Info */}
            <div className="lg:sticky lg:top-24">
              <p className="font-body text-xs tracking-[0.3em] uppercase text-carve-mink mb-2">
                {product.category} · {product.subcategory}
              </p>
              <h1 className="font-display text-4xl md:text-5xl text-carve-charcoal font-light mb-4">
                {product.name}
              </h1>
              <p className="font-body text-sm text-carve-mink leading-relaxed mb-6">
                {product.shortDescription}
              </p>

              {/* Price */}
              <div className="flex items-center gap-3 mb-2">
                <span className="font-display text-2xl text-carve-charcoal font-medium">
                  {formatPrice(product.price)}
                </span>
                {hasDiscount && (
                  <span className="font-body text-sm text-carve-mink line-through">
                    {formatPrice(product.comparePrice!)}
                  </span>
                )}
              </div>

              {/* Badges */}
              <div className="flex flex-wrap gap-2 mb-8">
                {product.inStock ? (
                  <Badge variant="green">In Stock</Badge>
                ) : (
                  <Badge variant="gray">Out of Stock</Badge>
                )}
                {product.featured && <Badge variant="gold">Signature</Badge>}
                {hasDiscount && <Badge variant="red">Sale</Badge>}
              </div>

              {/* Quantity + Add to cart */}
              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center border border-carve-champagne rounded-sm">
                  <button
                    onClick={() => setQty(Math.max(1, qty - 1))}
                    className="px-3 py-3 text-carve-mink hover:text-carve-charcoal transition-colors"
                  >
                    <Minus size={14} />
                  </button>
                  <span className="px-4 font-body text-sm font-medium text-carve-charcoal min-w-[2rem] text-center">
                    {qty}
                  </span>
                  <button
                    onClick={() => setQty(qty + 1)}
                    className="px-3 py-3 text-carve-mink hover:text-carve-charcoal transition-colors"
                  >
                    <Plus size={14} />
                  </button>
                </div>

                <Button
                  variant="primary"
                  size="lg"
                  onClick={handleAddToCart}
                  disabled={!product.inStock}
                  className="flex-1"
                >
                  {added ? '✓ Added to Cart' : product.inStock ? 'Add to Cart' : 'Out of Stock'}
                </Button>
              </div>

              {/* Tags */}
              {product.tags?.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-8">
                  {product.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 font-body text-xs text-carve-mink border border-carve-champagne rounded-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              {/* Accordion */}
              <div className="mt-4">
                <Accordion title="Description">
                  <p>{product.description}</p>
                </Accordion>

                <Accordion title={product.category === 'perfume' ? 'Fragrance Notes' : 'Details'}>
                  {product.category === 'perfume' ? (
                    <div className="space-y-3">
                      {product.attributes?.scentFamily && (
                        <p><span className="font-medium text-carve-charcoal">Scent Family:</span> {product.attributes.scentFamily}</p>
                      )}
                      {product.attributes?.topNotes?.length ? (
                        <p><span className="font-medium text-carve-charcoal">Top Notes:</span> {product.attributes.topNotes.join(', ')}</p>
                      ) : null}
                      {product.attributes?.heartNotes?.length ? (
                        <p><span className="font-medium text-carve-charcoal">Heart Notes:</span> {product.attributes.heartNotes.join(', ')}</p>
                      ) : null}
                      {product.attributes?.baseNotes?.length ? (
                        <p><span className="font-medium text-carve-charcoal">Base Notes:</span> {product.attributes.baseNotes.join(', ')}</p>
                      ) : null}
                      {product.attributes?.size && (
                        <p><span className="font-medium text-carve-charcoal">Size:</span> {product.attributes.size}</p>
                      )}
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {product.attributes?.material && (
                        <p><span className="font-medium text-carve-charcoal">Material:</span> {product.attributes.material}</p>
                      )}
                      {product.attributes?.gemstone && (
                        <p><span className="font-medium text-carve-charcoal">Gemstone:</span> {product.attributes.gemstone}</p>
                      )}
                      {product.attributes?.length && (
                        <p><span className="font-medium text-carve-charcoal">Length:</span> {product.attributes.length}</p>
                      )}
                      {product.attributes?.finish && (
                        <p><span className="font-medium text-carve-charcoal">Finish:</span> {product.attributes.finish}</p>
                      )}
                    </div>
                  )}
                </Accordion>

                <Accordion title="Shipping & Returns">
                  <p>
                    Free delivery across Pakistan on orders above PKR 3,000. Standard delivery 3–5 business days.
                    Returns accepted within 7 days for unopened products. Contact us on WhatsApp for returns.
                  </p>
                </Accordion>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Moodboard */}
      <MoodBoard product={product} />

      {/* Related */}
      <RelatedProducts
        currentSlug={product.slug}
        tags={product.tags || []}
        subcategory={product.subcategory}
      />
    </>
  )
}
