'use client'

import dynamic from 'next/dynamic'
import Navigation from '@/components/Navigation'
import Hero from '@/components/Hero'
import ProductIntro from '@/components/ProductIntro'
import BrandStory from '@/components/BrandStory'
import Gallery from '@/components/Gallery'
import ProductShowcase from '@/components/ProductShowcase'
import IngredientsSection from '@/components/IngredientsSection'
import CTASection from '@/components/CTASection'
import Footer from '@/components/Footer'
import { useEffect } from 'react'

const CustomCursor = dynamic(() => import('@/components/CustomCursor'), { ssr: false })

export default function Home() {
  useEffect(() => {
    // Minimal smooth scroll without full lenis to avoid SSR issues
    document.documentElement.style.scrollBehavior = 'smooth'
  }, [])

  return (
    <main className="relative bg-abyss">
      {/* Custom cursor (desktop only) */}
      <CustomCursor />

      {/* Navigation */}
      <Navigation />

      {/* Hero */}
      <Hero />

      {/* Product reveal */}
      <ProductIntro />

      {/* The Six Tides collection */}
      <ProductShowcase />

      {/* Brand story */}
      <BrandStory />

      {/* Cinematic photo gallery */}
      <Gallery />

      {/* Ingredients */}
      <IngredientsSection />

      {/* CTA / email capture */}
      <CTASection />

      {/* Footer */}
      <Footer />
    </main>
  )
}
