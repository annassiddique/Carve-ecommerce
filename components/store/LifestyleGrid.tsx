'use client'
import { motion } from 'framer-motion'
import Image from 'next/image'

const images = [
  '/images/img1.jpg',
  '/images/img2.jpg',
  '/images/img3.jpg',
  '/images/img4.jpg',
  '/images/img5.jpg',
  '/images/img6.jpg',
]

export default function LifestyleGrid() {
  return (
    <section className="py-20 bg-carve-ivory">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          className="text-center mb-10"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <p className="font-body text-xs tracking-[0.3em] uppercase text-carve-mink mb-3">
            The CARVE World
          </p>
          <h2 className="font-display text-3xl md:text-4xl text-carve-charcoal">
            Life in Gold & Green
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {images.map((img, i) => (
            <motion.div
              key={i}
              className="relative aspect-square overflow-hidden rounded-sm"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.07 }}
            >
              <Image
                src={img}
                alt={`CARVE lifestyle ${i + 1}`}
                fill
                className="object-cover hover:scale-105 transition-transform duration-700"
                sizes="(max-width: 768px) 50vw, 33vw"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
