import { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import {
  Heart,
  ShoppingBag,
  Star,
  Truck,
  ShieldCheck,
  RotateCcw,
  Sparkles,
  ChevronRight,
  Plus,
  Minus,
  Check,
  Clock,
  Wind,
  Layers,
  Award,
  ArrowRight,
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { products, getProductBySlug } from '../data/products'
import { formatPrice, discountPercent } from '../utils/helpers'
import { useCartStore } from '../store/cartStore'
import { useWishlistStore } from '../store/wishlistStore'
import ProductCard from '../components/product/ProductCard'
import MotionSection from '../components/common/MotionSection'
import toast from 'react-hot-toast'

export default function ProductDetailPage() {
  const { slug } = useParams()
  const navigate = useNavigate()
  const product = getProductBySlug(slug)

  const [activeImageIndex, setActiveImageIndex] = useState(0)
  const [selectedVolume, setSelectedVolume] = useState('')
  const [quantity, setQuantity] = useState(1)
  const [activeTab, setActiveTab] = useState('notes') // 'notes' | 'description' | 'specs' | 'delivery'
  const [userReviewText, setUserReviewText] = useState('')
  const [userRating, setUserRating] = useState(5)
  const [reviewsList, setReviewsList] = useState([])
  const [recentlyViewed, setRecentlyViewed] = useState([])

  const addItem = useCartStore((s) => s.addItem)
  const { isWishlisted, toggle: toggleWishlist } = useWishlistStore()

  // Track recently viewed products in localStorage
  useEffect(() => {
    if (!product) return

    setSelectedVolume(product.volumes ? product.volumes[0] : 'Standard')
    setActiveImageIndex(0)
    setQuantity(1)

    // Load initial sample reviews for this product
    setReviewsList([
      {
        id: 'rev-1',
        author: 'Damilola A.',
        rating: 5,
        date: '3 weeks ago',
        verified: true,
        text: `Authentic masterpiece! The projection lasts beyond expectations. I've received so many compliments since I started wearing ${product.name}.`,
      },
      {
        id: 'rev-2',
        author: 'Emeka K.',
        rating: 5,
        date: '1 month ago',
        verified: true,
        text: 'Fast dispatch to Abuja. Packaging was secure with intact seal. Smell as good as you look!',
      },
    ])

    // Update recently viewed
    try {
      const stored = JSON.parse(localStorage.getItem('mama-recently-viewed') || '[]')
      const filtered = stored.filter((id) => id !== product.id)
      const updated = [product.id, ...filtered].slice(0, 6)
      localStorage.setItem('mama-recently-viewed', JSON.stringify(updated))

      const recentProducts = updated
        .filter((id) => id !== product.id)
        .map((id) => products.find((p) => p.id === id))
        .filter(Boolean)
      setRecentlyViewed(recentProducts)
    } catch (e) {
      console.error(e)
    }
  }, [product, slug])

  if (!product) {
    return (
      <div className="section-pad py-24 text-center">
        <h2 className="font-serif text-3xl font-bold text-[#211713] mb-3">
          Fragrance Not Found
        </h2>
        <p className="text-sm text-[#7A726C] mb-6">
          The fragrance you are looking for might have been moved or is currently unavailable.
        </p>
        <Link to="/shop" className="btn-espresso px-8 py-3 text-xs">
          Return to Fragrance Vault
        </Link>
      </div>
    )
  }

  const wishlisted = isWishlisted(product.id)

  const currentPrice =
    product.sizePrices && product.sizePrices[selectedVolume]
      ? product.sizePrices[selectedVolume]
      : product.price

  const hasDiscount = product.originalPrice && product.originalPrice > currentPrice
  const discountPct = hasDiscount
    ? discountPercent(product.originalPrice, currentPrice)
    : 0

  const handleAddToCart = () => {
    addItem(product, selectedVolume, quantity, currentPrice)
    toast.success(`Added ${quantity} × ${product.name} (${selectedVolume}) to your bag`)
  }

  const handleBuyNow = () => {
    addItem(product, selectedVolume, quantity, currentPrice)
    navigate('/checkout')
  }

  const handleWishlistToggle = () => {
    const added = toggleWishlist(product.id)
    if (added) {
      toast.success(`Saved to your Wishlist`)
    } else {
      toast('Removed from Wishlist', { icon: '🤍' })
    }
  }

  const handleReviewSubmit = (e) => {
    e.preventDefault()
    if (!userReviewText.trim()) return

    const newRev = {
      id: Date.now().toString(),
      author: 'You (Verified Buyer)',
      rating: userRating,
      date: 'Just now',
      verified: true,
      text: userReviewText.trim(),
    }

    setReviewsList([newRev, ...reviewsList])
    setUserReviewText('')
    toast.success('Thank you for sharing your fragrance experience!')
  }

  // Related products from same category or scent family
  const relatedProducts = products
    .filter(
      (p) =>
        p.id !== product.id &&
        (p.category === product.category ||
          p.scentProfile === product.scentProfile ||
          p.gender === product.gender)
    )
    .slice(0, 4)

  return (
    <div className="bg-[#FAF6EF] min-h-screen pb-20">
      
      {/* ── Breadcrumb Navigation ── */}
      <div className="border-b border-[#E9DED0] bg-[#FCFAF6] py-3.5">
        <div className="section-pad flex items-center gap-2 text-xs text-[#7A726C] overflow-x-auto no-scrollbar">
          <Link to="/" className="hover:text-[#211713] transition-colors shrink-0">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5 shrink-0" />
          <Link to="/shop" className="hover:text-[#211713] transition-colors shrink-0">
            Shop
          </Link>
          <ChevronRight className="w-3.5 h-3.5 shrink-0" />
          <Link
            to={`/shop?category=${product.category}`}
            className="hover:text-[#211713] transition-colors shrink-0 uppercase text-[11px] font-semibold"
          >
            {product.category}
          </Link>
          <ChevronRight className="w-3.5 h-3.5 shrink-0" />
          <span className="text-[#211713] font-semibold truncate">
            {product.name}
          </span>
        </div>
      </div>

      {/* ── Main Product Display Grid ── */}
      <div className="section-pad py-10 sm:py-14">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          
          {/* ── Left Column: Image Gallery & Thumbnails (5 cols) ── */}
          <div className="lg:col-span-6 space-y-4">
            
            {/* Large Primary Image Display */}
            <div className="relative aspect-[4/4.5] w-full rounded-2xl overflow-hidden bg-white border border-[#E9DED0] shadow-sm group">
              <img
                src={product.images[activeImageIndex] || product.images[0]}
                alt={product.name}
                className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
              />

              {/* Badges on Image */}
              <div className="absolute top-4 left-4 flex flex-col gap-2 pointer-events-none">
                {hasDiscount && (
                  <span className="bg-[#211713] text-[#FAF6EF] text-xs font-bold px-3 py-1 rounded tracking-wider uppercase shadow-md">
                    Save {discountPct}%
                  </span>
                )}
                {product.bestSeller && (
                  <span className="bg-[#C7A66A] text-white text-xs font-bold px-3 py-1 rounded tracking-wider uppercase shadow-md">
                    Bestseller
                  </span>
                )}
              </div>

              {/* Wishlist Button */}
              <button
                onClick={handleWishlistToggle}
                className={`absolute top-4 right-4 z-10 w-11 h-11 rounded-full flex items-center justify-center transition-all ${
                  wishlisted
                    ? 'bg-[#211713] text-[#C7A66A] shadow-md'
                    : 'bg-white/90 backdrop-blur-md text-[#393431] hover:text-[#211713] hover:bg-white shadow-sm'
                }`}
                aria-label="Toggle Wishlist"
              >
                <Heart
                  className={`w-5 h-5 ${wishlisted ? 'fill-[#C7A66A] text-[#C7A66A]' : ''}`}
                />
              </button>
            </div>

            {/* Thumbnail Navigation */}
            {product.images.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-2">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`relative w-20 h-20 rounded-xl overflow-hidden bg-white border-2 transition-all shrink-0 ${
                      activeImageIndex === idx
                        ? 'border-[#C7A66A] ring-2 ring-[#C7A66A]/30 shadow-md'
                        : 'border-[#E9DED0] opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img
                      src={img}
                      alt={`${product.name} thumbnail ${idx + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* ── Right Column: Product Details & Buying Actions (7 cols) ── */}
          <div className="lg:col-span-6 space-y-6">
            
            {/* Subtitle & Scent Profile */}
            <div className="flex items-center justify-between gap-2">
              <span className="text-xs uppercase font-bold tracking-[0.2em] text-[#C7A66A]">
                {product.subtitle || product.gender}
              </span>
              {product.scentProfile && (
                <span className="text-xs font-semibold px-3 py-1 rounded-full bg-[#FAF6EF] border border-[#E9DED0] text-[#393431]">
                  {product.scentProfile}
                </span>
              )}
            </div>

            {/* Title */}
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#211713] leading-tight">
              {product.name}
            </h1>

            {/* Rating Stars & Reviews Count */}
            <div className="flex items-center gap-3">
              <div className="flex text-[#C7A66A]">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < Math.floor(product.rating || 5)
                        ? 'fill-[#C7A66A] text-[#C7A66A]'
                        : 'text-[#E9DED0]'
                    }`}
                  />
                ))}
              </div>
              <span className="text-xs font-semibold text-[#211713]">
                {product.rating || 5.0}
              </span>
              <span className="text-xs text-[#7A726C]">
                ({product.reviewCount || 60} verified customer reviews)
              </span>
            </div>

            {/* Price Display */}
            <div className="p-4 rounded-xl bg-white border border-[#E9DED0] flex items-baseline gap-3">
              <span className="font-sans font-bold text-2xl sm:text-3xl text-[#211713]">
                {formatPrice(currentPrice)}
              </span>
              {hasDiscount && (
                <span className="text-sm sm:text-base text-[#7A726C] line-through">
                  {formatPrice(product.originalPrice)}
                </span>
              )}
              {hasDiscount && (
                <span className="ml-auto text-xs font-bold text-green-700 bg-green-50 px-2.5 py-1 rounded">
                  Save {formatPrice(product.originalPrice - currentPrice)} ({discountPct}%)
                </span>
              )}
            </div>

            {/* Volume / Size Variant Selector */}
            {product.volumes && product.volumes.length > 0 && (
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="font-bold uppercase tracking-wider text-[#211713]">
                    Select Bottle Size / Flacon
                  </span>
                  <span className="text-[#7A726C]">Selected: {selectedVolume}</span>
                </div>
                <div className="flex flex-wrap gap-2.5">
                  {product.volumes.map((vol) => {
                    const priceForVol =
                      product.sizePrices?.[vol] || product.price
                    return (
                      <button
                        key={vol}
                        onClick={() => setSelectedVolume(vol)}
                        className={`px-4 py-2.5 rounded-lg border text-xs font-semibold transition-all flex items-center gap-2 ${
                          selectedVolume === vol
                            ? 'border-[#211713] bg-[#211713] text-[#FAF6EF] shadow-sm'
                            : 'border-[#E9DED0] bg-white text-[#393431] hover:border-[#C7A66A]'
                        }`}
                      >
                        <span>{vol}</span>
                        <span className="text-[11px] opacity-75">
                          ({formatPrice(priceForVol)})
                        </span>
                      </button>
                    )
                  })}
                </div>
              </div>
            )}

            {/* Stock Availability */}
            <div className="flex items-center gap-2 text-xs text-green-800 font-semibold bg-green-50/80 border border-green-200/60 p-3 rounded-lg">
              <Check className="w-4 h-4 text-green-700" />
              <span>
                In Stock — Ready for immediate dispatch from our Lagos perfume studio.
              </span>
            </div>

            {/* Quantity Selector & CTA Buttons */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-3">
                {/* Quantity */}
                <div className="flex items-center border border-[#E9DED0] rounded-lg bg-white h-12">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="px-3 hover:bg-[#FAF6EF] text-[#393431] h-full flex items-center transition-colors"
                    aria-label="Decrease quantity"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="px-4 text-sm font-bold text-[#211713]">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity((q) => q + 1)}
                    className="px-3 hover:bg-[#FAF6EF] text-[#393431] h-full flex items-center transition-colors"
                    aria-label="Increase quantity"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Add to Bag Button */}
                <button
                  onClick={handleAddToCart}
                  className="btn-champagne flex-1 h-12 text-xs font-bold rounded shadow-md flex items-center justify-center gap-2"
                >
                  <ShoppingBag className="w-4 h-4 text-[#211713]" />
                  <span>Add to Fragrance Bag</span>
                </button>
              </div>

              {/* Buy Now Button */}
              <button
                onClick={handleBuyNow}
                className="w-full btn-espresso h-12 text-xs font-bold rounded shadow-lg flex items-center justify-center gap-2"
              >
                <span>Instant Buy Now</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Fast Delivery & Trust Highlights */}
            <div className="grid grid-cols-2 gap-3 pt-4 border-t border-[#E9DED0] text-xs text-[#393431]">
              <div className="flex items-center gap-2.5 p-3 rounded-lg bg-white border border-[#E9DED0]">
                <Truck className="w-4 h-4 text-[#C7A66A] shrink-0" />
                <span>Lagos Delivery: <strong>1–2 Days</strong></span>
              </div>
              <div className="flex items-center gap-2.5 p-3 rounded-lg bg-white border border-[#E9DED0]">
                <ShieldCheck className="w-4 h-4 text-[#C7A66A] shrink-0" />
                <span>100% Guaranteed <strong>Authentic</strong></span>
              </div>
            </div>

            {/* ── Accordion Tabs: Notes, Description, Specifications, Delivery ── */}
            <div className="pt-4 border-t border-[#E9DED0] space-y-3">
              
              {/* Tab Navigation */}
              <div className="flex border-b border-[#E9DED0] overflow-x-auto gap-4 sm:gap-6 text-xs font-bold uppercase tracking-wider">
                <button
                  onClick={() => setActiveTab('notes')}
                  className={`pb-3 border-b-2 transition-all ${
                    activeTab === 'notes'
                      ? 'border-[#C7A66A] text-[#211713]'
                      : 'border-transparent text-[#7A726C] hover:text-[#211713]'
                  }`}
                >
                  Fragrance Notes
                </button>
                <button
                  onClick={() => setActiveTab('description')}
                  className={`pb-3 border-b-2 transition-all ${
                    activeTab === 'description'
                      ? 'border-[#C7A66A] text-[#211713]'
                      : 'border-transparent text-[#7A726C] hover:text-[#211713]'
                  }`}
                >
                  Story &amp; Description
                </button>
                <button
                  onClick={() => setActiveTab('specs')}
                  className={`pb-3 border-b-2 transition-all ${
                    activeTab === 'specs'
                      ? 'border-[#C7A66A] text-[#211713]'
                      : 'border-transparent text-[#7A726C] hover:text-[#211713]'
                  }`}
                >
                  Performance &amp; Sillage
                </button>
                <button
                  onClick={() => setActiveTab('delivery')}
                  className={`pb-3 border-b-2 transition-all ${
                    activeTab === 'delivery'
                      ? 'border-[#C7A66A] text-[#211713]'
                      : 'border-transparent text-[#7A726C] hover:text-[#211713]'
                  }`}
                >
                  Delivery &amp; Policy
                </button>
              </div>

              {/* Tab Content Panels */}
              <div className="py-3 text-xs text-[#393431] leading-relaxed">
                {activeTab === 'notes' && product.notes && (
                  <div className="space-y-4 bg-white p-5 rounded-xl border border-[#E9DED0]">
                    <div>
                      <h4 className="font-serif font-bold text-sm text-[#211713] mb-1 flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-[#C7A66A]" /> Top Notes (Opening 15 mins)
                      </h4>
                      <p className="text-[#7A726C]">{product.notes.top.join(', ')}</p>
                    </div>
                    <div className="pt-3 border-t border-[#FAF6EF]">
                      <h4 className="font-serif font-bold text-sm text-[#211713] mb-1 flex items-center gap-1.5">
                        <Layers className="w-3.5 h-3.5 text-[#C7A66A]" /> Heart Notes (Core Scent Trail)
                      </h4>
                      <p className="text-[#7A726C]">{product.notes.middle.join(', ')}</p>
                    </div>
                    <div className="pt-3 border-t border-[#FAF6EF]">
                      <h4 className="font-serif font-bold text-sm text-[#211713] mb-1 flex items-center gap-1.5">
                        <Award className="w-3.5 h-3.5 text-[#C7A66A]" /> Base Notes (All-Day Drydown)
                      </h4>
                      <p className="text-[#7A726C]">{product.notes.base.join(', ')}</p>
                    </div>
                  </div>
                )}

                {activeTab === 'description' && (
                  <div className="bg-white p-5 rounded-xl border border-[#E9DED0] space-y-3">
                    <p>{product.description}</p>
                    {product.contents && (
                      <div className="pt-3 border-t border-[#FAF6EF]">
                        <h4 className="font-bold text-xs uppercase text-[#211713] mb-2">
                          Package Contents:
                        </h4>
                        <ul className="list-disc list-inside space-y-1 text-[#7A726C]">
                          {product.contents.map((item, idx) => (
                            <li key={idx}>{item}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                )}

                {activeTab === 'specs' && (
                  <div className="bg-white p-5 rounded-xl border border-[#E9DED0] grid grid-cols-2 gap-4">
                    <div>
                      <span className="text-[#7A726C] block">Longevity on Skin:</span>
                      <strong className="text-[#211713]">{product.longevity || '12+ Hours'}</strong>
                    </div>
                    <div>
                      <span className="text-[#7A726C] block">Sillage Projection:</span>
                      <strong className="text-[#211713]">{product.sillage || 'Colossal'}</strong>
                    </div>
                    <div>
                      <span className="text-[#7A726C] block">Intensity Rating:</span>
                      <strong className="text-[#211713]">{product.intensity || 'Strong'}</strong>
                    </div>
                    <div>
                      <span className="text-[#7A726C] block">Recommended Occasion:</span>
                      <strong className="text-[#211713]">{product.occasion || 'Versatile Luxury'}</strong>
                    </div>
                  </div>
                )}

                {activeTab === 'delivery' && (
                  <div className="bg-white p-5 rounded-xl border border-[#E9DED0] space-y-3">
                    <p>
                      <strong>Lagos Deliveries:</strong> Dispatched via private courier within 24 to 48 hours. Same-day express available upon checkout request.
                    </p>
                    <p>
                      <strong>Interstate Deliveries:</strong> Dispatched via verified nationwide couriers (Abuja, Port Harcourt, Ibadan, Kano, etc.) in 2 to 4 business days.
                    </p>
                    <p>
                      <strong>Returns &amp; Exchanges:</strong> Due to hygiene standards, opened fragrance bottles cannot be returned. If an item arrives damaged or sealed defective, immediate replacement is guaranteed within 48 hours of delivery.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Verified Customer Reviews Section ── */}
      <div className="section-pad py-12 border-t border-[#E9DED0]">
        <div className="max-w-4xl">
          <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#211713] mb-6">
            Customer Reviews ({reviewsList.length})
          </h3>

          {/* Review Submission Form */}
          <form
            onSubmit={handleReviewSubmit}
            className="p-6 bg-white rounded-2xl border border-[#E9DED0] mb-8 space-y-4 shadow-sm"
          >
            <h4 className="font-serif font-bold text-base text-[#211713]">
              Share your thoughts on {product.name}
            </h4>
            
            <div className="flex items-center gap-2">
              <span className="text-xs text-[#7A726C]">Your Rating:</span>
              <div className="flex text-[#C7A66A]">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setUserRating(star)}
                    className="p-0.5 hover:scale-110 transition-transform"
                  >
                    <Star
                      className={`w-5 h-5 ${
                        star <= userRating ? 'fill-[#C7A66A] text-[#C7A66A]' : 'text-[#E9DED0]'
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>

            <textarea
              rows={3}
              value={userReviewText}
              onChange={(e) => setUserReviewText(e.target.value)}
              placeholder="How does this fragrance smell on your skin? How long did it last? Share your genuine experience..."
              required
              className="w-full bg-[#FAF6EF] border border-[#E9DED0] rounded-xl p-3 text-xs text-[#211713] focus:outline-none focus:border-[#C7A66A]"
            />

            <button type="submit" className="btn-espresso px-6 py-2.5 text-xs font-bold rounded">
              Submit Fragrance Review
            </button>
          </form>

          {/* Reviews List */}
          <div className="space-y-4">
            {reviewsList.map((rev) => (
              <div
                key={rev.id}
                className="p-5 bg-white rounded-xl border border-[#E9DED0] space-y-2 shadow-sm"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-serif font-bold text-sm text-[#211713]">
                      {rev.author}
                    </span>
                    {rev.verified && (
                      <span className="text-[10px] text-green-700 bg-green-50 px-2 py-0.5 rounded font-bold">
                        Verified Order
                      </span>
                    )}
                  </div>
                  <span className="text-[11px] text-[#7A726C]">{rev.date}</span>
                </div>

                <div className="flex text-[#C7A66A]">
                  {Array.from({ length: rev.rating }).map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-[#C7A66A] text-[#C7A66A]" />
                  ))}
                </div>

                <p className="text-xs text-[#393431] leading-relaxed">{rev.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Related Fragrances Carousel / Grid ── */}
      {relatedProducts.length > 0 && (
        <div className="section-pad py-12 border-t border-[#E9DED0]">
          <div className="flex items-center justify-between mb-8">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#C7A66A]">
                COMPLETE YOUR WARDROBE
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#211713]">
                You May Also Like
              </h3>
            </div>
            <Link
              to="/shop"
              className="text-xs font-bold text-[#211713] hover:text-[#C7A66A] flex items-center gap-1"
            >
              View All <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      )}

      {/* ── Recently Viewed Section ── */}
      {recentlyViewed.length > 0 && (
        <div className="section-pad py-12 border-t border-[#E9DED0]">
          <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#211713] mb-6">
            Recently Viewed Fragrances
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {recentlyViewed.slice(0, 4).map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
