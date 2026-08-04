'use client'
import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect, useCallback } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const SLIDE_INTERVAL = 5000

const slides = [
  {
    image: '/images/banner/without%20Text%20perfume%20and%20Jewelry%20Banner%20main.png',
    alt: 'CARVE — Scent. Shine. Presence.',
    objectPosition: 'center center',
    overlay: 'from-white/20 via-white/5 to-transparent',
    eyebrow: 'C A R V E',
    heading: 'CARVE YOUR PRESENCE',
    italic: false,
    sub: 'Affordable luxury in scent and adornment.',
    tagline: 'ELEGANT · REFINED · MEMORABLE',
    cta: { label: 'SHOP NOW', href: '/shop' },
  },
  {
    image: '/images/banner/Without%20text%20perfume%20category%20banner.png',
    alt: 'CARVE Perfumes — Timeless Scents',
    objectPosition: 'center center',
    overlay: 'from-white/20 via-white/5 to-transparent',
    eyebrow: 'C A R V E',
    heading: 'Timeless Scents.\nUnforgettable Impressions.',
    italic: true,
    sub: 'A fragrance for every mood, every moment.',
    tagline: 'SCENT · SHINE · PRESENCE',
    cta: { label: 'SHOP PERFUMES', href: '/shop/perfumes' },
  },
  {
    image: '/images/banner/without%20text%20Jewelry%20category%20Banner.png',
    alt: 'CARVE Jewellery — Carve Your Presence',
    objectPosition: 'center 15%',
    overlay: 'from-white/15 via-transparent to-transparent',
    eyebrow: 'C A R V E',
    heading: 'Carve Your\nPresence',
    italic: true,
    sub: 'Fine artificial jewellery. Adorned in gold.',
    tagline: 'ELEGANT · REFINED · LUXURIOUS',
    cta: { label: 'SHOP JEWELLERY', href: '/shop/jewellery' },
  },
]

export default function HeroSection() {
  const [current, setCurrent] = useState(0)
  const [paused, setPaused] = useState(false)

  const next = useCallback(() => setCurrent((c) => (c + 1) % slides.length), [])
  const prev = useCallback(() => setCurrent((c) => (c - 1 + slides.length) % slides.length), [])

  useEffect(() => {
    if (paused) return
    const timer = setInterval(next, SLIDE_INTERVAL)
    return () => clearInterval(timer)
  }, [paused, next])

  const slide = slides[current]

  return (
    <section
      className="relative w-full overflow-hidden"
      style={{ height: '85dvh' }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Background image layer — crossfade between slides */}
      <AnimatePresence mode="sync">
        <motion.div
          key={`bg-${current}`}
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.75, ease: 'easeInOut' }}
        >
          <Image
            src={slide.image}
            alt={slide.alt}
            fill
            className="object-cover"
            style={{ objectPosition: slide.objectPosition }}
            priority={current === 0}
            sizes="100vw"
          />
          <div className={`absolute inset-0 bg-linear-to-r ${slide.overlay}`} />
        </motion.div>
      </AnimatePresence>

      {/* Text content — sequential fade so text never overlaps */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`content-${current}`}
          className="absolute inset-0 z-10 flex items-center"
          style={{ paddingTop: 'clamp(64px, 8vw, 96px)' }}
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.42, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-16 w-full">
            <div className="w-full max-w-[90%] md:max-w-[38%]">

              <p
                className="font-body uppercase text-carve-charcoal mb-3"
                style={{ fontSize: 'clamp(8px, 1vw, 11px)', letterSpacing: '0.6em' }}
              >
                {slide.eyebrow}
              </p>

              <div
                className="flex items-center mb-4"
                style={{ gap: 'clamp(6px, 1vw, 10px)' }}
              >
                <div className="h-px bg-carve-gold/70" style={{ width: 'clamp(24px, 3vw, 40px)' }} />
                <span className="text-carve-gold" style={{ fontSize: 'clamp(6px, 0.8vw, 9px)' }}>◆</span>
                <div className="h-px bg-carve-gold/70" style={{ width: 'clamp(24px, 3vw, 40px)' }} />
              </div>

              {slide.italic ? (
                <h1
                  className="font-display italic font-light text-carve-charcoal leading-tight mb-3 md:mb-4 whitespace-pre-line"
                  style={{ fontSize: 'clamp(1.5rem, 3.4vw, 3rem)' }}
                >
                  {slide.heading}
                </h1>
              ) : (
                <h1
                  className="font-body font-light tracking-[0.22em] uppercase text-carve-charcoal leading-tight mb-3 md:mb-4"
                  style={{ fontSize: 'clamp(1.15rem, 2.6vw, 2.25rem)' }}
                >
                  {slide.heading}
                </h1>
              )}

              <p
                className="font-display italic text-carve-charcoal/65 mb-3 leading-relaxed"
                style={{ fontSize: 'clamp(0.75rem, 1.3vw, 1rem)' }}
              >
                {slide.sub}
              </p>

              <p
                className="font-body uppercase text-carve-charcoal/45 mb-6 md:mb-8"
                style={{ fontSize: 'clamp(7px, 0.85vw, 10px)', letterSpacing: '0.32em' }}
              >
                {slide.tagline}
              </p>

              <Link href={slide.cta.href}>
                <span
                  className="inline-block bg-carve-forest text-carve-ivory font-body uppercase tracking-[0.28em] hover:bg-carve-sage transition-colors duration-200 cursor-pointer"
                  style={{ fontSize: 'clamp(8px, 0.9vw, 10px)', padding: 'clamp(10px, 1.2vw, 14px) clamp(20px, 3vw, 28px)' }}
                >
                  {slide.cta.label}
                </span>
              </Link>

            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Prev / Next arrows */}
      <button
        onClick={prev}
        aria-label="Previous slide"
        className="absolute left-4 md:left-6 top-1/2 -translate-y-1/2 z-20 w-9 h-9 flex items-center justify-center rounded-full bg-white/25 backdrop-blur-sm border border-white/40 text-carve-charcoal hover:bg-white/50 transition-all duration-200"
      >
        <ChevronLeft size={16} />
      </button>
      <button
        onClick={next}
        aria-label="Next slide"
        className="absolute right-4 md:right-6 top-1/2 -translate-y-1/2 z-20 w-9 h-9 flex items-center justify-center rounded-full bg-white/25 backdrop-blur-sm border border-white/40 text-carve-charcoal hover:bg-white/50 transition-all duration-200"
      >
        <ChevronRight size={16} />
      </button>

      {/* Dot indicators */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2.5">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            aria-label={`Go to slide ${i + 1}`}
          >
            <div
              className={`rounded-full transition-all duration-300 ${
                i === current
                  ? 'w-6 h-1.5 bg-carve-gold'
                  : 'w-1.5 h-1.5 bg-white/55 hover:bg-white/85'
              }`}
            />
          </button>
        ))}
      </div>

      {/* Auto-play progress bar */}
      {!paused && (
        <motion.div
          key={`progress-${current}`}
          className="absolute bottom-0 left-0 h-[2px] bg-carve-gold/50 z-20"
          initial={{ width: '0%' }}
          animate={{ width: '100%' }}
          transition={{ duration: SLIDE_INTERVAL / 1000, ease: 'linear' }}
        />
      )}
    </section>
  )
}
