import { Suspense } from 'react'
import HeroSection from '@/components/store/HeroSection'
import CategoryBanner from '@/components/store/CategoryBanner'
import FeaturedProducts from '@/components/store/FeaturedProducts'
import MarqueeStrip from '@/components/store/MarqueeStrip'
import BrandStory from '@/components/store/BrandStory'
import PerfumeLines from '@/components/store/PerfumeLines'
import Testimonials from '@/components/store/Testimonials'
import LifestyleGrid from '@/components/store/LifestyleGrid'
import NewsletterBar from '@/components/store/NewsletterBar'

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <MarqueeStrip />
      <CategoryBanner />
      <Suspense fallback={<div className=" py-8 md:py-20 bg-carve-ivory" />}>
        <FeaturedProducts />
      </Suspense>
      <BrandStory />
      <PerfumeLines />
      <Testimonials />
      <LifestyleGrid />
      <NewsletterBar />
    </>
  )
}
