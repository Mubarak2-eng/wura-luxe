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
} from 'lucide-react'
import { getProductBySlug, products } from '../data/products'
import { useCartStore } from '../store/cartStore'
import { useWishlistStore } from '../store/wishlistStore'
import { formatPrice, discountPercent } from '../utils/helpers'
import { whatsAppProductEnquiry } from '../utils/whatsapp'
import { getCategoryLabel } from '../data/categories'
import StarRating from '../components/ui/StarRating'
import Badge from '../components/ui/Badge'
import Button from '../components/ui/Button'
import ProductCard from '../components/product/ProductCard'
import toast from 'react-hot-toast'

// Mock reviews
const mockReviews = [
  {
    name: 'Fatima A.',
    rating: 5,
    date: '2024-03-10',
    text: 'Absolutely stunning fragrance! The longevity is incredible and I get compliments everywhere I go.',
  },
  {
    name: 'Blessing O.',
    rating: 5,
    date: '2024-02-25',
    text: 'Worth every single naira. The packaging is gorgeous and the scent is heavenly.',
  },
  {
    name: 'Yetunde M.',
    rating: 4,
    date: '2024-01-18',
    text: 'Very nice fragrance, unique and long-lasting. Would definitely recommend to a friend.',
  },
]

export default function ProductDetailPage() {
  const { slug } = useParams()
  const navigate = useNavigate()
  const product = getProductBySlug(slug)

  const [selectedVolume, setSelectedVolume] = useState(
    product?.volumes?.[1] || product?.volumes?.[0]
  )
  const [currentImage, setCurrentImage] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [activeTab, setActiveTab] = useState('description')

  const { addItem } = useCartStore()
  const { toggle, isWishlisted } = useWishlistStore()
  const wishlisted = product ? isWishlisted(product.id) : false

  if (!product) {
    return (
      <div className="section-pad py-20 text-center">
        <h2 className="font-playfair text-3xl text-cream mb-4">
          Product not found
        </h2>
        <Button as={Link} to="/shop">Back to Shop</Button>
      </div>
    )
  }

  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4)

  const discount = discountPercent(product.originalPrice, product.price)

  const handleAddToCart = () => {
    addItem(product, selectedVolume, quantity)
    toast.success(`${product.name} added to cart!`, { icon: '🛒' })
  }

  const handleWishlist = () => {
    const added = toggle(product.id)
    toast(added ? 'Added to wishlist ❤️' : 'Removed from wishlist', {
      duration: 2000,
    })
  }

  return (
    <div className="section-pad py-10">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs text-cream-muted mb-8">
        <Link to="/" className="hover:text-gold transition-colors">
          Home
        </Link>
        <span>/</span>
        <Link to="/shop" className="hover:text-gold transition-colors">
          Shop
        </Link>
        <span>/</span>
        <Link
          to={`/shop?category=${product.category}`}
          className="hover:text-gold transition-colors"
        >
          {getCategoryLabel(product.category)}
        </Link>
        <span>/</span>
        <span className="text-cream">{product.name}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
        {/* Gallery */}
        <div className="flex flex-col gap-4">
          <div className="relative aspect-square overflow-hidden bg-dark-card">
            <img
              src={product.images[currentImage]}
              alt={product.name}
              className="w-full h-full object-cover"
            />
            {/* Badges */}
            <div className="absolute top-4 left-4 flex flex-col gap-2">
              {product.isNew && <Badge variant="new">New</Badge>}
              {discount > 0 && (
                <Badge variant="sale">-{discount}% OFF</Badge>
              )}
            </div>
            {/* Image nav */}
            {product.images.length > 1 && (
              <div className="absolute bottom-4 right-4 flex gap-2">
                {product.images.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentImage(i)}
                    className={`w-2 h-2 rounded-full transition-colors ${
                      i === currentImage ? 'bg-gold' : 'bg-dark-border'
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
                  className={`w-20 h-20 overflow-hidden border-2 transition-colors ${
                    i === currentImage
                      ? 'border-gold'
                      : 'border-dark-border hover:border-gold/50'
                  }`}
                >
                  <img
                    src={img}
                    alt={`${product.name} view ${i + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product info */}
        <div className="flex flex-col">
          <p className="text-gold text-xs tracking-[0.4em] uppercase mb-2">
            {product.fragranceFamily}
          </p>
          <h1 className="font-playfair text-4xl lg:text-5xl text-cream mb-3">
            {product.name}
          </h1>

          <div className="flex items-center gap-3 mb-4">
            <StarRating
              rating={product.rating}
              size="md"
              showCount
              count={product.reviewCount}
            />
          </div>

          {/* Price */}
          <div className="flex items-baseline gap-3 mb-6">
            <span className="font-playfair text-3xl text-gold font-bold">
              {formatPrice(product.price)}
            </span>
            {product.originalPrice && (
              <span className="text-cream-muted text-lg line-through">
                {formatPrice(product.originalPrice)}
              </span>
            )}
          </div>

          {/* Short description */}
          <p className="text-cream-muted leading-relaxed mb-8">
            {product.description}
          </p>

          {/* Volume selector */}
          <div className="mb-6">
            <p className="text-cream text-sm font-medium mb-3">
              Size / Volume
            </p>
            <div className="flex flex-wrap gap-3">
              {product.volumes.map((vol) => (
                <button
                  key={vol}
                  onClick={() => setSelectedVolume(vol)}
                  className={`px-5 py-2.5 border text-sm font-medium transition-all ${
                    selectedVolume === vol
                      ? 'border-gold bg-gold/10 text-gold'
                      : 'border-dark-border text-cream-muted hover:border-gold/50 hover:text-gold'
                  }`}
                >
                  {vol}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity selector */}
          <div className="mb-8">
            <p className="text-cream text-sm font-medium mb-3">Quantity</p>
            <div className="flex items-center border border-dark-border w-fit">
              <button
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="px-4 py-3 text-cream-muted hover:text-gold transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <span className="px-5 text-cream text-sm font-medium">
                {quantity}
              </span>
              <button
                onClick={() => setQuantity((q) => q + 1)}
                className="px-4 py-3 text-cream-muted hover:text-gold transition-colors"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row gap-3 mb-6">
            <Button onClick={handleAddToCart} size="lg" className="flex-1 gap-2">
              <ShoppingBag className="w-5 h-5" />
              Add to Cart — {formatPrice(product.price * quantity)}
            </Button>
            <button
              onClick={handleWishlist}
              className={`px-5 py-4 border transition-all ${
                wishlisted
                  ? 'border-gold bg-gold/10 text-gold'
                  : 'border-dark-border text-cream-muted hover:border-gold hover:text-gold'
              }`}
            >
              <Heart
                className={`w-5 h-5 ${wishlisted ? 'fill-gold' : ''}`}
              />
            </button>
            <a
              href={whatsAppProductEnquiry(product.name)}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-4 border border-[#25D366] text-[#25D366] flex items-center justify-center hover:bg-[#25D366] hover:text-white transition-colors"
              title="Enquire via WhatsApp"
            >
              <MessageCircle className="w-5 h-5" />
            </a>
          </div>

          {/* Trust signals */}
          <div className="border-t border-dark-border pt-6 flex flex-col gap-2">
            {[
              '✅ Authentic, premium quality guaranteed',
              '🚚 Free shipping on orders over ₦50,000',
              '📦 Luxury gift packaging included',
              '🔄 Easy returns within 7 days',
            ].map((signal) => (
              <p key={signal} className="text-xs text-cream-muted">
                {signal}
              </p>
            ))}
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="mb-16">
        <div className="flex border-b border-dark-border mb-8">
          {['description', 'notes', 'reviews'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-3 text-sm tracking-widest uppercase border-b-2 transition-colors -mb-px ${
                activeTab === tab
                  ? 'border-gold text-gold'
                  : 'border-transparent text-cream-muted hover:text-gold'
              }`}
            >
              {tab === 'reviews' ? `Reviews (${product.reviewCount})` : tab}
            </button>
          ))}
        </div>

        {activeTab === 'description' && (
          <div className="max-w-2xl">
            <p className="text-cream-muted leading-relaxed text-base">
              {product.description}
            </p>
            {product.contents && (
              <div className="mt-6">
                <h4 className="font-playfair text-cream text-xl mb-4">
                  What's Included
                </h4>
                <ul className="flex flex-col gap-2">
                  {product.contents.map((item) => (
                    <li key={item} className="flex items-center gap-2 text-cream-muted text-sm">
                      <span className="text-gold">•</span> {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}

        {activeTab === 'notes' && (
          <div className="max-w-lg">
            {product.notes.top.length > 0 ? (
              <div className="flex flex-col gap-6">
                {[
                  { label: 'Top Notes', notes: product.notes.top, desc: 'First impression, 0–30 min' },
                  { label: 'Middle Notes', notes: product.notes.middle, desc: 'Heart of the fragrance, 30 min–4 hrs' },
                  { label: 'Base Notes', notes: product.notes.base, desc: 'The lasting impression, 4+ hrs' },
                ].map(({ label, notes, desc }) => (
                  <div key={label}>
                    <div className="flex items-baseline gap-3 mb-2">
                      <h4 className="font-playfair text-cream text-lg">{label}</h4>
                      <span className="text-xs text-cream-muted">{desc}</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {notes.map((note) => (
                        <span
                          key={note}
                          className="px-3 py-1.5 bg-dark-card border border-dark-border text-cream-muted text-xs"
                        >
                          {note}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-cream-muted">This is a curated gift set. Individual fragrance notes vary.</p>
            )}
          </div>
        )}

        {activeTab === 'reviews' && (
          <div className="max-w-2xl flex flex-col gap-6">
            {mockReviews.map((review, i) => (
              <div key={i} className="luxury-card p-6">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <p className="text-cream font-medium">{review.name}</p>
                    <p className="text-cream-muted text-xs">
                      {new Date(review.date).toLocaleDateString('en-NG', {
                        year: 'numeric', month: 'long', day: 'numeric',
                      })}
                    </p>
                  </div>
                  <StarRating rating={review.rating} size="sm" />
                </div>
                <p className="text-cream-muted text-sm leading-relaxed">
                  "{review.text}"
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section>
          <h2 className="font-playfair text-3xl text-cream mb-8">
            You May Also Like
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
