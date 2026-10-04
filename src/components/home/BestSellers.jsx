import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Sparkles } from 'lucide-react'
import { products } from '../../data/products'
import ProductCard from '../product/ProductCard'
import MotionSection from '../common/MotionSection'

const tabOptions = [
  { id: 'all', label: 'All Bestsellers' },
  { id: 'him', label: 'For Him' },
  { id: 'her', label: 'For Her' },
  { id: 'unisex', label: 'Unisex' },
]

export default function BestSellers() {
  const [activeTab, setActiveTab] = useState('all')

  const filteredProducts = products.filter((p) => {
    if (!p.bestSeller) return false
    if (activeTab === 'him') return p.gender === 'Men'
    if (activeTab === 'her') return p.gender === 'Women'
    if (activeTab === 'unisex') return p.gender === 'Unisex'
    return true
  })

  return (
    <section className="py-16 sm:py-24 bg-[#FCFAF6] border-y border-[#E9DED0]">
      <div className="section-pad">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 sm:mb-12">
          <MotionSection>
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="w-4 h-4 text-[#C7A66A]" />
              <span className="text-xs uppercase font-bold tracking-[0.2em] text-[#C7A66A]">
                TRENDING &amp; HIGH COMPLIMENT
              </span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#211713]">
              The Scents Everyone's Talking About
            </h2>
            <p className="text-sm sm:text-base text-[#7A726C] font-light mt-1">
              Explore fragrance favourites chosen by our customers.
            </p>
          </MotionSection>

          {/* View All Link on Desktop */}
          <Link
            to="/shop?tag=bestsellers"
            className="hidden sm:inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#211713] hover:text-[#C7A66A] transition-colors shrink-0 group"
          >
            <span>View All Bestsellers</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 no-scrollbar">
          {tabOptions.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 sm:px-5 py-2 rounded-full text-xs font-semibold tracking-wider uppercase whitespace-nowrap transition-all ${
                activeTab === tab.id
                  ? 'bg-[#211713] text-[#FAF6EF] shadow-md'
                  : 'bg-white text-[#393431] border border-[#E9DED0] hover:border-[#C7A66A] hover:bg-[#FAF6EF]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {filteredProducts.slice(0, 8).map((product, idx) => (
            <MotionSection key={product.id} delay={idx * 0.05}>
              <ProductCard product={product} />
            </MotionSection>
          ))}
        </div>

        {/* Mobile View All Link */}
        <div className="mt-8 text-center sm:hidden">
          <Link
            to="/shop?tag=bestsellers"
            className="btn-outline-espresso w-full py-3 text-xs"
          >
            View All Bestsellers
          </Link>
        </div>
      </div>
    </section>
  )
}
