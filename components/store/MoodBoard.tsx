'use client'
import { useRef } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { IProduct } from '@/types'

export default function MoodBoard({ product }: { product: IProduct }) {
  const scrollRef = useRef<HTMLDivElement>(null)

  const moodImages = product.moodboard?.images?.filter(Boolean) ?? []
  if (!moodImages.length) return null

  return (
    <section className="py-20 bg-carve-forest overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 mb-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <p className="font-body text-xs tracking-[0.3em] uppercase text-carve-gold mb-3">
            The World of
          </p>
          <h2 className="font-display text-4xl md:text-5xl text-carve-champagne font-light mb-4">
            {product.moodboard.theme || product.name}
          </h2>
          {product.moodboard.description && (
            <p className="font-body text-carve-champagne/60 text-sm leading-relaxed max-w-xl">
              {product.moodboard.description}
            </p>
          )}
        </motion.div>
      </div>

      {/* Horizontal scroll */}
      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto scrollbar-hide px-6 pb-4"
        style={{ cursor: 'grab' }}
      >
        {moodImages.map((img, i) => (
          <motion.div
            key={i}
            className="flex-shrink-0 relative rounded-sm overflow-hidden"
            style={{ width: '280px', height: '380px' }}
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: i * 0.08 }}
          >
            <Image
              src={img}
              alt={`${product.name} mood ${i + 1}`}
              fill
              className="object-cover"
              sizes="280px"
            />
          </motion.div>
        ))}
      </div>

      {/* Keywords */}
      {product.moodboard.keywords?.length > 0 && (
        <motion.div
          className="flex flex-wrap justify-center gap-3 mt-10 px-6"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.3 }}
        >
          {product.moodboard.keywords.map((kw, i) => (
            <span
              key={i}
              className="font-display italic text-carve-gold text-lg"
            >
              {kw}
              {i < product.moodboard.keywords.length - 1 && (
                <span className="mx-2 text-carve-gold/40">·</span>
              )}
            </span>
          ))}
        </motion.div>
      )}
    </section>
  )
}
