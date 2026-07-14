'use client'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'

export default function HeroSection() {
  return (
    <section className="relative w-full h-[88vh] min-h-140 overflow-hidden">

      {/* Full-width background image */}
      <Image
        src="/images/hero-banner-1.jpg"
        alt="CARVE — Scent and Adornment"
        fill
        className="object-cover object-center"
        priority
        sizes="100vw"
      />

      {/* Gradient overlay — darker on left so text is readable, fades out on right */}
      <div className="absolute inset-0 bg-linear-to-r from-black/55 via-black/20 to-transparent" />

      {/* Text content — sits over the image on the left */}
      <div className="relative z-10 h-full flex items-center">
        <div className="max-w-7xl mx-auto px-6 md:px-10 w-full pt-20">
          <div className="max-w-lg">

            <motion.h1
              className="font-display font-light text-carve-ivory leading-[0.9] mb-5"
              style={{ fontSize: 'clamp(3.2rem, 7vw, 6.5rem)' }}
              initial={{ opacity: 0, y: 32 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.85, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              CARVE<br />YOUR<br />PRESENCE
            </motion.h1>

            <motion.p
              className="font-display italic text-carve-champagne/80 text-lg md:text-xl mb-8 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.85, delay: 0.18, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              Refined luxury in scent and adornment.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <Link href="/shop">
                <span className="inline-block bg-carve-forest text-carve-ivory font-body text-xs tracking-[0.25em] uppercase px-7 py-3.5 hover:bg-carve-sage transition-colors duration-200 cursor-pointer">
                  Shop Now
                </span>
              </Link>
            </motion.div>

          </div>
        </div>
      </div>

    </section>
  )
}
