import { useState, useEffect } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import {
  ShoppingBag,
  Heart,
  Search,
  Menu,
  X,
  User,
  ChevronDown,
  Sparkles,
  Zap,
  Home,
  Compass,
} from 'lucide-react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { useCartStore, getCartItemCount } from '../../store/cartStore'
import { useWishlistStore } from '../../store/wishlistStore'
import { useAuthStore } from '../../store/authStore'
import CartDrawer from '../cart/CartDrawer'

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [cartOpen, setCartOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [accountOpen, setAccountOpen] = useState(false)

  const items = useCartStore((s) => s.items)
  const itemCount = getCartItemCount(items)
  const wishlistCount = useWishlistStore((s) => s.items.length)
  const { user, logout } = useAuthStore()
  const navigate = useNavigate()
  const shouldReduceMotion = useReducedMotion()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleSearch = (e) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      navigate(`/shop?search=${encodeURIComponent(searchQuery.trim())}`)
      setSearchQuery('')
      setSearchOpen(false)
    }
  }

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/shop', label: 'Vault' },
    { to: '/gallery', label: 'Lookbook' },
    { to: '/about', label: 'Our Story' },
    { to: '/contact', label: 'VIP Concierge' },
  ]

  return (
    <>
      {/* ── Ambient Announcement Bar ── */}
      <div className="relative overflow-hidden bg-gradient-to-r from-[#030305] via-[#1a1506] to-[#030305] border-b border-gold/20 py-2 px-3 sm:px-4 text-center">
        <div className="flex items-center justify-center gap-2 text-[11px] sm:text-xs font-semibold tracking-[0.2em] sm:tracking-[0.25em] uppercase text-gold-light">
          <Sparkles className="w-3 h-3 text-gold-bright inline mr-0.5 animate-pulse" />
          <span className="text-white">MAMA FRAGRANCE:</span>
          <span className="text-gold-bright font-bold">"Smell as good as you look!"</span>
          <span className="mx-1.5 text-gold/40 hidden md:inline">•</span>
          <span className="text-gold/90 hidden md:inline">Nationwide Delivery</span>
        </div>
      </div>

      <header
        className={`sticky top-0 z-40 transition-all duration-300 ${
          scrolled
            ? 'bg-[#030305]/92 backdrop-blur-xl border-b border-gold/20 shadow-[0_10px_35px_rgba(0,0,0,0.85)]'
            : 'bg-[#030305]/75 backdrop-blur-md border-b border-white/5'
        }`}
      >
        <div className="section-pad flex items-center justify-between h-16 sm:h-20 lg:h-24">
          
          {/* Logo with Holographic Glow */}
          <Link to="/" className="flex items-center gap-2.5 sm:gap-3 group">
            <div className="relative w-9 h-9 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-br from-gold-bright via-gold to-gold-dark p-[1px] shadow-[0_0_20px_rgba(212,175,55,0.3)] group-hover:shadow-[0_0_30px_rgba(255,215,0,0.55)] transition-all">
              <div className="w-full h-full bg-[#07070b] rounded-[11px] flex items-center justify-center">
                <span className="font-cinzel text-lg sm:text-xl font-black text-transparent bg-clip-text bg-gradient-to-tr from-gold-light via-gold-bright to-white">
                  M
                </span>
              </div>
            </div>
            <div className="flex flex-col leading-tight">
              <span className="font-syne text-lg sm:text-xl lg:text-2xl font-black tracking-tight text-white group-hover:text-gold-light transition-colors">
                MAMA <span className="text-liquid-gold">FRAGRANCE</span>
              </span>
              <span className="text-[8px] sm:text-[9px] tracking-[0.28em] sm:tracking-[0.35em] text-gold/80 uppercase font-space font-medium">
                Smell as good as you look!
              </span>
            </div>
          </Link>

          {/* ── Desktop Navigation: Center-Outward Underline over 250ms ── */}
          <nav className="hidden lg:flex items-center gap-8 xl:gap-9">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `nav-link-center-out text-xs tracking-[0.2em] uppercase font-semibold ${
                    isActive
                      ? 'text-gold-bright active'
                      : 'text-cream-soft hover:text-white'
                  }`
                }
              >
                <span>{link.label}</span>
              </NavLink>
            ))}
          </nav>

          {/* Action Icons Bar */}
          <div className="flex items-center gap-1.5 sm:gap-3">
            {/* Search Trigger (Touch friendly: 40px min) */}
            <button
              onClick={() => setSearchOpen((v) => !v)}
              className="w-10 h-10 rounded-xl bg-white/[0.04] border border-white/10 text-cream-soft hover:text-gold hover:border-gold/40 flex items-center justify-center transition-colors"
              aria-label="Search Fragrances"
            >
              <Search className="w-4 h-4" />
            </button>

            {/* Wishlist */}
            <Link
              to="/account/wishlist"
              className="relative w-10 h-10 rounded-xl bg-white/[0.04] border border-white/10 text-cream-soft hover:text-gold hover:border-gold/40 flex items-center justify-center transition-colors"
              aria-label="Wishlist"
            >
              <Heart className="w-4 h-4" />
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-gold to-gold-bright text-black text-[10px] font-black rounded-full flex items-center justify-center shadow-[0_0_10px_rgba(212,175,55,0.8)]">
                  {wishlistCount}
                </span>
              )}
            </Link>

            {/* Account Menu */}
            <div className="relative hidden sm:block">
              <button
                onClick={() => setAccountOpen((v) => !v)}
                className="flex items-center gap-1.5 h-10 px-3 rounded-xl bg-white/[0.04] border border-white/10 text-cream-soft hover:text-gold hover:border-gold/40 transition-colors"
              >
                <User className="w-4 h-4" />
                <ChevronDown className="w-3 h-3 text-gold" />
              </button>

              <AnimatePresence>
                {accountOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.96 }}
                    transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute right-0 mt-2 w-56 glass-panel rounded-2xl shadow-2xl z-50 py-2 border border-gold/30"
                    onMouseLeave={() => setAccountOpen(false)}
                  >
                    {user ? (
                      <>
                        <div className="px-4 py-2 text-xs text-gold font-space border-b border-white/10">
                          VIP MEMBER <br />
                          <span className="text-white font-bold text-sm font-jakarta">{user.name}</span>
                        </div>
                        {[
                          { to: '/account/profile', label: 'My VIP Profile' },
                          { to: '/account/orders', label: 'Order History' },
                          { to: '/account/wishlist', label: 'Saved Vault' },
                        ].map(({ to, label }) => (
                          <Link
                            key={to}
                            to={to}
                            onClick={() => setAccountOpen(false)}
                            className="block px-4 py-2.5 text-xs tracking-wider uppercase text-cream-soft hover:text-gold-bright hover:bg-gold/10 transition-colors"
                          >
                            {label}
                          </Link>
                        ))}
                        <button
                          onClick={() => {
                            logout()
                            setAccountOpen(false)
                          }}
                          className="block w-full text-left px-4 py-2.5 text-xs tracking-wider uppercase text-red-400 hover:bg-red-500/10 transition-colors border-t border-white/10 mt-1"
                        >
                          Sign Out
                        </button>
                      </>
                    ) : (
                      <>
                        <Link
                          to="/account/login"
                          onClick={() => setAccountOpen(false)}
                          className="block px-4 py-2.5 text-xs tracking-wider uppercase text-cream hover:text-gold-bright hover:bg-gold/10 transition-colors"
                        >
                          Sign In
                        </Link>
                        <Link
                          to="/account/signup"
                          onClick={() => setAccountOpen(false)}
                          className="block px-4 py-2.5 text-xs tracking-wider uppercase text-gold-bright hover:bg-gold/10 transition-colors font-bold"
                        >
                          Create VIP Account
                        </Link>
                      </>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Glowing Cart Button (Touch target min 44px) */}
            <button
              onClick={() => setCartOpen(true)}
              className="btn-futuristic h-10 sm:h-11 px-3 sm:px-4 rounded-xl flex items-center gap-2 text-xs"
              aria-label="Open Cart Vault"
            >
              <ShoppingBag className="w-4 h-4 text-black" />
              <span className="font-space uppercase hidden sm:inline">Vault</span>
              <span className="bg-black text-gold-bright text-[11px] font-extrabold px-1.5 py-0.2 rounded-full min-w-[18px] text-center">
                {itemCount}
              </span>
            </button>

            {/* Mobile Hamburger Toggle Button */}
            <button
              className="lg:hidden w-10 h-10 rounded-xl bg-white/[0.04] border border-white/10 text-cream-soft hover:text-gold flex items-center justify-center ml-0.5"
              onClick={() => setMobileOpen((v) => !v)}
              aria-label="Toggle navigation menu"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Search Bar Modal */}
        <AnimatePresence>
          {searchOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="border-t border-gold/20 bg-[#06060a]/98 backdrop-blur-2xl overflow-hidden"
            >
              <div className="section-pad py-4">
                <form onSubmit={handleSearch} className="flex items-center gap-2 max-w-3xl mx-auto">
                  <div className="relative flex-1">
                    <Search className="w-4 h-4 text-gold absolute left-4 top-1/2 -translate-y-1/2" />
                    <input
                      autoFocus
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search Shiyaaka Gold, Soirée, Ashantee, Ouds..."
                      className="w-full bg-[#0f0f18] border border-gold/30 rounded-xl pl-11 pr-4 py-3 text-white placeholder-cream-muted focus:outline-none focus:border-gold-bright text-base sm:text-sm"
                    />
                  </div>
                  <button
                    type="submit"
                    className="btn-futuristic px-5 py-3 rounded-xl text-xs font-bold shrink-0"
                  >
                    Search
                  </button>
                </form>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Mobile Navigation Drawer */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.nav
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="lg:hidden bg-[#07070c]/98 backdrop-blur-2xl border-t border-gold/20 py-5 overflow-hidden"
            >
              <div className="section-pad flex flex-col gap-2">
                <div className="text-[10px] text-gold/70 tracking-[0.25em] uppercase font-space mb-1">
                  Menu Selection
                </div>
                {navLinks.map((link) => (
                  <NavLink
                    key={link.to}
                    to={link.to}
                    onClick={() => setMobileOpen(false)}
                    className={({ isActive }) =>
                      `py-3 px-4 rounded-xl text-sm font-semibold tracking-wider uppercase transition-all flex items-center justify-between min-h-[44px] ${
                        isActive
                          ? 'bg-gold/15 text-gold-bright border border-gold/40'
                          : 'text-cream-soft hover:bg-white/5 hover:text-white'
                      }`
                    }
                  >
                    <span>{link.label}</span>
                    <Zap className="w-3.5 h-3.5 opacity-40 text-gold" />
                  </NavLink>
                ))}
                
                <div className="pt-3 border-t border-white/10 flex flex-col gap-2 mt-1">
                  {user ? (
                    <>
                      <Link
                        to="/account/profile"
                        onClick={() => setMobileOpen(false)}
                        className="py-3 px-4 text-xs font-semibold tracking-wider uppercase text-gold-light min-h-[44px] flex items-center"
                      >
                        VIP Profile ({user.name})
                      </Link>
                      <button
                        onClick={() => {
                          logout()
                          setMobileOpen(false)
                        }}
                        className="text-left py-3 px-4 text-xs font-semibold tracking-wider uppercase text-red-400 min-h-[44px] flex items-center"
                      >
                        Sign Out
                      </button>
                    </>
                  ) : (
                    <Link
                      to="/account/login"
                      onClick={() => setMobileOpen(false)}
                      className="btn-futuristic text-center py-3.5 rounded-xl text-xs font-bold"
                    >
                      Sign In / Register VIP
                    </Link>
                  )}
                </div>
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </header>

      {/* ── Mobile Phone Ergonomic Quick Bottom Bar ── */}
      <div className="fixed bottom-0 inset-x-0 z-30 lg:hidden bg-[#06060c]/95 backdrop-blur-xl border-t border-gold/25 px-4 py-2 pb-[max(0.6rem,env(safe-area-inset-bottom))] shadow-[0_-5px_25px_rgba(0,0,0,0.8)]">
        <div className="flex items-center justify-around max-w-md mx-auto">
          <Link
            to="/"
            className="flex flex-col items-center gap-1 py-1 px-3 text-cream-muted hover:text-gold transition-colors"
          >
            <Home className="w-4 h-4" />
            <span className="text-[10px] font-space tracking-wider uppercase">Home</span>
          </Link>

          <Link
            to="/shop"
            className="flex flex-col items-center gap-1 py-1 px-3 text-cream-muted hover:text-gold transition-colors"
          >
            <Compass className="w-4 h-4" />
            <span className="text-[10px] font-space tracking-wider uppercase">Vault</span>
          </Link>

          <Link
            to="/account/wishlist"
            className="relative flex flex-col items-center gap-1 py-1 px-3 text-cream-muted hover:text-gold transition-colors"
          >
            <Heart className="w-4 h-4" />
            {wishlistCount > 0 && (
              <span className="absolute top-0 right-2 w-3.5 h-3.5 bg-gold-bright text-black text-[9px] font-black rounded-full flex items-center justify-center">
                {wishlistCount}
              </span>
            )}
            <span className="text-[10px] font-space tracking-wider uppercase">Saved</span>
          </Link>

          <button
            onClick={() => setCartOpen(true)}
            className="relative flex flex-col items-center gap-1 py-1 px-3 text-gold-bright transition-colors"
          >
            <ShoppingBag className="w-4 h-4" />
            {itemCount > 0 && (
              <span className="absolute top-0 right-2 w-3.5 h-3.5 bg-gold-bright text-black text-[9px] font-black rounded-full flex items-center justify-center shadow-[0_0_8px_#ffd700]">
                {itemCount}
              </span>
            )}
            <span className="text-[10px] font-space font-bold tracking-wider uppercase">Cart</span>
          </button>
        </div>
      </div>

      <CartDrawer isOpen={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  )
}
