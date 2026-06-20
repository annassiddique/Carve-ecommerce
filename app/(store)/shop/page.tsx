'use client'
import { Suspense } from 'react'
import ShopContent from './ShopContent'

export default function ShopPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-carve-ivory pt-24">
        <div className="max-w-7xl mx-auto px-6 py-10 animate-pulse">
          <div className="h-8 bg-carve-champagne rounded w-48 mb-8" />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="aspect-[4/5] bg-carve-champagne rounded-sm" />
            ))}
          </div>
        </div>
      </div>
    }>
      <ShopContent />
    </Suspense>
  )
}
