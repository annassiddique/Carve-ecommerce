'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import Button from '@/components/ui/Button'

export default function NewsletterBar() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      setSubmitted(true)
      setEmail('')
    }
  }

  return (
    <section className="py-16 bg-carve-charcoal">
      <div className="max-w-2xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <p className="font-body text-xs tracking-[0.3em] uppercase text-carve-gold mb-3">
            Stay Close
          </p>
          <h2 className="font-display text-3xl md:text-4xl text-carve-champagne mb-4">
            New Arrivals & Exclusives
          </h2>
          <p className="font-body text-sm text-carve-champagne/50 mb-8">
            Be the first to know. No spam, ever.
          </p>

          {submitted ? (
            <p className="font-display italic text-carve-gold text-xl">
              Thank you — we'll be in touch.
            </p>
          ) : (
            <form onSubmit={handleSubmit} className="flex gap-3 max-w-md mx-auto">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email address"
                required
                className="flex-1 bg-transparent border border-carve-mink/40 text-carve-champagne placeholder-carve-champagne/30 px-4 py-3 text-sm font-body focus:outline-none focus:border-carve-gold rounded-sm"
              />
              <Button type="submit" variant="gold" size="md">
                Subscribe
              </Button>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  )
}
