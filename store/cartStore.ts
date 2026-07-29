'use client'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { CartItem, BundleDiscount } from '@/types'

interface CartStore {
  items: CartItem[]
  bundleDiscounts: BundleDiscount[]
  isOpen: boolean
  addItem: (item: CartItem) => void
  removeItem: (productId: string) => void
  updateQuantity: (productId: string, quantity: number) => void
  addBundleDiscount: (slugA: string, slugB: string, discount: number) => void
  clearCart: () => void
  openCart: () => void
  closeCart: () => void
  toggleCart: () => void
  itemCount: () => number
  subtotal: () => number
  activeBundleSavings: () => number
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      bundleDiscounts: [],
      isOpen: false,

      addItem: (newItem) => {
        set((state) => {
          const existing = state.items.find((i) => i.productId === newItem.productId)
          if (existing) {
            return {
              items: state.items.map((i) =>
                i.productId === newItem.productId
                  ? { ...i, quantity: i.quantity + newItem.quantity }
                  : i
              ),
            }
          }
          return { items: [...state.items, newItem] }
        })
      },

      removeItem: (productId) => {
        set((state) => {
          const item = state.items.find((i) => i.productId === productId)
          const updatedItems = state.items.filter((i) => i.productId !== productId)
          // clean up any bundle discounts that involved this item's slug
          const updatedDiscounts = item
            ? state.bundleDiscounts.filter(
                (d) => d.slugA !== item.slug && d.slugB !== item.slug
              )
            : state.bundleDiscounts
          return { items: updatedItems, bundleDiscounts: updatedDiscounts }
        })
      },

      updateQuantity: (productId, quantity) => {
        if (quantity <= 0) {
          get().removeItem(productId)
          return
        }
        set((state) => ({
          items: state.items.map((i) =>
            i.productId === productId ? { ...i, quantity } : i
          ),
        }))
      },

      addBundleDiscount: (slugA, slugB, discount) => {
        set((state) => {
          const exists = state.bundleDiscounts.find(
            (d) =>
              (d.slugA === slugA && d.slugB === slugB) ||
              (d.slugA === slugB && d.slugB === slugA)
          )
          if (exists) {
            return {
              bundleDiscounts: state.bundleDiscounts.map((d) =>
                (d.slugA === slugA && d.slugB === slugB) ||
                (d.slugA === slugB && d.slugB === slugA)
                  ? { ...d, discount }
                  : d
              ),
            }
          }
          return { bundleDiscounts: [...state.bundleDiscounts, { slugA, slugB, discount }] }
        })
      },

      clearCart: () => set({ items: [], bundleDiscounts: [] }),
      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),
      toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),

      itemCount: () => get().items.reduce((sum, i) => sum + i.quantity, 0),

      activeBundleSavings: () => {
        const { items, bundleDiscounts } = get()
        return bundleDiscounts.reduce((sum, d) => {
          const hasA = items.some((i) => i.slug === d.slugA)
          const hasB = items.some((i) => i.slug === d.slugB)
          return hasA && hasB ? sum + d.discount : sum
        }, 0)
      },

      subtotal: () => {
        const { items } = get()
        const itemTotal = items.reduce((sum, i) => sum + i.price * i.quantity, 0)
        return itemTotal - get().activeBundleSavings()
      },
    }),
    {
      name: 'carve-cart',
      partialize: (state) => ({ items: state.items, bundleDiscounts: state.bundleDiscounts }),
    }
  )
)
