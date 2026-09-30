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
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
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
    { to: '/shop', label: 'Vault / Shop' },
    { to: '/gallery', label: 'Stock Lookbook' },
    { to: '/about', label: 'Our Story' },
    { to: '/contact', label: 'VIP Concierge' },
  ]

  return (
    <>
      {/* Futuristic Ambient Announcement Bar */}
      <div className="relative overflow-hidden bg-gradient-to-r from-[#030305] via-[#1a1506] to-[#030305] border-b border-gold/20 py-2 px-4 text-center">
        <div className="flex items-center justify-center gap-2 text-xs font-semibold tracking-[0.25em] uppercase text-gold-light">
          <motion.span
            animate={{ scale: [1, 1.2, 1], opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Sparkles className="w-3.5 h-3.5 text-gold-bright inline mr-1" />
          </motion.span>
          <span className="text-white">MAMA FRAGRANCE:</span>
          <span className="text-gold-bright font-bold hidden sm:inline">"Smell as good as you look!"</span>
          <span className="mx-2 text-gold/40 hidden md:inline">•</span>
          <span className="text-gold/90 hidden md:inline">Express Delivery Across Nigeria</span>
        </div>
      </div>

      <header
        className={`sticky top-0 z-40 transition-all duration-500 ${
          scrolled
            ? 'bg-[#030305]/85 backdrop-blur-xl border-b border-gold/20 shadow-[0_10px_35px_rgba(0,0,0,0.8)]'
            : 'bg-[#030305]/60 backdrop-blur-md border-b border-white/5'
        }`}
      >
        <div className="section-pad flex items-center justify-between h-20 lg:h-24">
          {/* Logo with Futuristic Holographic Glow */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="relative w-11 h-11 rounded-xl bg-gradient-to-br from-gold-bright via-gold to-gold-dark p-[1px] shadow-[0_0_20px_rgba(212,175,55,0.35)] group-hover:shadow-[0_0_30px_rgba(255,215,0,0.6)] transition-all duration-300">
              <div className="w-full h-full bg-[#07070b] rounded-[11px] flex items-center justify-center">
                <span className="font-cinzel text-xl font-black text-transparent bg-clip-text bg-gradient-to-tr from-gold-light via-gold-bright to-white group-hover:scale-110 transition-transform">
                  M
                </span>
              </div>
            </div>
            <div className="flex flex-col leading-tight">
              <span className="font-syne text-xl lg:text-2xl font-extrabold tracking-tight text-white group-hover:text-gold-light transition-colors">
                MAMA <span className="text-liquid-gold">FRAGRANCE</span>
              </span>
              <span className="text-[9px] tracking-[0.35em] text-gold/80 uppercase font-space font-medium">
                Smell as good as you look!
              </span>
            </div>
          </Link>

          {/* Desktop Navigation with futuristic underline hover indicator */}
          <nav className="hidden lg:flex items-center gap-9">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `relative text-xs tracking-[0.2em] uppercase font-semibold transition-all duration-300 py-2 ${
                    isActive
                      ? 'text-gold-bright font-bold'
                      : 'text-cream-soft hover:text-white'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <span>{link.label}</span>
                    {isActive && (
                      <motion.div
                        layoutId="nav-underline"
                        className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-gold-bright to-transparent shadow-[0_0_10px_#ffd700]"
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          {/* Action Icons */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Search Trigger */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSearchOpen((v) => !v)}
              className="p-2.5 rounded-lg bg-white/[0.03] border border-white/10 text-cream-soft hover:text-gold hover:border-gold/40 transition-colors"
              aria-label="Search"
            >
              <Search className="w-4 h-4" />
            </motion.button>

            {/* Wishlist */}
            <Link
              to="/account/wishlist"
              className="relative p-2.5 rounded-lg bg-white/[0.03] border border-white/10 text-cream-soft hover:text-gold hover:border-gold/40 transition-colors"
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
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setAccountOpen((v) => !v)}
                className="flex items-center gap-1.5 p-2.5 rounded-lg bg-white/[0.03] border border-white/10 text-cream-soft hover:text-gold hover:border-gold/40 transition-colors"
              >
                <User className="w-4 h-4" />
                <ChevronDown className="w-3 h-3 text-gold" />
              </motion.button>

              <AnimatePresence>
                {accountOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 mt-2 w-56 glass-panel rounded-xl shadow-2xl z-50 py-2 border border-gold/30"
                    onMouseLeave={() => setAccountOpen(false)}
                  >
                    {user ? (
                      <>
                        <div className="px-4 py-2 text-xs text-gold font-space border-b border-white/10">
                          LOGGED IN AS <br />
                          <span className="text-white font-bold text-sm font-jakarta">{user.name}</span>
                        </div>
                        {[
                          { to: '/account/profile', label: 'My VIP Profile' },
                          { to: '/account/orders', label: 'Order History' },
                          { to: '/account/wishlist', label: 'Saved Scents' },
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

            {/* Glowing Futuristic Cart Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setCartOpen(true)}
              className="relative flex items-center gap-2.5 px-4 py-2 rounded-xl bg-gradient-to-r from-gold-dark/40 via-gold/30 to-gold-bright/20 border border-gold/50 text-gold-light hover:border-gold shadow-[0_0_20px_rgba(212,175,55,0.25)] hover:shadow-[0_0_30px_rgba(255,215,0,0.5)] transition-all"
              aria-label="Shopping Cart"
            >
              <ShoppingBag className="w-4 h-4 text-gold-bright" />
              <span className="text-xs font-bold font-space uppercase hidden sm:inline">Vault</span>
              <span className="bg-gold-bright text-black text-[11px] font-extrabold px-2 py-0.5 rounded-full shadow-[0_0_10px_#ffd700]">
                {itemCount}
              </span>
            </motion.button>

            {/* Mobile menu button */}
            <button
              className="lg:hidden p-2.5 rounded-lg bg-white/[0.03] border border-white/10 text-cream-soft hover:text-gold"
              onClick={() => setMobileOpen((v) => !v)}
              aria-label="Toggle Menu"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Futuristic Search Modal Dropdown */}
        <AnimatePresence>
          {searchOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="border-t border-gold/20 bg-[#06060a]/95 backdrop-blur-2xl overflow-hidden"
            >
              <div className="section-pad py-5">
                <form onSubmit={handleSearch} className="flex items-center gap-3 max-w-3xl mx-auto">
                  <div className="relative flex-1">
                    <Search className="w-5 h-5 text-gold absolute left-4 top-1/2 -translate-y-1/2" />
                    <input
                      autoFocus
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search Shiyaaka Gold, Soirée, Ashantee, Ouds, Gourmands..."
                      className="w-full bg-[#0f0f18] border border-gold/30 rounded-xl pl-12 pr-4 py-3.5 text-sm text-white placeholder-cream-muted focus:outline-none focus:border-gold-bright focus:ring-1 focus:ring-gold-bright transition-all"
                    />
                  </div>
                  <button
                    type="submit"
                    className="btn-futuristic px-6 py-3.5 rounded-xl text-xs font-bold"
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
              className="lg:hidden bg-[#07070c]/98 backdrop-blur-2xl border-t border-gold/20 py-6"
            >
              <div className="section-pad flex flex-col gap-3">
                <div className="text-[10px] text-gold/70 tracking-[0.3em] uppercase font-space mb-1">
                  Navigation Menu
                </div>
                {navLinks.map((link) => (
                  <NavLink
                    key={link.to}
                    to={link.to}
                    onClick={() => setMobileOpen(false)}
                    className={({ isActive }) =>
                      `py-3 px-4 rounded-xl text-sm font-semibold tracking-wider uppercase transition-all flex items-center justify-between ${
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
                <div className="pt-4 border-t border-white/10 flex flex-col gap-2">
                  {user ? (
                    <>
                      <Link
                        to="/account/profile"
                        onClick={() => setMobileOpen(false)}
                        className="py-2.5 px-4 text-xs font-semibold tracking-wider uppercase text-gold-light"
                      >
                        VIP Profile ({user.name})
                      </Link>
                      <button
                        onClick={() => {
                          logout()
                          setMobileOpen(false)
                        }}
                        className="text-left py-2.5 px-4 text-xs font-semibold tracking-wider uppercase text-red-400"
                      >
                        Sign Out
                      </button>
                    </>
                  ) : (
                    <Link
                      to="/account/login"
                      onClick={() => setMobileOpen(false)}
                      className="btn-futuristic text-center py-3 rounded-xl text-xs font-bold"
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

      <CartDrawer isOpen={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  )
}
