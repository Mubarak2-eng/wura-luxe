import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Sparkles, ArrowRight, ShieldCheck, Flame, Compass, Star } from 'lucide-react'

const signatureShowcases = [
  {
    id: 'shiyaaka-gold',
    name: 'Shiyaaka Luxury Gold',
    motto: 'Architectural Gold Flacon',
    tag: '👑 Royal Signature',
    notes: 'Amber • Cedar • Lavender',
    image: '/images/products/shiyaaka-gold.jpg',
    price: '₦38,000',
    slug: 'shiyaaka-luxury-gold',
  },
  {
    id: 'soiree-cloud-candy-combo',
    name: 'Soirée × Cloud Candy',
    motto: 'The Viral Compliment Duo',
    tag: '✨ Double Layering Hit',
    notes: 'Vanilla Cream • Spun Sugar • Ambergris',
    image: '/images/products/soiree-cloud-candy.jpg',
    price: '₦65,000',
    slug: 'soiree-cloud-candy-layering-combo',
  },
  {
    id: 'ashantee-trio-collection',
    name: 'Ashantee Prestige Trio',
    motto: 'Intense • Floral • Far Away',
    tag: '🇫🇷 French-Arabic Trio',
    notes: 'Peony • Incense • Midnight Rose',
    image: '/images/products/ashantee-trio.jpg',
    price: '₦78,000',
    slug: 'ashantee-prestige-trio',
  },
]

