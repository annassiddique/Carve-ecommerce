'use client'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'

export default function HeroSection() {
  return (
    <section className="relative w-full overflow-hidden" style={{ height: 'clamp(320px, 56vw, 720px)' }}>
      <Image
        src="/images/banner/without%20Text%20perfume%20and%20Jewelry%20Banner%20main.png"
        alt="CARVE — Affordable luxury in scent and adornment"
        fill
        className="object-cover object-center"
        priority
        loading="eager"
        sizes="100vw"
      />

      {/* Very subtle left-side overlay for text legibility on light cream background */}
      <div className="absolute inset-0 bg-linear-to-r from-white/20 via-white/5 to-transparent" />

      <div className="relative z-10 h-full flex items-center">
        <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-16 w-full" style={{ paddingTop: 'clamp(64px, 8vw, 96px)' }}>
          <div className="w-full max-w-[90%] md:max-w-[34%]">

            <motion.p
              className="font-body uppercase text-carve-charcoal mb-3"
              style={{ fontSize: 'clamp(8px, 1vw, 11px)', letterSpacing: '0.6em' }}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              C A R V E
            </motion.p>

            <motion.div
              className="flex items-center mb-4 md:mb-5"
              style={{ gap: 'clamp(6px, 1vw, 10px)' }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.1 }}
            >
              <div className="h-px bg-carve-gold/70" style={{ width: 'clamp(24px, 3vw, 40px)' }} />
              <span className="text-carve-gold" style={{ fontSize: 'clamp(6px, 0.8vw, 9px)' }}>◆</span>
              <div className="h-px bg-carve-gold/70" style={{ width: 'clamp(24px, 3vw, 40px)' }} />
            </motion.div>

            <motion.h1
              className="font-body font-light tracking-[0.22em] uppercase text-carve-charcoal leading-tight mb-3 md:mb-4"
              style={{ fontSize: 'clamp(1.15rem, 2.6vw, 2.25rem)' }}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.85, delay: 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              CARVE YOUR PRESENCE
            </motion.h1>

            <motion.p
              className="font-display italic text-carve-charcoal/65 mb-3 leading-relaxed"
              style={{ fontSize: 'clamp(0.75rem, 1.3vw, 1rem)' }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.24 }}
            >
              Affordable luxury in scent and adornment.
            </motion.p>

            <motion.p
              className="font-body uppercase text-carve-charcoal/45 mb-6 md:mb-8"
              style={{ fontSize: 'clamp(7px, 0.85vw, 10px)', letterSpacing: '0.32em' }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              ELEGANT &nbsp;·&nbsp; REFINED &nbsp;·&nbsp; MEMORABLE
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <Link href="/shop">
                <span
                  className="inline-block bg-carve-forest text-carve-ivory font-body uppercase tracking-[0.28em] hover:bg-carve-sage transition-colors duration-200 cursor-pointer"
                  style={{ fontSize: 'clamp(8px, 0.9vw, 10px)', padding: 'clamp(10px, 1.2vw, 14px) clamp(20px, 3vw, 28px)' }}
                >
                  SHOP NOW
                </span>
              </Link>
            </motion.div>

          </div>
        </div>
      </div>
    </section>
  )
}
