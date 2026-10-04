import { Link } from 'react-router-dom'
import {
  MessageCircle,
  Instagram,
  Facebook,
  Sparkles,
  Phone,
  Mail,
  MapPin,
  ShieldCheck,
  CreditCard,
  Truck,
  ArrowRight,
} from 'lucide-react'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-[#211713] text-[#FAF6EF] border-t border-[#31231D]">
      {/* Top Value Assurance Bar */}
      <div className="border-b border-[#31231D] py-8">
        <div className="section-pad grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#FAF6EF]/10 flex items-center justify-center text-[#C7A66A] shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <p className="font-serif font-bold text-xs sm:text-sm text-[#FAF6EF]">100% Authentic</p>
              <p className="text-[11px] text-[#E9DED0]/70">Directly sourced luxury</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#FAF6EF]/10 flex items-center justify-center text-[#C7A66A] shrink-0">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <p className="font-serif font-bold text-xs sm:text-sm text-[#FAF6EF]">Nationwide Delivery</p>
              <p className="text-[11px] text-[#E9DED0]/70">Fast Lagos &amp; Interstate</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#FAF6EF]/10 flex items-center justify-center text-[#C7A66A] shrink-0">
              <MessageCircle className="w-5 h-5" />
            </div>
            <div>
              <p className="font-serif font-bold text-xs sm:text-sm text-[#FAF6EF]">Direct WhatsApp</p>
              <p className="text-[11px] text-[#E9DED0]/70">Scent advice &amp; order help</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#FAF6EF]/10 flex items-center justify-center text-[#C7A66A] shrink-0">
              <CreditCard className="w-5 h-5" />
            </div>
            <div>
              <p className="font-serif font-bold text-xs sm:text-sm text-[#FAF6EF]">Secure Checkout</p>
              <p className="text-[11px] text-[#E9DED0]/70">Powered by Paystack</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="section-pad py-14 sm:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8">
          
          {/* Col 1: Brand & Contact Info */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="inline-block">
              <span className="font-serif text-2xl font-bold tracking-tight text-[#FAF6EF] block leading-none">
                MAMA FRAGRANCE
              </span>
              <span className="text-[10px] tracking-[0.25em] text-[#C7A66A] uppercase font-sans font-semibold mt-1 block">
                Smell as good as you look.
              </span>
            </Link>

            <p className="text-xs text-[#E9DED0]/80 leading-relaxed font-light max-w-sm">
              Nigeria's destination for authentic designer perfumes, concentrated Arabian attar oils, luxury layering sets, and irresistible body mists.
            </p>

            <div className="space-y-2 pt-2 text-xs text-[#E9DED0]/85">
              <p className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#C7A66A] shrink-0" />
                <span>Lagos, Nigeria</span>
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#C7A66A] shrink-0" />
                <span>+234 812 000 0000 / WhatsApp Concierge</span>
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#C7A66A] shrink-0" />
                <span>hello@mamafragrance.ng</span>
              </p>
            </div>

            {/* Social Icons */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-[#FAF6EF]/10 hover:bg-[#C7A66A] hover:text-[#211713] text-[#FAF6EF] flex items-center justify-center transition-all"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://wa.me/2348120000000"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-[#FAF6EF]/10 hover:bg-[#25D366] hover:text-white text-[#FAF6EF] flex items-center justify-center transition-all"
                aria-label="WhatsApp"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 2: Shop Links */}
          <div>
            <h4 className="font-serif font-bold text-sm text-[#FAF6EF] uppercase tracking-wider mb-4 pb-1 border-b border-[#31231D]">
              Shop
            </h4>
            <ul className="space-y-2.5 text-xs text-[#E9DED0]/80">
              <li>
                <Link to="/shop" className="hover:text-[#C7A66A] transition-colors block">
                  Shop All Fragrances
                </Link>
              </li>
              <li>
                <Link to="/shop?category=men" className="hover:text-[#C7A66A] transition-colors block">
                  Men's Fragrances
                </Link>
              </li>
              <li>
                <Link to="/shop?category=women" className="hover:text-[#C7A66A] transition-colors block">
                  Women's Fragrances
                </Link>
              </li>
              <li>
                <Link to="/shop?category=unisex" className="hover:text-[#C7A66A] transition-colors block">
                  Unisex Fragrances
                </Link>
              </li>
              <li>
                <Link to="/shop?category=oil" className="hover:text-[#C7A66A] transition-colors block">
                  Perfume Oils &amp; Attars
                </Link>
              </li>
              <li>
                <Link to="/shop?category=mist" className="hover:text-[#C7A66A] transition-colors block">
                  Body Mists
                </Link>
              </li>
              <li>
                <Link to="/shop?category=gift" className="hover:text-[#C7A66A] transition-colors block font-semibold text-[#C7A66A]">
                  Gift Sets &amp; Duos
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Customer Care */}
          <div>
            <h4 className="font-serif font-bold text-sm text-[#FAF6EF] uppercase tracking-wider mb-4 pb-1 border-b border-[#31231D]">
              Customer Care
            </h4>
            <ul className="space-y-2.5 text-xs text-[#E9DED0]/80">
              <li>
                <Link to="/contact" className="hover:text-[#C7A66A] transition-colors block">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/contact#faqs" className="hover:text-[#C7A66A] transition-colors block">
                  Frequently Asked Questions
                </Link>
              </li>
              <li>
                <Link to="/contact#shipping" className="hover:text-[#C7A66A] transition-colors block">
                  Shipping &amp; Delivery Policy
                </Link>
              </li>
              <li>
                <Link to="/contact#returns" className="hover:text-[#C7A66A] transition-colors block">
                  Returns &amp; Exchanges
                </Link>
              </li>
              <li>
                <Link to="/account/orders" className="hover:text-[#C7A66A] transition-colors block">
                  Order Tracking &amp; History
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: About & Legal */}
          <div>
            <h4 className="font-serif font-bold text-sm text-[#FAF6EF] uppercase tracking-wider mb-4 pb-1 border-b border-[#31231D]">
              About
            </h4>
            <ul className="space-y-2.5 text-xs text-[#E9DED0]/80">
              <li>
                <Link to="/about" className="hover:text-[#C7A66A] transition-colors block">
                  Our Story
                </Link>
              </li>
              <li>
                <Link to="/about#why" className="hover:text-[#C7A66A] transition-colors block">
                  Why Mama Fragrance
                </Link>
              </li>
              <li>
                <Link to="/contact#privacy" className="hover:text-[#C7A66A] transition-colors block">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/contact#terms" className="hover:text-[#C7A66A] transition-colors block">
                  Terms &amp; Conditions
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Copyright & Payment Methods */}
      <div className="border-t border-[#31231D] py-6">
        <div className="section-pad flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#E9DED0]/60 text-center sm:text-left">
          <p>
            &copy; {currentYear} <strong>Mama Fragrance</strong>. All rights reserved. “Smell as good as you look.”
          </p>

          <div className="flex items-center gap-3">
            <span className="text-[11px] text-[#E9DED0]/80">Accepted Payments:</span>
            <div className="flex items-center gap-1.5 text-[10px] font-bold text-[#FAF6EF] uppercase bg-[#FAF6EF]/10 px-2.5 py-1 rounded">
              <span>Paystack</span> • <span>Mastercard</span> • <span>Visa</span> • <span>Verve</span> • <span>Bank Transfer</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