export default function HeroBanner() {
  const [activeHighlight, setActiveHighlight] = useState(0)
  const current = signatureShowcases[activeHighlight]

  return (
    <section className="relative min-h-[92vh] flex items-center overflow-hidden bg-[#030305] py-16 lg:py-24">
      {/* Background Animated Cyber Mesh & Aurora */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Glowing Auroral Orbs */}
        <motion.div
          animate={{
            x: [0, 60, -40, 0],
            y: [0, -50, 30, 0],
            scale: [1, 1.25, 0.9, 1],
          }}
          transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
          className="absolute -top-32 -left-32 w-[600px] h-[600px] rounded-full bg-gradient-to-br from-gold/20 via-amber-500/10 to-transparent blur-[120px]"
        />
        <motion.div
          animate={{
            x: [0, -80, 50, 0],
            y: [0, 40, -40, 0],
            scale: [1, 1.15, 0.95, 1],
          }}
          transition={{ duration: 22, repeat: Infinity, ease: 'linear' }}
          className="absolute -bottom-32 right-0 w-[700px] h-[700px] rounded-full bg-gradient-to-tl from-gold-bright/15 via-rose-500/5 to-transparent blur-[140px]"
        />
        {/* Subtle grid lines */}
        <div className="absolute inset-0 bg-cyber-grid opacity-70" />
      </div>

      <div className="section-pad relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Futuristic Editorial & Motto */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 flex flex-col items-start"
          >
            {/* Cyber Badge with glowing pulse */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="cyber-badge mb-6 cursor-default"
            >
              <Sparkles className="w-3.5 h-3.5 text-gold-bright animate-spin" style={{ animationDuration: '8s' }} />
              <span>THE FUTURE OF LUXURY SCENTS</span>
            </motion.div>

            {/* Main Headline */}
            <h1 className="font-syne text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-black text-white leading-[0.98] tracking-tight mb-4">
              MAMA <br />
              <span className="text-liquid-gold text-glow">FRAGRANCE</span>
            </h1>

            {/* The Brand Motto */}
            <div className="relative mb-6 pl-4 border-l-2 border-gold-bright">
              <p className="font-cinzel text-xl sm:text-2xl lg:text-3xl text-gold-light italic font-semibold tracking-wide">
                "Smell as good as you look!"
              </p>
              <p className="text-xs text-cream-muted font-space tracking-widest uppercase mt-1">
                Authentic Arabian Flacons • French Niche Elixirs • Viral Layering Duos
              </p>
            </div>

            <p className="text-cream-soft text-base sm:text-lg max-w-xl leading-relaxed mb-8 font-light">
              Elevate your daily presence with unmatched sillage and magnetic aura.
              Explore our verified stock of viral Arabian heavyweights, Parisian elixirs,
              and compliment-guaranteed scent combos.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 w-full sm:w-auto">
              <Link
                to="/shop"
                className="btn-futuristic px-8 py-4 rounded-xl text-xs sm:text-sm font-extrabold flex items-center justify-center gap-3 shadow-[0_0_30px_rgba(212,175,55,0.4)]"
              >
                <span>Enter The Vault</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/gallery"
                className="btn-futuristic-outline px-7 py-4 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2"
              >
                <Compass className="w-4 h-4 text-gold-bright" />
                <span>Live Stock Lookbook</span>
              </Link>
            </div>

            {/* Trust Badges Bar */}
            <div className="grid grid-cols-3 gap-4 mt-12 pt-8 border-t border-white/10 w-full max-w-lg">
              <div>
                <div className="font-syne text-2xl lg:text-3xl font-extrabold text-gold-bright">100%</div>
                <div className="text-[11px] text-cream-muted uppercase tracking-wider font-space">Authentic Stock</div>
              </div>
              <div>
                <div className="font-syne text-2xl lg:text-3xl font-extrabold text-white">18+ Hrs</div>
                <div className="text-[11px] text-cream-muted uppercase tracking-wider font-space">Beast Longevity</div>
              </div>
              <div>
                <div className="font-syne text-2xl lg:text-3xl font-extrabold text-gold-bright">4.9 ★</div>
                <div className="text-[11px] text-cream-muted uppercase tracking-wider font-space">500+ Reviews</div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: 3D Futuristic Stock Hologram Display */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 relative"
          >
            {/* Outer Holographic Glow Shell */}
            <div className="relative p-1 rounded-3xl bg-gradient-to-b from-gold/40 via-white/10 to-gold/20 shadow-[0_0_60px_rgba(212,175,55,0.25)]">
              <div className="glass-panel rounded-[22px] p-6 lg:p-7 relative overflow-hidden">
                
                {/* Top Interactive Switcher Pill */}
                <div className="flex items-center justify-between mb-5 pb-4 border-b border-white/10">
                  <div className="flex items-center gap-2">
                    <span className="relative flex h-3 w-3">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gold-bright opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-gold"></span>
                    </span>
                    <span className="text-[11px] font-space tracking-widest text-gold uppercase font-bold">
                      IN-STOCK SPOTLIGHT
                    </span>
                  </div>
                  <span className="text-xs text-white/60 font-space font-medium">
                    0{activeHighlight + 1} / 03
                  </span>
                </div>

                {/* Stock Image Display with 3D Depth Float */}
                <Link to={`/product/${current.slug}`} className="group block relative aspect-[4/5] rounded-2xl overflow-hidden mb-5 bg-[#050508] border border-gold/20">
                  <motion.img
                    key={current.id}
                    initial={{ opacity: 0, scale: 1.08 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    src={current.image}
                    alt={current.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  {/* Hologram Scanner Line */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#050508] via-transparent to-transparent opacity-80" />
                  
                  {/* Floating Tag */}
                  <div className="absolute top-4 left-4 bg-black/80 backdrop-blur-md border border-gold/40 px-3 py-1.5 rounded-lg text-xs font-space font-bold text-gold-bright">
                    {current.tag}
                  </div>

                  {/* Price Tag Badge */}
                  <div className="absolute bottom-4 right-4 bg-gradient-to-r from-gold-dark to-gold-bright text-black font-extrabold text-sm px-4 py-1.5 rounded-full shadow-[0_0_15px_#ffd700]">
                    {current.price}
                  </div>
                </Link>

                {/* Product Meta */}
                <div className="mb-5">
                  <div className="flex items-center justify-between">
                    <h3 className="font-syne text-xl font-bold text-white group-hover:text-gold-bright transition-colors">
                      {current.name}
                    </h3>
                    <div className="flex items-center gap-1 text-gold-bright text-xs">
                      <Star className="w-3.5 h-3.5 fill-gold-bright" />
                      <span>5.0</span>
                    </div>
                  </div>
                  <p className="text-xs text-gold-light/80 font-space mt-0.5 mb-2">
                    {current.motto}
                  </p>
                  <p className="text-xs text-cream-muted flex items-center gap-2">
                    <span className="text-gold font-bold">Notes:</span>
                    <span>{current.notes}</span>
                  </p>
                </div>

                {/* Switcher Buttons */}
                <div className="grid grid-cols-3 gap-2 pt-2">
                  {signatureShowcases.map((item, idx) => (
                    <button
                      key={item.id}
                      onClick={() => setActiveHighlight(idx)}
                      className={`px-2 py-2 rounded-lg text-[10px] font-space font-bold uppercase transition-all duration-300 truncate ${
                        activeHighlight === idx
                          ? 'bg-gold text-black shadow-[0_0_15px_rgba(212,175,55,0.6)]'
                          : 'bg-white/5 text-cream-soft hover:bg-white/10 hover:text-gold'
                      }`}
                    >
                      {item.name.split(' ')[0]}
                    </button>
                  ))}
                </div>

              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
