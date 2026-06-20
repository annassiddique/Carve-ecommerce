import mongoose, { Schema, Document } from 'mongoose'

export interface IProduct extends Document {
  name: string
  slug: string
  category: 'perfume' | 'jewellery'
  subcategory: string
  price: number
  comparePrice?: number
  description: string
  shortDescription: string
  images: string[]
  stock: number
  inStock: boolean
  featured: boolean
  tags: string[]
  attributes: {
    scentFamily?: string
    topNotes?: string[]
    heartNotes?: string[]
    baseNotes?: string[]
    size?: string
    material?: string
    gemstone?: string
    length?: string
    finish?: string
  }
  moodboard: {
    theme: string
    description: string
    images: string[]
    keywords: string[]
  }
  createdAt: Date
  updatedAt: Date
}

const ProductSchema = new Schema<IProduct>(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true },
    category: { type: String, enum: ['perfume', 'jewellery'], required: true },
    subcategory: { type: String, required: true },
    price: { type: Number, required: true },
    comparePrice: { type: Number },
    description: { type: String, required: true },
    shortDescription: { type: String, required: true },
    images: [{ type: String }],
    stock: { type: Number, default: 0 },
    inStock: { type: Boolean, default: true },
    featured: { type: Boolean, default: false },
    tags: [{ type: String }],
    attributes: {
      scentFamily: String,
      topNotes: [String],
      heartNotes: [String],
      baseNotes: [String],
      size: String,
      material: String,
      gemstone: String,
      length: String,
      finish: String,
    },
    moodboard: {
      theme: { type: String, default: '' },
      description: { type: String, default: '' },
      images: [{ type: String }],
      keywords: [{ type: String }],
    },
  },
  { timestamps: true }
)


export default mongoose.models.Product ||
  mongoose.model<IProduct>('Product', ProductSchema)
