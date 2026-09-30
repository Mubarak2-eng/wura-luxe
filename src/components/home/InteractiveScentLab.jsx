import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Sparkles, Layers, Flame, CheckCircle, ArrowRight, ShoppingBag } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useCartStore } from '../../store/cartStore'
import { getProductById } from '../../data/products'
import toast from 'react-hot-toast'

const layeringPresets = [
  {
    id: 'viral-cloud-soiree',
    title: 'The Viral Compliment Duo',
    quote: '"Not a day goes by that I don’t get compliments for it!"',
    bottleA: 'Maison Aspad Soirée',
    bottleB: 'Khadlaj Cloud Candy',
    vibes: 'Warm Bourbon Vanilla × Spun Sugar Marshmallow × Ambergris',
    vibeScore: 99,
    auraColor: 'from-amber-500 via-rose-400 to-amber-300',
    productId: 'soiree-cloud-candy-combo',
    image: '/images/products/soiree-cloud-candy.jpg',
    price: 65000,
  },
  {
    id: 'shiyaaka-musk-royalty',
    title: 'Imperial Gold & Silken Musk',
    quote: '"Smells like old money and Dubai royalty."',
    bottleA: 'Shiyaaka Luxury Gold',
    bottleB: 'Sultan White Musk Attar',
    vibes: 'Moroccan Cedarwood × Taif Rose × Velvet Skin Musk',
    vibeScore: 97,
    auraColor: 'from-yellow-400 via-amber-300 to-amber-600',
    productId: 'shiyaaka-gold',
    image: '/images/products/shiyaaka-gold.jpg',
    price: 38000,
  },
  {
    id: 'ashantee-royal-flight',
    title: 'The French-Arabic Triple Symphony',
    quote: '"Intense Elixir base + Floral mist = Pure hypnotic spell."',
    bottleA: 'Ashantee Intense Elixir',
    bottleB: 'Ashantee Floral Bouquet',
    vibes: 'Midnight Bulgarian Peony × Smoked Amber Resin × Iris',
    vibeScore: 95,
    auraColor: 'from-blue-500 via-purple-400 to-rose-400',
    productId: 'ashantee-trio-collection',
    image: '/images/products/ashantee-trio.jpg',
    price: 78000,
  },
]

export default function InteractiveScentLab() {
  const [selectedCombo, setSelectedCombo] = useState(0)
  const current = layeringPresets[selectedCombo]
  const { addItem } = useCartStore()

  const handleAddCombo = () => {
    const prod = getProductById(current.productId)
    if (prod) {
      addItem(prod, prod.volumes[0])
      toast.success(`✨ Added ${current.title} to your Vault!`, {
        icon: '👑',
        duration: 3500,
      })
    }
  }

  return (
    <section className="section-pad py-24 relative overflow-hidden bg-[#050509]">
      {/* Dynamic Scent Aura Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-gradient-to-r from-gold/10 via-amber-500/5 to-purple-500/5 rounded-full blur-[160px] pointer-events-none" />

      <div className="text-center max-w-3xl mx-auto mb-16 relative z-10">
        <div className="cyber-badge mb-4">
          <Layers className="w-3.5 h-3.5 text-gold-bright" />
          <span>FUTURISTIC SCENT LAB</span>
        </div>
        <h2 className="font-syne text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-4">
          Interactive <span className="text-liquid-gold">Layering Matrix</span>
        </h2>
        <p className="font-cinzel text-gold-light italic text-lg sm:text-xl font-medium">
          "Smell as good as you look!"
        </p>
        <p className="text-cream-muted text-sm sm:text-base max-w-xl mx-auto mt-3">
          Discover why layering two complementary fragrances unlocks an irresistible signature sillage that lasts all day and all night.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
        {/* Left Column: Preset Selector */}
        <div className="lg:col-span-5 flex flex-col gap-4">
          {layeringPresets.map((preset, idx) => (
            <motion.div
              key={preset.id}
              whileHover={{ x: 6 }}
              onClick={() => setSelectedCombo(idx)}
              className={`p-5 rounded-2xl cursor-pointer transition-all duration-300 border ${
                selectedCombo === idx
                  ? 'bg-[#10101c] border-gold-bright shadow-[0_0_25px_rgba(212,175,55,0.25)]'
                  : 'bg-white/[0.02] border-white/10 hover:bg-white/[0.05] hover:border-gold/30'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-space font-bold uppercase tracking-wider text-gold-bright">
                  COMBO 0{idx + 1}
                </span>
                <span className="text-xs font-space text-cream-muted">
                  Match Score: <strong className="text-white">{preset.vibeScore}%</strong>
                </span>
              </div>
              <h3 className="font-syne text-lg font-bold text-white mb-1">
                {preset.title}
              </h3>
              <p className="text-xs text-gold-light italic font-cinzel">
                {preset.quote}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Right Column: Holographic Chamber Visualizer */}
        <div className="lg:col-span-7">
          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4 }}
              className="glass-panel p-7 sm:p-9 rounded-3xl relative overflow-hidden border border-gold/40 shadow-2xl"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 items-center">
                {/* Visualizer Image */}
                <div className="relative aspect-square rounded-2xl overflow-hidden border border-gold/30 shadow-2xl bg-black">
                  <img
                    src={current.image}
                    alt={current.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  <div className="absolute bottom-3 left-3 right-3 bg-black/70 backdrop-blur-md px-3 py-2 rounded-xl border border-white/10 text-center">
                    <span className="text-[11px] font-space font-bold uppercase tracking-widest text-gold-bright">
                      VERIFIED IN-STOCK DUO
                    </span>
                  </div>
                </div>

                {/* Scent Chemistry Breakdown */}
                <div className="flex flex-col">
                  <div className="text-xs font-space text-gold-bright tracking-widest uppercase font-bold mb-1">
                    LAYER CHEMISTRY
                  </div>
                  <h3 className="font-syne text-2xl font-black text-white mb-3 leading-tight">
                    {current.title}
                  </h3>

                  <div className="space-y-3 mb-6 text-xs">
                    <div className="p-3 rounded-xl bg-white/[0.03] border border-white/10">
                      <div className="text-gold font-bold uppercase font-space text-[10px]">BASE LAYER</div>
                      <div className="text-white font-medium">{current.bottleA}</div>
                    </div>
                    <div className="p-3 rounded-xl bg-white/[0.03] border border-white/10">
                      <div className="text-gold-light font-bold uppercase font-space text-[10px]">TOP INFUSION</div>
                      <div className="text-white font-medium">{current.bottleB}</div>
                    </div>
                    <div className="pt-2">
                      <span className="text-cream-muted text-[11px] font-space block mb-1">ACCORD HARMONY:</span>
                      <p className="text-gold font-medium leading-relaxed">{current.vibes}</p>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-3">
                    <button
                      onClick={handleAddCombo}
                      className="btn-futuristic flex-1 py-3.5 px-4 rounded-xl text-xs font-extrabold flex items-center justify-center gap-2"
                    >
                      <ShoppingBag className="w-4 h-4" />
                      <span>Order Combo (₦{current.price.toLocaleString()})</span>
                    </button>
                    <Link
                      to={`/product/${current.productId}`}
                      className="btn-futuristic-outline py-3.5 px-4 rounded-xl text-xs font-bold"
                    >
                      Inspect
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
