import { useState } from 'react'
import HeroBanner from '../components/home/HeroBanner'
import CategoryGrid from '../components/home/CategoryGrid'
import BestSellers from '../components/home/BestSellers'
import { CampaignA, CampaignB, CampaignC } from '../components/home/PromotionalBanners'
import NewArrivals from '../components/home/NewArrivals'
import ScentProfiles from '../components/home/ScentProfiles'
import ScentQuizModal from '../components/home/ScentQuizModal'
import ValueCollections from '../components/home/ValueCollections'
import TrustFeatures from '../components/home/TrustFeatures'
import BrandStory from '../components/home/BrandStory'
import Testimonials from '../components/home/Testimonials'
import Newsletter from '../components/home/Newsletter'

export default function HomePage() {
  const [quizOpen, setQuizOpen] = useState(false)

  return (
    <div className="relative bg-[#FAF6EF]">
      {/* 1. Full-Width Editorial Hero Carousel */}
      <HeroBanner onOpenQuiz={() => setQuizOpen(true)} />

      {/* 2. Trust Value Feature Cards */}
      <TrustFeatures />

      {/* 3. Shop by Category (6 Image-Led Category Cards) */}
      <CategoryGrid />

      {/* 4. Bestsellers Section with Gender Tabs */}
      <BestSellers />

      {/* 5. Promotional Campaign A — Affordable Luxury */}
      <CampaignA />

      {/* 6. New Arrivals Showcase */}
      <NewArrivals />

      {/* 7. Shop by Scent Profile & Matchmaker */}
      <ScentProfiles />

      {/* 8. Promotional Campaign B — Just Arrived Atmospheric Banner */}
      <CampaignB />

      {/* 9. Value Collections (Beautiful Scents, Thoughtfully Priced) */}
      <ValueCollections />

      {/* 10. Promotional Campaign C — Fragrance Gifting */}
      <CampaignC />

      {/* 11. Brand Story Narrative */}
      <BrandStory />

      {/* 12. Real Client Verified Reviews & Testimonials */}
      <Testimonials />

      {/* 13. Newsletter Subscription */}
      <Newsletter />

      {/* Standalone Scent Quiz Matchmaker Modal */}
      <ScentQuizModal isOpen={quizOpen} onClose={() => setQuizOpen(false)} />
    </div>
  )
}
