import { Link } from 'react-router-dom'
import Button from '../components/ui/Button'

const team = [
  {
    name: 'Wura Adeyemi',
    role: 'Founder & Master Perfumer',
    image:
      'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400&q=80',
    bio: 'With over a decade of experience in luxury fragrance, Wura founded Wura Luxe & Scents to celebrate African elegance on the world stage.',
  },
  {
    name: 'Tunde Bakare',
    role: 'Head of Sourcing',
    image:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80',
    bio: 'Tunde travels the world to source only the finest ingredients — from the oud forests of Southeast Asia to the rose valleys of Bulgaria.',
  },
  {
    name: 'Amaka Chukwu',
    role: 'Brand & Creative Director',
    image:
      'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&q=80',
    bio: 'Amaka crafts every visual identity and brand story, ensuring Wura Luxe communicates luxury, culture and authenticity in every touchpoint.',
  },
]

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative h-64 lg:h-96 flex items-end">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1547994770-2f49e28e4a4c?w=1400&q=80')",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/60 to-dark/20" />
        <div className="relative section-pad pb-12">
          <p className="text-gold text-xs tracking-[0.4em] uppercase mb-3">
            Who We Are
          </p>
          <h1 className="font-playfair text-5xl lg:text-6xl text-cream">
            About Us
          </h1>
        </div>
      </section>

      {/* Story */}
      <section id="story" className="section-pad py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center max-w-6xl mx-auto">
          <div>
            <p className="text-gold text-xs tracking-[0.4em] uppercase mb-4">
              Our Story
            </p>
            <h2 className="font-playfair text-4xl text-cream mb-6 leading-tight">
              Born from a Love of
              <br />
              <span className="italic text-gold">Scent & Culture</span>
            </h2>
            <p className="text-cream-muted leading-relaxed mb-5">
              Wura Luxe & Scents was born in Lagos, Nigeria, from a simple but
              powerful belief: that luxury fragrance should celebrate African
              identity. Our founder, Wura Adeyemi, grew up surrounded by the
              rich aromatic traditions of West Africa — incense at family
              gatherings, floral perfumes passed down through generations.
            </p>
            <p className="text-cream-muted leading-relaxed mb-5">
              After studying perfumery in Grasse, France and working with some
              of the world's finest fragrance houses, she returned home with one
              mission: to create a brand that merges African heritage with global
              luxury standards.
            </p>
            <p className="text-cream-muted leading-relaxed mb-8">
              Today, Wura Luxe & Scents is a celebration of that vision — every
              bottle handcrafted with love, every scent a story of heritage,
              artistry and gold-standard excellence.
            </p>
            <Button as={Link} to="/shop" variant="outline">
              Shop the Collection
            </Button>
          </div>
          <div className="relative">
            <div
              className="w-full h-96 lg:h-[500px] bg-cover bg-center"
              style={{
                backgroundImage:
                  "url('https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=800&q=80')",
              }}
            />
            <div className="absolute -bottom-6 -right-6 hidden lg:block w-48 h-48 border border-gold/20 -z-10" />
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section-pad py-16 bg-dark-secondary">
        <div className="text-center mb-14">
          <h2 className="font-playfair text-4xl text-cream mb-4">Our Values</h2>
          <div className="gold-divider" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-5xl mx-auto">
          {[
            {
              icon: '🌿',
              title: 'Authenticity',
              desc: 'Every fragrance is rooted in real culture and genuine artisanship.',
            },
            {
              icon: '⭐',
              title: 'Excellence',
              desc: 'We settle for nothing less than the finest ingredients and craftsmanship.',
            },
            {
              icon: '🌍',
              title: 'Heritage',
              desc: 'We celebrate African identity and bring it to the global stage.',
            },
            {
              icon: '💛',
              title: 'Community',
              desc: 'Our clients are family — we build relationships, not just transactions.',
            },
          ].map(({ icon, title, desc }) => (
            <div
              key={title}
              className="luxury-card p-7 text-center flex flex-col items-center gap-4"
            >
              <span className="text-4xl">{icon}</span>
              <h3 className="font-playfair text-cream text-xl">{title}</h3>
              <p className="text-cream-muted text-sm leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Team */}
      <section className="section-pad py-20">
        <div className="text-center mb-14">
          <p className="text-gold text-xs tracking-[0.4em] uppercase mb-3">
            The People Behind the Scent
          </p>
          <h2 className="font-playfair text-4xl text-cream mb-4">
            Meet the Team
          </h2>
          <div className="gold-divider" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {team.map((member) => (
            <div key={member.name} className="luxury-card overflow-hidden group">
              <div className="aspect-[4/5] overflow-hidden">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="p-6">
                <h3 className="font-playfair text-xl text-cream">{member.name}</h3>
                <p className="text-gold text-xs tracking-wider uppercase mt-1 mb-3">
                  {member.role}
                </p>
                <p className="text-cream-muted text-sm leading-relaxed">
                  {member.bio}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="section-pad py-16 bg-dark-secondary text-center">
        <h2 className="font-playfair text-4xl text-cream mb-4">
          Experience the Collection
        </h2>
        <p className="text-cream-muted mb-8 max-w-md mx-auto">
          Every fragrance tells a story. Discover yours today.
        </p>
        <Button as={Link} to="/shop" size="lg">
          Shop Now
        </Button>
      </section>
    </>
  )
}
