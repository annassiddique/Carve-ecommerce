'use client'
import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'

const lines = [
  {
    num: '01',
    label: 'For Him',
    tagline: 'Bold. Woody. Commanding.',
    desc: 'Dark accords, grounding bases, and the confidence of someone who knows exactly who they are.',
    href: '/shop/perfumes?subcategory=For+Him',
    image: '/images/him.jpg',
  },
  {
    num: '02',
    label: 'For Her',
    tagline: 'Floral. Soft. Magnetic.',
    desc: 'From the delicate to the fierce — every bottle tells a story worth remembering.',
    href: '/shop/perfumes?subcategory=For+Her',
    image: '/images/her.jpg',
  },
  {
    num: '03',
    label: 'Unisex',
    tagline: 'Timeless. Balanced. Modern.',
    desc: 'Beyond convention — fragrances that belong to no one and to everyone.',
    href: '/shop/perfumes?subcategory=Unisex',
    image: '/images/dumby/12c2e5780472a13feebb70792d705428.jpg',
  },
]

export default function PerfumeLines() {
  return (
    <section className="py-18 md:py-24 bg-carve-forest overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">

        {/* Header */}
        <motion.div
          className="flex flex-col md:flex-row md:items-end md:justify-between mb-14"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <div>
            <p className="font-body text-xs tracking-[0.4em] uppercase text-carve-gold mb-4">
              The Fragrance Collection
            </p>
            <h2 className="font-display text-5xl md:text-6xl lg:text-7xl font-light text-carve-champagne leading-none">
              Perfume Lines
            </h2>
          </div>

          <Link
            href="/shop/perfumes"
            className="mt-8 md:mt-0 group flex items-center gap-2 font-body text-xs tracking-[0.3em] uppercase text-carve-champagne/40 hover:text-carve-gold transition-colors duration-300"
          >
            View All Fragrances
            <ArrowRight
              size={12}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </Link>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-7">
          {lines.map((line, i) => (
            <motion.div
              key={line.label}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: i * 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <Link href={line.href} className="group block">
                <div className="relative aspect-[3/4] overflow-hidden rounded-sm">

                  {/* Image */}
                  <Image
                    src={line.image}
                    alt={line.label}
                    fill
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />

                  {/* Gradient overlay — stronger at bottom */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-black/5" />

                  {/* Number — top left */}
                  <div className="absolute top-6 left-6">
                    <span className="font-body text-[10px] tracking-[0.45em] text-carve-gold/60">
                      {line.num}
                    </span>
                  </div>

                  {/* Bottom content */}
                  <div className="absolute bottom-0 left-0 right-0 p-7">

                    {/* Gold accent line — grows on hover */}
                    <div className="h-px bg-carve-gold/50 mb-5 w-8 transition-all duration-500 ease-out group-hover:w-14 group-hover:bg-carve-gold" />

                    {/* Label */}
                    <h3 className="font-display text-4xl lg:text-5xl font-light text-carve-champagne mb-2 leading-none">
                      {line.label}
                    </h3>

                    {/* Tagline */}
                    <p className="font-display italic text-carve-gold/70 text-sm mb-5">
                      {line.tagline}
                    </p>

                    {/* Description — fades in on hover */}
                    <p className="font-body text-xs text-carve-champagne/50 leading-relaxed mb-5 opacity-0 -translate-y-1 transition-all duration-400 group-hover:opacity-100 group-hover:translate-y-0">
                      {line.desc}
                    </p>

                    {/* CTA — slides up on hover */}
                    <div className="flex items-center gap-2 opacity-0 translate-y-2 transition-all duration-400 group-hover:opacity-100 group-hover:translate-y-0">
                      <span className="font-body text-[10px] tracking-[0.35em] uppercase text-carve-gold">
                        Shop Now
                      </span>
                      <ArrowRight size={10} className="text-carve-gold" />
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Bottom decorative rule */}
        <motion.div
          className="flex items-center gap-4 mt-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <div className="flex-1 h-px bg-carve-gold/15" />
          <span className="font-body text-[9px] tracking-[0.5em] uppercase text-carve-gold/30">
            Carve · Fragrance
          </span>
          <div className="flex-1 h-px bg-carve-gold/15" />
        </motion.div>

      </div>
    </section>
  )
}
