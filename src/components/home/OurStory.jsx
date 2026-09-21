import { Link } from 'react-router-dom'

export default function OurStory() {
  return (
    <section className="section-pad py-24 radiant-bg overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        {/* Image collage */}
        <div className="relative h-[500px] lg:h-[600px]">
          {/* Main image */}
          <div
            className="absolute left-0 top-0 w-4/5 h-4/5 bg-cover bg-center"
            style={{
              backgroundImage: "url('https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=800&q=85')",
            }}
          />
          {/* Accent image */}
          <div
            className="absolute right-0 bottom-0 w-2/3 h-2/3 bg-cover bg-center border-4 border-dark"
            style={{
              backgroundImage: "url('https://images.unsplash.com/photo-1523293182086-7651a899d37f?w=600&q=85')",
            }}
          />
          {/* Gold frame accent */}
          <div
            className="absolute left-4 top-4 w-4/5 h-4/5 border border-gold/20 pointer-events-none"
            style={{ transform: 'translate(12px, 12px)' }}
          />
          {/* Floating badge */}
          <div
            className="absolute bottom-[32%] left-[48%] -translate-x-1/2 bg-dark-card/90 backdrop-blur-sm border border-gold/30 px-6 py-4 text-center"
            style={{ boxShadow: '0 0 30px rgba(201,168,76,0.15)' }}
          >
            <p className="font-playfair text-4xl gold-text font-bold">5+</p>
            <p className="text-xs text-cream-muted tracking-widest uppercase mt-1">Years of Craft</p>
          </div>
        </div>

        {/* Text */}
        <div className="animate-fade-in">
          <span className="eyebrow">Our Heritage</span>
          <h2 className="font-playfair text-5xl lg:text-6xl text-cream mt-5 mb-6 leading-tight">
            Rooted in Culture,
            <br />
            <span className="gold-text italic">Crafted in Luxury</span>
          </h2>
          <p className="text-cream-soft leading-relaxed mb-5 text-base">
            Wura Luxe & Scents was born from a deep love of fragrance and a
            desire to celebrate African elegance on the world stage. The name
            "Wura" — Yoruba for gold — reflects our commitment to excellence in
            everything we do.
          </p>
          <p className="text-cream-muted leading-relaxed mb-10 text-base">
            From the ancient attar traditions of the Middle East to the vibrant
            florals of West Africa, every fragrance in our collection is a story
            waiting to be worn.
          </p>

          {/* Values */}
          <div className="grid grid-cols-2 gap-5 mb-10">
            {[
              { title: 'Authentic', desc: 'Rooted in real culture & heritage' },
              { title: 'Premium', desc: 'Finest global raw ingredients' },
              { title: 'Artisan', desc: 'Small-batch, handcrafted quality' },
              { title: 'Lasting', desc: 'Fragrances that stay with you' },
            ].map(({ title, desc }) => (
              <div key={title} className="flex items-start gap-3">
                <div
                  className="w-0.5 h-10 shrink-0 mt-1"
                  style={{ background: 'linear-gradient(to bottom, #c9a84c, transparent)' }}
                />
                <div>
                  <p className="text-cream font-semibold text-sm">{title}</p>
                  <p className="text-cream-muted text-xs mt-0.5">{desc}</p>
                </div>
              </div>
            ))}
          </div>

          <Link
            to="/about"
            className="group inline-flex items-center gap-3 text-sm text-gold border border-gold/40 px-8 py-4 hover:bg-gold hover:text-dark hover:border-gold transition-all duration-300 tracking-widest uppercase"
          >
            Read Our Full Story
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </Link>
        </div>
      </div>
    </section>
  )
}
