export default function MarqueeStrip() {
  const text = 'SCENT · SHINE · PRESENCE · AFFORDABLE LUXURY · CARVE YOUR PRESENCE · '

  return (
    <div className="bg-carve-forest py-3 overflow-hidden border-y border-carve-sage/30">
      <div className="flex whitespace-nowrap">
        <div className="animate-marquee flex items-center gap-0">
          {Array.from({ length: 4 }).map((_, i) => (
            <span key={i} className="font-body text-xs tracking-[0.3em] text-carve-gold mr-0 px-2">
              {text}
            </span>
          ))}
        </div>
        <div className="animate-marquee flex items-center gap-0" aria-hidden>
          {Array.from({ length: 4 }).map((_, i) => (
            <span key={i} className="font-body text-xs tracking-[0.3em] text-carve-gold px-2">
              {text}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
