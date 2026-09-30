import { Link } from 'react-router-dom'
import { Instagram, Twitter, Facebook, Mail, MapPin, Phone, Sparkles, MessageCircle } from 'lucide-react'
import { whatsAppChatLink } from '../../utils/whatsapp'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="relative bg-[#020204] border-t border-gold/20 pt-20 pb-12 overflow-hidden text-cream-soft">
      {/* Background ambient lighting */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-gold-bright to-transparent shadow-[0_0_20px_#ffd700]" />
      
      <div className="section-pad grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16 relative z-10">
        
        {/* Brand Column */}
        <div className="lg:col-span-2 flex flex-col items-start">
          <Link to="/" className="flex items-center gap-3 group mb-4">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-gold-bright to-gold-dark p-[1px]">
              <div className="w-full h-full bg-[#07070b] rounded-[11px] flex items-center justify-center">
                <span className="font-cinzel text-lg font-black text-gold-bright">M</span>
              </div>
            </div>
            <div className="flex flex-col">
              <span className="font-syne text-xl font-black text-white tracking-tight">
                MAMA <span className="text-liquid-gold">FRAGRANCE</span>
              </span>
              <span className="text-[9px] tracking-[0.3em] text-gold/80 uppercase font-space">
                Smell as good as you look!
              </span>
            </div>
          </Link>

          <p className="text-sm text-cream-muted leading-relaxed max-w-sm mb-6 font-light">
            Curating rare Arabian flacons, French niche extraits, and viral fragrance layering combinations with verified authenticity and beast-mode longevity.
          </p>

          <div className="flex items-center gap-3">
            {[
              { icon: Instagram, href: 'https://instagram.com' },
              { icon: Facebook, href: 'https://facebook.com' },
              { icon: Twitter, href: 'https://twitter.com' },
            ].map(({ icon: Icon, href }, i) => (
              <a
                key={i}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-white/[0.03] border border-white/10 flex items-center justify-center text-cream-soft hover:text-gold-bright hover:border-gold/40 hover:bg-gold/10 transition-all"
              >
                <Icon className="w-4 h-4" />
              </a>
            ))}
            <a
              href={whatsAppChatLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2.5 rounded-xl bg-[#25D366]/15 border border-[#25D366]/40 text-[#25D366] text-xs font-bold font-space flex items-center gap-2 hover:bg-[#25D366] hover:text-black transition-all"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>WhatsApp VIP</span>
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="font-syne text-sm font-extrabold tracking-widest uppercase text-white mb-5">
            The Vault
          </h4>
          <ul className="flex flex-col gap-3 text-xs font-medium text-cream-muted">
            <li>
              <Link to="/shop" className="hover:text-gold-bright transition-colors">
                All Fragrances (20+)
              </Link>
            </li>
            <li>
              <Link to="/shop?category=edp" className="hover:text-gold-bright transition-colors">
                Eau de Parfum Flacons
              </Link>
            </li>
            <li>
              <Link to="/shop?category=gift" className="hover:text-gold-bright transition-colors">
                Viral Layering Duos
              </Link>
            </li>
            <li>
              <Link to="/shop?category=oil" className="hover:text-gold-bright transition-colors">
                Concentrated Attars
              </Link>
            </li>
            <li>
              <Link to="/shop?category=mist" className="hover:text-gold-bright transition-colors">
                Fine Body Mists
              </Link>
            </li>
          </ul>
        </div>

        {/* Brand & Story */}
        <div>
          <h4 className="font-syne text-sm font-extrabold tracking-widest uppercase text-white mb-5">
            Discovery
          </h4>
          <ul className="flex flex-col gap-3 text-xs font-medium text-cream-muted">
            <li>
              <Link to="/gallery" className="hover:text-gold-bright transition-colors">
                Real Stock Lookbook
              </Link>
            </li>
            <li>
              <Link to="/about" className="hover:text-gold-bright transition-colors">
                About Mama Fragrance
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-gold-bright transition-colors">
                Contact VIP Concierge
              </Link>
            </li>
            <li>
              <Link to="/account/wishlist" className="hover:text-gold-bright transition-colors">
                Saved Scent Vault
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h4 className="font-syne text-sm font-extrabold tracking-widest uppercase text-white mb-5">
            Direct Concierge
          </h4>
          <ul className="flex flex-col gap-3.5 text-xs text-cream-muted">
            <li className="flex items-start gap-2.5">
              <MapPin className="w-4 h-4 text-gold-bright shrink-0 mt-0.5" />
              <span>Lagos & Nationwide Delivery, Nigeria</span>
            </li>
            <li className="flex items-center gap-2.5">
              <Phone className="w-4 h-4 text-gold-bright shrink-0" />
              <a href="tel:+2348000000000" className="hover:text-gold-bright transition-colors">
                +234 800 000 0000
              </a>
            </li>
            <li className="flex items-center gap-2.5">
              <Mail className="w-4 h-4 text-gold-bright shrink-0" />
              <a href="mailto:hello@mamafragrance.com" className="hover:text-gold-bright transition-colors">
                hello@mamafragrance.com
              </a>
            </li>
          </ul>
        </div>

      </div>

      {/* Bottom Sub-bar */}
      <div className="section-pad pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-cream-muted font-space">
        <p>© {currentYear} Mama Fragrance. All rights reserved. "Smell as good as you look!"</p>
        <div className="flex items-center gap-6">
          <span className="text-gold-bright">100% Genuine Guaranteed</span>
          <span>•</span>
          <span>Fast Nationwide Shipping</span>
        </div>
      </div>
    </footer>
  )
}
