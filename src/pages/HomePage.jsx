import HeroBanner from '../components/home/HeroBanner'
import FeaturedCollections from '../components/home/FeaturedCollections'
import BestSellers from '../components/home/BestSellers'
import OurStory from '../components/home/OurStory'
import Newsletter from '../components/home/Newsletter'

const testimonials = [
  {
    name: 'Adaeze O.',
    location: 'Lagos',
    text: 'Wura Gold is absolutely divine! The longevity is incredible — I still get compliments at the end of the day. Worth every kobo!',
    rating: 5,
    img: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=100&q=80',
  },
  {
    name: 'Chidinma E.',
    location: 'Abuja',
    text: "The Black Oud Attar is unlike anything I've ever worn. Rich, deep and so unique. I ordered three bottles to stock up!",
    rating: 5,
    img: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&q=80',
  },
  {
    name: 'Toluwalope A.',
    location: 'Port Harcourt',
    text: "The Luxury Gift Set was a birthday gift for my sister and she hasn't stopped raving. The packaging alone is stunning.",
    rating: 5,
    img: 'https://images.unsplash.com/photo-1607746882042-944635dfe10e?w=100&q=80',
  },
]

export default function HomePage() {
  return (
    <>
      <HeroBanner />
      <FeaturedCollections />
      <BestSellers />
      <OurStory />

      {/* Testimonials */}
      <section className="section-pad py-24" style={{ background: '#0a0a0a' }}>
        <div className="text-center mb-16">
          <span className="eyebrow">What Our Clients Say</span>
          <h2 className="font-playfair text-5xl text-cream mt-4 mb-5">
            Loved <span className="gold-text italic">Worldwide</span>
          </h2>
          <div className="gold-divider" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="p-7 flex flex-col gap-5 transition-all duration-500"
              style={{
                background: 'linear-gradient(145deg, #161616, #111)',
                border: '1px solid rgba(201,168,76,0.12)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'rgba(201,168,76,0.35)'
                e.currentTarget.style.boxShadow = '0 12px 40px rgba(0,0,0,0.5), 0 0 0 1px rgba(201,168,76,0.1)'
                e.currentTarget.style.transform = 'translateY(-4px)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(201,168,76,0.12)'
                e.currentTarget.style.boxShadow = 'none'
                e.currentTarget.style.transform = 'translateY(0)'
              }}
            >
              {/* Stars */}
              <div className="flex gap-1">
                {Array.from({ length: t.rating }).map((_, j) => (
                  <span key={j} className="text-gold text-base">★</span>
                ))}
              </div>
              {/* Quote mark */}
              <div className="font-playfair text-5xl text-gold/20 leading-none -mt-2">"</div>
              <p className="text-cream-soft text-sm leading-relaxed -mt-4">
                {t.text}
              </p>
              <div className="mt-auto pt-5 border-t border-dark-border flex items-center gap-3">
                <img src={t.img} alt={t.name} className="w-10 h-10 rounded-full object-cover border border-gold/20" />
                <div>
                  <p className="text-cream font-medium text-sm">{t.name}</p>
                  <p className="text-cream-muted text-xs">{t.location}, Nigeria</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Brand promise strip */}
      <section
        className="section-pad py-12"
        style={{
          background: 'linear-gradient(135deg, #0e0b05, #0a0a0a, #0e0b05)',
          borderTop: '1px solid rgba(201,168,76,0.12)',
          borderBottom: '1px solid rgba(201,168,76,0.12)',
        }}
      >
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
          {[
            { icon: '🌿', title: 'Premium Ingredients', desc: 'Sourced globally' },
            { icon: '✈️', title: 'Nationwide Delivery', desc: 'All across Nigeria' },
            { icon: '🎁', title: 'Luxury Packaging', desc: 'Gift-ready always' },
            { icon: '💬', title: 'WhatsApp Support', desc: 'Available 7 days' },
          ].map(({ icon, title, desc }) => (
            <div key={title} className="flex flex-col items-center text-center gap-3">
              <span className="text-3xl">{icon}</span>
              <div>
                <p className="text-cream font-medium text-sm">{title}</p>
                <p className="text-cream-muted text-xs mt-0.5">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <Newsletter />
    </>
  )
}
