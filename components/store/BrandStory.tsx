'use client'
import { motion } from 'framer-motion'
import { Sparkles, Leaf, Eye } from 'lucide-react'

const values = [
  {
    icon: Sparkles,
    label: 'Elegant',
    description: 'Every product is designed with intention, elegance, and restraint.',
  },
  {
    icon: Eye,
    label: 'Modern',
    description: 'Contemporary aesthetics rooted in Pakistani culture and global luxury.',
  },
  {
    icon: Leaf,
    label: 'Sensory',
    description: 'Products that engage all senses — the touch, the scent, the shimmer.',
  },
]

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.18 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 32, filter: 'blur(4px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.75, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] },
  },
}

export default function BrandStory() {
  return (
    <section className="py-18 md:py-28 bg-carve-ivory overflow-hidden">
      <div className="max-w-4xl mx-auto px-6 text-center">
        {/* Headline block */}
        <motion.div
          initial={{ opacity: 0, y: 44 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <motion.p
            className="font-body text-xs tracking-[0.35em] uppercase text-carve-mink mb-6"
            initial={{ opacity: 0, letterSpacing: '0.15em' }}
            whileInView={{ opacity: 1, letterSpacing: '0.35em' }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.1 }}
          >
            Our Story
          </motion.p>
          <h2 className="font-display text-4xl md:text-5xl text-carve-charcoal mb-6 leading-tight">
            More Than a Brand
          </h2>
          <p className="font-body text-base text-carve-mink leading-relaxed max-w-2xl mx-auto">
            CARVE was born from a simple belief — that luxury is not a price tag, it&apos;s a feeling.
            We create perfumes and jewellery that let you wear your story, turn heads without speaking,
            and carry a piece of elegance wherever you go. Affordable. Intentional. Yours.
          </p>
        </motion.div>

        {/* Divider */}
        <motion.div
          className="flex items-center justify-center gap-4 my-14"
          initial={{ opacity: 0, scaleX: 0 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <div className="h-px w-16 bg-gradient-to-r from-transparent to-carve-champagne" />
          <span className="text-carve-gold text-xl">✦</span>
          <div className="h-px w-16 bg-gradient-to-l from-transparent to-carve-champagne" />
        </motion.div>

        {/* Values */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-10"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-40px' }}
        >
          {values.map((value) => {
            const Icon = value.icon
            return (
              <motion.div
                key={value.label}
                className="flex flex-col items-center text-center group"
                variants={itemVariants}
              >
                <motion.div
                  className="w-14 h-14 bg-carve-champagne rounded-sm flex items-center justify-center mb-5 group-hover:bg-carve-forest transition-colors duration-500"
                  whileHover={{ scale: 1.08 }}
                  transition={{ duration: 0.3 }}
                >
                  <Icon size={22} className="text-carve-forest group-hover:text-carve-gold transition-colors duration-500" />
                </motion.div>
                <h3 className="font-display text-2xl text-carve-charcoal mb-2">{value.label}</h3>
                <p className="font-body text-sm text-carve-mink leading-relaxed">
                  {value.description}
                </p>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
