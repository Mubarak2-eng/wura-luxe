import { Link } from 'react-router-dom'
import { Sparkles, ShieldCheck, Award, HeartHandshake, Eye, ArrowRight, Star } from 'lucide-react'
import { motion } from 'framer-motion'

export default function AboutPage() {
  return (
    <div className="section-pad py-16">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-20">
        <div className="cyber-badge mb-3">
          <Sparkles className="w-3.5 h-3.5 text-gold-bright" />
          <span>OUR ESSENCE</span>
        </div>
        <h1 className="font-syne text-5xl sm:text-6xl lg:text-7xl font-black text-white mb-3">
          About <span className="text-liquid-gold">Mama Fragrance</span>
        </h1>
        <p className="font-cinzel text-gold-light italic text-2xl font-bold">
          "Smell as good as you look!"
        </p>
      </div>

      {/* Hero Story Banner */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-24">
        <div className="lg:col-span-6">
          <h2 className="font-syne text-3xl sm:text-4xl font-black text-white mb-6 leading-tight">
            The Philosophy of <br />
            <span className="text-liquid-gold">Unforgettable Presence</span>
          </h2>

          <p className="text-cream-soft text-base leading-relaxed mb-6 font-light">
            Founded with a singular passion for high-impact olfactory luxury, <strong>Mama Fragrance</strong> has grown into the premier destination for fragrance connoisseurs across Nigeria and beyond.
          </p>
          <p className="text-cream-muted text-base leading-relaxed mb-6 font-light">
            We believe you should never leave your house with an ordinary scent trail. Whether you are dressing in formal velvet, pristine linen, or your finest native wear, your fragrance is your final, most powerful accessory.
          </p>
          <p className="font-cinzel text-gold-bright text-lg italic font-semibold mb-8">
            "When your outfit is a 10/10, your sillage must be an 11/10."
          </p>

          <Link
            to="/shop"
            className="btn-futuristic inline-flex items-center gap-2 px-8 py-4 rounded-xl text-xs font-bold"
          >
            <span>Explore The Collection</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="lg:col-span-6">
          <div className="relative aspect-square rounded-3xl overflow-hidden glass-panel p-2 border border-gold/30 shadow-2xl">
            <img
              src="/images/products/soiree-cloud-candy.jpg"
              alt="Mama Fragrance Layering Duo"
              className="w-full h-full object-cover rounded-2xl"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 glass-panel p-4 rounded-xl border border-gold/40 text-center">
              <span className="font-cinzel text-gold-bright font-bold">"Smell as good as you look!"</span>
            </div>
          </div>
        </div>
      </div>

      {/* 4 Pillars of Excellence */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-24">
        {[
          {
            icon: ShieldCheck,
            title: '100% Authentic Stock',
            desc: 'Every flacon is sourced directly with original holographic seals and barcodes.',
          },
          {
            icon: Award,
            title: 'Beast-Mode Projection',
            desc: 'We only stock formulations proven to project for 12 to 24+ hours on fabrics and skin.',
          },
          {
            icon: Sparkles,
            title: 'Viral Layering Combos',
            desc: 'Curated pairings tested to generate non-stop compliments wherever you walk.',
          },
          {
            icon: HeartHandshake,
            title: 'Direct WhatsApp Concierge',
            desc: 'Real human advice from seasoned scent experts ready to match your vibe.',
          },
        ].map((item, idx) => (
          <div
            key={idx}
            className="glass-panel p-6 rounded-3xl border border-white/10 hover:border-gold/40 transition-all"
          >
            <item.icon className="w-8 h-8 text-gold-bright mb-4" />
            <h3 className="font-syne text-lg font-bold text-white mb-2">{item.title}</h3>
            <p className="text-xs text-cream-muted leading-relaxed font-light">{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
