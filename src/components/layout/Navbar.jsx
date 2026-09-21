import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import {
  ShoppingBag,
  Heart,
  Search,
  Menu,
  X,
  User,
  ChevronDown,
} from 'lucide-react'
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
    { to: '/shop', label: 'Shop' },
    { to: '/about', label: 'About' },
    { to: '/gallery', label: 'Lookbook' },
    { to: '/contact', label: 'Contact' },
  ]

  return (
    <>
      {/* Announcement bar */}
      <div className="bg-gold text-dark text-center py-2 text-xs tracking-widest font-medium uppercase">
        Free shipping on orders over ₦50,000 &nbsp;|&nbsp; Use code{' '}
        <strong>WURA10</strong> for 10% off
      </div>

      <header
        className={`sticky top-0 z-40 transition-all duration-300 ${
          scrolled
            ? 'bg-dark/95 backdrop-blur-md border-b border-dark-border shadow-lg shadow-black/50'
            : 'bg-dark'
        }`}
      >
        <div className="section-pad flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link to="/" className="flex flex-col items-start leading-none group">
            <span className="font-playfair text-xl lg:text-2xl font-bold text-gold tracking-wide group-hover:text-gold-light transition-colors">
              Wura Luxe
            </span>
            <span className="text-[10px] tracking-[0.3em] text-cream-muted uppercase group-hover:text-cream-soft transition-colors">
              &amp; Scents
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `text-sm tracking-widest uppercase transition-colors duration-200 pb-0.5 ${
                    isActive
                      ? 'text-gold border-b border-gold'
                      : 'text-cream-soft hover:text-gold border-b border-transparent hover:border-gold/50'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          {/* Icons */}
          <div className="flex items-center gap-1 lg:gap-2">
            {/* Search */}
            <button
              onClick={() => setSearchOpen((v) => !v)}
              className="p-2 text-cream-muted hover:text-gold transition-colors"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Wishlist */}
            <Link
              to="/account/wishlist"
              className="relative p-2 text-cream-muted hover:text-gold transition-colors"
            >
              <Heart className="w-5 h-5" />
              {wishlistCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-gold text-dark text-[10px] font-bold rounded-full flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </Link>

            {/* Account dropdown */}
            <div className="relative hidden lg:block">
              <button
                onClick={() => setAccountOpen((v) => !v)}
                className="flex items-center gap-1 p-2 text-cream-muted hover:text-gold transition-colors"
              >
                <User className="w-5 h-5" />
                <ChevronDown className="w-3 h-3" />
              </button>
              {accountOpen && (
                <div
                  className="absolute right-0 mt-1 w-48 bg-dark-card border border-dark-border shadow-xl z-50 py-1"
                  onMouseLeave={() => setAccountOpen(false)}
                >
                  {user ? (
                    <>
                      <div className="px-4 py-2 text-sm text-cream-muted border-b border-dark-border truncate">
                        Hello, {user.name?.split(' ')[0]}
                      </div>
                      {[
                        { to: '/account/profile', label: 'My Profile' },
                        { to: '/account/orders', label: 'My Orders' },
                        { to: '/account/wishlist', label: 'My Wishlist' },
                      ].map(({ to, label }) => (
                        <Link
                          key={to}
                          to={to}
                          onClick={() => setAccountOpen(false)}
                          className="block px-4 py-2 text-sm text-cream hover:text-gold hover:bg-dark-hover transition-colors"
                        >
                          {label}
                        </Link>
                      ))}
                      <button
                        onClick={() => { logout(); setAccountOpen(false) }}
                        className="block w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-dark-hover transition-colors"
                      >
                        Sign Out
                      </button>
                    </>
                  ) : (
                    <>
                      <Link
                        to="/account/login"
                        onClick={() => setAccountOpen(false)}
                        className="block px-4 py-2 text-sm text-cream hover:text-gold hover:bg-dark-hover transition-colors"
                      >
                        Sign In
                      </Link>
                      <Link
                        to="/account/signup"
                        onClick={() => setAccountOpen(false)}
                        className="block px-4 py-2 text-sm text-cream hover:text-gold hover:bg-dark-hover transition-colors"
                      >
                        Create Account
                      </Link>
                    </>
                  )}
                </div>
              )}
            </div>

            {/* Cart */}
            <button
              onClick={() => setCartOpen(true)}
              className="relative p-2 text-cream-muted hover:text-gold transition-colors"
            >
              <ShoppingBag className="w-5 h-5" />
              {itemCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-gold text-dark text-[10px] font-bold rounded-full flex items-center justify-center">
                  {itemCount > 9 ? '9+' : itemCount}
                </span>
              )}
            </button>

            {/* Mobile toggle */}
            <button
              className="lg:hidden p-2 text-cream-muted hover:text-gold transition-colors"
              onClick={() => setMobileOpen((v) => !v)}
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Search bar */}
        {searchOpen && (
          <div className="border-t border-dark-border px-4 py-3 bg-dark-secondary animate-slide-up">
            <form onSubmit={handleSearch} className="flex gap-2 max-w-2xl mx-auto">
              <input
                autoFocus
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search fragrances…"
                className="flex-1 bg-dark-card border border-dark-border text-cream placeholder-cream-muted px-4 py-2 text-sm focus:outline-none focus:border-gold"
              />
              <button
                type="submit"
                className="px-5 py-2 bg-gold text-dark text-sm font-semibold hover:bg-gold-light transition-colors"
              >
                Search
              </button>
            </form>
          </div>
        )}

        {/* Mobile menu */}
        {mobileOpen && (
          <nav className="lg:hidden bg-dark-secondary border-t border-dark-border py-4 animate-slide-up">
            <div className="section-pad flex flex-col gap-1">
              {navLinks.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  onClick={() => setMobileOpen(false)}
                  className={({ isActive }) =>
                    `py-3 text-sm tracking-widest uppercase border-b border-dark-border transition-colors ${
                      isActive ? 'text-gold' : 'text-cream-soft hover:text-gold'
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              ))}
              <div className="pt-3 flex flex-col gap-1">
                {user ? (
                  <>
                    <Link
                      to="/account/profile"
                      onClick={() => setMobileOpen(false)}
                      className="py-3 text-sm tracking-widest uppercase text-cream-soft hover:text-gold border-b border-dark-border"
                    >
                      My Account
                    </Link>
                    <button
                      onClick={() => { logout(); setMobileOpen(false) }}
                      className="py-3 text-sm tracking-widest uppercase text-red-400 text-left"
                    >
                      Sign Out
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      to="/account/login"
                      onClick={() => setMobileOpen(false)}
                      className="py-3 text-sm tracking-widest uppercase text-cream-soft hover:text-gold border-b border-dark-border"
                    >
                      Sign In
                    </Link>
                    <Link
                      to="/account/signup"
                      onClick={() => setMobileOpen(false)}
                      className="py-3 text-sm tracking-widest uppercase text-cream-soft hover:text-gold"
                    >
                      Create Account
                    </Link>
                  </>
                )}
              </div>
            </div>
          </nav>
        )}
      </header>

      <CartDrawer isOpen={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  )
}
