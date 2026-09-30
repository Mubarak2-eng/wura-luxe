import { useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { Sparkles, Layers, Flame, CheckCircle, ArrowRight, ShoppingBag, RotateCcw, Zap } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useCartStore } from '../../store/cartStore'
import { getProductById } from '../../data/products'
import MotionSection from '../common/MotionSection'
import toast from 'react-hot-toast'

const layeringPresets = [
  {
    id: 'viral-cloud-soiree',
    title: 'The Viral Compliment Duo',
    quote: '"Not a day goes by that I don’t get compliments for it!"',
    vibe: 'Gourmand Seduction',
    bottleA: 'Maison Aspad Soirée',
    bottleB: 'Khadlaj Cloud Candy',
    vibes: 'Warm Bourbon Vanilla × Spun Sugar Marshmallow × Ambergris',
    vibeScore: 99,
    productId: 'soiree-cloud-candy-combo',
    image: '/images/products/soiree-cloud-candy.jpg',
    price: 65000,
    longevity: '18+ Hours',
  },
  {
    id: 'shiyaaka-musk-royalty',
    title: 'Imperial Gold & Silken Musk',
    quote: '"Smells like old money and Dubai royalty."',
    vibe: 'Royal Leadership',
    bottleA: 'Shiyaaka Luxury Gold',
    bottleB: 'Sultan White Musk Attar',
    vibes: 'Moroccan Cedarwood × Taif Rose × Velvet Skin Musk',
    vibeScore: 97,
    productId: 'shiyaaka-gold',
    image: '/images/products/shiyaaka-gold.jpg',
    price: 38000,
    longevity: '20+ Hours',
  },
  {
    id: 'ashantee-royal-flight',
    title: 'French-Arabic Triple Symphony',
    quote: '"Intense Elixir base + Floral mist = Pure hypnotic spell."',
    vibe: 'Parisian Elegance',
    bottleA: 'Ashantee Intense Elixir',
    bottleB: 'Ashantee Floral Bouquet',
    vibes: 'Midnight Bulgarian Peony × Smoked Amber Resin × Iris',
    vibeScore: 95,
    productId: 'ashantee-trio-collection',
    image: '/images/products/ashantee-trio.jpg',
    price: 78000,
    longevity: '16+ Hours',
  },
]

