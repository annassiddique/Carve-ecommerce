import { IProduct } from '@/types'
import { connectDB } from '@/lib/mongodb'
import Product from '@/models/Product'
import ProductCard from './ProductCard'
import Link from 'next/link'

async function getHomeProducts(): Promise<IProduct[]> {
  try {
    await connectDB()
    // Featured products first, then fill up to 5 with newest
    const featured = await Product.find({ featured: true, inStock: true })
      .sort({ createdAt: -1 })
      .limit(5)
      .lean()

    if (featured.length >= 5) return JSON.parse(JSON.stringify(featured.slice(0, 5)))

    const featuredIds = featured.map((p) => p._id)
    const rest = await Product.find({ _id: { $nin: featuredIds }, inStock: true })
      .sort({ createdAt: -1 })
      .limit(5 - featured.length)
      .lean()

    return JSON.parse(JSON.stringify([...featured, ...rest]))
  } catch {
    return []
  }
}

export default async function FeaturedProducts() {
  const products = await getHomeProducts()

  return (
    <section className="py-16 bg-carve-ivory">
      <div className="max-w-7xl mx-auto px-6">

        {/* Heading */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-4">
          <div>
            <p className="font-body text-[10px] tracking-[0.4em] uppercase text-carve-mink mb-2">
              Handpicked for you
            </p>
            <h2 className="font-display text-3xl md:text-4xl text-carve-charcoal tracking-wide">
              OUR FAVOURITES
            </h2>
          </div>
          <Link
            href="/shop"
            className="font-body text-xs tracking-widest uppercase text-carve-mink border-b border-carve-champagne hover:text-carve-gold hover:border-carve-gold transition-colors pb-0.5 self-start md:self-auto"
          >
            View All →
          </Link>
        </div>

        {products.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3 md:gap-4">
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="font-display text-xl text-carve-mink">Products coming soon.</p>
          </div>
        )}
      </div>
    </section>
  )
}
