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
    if (sub) filters.setSubcategory(sub)
    const q = searchParams.get('search')
    if (q) filters.setSearch(q)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

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
      {/* Banner */}
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

      {/* Main content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
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
