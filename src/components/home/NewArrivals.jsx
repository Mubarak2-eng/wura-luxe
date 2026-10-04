import { Link } from 'react-router-dom'
import { ArrowRight, Sparkles } from 'lucide-react'
import { products } from '../../data/products'
import ProductCard from '../product/ProductCard'
import MotionSection from '../common/MotionSection'

export default function NewArrivals() {
  const newArrivals = products.filter((p) => p.isNew)

  return (
    <section className="py-16 sm:py-24 bg-[#FAF6EF]">
      <div className="section-pad">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 sm:mb-12">
          <MotionSection>
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="w-4 h-4 text-[#C7A66A]" />
              <span className="text-xs uppercase font-bold tracking-[0.2em] text-[#C7A66A]">
                SEASONAL RELEASES
              </span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#211713]">
              Fresh Drops, Beautiful Scents
            </h2>
            <p className="text-sm sm:text-base text-[#7A726C] font-light mt-1">
              Discover the latest bottles, viral layering combos, and seasonal extraits.
            </p>
          </MotionSection>

          <Link
            to="/shop?tag=new-arrivals"
            className="hidden sm:inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#211713] hover:text-[#C7A66A] transition-colors shrink-0 group"
          >
            <span>View All New Arrivals</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {newArrivals.slice(0, 8).map((product, idx) => (
            <MotionSection key={product.id} delay={idx * 0.05}>
              <ProductCard product={product} />
            </MotionSection>
          ))}
        </div>

        {/* Mobile View All Button */}
        <div className="mt-8 text-center sm:hidden">
          <Link
            to="/shop?tag=new-arrivals"
            className="btn-outline-espresso w-full py-3 text-xs"
          >
            View All New Arrivals
          </Link>
        </div>
      </div>
    </section>
  )
}
