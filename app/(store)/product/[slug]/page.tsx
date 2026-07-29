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
  if (!product.pairsWith?.length) return []
  const slugs = product.pairsWith.map((p) => p.slug)
  const products = await Product.find({ slug: { $in: slugs } }).lean()
  return products.map((p) => {
    const pw = product.pairsWith!.find((x) => x.slug === (p as IProduct).slug)!
    return { ...(JSON.parse(JSON.stringify(p)) as IProduct), bundlePrice: pw.bundlePrice }
  })
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const product = await getProduct(slug)
  if (!product) notFound()
  const pairedProducts = await getPairedProducts(product)
  return <ProductDetailClient product={product} pairedProducts={pairedProducts} />
}
