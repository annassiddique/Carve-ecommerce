import { IProduct } from '@/types'
import ProductCard from './ProductCard'

interface ProductGridProps {
  products: IProduct[]
  loading?: boolean
}

function SkeletonCard() {
  return (
    <div className="bg-carve-ivory border border-carve-champagne/50 rounded-sm overflow-hidden animate-pulse">
      <div className="aspect-[4/5] bg-carve-smoke" />
      <div className="p-4 space-y-2">
        <div className="h-3 bg-carve-champagne rounded w-1/3" />
        <div className="h-5 bg-carve-champagne rounded w-3/4" />
        <div className="h-3 bg-carve-champagne rounded w-full" />
        <div className="h-3 bg-carve-champagne rounded w-2/3" />
        <div className="h-4 bg-carve-champagne rounded w-1/4 mt-2" />
      </div>
    </div>
  )
}

export default function ProductGrid({ products, loading }: ProductGridProps) {
  if (loading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
        {Array.from({ length: 8 }).map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    )
  }

  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <p className="font-display text-2xl text-carve-charcoal mb-2">No products found</p>
        <p className="font-body text-sm text-carve-mink">Try adjusting your filters.</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
      {products.map((product) => (
        <ProductCard key={product._id} product={product} />
      ))}
    </div>
  )
}
