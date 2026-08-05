import Link from 'next/link'

export default function CollectionsPage() {
  return (
    <div className="min-h-screen bg-carve-forest flex flex-col items-center justify-center relative overflow-hidden px-6">

      {/* Ambient glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-carve-gold/5 blur-[120px]" />
      </div>

      {/* Top gold rule */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-carve-gold/40 to-transparent" />

      <div className="relative z-10 text-center max-w-2xl">

        {/* Eyebrow */}
        <p className="font-body text-[10px] tracking-[0.55em] uppercase text-carve-gold mb-8">
          C A R V E
        </p>

        {/* Decorative line */}
        <div className="flex items-center justify-center gap-3 mb-10">
          <div className="h-px w-12 bg-carve-gold/40" />
          <span className="text-carve-gold/60 text-xs">◆</span>
          <div className="h-px w-12 bg-carve-gold/40" />
        </div>

        {/* Heading */}
        <h1 className="font-display font-light text-carve-champagne leading-none mb-6"
          style={{ fontSize: 'clamp(2.8rem, 7vw, 5.5rem)' }}>
          Something Beautiful<br />
          <span className="italic">Is Coming</span>
        </h1>

        {/* Divider */}
        <div className="flex items-center justify-center gap-3 my-8">
          <div className="h-px w-8 bg-carve-gold/30" />
          <span className="text-carve-gold/40 text-[8px]">◆</span>
          <div className="h-px w-8 bg-carve-gold/30" />
        </div>

        {/* Subtext */}
        <p className="font-display italic text-carve-champagne/50 leading-relaxed mb-3"
          style={{ fontSize: 'clamp(0.9rem, 2vw, 1.15rem)' }}>
          Our curated gift collections are being crafted with care.
        </p>
        <p className="font-body text-xs tracking-wide text-carve-champagne/30 uppercase mb-14">
          Gifting · Luxury · Presence
        </p>

        {/* CTA */}
        <Link href="/shop">
          <span className="inline-block border border-carve-gold/50 text-carve-gold font-body text-[10px] tracking-[0.35em] uppercase px-10 py-4 hover:bg-carve-gold hover:text-carve-forest transition-all duration-300 cursor-pointer">
            Shop Now
          </span>
        </Link>

      </div>

      {/* Bottom gold rule */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-carve-gold/40 to-transparent" />

    </div>
  )
}
