import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { categories } from '../../data/categories'
import MotionSection from '../common/MotionSection'

export default function CategoryGrid() {
  return (
    <section className="py-16 sm:py-24 bg-[#FAF6EF]">
      <div className="section-pad">
        
        {/* Section Header */}
        <MotionSection className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
          <span className="text-xs uppercase font-bold tracking-[0.2em] text-[#C7A66A] block mb-2">
            CURATED DISCOVERY
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#211713] mb-3">
            Find Your Signature Scent
          </h2>
          <p className="text-sm sm:text-base text-[#7A726C] font-light">
            Explore fragrances that complement your style, mood, and every moment.
          </p>
        </MotionSection>

        {/* Category Grid (2 col mobile, 3 col tablet/desktop) */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {categories.map((cat, idx) => (
            <MotionSection key={cat.id} delay={idx * 0.08}>
              <Link
                to={`/shop?category=${cat.slug}`}
                className="group relative block aspect-[4/5] overflow-hidden rounded-xl bg-[#211713] shadow-sm hover:shadow-luxury-lg transition-all duration-500"
              >
                {/* Category Image */}
                <img
                  src={cat.image}
                  alt={cat.name}
                  loading="lazy"
                  className="h-full w-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-108"
                />

                {/* Gradient Overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#211713]/90 via-[#211713]/30 to-transparent transition-opacity duration-300 group-hover:from-[#211713]/95" />

                {/* Card Content */}
                <div className="absolute inset-0 p-4 sm:p-6 flex flex-col justify-end">
                  <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-[#C7A66A] mb-1">
                    Collection
                  </span>
                  <h3 className="font-serif text-lg sm:text-2xl font-bold text-[#FAF6EF] leading-snug group-hover:text-white transition-colors">
                    {cat.name}
                  </h3>
                  <p className="text-xs text-[#E9DED0]/80 line-clamp-2 mt-1 hidden sm:block font-light">
                    {cat.description}
                  </p>

                  <div className="flex items-center gap-1.5 text-xs font-semibold text-[#C7A66A] mt-3 group-hover:translate-x-1 transition-transform">
                    <span>Explore Collection</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </Link>
            </MotionSection>
          ))}
        </div>
      </div>
    </section>
  )
}
