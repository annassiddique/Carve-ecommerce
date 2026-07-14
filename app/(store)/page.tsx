import { Suspense } from 'react'
import HeroSection from '@/components/store/HeroSection'
import MarqueeStrip from '@/components/store/MarqueeStrip'
import CategoryBanner from '@/components/store/CategoryBanner'
import FeaturedProducts from '@/components/store/FeaturedProducts'

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <MarqueeStrip />
      <CategoryBanner />
      <Suspense fallback={<div className="py-16 bg-carve-ivory" />}>
        <FeaturedProducts />
      </Suspense>
    </>
  )
}
