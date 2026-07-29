export interface ProductAttributes {
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

export interface ProductMoodboard {
  theme: string
  description: string
  images: string[]
  keywords: string[]
}

export interface IProduct {
  _id: string
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
  attributes: ProductAttributes
  moodboard: ProductMoodboard
  pairsWith?: { slug: string; bundlePrice: number }[]
  createdAt: string
  updatedAt: string
}

export interface IOrderItem {
  productId: string
  name: string
  image: string
  price: number
  quantity: number
}

export interface IOrder {
  _id: string
  orderNumber: string
  customer: {
    name: string
    email: string
    phone: string
    address: string
    city: string
  }
  items: IOrderItem[]
  subtotal: number
  total: number
  paymentMethod: 'cod' | 'easypaisa'
  paymentStatus: 'pending' | 'screenshot_submitted' | 'approved' | 'rejected'
  orderStatus: 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled'
  screenshotUrl?: string
  whatsappConfirmed: boolean
  notes?: string
  createdAt: string
  updatedAt: string
}

export interface CartItem {
  productId: string
  name: string
  image: string
  price: number
  quantity: number
  slug: string
}

export interface BundleDiscount {
  slugA: string
  slugB: string
  discount: number
}

export type ScentFamily = 'Floral' | 'Woody' | 'Oriental' | 'Fresh' | 'Gourmand' | 'Citrus' | 'Aquatic'
export type Material = 'Gold Plated' | 'Silver' | 'Rose Gold'
export type JewelleryFinish = 'Matte' | 'Shiny' | 'Textured'
