import mongoose, { Schema, Document } from 'mongoose'

export interface IOrderItem {
  productId: string
  name: string
  image: string
  price: number
  quantity: number
}

export interface IOrder extends Document {
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
  createdAt: Date
  updatedAt: Date
}

const OrderSchema = new Schema<IOrder>(
  {
    orderNumber: { type: String, unique: true },
    customer: {
      name: { type: String, required: true },
      email: { type: String, required: true },
      phone: { type: String, required: true },
      address: { type: String, required: true },
      city: { type: String, required: true },
    },
    items: [
      {
        productId: String,
        name: String,
        image: String,
        price: Number,
        quantity: Number,
      },
    ],
    subtotal: Number,
    total: Number,
    paymentMethod: { type: String, enum: ['cod', 'easypaisa'] },
    paymentStatus: {
      type: String,
      enum: ['pending', 'screenshot_submitted', 'approved', 'rejected'],
      default: 'pending',
    },
    orderStatus: {
      type: String,
      enum: ['pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled'],
      default: 'pending',
    },
    screenshotUrl: String,
    whatsappConfirmed: { type: Boolean, default: false },
    notes: String,
  },
  { timestamps: true }
)


export default mongoose.models.Order ||
  mongoose.model<IOrder>('Order', OrderSchema)
