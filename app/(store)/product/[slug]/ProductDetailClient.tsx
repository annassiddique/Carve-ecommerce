'use client'
import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Minus, Plus, ChevronLeft, ChevronRight, X, ZoomIn,
  MessageCircle, ShieldCheck, RotateCcw, BadgeCheck, Sparkles,
} from 'lucide-react'
import { IProduct } from '@/types'
import { PairedProduct } from './page'
import { formatPrice } from '@/lib/utils'
import MoodBoard from '@/components/store/MoodBoard'
import RelatedProducts from '@/components/store/RelatedProducts'
import { useCart } from '@/hooks/useCart'

// ─── Star rating ─────────────────────────────────────────────────────────────
function Stars({ count = 5 }: { count?: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill={i < count ? '#C8A96E' : 'none'}
          stroke="#C8A96E"
          strokeWidth="1.5"
        >
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      ))}
    </div>
  )
}

// ─── Lightbox ─────────────────────────────────────────────────────────────────
function Lightbox({
  images, idx, name, onClose, onPrev, onNext,
}: {
  images: string[]; idx: number; name: string
  onClose: () => void; onPrev: () => void; onNext: () => void
}) {
  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/92 backdrop-blur-sm"
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="relative w-full max-w-3xl max-h-[90vh] aspect-square mx-4"
        initial={{ scale: 0.93, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.93, opacity: 0 }}
        transition={{ duration: 0.28 }}
        onClick={(e) => e.stopPropagation()}
      >
        <AnimatePresence mode="wait">
          <motion.div key={idx} className="absolute inset-0"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
          >
            <Image src={images[idx]} alt={`${name} ${idx + 1}`} fill
              className="object-contain" sizes="90vw" priority />
          </motion.div>
        </AnimatePresence>

        <div className="absolute top-3 left-3 bg-black/50 text-white font-body text-xs px-3 py-1 rounded-full">
          {idx + 1} / {images.length}
        </div>
        <button onClick={onClose}
          className="absolute top-3 right-3 bg-black/50 text-white hover:text-carve-gold p-2 rounded-full transition-colors">
          <X size={18} />
        </button>
        {images.length > 1 && (
          <>
            <button onClick={(e) => { e.stopPropagation(); onPrev() }}
              className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/50 text-white hover:text-carve-gold p-2 rounded-full transition-colors">
              <ChevronLeft size={20} />
            </button>
            <button onClick={(e) => { e.stopPropagation(); onNext() }}
              className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/50 text-white hover:text-carve-gold p-2 rounded-full transition-colors">
              <ChevronRight size={20} />
            </button>
          </>
        )}
      </motion.div>
    </motion.div>
  )
}

// ─── Feature pill ─────────────────────────────────────────────────────────────
function FeaturePill({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <div className="flex flex-col items-center gap-1.5 px-4 py-2 border border-carve-champagne rounded-lg text-center">
      <span className="text-carve-gold">{icon}</span>
      <span className="font-body text-[10px] tracking-widest uppercase text-carve-mink">{label}</span>
    </div>
  )
}

// ─── Trust badge ──────────────────────────────────────────────────────────────
function TrustBadge({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <div className="flex flex-col items-center gap-1 text-center">
      <span className="text-carve-mink/70">{icon}</span>
      <span className="font-body text-[10px] tracking-wide text-carve-mink/70 leading-tight">{label}</span>
    </div>
  )
}

