import { getBestSellers } from '../../data/products'
import ProductCard from '../product/ProductCard'
import { Link } from 'react-router-dom'

export default function BestSellers() {
  const products = getBestSellers()

  return (
    <section className="section-pad py-24" style={{ background: '#0a0a0a' }}>
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-14">
        <div>
          <span className="eyebrow">Most Loved</span>
          <h2 className="font-playfair text-5xl lg:text-6xl text-cream mt-4">
            Best <span className="gold-text italic">Sellers</span>
          </h2>
        </div>
        <div className="flex items-center gap-6">
          <div
            className="hidden lg:block h-px flex-1 max-w-xs"
            style={{ background: 'linear-gradient(90deg, transparent, #c9a84c40)' }}
          />
          <Link
            to="/shop"
            className="group inline-flex items-center gap-2 text-sm text-gold border border-gold/30 px-6 py-3 hover:bg-gold hover:text-dark hover:border-gold transition-all duration-300 tracking-widest uppercase"
          >
            View All
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </Link>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  )
}
