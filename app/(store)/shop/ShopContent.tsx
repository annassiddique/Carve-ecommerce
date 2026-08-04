'use client'
import { useEffect, useState, useCallback, useMemo } from 'react'
import { useSearchParams, usePathname } from 'next/navigation'
import { motion } from 'framer-motion'
import { SlidersHorizontal } from 'lucide-react'
import { IProduct } from '@/types'
import { useFilterStore } from '@/store/filterStore'
import FilterSidebar from '@/components/store/FilterSidebar'
import ProductGrid from '@/components/store/ProductGrid'
import Button from '@/components/ui/Button'

export default function ShopContent() {
  const [products, setProducts] = useState<IProduct[]>([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [filterOpen, setFilterOpen] = useState(false)
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const filters = useFilterStore()

  // Category is always derived from the URL path — never from the store
  const activeCategory = useMemo(() => {
    if (pathname.includes('/shop/perfumes')) return 'perfume'
    if (pathname.includes('/shop/jewellery')) return 'jewellery'
    return 'all'
  }, [pathname])

  // When category changes, clear store-based sidebar filters (sort/scent/material).
  // Subcategory is NOT stored here — it lives entirely in the URL.
  useEffect(() => {
    filters.setScentFamily('')
    filters.setMaterial('')
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeCategory])

  // Sync search query from URL → store (so the search box stays filled on navigation)
  useEffect(() => {
    const q = searchParams.get('search')
    if (q) filters.setSearch(q)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams])

  // Subcategory comes ONLY from the URL. No store involvement = no race condition.
  const fetchProducts = useCallback(async () => {
    setLoading(true)
    try {
      const params = new URLSearchParams()
      if (activeCategory !== 'all') params.set('category', activeCategory)
      if (filters.sort) params.set('sort', filters.sort)
      if (filters.search) params.set('search', filters.search)
      if (filters.scentFamily) params.set('scentFamily', filters.scentFamily)

      const sub = searchParams.get('subcategory')
      if (sub) params.set('subcategory', sub)

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
  }, [activeCategory, filters.sort, filters.search, filters.scentFamily, page, searchParams])

  // Reset to page 1 whenever any filter axis changes
  useEffect(() => {
    setPage(1)
  }, [activeCategory, filters.sort, filters.search, filters.scentFamily, searchParams])

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
      {/* Page header */}
      <div className="bg-carve-forest pt-24 pb-12 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <p className="font-body text-xs tracking-[0.3em] uppercase text-carve-gold mb-2">
              {activeCategory === 'perfume' || activeCategory === 'jewellery' ? 'Collection' : 'Explore'}
            </p>
            <h1 className="font-display text-5xl md:text-6xl text-carve-champagne font-light">
              {pageTitle}
            </h1>
          </motion.div>
        </div>
      </div>

      {/* Main content */}
      <div id="products" className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex gap-8">
          <FilterSidebar
            mobileOpen={filterOpen}
            onMobileClose={() => setFilterOpen(false)}
          />

          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-5">
              <p className="font-body text-xs text-carve-mink tracking-wide">
                {productCount}
              </p>
              <button
                onClick={() => setFilterOpen(true)}
                className="lg:hidden flex items-center gap-2 px-3 py-2 border border-carve-champagne rounded-sm text-carve-mink hover:border-carve-gold hover:text-carve-charcoal transition-colors"
              >
                <SlidersHorizontal size={13} />
                <span className="font-body text-xs tracking-widest uppercase">Filters</span>
              </button>
            </div>

            <ProductGrid products={products} loading={loading} />

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
