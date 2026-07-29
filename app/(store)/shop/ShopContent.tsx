'use client'
import { useEffect, useState, useCallback, useMemo } from 'react'
import { useSearchParams, usePathname } from 'next/navigation'
import { motion } from 'framer-motion'
import { SlidersHorizontal } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { IProduct } from '@/types'
import { useFilterStore } from '@/store/filterStore'
import FilterSidebar from '@/components/store/FilterSidebar'
import ProductGrid from '@/components/store/ProductGrid'
import Button from '@/components/ui/Button'

function PerfumesBanner() {
  return (
    <section className="relative w-full h-screen overflow-hidden">
      <Image
        src="/images/banner/Without%20text%20perfume%20category%20banner.png"
        alt="CARVE Perfumes — Timeless Scents"
        fill
        className="object-cover object-center"
        priority
        sizes="100vw"
      />

      {/* Overlay + text sit on top absolutely */}
      <div className="absolute inset-0 bg-linear-to-r from-white/20 via-white/5 to-transparent" />

      <div className="absolute inset-0 flex items-start" style={{ paddingTop: 'clamp(100px, 14vw, 180px)' }}>
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 w-full">
          <div className="w-full max-w-[90%] md:max-w-[45%]">

            {/* C monogram */}
            <motion.div
              className="mb-4"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7 }}
            >
              <div
                className="rounded-full border border-carve-charcoal/60 flex items-center justify-center"
                style={{ width: 'clamp(32px, 3.2vw, 46px)', height: 'clamp(32px, 3.2vw, 46px)' }}
              >
                <span
                  className="font-display text-carve-charcoal leading-none"
                  style={{ fontSize: 'clamp(0.85rem, 1.4vw, 1.2rem)' }}
                >
                  C
                </span>
              </div>
            </motion.div>

            <motion.p
              className="font-body uppercase text-carve-charcoal mb-3"
              style={{ fontSize: 'clamp(8px, 0.95vw, 11px)', letterSpacing: '0.55em' }}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: 0.08 }}
            >
              C A R V E
            </motion.p>

            <motion.p
              className="font-body uppercase text-carve-gold mb-5"
              style={{ fontSize: 'clamp(7px, 0.85vw, 10px)', letterSpacing: '0.35em' }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.15 }}
            >
              SCENT. SHINE. PRESENCE.
            </motion.p>

            <motion.h1
              className="font-display italic text-carve-charcoal leading-tight mb-6 md:mb-8"
              style={{ fontSize: 'clamp(1.4rem, 3.2vw, 2.8rem)' }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.85, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              Timeless Scents.<br />Unforgettable Impressions.
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.32 }}
            >
              <Link href="#products">
                <span
                  className="inline-block bg-carve-forest text-carve-ivory font-body uppercase tracking-[0.28em] hover:bg-carve-sage transition-colors duration-200"
                  style={{ fontSize: 'clamp(8px, 0.9vw, 10px)', padding: 'clamp(10px, 1.2vw, 14px) clamp(18px, 2.5vw, 28px)' }}
                >
                  PERFUMES
                </span>
              </Link>
            </motion.div>

          </div>
        </div>
      </div>
    </section>
  )
}

function JewelleryBanner() {
  return (
    <section className="relative w-full h-screen overflow-hidden">
      <Image
        src="/images/banner/without%20text%20Jewelry%20category%20Banner.png"
        alt="CARVE Jewellery — Carve Your Presence"
        fill
        className="object-cover"
        style={{ objectPosition: 'center 15%' }}
        priority
        sizes="100vw"
      />
      {/* Very subtle overlay — light/cream background */}
      <div className="absolute inset-0 bg-linear-to-r from-white/15 via-transparent to-transparent" />

      <div className="absolute inset-0 flex items-center" style={{ paddingTop: 'clamp(64px, 8vw, 96px)' }}>
        <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-16 w-full">
          <div className="w-full max-w-[90%] md:max-w-[52%]">

            <motion.p
              className="font-body uppercase text-carve-charcoal mb-3"
              style={{ fontSize: 'clamp(8px, 0.95vw, 11px)', letterSpacing: '0.56em' }}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75 }}
            >
              C A R V E
            </motion.p>

            <motion.div
              className="flex items-center mb-5 md:mb-6"
              style={{ gap: 'clamp(6px, 1vw, 10px)' }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.1 }}
            >
              <div className="h-px bg-carve-gold/65" style={{ width: 'clamp(20px, 2.5vw, 32px)' }} />
              <span className="text-carve-gold" style={{ fontSize: 'clamp(6px, 0.8vw, 9px)' }}>◆</span>
              <div className="h-px bg-carve-gold/65" style={{ width: 'clamp(20px, 2.5vw, 32px)' }} />
            </motion.div>

            <motion.h1
              className="font-display italic font-light text-carve-forest leading-none mb-4 md:mb-5"
              style={{ fontSize: 'clamp(2rem, 5.5vw, 5.2rem)' }}
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.85, delay: 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              Carve Your<br />Presence
            </motion.h1>

            <motion.p
              className="font-display italic text-carve-charcoal/60 mb-7 md:mb-9"
              style={{ fontSize: 'clamp(0.72rem, 1.25vw, 0.95rem)' }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.75, delay: 0.26 }}
            >
              Affordable luxury in scent and adornment.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.35 }}
            >
              <Link href="#products">
                <span
                  className="inline-block bg-carve-forest text-carve-ivory font-body uppercase tracking-[0.28em] hover:bg-carve-sage transition-colors duration-200"
                  style={{ fontSize: 'clamp(8px, 0.9vw, 10px)', padding: 'clamp(10px, 1.2vw, 14px) clamp(18px, 2.5vw, 28px)' }}
                >
                  SHOP JEWELLERY
                </span>
              </Link>
            </motion.div>

          </div>
        </div>
      </div>
    </section>
  )
}

