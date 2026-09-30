import { useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import {
  Heart,
  ShoppingBag,
  Share2,
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  MessageCircle,
  ShieldCheck,
  Zap,
  Sparkles,
  Flame,
  Star,
} from 'lucide-react'
import { getProductBySlug, products } from '../data/products'
import { useCartStore } from '../store/cartStore'
import { useWishlistStore } from '../store/wishlistStore'
import { formatPrice, discountPercent } from '../utils/helpers'
import { whatsAppProductEnquiry } from '../utils/whatsapp'
import { getCategoryLabel } from '../data/categories'
import StarRating from '../components/ui/StarRating'
import Badge from '../components/ui/Badge'
import ProductCard from '../components/product/ProductCard'
import toast from 'react-hot-toast'
import { motion } from 'framer-motion'

const mockReviews = [
  {
    name: 'Adaeze O.',
    rating: 5,
    date: '2024-03-10',
    text: '“Hands down the best perfume purchase I made this year. The projection is monstrous and people kept stopping me to ask what I was wearing!”',
  },
  {
    name: 'Femi K.',
    rating: 5,
    date: '2024-02-25',
    text: '“100% original stock. Fast delivery in Lagos and the packaging was pure luxury. Smell as good as you look for real!”',
  },
  {
    name: 'Amina S.',
    rating: 5,
    date: '2024-01-18',
    text: '“The notes evolve so smoothly throughout the entire day. Even my clothes still smell like it two days later.”',
  },
]

export default function ProductDetailPage() {
  const { slug } = useParams()
  const navigate = useNavigate()
  const product = getProductBySlug(slug)

  const [selectedVolume, setSelectedVolume] = useState(
    product?.volumes?.[0]
  )
  const [currentImage, setCurrentImage] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [activeTab, setActiveTab] = useState('notes')

  const { addItem } = useCartStore()
  const { toggle, isWishlisted } = useWishlistStore()
  const wishlisted = product ? isWishlisted(product.id) : false

  if (!product) {
    return (
      <div className="section-pad py-24 text-center">
        <h2 className="font-syne text-3xl text-white mb-4">
          Fragrance not found in Vault
        </h2>
        <Link to="/shop" className="btn-futuristic inline-block px-8 py-3.5 rounded-xl text-xs font-bold">
          Return to Vault
        </Link>
      </div>
    )
  }

  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4)

  const discount = discountPercent(product.originalPrice, product.price)

  const handleAddToCart = () => {
    addItem(product, selectedVolume || product.volumes[0], quantity)
    toast.success(`${product.name} added to Vault! ✨`, {
      icon: '🛒',
      duration: 3000,
    })
  }

  const handleWishlist = () => {
    const added = toggle(product.id)
    toast(added ? '❤️ Saved to Wishlist' : 'Removed from Wishlist', {
      duration: 2000,
    })
  }

  return (
    <div className="section-pad py-12">
      {/* Breadcrumb Navigation */}
      <nav className="flex items-center gap-2 text-xs font-space text-cream-muted mb-8 overflow-x-auto pb-1">
        <Link to="/" className="hover:text-gold-bright transition-colors">Home</Link>
        <span>/</span>
        <Link to="/shop" className="hover:text-gold-bright transition-colors">Vault</Link>
        <span>/</span>
        <Link to={`/shop?category=${product.category}`} className="hover:text-gold-bright transition-colors">
          {getCategoryLabel(product.category)}
        </Link>
        <span>/</span>
        <span className="text-gold-bright font-bold truncate">{product.name}</span>
      </nav>

      {/* Main Grid: Visuals & Spec Sheet */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-24 items-start">
        
        {/* Left Column: Visual Flacon Stage */}
        <div className="lg:col-span-6 flex flex-col gap-4">
          <div className="relative aspect-square rounded-3xl overflow-hidden glass-panel p-2 border border-gold/30 shadow-2xl bg-[#050508]">
            <img
              src={product.images[currentImage] || product.images[0]}
              alt={product.name}
              className="w-full h-full object-cover rounded-2xl"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60" />

            {/* Badges */}
            <div className="absolute top-5 left-5 flex flex-col gap-2">
              {product.stockPhoto && (
                <span className="bg-gold-bright text-black font-space font-extrabold text-[10px] uppercase tracking-wider px-3 py-1 rounded-full shadow-[0_0_15px_#ffd700]">
                  Verified Stock Photo
                </span>
              )}
              {discount > 0 && <Badge variant="sale">-{discount}% OFF</Badge>}
            </div>

            {/* Image Dots if multiple */}
            {product.images.length > 1 && (
              <div className="absolute bottom-5 right-5 flex gap-2">
                {product.images.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentImage(i)}
                    className={`w-3 h-3 rounded-full transition-all ${
                      i === currentImage ? 'bg-gold-bright scale-125' : 'bg-white/30 hover:bg-white/60'
                    }`}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Thumbnails */}
          {product.images.length > 1 && (
            <div className="flex gap-3">
              {product.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentImage(i)}
                  className={`w-20 h-20 rounded-xl overflow-hidden border-2 transition-all ${
                    i === currentImage ? 'border-gold-bright shadow-[0_0_15px_rgba(212,175,55,0.5)]' : 'border-white/10 opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="Thumbnail" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right Column: Specifications & Purchasing Controls */}
        <div className="lg:col-span-6 flex flex-col">
          <div className="cyber-badge mb-3 self-start">
            <Sparkles className="w-3.5 h-3.5 text-gold-bright" />
            <span>{product.fragranceFamily}</span>
          </div>

          <h1 className="font-syne text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-2 leading-tight">
            {product.name}
          </h1>

          {product.subtitle && (
            <p className="font-cinzel text-gold-light italic text-lg sm:text-xl mb-4 font-semibold">
              {product.subtitle}
            </p>
          )}

          {/* Star Rating & Review count */}
          <div className="flex items-center gap-3 mb-6">
            <StarRating rating={product.rating} size="md" showCount count={product.reviewCount} />
            <span className="text-xs text-cream-muted font-space">• 100% Genuine Sealed Stock</span>
          </div>

          {/* Price Block */}
          <div className="flex items-baseline gap-4 mb-6 p-4 rounded-2xl bg-white/[0.02] border border-white/10 w-fit">
            <span className="font-syne text-3xl sm:text-4xl font-extrabold text-gold-bright">
              {formatPrice(product.price)}
            </span>
            {product.originalPrice && (
              <span className="text-cream-muted text-lg line-through font-space">
                {formatPrice(product.originalPrice)}
              </span>
            )}
          </div>

          {/* Performance Radar Matrix */}
          <div className="grid grid-cols-3 gap-3 mb-8 p-4 rounded-2xl glass-panel border border-gold/20 text-center">
            <div>
              <div className="text-[10px] text-cream-muted font-space uppercase">Longevity</div>
              <div className="text-xs sm:text-sm font-syne font-bold text-white mt-1">
                {product.longevity || '14+ Hours'}
              </div>
            </div>
            <div className="border-x border-white/10">
              <div className="text-[10px] text-cream-muted font-space uppercase">Sillage</div>
              <div className="text-xs sm:text-sm font-syne font-bold text-gold-bright mt-1">
                {product.sillage || 'Colossal'}
              </div>
            </div>
            <div>
              <div className="text-[10px] text-cream-muted font-space uppercase">Intensity</div>
              <div className="text-xs sm:text-sm font-syne font-bold text-white mt-1">
                {product.scentIntensity || '98%'}
              </div>
            </div>
          </div>

          {/* Short Description */}
          <p className="text-cream-soft text-sm sm:text-base leading-relaxed mb-8 font-light">
            {product.description}
          </p>

          {/* Size / Flacon Selector */}
          <div className="mb-6">
            <div className="text-xs font-space font-bold uppercase tracking-wider text-gold-bright mb-3">
              SELECT FLACON SIZE:
            </div>
            <div className="flex flex-wrap gap-3">
              {product.volumes.map((vol) => (
                <button
                  key={vol}
                  onClick={() => setSelectedVolume(vol)}
                  className={`px-5 py-2.5 rounded-xl text-xs font-space font-bold uppercase transition-all ${
                    (selectedVolume || product.volumes[0]) === vol
                      ? 'bg-gold-bright text-black shadow-[0_0_15px_#ffd700]'
                      : 'bg-white/5 text-cream-soft hover:bg-white/10 border border-white/10'
                  }`}
                >
                  {vol}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity selector & CTA buttons */}
          <div className="flex flex-col sm:flex-row gap-3 mb-6">
            {/* Quantity */}
            <div className="flex items-center rounded-xl bg-white/5 border border-white/10 px-2">
              <button
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="p-3 text-cream-soft hover:text-gold"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <span className="px-4 font-space font-bold text-white text-sm">{quantity}</span>
              <button
                onClick={() => setQuantity((q) => q + 1)}
                className="p-3 text-cream-soft hover:text-gold"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Add to Cart */}
            <button
              onClick={handleAddToCart}
              className="btn-futuristic flex-1 py-4 px-6 rounded-xl text-xs font-extrabold flex items-center justify-center gap-2"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Add to Vault ({formatPrice(product.price * quantity)})</span>
            </button>

            {/* Wishlist */}
            <button
              onClick={handleWishlist}
              className={`p-4 rounded-xl border transition-all ${
                wishlisted
                  ? 'bg-gold border-gold text-black'
                  : 'bg-white/5 border-white/10 text-cream-soft hover:border-gold hover:text-gold'
              }`}
              title="Save to wishlist"
            >
              <Heart className={`w-5 h-5 ${wishlisted ? 'fill-black' : ''}`} />
            </button>

            {/* Direct WhatsApp Order */}
            <a
              href={whatsAppProductEnquiry(product.name)}
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 rounded-xl bg-[#25D366]/20 border border-[#25D366]/50 text-[#25D366] hover:bg-[#25D366] hover:text-black transition-all flex items-center justify-center"
              title="Direct Order via WhatsApp"
            >
              <MessageCircle className="w-5 h-5" />
            </a>
          </div>

          {/* Trust Guarantees */}
          <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/10 space-y-2 text-xs text-cream-muted">
            <div className="flex items-center gap-2 text-gold-light">
              <ShieldCheck className="w-4 h-4 text-gold-bright shrink-0" />
              <span>100% Authentic Stock with unbroken hologram seals.</span>
            </div>
            <div className="flex items-center gap-2 text-cream-soft">
              <Zap className="w-4 h-4 text-gold-bright shrink-0" />
              <span>"Smell as good as you look!" — Guaranteed compliment generator.</span>
            </div>
          </div>
        </div>

      </div>

      {/* Tabs: Notes Harmonizer / Contents / Reviews */}
      <div className="mb-24">
        <div className="flex border-b border-white/10 mb-8 gap-8 overflow-x-auto">
          {['notes', 'contents', 'reviews'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`py-3 text-xs tracking-[0.2em] font-space uppercase font-bold border-b-2 transition-all whitespace-nowrap -mb-px ${
                activeTab === tab
                  ? 'border-gold-bright text-gold-bright shadow-[0_4px_10px_rgba(212,175,55,0.4)]'
                  : 'border-transparent text-cream-muted hover:text-white'
              }`}
            >
              {tab === 'notes' ? 'Olfactory Pyramid & Notes' : tab === 'contents' ? 'Flacon Contents' : `Verified Reviews (${product.reviewCount})`}
            </button>
          ))}
        </div>

        {activeTab === 'notes' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="glass-panel p-6 rounded-2xl border border-white/10">
              <div className="text-[10px] text-gold-bright font-space font-bold uppercase tracking-wider mb-1">
                OPENING ACCORD (0 - 30 MINS)
              </div>
              <h4 className="font-syne text-lg font-bold text-white mb-3">Top Notes</h4>
              <div className="flex flex-wrap gap-2">
                {product.notes.top.map((n) => (
                  <span key={n} className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs text-cream-soft">
                    {n}
                  </span>
                ))}
              </div>
            </div>

            <div className="glass-panel p-6 rounded-2xl border border-gold/30">
              <div className="text-[10px] text-gold-bright font-space font-bold uppercase tracking-wider mb-1">
                HEART ACCORD (30 MINS - 4 HRS)
              </div>
              <h4 className="font-syne text-lg font-bold text-white mb-3">Heart Notes</h4>
              <div className="flex flex-wrap gap-2">
                {product.notes.middle.map((n) => (
                  <span key={n} className="px-3 py-1.5 rounded-lg bg-gold/10 border border-gold/30 text-xs text-gold-light">
                    {n}
                  </span>
                ))}
              </div>
            </div>

            <div className="glass-panel p-6 rounded-2xl border border-white/10">
              <div className="text-[10px] text-gold-bright font-space font-bold uppercase tracking-wider mb-1">
                DRYDOWN EVOLUTION (4 - 24+ HRS)
              </div>
              <h4 className="font-syne text-lg font-bold text-white mb-3">Base Notes</h4>
              <div className="flex flex-wrap gap-2">
                {product.notes.base.map((n) => (
                  <span key={n} className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs text-cream-soft">
                    {n}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'contents' && (
          <div className="glass-panel p-8 rounded-2xl border border-white/10 max-w-2xl">
            <h4 className="font-syne text-xl font-bold text-white mb-4">Inside the Box</h4>
            <ul className="space-y-3 text-sm text-cream-soft">
              {product.contents ? (
                product.contents.map((c, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-gold-bright" />
                    <span>{c}</span>
                  </li>
                ))
              ) : (
                <>
                  <li className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-gold-bright" />
                    <span>1 × Sealed {product.name} ({selectedVolume || product.volumes[0]}) Flacon</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-gold-bright" />
                    <span>Holographic Authenticity Certificate Stamp</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-gold-bright" />
                    <span>Mama Fragrance Signature Layering Card</span>
                  </li>
                </>
              )}
            </ul>
          </div>
        )}

        {activeTab === 'reviews' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {mockReviews.map((r, i) => (
              <div key={i} className="glass-panel p-6 rounded-2xl border border-white/10">
                <div className="flex items-center justify-between mb-3">
                  <span className="font-syne font-bold text-white text-sm">{r.name}</span>
                  <div className="flex text-gold-bright text-xs">
                    {Array.from({ length: r.rating }).map((_, j) => (
                      <Star key={j} className="w-3.5 h-3.5 fill-gold-bright" />
                    ))}
                  </div>
                </div>
                <p className="text-xs text-cream-muted leading-relaxed italic">{r.text}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Related Scents */}
      {relatedProducts.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-8">
            <h3 className="font-syne text-2xl sm:text-3xl font-black text-white">
              Complementary <span className="text-liquid-gold">Signatures</span>
            </h3>
            <Link to="/shop" className="text-xs text-gold-bright font-space uppercase tracking-wider hover:underline">
              View Entire Vault →
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
