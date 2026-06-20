import { notFound } from 'next/navigation'
import { connectDB } from '@/lib/mongodb'
import Product from '@/models/Product'
import { IProduct } from '@/types'
import ProductForm from '@/components/admin/ProductForm'

async function getProduct(id: string): Promise<IProduct | null> {
  try {
    await connectDB()
    const product = await Product.findById(id).lean()
    if (!product) return null
    return JSON.parse(JSON.stringify(product))
  } catch {
    return null
  }
}

export default async function EditProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const product = await getProduct(id)
  if (!product) notFound()

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="font-display text-3xl text-carve-charcoal">Edit Product</h1>
        <p className="font-body text-sm text-carve-mink mt-1">{product.name}</p>
      </div>
      <ProductForm initialData={product} />
    </div>
  )
}
