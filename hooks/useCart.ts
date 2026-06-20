'use client'
import { useCartStore } from '@/store/cartStore'
import { CartItem } from '@/types'
import toast from 'react-hot-toast'

export function useCart() {
  const store = useCartStore()

  const addToCart = (item: CartItem) => {
    store.addItem(item)
    toast.success(`${item.name} added to cart`, {
      style: {
        background: '#1A3D2B',
        color: '#E8D5B0',
        border: '1px solid #C8A96E',
      },
    })
  }

  return {
    ...store,
    addToCart,
  }
}
