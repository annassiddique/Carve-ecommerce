import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-carve-charcoal text-carve-champagne/70">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Brand */}
          <div className="lg:col-span-1">
            <h2 className="font-display text-3xl font-semibold tracking-[0.15em] text-carve-champagne mb-3">
              CARVE
            </h2>
            <p className="font-display italic text-carve-gold text-lg mb-4">
              Scent. Shine. Presence.
            </p>
            <p className="font-body text-sm leading-relaxed text-carve-champagne/50 mb-6">
              Affordable luxury for those who choose to leave a mark. Perfumes and
              jewellery designed for the modern Pakistani woman and man.
            </p>
            {/* Instagram */}
            <a
              href="https://www.instagram.com/carve.pk"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 font-body text-xs tracking-widest uppercase text-carve-gold hover:text-carve-champagne transition-colors duration-200"
            >
              {/* Instagram icon */}
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                <circle cx="12" cy="12" r="4"/>
                <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>
              </svg>
              The Carve World
            </a>
          </div>

          {/* Shop */}
          <div>
            <h3 className="font-body text-xs tracking-widest uppercase text-carve-gold mb-5">Shop</h3>
            <ul className="space-y-3">
              {[
                { label: 'All Products', href: '/shop' },
                { label: 'Perfumes', href: '/shop/perfumes' },
                { label: 'Jewellery', href: '/shop/jewellery' },
                { label: 'Gift Sets', href: '/collections' },
                { label: 'New Arrivals', href: '/shop?sort=newest' },
              ].map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="font-body text-sm text-carve-champagne/50 hover:text-carve-gold transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* About */}
          <div>
            <h3 className="font-body text-xs tracking-widest uppercase text-carve-gold mb-5">About</h3>
            <ul className="space-y-3">
              {[
                { label: 'Our Story', href: '/about' },
                { label: 'CARVE Promise', href: '/about#promise' },
                { label: 'Jewellery Care Guide', href: '/about#jewellery-care' },
              ].map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="font-body text-sm text-carve-champagne/50 hover:text-carve-gold transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Care */}
          <div>
            <h3 className="font-body text-xs tracking-widest uppercase text-carve-gold mb-5">Customer Care</h3>
            <ul className="space-y-3">
              {[
                { label: 'Contact Us', href: '/contact' },
                { label: 'FAQs', href: '/faqs' },
                { label: 'Shipping & Returns', href: '/shipping' },
                { label: 'Privacy Policy', href: '/privacy' },
                { label: 'Terms & Conditions', href: '/terms' },
              ].map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="font-body text-sm text-carve-champagne/50 hover:text-carve-gold transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-carve-champagne/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="font-body text-xs text-carve-champagne/30 tracking-wide">
            © {new Date().getFullYear()} CARVE. All rights reserved. Pakistan.
          </p>
          <p className="font-body text-xs text-carve-champagne/30">
            Cash on Delivery · EasyPaisa
          </p>
        </div>
      </div>
    </footer>
  )
}
