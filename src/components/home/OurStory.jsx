import { Link } from 'react-router-dom'
import { Sparkles, ShieldCheck, Award, HeartHandshake } from 'lucide-react'
import MotionSection from '../common/MotionSection'

export default function OurStory() {
  return (
    <section className="section-pad py-20 sm:py-24 relative overflow-hidden bg-[#030305]">
      <MotionSection className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
        {/* Left Visual Stock Showcase */}
        <div className="lg:col-span-6 relative">
          <div className="relative aspect-[4/5] rounded-3xl overflow-hidden glass-panel p-2 border border-gold/30 shadow-2xl">
            <div className="w-full h-full rounded-2xl overflow-hidden relative">
              <img
                src="/images/products/ashantee-trio.jpg"
                alt="Mama Fragrance Verified Stock"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              
              <div className="absolute bottom-4 sm:bottom-6 inset-x-4 sm:inset-x-6 glass-panel p-3.5 sm:p-4 rounded-2xl border border-gold/40">
                <p className="font-cinzel text-gold-bright text-sm sm:text-base font-bold italic">
                  "Smell as good as you look!"
                </p>
                <p className="text-[10px] sm:text-[11px] text-cream-muted font-space uppercase tracking-widest mt-1">
                  100% Genuine Arabian & French Fragrances
                </p>
              </div>
            </div>
          </div>

          {/* Floating Trust Accent Badge */}
          <div className="absolute -top-4 -right-4 hidden sm:flex items-center gap-3 glass-panel px-4 sm:px-5 py-2.5 sm:py-3 rounded-2xl border border-gold/40 shadow-[0_0_30px_rgba(212,175,55,0.3)]">
            <Award className="w-5 h-5 sm:w-6 sm:h-6 text-gold-bright" />
            <div>
              <div className="text-xs font-syne font-black text-white">GENUINE FLACONS</div>
              <div className="text-[10px] text-gold-light font-space">NO WATERED DOWN DILUTIONS</div>
            </div>
          </div>
        </div>

        {/* Right Story Text */}
        <div className="lg:col-span-6">
          <div className="cyber-badge mb-3 sm:mb-4">
            <Sparkles className="w-3.5 h-3.5 text-gold-bright" />
            <span>THE MAMA FRAGRANCE ETHOS</span>
          </div>

          <h2 className="font-syne text-3xl sm:text-5xl lg:text-6xl font-black text-white leading-tight mb-3 sm:mb-4">
            Where Elegance Meets <br />
            <span className="text-liquid-gold">Magnetic Sillage</span>
          </h2>

          <p className="font-cinzel text-gold-light text-lg sm:text-xl italic font-semibold mb-4 sm:mb-6">
            "Smell as good as you look!"
          </p>

          <p className="text-cream-soft text-sm sm:text-base leading-relaxed mb-4 sm:mb-6 font-light">
            At <strong>Mama Fragrance</strong>, we believe fragrance is not just an accessory—it is an invisible crown. A statement of who you are before you even speak.
          </p>
          <p className="text-cream-muted text-xs sm:text-sm lg:text-base leading-relaxed mb-6 sm:mb-8 font-light">
            We scour the finest perfumeries in the UAE, Paris, and beyond to bring you beast-mode Arabian heavyweights like <em>Shiyaaka Gold</em>, viral layering sensations like <em>Soirée & Cloud Candy</em>, and prestige collectors' suites like <em>Ashantee</em>. Every bottle is 100% genuine and curated to leave an unforgettable impression wherever you step.
          </p>

          {/* Value Pillars */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-8 sm:mb-10">
            <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/10">
              <div className="flex items-center gap-2 text-gold-bright font-syne font-bold text-sm mb-1">
                <ShieldCheck className="w-4 h-4" />
                <span>Verified Stock Only</span>
              </div>
              <p className="text-xs text-cream-muted leading-relaxed">
                Direct from licensed distributors with authentic hologram seals.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/10">
              <div className="flex items-center gap-2 text-gold-bright font-syne font-bold text-sm mb-1">
                <HeartHandshake className="w-4 h-4" />
                <span>Custom Scent Advisory</span>
              </div>
              <p className="text-xs text-cream-muted leading-relaxed">
                Direct WhatsApp consultation to match your mood and occasion.
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5">
            <Link
              to="/about"
              className="btn-futuristic px-7 py-3.5 rounded-xl text-xs font-bold uppercase tracking-wider text-center"
            >
              Explore Our Philosophy
            </Link>
            <Link
              to="/contact"
              className="btn-futuristic-outline px-7 py-3.5 rounded-xl text-xs font-bold uppercase tracking-wider text-center"
            >
              Speak to Scent Concierge
            </Link>
          </div>
        </div>
      </MotionSection>
    </section>
  )
}
