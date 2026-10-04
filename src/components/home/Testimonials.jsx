import { useState } from 'react'
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react'
import MotionSection from '../common/MotionSection'

const sampleTestimonials = [
  {
    name: 'Adaeze O.',
    location: 'Victoria Island, Lagos',
    text: '“I bought the Soirée & Cloud Candy combo from Mama Fragrance and people literally stop me in traffic and elevators to ask what I am wearing! Smell as good as you look indeed!”',
    rating: 5,
    scent: 'Soirée × Cloud Candy Combo',
    img: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&q=80',
  },
  {
    name: 'Chinedu B.',
    location: 'Maitama, Abuja',
    text: '“Shiyaaka Gold arrived the next day in Abuja. The bottle is heavy, pure luxury, and the projection is beast-mode. Lasts over 16 hours on my native attire.”',
    rating: 5,
    scent: 'Shiyaaka Luxury Gold',
    img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&q=80',
  },
  {
    name: 'Toluwalope A.',
    location: 'GRA, Port Harcourt',
    text: '“The Ashantee Flacon Trio is pure class. Three distinct luxury profiles in one box. 100% original stock with intact seals. Mama Fragrance is now my go-to!”',
    rating: 5,
    scent: 'Ashantee Prestige Flacon Trio',
    img: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=120&q=80',
  },
]

export default function Testimonials() {
  return (
    <section className="py-16 sm:py-24 bg-[#FAF6EF]">
      <div className="section-pad">
        
        {/* Header */}
        <MotionSection className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <div className="flex items-center justify-center gap-1.5 text-xs font-bold uppercase tracking-[0.2em] text-[#C7A66A] mb-2">
            <Star className="w-3.5 h-3.5 fill-[#C7A66A]" />
            <span>REAL CLIENT EXPERIENCES</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#211713] mb-3">
            Loved Across Nigeria
          </h2>
          <p className="text-sm sm:text-base text-[#7A726C] font-light">
            Read verified experiences from our perfume collectors and daily fragrance lovers.
          </p>
        </MotionSection>

        {/* Testimonials Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {sampleTestimonials.map((t, idx) => (
            <MotionSection
              key={t.name}
              delay={idx * 0.1}
              className="bg-white rounded-2xl p-6 sm:p-8 border border-[#E9DED0] shadow-sm hover:shadow-luxury hover:border-[#C7A66A]/60 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-4">
                  <div className="flex text-[#C7A66A]">
                    {Array.from({ length: t.rating }).map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-[#C7A66A] text-[#C7A66A]" />
                    ))}
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#C7A66A] bg-[#FAF6EF] border border-[#E9DED0] px-2.5 py-0.5 rounded-full truncate max-w-[170px]">
                    {t.scent}
                  </span>
                </div>

                <Quote className="w-6 h-6 text-[#E9DED0] mb-2" />

                <p className="text-xs sm:text-sm text-[#393431] leading-relaxed mb-6 font-light italic">
                  {t.text}
                </p>
              </div>

              <div className="pt-4 border-t border-[#FAF6EF] flex items-center gap-3.5">
                <img
                  src={t.img}
                  alt={t.name}
                  className="w-10 h-10 rounded-full object-cover border border-[#C7A66A]/40"
                />
                <div>
                  <h4 className="font-serif font-bold text-sm text-[#211713]">{t.name}</h4>
                  <p className="text-[11px] text-[#7A726C]">{t.location}</p>
                </div>
              </div>
            </MotionSection>
          ))}
        </div>
      </div>
    </section>
  )
}
