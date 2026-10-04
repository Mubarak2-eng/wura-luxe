import { Sparkles, Compass, ShoppingBag, Headphones } from 'lucide-react'
import MotionSection from '../common/MotionSection'

const trustFeatures = [
  {
    icon: Sparkles,
    title: 'Fragrances for Every Style',
    description: 'Explore scents for everyday moments, special occasions, and everything in between.',
  },
  {
    icon: Compass,
    title: 'Find Your Signature',
    description: 'Discover fragrance profiles that complement your taste and personality.',
  },
  {
    icon: ShoppingBag,
    title: 'A Thoughtful Shopping Experience',
    description: 'Enjoy a simple, convenient way to explore and shop authentic fragrances.',
  },
  {
    icon: Headphones,
    title: 'Customer Care You Can Reach',
    description: 'Get assistance with product selection, orders, and delivery questions anytime.',
  },
]

export default function TrustFeatures() {
  return (
    <section className="py-14 sm:py-18 bg-[#FCFAF6] border-y border-[#E9DED0]">
      <div className="section-pad">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {trustFeatures.map((feat, idx) => {
            const Icon = feat.icon
            return (
              <MotionSection
                key={feat.title}
                delay={idx * 0.08}
                className="flex items-start gap-4 p-5 rounded-xl bg-white border border-[#E9DED0] shadow-sm hover:border-[#C7A66A]/60 transition-all"
              >
                <div className="w-11 h-11 rounded-lg bg-[#FAF6EF] border border-[#E9DED0] flex items-center justify-center shrink-0 text-[#C7A66A]">
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-serif font-bold text-sm sm:text-base text-[#211713] mb-1">
                    {feat.title}
                  </h3>
                  <p className="text-xs text-[#7A726C] leading-relaxed">
                    {feat.description}
                  </p>
                </div>
              </MotionSection>
            )
          })}
        </div>
      </div>
    </section>
  )
}
