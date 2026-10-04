import { Link } from 'react-router-dom'
import { Sparkles, ArrowRight, ShieldCheck, HeartHandshake } from 'lucide-react'
import MotionSection from '../common/MotionSection'

export default function BrandStory() {
  return (
    <section className="py-16 sm:py-24 bg-[#FAF6EF]">
      <div className="section-pad">
        <div className="bg-[#211713] rounded-2xl overflow-hidden text-[#FAF6EF] shadow-luxury-lg grid grid-cols-1 lg:grid-cols-12 items-center">
          
          {/* Left Editorial Narrative */}
          <div className="lg:col-span-7 p-8 sm:p-12 lg:p-16 space-y-6">
            <MotionSection>
              <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#C7A66A] mb-2">
                <Sparkles className="w-3.5 h-3.5" />
                <span>OUR ESSENCE &amp; PHILOSOPHY</span>
              </div>

              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight text-[#FAF6EF] mb-4">
                More Than a Fragrance. It's Your Signature.
              </h2>

              <p className="text-sm sm:text-base text-[#E9DED0]/90 font-light leading-relaxed mb-4">
                At Mama Fragrance, we believe the right scent can complete your look, elevate your confidence, and make ordinary moments memorable. Our goal is to help you discover fragrances that reflect your personality and leave an impression long after you've left the room.
              </p>

              <div className="grid grid-cols-2 gap-4 py-3 border-y border-[#3D2F28] my-4">
                <div className="flex items-center gap-2.5">
                  <ShieldCheck className="w-5 h-5 text-[#C7A66A] shrink-0" />
                  <span className="text-xs font-semibold text-[#FAF6EF]">100% Genuine Perfumery</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <HeartHandshake className="w-5 h-5 text-[#C7A66A] shrink-0" />
                  <span className="text-xs font-semibold text-[#FAF6EF]">Curated for Compliments</span>
                </div>
              </div>

              <div className="pt-2">
                <Link
                  to="/about"
                  className="btn-champagne px-7 py-3.5 text-xs font-bold shadow-md"
                >
                  <span>DISCOVER MAMA FRAGRANCE</span>
                </Link>
              </div>
            </MotionSection>
          </div>

          {/* Right Editorial Image */}
          <div className="lg:col-span-5 h-80 sm:h-96 lg:h-full min-h-[380px] relative overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=1000&q=85"
              alt="Mama Fragrance luxury bottles and artistic lighting"
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#211713]/80 via-transparent to-transparent lg:hidden" />
          </div>
        </div>
      </div>
    </section>
  )
}
