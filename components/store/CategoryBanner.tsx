'use client'
import { motion, useScroll, useTransform } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { useRef } from 'react'

const categories = [
  {
    label: 'Perfumes',
    tagline: 'Scents that linger in memory',
    href: '/shop/perfumes',
    image: '/images/banner-perfume.jpg',
    overlay: 'from-carve-charcoal/70',
  },
  {
    label: 'Jewelry',
    tagline: 'Adorn yourself in gold',
    href: '/shop/jewellery',
    image: '/images/banner-jewelry.jpg',
    overlay: 'from-carve-forest/80',
  },
  {
    label: 'Gift Sets',
    tagline: 'Give something unforgettable',
    href: '/collections',
    image: '/images/banner-gifts.jpg',
    overlay: 'from-carve-charcoal/65',
  },
]

function CategoryCard({ cat, index }: { cat: typeof categories[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const imageY = useTransform(scrollYProgress, [0, 1], ['-6%', '6%'])

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 48 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.85, delay: index * 0.14, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      <Link href={cat.href} className="group relative block aspect-4/3 overflow-hidden rounded-sm">
        {/* Parallax image */}
        <motion.div className="absolute inset-0 scale-110" style={{ y: imageY }}>
          <Image
            src={cat.image}
            alt={cat.label}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        </motion.div>

        <div className={`absolute inset-0 bg-linear-to-t ${cat.overlay} to-transparent`} />
        <div className="absolute inset-0 bg-carve-gold/0 group-hover:bg-carve-gold/5 transition-colors duration-500" />

        {/* Text */}
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
          <p className="font-body text-xs tracking-[0.3em] uppercase text-carve-gold mb-2 translate-y-1 group-hover:translate-y-0 transition-transform duration-500">
            {cat.tagline}
          </p>
          <h3 className="font-display text-3xl md:text-4xl lg:text-5xl text-carve-champagne font-light translate-y-1 group-hover:translate-y-0 transition-transform duration-500">
            {cat.label}
          </h3>
          <div className="mt-4 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300">
            <span className="font-body text-xs tracking-widest uppercase text-carve-gold">
              Shop Now
            </span>
            <div className="w-8 h-px bg-carve-gold" />
          </div>
        </div>
      </Link>
    </motion.div>
  )
}

export default function CategoryBanner() {
  return (
    <section className="py-20 px-6 bg-carve-ivory">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <p className="font-body text-xs tracking-[0.35em] uppercase text-carve-mink mb-3">
            Explore
          </p>
          <h2 className="font-display text-4xl md:text-5xl text-carve-charcoal">
            Shop by Category
          </h2>
        </motion.div>

        {/* 2 large + 1 wide below on mobile; 3-col on desktop */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {categories.map((cat, i) => (
            <CategoryCard key={cat.label} cat={cat} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
