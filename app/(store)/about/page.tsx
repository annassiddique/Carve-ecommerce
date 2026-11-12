import type { Metadata } from 'next'
import { getSiteSettings } from '@/lib/siteSettings'

export const metadata: Metadata = {
  title: 'About CARVE | Our Story & The CARVE Promise',
  description:
    'Discover the story behind CARVE and the promise we make to every customer — thoughtful selection, dependable quality, and premium presentation.',
}

const pillarIcons = [
  <svg key="star" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#C8A96E" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2l2.09 6.26L20 9.27l-5 4.87L16.18 21 12 17.77 7.82 21 9 14.14l-5-4.87 5.91-.01z" />
  </svg>,
  <svg key="box" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#C8A96E" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 7H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z" />
    <path d="M16 3H8a2 2 0 0 0-2 2v2h12V5a2 2 0 0 0-2-2z" />
  </svg>,
  <svg key="chat" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#C8A96E" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
  </svg>,
]

export default async function AboutPage() {
  const settings = await getSiteSettings()
  const {
    storyParagraph1,
    storyParagraph2,
    closingTagline,
    promiseHeadline,
    promiseIntro,
    closingStatement,
    pillar1Title,
    pillar1Description,
    pillar2Title,
    pillar2Description,
    pillar3Title,
    pillar3Description,
  } = settings.about

  const pillars = [
    { title: pillar1Title, description: pillar1Description },
    { title: pillar2Title, description: pillar2Description },
    { title: pillar3Title, description: pillar3Description },
  ]

  return (
    <main className="bg-carve-ivory">

      {/* ── Our Story ──────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-carve-forest">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(200,169,110,0.08),transparent_60%)] pointer-events-none" />
        <div className="max-w-3xl mx-auto px-6 py-28 md:py-36 text-center">
          <p className="font-body text-xs tracking-[0.3em] uppercase text-carve-gold mb-6">
            Our Story
          </p>
          <p className="font-display text-2xl md:text-3xl leading-[1.65] text-carve-champagne mb-8">
            {storyParagraph1}
          </p>
          <p className="font-display text-xl md:text-2xl leading-[1.65] text-carve-champagne/70 mb-14">
            {storyParagraph2}
          </p>
          <p className="font-display italic text-2xl md:text-3xl text-carve-gold tracking-wide">
            {closingTagline}
          </p>
        </div>
      </section>

      {/* ── The CARVE Promise ──────────────────────────────────────────────── */}
      <section id="promise" className="max-w-5xl mx-auto px-6 py-24 md:py-32">

        <div className="text-center mb-16">
          <p className="font-body text-xs tracking-[0.3em] uppercase text-carve-gold mb-4">
            The CARVE Promise
          </p>
          <h2 className="font-display text-4xl md:text-5xl text-carve-charcoal">
            {promiseHeadline}
          </h2>
          <div className="mx-auto mt-6 h-px w-16 bg-carve-gold/40" />
          <p className="mt-8 font-body text-base leading-relaxed text-carve-charcoal/70 max-w-2xl mx-auto">
            {promiseIntro}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {pillars.map((pillar, i) => (
            <div key={i} className="bg-white rounded-2xl p-8 border border-carve-gold/10 shadow-sm">
              <div className="w-10 h-10 rounded-full bg-carve-gold/10 flex items-center justify-center mb-5">
                {pillarIcons[i]}
              </div>
              <h3 className="font-display text-xl text-carve-charcoal mb-3">{pillar.title}</h3>
              <p className="font-body text-sm leading-relaxed text-carve-charcoal/60">
                {pillar.description}
              </p>
            </div>
          ))}
        </div>

        {/* Closing statement */}
        <div className="text-center border-t border-carve-gold/20 pt-14">
          <p className="font-display italic text-xl md:text-2xl text-carve-charcoal/80 leading-relaxed mb-8 whitespace-pre-line">
            {closingStatement}
          </p>
          <p className="font-body text-xs leading-relaxed text-carve-charcoal/40 max-w-xl mx-auto">
            CARVE fragrances are independent fragrance impressions inspired by popular scent
            profiles. CARVE is not affiliated with or endorsed by the original designer brands.
          </p>
        </div>

      </section>

    </main>
  )
}
