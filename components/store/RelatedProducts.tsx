'use client'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { IProduct } from '@/types'
import ProductCard from './ProductCard'

interface RelatedProductsProps {
  currentSlug: string
  tags: string[]
  subcategory: string
}

export default function RelatedProducts({ currentSlug, tags, subcategory }: RelatedProductsProps) {
  const [products, setProducts] = useState<IProduct[]>([])

  useEffect(() => {
    fetch(`/api/products?subcategory=${encodeURIComponent(subcategory)}&limit=5`)
      .then((r) => r.json())
      .then((d) => {
        if (d.success) {
          setProducts(d.data.filter((p: IProduct) => p.slug !== currentSlug).slice(0, 4))
        }
      })
  }, [currentSlug, subcategory])

  if (!products.length) return null

  return (
    <section className="py-16 bg-carve-smoke">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          className="mb-10"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <p className="font-body text-xs tracking-[0.3em] uppercase text-carve-mink mb-2">
            Continue Exploring
          </p>
          <h2 className="font-display text-3xl md:text-4xl text-carve-charcoal">
            You May Also Love
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {products.map((product, i) => (
            <motion.div
              key={product._id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
