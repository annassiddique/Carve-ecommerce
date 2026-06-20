import { connectDB } from '@/lib/mongodb'
import Product from '@/models/Product'
import { IProduct } from '@/types'
import Link from 'next/link'
import Image from 'next/image'
import { formatPrice } from '@/lib/utils'
import Button from '@/components/ui/Button'
import Badge from '@/components/ui/Badge'
import ProductActions from './ProductActions'

async function getProducts(): Promise<IProduct[]> {
  try {
    await connectDB()
    const products = await Product.find().sort({ createdAt: -1 }).lean()
    return JSON.parse(JSON.stringify(products))
  } catch {
    return []
  }
}

export default async function ProductsPage() {
  const products = await getProducts()

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display text-3xl text-carve-charcoal">Products</h1>
          <p className="font-body text-sm text-carve-mink mt-1">{products.length} total products</p>
        </div>
        <Link href="/dashboard/products/new">
          <Button variant="primary" size="md">+ Add Product</Button>
        </Link>
      </div>

      {products.length === 0 ? (
        <div className="bg-carve-ivory border border-carve-champagne rounded-sm p-12 text-center">
          <p className="font-display text-xl text-carve-charcoal mb-2">No products yet</p>
          <p className="font-body text-sm text-carve-mink mb-5">Add your first product to get started.</p>
          <Link href="/dashboard/products/new">
            <Button variant="primary">Add Product</Button>
          </Link>
        </div>
      ) : (
        <div className="bg-carve-ivory border border-carve-champagne rounded-sm overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-carve-champagne">
                <th className="text-left px-5 py-3 font-body text-xs tracking-widest uppercase text-carve-mink">Product</th>
                <th className="text-left px-5 py-3 font-body text-xs tracking-widest uppercase text-carve-mink hidden md:table-cell">Category</th>
                <th className="text-left px-5 py-3 font-body text-xs tracking-widest uppercase text-carve-mink">Price</th>
                <th className="text-left px-5 py-3 font-body text-xs tracking-widest uppercase text-carve-mink hidden lg:table-cell">Stock</th>
                <th className="text-left px-5 py-3 font-body text-xs tracking-widest uppercase text-carve-mink">Status</th>
                <th className="px-5 py-3" />
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product._id} className="border-b border-carve-smoke hover:bg-carve-smoke/50 transition-colors">
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="relative w-10 h-10 rounded-sm overflow-hidden bg-carve-smoke flex-shrink-0">
                        {product.images[0] ? (
                          <Image
                            src={product.images[0]}
                            alt={product.name}
                            fill
                            className="object-cover"
                            sizes="40px"
                          />
                        ) : (
                          <div className="w-full h-full bg-carve-champagne" />
                        )}
                      </div>
                      <div>
                        <p className="font-body text-sm font-medium text-carve-charcoal">{product.name}</p>
                        <p className="font-body text-xs text-carve-mink">{product.subcategory}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-4 hidden md:table-cell">
                    <span className="font-body text-sm text-carve-mink capitalize">{product.category}</span>
                  </td>
                  <td className="px-5 py-4">
                    <span className="font-body text-sm text-carve-charcoal">{formatPrice(product.price)}</span>
                  </td>
                  <td className="px-5 py-4 hidden lg:table-cell">
                    <span className={`font-body text-sm ${product.stock < 5 ? 'text-yellow-600 font-medium' : 'text-carve-charcoal'}`}>
                      {product.stock}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-2">
                      {product.inStock ? <Badge variant="green">In Stock</Badge> : <Badge variant="gray">Out</Badge>}
                      {product.featured && <Badge variant="gold">Featured</Badge>}
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    <ProductActions productId={product._id} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