export default function InteractiveScentLab() {
  const [currentStep, setCurrentStep] = useState(1) // Step 1: Vibe Selection, Step 2: Target Occasion, Step 3: Layering Prescription
  const [selectedVibeIndex, setSelectedVibeIndex] = useState(0)
  const shouldReduceMotion = useReducedMotion()

  const current = layeringPresets[selectedVibeIndex]
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

  // ── Multi-Step Motion Specification ──
  // Active block scales down to 0.98x and fades to 0 over 250ms
  // New block fades in and slides up from 1.02x over 350ms
  const stepVariants = {
    initial: shouldReduceMotion
      ? { opacity: 0 }
      : { opacity: 0, scale: 1.02, y: 15 },
    animate: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: shouldReduceMotion ? 0.15 : 0.35,
        ease: [0.16, 1, 0.3, 1],
      },
    },
    exit: shouldReduceMotion
      ? { opacity: 0 }
      : {
          opacity: 0,
          scale: 0.98,
          transition: {
            duration: 0.25,
            ease: [0.25, 1, 0.5, 1],
          },
        },
  }

  return (
    <section className="section-pad py-20 sm:py-24 relative overflow-hidden bg-[#050509]">
      {/* Dynamic Scent Aura Background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[320px] sm:w-[800px] h-[320px] sm:h-[500px] bg-gradient-to-r from-gold/10 via-amber-500/5 to-purple-500/5 rounded-full blur-[90px] sm:blur-[160px] pointer-events-none" />

      {/* Single-play scroll reveal header */}
      <MotionSection className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 relative z-10">
        <div className="cyber-badge mb-3">
          <Layers className="w-3.5 h-3.5 text-gold-bright" />
          <span>FUTURISTIC SCENT FINDER</span>
        </div>
        <h2 className="font-syne text-3xl sm:text-5xl lg:text-6xl font-black text-white mb-2 sm:mb-3">
          Scent Layering <span className="text-liquid-gold">Simulator</span>
        </h2>
        <p className="font-cinzel text-gold-light italic text-base sm:text-xl font-medium">
          "Smell as good as you look!"
        </p>

        {/* Multi-step progress indicator */}
        <div className="flex items-center justify-center gap-2 sm:gap-3 mt-6">
          {[1, 2, 3].map((step) => (
            <button
              key={step}
              onClick={() => setCurrentStep(step)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] sm:text-xs font-space font-bold uppercase transition-all ${
                currentStep === step
                  ? 'bg-gold-bright text-black shadow-[0_0_12px_#ffd700]'
                  : currentStep > step
                  ? 'bg-white/10 text-gold border border-gold/30'
                  : 'bg-white/5 text-cream-muted'
              }`}
            >
              <span>0{step}</span>
              <span className="hidden sm:inline">
                {step === 1 ? 'Aura Vibe' : step === 2 ? 'Occasion' : 'Prescription'}
              </span>
            </button>
          ))}
        </div>
      </MotionSection>

      {/* ── Multi-Step Animated Container ── */}
      <div className="max-w-4xl mx-auto relative z-10 min-h-[420px]">
        <AnimatePresence mode="wait">
          
          {/* STEP 1: Select Fragrance Vibe */}
          {currentStep === 1 && (
            <motion.div
              key="step-1"
              variants={stepVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="glass-panel p-6 sm:p-9 rounded-3xl border border-gold/30 shadow-2xl"
            >
              <div className="text-center mb-8">
                <span className="text-[10px] sm:text-xs font-space text-gold-bright uppercase tracking-widest font-bold">
                  STEP 01 OF 03
                </span>
                <h3 className="font-syne text-2xl sm:text-3xl font-black text-white mt-1">
                  Choose Your Desired Presence
                </h3>
                <p className="text-xs sm:text-sm text-cream-muted mt-1 font-light">
                  How do you want people in the room to remember you?
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                {layeringPresets.map((preset, idx) => (
                  <button
                    key={preset.id}
                    onClick={() => setSelectedVibeIndex(idx)}
                    className={`p-5 rounded-2xl text-left border transition-all duration-300 min-h-[44px] flex flex-col justify-between ${
                      selectedVibeIndex === idx
                        ? 'bg-[#121220] border-gold-bright shadow-[0_0_20px_rgba(212,175,55,0.3)]'
                        : 'bg-white/[0.03] border-white/10 hover:border-gold/30'
                    }`}
                  >
                    <div>
                      <span className="text-[10px] font-space text-gold uppercase tracking-wider block mb-1">
                        OPTION 0{idx + 1}
                      </span>
                      <h4 className="font-syne font-bold text-white text-base mb-1">
                        {preset.vibe}
                      </h4>
                      <p className="text-xs text-cream-muted font-light line-clamp-2">
                        {preset.quote}
                      </p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-[11px] font-space">
                      <span className="text-gold-light">{preset.longevity}</span>
                      <span className="text-white font-bold">{preset.vibeScore}% Match</span>
                    </div>
                  </button>
                ))}
              </div>

              <div className="flex justify-end">
                <button
                  onClick={() => setCurrentStep(2)}
                  className="btn-futuristic px-7 py-3.5 rounded-xl text-xs font-bold flex items-center gap-2"
                >
                  <span>Continue to Target Occasion</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          )}

          {/* STEP 2: Target Occasion & Sillage Focus */}
          {currentStep === 2 && (
            <motion.div
              key="step-2"
              variants={stepVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="glass-panel p-6 sm:p-9 rounded-3xl border border-gold/30 shadow-2xl"
            >
              <div className="text-center mb-8">
                <span className="text-[10px] sm:text-xs font-space text-gold-bright uppercase tracking-widest font-bold">
                  STEP 02 OF 03
                </span>
                <h3 className="font-syne text-2xl sm:text-3xl font-black text-white mt-1">
                  Select Wear Context
                </h3>
                <p className="text-xs sm:text-sm text-cream-muted mt-1 font-light">
                  Align your selected scent profile for peak performance.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/10 flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-gold/15 border border-gold/30 flex items-center justify-center shrink-0">
                    <Flame className="w-5 h-5 text-gold-bright" />
                  </div>
                  <div>
                    <h4 className="font-syne font-bold text-white text-base mb-1">Evening & Special Occasions</h4>
                    <p className="text-xs text-cream-muted leading-relaxed font-light">
                      Maximum sillage and hypnotic warmth that projects intensely in crowded venues and galas.
                    </p>
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/10 flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-gold/15 border border-gold/30 flex items-center justify-center shrink-0">
                    <Zap className="w-5 h-5 text-gold-bright" />
                  </div>
                  <div>
                    <h4 className="font-syne font-bold text-white text-base mb-1">Everyday Signature Trail</h4>
                    <p className="text-xs text-cream-muted leading-relaxed font-light">
                      Balanced diffusion that lingers in offices and meetings without overwhelming, guaranteed compliments.
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <button
                  onClick={() => setCurrentStep(1)}
                  className="btn-futuristic-outline px-6 py-3.5 rounded-xl text-xs font-bold"
                >
                  ← Back to Vibe
                </button>
                <button
                  onClick={() => setCurrentStep(3)}
                  className="btn-futuristic px-7 py-3.5 rounded-xl text-xs font-bold flex items-center gap-2"
                >
                  <span>Synthesize Layering Formula</span>
                  <Sparkles className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          )}

          {/* STEP 3: Synthesized Scent Layering Prescription */}
          {currentStep === 3 && (
            <motion.div
              key="step-3"
              variants={stepVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="glass-panel p-6 sm:p-9 rounded-3xl border border-gold/40 shadow-2xl"
            >
              <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
                
                {/* Visual Preview */}
                <div className="md:col-span-5 relative aspect-square rounded-2xl overflow-hidden border border-gold/30 bg-black">
                  <img
                    src={current.image}
                    alt={current.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent" />
                  <div className="absolute bottom-3 inset-x-3 text-center bg-black/70 backdrop-blur-md py-1.5 rounded-xl border border-white/10">
                    <span className="text-[11px] font-space font-bold uppercase tracking-wider text-gold-bright">
                      AUTHENTIC STOCK VERIFIED
                    </span>
                  </div>
                </div>

                {/* Prescription Details */}
                <div className="md:col-span-7 flex flex-col">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-space text-gold-bright uppercase tracking-widest font-bold">
                      PERFECT LAYER SYNTHESIS
                    </span>
                    <span className="text-xs font-space font-bold text-white bg-gold/15 border border-gold/30 px-2.5 py-0.5 rounded-full">
                      Match: {current.vibeScore}%
                    </span>
                  </div>

                  <h3 className="font-syne text-2xl sm:text-3xl font-black text-white mb-2 leading-tight">
                    {current.title}
                  </h3>

                  <p className="font-cinzel text-gold-light italic text-xs sm:text-sm mb-5">
                    {current.quote}
                  </p>

                  <div className="space-y-2 mb-6 text-xs">
                    <div className="p-3 rounded-xl bg-white/[0.03] border border-white/10 flex justify-between">
                      <span className="text-cream-muted">Base Foundation:</span>
                      <strong className="text-white">{current.bottleA}</strong>
                    </div>
                    <div className="p-3 rounded-xl bg-white/[0.03] border border-white/10 flex justify-between">
                      <span className="text-cream-muted">Top Infusion:</span>
                      <strong className="text-gold-light">{current.bottleB}</strong>
                    </div>
                    <div className="p-3 rounded-xl bg-white/[0.03] border border-white/10 flex justify-between">
                      <span className="text-cream-muted">Longevity Rating:</span>
                      <strong className="text-gold-bright">{current.longevity}</strong>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-col sm:flex-row gap-3">
                    <button
                      onClick={handleAddCombo}
                      className="btn-futuristic flex-1 py-3.5 px-5 rounded-xl text-xs font-extrabold flex items-center justify-center gap-2"
                    >
                      <ShoppingBag className="w-4 h-4" />
                      <span>Order Prescription (₦{current.price.toLocaleString()})</span>
                    </button>
                    <button
                      onClick={() => setCurrentStep(1)}
                      className="btn-futuristic-outline py-3.5 px-4 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5"
                      title="Restart test"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>Reset</span>
                    </button>
                  </div>
                </div>

              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </section>
  )
}
