import { Link } from 'react-router-dom'
import {
  Sparkles,
  ShieldCheck,
  Award,
  HeartHandshake,
  ArrowRight,
  Compass,
  MessageCircle,
} from 'lucide-react'
import MotionSection from '../components/common/MotionSection'

const pillars = [
  {
    icon: ShieldCheck,
    title: 'Fragrances for Every Style',
    desc: 'Explore scents for everyday moments, special occasions, and everything in between.',
  },
  {
    icon: Compass,
    title: 'Find Your Signature',
    desc: 'Discover fragrance profiles that complement your taste, mood, and personality.',
  },
  {
    icon: Award,
    title: 'A Thoughtful Shopping Experience',
    desc: 'Enjoy a simple, curated, and convenient way to explore and shop authentic fragrances.',
  },
  {
    icon: HeartHandshake,
    title: 'Customer Care You Can Reach',
    desc: 'Get personal assistance with product selection, orders, and delivery questions.',
  },
]

export default function AboutPage() {
  return (
    <div className="bg-[#FAF6EF] min-h-screen pb-20">
      
      {/* ── Hero Banner ── */}
      <section className="relative bg-[#211713] text-[#FAF6EF] py-20 sm:py-28 overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-20">
          <img
            src="https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=1600&q=85"
            alt="Background scent"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#211713]/70 to-[#211713]" />
        </div>

        <div className="relative z-10 section-pad text-center max-w-3xl mx-auto space-y-5">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FAF6EF]/10 border border-[#C7A66A]/40 text-[#C7A66A] text-xs font-semibold tracking-[0.2em] uppercase">
            <Sparkles className="w-3.5 h-3.5" />
            OUR STORY &amp; PHILOSOPHY
          </div>

          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-[#FAF6EF] leading-tight">
            About Mama Fragrance
          </h1>

          <p className="font-serif italic text-lg sm:text-xl text-[#C7A66A]">
            "Smell as good as you look."
          </p>
        </div>
      </section>

      {/* ── Brand Mission Story ── */}
      <section className="section-pad py-16 sm:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <MotionSection className="lg:col-span-6 space-y-5">
            <span className="text-xs uppercase font-bold tracking-[0.2em] text-[#C7A66A]">
              MORE THAN A FRAGRANCE
            </span>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#211713] leading-tight">
              More Than a Fragrance. It's Your Signature.
            </h2>

            <p className="text-sm sm:text-base text-[#393431] leading-relaxed font-light">
              At Mama Fragrance, we believe the right scent can complete your look, elevate your confidence, and make ordinary moments memorable. Our goal is to help you discover fragrances that reflect your personality and leave an impression long after you've left the room.
            </p>

            <p className="text-sm text-[#393431] leading-relaxed font-light">
              Whether you are dressing for a board meeting, a celebration, or simply your everyday life — your fragrance is your final, most powerful accessory. We are here to help you choose it well.
            </p>

            <p className="font-serif italic text-base text-[#C7A66A] font-semibold">
              "When your outfit is a 10, your scent should be an 11."
            </p>

            <div className="pt-2">
              <Link
                to="/shop"
                className="btn-espresso px-8 py-3.5 text-xs font-bold rounded inline-flex items-center gap-2"
              >
                <span>Explore the Collection</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </MotionSection>

          <MotionSection delay={0.15} className="lg:col-span-6">
            <div className="relative rounded-2xl overflow-hidden aspect-[4/5] shadow-luxury-lg border border-[#E9DED0]">
              <img
                src="/images/products/soiree-cloud-candy.jpg"
                alt="Mama Fragrance Layering Duo — Soirée & Cloud Candy"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#211713]/80 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 bg-white/10 backdrop-blur-md border border-[#C7A66A]/40 rounded-xl p-4 text-center">
                <span className="font-serif italic text-[#C7A66A] font-semibold text-sm">
                  "Smell as good as you look."
                </span>
                <p className="text-[#FAF6EF] text-[10px] mt-0.5">— Mama Fragrance</p>
              </div>
            </div>
          </MotionSection>
        </div>
      </section>

      {/* ── 4 Brand Pillars ── */}
      <section id="why" className="py-14 sm:py-20 bg-[#FCFAF6] border-y border-[#E9DED0]">
        <div className="section-pad">
          <MotionSection className="text-center max-w-2xl mx-auto mb-10 sm:mb-12">
            <span className="text-xs uppercase font-bold tracking-[0.2em] text-[#C7A66A] block mb-2">
              WHY MAMA FRAGRANCE
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#211713]">
              A Shopping Experience Built Around You
            </h2>
          </MotionSection>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {pillars.map((item, idx) => {
              const Icon = item.icon
              return (
                <MotionSection
                  key={item.title}
                  delay={idx * 0.08}
                  className="bg-white p-6 rounded-xl border border-[#E9DED0] shadow-sm hover:shadow-luxury hover:border-[#C7A66A]/60 transition-all flex flex-col items-start gap-4"
                >
                  <div className="w-11 h-11 rounded-lg bg-[#FAF6EF] border border-[#E9DED0] flex items-center justify-center text-[#C7A66A]">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-serif font-bold text-base text-[#211713] mb-1">
                      {item.title}
                    </h3>
                    <p className="text-xs text-[#7A726C] leading-relaxed">{item.desc}</p>
                  </div>
                </MotionSection>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── Nigeria-First Commitment ── */}
      <section className="section-pad py-16 sm:py-24">
        <MotionSection className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div className="relative rounded-2xl overflow-hidden aspect-video shadow-luxury border border-[#E9DED0]">
            <img
              src="https://images.unsplash.com/photo-1523293182086-7651a899d37f?w=1200&q=85"
              alt="Luxury editorial fragrance bottles"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="space-y-5">
            <span className="text-xs uppercase font-bold tracking-[0.2em] text-[#C7A66A]">
              DELIVERING NATIONWIDE
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#211713]">
              Built for Fragrance Lovers Across Nigeria
            </h2>
            <p className="text-sm text-[#393431] leading-relaxed font-light">
              From Lagos Island to Abuja, Port Harcourt to Kano — we dispatch authentic, sealed fragrance flacons via verified nationwide courier partners. Your order arrives safely packaged, on time, every time.
            </p>

            <div className="grid grid-cols-2 gap-4 text-xs">
              <div className="p-4 bg-[#FCFAF6] rounded-xl border border-[#E9DED0]">
                <p className="font-bold text-xl text-[#211713] mb-0.5">1–2 Days</p>
                <p className="text-[#7A726C]">Lagos Standard Delivery</p>
              </div>
              <div className="p-4 bg-[#FCFAF6] rounded-xl border border-[#E9DED0]">
                <p className="font-bold text-xl text-[#211713] mb-0.5">2–4 Days</p>
                <p className="text-[#7A726C]">Interstate Nationwide Delivery</p>
              </div>
            </div>

            <Link
              to="/shop"
              className="btn-champagne px-8 py-3.5 text-xs font-bold rounded inline-flex items-center gap-2"
            >
              <span>DISCOVER MAMA FRAGRANCE</span>
            </Link>
          </div>
        </MotionSection>
      </section>

      {/* ── Contact CTA Strip ── */}
      <section className="py-14 bg-[#211713] text-[#FAF6EF]">
        <div className="section-pad flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold mb-1">
              Have questions about a fragrance?
            </h3>
            <p className="text-sm text-[#E9DED0]/80 font-light">
              Our fragrance concierge is available via WhatsApp, Instagram, or email.
            </p>
          </div>

          <div className="flex gap-3 shrink-0">
            <Link
              to="/contact"
              className="btn-champagne px-6 py-3 text-xs font-bold rounded"
            >
              Contact Us
            </Link>
            <a
              href="https://wa.me/2348120000000"
              target="_blank"
              rel="noreferrer"
              className="btn-outline-gold px-6 py-3 text-xs font-bold rounded flex items-center gap-2"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