export default function ShopContent() {
  const [products, setProducts] = useState<IProduct[]>([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [filterOpen, setFilterOpen] = useState(false)
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const filters = useFilterStore()

  // Derive category from URL — always correct, never stale
  const activeCategory = useMemo(() => {
    if (pathname.includes('/shop/perfumes')) return 'perfume'
    if (pathname.includes('/shop/jewellery')) return 'jewellery'
    return filters.category
  }, [pathname, filters.category])

  // When category changes clear category-specific filters
  useEffect(() => {
    filters.setSubcategory('')
    filters.setScentFamily('')
    filters.setMaterial('')
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeCategory])

  const fetchProducts = useCallback(async () => {
    setLoading(true)
    try {
      const params = new URLSearchParams()
      if (activeCategory !== 'all') params.set('category', activeCategory)
      if (filters.sort) params.set('sort', filters.sort)
      if (filters.search) params.set('search', filters.search)
      if (filters.scentFamily) params.set('scentFamily', filters.scentFamily)
      if (filters.subcategory) params.set('subcategory', filters.subcategory)
      params.set('page', String(page))
      params.set('limit', '12')

      const res = await fetch(`/api/products?${params.toString()}`)
      const data = await res.json()
      if (data.success) {
        setProducts(data.data)
        setTotalPages(data.pagination.pages)
      }
    } finally {
      setLoading(false)
    }
  }, [activeCategory, filters.sort, filters.search, filters.scentFamily, filters.subcategory, page])

  useEffect(() => {
    const sub = searchParams.get('subcategory')
    filters.setSubcategory(sub ?? '')
    const q = searchParams.get('search')
    if (q) filters.setSearch(q)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams])

  useEffect(() => {
    setPage(1)
  }, [activeCategory, filters.sort, filters.search, filters.scentFamily, filters.subcategory])

  useEffect(() => {
    fetchProducts()
  }, [fetchProducts])

  const pageTitle =
    activeCategory === 'perfume' ? 'Perfumes' :
    activeCategory === 'jewellery' ? 'Jewellery' :
    'All Products'

  const productCount = loading ? '—' : `${products.length} product${products.length !== 1 ? 's' : ''}`

  return (
    <>
      {/* Banner — category-specific image hero or simple forest header for /shop */}
      {activeCategory === 'perfume' ? (
        <PerfumesBanner />
      ) : activeCategory === 'jewellery' ? (
        <JewelleryBanner />
      ) : (
        <div className="bg-carve-forest pt-24 pb-12 px-6">
          <div className="max-w-7xl mx-auto">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <p className="font-body text-xs tracking-[0.3em] uppercase text-carve-gold mb-2">
                Explore
              </p>
              <h1 className="font-display text-5xl md:text-6xl text-carve-champagne font-light">
                {pageTitle}
              </h1>
            </motion.div>
          </div>
        </div>
      )}

      {/* Main content */}
      <div id="products" className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex gap-8">
          <FilterSidebar
            mobileOpen={filterOpen}
            onMobileClose={() => setFilterOpen(false)}
          />

          <div className="flex-1 min-w-0">
            {/* Toolbar — count on left, filter trigger on right (mobile only) */}
            <div className="flex items-center justify-between mb-5">
              <p className="font-body text-xs text-carve-mink tracking-wide">
                {productCount}
              </p>

              {/* Filter trigger — mobile only */}
              <button
                onClick={() => setFilterOpen(true)}
                className="lg:hidden flex items-center gap-2 px-3 py-2 border border-carve-champagne rounded-sm text-carve-mink hover:border-carve-gold hover:text-carve-charcoal transition-colors"
              >
                <SlidersHorizontal size={13} />
                <span className="font-body text-xs tracking-widest uppercase">Filters</span>
              </button>
            </div>

            <ProductGrid products={products} loading={loading} />

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center gap-2 mt-10">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                  <Button
                    key={p}
                    variant={p === page ? 'primary' : 'outline'}
                    size="sm"
                    onClick={() => setPage(p)}
                  >
                    {p}
                  </Button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}
