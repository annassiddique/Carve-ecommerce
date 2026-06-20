'use client'
import { create } from 'zustand'

interface FilterStore {
  category: string
  subcategory: string
  priceMin: number
  priceMax: number
  scentFamily: string
  material: string
  sort: string
  search: string
  setCategory: (category: string) => void
  setSubcategory: (subcategory: string) => void
  setPriceRange: (min: number, max: number) => void
  setScentFamily: (family: string) => void
  setMaterial: (material: string) => void
  setSort: (sort: string) => void
  setSearch: (search: string) => void
  reset: () => void
}

const defaults = {
  category: 'all',
  subcategory: '',
  priceMin: 0,
  priceMax: 50000,
  scentFamily: '',
  material: '',
  sort: 'newest',
  search: '',
}

export const useFilterStore = create<FilterStore>((set) => ({
  ...defaults,
  setCategory: (category) => set({ category }),
  setSubcategory: (subcategory) => set({ subcategory }),
  setPriceRange: (min, max) => set({ priceMin: min, priceMax: max }),
  setScentFamily: (scentFamily) => set({ scentFamily }),
  setMaterial: (material) => set({ material }),
  setSort: (sort) => set({ sort }),
  setSearch: (search) => set({ search }),
  reset: () => set(defaults),
}))
