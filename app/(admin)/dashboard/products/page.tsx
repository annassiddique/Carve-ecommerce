import { connectDB } from '@/lib/mongodb'
import Product from '@/models/Product'
import { IProduct } from '@/types'
import Link from 'next/link'
import Image from 'next/image'
import { formatPrice } from '@/lib/utils'
import Button from '@/components/ui/Button'
import Badge from '@/components/ui/Badge'
import ProductActions from './ProductActions'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const PAGE_SIZE = 20

async function getProducts(page: number): Promise<{ products: IProduct[]; total: number }> {
  try {
    await connectDB()
    const skip = (page - 1) * PAGE_SIZE
    const [products, total] = await Promise.all([
      Product.find().sort({ createdAt: -1 }).skip(skip).limit(PAGE_SIZE).lean(),
      Product.countDocuments(),
    ])
    return { products: JSON.parse(JSON.stringify(products)), total }
  } catch {
    return { products: [], total: 0 }
  }
}

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>
}) {
  const params = await searchParams
  const page = Math.max(1, parseInt(params.page || '1'))
  const { products, total } = await getProducts(page)
  const totalPages = Math.ceil(total / PAGE_SIZE)

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display text-3xl text-carve-charcoal">Products</h1>
          <p className="font-body text-sm text-carve-mink mt-1">
            {total} total products
            {totalPages > 1 && ` · page ${page} of ${totalPages}`}
          </p>
        </div>
        <Link href="/dashboard/products/new">
          <Button variant="primary" size="md">+ Add Product</Button>
        </Link>
      </div>

      {products.length === 0 && page === 1 ? (
        <div className="bg-carve-ivory border border-carve-champagne rounded-sm p-12 text-center">
          <p className="font-display text-xl text-carve-charcoal mb-2">No products yet</p>
          <p className="font-body text-sm text-carve-mink mb-5">Add your first product to get started.</p>
          <Link href="/dashboard/products/new">
            <Button variant="primary">Add Product</Button>
          </Link>
        </div>
      ) : (
        <>
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
                        <div className="relative w-10 h-10 rounded-sm overflow-hidden bg-carve-smoke shrink-0">
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

          {totalPages > 1 && (
            <div className="flex items-center justify-between mt-6">
              <p className="font-body text-xs text-carve-mink">
                Showing {(page - 1) * PAGE_SIZE + 1}–{Math.min(page * PAGE_SIZE, total)} of {total}
              </p>
              <div className="flex items-center gap-2">
                {page > 1 && (
                  <Link href={`?page=${page - 1}`}>
                    <button className="flex items-center gap-1.5 px-3 py-2 font-body text-xs border border-carve-champagne rounded-sm text-carve-mink hover:border-carve-forest hover:text-carve-charcoal transition-colors">
                      <ChevronLeft size={13} /> Prev
                    </button>
                  </Link>
                )}

                <div className="flex gap-1">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                    <Link key={p} href={`?page=${p}`}>
                      <button
                        className={`w-8 h-8 font-body text-xs rounded-sm transition-colors ${
                          p === page
                            ? 'bg-carve-forest text-carve-ivory'
                            : 'border border-carve-champagne text-carve-mink hover:border-carve-forest hover:text-carve-charcoal'
                        }`}
                      >
                        {p}
                      </button>
                    </Link>
                  ))}
                </div>

                {page < totalPages && (
                  <Link href={`?page=${page + 1}`}>
                    <button className="flex items-center gap-1.5 px-3 py-2 font-body text-xs border border-carve-champagne rounded-sm text-carve-mink hover:border-carve-forest hover:text-carve-charcoal transition-colors">
                      Next <ChevronRight size={13} />
                    </button>
                  </Link>
                )}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  )
}
