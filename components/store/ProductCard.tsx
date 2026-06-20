'use client'
import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { ShoppingBag, Check } from 'lucide-react'
import { IProduct } from '@/types'
import { formatPrice } from '@/lib/utils'
import Badge from '@/components/ui/Badge'
import { useCart } from '@/hooks/useCart'

export default function ProductCard({ product }: { product: IProduct }) {
  const [added, setAdded] = useState(false)
  const [imgIdx, setImgIdx] = useState(0)
  const { addToCart } = useCart()

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    addToCart({
      productId: product._id,
      name: product.name,
      image: product.images[0] || '',
      price: product.price,
      quantity: 1,
      slug: product.slug,
    })
    setAdded(true)
    setTimeout(() => setAdded(false), 1800)
  }

  const hasDiscount = product.comparePrice && product.comparePrice > product.price

  return (
    <Link href={`/product/${product.slug}`} className="group block h-full">
      <motion.div
        className="h-full flex flex-col bg-carve-ivory border border-carve-champagne/50 hover:border-carve-gold/50 rounded-sm overflow-hidden shadow-gold hover:shadow-lg transition-all duration-500"
        whileHover={{ y: -4 }}
        transition={{ duration: 0.3 }}
      >
        {/* Image — fixed aspect ratio, never grows */}
        <div className="relative aspect-[4/5] shrink-0 overflow-hidden bg-carve-smoke">
          <Image
            src={product.images[imgIdx] || product.images[0] || 'https://picsum.photos/seed/carve-card/400/500'}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          />

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-1">
            {product.featured && <Badge variant="gold">Signature</Badge>}
            {hasDiscount && <Badge variant="green">Sale</Badge>}
            {!product.inStock && <Badge variant="gray">Sold Out</Badge>}
          </div>

          {/* Add to cart overlay */}
          <motion.button
            onClick={handleAddToCart}
            className={`absolute bottom-3 right-3 flex items-center gap-2 px-4 py-2 text-xs font-body font-medium tracking-widest uppercase transition-colors duration-200 rounded-sm
              ${added
                ? 'bg-carve-forest text-carve-ivory'
                : 'bg-carve-ivory/90 text-carve-charcoal hover:bg-carve-forest hover:text-carve-ivory'
              }`}
            initial={{ opacity: 0, y: 6 }}
            whileHover={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.18 }}
          >
            {added ? <Check size={12} /> : <ShoppingBag size={12} />}
            {added ? 'Added' : 'Add'}
          </motion.button>
        </div>

        {/* Info — grows to fill remaining card height */}
        <div className="p-3 md:p-4 flex flex-col flex-1">
          <p className="font-body text-[10px] md:text-xs text-carve-mink tracking-widest uppercase mb-1">
            {product.subcategory}
          </p>
          {/* Fixed 2-line height keeps price row aligned across all cards */}
          <h3 className="font-display text-sm md:text-lg text-carve-charcoal leading-tight mb-2 line-clamp-2 min-h-9 md:min-h-11 group-hover:text-carve-forest transition-colors">
            {product.name}
          </h3>
          {/* Description hidden on mobile — too cramped at 2-col narrow width */}
          <p className="hidden md:block font-body text-xs text-carve-mink line-clamp-2 flex-1">
            {product.shortDescription}
          </p>
          {/* Price always pinned to bottom */}
          <div className="flex items-center gap-2 mt-auto pt-3 border-t border-carve-champagne/40">
            <span className="font-body font-medium text-carve-charcoal text-xs md:text-sm">
              {formatPrice(product.price)}
            </span>
            {hasDiscount && (
              <span className="font-body text-xs text-carve-mink line-through">
                {formatPrice(product.comparePrice!)}
              </span>
            )}
          </div>
        </div>
      </motion.div>
    </Link>
  )
}
