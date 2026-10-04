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
  ArrowRight,
  ShieldCheck,
  Compass,
  Home,
  Layers,
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useCartStore, getCartItemCount } from '../../store/cartStore'
import { useWishlistStore } from '../../store/wishlistStore'
import { useAuthStore } from '../../store/authStore'
import CartDrawer from '../cart/CartDrawer'
import SearchModal from './SearchModal'
import { categories, scentProfiles, priceCollections } from '../../data/categories'
import { products } from '../../data/products'

const announcementMessages = [
  'Discover Your Signature Scent.',
  'Smell as good as you look.',
  'Find your next unforgettable fragrance.',
  'Fast & Secure Nationwide Delivery across Nigeria.',
]

export default function Navbar() {
  const [currentAnnouncementIndex, setCurrentAnnouncementIndex] = useState(0)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [cartOpen, setCartOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [accountOpen, setAccountOpen] = useState(false)
  const [activeMegaMenu, setActiveMegaMenu] = useState(null)
  const [mobileExpandedCat, setMobileExpandedCat] = useState(null)

  const items = useCartStore((s) => s.items)
  const itemCount = getCartItemCount(items)
  const wishlistCount = useWishlistStore((s) => s.items.length)
  const { user, logout } = useAuthStore()
  const navigate = useNavigate()

  // Rotating Announcement Bar
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentAnnouncementIndex((prev) => (prev + 1) % announcementMessages.length)
    }, 4000)
    return () => clearInterval(timer)
  }, [])

  // Sticky Header scroll detection
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Featured headliners for mega menus
  const shiyaakaPick = products.find((p) => p.id === 'shiyaaka-gold')
  const soireePick = products.find((p) => p.id === 'soiree-cloud-candy-combo')
  const khamrahPick = products.find((p) => p.id === 'khamrah-amber-noir')

  return (
    <>
      {/* ── 1. Slim Rotating Announcement Bar ── */}
      <div className="bg-[#211713] text-[#FAF6EF] py-2 px-4 text-center text-xs tracking-wider border-b border-[#31231D] relative z-50">
        <div className="max-w-7xl mx-auto flex items-center justify-center min-h-[20px]">
          <AnimatePresence mode="wait">
            <motion.p
              key={currentAnnouncementIndex}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
              className="font-medium text-[11px] sm:text-xs flex items-center gap-2"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#C7A66A] shrink-0" />
              <span>{announcementMessages[currentAnnouncementIndex]}</span>
            </motion.p>
          </AnimatePresence>
        </div>
      </div>

      {/* ── 2. Main Navigation Header ── */}
      <header
        className={`sticky top-0 z-40 transition-all duration-300 ${
          scrolled
            ? 'bg-[#FAF6EF]/95 backdrop-blur-md border-b border-[#E9DED0] shadow-luxury'
            : 'bg-[#FAF6EF] border-b border-[#E9DED0]/80'
        }`}
      >
        <div className="section-pad">
          <div className="flex items-center justify-between h-20 sm:h-22">
            
            {/* Left: Brand Wordmark / Logo */}
            <Link to="/" className="flex flex-col group py-1">
              <span className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-[#211713] group-hover:text-[#C7A66A] transition-colors leading-none">
                MAMA FRAGRANCE
              </span>
              <span className="text-[9px] sm:text-[10px] tracking-[0.22em] text-[#C7A66A] uppercase font-sans font-semibold mt-1">
                Smell as good as you look.
              </span>
            </Link>

            {/* Center: Desktop Navigation Links with Mega Menus */}
            <nav className="hidden lg:flex items-center gap-7 xl:gap-8 h-full">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `nav-link-refined ${isActive ? 'text-[#211713] active' : ''}`
                }
              >
                Home
              </NavLink>

              {/* Shop All Mega Menu Trigger */}
              <div
                className="relative h-full flex items-center"
                onMouseEnter={() => setActiveMegaMenu('shop-all')}
                onMouseLeave={() => setActiveMegaMenu(null)}
              >
                <NavLink
                  to="/shop"
                  className={({ isActive }) =>
                    `nav-link-refined flex items-center gap-1 ${
                      isActive ? 'text-[#211713] active' : ''
                    }`
                  }
                >
                  <span>Shop All</span>
                  <ChevronDown className="w-3 h-3 transition-transform group-hover:rotate-180" />
                </NavLink>

                {/* Shop All Mega Menu Dropdown */}
                <AnimatePresence>
                  {activeMegaMenu === 'shop-all' && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-full left-1/2 -translate-x-1/2 w-[760px] bg-white rounded-xl shadow-2xl border border-[#E9DED0] p-6 grid grid-cols-4 gap-6 z-50"
                    >
                      {/* Col 1: Main Categories */}
                      <div>
                        <h4 className="text-xs font-bold uppercase tracking-wider text-[#211713] pb-2 border-b border-[#E9DED0] mb-3">
                          Categories
                        </h4>
                        <ul className="space-y-2 text-xs text-[#393431]">
                          <li>
                            <Link to="/shop" className="hover:text-[#C7A66A] block py-0.5">
                              All Fragrances (Complete)
                            </Link>
                          </li>
                          <li>
                            <Link to="/shop?category=men" className="hover:text-[#C7A66A] block py-0.5">
                              Men's Fragrances
                            </Link>
                          </li>
                          <li>
                            <Link to="/shop?category=women" className="hover:text-[#C7A66A] block py-0.5">
                              Women's Fragrances
                            </Link>
                          </li>
                          <li>
                            <Link to="/shop?category=unisex" className="hover:text-[#C7A66A] block py-0.5">
                              Unisex Fragrances
                            </Link>
                          </li>
                          <li>
                            <Link to="/shop?category=oil" className="hover:text-[#C7A66A] block py-0.5">
                              Perfume Oils &amp; Attars
                            </Link>
                          </li>
                          <li>
                            <Link to="/shop?category=mist" className="hover:text-[#C7A66A] block py-0.5">
                              Body Mists
                            </Link>
                          </li>
                          <li>
                            <Link to="/shop?category=gift" className="hover:text-[#C7A66A] block py-0.5 font-semibold text-[#C7A66A]">
                              Gift Sets &amp; Duos
                            </Link>
                          </li>
                        </ul>
                      </div>

                      {/* Col 2: Scent Profiles */}
                      <div>
                        <h4 className="text-xs font-bold uppercase tracking-wider text-[#211713] pb-2 border-b border-[#E9DED0] mb-3">
                          Scent Family
                        </h4>
                        <ul className="space-y-2 text-xs text-[#393431]">
                          {scentProfiles.map((scent) => (
                            <li key={scent.id}>
                              <Link
                                to={`/shop?scent=${encodeURIComponent(scent.name)}`}
                                className="hover:text-[#C7A66A] block py-0.5"
                              >
                                {scent.name}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Col 3: Price Collections */}
                      <div>
                        <h4 className="text-xs font-bold uppercase tracking-wider text-[#211713] pb-2 border-b border-[#E9DED0] mb-3">
                          Curated Collections
                        </h4>
                        <ul className="space-y-2 text-xs text-[#393431]">
                          <li>
                            <Link to="/shop?tag=bestsellers" className="hover:text-[#C7A66A] block py-0.5">
                              The Bestsellers
                            </Link>
                          </li>
                          <li>
                            <Link to="/shop?tag=new-arrivals" className="hover:text-[#C7A66A] block py-0.5">
                              New Arrivals Drops
                            </Link>
                          </li>
                          <li>
                            <Link to="/shop?price=under-20k" className="hover:text-[#C7A66A] block py-0.5">
                              Under ₦20,000
                            </Link>
                          </li>
                          <li>
                            <Link to="/shop?price=under-50k" className="hover:text-[#C7A66A] block py-0.5">
                              Under ₦50,000
                            </Link>
                          </li>
                          <li>
                            <Link to="/shop?tag=sale" className="text-red-700 font-semibold hover:underline block py-0.5">
                              Special Offers &amp; Sale
                            </Link>
                          </li>
                        </ul>
                      </div>

                      {/* Col 4: Featured Scent Card */}
                      {soireePick && (
                        <div className="bg-[#FAF6EF] p-3 rounded-lg border border-[#E9DED0] flex flex-col justify-between">
                          <div>
                            <span className="text-[9px] uppercase font-bold text-[#C7A66A] tracking-wider block mb-1">
                              Staff Pick
                            </span>
                            <img
                              src={soireePick.images[0]}
                              alt={soireePick.name}
                              className="w-full h-24 object-cover rounded mb-2"
                            />
                            <h5 className="font-serif font-bold text-xs text-[#211713] line-clamp-1">
                              {soireePick.name}
                            </h5>
                            <p className="text-[10px] text-[#7A726C] line-clamp-2">
                              {soireePick.description}
                            </p>
                          </div>
                          <Link
                            to={`/product/${soireePick.slug}`}
                            className="text-[11px] font-bold text-[#211713] hover:text-[#C7A66A] flex items-center gap-1 mt-2"
                          >
                            Explore Duo <ArrowRight className="w-3 h-3" />
                          </Link>
                        </div>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Men Navigation Link */}
              <div
                className="relative h-full flex items-center"
                onMouseEnter={() => setActiveMegaMenu('men')}
                onMouseLeave={() => setActiveMegaMenu(null)}
              >
                <NavLink
                  to="/shop?category=men"
                  className={({ isActive }) =>
                    `nav-link-refined flex items-center gap-1 ${
                      isActive ? 'text-[#211713] active' : ''
                    }`
                  }
                >
                  <span>Men</span>
                  <ChevronDown className="w-3 h-3" />
                </NavLink>

                <AnimatePresence>
                  {activeMegaMenu === 'men' && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-full left-0 w-80 bg-white rounded-xl shadow-2xl border border-[#E9DED0] p-5 z-50 space-y-3"
                    >
                      <h4 className="text-xs font-bold uppercase tracking-wider text-[#211713] pb-1 border-b border-[#E9DED0]">
                        Men's Fragrance Styles
                      </h4>
                      <ul className="space-y-2 text-xs text-[#393431]">
                        <li>
                          <Link to="/shop?category=men" className="font-bold text-[#211713] hover:text-[#C7A66A] block">
                            All Men's Fragrances
                          </Link>
                        </li>
                        <li>
                          <Link to="/shop?category=men&scent=Woody+%26+Earthy" className="hover:text-[#C7A66A] block">
                            Woody &amp; Earthy Regals
                          </Link>
                        </li>
                        <li>
                          <Link to="/shop?category=men&scent=Fresh+%26+Citrus" className="hover:text-[#C7A66A] block">
                            Fresh &amp; Invigorating Citrus
                          </Link>
                        </li>
                        <li>
                          <Link to="/shop?category=men&scent=Amber+%26+Spicy" className="hover:text-[#C7A66A] block">
                            Amber &amp; Spicy Orientals
                          </Link>
                        </li>
                        <li>
                          <Link to="/shop?category=men&tag=beast-mode" className="hover:text-[#C7A66A] block">
                            Beast-Mode Projection Extraits
                          </Link>
                        </li>
                      </ul>
                      {shiyaakaPick && (
                        <div className="pt-2 border-t border-[#E9DED0] flex items-center gap-3">
                          <img
                            src={shiyaakaPick.images[0]}
                            alt={shiyaakaPick.name}
                            className="w-12 h-12 object-cover rounded bg-[#FAF6EF]"
                          />
                          <div>
                            <span className="text-[9px] uppercase font-bold text-[#C7A66A]">Featured</span>
                            <Link to={`/product/${shiyaakaPick.slug}`} className="block font-serif font-bold text-xs hover:text-[#C7A66A]">
                              Shiyaaka Luxury Gold
                            </Link>
                          </div>
                        </div>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Women Navigation Link */}
              <div
                className="relative h-full flex items-center"
                onMouseEnter={() => setActiveMegaMenu('women')}
                onMouseLeave={() => setActiveMegaMenu(null)}
              >
                <NavLink
                  to="/shop?category=women"
                  className={({ isActive }) =>
                    `nav-link-refined flex items-center gap-1 ${
                      isActive ? 'text-[#211713] active' : ''
                    }`
                  }
                >
                  <span>Women</span>
                  <ChevronDown className="w-3 h-3" />
                </NavLink>

                <AnimatePresence>
                  {activeMegaMenu === 'women' && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-full left-0 w-80 bg-white rounded-xl shadow-2xl border border-[#E9DED0] p-5 z-50 space-y-3"
                    >
                      <h4 className="text-xs font-bold uppercase tracking-wider text-[#211713] pb-1 border-b border-[#E9DED0]">
                        Women's Scent Profiles
                      </h4>
                      <ul className="space-y-2 text-xs text-[#393431]">
                        <li>
                          <Link to="/shop?category=women" className="font-bold text-[#211713] hover:text-[#C7A66A] block">
                            All Women's Fragrances
                          </Link>
                        </li>
                        <li>
                          <Link to="/shop?category=women&scent=Floral+%26+Romantic" className="hover:text-[#C7A66A] block">
                            Floral &amp; Romantic Bouquets
                          </Link>
                        </li>
                        <li>
                          <Link to="/shop?category=women&scent=Sweet+%26+Gourmand" className="hover:text-[#C7A66A] block">
                            Sweet Vanilla &amp; Gourmand Glaze
                          </Link>
                        </li>
                        <li>
                          <Link to="/shop?category=mist" className="hover:text-[#C7A66A] block">
                            Luminous Body Mists
                          </Link>
                        </li>
                        <li>
                          <Link to="/shop?category=oil" className="hover:text-[#C7A66A] block">
                            Concentrated Perfume Oils
                          </Link>
                        </li>
                      </ul>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Unisex Navigation Link */}
              <NavLink
                to="/shop?category=unisex"
                className={({ isActive }) =>
                  `nav-link-refined ${isActive ? 'text-[#211713] active' : ''}`
                }
              >
                Unisex
              </NavLink>

              {/* Collections Navigation Link */}
              <div
                className="relative h-full flex items-center"
                onMouseEnter={() => setActiveMegaMenu('collections')}
                onMouseLeave={() => setActiveMegaMenu(null)}
              >
                <NavLink
                  to="/shop?tag=collections"
                  className={({ isActive }) =>
                    `nav-link-refined flex items-center gap-1 ${
                      isActive ? 'text-[#211713] active' : ''
                    }`
                  }
                >
                  <span>Collections</span>
                  <ChevronDown className="w-3 h-3" />
                </NavLink>

                <AnimatePresence>
                  {activeMegaMenu === 'collections' && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-full left-0 w-72 bg-white rounded-xl shadow-2xl border border-[#E9DED0] p-5 z-50 space-y-2 text-xs"
                    >
                      <h4 className="text-xs font-bold uppercase tracking-wider text-[#211713] pb-1 border-b border-[#E9DED0] mb-2">
                        Special Edits
                      </h4>
                      <Link to="/shop?tag=bestsellers" className="block py-1 hover:text-[#C7A66A] text-[#393431]">
                        Bestselling Signatures
                      </Link>
                      <Link to="/shop?category=gift" className="block py-1 hover:text-[#C7A66A] text-[#393431]">
                        Layering Duos &amp; Gift Sets
                      </Link>
                      <Link to="/shop?category=oil" className="block py-1 hover:text-[#C7A66A] text-[#393431]">
                        100% Pure Alcohol-Free Attars
                      </Link>
                      <Link to="/shop?price=under-20k" className="block py-1 hover:text-[#C7A66A] text-[#393431]">
                        Everyday Luxuries under ₦20,000
                      </Link>
                      <Link to="/shop?tag=affordable-luxury" className="block py-1 hover:text-[#C7A66A] text-[#393431]">
                        Affordable Luxury Edit
                      </Link>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Bestsellers Navigation Link */}
              <NavLink
                to="/shop?tag=bestsellers"
                className={({ isActive }) =>
                  `nav-link-refined ${isActive ? 'text-[#211713] active' : ''}`
                }
              >
                Bestsellers
              </NavLink>

              {/* About Us Navigation Link */}
              <NavLink
                to="/about"
                className={({ isActive }) =>
                  `nav-link-refined ${isActive ? 'text-[#211713] active' : ''}`
                }
              >
                About Us
              </NavLink>
            </nav>

            {/* Right: Search, Account, Wishlist, Bag */}
            <div className="flex items-center gap-2 sm:gap-3">
              
              {/* Search Trigger */}
              <button
                onClick={() => setSearchOpen(true)}
                className="w-10 h-10 rounded-full flex items-center justify-center text-[#393431] hover:text-[#211713] hover:bg-[#E9DED0]/50 transition-colors"
                aria-label="Search perfumes"
              >
                <Search className="w-5 h-5" />
              </button>

              {/* Wishlist Link with Live Badge */}
              <Link
                to="/account/wishlist"
                className="relative w-10 h-10 rounded-full flex items-center justify-center text-[#393431] hover:text-[#211713] hover:bg-[#E9DED0]/50 transition-colors"
                aria-label="View saved fragrances"
              >
                <Heart className="w-5 h-5" />
                {wishlistCount > 0 && (
                  <span className="absolute top-1 right-1 w-4 h-4 bg-[#C7A66A] text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                    {wishlistCount}
                  </span>
                )}
              </Link>

              {/* Customer Account Dropdown */}
              <div className="relative hidden sm:block">
                <button
                  onClick={() => setAccountOpen((v) => !v)}
                  className="w-10 h-10 rounded-full flex items-center justify-center text-[#393431] hover:text-[#211713] hover:bg-[#E9DED0]/50 transition-colors"
                  aria-label="Account menu"
                >
                  <User className="w-5 h-5" />
                </button>

                <AnimatePresence>
                  {accountOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                      className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-2xl border border-[#E9DED0] py-2 z-50 text-xs"
                      onMouseLeave={() => setAccountOpen(false)}
                    >
                      {user ? (
                        <>
                          <div className="px-4 py-2 border-b border-[#E9DED0]">
                            <p className="text-[10px] uppercase font-bold text-[#C7A66A] tracking-wider">
                              Welcome back
                            </p>
                            <p className="font-serif font-bold text-sm text-[#211713] truncate">
                              {user.name}
                            </p>
                          </div>
                          <Link
                            to="/account/profile"
                            onClick={() => setAccountOpen(false)}
                            className="block px-4 py-2 hover:bg-[#FAF6EF] text-[#393431]"
                          >
                            My Profile &amp; Addresses
                          </Link>
                          <Link
                            to="/account/orders"
                            onClick={() => setAccountOpen(false)}
                            className="block px-4 py-2 hover:bg-[#FAF6EF] text-[#393431]"
                          >
                            Order History &amp; Tracking
                          </Link>
                          <Link
                            to="/account/wishlist"
                            onClick={() => setAccountOpen(false)}
                            className="block px-4 py-2 hover:bg-[#FAF6EF] text-[#393431]"
                          >
                            Saved Fragrances ({wishlistCount})
                          </Link>
                          <button
                            onClick={() => {
                              logout()
                              setAccountOpen(false)
                            }}
                            className="block w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 border-t border-[#E9DED0] mt-1"
                          >
                            Sign Out
                          </button>
                        </>
                      ) : (
                        <>
                          <div className="px-4 py-2 text-center">
                            <Link
                              to="/account/login"
                              onClick={() => setAccountOpen(false)}
                              className="w-full btn-espresso py-2 text-xs font-bold rounded mb-2 block text-center"
                            >
                              Sign In
                            </Link>
                            <Link
                              to="/account/signup"
                              onClick={() => setAccountOpen(false)}
                              className="text-[11px] font-semibold text-[#C7A66A] hover:underline"
                            >
                              New to Mama Fragrance? Register
                            </Link>
                          </div>
                        </>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Shopping Bag Button with Live Item Count */}
              <button
                onClick={() => setCartOpen(true)}
                className="btn-espresso h-10 px-3.5 sm:px-4 rounded flex items-center gap-2 text-xs"
                aria-label="Open fragrance bag"
              >
                <ShoppingBag className="w-4 h-4 text-[#C7A66A]" />
                <span className="hidden sm:inline font-sans font-semibold">Bag</span>
                <span className="bg-[#C7A66A] text-[#211713] text-[11px] font-bold px-1.5 py-0.2 rounded-full min-w-[18px] text-center">
                  {itemCount}
                </span>
              </button>

              {/* Mobile Hamburger Toggle Button */}
              <button
                onClick={() => setMobileOpen((v) => !v)}
                className="lg:hidden w-10 h-10 rounded flex items-center justify-center text-[#211713] hover:bg-[#E9DED0]/50 ml-1"
                aria-label="Toggle navigation menu"
              >
                {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* ── Mobile Navigation Drawer ── */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="lg:hidden bg-white border-t border-[#E9DED0] max-h-[80vh] overflow-y-auto"
            >
              <div className="section-pad py-6 space-y-4">
                
                {/* Search Bar in Mobile Menu */}
                <form
                  onSubmit={(e) => {
                    e.preventDefault()
                    setMobileOpen(false)
                    setSearchOpen(true)
                  }}
                  className="relative"
                >
                  <Search className="w-4 h-4 text-[#7A726C] absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    readOnly
                    onClick={() => {
                      setMobileOpen(false)
                      setSearchOpen(true)
                    }}
                    placeholder="Search all perfumes..."
                    className="w-full bg-[#FAF6EF] border border-[#E9DED0] rounded-lg pl-9 pr-3 py-2.5 text-xs text-[#211713] focus:outline-none"
                  />
                </form>

                {/* Nav Links Accordion */}
                <div className="divide-y divide-[#E9DED0] text-sm font-medium">
                  <NavLink
                    to="/"
                    onClick={() => setMobileOpen(false)}
                    className="block py-3 text-[#211713] hover:text-[#C7A66A]"
                  >
                    Home
                  </NavLink>

                  <div>
                    <button
                      onClick={() =>
                        setMobileExpandedCat(mobileExpandedCat === 'shop' ? null : 'shop')
                      }
                      className="w-full flex items-center justify-between py-3 text-[#211713]"
                    >
                      <span>Shop All Fragrances</span>
                      <ChevronDown
                        className={`w-4 h-4 transition-transform ${
                          mobileExpandedCat === 'shop' ? 'rotate-180' : ''
                        }`}
                      />
                    </button>
                    {mobileExpandedCat === 'shop' && (
                      <div className="pl-4 pb-3 space-y-2 text-xs text-[#7A726C]">
                        <Link
                          to="/shop"
                          onClick={() => setMobileOpen(false)}
                          className="block py-1 hover:text-[#211713] font-semibold text-[#211713]"
                        >
                          View Entire Collection
                        </Link>
                        <Link
                          to="/shop?category=men"
                          onClick={() => setMobileOpen(false)}
                          className="block py-1 hover:text-[#211713]"
                        >
                          Men's Fragrances
                        </Link>
                        <Link
                          to="/shop?category=women"
                          onClick={() => setMobileOpen(false)}
                          className="block py-1 hover:text-[#211713]"
                        >
                          Women's Fragrances
                        </Link>
                        <Link
                          to="/shop?category=unisex"
                          onClick={() => setMobileOpen(false)}
                          className="block py-1 hover:text-[#211713]"
                        >
                          Unisex Fragrances
                        </Link>
                        <Link
                          to="/shop?category=oil"
                          onClick={() => setMobileOpen(false)}
                          className="block py-1 hover:text-[#211713]"
                        >
                          Perfume Oils &amp; Attars
                        </Link>
                        <Link
                          to="/shop?category=mist"
                          onClick={() => setMobileOpen(false)}
                          className="block py-1 hover:text-[#211713]"
                        >
                          Body Mists
                        </Link>
                        <Link
                          to="/shop?category=gift"
                          onClick={() => setMobileOpen(false)}
                          className="block py-1 text-[#C7A66A] font-semibold"
                        >
                          Gift Sets &amp; Duos
                        </Link>
                      </div>
                    )}
                  </div>

                  <NavLink
                    to="/shop?category=men"
                    onClick={() => setMobileOpen(false)}
                    className="block py-3 text-[#211713] hover:text-[#C7A66A]"
                  >
                    Men's Fragrances
                  </NavLink>

                  <NavLink
                    to="/shop?category=women"
                    onClick={() => setMobileOpen(false)}
                    className="block py-3 text-[#211713] hover:text-[#C7A66A]"
                  >
                    Women's Fragrances
                  </NavLink>

                  <NavLink
                    to="/shop?category=unisex"
                    onClick={() => setMobileOpen(false)}
                    className="block py-3 text-[#211713] hover:text-[#C7A66A]"
                  >
                    Unisex Fragrances
                  </NavLink>

                  <NavLink
                    to="/shop?tag=bestsellers"
                    onClick={() => setMobileOpen(false)}
                    className="block py-3 text-[#211713] hover:text-[#C7A66A]"
                  >
                    The Bestsellers
                  </NavLink>

                  <NavLink
                    to="/about"
                    onClick={() => setMobileOpen(false)}
                    className="block py-3 text-[#211713] hover:text-[#C7A66A]"
                  >
                    About Mama Fragrance
                  </NavLink>
                </div>

                {/* Account Links */}
                <div className="pt-4 border-t border-[#E9DED0]">
                  {user ? (
                    <div className="space-y-2">
                      <p className="text-xs text-[#7A726C]">
                        Signed in as <strong className="text-[#211713]">{user.name}</strong>
                      </p>
                      <div className="grid grid-cols-2 gap-2 text-xs">
                        <Link
                          to="/account/orders"
                          onClick={() => setMobileOpen(false)}
                          className="p-2 bg-[#FAF6EF] rounded text-center font-semibold text-[#211713]"
                        >
                          My Orders
                        </Link>
                        <Link
                          to="/account/wishlist"
                          onClick={() => setMobileOpen(false)}
                          className="p-2 bg-[#FAF6EF] rounded text-center font-semibold text-[#211713]"
                        >
                          Saved ({wishlistCount})
                        </Link>
                      </div>
                      <button
                        onClick={() => {
                          logout()
                          setMobileOpen(false)
                        }}
                        className="text-xs text-red-600 font-semibold pt-1"
                      >
                        Sign Out
                      </button>
                    </div>
                  ) : (
                    <div className="flex gap-2">
                      <Link
                        to="/account/login"
                        onClick={() => setMobileOpen(false)}
                        className="flex-1 btn-espresso text-center py-2.5 text-xs rounded"
                      >
                        Sign In
                      </Link>
                      <Link
                        to="/account/signup"
                        onClick={() => setMobileOpen(false)}
                        className="flex-1 btn-champagne text-center py-2.5 text-xs rounded"
                      >
                        Register
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* ── 3. Mobile Sticky Bottom Quick-Access Bar ── */}
      <div className="fixed bottom-0 inset-x-0 z-30 lg:hidden bg-white/95 backdrop-blur-md border-t border-[#E9DED0] px-4 py-2 pb-[max(0.5rem,env(safe-area-inset-bottom))] shadow-luxury">
        <div className="flex items-center justify-around max-w-md mx-auto">
          <Link
            to="/"
            className="flex flex-col items-center gap-0.5 py-1 text-[#7A726C] hover:text-[#211713]"
          >
            <Home className="w-4 h-4" />
            <span className="text-[10px] font-medium tracking-wide">Home</span>
          </Link>

          <Link
            to="/shop"
            className="flex flex-col items-center gap-0.5 py-1 text-[#7A726C] hover:text-[#211713]"
          >
            <Compass className="w-4 h-4" />
            <span className="text-[10px] font-medium tracking-wide">Shop</span>
          </Link>

          <Link
            to="/account/wishlist"
            className="relative flex flex-col items-center gap-0.5 py-1 text-[#7A726C] hover:text-[#211713]"
          >
            <Heart className="w-4 h-4" />
            {wishlistCount > 0 && (
              <span className="absolute -top-1 right-2 w-3.5 h-3.5 bg-[#C7A66A] text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                {wishlistCount}
              </span>
            )}
            <span className="text-[10px] font-medium tracking-wide">Wishlist</span>
          </Link>

          <button
            onClick={() => setCartOpen(true)}
            className="relative flex flex-col items-center gap-0.5 py-1 text-[#211713]"
          >
            <ShoppingBag className="w-4 h-4 text-[#C7A66A]" />
            {itemCount > 0 && (
              <span className="absolute -top-1 right-2 w-3.5 h-3.5 bg-[#211713] text-[#FAF6EF] text-[9px] font-bold rounded-full flex items-center justify-center">
                {itemCount}
              </span>
            )}
            <span className="text-[10px] font-bold tracking-wide">Bag</span>
          </button>
        </div>
      </div>

      {/* Cart Drawer and Search Modal Instances */}
      <CartDrawer isOpen={cartOpen} onClose={() => setCartOpen(false)} />
      <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  )
}
