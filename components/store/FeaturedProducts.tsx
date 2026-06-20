import { IProduct } from '@/types'
import { connectDB } from '@/lib/mongodb'
import Product from '@/models/Product'
import ProductCard from './ProductCard'
import Link from 'next/link'
import Button from '@/components/ui/Button'

async function getFeaturedProducts(): Promise<IProduct[]> {
  try {
    await connectDB()
    const products = await Product.find({ featured: true, inStock: true })
      .sort({ createdAt: -1 })
      .limit(4)
      .lean()
    return JSON.parse(JSON.stringify(products))
  } catch {
    return []
  }
}

export default async function FeaturedProducts() {
  const products = await getFeaturedProducts()

  return (
    <section className="py-20 bg-carve-ivory">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <p className="font-body text-xs tracking-[0.3em] uppercase text-carve-mink mb-3">
              Handpicked
            </p>
            <h2 className="font-display text-4xl md:text-5xl text-carve-charcoal">
              Our Signatures
            </h2>
          </div>
          <Link href="/shop">
            <Button variant="outline" size="sm">View All</Button>
          </Link>
        </div>

        {products.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="font-display text-xl text-carve-mink">
              Featured products coming soon.
            </p>
          </div>
        )}
      </div>
    </section>
  )
}
