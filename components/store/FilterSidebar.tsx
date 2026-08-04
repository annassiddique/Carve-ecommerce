'use client'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import { useFilterStore } from '@/store/filterStore'
import Button from '@/components/ui/Button'
import { useRouter, usePathname, useSearchParams } from 'next/navigation'

const scentFamilies = ['Floral', 'Woody', 'Oriental', 'Fresh', 'Gourmand', 'Citrus', 'Aquatic']
const perfumeSubcategories = ['For Him', 'For Her', 'Unisex', 'Oud Collection']
const jewellerySubcategories = ['Earrings', 'Necklaces', 'Rings', 'Bracelets', 'Sets']
const finishOptions = ['Gold Tone', 'Silver Tone', 'Rose Gold Tone']

const sortOptions = [
  { value: 'newest', label: 'Newest' },
  { value: 'price_asc', label: 'Price: Low to High' },
  { value: 'price_desc', label: 'Price: High to Low' },
  { value: 'featured', label: 'Featured' },
]

function FilterSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="py-5 border-b border-carve-champagne last:border-0">
      <h4 className="font-body text-xs tracking-widest uppercase text-carve-mink mb-4">{title}</h4>
      {children}
    </div>
  )
}

const CATEGORY_ROUTES: Record<string, string> = {
  all: '/shop',
  perfume: '/shop/perfumes',
  jewellery: '/shop/jewellery',
}

