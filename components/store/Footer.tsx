import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-carve-charcoal text-carve-champagne/70">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="md:col-span-2">
            <h2 className="font-display text-3xl font-semibold tracking-[0.15em] text-carve-champagne mb-3">
              CARVE
            </h2>
            <p className="font-display italic text-carve-gold text-lg mb-4">
              Scent. Shine. Presence.
            </p>
            <p className="font-body text-sm leading-relaxed text-carve-champagne/50 max-w-xs">
              Affordable luxury for those who choose to leave a mark. Handcrafted perfumes and
              jewellery designed for the modern Pakistani woman and man.
            </p>
          </div>

          {/* Shop */}
          <div>
            <h3 className="font-body text-xs tracking-widest uppercase text-carve-gold mb-5">Shop</h3>
            <ul className="space-y-3">
              {[
                { label: 'All Products', href: '/shop' },
                { label: 'Perfumes', href: '/shop/perfumes' },
                { label: 'Jewellery', href: '/shop/jewellery' },
                { label: 'For Him', href: '/shop?subcategory=For+Him' },
                { label: 'For Her', href: '/shop?subcategory=For+Her' },
              ].map((link) => (
                <li key={link.href}>
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

          {/* Info */}
          <div>
            <h3 className="font-body text-xs tracking-widest uppercase text-carve-gold mb-5">Info</h3>
            <ul className="space-y-3">
              {[
                { label: 'About CARVE', href: '#' },
                { label: 'Shipping Policy', href: '#' },
                { label: 'Returns', href: '#' },
                { label: 'Contact', href: '#' },
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

        <div className="mt-12 pt-8 border-t border-carve-mink/20 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="font-body text-xs text-carve-champagne/30 tracking-wide">
            © 2024 CARVE. All rights reserved. Pakistan.
          </p>
          <p className="font-body text-xs text-carve-champagne/30">
            Cash on Delivery · EasyPaisa
          </p>
        </div>
      </div>
    </footer>
  )
}
