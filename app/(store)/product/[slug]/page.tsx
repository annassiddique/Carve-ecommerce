import { notFound } from 'next/navigation'
import { connectDB } from '@/lib/mongodb'
import Product from '@/models/Product'
import { IProduct } from '@/types'
import ProductDetailClient from './ProductDetailClient'

export type PairedProduct = IProduct & { bundlePrice: number }

async function getProduct(slug: string): Promise<IProduct | null> {
  try {
    await connectDB()
    const product = await Product.findOne({ slug }).lean()
    if (!product) return null
    return JSON.parse(JSON.stringify(product))
  } catch {
    return null
  }
}

async function getPairedProducts(product: IProduct): Promise<PairedProduct[]> {
  const results: PairedProduct[] = []
  const seenSlugs = new Set<string>()

  // Direct pairings — this product explicitly lists pairs
  if (product.pairsWith?.length) {
    const slugs = product.pairsWith.map((p) => p.slug)
    const direct = await Product.find({ slug: { $in: slugs } }).lean() as IProduct[]
    for (const p of direct) {
      const pw = product.pairsWith.find((x) => x.slug === p.slug)!
      results.push({ ...(JSON.parse(JSON.stringify(p)) as IProduct), bundlePrice: pw.bundlePrice })
      seenSlugs.add(p.slug)
    }
  }

  // Reverse pairings — other products that list this product as their pair
  const reverse = await Product.find({ 'pairsWith.slug': product.slug }).lean() as IProduct[]
  for (const p of reverse) {
    if (seenSlugs.has(p.slug)) continue
    const pw = p.pairsWith!.find((x) => x.slug === product.slug)!
    results.push({ ...(JSON.parse(JSON.stringify(p)) as IProduct), bundlePrice: pw.bundlePrice })
  }

  return results
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const product = await getProduct(slug)
  if (!product) notFound()
  const pairedProducts = await getPairedProducts(product)
  return <ProductDetailClient product={product} pairedProducts={pairedProducts} />
}
