'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import { IProduct } from '@/types'
import { slugify } from '@/lib/utils'
import ImageUploader from './ImageUploader'
import Button from '@/components/ui/Button'

const scentFamilies = ['Floral', 'Woody', 'Oriental', 'Fresh', 'Gourmand', 'Citrus', 'Aquatic']
const materials = ['Gold Plated', 'Silver', 'Rose Gold']
const jewellerySubcats = ['Ring', 'Necklace', 'Bracelet', 'Earrings', 'Anklet', 'Set']
const perfumeSubcats = ['For Him', 'For Her', 'Unisex', 'Oud Collection']
const finishes = ['Matte', 'Shiny', 'Textured']

interface TagInputProps {
  label: string
  tags: string[]
  onChange: (tags: string[]) => void
  placeholder?: string
}

function TagInput({ label, tags, onChange, placeholder }: TagInputProps) {
  const [input, setInput] = useState('')

  const addTag = () => {
    const val = input.trim()
    if (val && !tags.includes(val)) {
      onChange([...tags, val])
    }
    setInput('')
  }

  return (
    <div>
      <label className="block font-body text-xs tracking-widest uppercase text-carve-mink mb-2">{label}</label>
      <div className="flex flex-wrap gap-2 mb-2">
        {tags.map((tag) => (
          <span key={tag} className="flex items-center gap-1 px-3 py-1 bg-carve-champagne text-carve-charcoal font-body text-xs rounded-sm">
            {tag}
            <button type="button" onClick={() => onChange(tags.filter((t) => t !== tag))} className="hover:text-red-500">×</button>
          </span>
        ))}
      </div>
      <div className="flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
          placeholder={placeholder || 'Type and press Enter'}
          className="flex-1 bg-carve-smoke border border-carve-champagne text-carve-charcoal placeholder-carve-champagne/50 px-3 py-2 text-sm font-body focus:outline-none focus:border-carve-gold rounded-sm"
        />
        <Button type="button" variant="outline" size="sm" onClick={addTag}>Add</Button>
      </div>
    </div>
  )
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-carve-ivory border border-carve-champagne rounded-sm p-6 mb-5">
      <h3 className="font-display text-lg text-carve-charcoal mb-5 pb-3 border-b border-carve-champagne">{title}</h3>
      <div className="space-y-5">{children}</div>
    </div>
  )
}

function FormField({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block font-body text-xs tracking-widest uppercase text-carve-mink mb-2">{label}</label>
      {children}
    </div>
  )
}

type ProductFormData = Omit<IProduct, '_id' | 'createdAt' | 'updatedAt'>

const defaultForm: ProductFormData = {
  name: '',
  slug: '',
  category: 'perfume',
  subcategory: 'For Him',
  price: 0,
  comparePrice: undefined,
  description: '',
  shortDescription: '',
  images: [],
  stock: 0,
  inStock: true,
  featured: false,
  tags: [],
  attributes: {},
  moodboard: { theme: '', description: '', images: [], keywords: [] },
  pairsWith: [],
}

interface ProductFormProps {
  initialData?: IProduct
}

