import HeroBanner from '../components/home/HeroBanner'
import RealStockShowcase from '../components/home/RealStockShowcase'
import InteractiveScentLab from '../components/home/InteractiveScentLab'
import FeaturedCollections from '../components/home/FeaturedCollections'
import BestSellers from '../components/home/BestSellers'
import OurStory from '../components/home/OurStory'
import Newsletter from '../components/home/Newsletter'
import MotionSection from '../components/common/MotionSection'
import { Star, ShieldCheck, Truck, Award, Zap } from 'lucide-react'

const testimonials = [
  {
    name: 'Adaeze O.',
    location: 'Victoria Island, Lagos',
    text: '“I bought the Soirée & Cloud Candy combo from Mama Fragrance and people literally stop me in traffic and elevators to ask what I am wearing! Smell as good as you look indeed!”',
    rating: 5,
    scent: 'Soirée × Cloud Candy Combo',
    img: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&q=80',
  },
  {
    name: 'Chinedu B.',
    location: 'Maitama, Abuja',
    text: '“Shiyaaka Gold arrived the next day in Abuja. The bottle is heavy, pure luxury, and the projection is beast-mode. Lasts over 16 hours on my native attire.”',
    rating: 5,
    scent: 'Shiyaaka Luxury Gold',
    img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&q=80',
  },
  {
    name: 'Toluwalope A.',
    location: 'GRA, Port Harcourt',
    text: '“The Ashantee Flacon Trio is pure class. Three distinct luxury profiles in one box. 100% original stock with intact seals. Mama Fragrance is now my go-to!”',
    rating: 5,
    scent: 'Ashantee Prestige Flacon Trio',
    img: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=120&q=80',
  },
]

export default function HomePage() {
  return (
    <div className="relative">
      {/* 1. Hero with 1.03x to 1.0x background ease & 15px staggered drift */}
      <HeroBanner />

      {/* 2. Real Physical Inventory Spotlight with single-play scroll reveal */}
      <RealStockShowcase />

      {/* 3. Futuristic Multi-Step Scent Layering Finder (0.98x exit / 1.02x enter cross-fade) */}
      <InteractiveScentLab />

      {/* 4. Vault Collections */}
      <FeaturedCollections />

      {/* 5. Best Sellers Hall of Signatures */}
      <BestSellers />

      {/* 6. Brand Ethos & Heritage */}
      <OurStory />

      {/* 7. Real Client Verified Reviews (Single-play reveal) */}
      <section className="section-pad py-20 sm:py-24 relative overflow-hidden bg-[#040407]">
        <MotionSection className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="cyber-badge mb-3">
            <Star className="w-3.5 h-3.5 fill-gold-bright text-gold-bright" />
            <span>AUTHENTIC CLIENT EXPERIENCES</span>
          </div>
          <h2 className="font-syne text-3xl sm:text-5xl lg:text-6xl font-black text-white mb-2 sm:mb-3">
            Tested &amp; <span className="text-liquid-gold">Obsessed</span>
          </h2>
          <p className="font-cinzel text-gold-light italic text-base sm:text-lg">
            "Smell as good as you look!"
          </p>
        </MotionSection>

        <MotionSection delay={0.15} className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, idx) => (
            <div
              key={idx}
              className="glass-panel p-6 sm:p-8 rounded-3xl border border-gold/20 hover:border-gold/50 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex gap-1 text-gold-bright">
                    {Array.from({ length: t.rating }).map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-gold-bright" />
                    ))}
                  </div>
                  <span className="text-[10px] font-space font-bold uppercase tracking-wider text-gold-light bg-gold/10 border border-gold/20 px-2.5 py-0.5 rounded-full truncate max-w-[170px]">
                    {t.scent}
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-cream-soft leading-relaxed mb-6 font-light italic">
                  {t.text}
                </p>
              </div>

              <div className="pt-4 border-t border-white/10 flex items-center gap-3">
                <img
                  src={t.img}
                  alt={t.name}
                  className="w-10 h-10 sm:w-11 sm:h-11 rounded-full object-cover border border-gold/40"
                />
                <div>
                  <h4 className="font-syne font-bold text-white text-sm">{t.name}</h4>
                  <p className="text-[11px] text-cream-muted font-space">{t.location}</p>
                </div>
              </div>
            </div>
          ))}
        </MotionSection>
      </section>

      {/* 8. Futuristic Trust Bar */}
      <MotionSection className="border-y border-gold/20 bg-[#06060c] py-8 sm:py-10">
        <div className="section-pad grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-gold/10 border border-gold/30 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5 sm:w-6 sm:h-6 text-gold-bright" />
            </div>
            <div>
              <div className="font-syne font-bold text-xs sm:text-sm text-white">100% Genuine</div>
              <div className="text-[10px] sm:text-xs text-cream-muted font-space">Authentic Hologram Seals</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-gold/10 border border-gold/30 flex items-center justify-center shrink-0">
              <Truck className="w-5 h-5 sm:w-6 sm:h-6 text-gold-bright" />
            </div>
            <div>
              <div className="font-syne font-bold text-xs sm:text-sm text-white">Fast Nationwide</div>
              <div className="text-[10px] sm:text-xs text-cream-muted font-space">Safe Courier Delivery</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-gold/10 border border-gold/30 flex items-center justify-center shrink-0">
              <Zap className="w-5 h-5 sm:w-6 sm:h-6 text-gold-bright" />
            </div>
            <div>
              <div className="font-syne font-bold text-xs sm:text-sm text-white">Beast Sillage</div>
              <div className="text-[10px] sm:text-xs text-cream-muted font-space">14–24hr Tested Projection</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-gold/10 border border-gold/30 flex items-center justify-center shrink-0">
              <Award className="w-5 h-5 sm:w-6 sm:h-6 text-gold-bright" />
            </div>
            <div>
              <div className="font-syne font-bold text-xs sm:text-sm text-white">VIP Concierge</div>
              <div className="text-[10px] sm:text-xs text-cream-muted font-space">Direct Scent Consulting</div>
            </div>
          </div>
        </div>
      </MotionSection>

      {/* 9. Newsletter */}
      <Newsletter />
    </div>
  )
}
