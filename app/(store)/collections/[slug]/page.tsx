import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { getCollection } from '@/data/collections'
import { connectDB } from '@/lib/mongodb'
import Product from '@/models/Product'
import { IProduct } from '@/types'
import ProductCard from '@/components/store/ProductCard'

async function getCollectionProducts(slugs: string[]): Promise<IProduct[]> {
  try {
    await connectDB()
    const products = await Product.find({ slug: { $in: slugs } }).lean()
    // Preserve the order defined in the collection
    const map = new Map(products.map((p) => [p.slug, p]))
    return slugs
      .map((s) => map.get(s))
      .filter(Boolean)
      .map((p) => JSON.parse(JSON.stringify(p))) as IProduct[]
  } catch {
    return []
  }
}

export default async function CollectionPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const collection = getCollection(slug)
  if (!collection) notFound()

  const products = await getCollectionProducts(collection.productSlugs)

  return (
    <div className="min-h-screen bg-carve-ivory">
      {/* Hero */}
      <div className="relative h-[55vh] min-h-[400px] overflow-hidden">
        <Image
          src={collection.image}
          alt={collection.name}
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/20" />

        {/* Back link */}
        <Link
          href="/collections"
          className="absolute top-28 left-6 md:left-10 flex items-center gap-2 font-body text-[10px] tracking-[0.35em] uppercase text-carve-champagne/50 hover:text-carve-gold transition-colors"
        >
          <ArrowLeft size={11} />
          All Collections
        </Link>

        {/* Title */}
        <div className="absolute bottom-10 left-6 md:left-10 right-6 md:right-10">
          <div className="w-8 h-px bg-carve-gold mb-5" />
          <p className="font-body text-[10px] tracking-[0.4em] uppercase text-carve-gold/60 mb-3">
            {products.length} piece{products.length !== 1 ? 's' : ''}
          </p>
          <h1 className="font-display text-5xl md:text-6xl font-light text-carve-champagne leading-none mb-3">
            {collection.name}
          </h1>
          <p className="font-display italic text-carve-gold/70 text-lg">
            {collection.tagline}
          </p>
        </div>
      </div>

      {/* Description */}
      <div className="max-w-7xl mx-auto px-6 pt-12 pb-4">
        <p className="font-body text-sm text-carve-mink leading-relaxed max-w-2xl">
          {collection.description}
        </p>
      </div>

      {/* Gold rule */}
      <div className="max-w-7xl mx-auto px-6 py-6">
        <div className="h-px bg-carve-champagne/40" />
      </div>

      {/* Products */}
      <div className="max-w-7xl mx-auto px-6 pb-20">
        {products.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {products.map((product) => (
              <ProductCard key={product._id as string} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="font-display text-xl text-carve-mink">
              Products coming soon.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