function FilterContent({ onClose }: { onClose?: () => void }) {
  const store = useFilterStore()
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const activeCategory =
    pathname.includes('/shop/perfumes') ? 'perfume' :
    pathname.includes('/shop/jewellery') ? 'jewellery' :
    'all'

  // Subcategory truth comes from the URL — not the store
  const activeSubcategory = searchParams.get('subcategory') ?? ''

  const handleCategoryClick = (cat: string) => {
    store.setCategory(cat)
    // Navigate to the category route, clearing any subcategory
    router.push(CATEGORY_ROUTES[cat])
    onClose?.()
  }

  // Subcategory clicks update the URL (router.replace so no extra history entry)
  const toggleSubcategory = (sub: string) => {
    const next = activeSubcategory === sub ? '' : sub
    const params = new URLSearchParams(searchParams.toString())
    if (next) {
      params.set('subcategory', next)
    } else {
      params.delete('subcategory')
    }
    const query = params.toString()
    router.replace(`${pathname}${query ? `?${query}` : ''}`)
    onClose?.()
  }

  const handleClearAll = () => {
    store.reset()
    // Also clear subcategory from URL
    router.replace(pathname)
  }

  const isPerfume = activeCategory === 'perfume'
  const isJewellery = activeCategory === 'jewellery'
  const isAll = activeCategory === 'all'

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center justify-between mb-2 px-5 pt-5">
        <h3 className="font-display text-xl text-carve-charcoal">Filters</h3>
        {onClose && (
          <button onClick={onClose} className="text-carve-mink hover:text-carve-charcoal">
            <X size={18} />
          </button>
        )}
      </div>

      <div className="flex-1 overflow-y-auto px-5">
        {/* Category — only on /shop (all) page */}
        {isAll && (
          <FilterSection title="Category">
            {(['all', 'perfume', 'jewellery'] as const).map((cat) => (
              <button
                key={cat}
                onClick={() => handleCategoryClick(cat)}
                className={`block w-full text-left py-1.5 font-body text-sm transition-colors ${
                  activeCategory === cat
                    ? 'text-carve-forest font-medium'
                    : 'text-carve-mink hover:text-carve-charcoal'
                }`}
              >
                {cat === 'all' ? 'All Products' : cat.charAt(0).toUpperCase() + cat.slice(1)}
                {activeCategory === cat && <span className="ml-2 text-carve-gold">—</span>}
              </button>
            ))}
          </FilterSection>
        )}

        {/* Perfume subcategories */}
        {(isPerfume || isAll) && (
          <FilterSection title={isPerfume ? 'Category' : 'Perfume Type'}>
            <div className="flex flex-wrap gap-2">
              {perfumeSubcategories.map((sub) => (
                <button
                  key={sub}
                  onClick={() => toggleSubcategory(sub)}
                  className={`px-3 py-1 text-xs font-body border rounded-sm transition-all ${
                    activeSubcategory === sub
                      ? 'bg-carve-forest text-carve-ivory border-carve-forest'
                      : 'border-carve-champagne text-carve-mink hover:border-carve-gold hover:text-carve-gold'
                  }`}
                >
                  {sub}
                </button>
              ))}
            </div>
          </FilterSection>
        )}

        {/* Jewellery subcategories */}
        {(isJewellery || isAll) && (
          <FilterSection title={isJewellery ? 'Category' : 'Jewellery Type'}>
            <div className="flex flex-wrap gap-2">
              {jewellerySubcategories.map((sub) => (
                <button
                  key={sub}
                  onClick={() => toggleSubcategory(sub)}
                  className={`px-3 py-1 text-xs font-body border rounded-sm transition-all ${
                    activeSubcategory === sub
                      ? 'bg-carve-forest text-carve-ivory border-carve-forest'
                      : 'border-carve-champagne text-carve-mink hover:border-carve-gold hover:text-carve-gold'
                  }`}
                >
                  {sub}
                </button>
              ))}
            </div>
          </FilterSection>
        )}

        <FilterSection title="Sort By">
          <select
            value={store.sort}
            onChange={(e) => store.setSort(e.target.value)}
            className="w-full font-body text-sm border border-carve-champagne bg-carve-ivory text-carve-charcoal px-3 py-2 rounded-sm focus:outline-none focus:border-carve-gold"
          >
            {sortOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        </FilterSection>

        {(isPerfume || isAll) && (
          <FilterSection title="Scent Family">
            <div className="flex flex-wrap gap-2">
              {scentFamilies.map((family) => (
                <button
                  key={family}
                  onClick={() => store.setScentFamily(store.scentFamily === family ? '' : family)}
                  className={`px-3 py-1 text-xs font-body border rounded-sm transition-all ${
                    store.scentFamily === family
                      ? 'bg-carve-forest text-carve-ivory border-carve-forest'
                      : 'border-carve-champagne text-carve-mink hover:border-carve-gold hover:text-carve-gold'
                  }`}
                >
                  {family}
                </button>
              ))}
            </div>
          </FilterSection>
        )}

        {(isJewellery || isAll) && (
          <FilterSection title="Finish">
            <div className="flex flex-wrap gap-2">
              {finishOptions.map((fin) => (
                <button
                  key={fin}
                  onClick={() => store.setMaterial(store.material === fin ? '' : fin)}
                  className={`px-3 py-1 text-xs font-body border rounded-sm transition-all ${
                    store.material === fin
                      ? 'bg-carve-forest text-carve-ivory border-carve-forest'
                      : 'border-carve-champagne text-carve-mink hover:border-carve-gold hover:text-carve-gold'
                  }`}
                >
                  {fin}
                </button>
              ))}
            </div>
          </FilterSection>
        )}
      </div>

      <div className="px-5 pb-5 pt-3 border-t border-carve-champagne">
        <Button variant="outline" size="sm" className="w-full" onClick={handleClearAll}>
          Clear Filters
        </Button>
      </div>
    </div>
  )
}

interface FilterSidebarProps {
  mobileOpen: boolean
  onMobileClose: () => void
}

export default function FilterSidebar({ mobileOpen, onMobileClose }: FilterSidebarProps) {
  return (
    <>
      {/* Desktop sidebar */}
      <div className="hidden lg:block w-60 shrink-0">
        <div className="sticky top-24 bg-carve-ivory border border-carve-champagne/50 rounded-sm">
          <FilterContent />
        </div>
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              className="fixed inset-0 z-40 bg-carve-charcoal/60"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onMobileClose}
            />
            <motion.div
              className="fixed top-0 left-0 h-full w-72 bg-carve-ivory z-50 shadow-xl overflow-hidden"
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            >
              <FilterContent onClose={onMobileClose} />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
