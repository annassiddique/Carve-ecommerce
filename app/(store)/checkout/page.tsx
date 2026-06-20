'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import toast from 'react-hot-toast'
import { useCartStore } from '@/store/cartStore'
import { formatPrice } from '@/lib/utils'
import Button from '@/components/ui/Button'

type Step = 'form' | 'payment' | 'success'

interface CustomerForm {
  name: string
  email: string
  phone: string
  address: string
  city: string
}

export default function CheckoutPage() {
  const { items, subtotal, clearCart } = useCartStore()
  const [step, setStep] = useState<Step>('form')
  const [paymentMethod, setPaymentMethod] = useState<'cod' | 'easypaisa'>('cod')
  const [form, setForm] = useState<CustomerForm>({ name: '', email: '', phone: '', address: '', city: '' })
  const [loading, setLoading] = useState(false)
  const [orderNumber, setOrderNumber] = useState('')
  const [screenshotUploading, setScreenshotUploading] = useState(false)
  const [screenshotUrl, setScreenshotUrl] = useState('')

  const shippingFee = subtotal() >= 3000 ? 0 : 200
  const total = subtotal() + shippingFee

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setStep('payment')
  }

  const handlePlaceOrder = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customer: form,
          items: items.map((i) => ({
            productId: i.productId,
            name: i.name,
            image: i.image,
            price: i.price,
            quantity: i.quantity,
          })),
          paymentMethod,
          screenshotUrl: screenshotUrl || undefined,
          paymentStatus: screenshotUrl ? 'screenshot_submitted' : 'pending',
          total,
        }),
      })
      const data = await res.json()
      if (data.success) {
        setOrderNumber(data.data.orderNumber)
        clearCart()
        setStep('success')
      } else {
        toast.error('Failed to place order. Please try again.')
      }
    } finally {
      setLoading(false)
    }
  }

  const handleScreenshotUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setScreenshotUploading(true)
    try {
      const fd = new FormData()
      fd.append('file', file)
      const res = await fetch('/api/upload?public=true', { method: 'POST', body: fd })
      const data = await res.json()
      if (data.success) {
        setScreenshotUrl(data.data.url)
        toast.success('Screenshot uploaded!')
      }
    } finally {
      setScreenshotUploading(false)
    }
  }

  const whatsappMessage = encodeURIComponent(
    `Hi! I've placed order #${orderNumber} on CARVE and completed my EasyPaisa payment. Please find my screenshot attached. Thank you!`
  )
  const whatsappURL = `https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '923000000000'}?text=${whatsappMessage}`

  if (items.length === 0 && step !== 'success') {
    return (
      <div className="min-h-screen bg-carve-ivory pt-24 flex items-center justify-center">
        <div className="text-center">
          <p className="font-display text-2xl text-carve-charcoal mb-4">Your cart is empty</p>
          <Link href="/shop"><Button variant="primary">Shop Now</Button></Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-carve-ivory pt-24">
      <div className="max-w-5xl mx-auto px-6 py-12">
        {/* Steps indicator */}
        {step !== 'success' && (
          <div className="flex items-center gap-4 mb-10">
            {(['form', 'payment'] as const).map((s, i) => (
              <div key={s} className="flex items-center gap-2">
                <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-body font-medium border ${
                  step === s || (step === 'payment' && s === 'form')
                    ? 'bg-carve-forest text-carve-ivory border-carve-forest'
                    : 'border-carve-champagne text-carve-mink'
                }`}>
                  {i + 1}
                </div>
                <span className="font-body text-xs tracking-widest uppercase text-carve-mink hidden sm:block">
                  {s === 'form' ? 'Your Details' : 'Payment'}
                </span>
                {i === 0 && <div className="w-8 h-px bg-carve-champagne" />}
              </div>
            ))}
          </div>
        )}

        {/* STEP 1: Form */}
        {step === 'form' && (
          <div className="grid lg:grid-cols-5 gap-10">
            <motion.div
              className="lg:col-span-3"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="font-display text-3xl text-carve-charcoal mb-8">Your Details</h1>
              <form onSubmit={handleFormSubmit} className="space-y-5">
                {(
                  [
                    { key: 'name', label: 'Full Name', type: 'text', placeholder: 'Ayesha Ahmed' },
                    { key: 'email', label: 'Email', type: 'email', placeholder: 'ayesha@email.com' },
                    { key: 'phone', label: 'Phone', type: 'tel', placeholder: '03XX-XXXXXXX' },
                    { key: 'address', label: 'Full Address', type: 'text', placeholder: 'House #, Street, Area' },
                    { key: 'city', label: 'City', type: 'text', placeholder: 'Karachi' },
                  ] as const
                ).map(({ key, label, type, placeholder }) => (
                  <div key={key}>
                    <label className="block font-body text-xs tracking-widest uppercase text-carve-mink mb-2">
                      {label}
                    </label>
                    <input
                      type={type}
                      value={form[key]}
                      onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                      placeholder={placeholder}
                      required
                      className="w-full bg-carve-smoke border border-carve-champagne text-carve-charcoal placeholder-carve-champagne/60 px-4 py-3 text-sm font-body focus:outline-none focus:border-carve-gold rounded-sm"
                    />
                  </div>
                ))}
                <Button type="submit" variant="primary" size="lg" className="w-full mt-4">
                  Continue to Payment
                </Button>
              </form>
            </motion.div>

            {/* Order summary */}
            <div className="lg:col-span-2">
              <OrderSummary items={items} subtotal={subtotal()} shippingFee={shippingFee} total={total} />
            </div>
          </div>
        )}

        {/* STEP 2: Payment */}
        {step === 'payment' && (
          <div className="grid lg:grid-cols-5 gap-10">
            <motion.div
              className="lg:col-span-3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="font-display text-3xl text-carve-charcoal mb-8">Payment</h1>

              {/* Payment method selection */}
              <div className="space-y-3 mb-8">
                {(
                  [
                    { value: 'cod', label: 'Cash on Delivery', desc: 'Pay when your order arrives' },
                    { value: 'easypaisa', label: 'EasyPaisa Online', desc: 'Transfer and upload screenshot' },
                  ] as const
                ).map(({ value, label, desc }) => (
                  <button
                    key={value}
                    onClick={() => setPaymentMethod(value)}
                    className={`w-full flex items-center gap-4 p-4 border rounded-sm text-left transition-all ${
                      paymentMethod === value
                        ? 'border-carve-gold bg-carve-champagne/20'
                        : 'border-carve-champagne hover:border-carve-mink'
                    }`}
                  >
                    <div className={`w-5 h-5 rounded-full border-2 flex-shrink-0 flex items-center justify-center ${
                      paymentMethod === value ? 'border-carve-gold' : 'border-carve-champagne'
                    }`}>
                      {paymentMethod === value && <div className="w-2.5 h-2.5 rounded-full bg-carve-gold" />}
                    </div>
                    <div>
                      <p className="font-body text-sm font-medium text-carve-charcoal">{label}</p>
                      <p className="font-body text-xs text-carve-mink">{desc}</p>
                    </div>
                  </button>
                ))}
              </div>

              {/* EasyPaisa details */}
              {paymentMethod === 'easypaisa' && (
                <motion.div
                  className="bg-carve-smoke border border-carve-champagne rounded-sm p-5 mb-6"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                >
                  <h3 className="font-body text-sm font-medium text-carve-charcoal mb-3">
                    EasyPaisa Account Details
                  </h3>
                  <div className="font-body text-sm text-carve-mink space-y-1 mb-4">
                    <p>Account Number: <span className="font-medium text-carve-charcoal">
                      {process.env.NEXT_PUBLIC_EASYPAISA_ACCOUNT || '03XX-XXXXXXX'}
                    </span></p>
                    <p>Account Name: <span className="font-medium text-carve-charcoal">CARVE</span></p>
                    <p className="font-medium text-carve-gold">Amount: {formatPrice(total)}</p>
                  </div>

                  <div className="border-t border-carve-champagne pt-4">
                    <p className="font-body text-xs text-carve-mink mb-3">
                      After completing your transfer, upload the screenshot:
                    </p>
                    <label className="block">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleScreenshotUpload}
                        className="hidden"
                        id="screenshot-upload"
                      />
                      <Button
                        variant="outline"
                        size="sm"
                        loading={screenshotUploading}
                        className="cursor-pointer"
                        onClick={() => document.getElementById('screenshot-upload')?.click()}
                        type="button"
                      >
                        {screenshotUrl ? '✓ Screenshot Uploaded' : 'Upload Screenshot'}
                      </Button>
                    </label>
                  </div>
                </motion.div>
              )}

              <div className="flex gap-3">
                <Button
                  variant="ghost"
                  size="md"
                  onClick={() => setStep('form')}
                  className="border border-carve-champagne"
                >
                  Back
                </Button>
                <Button
                  variant="primary"
                  size="lg"
                  loading={loading}
                  onClick={handlePlaceOrder}
                  className="flex-1"
                  disabled={paymentMethod === 'easypaisa' && !screenshotUrl}
                >
                  {paymentMethod === 'cod' ? 'Place Order' : 'Confirm Order'}
                </Button>
              </div>

              {paymentMethod === 'easypaisa' && !screenshotUrl && (
                <p className="font-body text-xs text-carve-mink mt-2">
                  Please upload the payment screenshot to continue.
                </p>
              )}
            </motion.div>

            <div className="lg:col-span-2">
              <OrderSummary items={items} subtotal={subtotal()} shippingFee={shippingFee} total={total} />
            </div>
          </div>
        )}

        {/* STEP 3: Success */}
        {step === 'success' && (
          <motion.div
            className="max-w-lg mx-auto text-center py-12"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="w-16 h-16 bg-carve-champagne rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-2xl">✓</span>
            </div>
            <h1 className="font-display text-4xl text-carve-charcoal mb-3">Order Confirmed!</h1>
            <p className="font-body text-sm text-carve-mink mb-2">Thank you, {form.name}.</p>
            <p className="font-body text-sm text-carve-mink mb-6">
              Your order number is{' '}
              <span className="font-medium text-carve-charcoal">{orderNumber}</span>
            </p>

            {paymentMethod === 'easypaisa' && (
              <a href={whatsappURL} target="_blank" rel="noopener noreferrer">
                <Button variant="gold" size="lg" className="mb-4 w-full">
                  Confirm on WhatsApp
                </Button>
              </a>
            )}

            <Link href="/shop">
              <Button variant="outline" size="md" className="w-full">Continue Shopping</Button>
            </Link>
          </motion.div>
        )}
      </div>
    </div>
  )
}

function OrderSummary({
  items,
  subtotal,
  shippingFee,
  total,
}: {
  items: { name: string; image: string; price: number; quantity: number }[]
  subtotal: number
  shippingFee: number
  total: number
}) {
  return (
    <div className="bg-carve-smoke border border-carve-champagne rounded-sm p-5">
      <h2 className="font-display text-xl text-carve-charcoal mb-5">Order Summary</h2>
      <div className="space-y-3 mb-5">
        {items.map((item, i) => (
          <div key={i} className="flex items-center gap-3">
            <div className="relative w-12 h-12 rounded-sm overflow-hidden bg-carve-champagne flex-shrink-0">
              <Image src={item.image} alt={item.name} fill className="object-cover" sizes="48px" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-body text-xs text-carve-charcoal line-clamp-2">{item.name}</p>
              <p className="font-body text-xs text-carve-mink">x{item.quantity}</p>
            </div>
            <span className="font-body text-xs font-medium text-carve-charcoal flex-shrink-0">
              {formatPrice(item.price * item.quantity)}
            </span>
          </div>
        ))}
      </div>
      <div className="border-t border-carve-champagne pt-4 space-y-2">
        <div className="flex justify-between font-body text-xs text-carve-mink">
          <span>Subtotal</span><span>{formatPrice(subtotal)}</span>
        </div>
        <div className="flex justify-between font-body text-xs text-carve-mink">
          <span>Shipping</span><span>{shippingFee === 0 ? 'Free' : formatPrice(shippingFee)}</span>
        </div>
        <div className="flex justify-between font-body text-sm font-medium text-carve-charcoal pt-1">
          <span>Total</span><span className="font-display text-lg">{formatPrice(total)}</span>
        </div>
      </div>
    </div>
  )
}
