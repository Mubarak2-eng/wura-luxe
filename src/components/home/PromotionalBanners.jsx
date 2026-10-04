import { Link } from 'react-router-dom'
import { ArrowRight, Sparkles, Gift } from 'lucide-react'
import MotionSection from '../common/MotionSection'

/**
 * Campaign A — Affordable Luxury
 * Editorial split banner with rich imagery and champagne accent
 */
export function CampaignA() {
  return (
    <section className="py-12 sm:py-20 bg-[#FAF6EF]">
      <div className="section-pad">
        <MotionSection className="bg-[#211713] rounded-2xl overflow-hidden shadow-luxury-lg text-[#FAF6EF] grid grid-cols-1 lg:grid-cols-12 items-center">
          
          {/* Left Text Column */}
          <div className="lg:col-span-6 p-8 sm:p-12 lg:p-16 space-y-4 sm:space-y-6">
            <div className="inline-flex items-center gap-2 text-[10px] sm:text-xs font-semibold uppercase tracking-[0.2em] text-[#C7A66A]">
              <Sparkles className="w-3.5 h-3.5" />
              <span>THE AFFORDABLE LUXURY EDIT</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight">
              Luxury Has a Signature.
            </h2>

            <p className="text-sm sm:text-base text-[#E9DED0]/90 font-light leading-relaxed max-w-md">
              Explore captivating scents for everyday wear and unforgettable occasions. High oil concentrations, magnetic trails, and master perfumery made accessible.
            </p>

            <div className="pt-2">
              <Link
                to="/shop?tag=affordable-luxury"
                className="btn-champagne px-7 py-3.5 text-xs font-bold shadow-md"
              >
                <span>EXPLORE THE COLLECTION</span>
              </Link>
            </div>
          </div>

          {/* Right Image Column */}
          <div className="lg:col-span-6 h-72 sm:h-96 lg:h-full min-h-[340px] relative overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1547887537-6158d64c35b3?w=1200&q=85"
              alt="Luxury flacons and amber perfumes on editorial background"
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#211713]/80 via-transparent to-transparent lg:hidden" />
          </div>
        </MotionSection>
      </div>
    </section>
  )
}

/**
 * Campaign B — New Arrivals
 * Full-width atmospheric banner
 */
export function CampaignB() {
  return (
    <section className="relative py-20 sm:py-28 bg-[#211713] text-[#FAF6EF] overflow-hidden my-12">
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1615397349754-cfa2066a298e?w=1600&q=85"
          alt="Atmospheric fragrance bottles and natural shadows"
          className="w-full h-full object-cover object-center opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#211713] via-[#211713]/85 to-transparent" />
      </div>

      <div className="relative z-10 section-pad">
        <MotionSection className="max-w-xl space-y-4 sm:space-y-6">
          <span className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.22em] text-[#C7A66A] block">
            JUST DROPPED IN LAGOS
          </span>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight text-[#FAF6EF]">
            Something Beautiful Just Arrived.
          </h2>

          <p className="text-sm sm:text-base text-[#FAF6EF]/85 font-light leading-relaxed">
            Discover the latest additions to your fragrance wardrobe. Fresh extraits, viral layering duos, and seasonal releases handpicked for you.
          </p>

          <div className="pt-2">
            <Link
              to="/shop?tag=new-arrivals"
              className="btn-champagne px-8 py-3.5 text-xs font-bold"
            >
              <span>SHOP NEW ARRIVALS</span>
            </Link>
          </div>
        </MotionSection>
      </div>
    </section>
  )
}

/**
 * Campaign C — Fragrance Gifting
 * Inverted editorial split banner
 */
export function CampaignC() {
  return (
    <section className="py-16 sm:py-24 bg-[#FAF6EF]">
      <div className="section-pad">
        <MotionSection className="bg-white rounded-2xl overflow-hidden border border-[#E9DED0] shadow-luxury grid grid-cols-1 lg:grid-cols-12 items-center">
          
          {/* Left Image Column */}
          <div className="lg:col-span-6 h-72 sm:h-96 lg:h-full min-h-[340px] relative order-2 lg:order-1 overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1549497538-303791108f95?w=1200&q=85"
              alt="Perfume gift set with ribbon and presentation flacons"
              className="w-full h-full object-cover object-center"
            />
          </div>

          {/* Right Text Column */}
          <div className="lg:col-span-6 p-8 sm:p-12 lg:p-16 space-y-4 sm:space-y-6 order-1 lg:order-2">
            <div className="inline-flex items-center gap-2 text-[10px] sm:text-xs font-semibold uppercase tracking-[0.2em] text-[#C7A66A]">
              <Gift className="w-3.5 h-3.5" />
              <span>THE MEMORABLE GIFT GUIDE</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#211713] leading-tight">
              Give the Gift of a Beautiful Scent.
            </h2>

            <p className="text-sm sm:text-base text-[#7A726C] font-light leading-relaxed">
              Make celebrations more personal with a fragrance chosen just for them. Explore our curated flacon trios, layering pairs, and bespoke velvet gift presentation boxes.
            </p>

            <div className="pt-2">
              <Link
                to="/shop?category=gift"
                className="btn-espresso px-8 py-3.5 text-xs font-bold"
              >
                <span>SHOP GIFT SETS</span>
              </Link>
            </div>
          </div>
        </MotionSection>
      </div>
    </section>
  )
}
