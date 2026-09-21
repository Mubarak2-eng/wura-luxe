import { Link } from 'react-router-dom'

export default function HeroBanner() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-105"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1541643600914-78b084683702?w=1800&q=90')",
        }}
      />
      {/* Multi-layer overlays for depth */}
      <div className="absolute inset-0 bg-gradient-to-r from-dark via-dark/80 to-dark/20" />
      <div className="absolute inset-0 bg-gradient-to-t from-dark via-transparent to-dark/40" />
      {/* Gold vignette top */}
      <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-dark to-transparent" />

      {/* Floating gold orb */}
      <div
        className="absolute right-[15%] top-1/3 w-72 h-72 rounded-full opacity-10 blur-3xl animate-pulse-gold pointer-events-none"
        style={{ background: 'radial-gradient(circle, #c9a84c, transparent)' }}
      />

      {/* Content */}
      <div className="relative section-pad max-w-3xl py-28 animate-fade-in">
        {/* Eyebrow */}
        <div className="flex items-center gap-4 mb-8">
          <div className="w-8 h-px bg-gold" />
          <span className="eyebrow">Premium Fragrances • Est. 2019</span>
          <div className="w-8 h-px bg-gold" />
        </div>

        {/* Main headline */}
        <h1 className="font-playfair font-bold leading-[1.05] mb-8">
          <span className="block text-cream text-6xl sm:text-7xl lg:text-8xl">Wear Your</span>
          <span className="block text-6xl sm:text-7xl lg:text-8xl gold-text italic mt-1">
            Signature
          </span>
          <span className="block text-cream text-6xl sm:text-7xl lg:text-8xl">Scent</span>
        </h1>

        {/* Subheadline */}
        <p className="text-cream-soft text-lg lg:text-xl leading-relaxed mb-12 max-w-xl">
          Handcrafted luxury fragrances rooted in African heritage — from rich
          Middle Eastern ouds to rare florals from across the continent.
        </p>

        {/* CTAs */}
        <div className="flex flex-wrap gap-4">
          <Link
            to="/shop"
            className="group inline-flex items-center gap-3 px-9 py-4 btn-gold-glow font-semibold text-sm tracking-widest uppercase text-dark"
            style={{ background: 'linear-gradient(135deg, #c9a84c 0%, #e8c97a 50%, #c9a84c 100%)' }}
          >
            Explore Collection
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </Link>
          <Link
            to="/about"
            className="inline-flex items-center gap-3 px-9 py-4 border border-cream/20 text-cream text-sm tracking-widest uppercase hover:border-gold hover:text-gold transition-all duration-300"
          >
            Our Story
          </Link>
        </div>

        {/* Stats */}
        <div className="flex gap-10 mt-16 pt-10 border-t border-white/5">
          {[
            { value: '20+', label: 'Unique Fragrances' },
            { value: '500+', label: 'Happy Clients' },
            { value: '5★', label: 'Average Rating' },
          ].map(({ value, label }) => (
            <div key={label}>
              <p className="font-playfair text-3xl gold-text font-bold">{value}</p>
              <p className="text-xs text-cream-muted tracking-widest uppercase mt-1.5">{label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Right side product float */}
      <div className="absolute right-8 lg:right-16 bottom-24 hidden lg:flex flex-col gap-4 items-end">
        {[
          { label: 'Oud Royale', sub: 'Eau de Parfum', img: 'https://images.unsplash.com/photo-1523293182086-7651a899d37f?w=200&q=80' },
          { label: 'Wura Gold', sub: 'Signature', img: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=200&q=80' },
        ].map((p) => (
          <Link
            key={p.label}
            to="/shop"
            className="flex items-center gap-3 bg-dark-card/70 backdrop-blur-md border border-dark-border px-4 py-3 hover:border-gold/50 transition-all duration-300 hover:-translate-x-1 group"
          >
            <img src={p.img} alt={p.label} className="w-10 h-12 object-cover" />
            <div className="text-right">
              <p className="text-cream text-sm font-medium group-hover:text-gold transition-colors">{p.label}</p>
              <p className="text-cream-muted text-xs">{p.sub}</p>
            </div>
          </Link>
        ))}
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <span className="text-xs text-cream-muted tracking-widest uppercase">Scroll</span>
        <div className="w-px h-12 bg-gradient-to-b from-gold/60 to-transparent animate-pulse" />
      </div>
    </section>
  )
}
