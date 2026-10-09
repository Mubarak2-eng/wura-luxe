import { Link } from 'react-router-dom'
import {
  MessageCircle,
  Instagram,
  Phone,
  Mail,
  MapPin,
  ShieldCheck,
  Truck,
  Gift,
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
              <Gift className="w-5 h-5" />
            </div>
            <div>
              <p className="font-serif font-bold text-xs sm:text-sm text-[#FAF6EF]">Gift Wrapping</p>
              <p className="text-[11px] text-[#E9DED0]/70">Ask us about gift options</p>
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
              <p className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#C7A66A] shrink-0 mt-0.5" />
                <span>Magnate Plaza, Baybridge Road (close to the Express),<br />Yenagoa, Bayelsa State, Nigeria</span>
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#C7A66A] shrink-0" />
                <a href="tel:+2347064160841" className="hover:text-[#C7A66A] transition-colors">
                  +234 706 416 0841
                </a>
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#C7A66A] shrink-0" />
                <span>hello@mamafragrance.ng</span>
              </p>
            </div>

            {/* Social Icons */}
            <div className="flex items-center gap-3 pt-2">
              {/* Instagram */}
              <a
                href="https://instagram.com/no.1_mama_fragrance"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-[#FAF6EF]/10 hover:bg-[#C7A66A] hover:text-[#211713] text-[#FAF6EF] flex items-center justify-center transition-all"
                aria-label="Instagram — @no.1_mama_fragrance"
                title="Instagram: @no.1_mama_fragrance"
              >
                <Instagram className="w-4 h-4" />
              </a>

              {/* TikTok — custom SVG since lucide doesn't have it */}
              <a
                href="https://tiktok.com/@mamafragranceofbayelsa"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-[#FAF6EF]/10 hover:bg-[#C7A66A] hover:text-[#211713] text-[#FAF6EF] flex items-center justify-center transition-all"
                aria-label="TikTok — MAMA FRAGRANCE OF BAYELSA"
                title="TikTok: MAMA FRAGRANCE OF BAYELSA"
              >
                <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.2 8.2 0 0 0 4.79 1.52V6.76a4.85 4.85 0 0 1-1.02-.07z" />
                </svg>
              </a>

              {/* Snapchat */}
              <a
                href="https://snapchat.com/add/mamafragrance"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-[#FAF6EF]/10 hover:bg-[#C7A66A] hover:text-[#211713] text-[#FAF6EF] flex items-center justify-center transition-all"
                aria-label="Snapchat — MAMA FRAGRANCE"
                title="Snapchat: MAMA FRAGRANCE"
              >
                <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
                  <path d="M12.166 2C9.41 2 7.028 3.64 5.94 6.032c-.373.81-.498 1.645-.434 2.617-.278.136-.567.2-.868.2-.544 0-.966-.283-1.273-.517l-.08-.062c-.09-.068-.183-.1-.275-.1-.232 0-.432.197-.432.447 0 .156.073.3.202.394.358.262.928.516 1.76.574.094.622.302 1.178.614 1.672-.665.273-1.422.7-1.932 1.465-.12.18-.072.427.108.55.087.06.185.088.284.088.13 0 .257-.055.347-.162.432-.513 1.078-.869 1.802-1.04.558.683 1.302 1.124 2.097 1.267-.162.437-.32.76-.452.965-.202.313-.465.553-.808.715-.468.22-.802.51-.995.861-.127.23-.095.515.08.71.107.12.257.184.41.184.07 0 .142-.013.21-.042.468-.188.996-.364 1.568-.414.056.428.204.83.432 1.18.5.78 1.276 1.277 2.2 1.41.21.03.423.046.638.046 1.037 0 2.02-.414 2.74-1.147.188-.188.36-.39.51-.609.573.05 1.1.226 1.57.414.07.028.14.04.21.04.15 0 .3-.062.41-.183.174-.194.207-.48.08-.71-.193-.35-.527-.64-.995-.86-.343-.162-.606-.402-.808-.715-.133-.205-.29-.528-.452-.965.795-.143 1.539-.584 2.098-1.267.723.17 1.37.527 1.8 1.04.09.107.218.162.348.162.1 0 .197-.028.285-.088.18-.123.228-.37.108-.55-.51-.765-1.267-1.192-1.932-1.465.312-.494.52-1.05.614-1.672.832-.058 1.402-.312 1.76-.574.129-.094.202-.238.202-.394 0-.25-.2-.447-.432-.447-.092 0-.185.032-.275.1l-.08.062c-.307.234-.729.517-1.273.517-.301 0-.59-.064-.868-.2.064-.972-.061-1.808-.434-2.617C16.972 3.64 14.59 2 11.834 2h.332z"/>
                </svg>
              </a>

              {/* WhatsApp */}
              <a
                href="https://wa.me/2347064160841"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-[#FAF6EF]/10 hover:bg-[#25D366] hover:text-white text-[#FAF6EF] flex items-center justify-center transition-all"
                aria-label="WhatsApp"
                title="Chat on WhatsApp"
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

          <div className="flex flex-wrap items-center gap-2 text-[11px] text-[#E9DED0]/70 justify-center sm:justify-end">
            <span>📸 <a href="https://instagram.com/no.1_mama_fragrance" target="_blank" rel="noreferrer" className="hover:text-[#C7A66A] transition-colors">@no.1_mama_fragrance</a></span>
            <span className="opacity-40">·</span>
            <span>🎵 MAMA FRAGRANCE OF BAYELSA</span>
            <span className="opacity-40">·</span>
            <span>👻 MAMA FRAGRANCE</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
