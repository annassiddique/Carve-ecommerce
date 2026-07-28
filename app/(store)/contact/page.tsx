import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Contact Us | CARVE',
  description:
    'Get in touch with CARVE via WhatsApp, email or Instagram for product enquiries, order support and more.',
}

const channels = [
  {
    label: 'WhatsApp',
    eyebrow: 'Quickest response',
    detail: '+923002278377',
    cta: 'Message us',
    href: 'https://wa.me/923002278377',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/>
      </svg>
    ),
  },
  {
    label: 'Email',
    eyebrow: 'General enquiries & support',
    detail: 'info@shopcarvepk.com',
    cta: 'Send an email',
    href: 'mailto:info@shopcarvepk.com',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
        <polyline points="22,6 12,13 2,6"/>
      </svg>
    ),
  },
  {
    label: 'Instagram',
    eyebrow: 'Latest collections & updates',
    detail: '@wecarveit',
    cta: 'Follow us',
    href: 'https://www.instagram.com/wecarveit',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
        <circle cx="12" cy="12" r="4"/>
        <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>
      </svg>
    ),
  },
]

export default function ContactPage() {
  return (
    <main className="bg-carve-ivory">

      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <section className="bg-carve-forest">
        <div className="max-w-3xl mx-auto px-6 py-24 md:py-32 text-center">
          <p className="font-body text-xs tracking-[0.3em] uppercase text-carve-gold mb-5">
            Get in Touch
          </p>
          <h1 className="font-display text-4xl md:text-5xl text-carve-champagne mb-6">
            Contact Us
          </h1>
          <div className="mx-auto h-px w-14 bg-carve-gold/40" />
          <p className="mt-8 font-body text-sm leading-relaxed text-carve-champagne/60 max-w-xl mx-auto">
            We're here to help with product enquiries, fragrance recommendations, order updates and
            after-sales support.
          </p>
        </div>
      </section>

      {/* ── Contact Channels ──────────────────────────────────────────────── */}
      <section className="max-w-4xl mx-auto px-6 py-20 md:py-28">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
          {channels.map((ch) => (
            <div
              key={ch.label}
              className="bg-white rounded-2xl border border-carve-gold/10 shadow-sm p-8 flex flex-col"
            >
              <div className="w-12 h-12 rounded-full bg-carve-forest/6 border border-carve-gold/15 flex items-center justify-center text-carve-gold mb-5">
                {ch.icon}
              </div>
              <p className="font-body text-xs tracking-[0.2em] uppercase text-carve-gold mb-1">
                {ch.eyebrow}
              </p>
              <h2 className="font-display text-2xl text-carve-charcoal mb-2">{ch.label}</h2>
              <p className="font-body text-sm text-carve-charcoal/60 mb-6 break-all">{ch.detail}</p>
              <a
                href={ch.href}
                target={ch.href.startsWith('http') ? '_blank' : undefined}
                rel={ch.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                className="mt-auto inline-block font-body text-xs tracking-widest uppercase text-carve-gold border border-carve-gold/40 hover:bg-carve-gold hover:text-carve-forest transition-colors duration-200 rounded-full px-5 py-2.5 text-center"
              >
                {ch.cta}
              </a>
            </div>
          ))}
        </div>

        {/* ── Order Support ─────────────────────────────────────────────── */}
        <div className="bg-white rounded-2xl border border-carve-gold/10 shadow-sm p-8 md:p-10 mb-10">
          <h2 className="font-display text-2xl text-carve-charcoal mb-2">Order Support</h2>
          <div className="h-px bg-carve-gold/20 mb-6" />
          <p className="font-body text-sm leading-relaxed text-carve-charcoal/60 mb-4">
            For questions about an order, please share:
          </p>
          <ul className="space-y-2 mb-6">
            {[
              'Your full name',
              'Order number',
              'Phone number used at checkout',
              'A brief description of your concern',
            ].map((item) => (
              <li key={item} className="flex gap-2 font-body text-sm text-carve-charcoal/60">
                <span className="mt-1.5 shrink-0 w-1 h-1 rounded-full bg-carve-gold" />
                {item}
              </li>
            ))}
          </ul>
          <p className="font-body text-sm leading-relaxed text-carve-charcoal/60">
            For damaged, defective or incorrect orders, please also provide clear photographs and
            the complete unboxing video in accordance with our{' '}
            <Link href="/shipping" className="text-carve-gold hover:underline">
              Shipping &amp; Returns Policy
            </Link>
            .
          </p>
        </div>

        {/* ── Website ───────────────────────────────────────────────────── */}
        <p className="font-body text-xs text-center text-carve-charcoal/40 mb-16">
          Website: www.shopcarvepk.com
        </p>

        {/* ── Tagline ───────────────────────────────────────────────────── */}
        <div className="text-center border-t border-carve-gold/20 pt-14">
          <p className="font-display italic text-2xl md:text-3xl text-carve-charcoal/60">
            Scent. Shine. Presence.
          </p>
        </div>
      </section>

    </main>
  )
}