export default function ProductForm({ initialData }: ProductFormProps) {
  const router = useRouter()
  const [form, setForm] = useState<ProductFormData>(
    initialData
      ? {
          name: initialData.name,
          slug: initialData.slug,
          category: initialData.category,
          subcategory: initialData.subcategory,
          price: initialData.price,
          comparePrice: initialData.comparePrice,
          description: initialData.description,
          shortDescription: initialData.shortDescription,
          images: initialData.images,
          stock: initialData.stock,
          inStock: initialData.inStock,
          featured: initialData.featured,
          tags: initialData.tags || [],
          attributes: initialData.attributes || {},
          moodboard: initialData.moodboard || defaultForm.moodboard,
          pairsWith: initialData.pairsWith || [],
        }
      : defaultForm
  )
  const [loading, setLoading] = useState(false)

  const set = (key: keyof ProductFormData, value: unknown) =>
    setForm((prev) => ({ ...prev, [key]: value }))

  const setAttr = (key: string, value: unknown) =>
    setForm((prev) => ({ ...prev, attributes: { ...prev.attributes, [key]: value } }))

  const setMoodboard = (key: string, value: unknown) =>
    setForm((prev) => ({ ...prev, moodboard: { ...prev.moodboard, [key]: value } }))

  const handleNameChange = (name: string) => {
    set('name', name)
    if (!initialData) set('slug', slugify(name))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (form.images.length === 0) {
      toast.error('Please upload at least one product image.')
      return
    }
    setLoading(true)
    try {
      const url = initialData ? `/api/products/${initialData._id}` : '/api/products'
      const method = initialData ? 'PUT' : 'POST'
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await res.json()
      if (data.success) {
        toast.success(initialData ? 'Product updated!' : 'Product created!')
        router.push('/dashboard/products')
        router.refresh()
      } else {
        toast.error(data.error || 'Something went wrong')
      }
    } finally {
      setLoading(false)
    }
  }

  const subcats = form.category === 'perfume' ? perfumeSubcats : jewellerySubcats
  const inputClass =
    'w-full bg-carve-smoke border border-carve-champagne text-carve-charcoal placeholder-carve-champagne/50 px-4 py-2.5 text-sm font-body focus:outline-none focus:border-carve-gold rounded-sm'
  const selectClass =
    'w-full bg-carve-smoke border border-carve-champagne text-carve-charcoal px-4 py-2.5 text-sm font-body focus:outline-none focus:border-carve-gold rounded-sm'

  return (
    <form onSubmit={handleSubmit} className="max-w-3xl">
      {/* Section 1: Basic Info */}
      <Section title="Basic Information">
        <FormField label="Product Name">
          <input
            value={form.name}
            onChange={(e) => handleNameChange(e.target.value)}
            placeholder="Noir Vetiver"
            required
            className={inputClass}
          />
        </FormField>

        <FormField label="Slug">
          <input
            value={form.slug}
            onChange={(e) => set('slug', e.target.value)}
            className={`${inputClass} text-carve-mink`}
            placeholder="auto-generated"
          />
        </FormField>

        <div className="grid grid-cols-2 gap-4">
          <FormField label="Category">
            <select
              value={form.category}
              onChange={(e) => {
                set('category', e.target.value)
                set('subcategory', e.target.value === 'perfume' ? 'For Him' : 'Ring')
              }}
              className={selectClass}
            >
              <option value="perfume">Perfume</option>
              <option value="jewellery">Jewellery</option>
            </select>
          </FormField>

          <FormField label="Subcategory">
            <select
              value={form.subcategory}
              onChange={(e) => set('subcategory', e.target.value)}
              className={selectClass}
            >
              {subcats.map((s) => <option key={s} value={s}>{s}</option>)}
            </select>
          </FormField>
        </div>

        <FormField label="Short Description (max 120 chars)">
          <textarea
            value={form.shortDescription}
            onChange={(e) => set('shortDescription', e.target.value)}
            maxLength={120}
            rows={2}
            placeholder="A brief, evocative description..."
            required
            className={inputClass}
          />
          <p className="font-body text-xs text-carve-mink mt-1">{form.shortDescription.length}/120</p>
        </FormField>

        <FormField label="Full Description">
          <textarea
            value={form.description}
            onChange={(e) => set('description', e.target.value)}
            rows={5}
            placeholder="Full product description..."
            required
            className={inputClass}
          />
        </FormField>

        <TagInput
          label="Tags"
          tags={form.tags}
          onChange={(tags) => set('tags', tags)}
          placeholder="e.g. luxury, floral, oud"
        />
      </Section>

      {/* Section 2: Pricing & Stock */}
      <Section title="Pricing & Stock">
        <div className="grid grid-cols-2 gap-4">
          <FormField label="Price (PKR)">
            <input
              type="number"
              value={form.price}
              onChange={(e) => set('price', Number(e.target.value))}
              min={0}
              required
              className={inputClass}
            />
          </FormField>

          <FormField label="Compare Price (optional)">
            <input
              type="number"
              value={form.comparePrice || ''}
              onChange={(e) => set('comparePrice', e.target.value ? Number(e.target.value) : undefined)}
              min={0}
              placeholder="Was price"
              className={inputClass}
            />
          </FormField>
        </div>

        <FormField label="Stock Quantity">
          <input
            type="number"
            value={form.stock}
            onChange={(e) => set('stock', Number(e.target.value))}
            min={0}
            className={inputClass}
          />
        </FormField>

        <div className="flex gap-6">
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={form.inStock}
              onChange={(e) => set('inStock', e.target.checked)}
              className="w-4 h-4 accent-carve-forest"
            />
            <span className="font-body text-sm text-carve-charcoal">In Stock</span>
          </label>
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={form.featured}
              onChange={(e) => set('featured', e.target.checked)}
              className="w-4 h-4 accent-carve-forest"
            />
            <span className="font-body text-sm text-carve-charcoal">Featured on Homepage</span>
          </label>
        </div>
      </Section>

      {/* Section 3: Images */}
      <Section title="Product Images">
        <p className="font-body text-xs text-carve-mink -mt-2">
          First image becomes the cover. Drag to reorder.
        </p>
        <ImageUploader
          images={form.images}
          onChange={(imgs) => set('images', imgs)}
          maxImages={8}
        />
      </Section>

      {/* Section 4: Attributes */}
      <Section title={form.category === 'perfume' ? 'Fragrance Details' : 'Jewellery Details'}>
        {form.category === 'perfume' ? (
          <>
            <FormField label="Scent Family">
              <select
                value={form.attributes.scentFamily || ''}
                onChange={(e) => setAttr('scentFamily', e.target.value)}
                className={selectClass}
              >
                <option value="">Select scent family</option>
                {scentFamilies.map((f) => <option key={f} value={f}>{f}</option>)}
              </select>
            </FormField>
            <FormField label="Size / Volume">
              <input
                value={form.attributes.size || ''}
                onChange={(e) => setAttr('size', e.target.value)}
                placeholder="e.g. 50ml, 100ml"
                className={inputClass}
              />
            </FormField>
            <TagInput
              label="Top Notes"
              tags={form.attributes.topNotes || []}
              onChange={(tags) => setAttr('topNotes', tags)}
              placeholder="e.g. Bergamot, Lemon"
            />
            <TagInput
              label="Heart Notes"
              tags={form.attributes.heartNotes || []}
              onChange={(tags) => setAttr('heartNotes', tags)}
              placeholder="e.g. Rose, Jasmine"
            />
            <TagInput
              label="Base Notes"
              tags={form.attributes.baseNotes || []}
              onChange={(tags) => setAttr('baseNotes', tags)}
              placeholder="e.g. Oud, Vetiver, Musk"
            />
          </>
        ) : (
          <>
            <FormField label="Material">
              <select
                value={form.attributes.material || ''}
                onChange={(e) => setAttr('material', e.target.value)}
                className={selectClass}
              >
                <option value="">Select material</option>
                {materials.map((m) => <option key={m} value={m}>{m}</option>)}
              </select>
            </FormField>
            <div className="grid grid-cols-2 gap-4">
              <FormField label="Gemstone (optional)">
                <input
                  value={form.attributes.gemstone || ''}
                  onChange={(e) => setAttr('gemstone', e.target.value)}
                  placeholder="e.g. Cubic Zirconia"
                  className={inputClass}
                />
              </FormField>
              <FormField label="Length / Size">
                <input
                  value={form.attributes.length || ''}
                  onChange={(e) => setAttr('length', e.target.value)}
                  placeholder="e.g. 18 inch, Size 7"
                  className={inputClass}
                />
              </FormField>
            </div>
            <FormField label="Finish">
              <select
                value={form.attributes.finish || ''}
                onChange={(e) => setAttr('finish', e.target.value)}
                className={selectClass}
              >
                <option value="">Select finish</option>
                {finishes.map((f) => <option key={f} value={f}>{f}</option>)}
              </select>
            </FormField>
          </>
        )}
      </Section>

      {/* Section 5: Moodboard */}
      <Section title="Moodboard Configuration">
        <p className="font-body text-xs text-carve-mink -mt-2">
          Configure the product detail moodboard section.
        </p>
        <FormField label="Theme Name">
          <input
            value={form.moodboard.theme}
            onChange={(e) => setMoodboard('theme', e.target.value)}
            placeholder="e.g. Dark Luxury, Floral Romance"
            className={inputClass}
          />
        </FormField>
        <FormField label="Vibe Description">
          <textarea
            value={form.moodboard.description}
            onChange={(e) => setMoodboard('description', e.target.value)}
            rows={3}
            placeholder="2–3 sentences about the feeling and world of this product..."
            className={inputClass}
          />
        </FormField>
        <TagInput
          label="Mood Keywords"
          tags={form.moodboard.keywords}
          onChange={(tags) => setMoodboard('keywords', tags)}
          placeholder="e.g. opulent, candlelit, nocturnal"
        />
        <FormField label="Moodboard Images">
          <p className="font-body text-xs text-carve-mink mb-3">
            Upload 6–8 lifestyle images that match the product vibe.
          </p>
          <ImageUploader
            images={form.moodboard.images}
            onChange={(imgs) => setMoodboard('images', imgs)}
            maxImages={8}
          />
        </FormField>
      </Section>

      {/* Section 6: Pairs With (jewellery only) */}
      {form.category === 'jewellery' && (
        <Section title="Pairs With (Bundle Pricing)">
          <p className="font-body text-xs text-carve-mink -mt-2">
            Link a complementary jewellery piece and set a discounted bundle price shown on the product page.
          </p>

          {(form.pairsWith || []).map((pair, idx) => (
            <div key={idx} className="flex gap-3 items-end">
              <div className="flex-1">
                <label className="block font-body text-xs tracking-widest uppercase text-carve-mink mb-2">
                  Paired Product Slug
                </label>
                <input
                  value={pair.slug}
                  onChange={(e) => {
                    const updated = [...(form.pairsWith || [])]
                    updated[idx] = { ...updated[idx], slug: e.target.value }
                    set('pairsWith', updated)
                  }}
                  placeholder="e.g. ivory-clover-station-bracelet"
                  className={inputClass}
                />
              </div>
              <div className="w-36">
                <label className="block font-body text-xs tracking-widest uppercase text-carve-mink mb-2">
                  Bundle Price (PKR)
                </label>
                <input
                  type="number"
                  value={pair.bundlePrice || ''}
                  onChange={(e) => {
                    const updated = [...(form.pairsWith || [])]
                    updated[idx] = { ...updated[idx], bundlePrice: Number(e.target.value) }
                    set('pairsWith', updated)
                  }}
                  placeholder="3699"
                  className={inputClass}
                />
              </div>
              <button
                type="button"
                onClick={() => set('pairsWith', (form.pairsWith || []).filter((_, i) => i !== idx))}
                className="shrink-0 px-3 py-2.5 text-xs font-body text-red-500 border border-red-200 rounded-sm hover:bg-red-50 transition-colors"
              >
                Remove
              </button>
            </div>
          ))}

          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => set('pairsWith', [...(form.pairsWith || []), { slug: '', bundlePrice: 0 }])}
          >
            + Add Pairing
          </Button>
        </Section>
      )}

      {/* Save */}
      <div className="flex gap-3 pb-8">
        <Button type="submit" variant="primary" size="lg" loading={loading}>
          {initialData ? 'Update Product' : 'Publish Product'}
        </Button>
        <Button
          type="button"
          variant="outline"
          size="md"
          onClick={() => router.push('/dashboard/products')}
        >
          Cancel
        </Button>
      </div>
    </form>
  )
}
