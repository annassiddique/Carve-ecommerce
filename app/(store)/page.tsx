import { Suspense } from 'react'
import HeroSection from '@/components/store/HeroSection'
import MarqueeStrip from '@/components/store/MarqueeStrip'
import CategoryBanner from '@/components/store/CategoryBanner'
import FeaturedProducts from '@/components/store/FeaturedProducts'
import { getSiteSettings } from '@/lib/siteSettings'

export default async function HomePage() {
  const settings = await getSiteSettings()

  return (
    <>
      <HeroSection slides={settings.homepage.slides} />
      <MarqueeStrip />
      <CategoryBanner />
      <Suspense fallback={<div className="py-16 bg-carve-ivory" />}>
        <FeaturedProducts />
      </Suspense>
    </>
  )
}
