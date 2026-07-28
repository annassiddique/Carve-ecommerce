import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Jewellery Care Guide | CARVE',
  description:
    'Follow these simple steps to help preserve the shine, finish and beauty of your CARVE jewellery for longer.',
}

const steps = [
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"/>
        <line x1="4" y1="4" x2="20" y2="20"/>
      </svg>
    ),
    title: 'Keep It Dry',
    body: 'Remove your jewellery before showering, swimming, exercising or washing your hands. If it becomes wet, gently dry it immediately with a soft cloth.',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 3l18 18"/>
        <path d="M8 7.5C8 5 10 3 12 3s4 2 4 4.5c0 3-4 7-4 7S8 10.5 8 7.5z"/>
        <path d="M15 13c1.5 1.5 2 3 2 4"/>
      </svg>
    ),
    title: 'Avoid Perfume and Chemicals',
    body: 'Apply perfume, lotion, hairspray and makeup before wearing your jewellery. Avoid direct contact with cleaning products, sanitiser and other chemicals, as these may affect the finish.',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
        <polyline points="3.27 6.96 12 12.01 20.73 6.96"/>
        <line x1="12" y1="22.08" x2="12" y2="12"/>
      </svg>
    ),
    title: 'Store It Properly',
    body: 'Keep each piece separately in its CARVE box, pouch or a soft-lined jewellery case. This helps prevent scratches, tangling and unnecessary exposure to moisture or air.',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
      </svg>
    ),
    title: 'Clean Gently',
    body: 'After wearing, wipe your jewellery with a clean, soft and dry cloth. Do not use abrasive cleaners, polishing agents or hard brushes.',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 8h1a4 4 0 0 1 0 8h-1"/>
        <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"/>
        <line x1="6" y1="1" x2="6" y2="4"/>
        <line x1="10" y1="1" x2="10" y2="4"/>
        <line x1="14" y1="1" x2="14" y2="4"/>
      </svg>
    ),
    title: 'Wear With Care',
    body: 'Remove jewellery before sleeping or carrying out activities that may pull, bend or damage delicate pieces. Handle clasps, chains and stones gently.',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/>
        <polyline points="12 6 12 12 16 14"/>
      </svg>
    ),
    title: 'Last On, First Off',
    body: 'Wear your jewellery after getting ready and remove it before everything else. This one habit alone extends the life of any piece significantly.',
  },
]

export default function JewelleryCare() {
  return (
    <main className="bg-carve-ivory">

      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-carve-forest">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(200,169,110,0.07),transparent_55%)] pointer-events-none" />
        <div className="max-w-3xl mx-auto px-6 py-24 md:py-32 text-center">
          <p className="font-body text-xs tracking-[0.3em] uppercase text-carve-gold mb-5">
            Care Guide
          </p>
          <h1 className="font-display text-4xl md:text-5xl text-carve-champagne mb-6">
            Jewellery Care Guide
          </h1>
          <div className="mx-auto mb-8 h-px w-14 bg-carve-gold/40" />
          <p className="font-body text-base leading-relaxed text-carve-champagne/65 max-w-xl mx-auto">
            Your CARVE jewellery deserves thoughtful care. Follow these simple steps to help
            preserve its shine, finish and beauty for longer.
          </p>
        </div>
      </section>

      {/* ── Care Steps ────────────────────────────────────────────────────── */}
      <section className="max-w-5xl mx-auto px-6 py-20 md:py-28">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {steps.map((step) => (
            <div
              key={step.title}
              className="bg-white rounded-2xl p-8 border border-carve-gold/10 shadow-sm flex gap-6"
            >
              <div className="shrink-0 w-12 h-12 rounded-full bg-carve-forest/6 border border-carve-gold/15 flex items-center justify-center text-carve-gold">
                {step.icon}
              </div>
              <div>
                <h3 className="font-display text-xl text-carve-charcoal mb-2">{step.title}</h3>
                <p className="font-body text-sm leading-relaxed text-carve-charcoal/60">
                  {step.body}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Disclaimer ────────────────────────────────────────────────────── */}
      <section className="max-w-3xl mx-auto px-6 pb-24 text-center">
        <div className="h-px bg-carve-gold/20 mb-12" />
        <p className="font-body text-xs leading-relaxed text-carve-charcoal/45">
          CARVE jewellery is fashion jewellery. With regular wear, natural signs of ageing may occur
          over time. Proper care will help maintain its beauty for longer.
        </p>
      </section>

    </main>
  )
}
