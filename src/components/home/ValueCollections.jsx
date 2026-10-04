import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Sparkles, ArrowRight, Tag } from 'lucide-react'
import { products } from '../../data/products'
import ProductCard from '../product/ProductCard'
import MotionSection from '../common/MotionSection'

const priceTabs = [
  { id: 'all', label: 'All Thoughtfully Priced' },
  { id: 'under-20k', label: 'Under ₦20,000', maxPrice: 20000 },
  { id: 'under-40k', label: 'Under ₦40,000', maxPrice: 40000 },
  { id: 'under-50k', label: 'Under ₦50,000', maxPrice: 50000 },
  { id: 'gifts', label: 'Gift Sets & Bundles', category: 'gift' },
]

export default function ValueCollections() {
  const [activeTab, setActiveTab] = useState('all')

  const filteredProducts = products.filter((p) => {
    const tab = priceTabs.find((t) => t.id === activeTab)
    if (!tab || tab.id === 'all') return p.price <= 50000
    if (tab.maxPrice) return p.price <= tab.maxPrice
    if (tab.category) return p.category === tab.category
    return true
  })

  return (
    <section className="py-16 sm:py-24 bg-[#FAF6EF]">
      <div className="section-pad">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12">
          <MotionSection>
            <div className="inline-flex items-center gap-1.5 text-xs uppercase font-bold tracking-[0.2em] text-[#C7A66A] mb-2">
              <Tag className="w-3.5 h-3.5" />
              <span>TRANSPARENT VALUE</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#211713] mb-3">
              Beautiful Scents, Thoughtfully Priced
            </h2>
            <p className="text-sm sm:text-base text-[#7A726C] font-light">
              Explore genuine designer fragrances, concentrated oils, and luxury sets for every budget.
            </p>
          </MotionSection>
        </div>

        {/* Price Navigation Tabs */}
        <div className="flex items-center justify-center gap-2 overflow-x-auto pb-4 mb-8 no-scrollbar">
          {priceTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 sm:px-5 py-2 rounded-full text-xs font-semibold tracking-wider uppercase whitespace-nowrap transition-all ${
                activeTab === tab.id
                  ? 'bg-[#211713] text-[#FAF6EF] shadow-md'
                  : 'bg-white text-[#393431] border border-[#E9DED0] hover:border-[#C7A66A] hover:bg-[#FCFAF6]'
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

        {/* View All CTA */}
        <div className="mt-10 text-center">
          <Link
            to="/shop"
            className="btn-outline-espresso px-8 py-3.5 text-xs font-bold"
          >
            <span>Explore Complete Fragrance Vault</span>
          </Link>
        </div>
      </div>
    </section>
  )
}
