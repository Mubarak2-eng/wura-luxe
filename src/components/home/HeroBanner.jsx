import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, useReducedMotion } from 'framer-motion'
import { Sparkles, ArrowRight, Compass, Star } from 'lucide-react'

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
  const shouldReduceMotion = useReducedMotion()

  // Slow-luxury easing curve: [0.25, 1, 0.5, 1]
  const luxuryEase = [0.25, 1, 0.5, 1]

  // Staggered upward drift (15px, 150ms delay)
  const itemVariants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 15 },
    visible: (customDelay) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: shouldReduceMotion ? 0.2 : 0.6,
        delay: shouldReduceMotion ? 0 : customDelay,
        ease: luxuryEase,
      },
    }),
  }

  return (
    <section className="relative min-h-[90vh] sm:min-h-[92vh] flex items-center overflow-hidden bg-[#030305] py-12 sm:py-20 lg:py-24">
      {/* ── Background Media: Softly scale down from 1.03x to 1.0x over 1200ms using cinematic ease ── */}
      <motion.div
        initial={shouldReduceMotion ? { scale: 1 } : { scale: 1.03 }}
        animate={{ scale: 1 }}
        transition={{ duration: shouldReduceMotion ? 0.2 : 1.2, ease: luxuryEase }}
        className="absolute inset-0 pointer-events-none overflow-hidden"
      >
        {/* Background Ambient Mesh Image & Auroral Glow */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-25 mix-blend-screen"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1541643600914-78b084683702?w=1800&q=90')",
          }}
        />

        {/* Dynamic auroral floating lights */}
        <div className="absolute -top-32 -left-32 w-[340px] sm:w-[600px] h-[340px] sm:h-[600px] rounded-full bg-gradient-to-br from-gold/20 via-amber-500/10 to-transparent blur-[100px] sm:blur-[140px]" />
        <div className="absolute -bottom-32 right-0 w-[360px] sm:w-[700px] h-[360px] sm:h-[700px] rounded-full bg-gradient-to-tl from-gold-bright/15 via-rose-500/5 to-transparent blur-[110px] sm:blur-[150px]" />

        {/* Cyber grid lines */}
        <div className="absolute inset-0 bg-cyber-grid opacity-60" />
      </motion.div>

      <div className="section-pad relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          
          {/* Left Column: Staggered Editorial Introduction */}
          <div className="lg:col-span-7 flex flex-col items-start">
            
            {/* 1. Cyber Badge */}
            <motion.div
              custom={0.1}
              variants={itemVariants}
              initial="hidden"
              animate="visible"
              className="cyber-badge mb-5 cursor-default"
            >
              <Sparkles className="w-3.5 h-3.5 text-gold-bright" />
              <span>THE FUTURE OF LUXURY SCENTS</span>
            </motion.div>

            {/* 2. Main Headline: drift up 15px, fade in (delay 0.25s) */}
            <motion.div
              custom={0.25}
              variants={itemVariants}
              initial="hidden"
              animate="visible"
              className="w-full"
            >
              <h1 className="font-syne text-4xl sm:text-6xl lg:text-7xl xl:text-8xl font-black text-white leading-[1.02] tracking-tight mb-3">
                MAMA <br />
                <span className="text-liquid-gold text-glow">FRAGRANCE</span>
              </h1>
            </motion.div>

            {/* 3. Motto Bar (delay 0.40s) */}
            <motion.div
              custom={0.4}
              variants={itemVariants}
              initial="hidden"
              animate="visible"
              className="relative mb-5 pl-3 sm:pl-4 border-l-2 border-gold-bright"
            >
              <p className="font-cinzel text-lg sm:text-2xl lg:text-3xl text-gold-light italic font-semibold tracking-wide">
                "Smell as good as you look!"
              </p>
              <p className="text-[10px] sm:text-xs text-cream-muted font-space tracking-widest uppercase mt-0.5">
                Authentic Arabian Flacons • French Niche Elixirs • Viral Layering Duos
              </p>
            </motion.div>

            {/* 4. Description Paragraph: drift up 15px, fade in (delay 0.55s) */}
            <motion.p
              custom={0.55}
              variants={itemVariants}
              initial="hidden"
              animate="visible"
              className="text-cream-soft text-sm sm:text-base lg:text-lg max-w-xl leading-relaxed mb-8 font-light"
            >
              Elevate your daily presence with unmatched sillage and magnetic aura.
              Explore our verified stock of viral Arabian heavyweights, Parisian elixirs,
              and compliment-guaranteed scent combos.
            </motion.p>

            {/* 5. Primary CTA Buttons: drift up 15px, fade in (delay 0.70s) */}
            <motion.div
              custom={0.7}
              variants={itemVariants}
              initial="hidden"
              animate="visible"
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 w-full sm:w-auto"
            >
              <Link
                to="/shop"
                className="btn-futuristic px-7 sm:px-8 py-3.5 sm:py-4 rounded-xl text-xs sm:text-sm font-extrabold flex items-center justify-center gap-2.5 text-center"
              >
                <span>Enter The Vault</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/gallery"
                className="btn-futuristic-outline px-6 sm:px-7 py-3.5 sm:py-4 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 text-center"
              >
                <Compass className="w-4 h-4 text-gold-bright" />
                <span>Live Stock Lookbook</span>
              </Link>
            </motion.div>

            {/* Trust Badges Bar */}
            <motion.div
              custom={0.85}
              variants={itemVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-3 gap-3 sm:gap-4 mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-white/10 w-full max-w-lg"
            >
              <div>
                <div className="font-syne text-xl sm:text-3xl font-extrabold text-gold-bright">100%</div>
                <div className="text-[10px] sm:text-[11px] text-cream-muted uppercase tracking-wider font-space">Authentic Stock</div>
              </div>
              <div>
                <div className="font-syne text-xl sm:text-3xl font-extrabold text-white">18+ Hrs</div>
                <div className="text-[10px] sm:text-[11px] text-cream-muted uppercase tracking-wider font-space">Beast Longevity</div>
              </div>
              <div>
                <div className="font-syne text-xl sm:text-3xl font-extrabold text-gold-bright">4.9 ★</div>
                <div className="text-[10px] sm:text-[11px] text-cream-muted uppercase tracking-wider font-space">500+ Reviews</div>
              </div>
            </motion.div>

          </div>

          {/* Right Column: 3D Futuristic Stock Hologram Display */}
          <motion.div
            initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.96, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.35, ease: luxuryEase }}
            className="lg:col-span-5 relative mt-4 lg:mt-0"
          >
            <div className="relative p-0.5 sm:p-1 rounded-3xl bg-gradient-to-b from-gold/40 via-white/10 to-gold/20 shadow-[0_0_50px_rgba(212,175,55,0.2)]">
              <div className="glass-panel rounded-[22px] p-4 sm:p-6 lg:p-7 relative overflow-hidden">
                
                {/* Top Interactive Switcher Pill */}
                <div className="flex items-center justify-between mb-4 sm:mb-5 pb-3 sm:pb-4 border-b border-white/10">
                  <div className="flex items-center gap-2">
                    <span className="relative flex h-2.5 w-2.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gold-bright opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-gold"></span>
                    </span>
                    <span className="text-[10px] sm:text-[11px] font-space tracking-widest text-gold uppercase font-bold">
                      IN-STOCK SPOTLIGHT
                    </span>
                  </div>
                  <span className="text-[11px] text-white/60 font-space font-medium">
                    0{activeHighlight + 1} / 03
                  </span>
                </div>

                {/* Stock Image Display */}
                <Link
                  to={`/product/${current.slug}`}
                  className="group block relative aspect-[4/5] rounded-2xl overflow-hidden mb-4 sm:mb-5 bg-[#050508] border border-gold/20"
                >
                  <motion.img
                    key={current.id}
                    initial={{ opacity: 0, scale: 1.05 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.45, ease: luxuryEase }}
                    src={current.image}
                    alt={current.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#050508] via-transparent to-transparent opacity-80" />
                  
                  {/* Floating Tag */}
                  <div className="absolute top-3 left-3 bg-black/80 backdrop-blur-md border border-gold/40 px-2.5 py-1 rounded-lg text-[11px] font-space font-bold text-gold-bright">
                    {current.tag}
                  </div>

                  {/* Price Tag Badge */}
                  <div className="absolute bottom-3 right-3 bg-gradient-to-r from-gold-dark to-gold-bright text-black font-extrabold text-xs sm:text-sm px-3.5 py-1.5 rounded-full shadow-[0_0_15px_#ffd700]">
                    {current.price}
                  </div>
                </Link>

                {/* Product Meta */}
                <div className="mb-4 sm:mb-5">
                  <div className="flex items-center justify-between">
                    <h3 className="font-syne text-lg sm:text-xl font-bold text-white group-hover:text-gold-bright transition-colors line-clamp-1">
                      {current.name}
                    </h3>
                    <div className="flex items-center gap-1 text-gold-bright text-xs">
                      <Star className="w-3.5 h-3.5 fill-gold-bright text-gold-bright" />
                      <span>5.0</span>
                    </div>
                  </div>
                  <p className="text-xs text-gold-light/80 font-space mt-0.5 mb-2 line-clamp-1">
                    {current.motto}
                  </p>
                  <p className="text-xs text-cream-muted flex items-center gap-1.5 truncate">
                    <span className="text-gold font-bold">Notes:</span>
                    <span className="truncate">{current.notes}</span>
                  </p>
                </div>

                {/* Switcher Buttons */}
                <div className="grid grid-cols-3 gap-2 pt-1">
                  {signatureShowcases.map((item, idx) => (
                    <button
                      key={item.id}
                      onClick={() => setActiveHighlight(idx)}
                      className={`px-2 py-2 rounded-lg text-[10px] font-space font-bold uppercase transition-all duration-300 truncate min-h-[36px] ${
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
