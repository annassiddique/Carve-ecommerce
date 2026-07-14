const features = [
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"/>
        <path d="M8 12l2.5 2.5L16 9"/>
      </svg>
    ),
    title: 'Refined & Long Lasting',
    subtitle: 'Crafted for those who stay.',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
      </svg>
    ),
    title: 'Fine Metals',
    subtitle: 'High-grade gold & silver tones.',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2.5 9l9.5-7 9.5 7-9.5 14z"/>
        <path d="M2.5 9h19M12 2v20M6.5 9l5.5 14 5.5-14"/>
      </svg>
    ),
    title: 'Premium Finishes',
    subtitle: 'Polished to perfection.',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 12v10H4V12"/>
        <path d="M22 7H2v5h20V7z"/>
        <path d="M12 22V7"/>
        <path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z"/>
        <path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z"/>
      </svg>
    ),
    title: 'Gift Ready',
    subtitle: 'Beautiful packaging, always.',
  },
]

export default function MarqueeStrip() {
  return (
    <div className="bg-carve-ivory border-y border-carve-champagne">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-carve-champagne">
          {features.map((f) => (
            <div key={f.title} className="flex items-start gap-3 px-6 py-6 first:pl-0 last:pr-0">
              <span className="shrink-0 text-carve-forest mt-0.5">{f.icon}</span>
              <div>
                <p className="font-body text-xs font-semibold tracking-wide text-carve-charcoal mb-0.5">
                  {f.title}
                </p>
                <p className="font-body text-xs text-carve-mink leading-relaxed">
                  {f.subtitle}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
