import React from 'react'
import { PRODUCTS } from '@/data/products'
import HeroSection from '@/components/home/HeroSection'
import StatsBar from '@/components/home/StatsBar'
import FeaturedProducts from '@/components/home/FeaturedProducts'
import CategoryBanner from '@/components/home/CategoryBanner'

export default function Home() {
  const featured = PRODUCTS.filter(p => p.featured)
  return (
    <div>
      <HeroSection />
      <StatsBar />
      <FeaturedProducts products={featured} />
      <CategoryBanner />
    </div>
  )
}
