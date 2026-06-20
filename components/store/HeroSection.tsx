'use client'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'
import Button from '@/components/ui/Button'

const wordVariant = {
  hidden: { opacity: 0, y: 40, filter: 'blur(8px)' },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      delay: i * 0.1,
      duration: 0.8,
      ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
    },
  }),
}

// Fixed positions to avoid hydration mismatch
const particles = [
  { id: 0, x: 12, y: 22, size: 2, dur: 10, del: 0 },
  { id: 1, x: 78, y: 58, size: 1.5, dur: 8, del: 2.5 },
  { id: 2, x: 91, y: 14, size: 2.5, dur: 12, del: 1 },
  { id: 3, x: 35, y: 75, size: 1, dur: 9, del: 3.5 },
  { id: 4, x: 60, y: 38, size: 2, dur: 11, del: 0.8 },
  { id: 5, x: 5,  y: 65, size: 1.5, dur: 7, del: 4 },
  { id: 6, x: 85, y: 82, size: 1, dur: 13, del: 1.8 },
  { id: 7, x: 48, y: 10, size: 2, dur: 8.5, del: 2 },
]

export default function HeroSection() {
  const headline = 'Carve Your Presence'.split(' ')

  const rawX = useMotionValue(-999)
  const rawY = useMotionValue(-999)
  const glowX = useSpring(rawX, { stiffness: 35, damping: 28, mass: 0.8 })
  const glowY = useSpring(rawY, { stiffness: 35, damping: 28, mass: 0.8 })

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    rawX.set(e.clientX - rect.left)
    rawY.set(e.clientY - rect.top)
  }

  const handleMouseLeave = () => {
    rawX.set(-999)
    rawY.set(-999)
  }

  return (
    <section
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative min-h-screen pb-5 md:pb-0 bg-carve-forest grain-overlay overflow-hidden"
    >
      {/* Cursor glow */}
      <motion.div
        className="absolute pointer-events-none"
        style={{
          x: glowX,
          y: glowY,
          translateX: '-50%',
          translateY: '-50%',
          width: 700,
          height: 700,
          borderRadius: '50%',
          background:
            'radial-gradient(circle, rgba(184,153,86,0.07) 0%, rgba(184,153,86,0.02) 40%, transparent 70%)',
          zIndex: 1,
        }}
      />

      {/* Floating ambient particles */}
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-carve-gold/30 pointer-events-none"
          style={{ left: `${p.x}%`, top: `${p.y}%`, width: p.size, height: p.size, zIndex: 1 }}
          animate={{ y: [0, -55, 0], opacity: [0, 0.7, 0] }}
          transition={{
            duration: p.dur,
            repeat: Infinity,
            delay: p.del,
            ease: 'easeInOut',
          }}
        />
      ))}

      <div className="relative z-10 max-w-7xl mx-auto px-6 min-h-screen flex items-center">
        <div className="grid md:grid-cols-2 gap-12 items-center w-full pt-20">
          {/* Left — Text */}
          <div className="order-2 md:order-1">
            <motion.p
              className="font-body text-xs tracking-[0.35em] uppercase text-carve-gold mb-6"
              initial={{ opacity: 0, x: -24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              Affordable Luxury · Pakistan
            </motion.p>

            <h1 className="font-display text-6xl md:text-7xl lg:text-8xl font-light text-carve-champagne leading-none mb-8">
              {headline.map((word, i) => (
                <motion.span
                  key={word + i}
                  custom={i + 2}
                  variants={wordVariant}
                  initial="hidden"
                  animate="visible"
                  className="inline-block mr-4"
                >
                  {word}
                </motion.span>
              ))}
            </h1>

            <motion.p
              className="font-display italic text-carve-gold text-2xl md:text-3xl mb-4"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.85 }}
            >
              Scent. Shine. Presence.
            </motion.p>

            <motion.p
              className="font-body text-carve-champagne/60 text-sm leading-relaxed max-w-md mb-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.9, delay: 1.05 }}
            >
              Discover signature fragrances and handcrafted jewellery curated for those who
              refuse to go unnoticed. Every piece tells a story.
            </motion.p>

            <motion.div
              className="flex flex-wrap gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 1.25 }}
            >
              <Link href="/shop/perfumes">
                <Button variant="outline" size="lg">Shop Perfumes</Button>
              </Link>
              <Link href="/shop/jewellery">
                <Button
                  size="lg"
                  className="text-carve-champagne/80 hover:border-carve-gold hover:text-carve-gold"
                >
                  Shop Jewellery
                </Button>
              </Link>
            </motion.div>
          </div>

          {/* Right — Image */}
          <motion.div
            className="order-1 md:order-2 relative"
            initial={{ opacity: 0, scale: 0.93, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1.3, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <div className="relative aspect-[5/5]  rounded-sm overflow-hidden">
              <Image
                src="/images/hero-1.jpg"
                alt="CARVE Signature Fragrance"
                fill
                className="object-cover"
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-carve-forest/60 via-transparent to-transparent" />

              {/* Shimmer border */}
              <div className="absolute inset-0 rounded-sm ring-1 ring-carve-gold/10" />

              {/* Floating badge — links to Collections page */}
              <motion.div
                className="absolute bottom-6 left-6 z-10"
                initial={{ opacity: 0, x: -24, y: 8 }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                transition={{ duration: 0.7, delay: 1.5, ease: [0.25, 0.46, 0.45, 0.94] }}
              >
                <Link href="/collections">
                  <span className="flex items-center gap-2 bg-carve-gold hover:bg-carve-champagne transition-colors duration-300 px-5 py-3 rounded-sm group">
                    <p className="font-body text-xs tracking-widest uppercase text-carve-forest font-semibold">
                      New Collection
                    </p>
                    <ArrowRight size={11} className="text-carve-forest opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                  </span>
                </Link>
              </motion.div>
            </div>

            {/* Floating accent dot */}
            <motion.div
              className="absolute -top-3 -right-3 w-12 h-12 rounded-full bg-carve-forest border border-carve-gold/30 flex items-center justify-center"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 1.7, type: 'spring', stiffness: 200 }}
            >
              <span className="text-carve-gold text-lg leading-none inline-block -rotate-[-25deg]">☽</span>
            </motion.div>
          </motion.div>
        </div>
      </div>

    
    </section>
  )
}
