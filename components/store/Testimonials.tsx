'use client'
import { motion } from 'framer-motion'

const testimonials = [
  {
    quote: 'The Noir Vetiver is the most sophisticated scent I\'ve ever worn. People ask me about it everywhere I go.',
    author: 'Ayesha M.',
    location: 'Karachi',
  },
  {
    quote: 'The jewellery is even more beautiful in person. The gold plating is so rich — it doesn\'t look affordable at all.',
    author: 'Sara K.',
    location: 'Lahore',
  },
  {
    quote: 'Ordered for my wedding and the entire bridal party loved it. CARVE is something special.',
    author: 'Nadia R.',
    location: 'Islamabad',
  },
]

export default function Testimonials() {
  return (
    <section className="py-14 bg-carve-forest">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <p className="font-body text-xs tracking-[0.3em] uppercase text-carve-gold mb-3">
            What They Say
          </p>
          <h2 className="font-display text-4xl md:text-5xl text-carve-champagne font-light">
            Voices of CARVE
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              className="text-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
            >
              <div className="text-carve-gold text-3xl font-display mb-4">&ldquo;</div>
              <p className="font-display italic text-carve-champagne/80 text-lg leading-relaxed mb-6">
                {t.quote}
              </p>
              <div className="w-8 h-px bg-carve-gold mx-auto mb-4" />
              <p className="font-body text-xs tracking-widest uppercase text-carve-gold">{t.author}</p>
              <p className="font-body text-xs text-carve-champagne/40 mt-1">{t.location}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
