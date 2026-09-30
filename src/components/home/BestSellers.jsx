import { getBestSellers } from '../../data/products'
import ProductCard from '../product/ProductCard'
import { Link } from 'react-router-dom'
import { ArrowRight, Flame } from 'lucide-react'
import MotionSection from '../common/MotionSection'

export default function BestSellers() {
  const products = getBestSellers()

  return (
    <section className="section-pad py-20 sm:py-24 relative overflow-hidden bg-[#030305]">
      {/* ── Single-Play Viewport Drift-Up Reveal (25px, 500ms) ── */}
      <MotionSection className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16">
        <div>
          <div className="cyber-badge mb-3">
            <Flame className="w-3.5 h-3.5 text-gold-bright" />
            <span>VIRAL & HIGH DEMAND</span>
          </div>
          <h2 className="font-syne text-3xl sm:text-5xl lg:text-6xl font-black text-white">
            Hall of <span className="text-liquid-gold">Signatures</span>
          </h2>
          <p className="font-cinzel text-gold-light italic text-base sm:text-lg mt-1">
            "Smell as good as you look!"
          </p>
        </div>

        <Link
          to="/shop"
          className="btn-futuristic-outline px-6 py-3 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-2 self-start md:self-auto"
        >
          <span>Explore All 20+ Scents</span>
          <ArrowRight className="w-4 h-4 text-gold-bright" />
        </Link>
      </MotionSection>

      {/* Grid of Product Cards */}
      <MotionSection delay={0.15} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </MotionSection>
    </section>
  )
}