// ─── Main component ────────────────────────────────────────────────────────────
export default function ProductDetailClient({
  product,
  pairedProducts = [],
}: {
  product: IProduct
  pairedProducts?: PairedProduct[]
}) {
  const images = product.images.filter(Boolean)
  const [activeImg, setActiveImg] = useState(0)
  const [thumbOffset, setThumbOffset] = useState(0)
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [qty, setQty] = useState(1)
  const [added, setAdded] = useState(false)
  const { addToCart, addBundleDiscount } = useCart()
  const router = useRouter()

  const VISIBLE_THUMBS = 5
  const maxOffset = Math.max(0, images.length - VISIBLE_THUMBS)

  const prevThumb = () => setThumbOffset((o) => Math.max(0, o - 1))
  const nextThumb = () => setThumbOffset((o) => Math.min(maxOffset, o + 1))
  const prevImg = () => setActiveImg((i) => (i - 1 + images.length) % images.length)
  const nextImg = () => setActiveImg((i) => (i + 1) % images.length)

  const handleAddToCart = () => {
    addToCart({ productId: product._id, name: product.name, image: images[0] || '', price: product.price, quantity: qty, slug: product.slug })
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  const handleBuyNow = () => {
    addToCart({ productId: product._id, name: product.name, image: images[0] || '', price: product.price, quantity: qty, slug: product.slug })
    router.push('/checkout')
  }

  const handleAddBoth = (paired: PairedProduct) => {
    addToCart({ productId: product._id, name: product.name, image: images[0] || '', price: product.price, quantity: 1, slug: product.slug })
    addToCart({ productId: paired._id, name: paired.name, image: paired.images[0] || '', price: paired.price, quantity: 1, slug: paired.slug })
    const discount = (product.price + paired.price) - paired.bundlePrice
    addBundleDiscount(product.slug, paired.slug, discount)
  }

  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '923000000000'
  const whatsappMsg = encodeURIComponent(`Hi CARVE! I'd love to see a video of *${product.name}*. Could you share one? 🙏`)
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${whatsappMsg}`

  const hasDiscount = product.comparePrice && product.comparePrice > product.price

  const isPerfume = product.category === 'perfume'
  const featurePills = isPerfume
    ? [{ label: 'Elegant', icon: <Sparkles size={14} /> }, { label: 'Refined', icon: <Sparkles size={14} /> }, { label: 'Memorable', icon: <Sparkles size={14} /> }]
    : [{ label: 'Elegant', icon: <Sparkles size={14} /> }, { label: 'Crafted', icon: <Sparkles size={14} /> }, { label: 'Luxurious', icon: <Sparkles size={14} /> }]

  const categoryLabel = isPerfume ? 'Perfumes' : 'Jewellery'
  const categoryHref = isPerfume ? '/shop/perfumes' : '/shop/jewellery'

  return (
    <>
      {/* Lightbox */}
      <AnimatePresence>
        {lightboxOpen && (
          <Lightbox images={images} idx={activeImg} name={product.name}
            onClose={() => setLightboxOpen(false)} onPrev={prevImg} onNext={nextImg} />
        )}
      </AnimatePresence>

      <div className="bg-carve-ivory min-h-screen pt-20">
        <div className="max-w-7xl mx-auto px-4 md:px-6">

          {/* Breadcrumb */}
          <nav className="py-4 flex items-center gap-2 font-body text-xs text-carve-mink/60">
            <Link href="/" className="hover:text-carve-gold transition-colors">Home</Link>
            <span>/</span>
            <Link href={categoryHref} className="hover:text-carve-gold transition-colors">{categoryLabel}</Link>
            <span>/</span>
            <span className="text-carve-charcoal truncate max-w-45">{product.name}</span>
          </nav>

          {/* Hero */}
          <div className="grid md:grid-cols-2 gap-8 lg:gap-14 pb-14">

            {/* ── Left: Gallery ── */}
            <div className="flex flex-col gap-4">
              {/* Main image */}
              <div
                className="relative aspect-square rounded-xl overflow-hidden bg-carve-smoke cursor-zoom-in group border border-carve-champagne/40"
                onClick={() => setLightboxOpen(true)}
              >
                <AnimatePresence mode="wait">
                  <motion.div key={activeImg} className="absolute inset-0"
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                    transition={{ duration: 0.35 }}
                  >
                    <Image src={images[activeImg] || '/placeholder.jpg'} alt={product.name}
                      fill
                      className={`object-cover ${product.subcategory === 'Necklaces' ? 'object-bottom' : 'object-center'}`}
                      priority sizes="(max-width: 768px) 100vw, 50vw" />
                  </motion.div>
                </AnimatePresence>
                <div className="absolute top-3 right-3 bg-white/80 backdrop-blur-sm p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                  <ZoomIn size={14} className="text-carve-charcoal" />
                </div>
                {hasDiscount && (
                  <div className="absolute top-3 left-3 bg-red-500 text-white font-body text-[10px] tracking-widest uppercase px-2.5 py-1 rounded-full">
                    Sale
                  </div>
                )}
              </div>

              {/* Thumbnails row with arrows */}
              {images.length > 1 && (
                <div className="flex items-center gap-2">
                  <button
                    onClick={prevThumb}
                    disabled={thumbOffset === 0}
                    className="shrink-0 w-7 h-7 flex items-center justify-center rounded-full border border-carve-champagne text-carve-mink hover:border-carve-gold hover:text-carve-gold disabled:opacity-30 transition-colors"
                  >
                    <ChevronLeft size={14} />
                  </button>

                  <div className="flex gap-2 overflow-hidden flex-1">
                    {images.slice(thumbOffset, thumbOffset + VISIBLE_THUMBS).map((img, offsetIdx) => {
                      const realIdx = offsetIdx + thumbOffset
                      return (
                        <button
                          key={realIdx}
                          onClick={() => setActiveImg(realIdx)}
                          className={`relative aspect-square flex-1 min-w-0 rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                            realIdx === activeImg
                              ? 'border-carve-gold shadow-gold'
                              : 'border-carve-champagne hover:border-carve-mink'
                          }`}
                        >
                          <Image src={img} alt={`${product.name} ${realIdx + 1}`}
                            fill className="object-cover" sizes="80px" />
                        </button>
                      )
                    })}
                  </div>

                  <button
                    onClick={nextThumb}
                    disabled={thumbOffset >= maxOffset}
                    className="shrink-0 w-7 h-7 flex items-center justify-center rounded-full border border-carve-champagne text-carve-mink hover:border-carve-gold hover:text-carve-gold disabled:opacity-30 transition-colors"
                  >
                    <ChevronRight size={14} />
                  </button>
                </div>
              )}
            </div>

            {/* ── Right: Info ── */}
            <div className="flex flex-col">
              {/* Name */}
              <h1 className="font-display text-3xl md:text-4xl lg:text-5xl text-carve-charcoal font-light leading-tight mb-1">
                {product.name}
              </h1>
              <p className="font-display italic text-carve-gold text-lg mb-4">
                Scent. Shine. Presence.
              </p>

              {/* Stars */}
              <div className="flex items-center gap-2 mb-5">
                <Stars count={5} />
                <span className="font-body text-xs text-carve-mink">(0)</span>
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-3 mb-1">
                <span className="font-display text-3xl font-semibold text-carve-charcoal">
                  {formatPrice(product.price)}
                </span>
                {hasDiscount && (
                  <span className="font-body text-base text-carve-mink line-through">
                    {formatPrice(product.comparePrice!)}
                  </span>
                )}
              </div>
              <p className="font-body text-xs text-carve-mink/60 mb-4">Inclusive of all taxes</p>

              {/* Availability */}
              <p className="font-body text-xs text-carve-mink mb-2">
                <span className="font-medium text-carve-charcoal">Available: </span>
                {product.inStock ? `${product.stock} items` : 'Out of Stock'}
              </p>

              {/* Size / key attribute pill */}
              {(product.attributes?.size || product.attributes?.length) && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {product.attributes.size && (
                    <span className="font-body text-xs border border-carve-champagne text-carve-mink px-3 py-1 rounded-full">
                      {product.attributes.size}
                    </span>
                  )}
                  {product.attributes.length && (
                    <span className="font-body text-xs border border-carve-champagne text-carve-mink px-3 py-1 rounded-full">
                      {product.attributes.length}
                    </span>
                  )}
                </div>
              )}

              {/* Short description */}
              <p className="font-body text-sm text-carve-mink leading-relaxed mb-5">
                {product.shortDescription}
              </p>

              {/* Feature pills */}
              <div className="flex gap-2 mb-6">
                {featurePills.map((p) => (
                  <FeaturePill key={p.label} icon={p.icon} label={p.label} />
                ))}
              </div>

              <div className="border-t border-carve-champagne mb-5" />

              {/* Quantity */}
              <div className="mb-4">
                <p className="font-body text-xs tracking-widest uppercase text-carve-mink mb-2">Quantity</p>
                <div className="inline-flex items-center border border-carve-champagne rounded-lg overflow-hidden">
                  <button
                    onClick={() => setQty(Math.max(1, qty - 1))}
                    className="px-4 py-2.5 text-carve-mink hover:text-carve-charcoal hover:bg-carve-smoke transition-colors"
                  >
                    <Minus size={14} />
                  </button>
                  <span className="px-5 font-body text-sm font-medium text-carve-charcoal min-w-8 text-center">
                    {qty}
                  </span>
                  <button
                    onClick={() => setQty(qty + 1)}
                    className="px-4 py-2.5 text-carve-mink hover:text-carve-charcoal hover:bg-carve-smoke transition-colors"
                  >
                    <Plus size={14} />
                  </button>
                </div>
              </div>

              {/* Add to Cart */}
              <button
                onClick={handleAddToCart}
                disabled={!product.inStock}
                className="w-full py-3.5 mb-3 font-body text-xs tracking-widest uppercase font-medium bg-carve-forest text-carve-ivory hover:bg-carve-charcoal transition-colors duration-200 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {added ? '✓ Added to Cart' : product.inStock ? 'Add to Cart' : 'Out of Stock'}
              </button>

              {/* Buy Now */}
              <button
                onClick={handleBuyNow}
                disabled={!product.inStock}
                className="w-full py-3.5 mb-4 font-body text-xs tracking-widest uppercase font-medium border border-carve-charcoal text-carve-charcoal hover:bg-carve-charcoal hover:text-carve-ivory transition-colors duration-200 rounded-lg disabled:opacity-50"
              >
                Buy Now
              </button>

              {/* WhatsApp video request */}
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full py-2.5 mb-5 border border-[#25D366] text-[#25D366] hover:bg-[#25D366] hover:text-white font-body text-[10px] tracking-widest uppercase rounded-lg transition-all duration-200"
              >
                <MessageCircle size={13} />
                Request a Product Video
              </a>

              {/* Trust badges */}
              <div className="flex items-center justify-between pt-4 border-t border-carve-champagne">
                <TrustBadge icon={<ShieldCheck size={18} />} label="Secure Payment" />
                <div className="w-px h-8 bg-carve-champagne" />
                <TrustBadge icon={<RotateCcw size={18} />} label="Easy Returns" />
                <div className="w-px h-8 bg-carve-champagne" />
                <TrustBadge icon={<BadgeCheck size={18} />} label="100% Authentic" />
              </div>
            </div>
          </div>
        </div>

        {/* ── The Details section ── */}
        <div className="border-t border-carve-champagne bg-white">
          <div className="max-w-7xl mx-auto px-4 md:px-6 py-12">
            <h2 className="font-body text-sm tracking-[0.25em] uppercase font-semibold text-carve-charcoal mb-8">
              The Details
            </h2>

            <div className="max-w-2xl">
              {/* Left — full description + attributes */}
              <div>
                <p className="font-body text-sm text-carve-mink leading-relaxed mb-6">
                  {product.description}
                </p>

                {isPerfume && (
                  <div className="space-y-2 mb-6">
                    {product.attributes?.scentFamily && (
                      <p className="font-body text-sm text-carve-mink">
                        <span className="font-medium text-carve-charcoal">Scent Family: </span>
                        {product.attributes.scentFamily}
                      </p>
                    )}
                    {product.attributes?.topNotes?.length ? (
                      <p className="font-body text-sm text-carve-mink">
                        <span className="font-medium text-carve-charcoal">Top Notes: </span>
                        {product.attributes.topNotes.join(', ')}
                      </p>
                    ) : null}
                    {product.attributes?.heartNotes?.length ? (
                      <p className="font-body text-sm text-carve-mink">
                        <span className="font-medium text-carve-charcoal">Heart Notes: </span>
                        {product.attributes.heartNotes.join(', ')}
                      </p>
                    ) : null}
                    {product.attributes?.baseNotes?.length ? (
                      <p className="font-body text-sm text-carve-mink">
                        <span className="font-medium text-carve-charcoal">Base Notes: </span>
                        {product.attributes.baseNotes.join(', ')}
                      </p>
                    ) : null}
                  </div>
                )}

                {!isPerfume && (
                  <div className="space-y-2 mb-6">
                    {product.attributes?.finish && (
                      <p className="font-body text-sm text-carve-mink">
                        <span className="font-medium text-carve-charcoal">Finish: </span>
                        {product.attributes.finish}
                      </p>
                    )}
                    {product.attributes?.gemstone && (
                      <p className="font-body text-sm text-carve-mink">
                        <span className="font-medium text-carve-charcoal">Gemstone: </span>
                        {product.attributes.gemstone}
                      </p>
                    )}
                    {product.attributes?.length && (
                      <p className="font-body text-sm text-carve-mink">
                        <span className="font-medium text-carve-charcoal">Length: </span>
                        {product.attributes.length}
                      </p>
                    )}
                  </div>
                )}

                {/* Tags */}
                {product.tags?.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-4">
                    {product.tags.map((tag) => (
                      <span key={tag} className="px-3 py-1 font-body text-xs text-carve-mink border border-carve-champagne rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Gift packaging card — hidden for now */}
              {/* <div className="bg-carve-smoke rounded-xl p-6 flex flex-col items-center text-center border border-carve-champagne/60 self-start">
                <div className="w-16 h-16 bg-carve-forest rounded-full flex items-center justify-center mb-4">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#C8A96E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 12v10H4V12" />
                    <path d="M22 7H2v5h20V7z" />
                    <path d="M12 22V7" />
                    <path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z" />
                    <path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z" />
                  </svg>
                </div>
                <h3 className="font-display text-lg text-carve-charcoal mb-2">Gift Ready Packaging</h3>
                <p className="font-body text-xs text-carve-mink leading-relaxed">
                  Every CARVE order arrives in our signature gift packaging — ready to impress from the moment it's unwrapped. Perfect for gifting or treating yourself.
                </p>
              </div> */}
            </div>
          </div>
        </div>

        {/* Complete the Look */}
        {pairedProducts.length > 0 && (
          <div className="border-t border-carve-champagne bg-carve-ivory">
            <div className="max-w-7xl mx-auto px-4 md:px-6 py-12">
              <p className="font-body text-xs tracking-[0.3em] uppercase text-carve-mink mb-1">Curated for you</p>
              <h2 className="font-display text-2xl md:text-3xl text-carve-charcoal font-light mb-8">
                Complete the Look
              </h2>

              {pairedProducts.map((paired) => {
                const separateTotal = product.price + paired.price
                const savings = separateTotal - paired.bundlePrice
                const pairedImage = paired.images[0] || ''

                return (
                  <div key={paired.slug}>
                    {/* Product cards */}
                    <div className="flex items-center gap-3 md:gap-6 mb-6">
                      {/* This product */}
                      <div className="flex-1 border border-carve-champagne rounded-xl p-4 text-center bg-white">
                        <div className="relative aspect-square w-20 md:w-28 mx-auto mb-3 rounded-lg overflow-hidden">
                          <Image
                            src={images[0] || ''}
                            alt={product.name}
                            fill
                            className="object-cover"
                            sizes="112px"
                          />
                        </div>
                        <p className="font-display text-xs md:text-sm text-carve-charcoal leading-tight mb-1 line-clamp-2">
                          {product.name}
                        </p>
                        <p className="font-body text-xs text-carve-mink">{formatPrice(product.price)}</p>
                      </div>

                      {/* Plus */}
                      <div className="shrink-0 w-7 h-7 rounded-full border border-carve-gold flex items-center justify-center">
                        <span className="text-carve-gold text-base leading-none">+</span>
                      </div>

                      {/* Paired product */}
                      <Link href={`/product/${paired.slug}`} className="flex-1 border border-carve-champagne rounded-xl p-4 text-center bg-white hover:border-carve-gold transition-colors group">
                        <div className="relative aspect-square w-20 md:w-28 mx-auto mb-3 rounded-lg overflow-hidden">
                          <Image
                            src={pairedImage}
                            alt={paired.name}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                            sizes="112px"
                          />
                        </div>
                        <p className="font-display text-xs md:text-sm text-carve-charcoal leading-tight mb-1 line-clamp-2 group-hover:text-carve-forest transition-colors">
                          {paired.name}
                        </p>
                        <p className="font-body text-xs text-carve-mink">{formatPrice(paired.price)}</p>
                      </Link>
                    </div>

                    {/* Bundle pricing */}
                    <div className="border border-carve-gold/30 bg-carve-gold/5 rounded-xl p-5 mb-4 text-center">
                      <p className="font-body text-xs text-carve-mink mb-1">
                        Individually: <span className="line-through">{formatPrice(separateTotal)}</span>
                      </p>
                      <p className="font-display text-xl md:text-2xl text-carve-forest mb-1">
                        Bundle: {formatPrice(paired.bundlePrice)}
                      </p>
                      <p className="font-body text-xs tracking-widest uppercase text-carve-gold">
                        Save {formatPrice(savings)} when bought together
                      </p>
                    </div>

                    {/* Add Both CTA */}
                    <button
                      onClick={() => handleAddBoth(paired)}
                      className="w-full py-3.5 font-body text-xs tracking-widest uppercase font-medium bg-carve-forest text-carve-ivory hover:bg-carve-charcoal transition-colors duration-200 rounded-lg"
                    >
                      Add Both to Cart
                    </button>
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {/* Moodboard */}
        <MoodBoard product={product} />
      </div>

      {/* Related products */}
      <RelatedProducts
        currentSlug={product.slug}
        tags={product.tags || []}
        subcategory={product.subcategory}
      />
    </>
  )
}
