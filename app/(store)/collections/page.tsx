import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'
import { collections } from '@/data/collections'
import { connectDB } from '@/lib/mongodb'
import Product from '@/models/Product'

async function getCollectionCounts(): Promise<Record<string, number>> {
  try {
    await connectDB()
    const counts: Record<string, number> = {}
    await Promise.all(
      collections.map(async (col) => {
        counts[col.slug] = await Product.countDocuments({ slug: { $in: col.productSlugs } })
      })
    )
    return counts
  } catch {
    return {}
  }
}

export default async function CollectionsPage() {
  const counts = await getCollectionCounts()

  return (
    <div className="min-h-screen bg-carve-ivory">
      {/* Header */}
      <div className="bg-carve-forest pt-28 pb-16 px-6">
        <div className="max-w-7xl mx-auto">
          <p className="font-body text-xs tracking-[0.4em] uppercase text-carve-gold mb-4">
            Curated Edits
          </p>
          <h1 className="font-display text-6xl md:text-7xl font-light text-carve-champagne leading-none mb-4">
            Collections
          </h1>
          <p className="font-body text-sm text-carve-champagne/50 max-w-md leading-relaxed">
            Not just products — stories. Each collection is a mood, a moment, a reason to feel something.
          </p>
        </div>
      </div>

      {/* Gold rule */}
      <div className="h-px bg-gradient-to-r from-transparent via-carve-gold/40 to-transparent" />

      {/* Collections grid */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {collections.map((col, i) => {
            const count = counts[col.slug] ?? 0
            const isFeatured = i === 0 // first card spans full width on large screens

            return (
              <Link
                key={col.slug}
                href={`/collections/${col.slug}`}
                className={`group block ${isFeatured ? 'md:col-span-2' : ''}`}
              >
                <div className={`relative overflow-hidden rounded-sm ${isFeatured ? 'aspect-[16/7]' : 'aspect-[4/3]'}`}>
                  {col.video ? (
                    <video
                      src={col.video}
                      autoPlay
                      muted
                      loop
                      playsInline
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 pointer-events-none"
                    />
                  ) : (
                    <Image
                      src={col.image}
                      alt={col.name}
                      fill
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-105 pointer-events-none"
                      sizes={isFeatured ? '100vw' : '(max-width: 768px) 100vw, 50vw'}
                      priority={i === 0}
                    />
                  )}

                  {/* Overlay — pointer-events-none so clicks reach the Link */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10 pointer-events-none" />

                  {/* Content — pointer-events-none so clicks reach the Link */}
                  <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-10 pointer-events-none">
                    {/* Gold line */}
                    <div className="w-8 h-px bg-carve-gold/60 mb-5 transition-all duration-500 group-hover:w-16 group-hover:bg-carve-gold" />

                    <div className={`flex ${isFeatured ? 'flex-col md:flex-row md:items-end md:justify-between' : 'flex-col'} gap-4`}>
                      <div>
                        <p className="font-body text-[10px] tracking-[0.4em] uppercase text-carve-gold/60 mb-2">
                          {count} piece{count !== 1 ? 's' : ''}
                        </p>
                        <h2 className={`font-display font-light text-carve-champagne leading-none ${isFeatured ? 'text-4xl md:text-5xl' : 'text-3xl'}`}>
                          {col.name}
                        </h2>
                        <p className="font-display italic text-carve-gold/70 text-sm mt-2">
                          {col.tagline}
                        </p>
                      </div>

                      {/* CTA */}
                      <div className="flex items-center gap-2 opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                        <span className="font-body text-[10px] tracking-[0.35em] uppercase text-carve-gold">
                          Explore
                        </span>
                        <ArrowRight size={11} className="text-carve-gold transition-transform group-hover:translate-x-0.5" />
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </div>
  )
}
