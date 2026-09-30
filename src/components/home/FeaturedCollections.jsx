import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Sparkles, Layers, ArrowUpRight } from 'lucide-react'
import { categories } from '../../data/categories'

const collectionData = [
  {
    id: 'edp',
    title: 'Eau de Parfum Flacons',
    desc: 'Pure concentration, 14–24hr beast longevity',
    img: '/images/products/shiyaaka-gold.jpg',
    tag: '👑 Royal Heavyweights',
  },
  {
    id: 'gift',
    title: 'Layering Sets & Combos',
    desc: 'The viral compliment duos & collector trios',
    img: '/images/products/soiree-cloud-candy.jpg',
    tag: '✨ Double Compliments',
  },
  {
    id: 'oil',
    title: 'Concentrated Attars',
    desc: '100% alcohol-free pure oils with skin heat evolution',
    img: 'https://images.unsplash.com/photo-1621243804936-775306a8f2e3?w=800&q=85',
    tag: '🌿 Pure Extract',
  },
  {
    id: 'mist',
    title: 'All-Over Body Mists',
    desc: 'Airy crystal sillage for skin, hair & fabrics',
    img: 'https://images.unsplash.com/photo-1563170351-be54b573ab31?w=800&q=85',
    tag: '🌸 All-Day Glow',
  },
  {
    id: 'candle',
    title: 'Luxury Scented Candles',
    desc: 'Organic soy wax infusing royal ambience',
    img: 'https://images.unsplash.com/photo-1603905219403-0dbe4b64a5c1?w=800&q=85',
    tag: '🕯️ Penthouse Mood',
  },
]

export default function FeaturedCollections() {
  return (
    <section className="section-pad py-24 relative overflow-hidden bg-[#05050a]">
      <div className="text-center max-w-2xl mx-auto mb-16">
        <div className="cyber-badge mb-3">
          <Layers className="w-3.5 h-3.5 text-gold-bright" />
          <span>CURATED VAULTS</span>
        </div>
        <h2 className="font-syne text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-3">
          Explore By <span className="text-liquid-gold">Category</span>
        </h2>
        <p className="font-cinzel text-gold-light italic text-base sm:text-lg">
          "Smell as good as you look!"
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {collectionData.map((cat, i) => (
          <motion.div
            key={cat.id}
            whileHover={{ y: -6 }}
            transition={{ duration: 0.3 }}
            className={`group relative rounded-3xl overflow-hidden glass-panel border border-gold/25 hover:border-gold-bright transition-all duration-500 min-h-[300px] flex flex-col justify-end p-6 sm:p-8 ${
              i === 0 ? 'md:col-span-2 lg:col-span-2' : ''
            }`}
          >
            {/* Background image */}
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
              style={{ backgroundImage: `url('${cat.img}')` }}
            />
            {/* Overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#030305] via-[#030305]/70 to-transparent" />
            
            {/* Holographic light sweep */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-tr from-gold/15 via-transparent to-transparent pointer-events-none" />

            {/* Content */}
            <div className="relative z-10">
              <span className="inline-block px-3 py-1 rounded-full text-[10px] font-space font-extrabold uppercase tracking-wider text-black bg-gold-bright shadow-[0_0_12px_#ffd700] mb-3">
                {cat.tag}
              </span>
              <h3 className="font-syne text-2xl sm:text-3xl font-black text-white group-hover:text-gold-bright transition-colors mb-2">
                {cat.title}
              </h3>
              <p className="text-xs sm:text-sm text-cream-soft font-light max-w-md mb-6 leading-relaxed">
                {cat.desc}
              </p>

              <Link
                to={`/shop?category=${cat.id}`}
                className="btn-futuristic inline-flex items-center gap-2 py-2.5 px-5 rounded-xl text-xs font-bold"
              >
                <span>Browse Vault</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
