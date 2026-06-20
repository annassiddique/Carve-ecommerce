import { notFound } from 'next/navigation'
import { connectDB } from '@/lib/mongodb'
import Product from '@/models/Product'
import { IProduct } from '@/types'
import ProductDetailClient from './ProductDetailClient'

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

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const product = await getProduct(slug)
  if (!product) notFound()
  return <ProductDetailClient product={product} />
}
