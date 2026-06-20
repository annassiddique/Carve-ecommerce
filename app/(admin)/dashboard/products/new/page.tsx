import ProductForm from '@/components/admin/ProductForm'

export default function NewProductPage() {
  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="font-display text-3xl text-carve-charcoal">Add New Product</h1>
        <p className="font-body text-sm text-carve-mink mt-1">Create a new product for the CARVE store.</p>
      </div>
      <ProductForm />
    </div>
  )
}
