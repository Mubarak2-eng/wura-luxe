import { Link } from 'react-router-dom'
import { Instagram, Twitter, Facebook, Mail, MapPin, Phone } from 'lucide-react'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer style={{ background: '#060606', borderTop: '1px solid rgba(201,168,76,0.15)' }}>
      {/* Top gold line */}
      <div className="h-px w-full" style={{ background: 'linear-gradient(90deg, transparent, #c9a84c60, transparent)' }} />

      {/* Main footer */}
      <div className="section-pad py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        {/* Brand */}
        <div className="lg:col-span-1">
          <Link to="/" className="flex flex-col mb-5">
            <span className="font-playfair text-2xl font-bold gold-text">Wura Luxe</span>
            <span className="text-[10px] tracking-[0.35em] text-cream-muted uppercase">&amp; Scents</span>
          </Link>
          <p className="text-sm text-cream-muted leading-relaxed mb-6">
            Crafting extraordinary fragrances for the discerning soul. Every bottle tells a story of luxury, culture and artistry.
          </p>
          <div className="flex items-center gap-3">
            {[
              { Icon: Instagram, href: 'https://instagram.com' },
              { Icon: Facebook, href: 'https://facebook.com' },
              { Icon: Twitter, href: 'https://twitter.com' },
            ].map(({ Icon, href }) => (
              <a
                key={href}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 flex items-center justify-center border border-dark-border text-cream-muted hover:text-gold hover:border-gold transition-all duration-300"
                style={{ background: 'rgba(201,168,76,0)' }}
                onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(201,168,76,0.08)'; e.currentTarget.style.boxShadow = '0 0 15px rgba(201,168,76,0.15)' }}
                onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(201,168,76,0)'; e.currentTarget.style.boxShadow = 'none' }}
              >
                <Icon className="w-4 h-4" />
              </a>
            ))}
          </div>
        </div>

        {/* Shop */}
        <div>
          <h4 className="font-playfair text-cream text-lg mb-5">Shop</h4>
          <ul className="flex flex-col gap-3">
            {[
              { label: 'All Products', to: '/shop' },
              { label: 'Eau de Parfum', to: '/shop?category=edp' },
              { label: 'Perfume Oils', to: '/shop?category=oil' },
              { label: 'Body Mists', to: '/shop?category=mist' },
              { label: 'Candles', to: '/shop?category=candle' },
              { label: 'Gift Sets', to: '/shop?category=gift' },
            ].map(({ label, to }) => (
              <li key={label}>
                <Link to={to} className="text-sm text-cream-muted hover:text-gold transition-colors duration-300 flex items-center gap-2 group">
                  <span className="w-3 h-px bg-gold/0 group-hover:bg-gold/60 transition-all duration-300" />
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Company */}
        <div>
          <h4 className="font-playfair text-cream text-lg mb-5">Company</h4>
          <ul className="flex flex-col gap-3">
            {[
              { label: 'About Us', to: '/about' },
              { label: 'Our Story', to: '/about#story' },
              { label: 'Lookbook', to: '/gallery' },
              { label: 'Contact Us', to: '/contact' },
            ].map(({ label, to }) => (
              <li key={label}>
                <Link to={to} className="text-sm text-cream-muted hover:text-gold transition-colors duration-300 flex items-center gap-2 group">
                  <span className="w-3 h-px bg-gold/0 group-hover:bg-gold/60 transition-all duration-300" />
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="font-playfair text-cream text-lg mb-5">Get In Touch</h4>
          <ul className="flex flex-col gap-4">
            {[
              { Icon: MapPin, value: 'Lagos, Nigeria' },
              { Icon: Phone, value: '+234 800 000 0000', href: 'tel:+2348000000000' },
              { Icon: Mail, value: 'hello@wuraluxe.com', href: 'mailto:hello@wuraluxe.com' },
            ].map(({ Icon, value, href }) => (
              <li key={value} className="flex items-start gap-3">
                <div
                  className="w-8 h-8 flex items-center justify-center border border-gold/20 shrink-0"
                  style={{ background: 'rgba(201,168,76,0.06)' }}
                >
                  <Icon className="w-3.5 h-3.5 text-gold" />
                </div>
                {href ? (
                  <a href={href} className="text-sm text-cream-muted hover:text-gold transition-colors mt-1.5">{value}</a>
                ) : (
                  <span className="text-sm text-cream-muted mt-1.5">{value}</span>
                )}
              </li>
            ))}
          </ul>
          <div className="mt-6 pt-5 border-t border-dark-border">
            <p className="text-xs text-cream-muted">
              <span className="text-gold">Hours:</span> Mon–Sat, 9am–6pm WAT
            </p>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div
        className="border-t section-pad py-5 flex flex-col sm:flex-row items-center justify-between gap-3"
        style={{ borderColor: 'rgba(201,168,76,0.1)' }}
      >
        <p className="text-xs text-cream-muted">
          © {currentYear} Wura Luxe &amp; Scents. All rights reserved.
        </p>
        <div className="flex items-center gap-5">
          {['Privacy Policy', 'Terms of Service', 'Shipping Policy'].map((item) => (
            <a key={item} href="#" className="text-xs text-cream-muted hover:text-gold transition-colors">
              {item}
            </a>
          ))}
        </div>
      </div>
    </footer>
  )
}
