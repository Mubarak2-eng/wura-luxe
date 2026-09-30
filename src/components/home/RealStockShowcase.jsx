import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Sparkles, ShoppingBag, Eye, ShieldCheck, Star } from 'lucide-react'
import { useCartStore } from '../../store/cartStore'
import { getProductById } from '../../data/products'
import { formatPrice } from '../../utils/helpers'
import MotionSection from '../common/MotionSection'
import toast from 'react-hot-toast'

const realStocks = [
  {
    id: 'shiyaaka-gold',
    title: 'Shiyaaka Luxury Gold',
    badge: '👑 Royal Arabian Flacon',
    description: 'Pyramid-textured gold bottle with Mediterranean rosemary, golden amber & cedarwood.',
    price: 38000,
    image: '/images/products/shiyaaka-gold.jpg',
    rating: 5.0,
    reviews: 142,
    slug: 'shiyaaka-luxury-gold',
  },
  {
    id: 'soiree-cloud-candy-combo',
    title: 'Soirée × Cloud Candy Combo',
    badge: '✨ Compliment Magnet',
    description: '"I am so obsessed with this combo, not a day goes by that I don’t get compliments for it!"',
    price: 65000,
    image: '/images/products/soiree-cloud-candy.jpg',
    rating: 5.0,
    reviews: 198,
    slug: 'soiree-cloud-candy-layering-combo',
  },
  {
    id: 'ashantee-trio-collection',
    title: 'Ashantee Prestige Flacon Trio',
    badge: '🇫🇷 French-Arabic Collection',
    description: 'Intense Elixir, Floral Bouquet, and Far Away in 100ml collector presentation flacons.',
    price: 78000,
    image: '/images/products/ashantee-trio.jpg',
    rating: 4.9,
    reviews: 87,
    slug: 'ashantee-prestige-trio',
  },
]

export default function RealStockShowcase() {
  const { addItem } = useCartStore()

  const handleAddToCart = (item) => {
    const prod = getProductById(item.id)
    if (prod) {
      addItem(prod, prod.volumes[0])
      toast.success(`${item.title} added to your Vault!`, {
        icon: '🛒',
        duration: 3000,
      })
    }
  }

  return (
    <section className="section-pad py-20 sm:py-24 relative bg-[#030305] overflow-hidden">
      {/* Background glow lines */}
      <div className="absolute inset-0 bg-cyber-grid opacity-50 pointer-events-none" />

      {/* ── Single-Play Viewport Drift-Up Reveal (25px, 500ms) ── */}
      <MotionSection className="relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16">
        <div>
          <div className="cyber-badge mb-3">
            <ShieldCheck className="w-3.5 h-3.5 text-gold-bright" />
            <span>AUTHENTIC PHYSICAL INVENTORY</span>
          </div>
          <h2 className="font-syne text-3xl sm:text-5xl lg:text-6xl font-black text-white">
            Live Stock <span className="text-liquid-gold">Spotlight</span>
          </h2>
          <p className="font-cinzel text-gold-light italic text-base sm:text-lg mt-1">
            "Smell as good as you look!"
          </p>
        </div>

        <Link
          to="/gallery"
          className="btn-futuristic-outline px-6 py-3 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-2 self-start md:self-auto"
        >
          <span>View All Stock Photos</span>
          <Eye className="w-4 h-4 text-gold-bright" />
        </Link>
      </MotionSection>

      {/* Grid of Stock Flacons */}
      <MotionSection delay={0.15} className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 relative z-10">
        {realStocks.map((item) => (
          <div
            key={item.id}
            className="glass-panel rounded-3xl p-4 sm:p-6 border border-gold/30 hover:border-gold shadow-2xl flex flex-col justify-between group transition-all duration-300"
          >
            <div>
              {/* Image Container */}
              <div className="relative aspect-[3/4] rounded-2xl overflow-hidden mb-4 sm:mb-5 bg-[#050508] border border-white/10">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-104 transition-transform duration-400"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80" />

                {/* Stock Verified Holographic Badge */}
                <div className="absolute top-3 left-3 bg-black/80 backdrop-blur-md border border-gold/40 px-3 py-1 rounded-full text-[10px] font-space font-extrabold uppercase text-gold-bright shadow-[0_0_12px_rgba(212,175,55,0.4)]">
                  {item.badge}
                </div>

                {/* Star rating overlay */}
                <div className="absolute bottom-3 left-3 flex items-center gap-1 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-lg text-xs font-space text-gold-bright">
                  <Star className="w-3.5 h-3.5 fill-gold-bright text-gold-bright" />
                  <span className="font-bold">{item.rating}</span>
                  <span className="text-white/60 text-[10px]">({item.reviews})</span>
                </div>
              </div>

              {/* Title and description */}
              <h3 className="font-syne text-lg sm:text-xl font-extrabold text-white group-hover:text-gold-bright transition-colors mb-2">
                {item.title}
              </h3>
              <p className="text-xs text-cream-muted leading-relaxed mb-6 font-light line-clamp-2">
                {item.description}
              </p>
            </div>

            {/* Price & Action Row */}
            <div className="pt-4 border-t border-white/10 flex items-center justify-between gap-3">
              <div>
                <span className="text-[10px] text-cream-muted font-space uppercase block">Direct Stock</span>
                <span className="font-syne text-lg sm:text-xl font-bold text-gold-bright">
                  {formatPrice(item.price)}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <Link
                  to={`/product/${item.slug}`}
                  className="p-3 rounded-xl bg-white/5 hover:bg-white/10 text-cream-soft hover:text-white border border-white/10 transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
                  title="View Details"
                >
                  <Eye className="w-4 h-4" />
                </Link>
                <button
                  onClick={() => handleAddToCart(item)}
                  className="btn-futuristic px-4 py-3 rounded-xl text-xs font-bold flex items-center gap-2 min-h-[44px]"
                >
                  <ShoppingBag className="w-3.5 h-3.5" />
                  <span>Vault</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </MotionSection>
    </section>
  )
}
