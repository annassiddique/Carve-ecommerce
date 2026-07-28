import type { Metadata } from 'next'
import FaqAccordion from '@/components/store/FaqAccordion'

export const metadata: Metadata = {
  title: 'FAQs | CARVE',
  description:
    'Answers to common questions about CARVE products, orders, shipping, returns and jewellery care.',
}

export default function FaqsPage() {
  return (
    <main className="bg-carve-ivory">

      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <section className="bg-carve-forest">
        <div className="max-w-3xl mx-auto px-6 py-24 md:py-32 text-center">
          <p className="font-body text-xs tracking-[0.3em] uppercase text-carve-gold mb-5">
            Support
          </p>
          <h1 className="font-display text-4xl md:text-5xl text-carve-champagne mb-6">
            Frequently Asked Questions
          </h1>
          <div className="mx-auto h-px w-14 bg-carve-gold/40" />
        </div>
      </section>

      {/* ── Accordion ─────────────────────────────────────────────────────── */}
      <FaqAccordion />

    </main>
  )
}
