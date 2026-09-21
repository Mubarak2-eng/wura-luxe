import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Heart, ShoppingBag, Eye } from 'lucide-react'
import { useCartStore } from '../../store/cartStore'
import { useWishlistStore } from '../../store/wishlistStore'
import { formatPrice, discountPercent } from '../../utils/helpers'
import StarRating from '../ui/StarRating'
import Badge from '../ui/Badge'
import toast from 'react-hot-toast'

export default function ProductCard({ product }) {
  const [imageLoaded, setImageLoaded] = useState(false)
  const [hovered, setHovered] = useState(false)
  const { addItem } = useCartStore()
  const { toggle, isWishlisted } = useWishlistStore()
  const wishlisted = isWishlisted(product.id)

  const handleAddToCart = (e) => {
    e.preventDefault()
    addItem(product, product.volumes[0])
    toast.success(`${product.name} added to cart!`, { icon: '🛒', duration: 2500 })
  }

  const handleWishlist = (e) => {
    e.preventDefault()
    const added = toggle(product.id)
    toast(added ? '❤️ Added to wishlist' : 'Removed from wishlist', { duration: 2000 })
  }

  const discount = discountPercent(product.originalPrice, product.price)

  return (
    <Link
      to={`/product/${product.slug}`}
      className="group block"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        className="overflow-hidden transition-all duration-500"
        style={{
          background: '#141414',
          border: `1px solid ${hovered ? 'rgba(201,168,76,0.35)' : '#242018'}`,
          boxShadow: hovered
            ? '0 20px 60px rgba(0,0,0,0.6), 0 0 0 1px rgba(201,168,76,0.15), inset 0 1px 0 rgba(201,168,76,0.08)'
            : '0 4px 20px rgba(0,0,0,0.3)',
          transform: hovered ? 'translateY(-6px)' : 'translateY(0)',
        }}
      >
        {/* Image */}
        <div className="relative overflow-hidden" style={{ aspectRatio: '3/4' }}>
          {/* Loading skeleton */}
          {!imageLoaded && (
            <div className="absolute inset-0 bg-dark-card animate-pulse" />
          )}

          {/* Main image */}
          <img
            src={product.images[0]}
            alt={product.name}
            loading="lazy"
            onLoad={() => setImageLoaded(true)}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />

          {/* Bottom gradient on image */}
          <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-dark-card to-transparent" />

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-1.5">
            {product.isNew && <Badge variant="new">New</Badge>}
            {discount > 0 && <Badge variant="sale">-{discount}%</Badge>}
            {product.bestSeller && !product.isNew && !discount && (
              <Badge variant="gold">Bestseller</Badge>
            )}
          </div>

          {/* Side action buttons */}
          <div className="absolute top-3 right-3 flex flex-col gap-2">
            <button
              onClick={handleWishlist}
              className={`w-9 h-9 flex items-center justify-center border transition-all duration-300 shadow-lg ${
                wishlisted
                  ? 'bg-gold border-gold text-dark'
                  : 'bg-dark/80 border-dark-border text-cream-muted hover:border-gold hover:text-gold'
              } ${hovered ? 'translate-x-0 opacity-100' : 'translate-x-3 opacity-0'}`}
              style={{ transitionDelay: '0ms' }}
            >
              <Heart className={`w-4 h-4 ${wishlisted ? 'fill-dark' : ''}`} />
            </button>
            <Link
              to={`/product/${product.slug}`}
              onClick={(e) => e.stopPropagation()}
              className={`w-9 h-9 flex items-center justify-center border bg-dark/80 border-dark-border text-cream-muted hover:border-gold hover:text-gold transition-all duration-300 shadow-lg ${
                hovered ? 'translate-x-0 opacity-100' : 'translate-x-3 opacity-0'
              }`}
              style={{ transitionDelay: '60ms' }}
            >
              <Eye className="w-4 h-4" />
            </Link>
          </div>

          {/* Add to cart — slides up on hover */}
          <div
            className={`absolute bottom-0 left-0 right-0 transition-transform duration-400 ${
              hovered ? 'translate-y-0' : 'translate-y-full'
            }`}
          >
            <button
              onClick={handleAddToCart}
              className="w-full py-3.5 text-xs font-bold tracking-[0.2em] uppercase flex items-center justify-center gap-2 btn-gold-glow text-dark"
              style={{ background: 'linear-gradient(135deg, #c9a84c, #e8c97a, #c9a84c)' }}
            >
              <ShoppingBag className="w-4 h-4" />
              Add to Cart
            </button>
          </div>
        </div>

        {/* Info */}
        <div className="p-4 pb-5">
          <p className="text-xs text-gold/70 tracking-[0.25em] uppercase mb-1.5">
            {product.fragranceFamily}
          </p>
          <h3
            className="font-playfair text-cream text-lg leading-tight mb-2 transition-colors duration-300"
            style={{ color: hovered ? '#e8c97a' : '#f5f0e8' }}
          >
            {product.name}
          </h3>
          <StarRating rating={product.rating} showCount count={product.reviewCount} />
          <div className="flex items-center gap-2.5 mt-3">
            <span className="font-playfair text-gold font-bold text-lg">
              {formatPrice(product.price)}
            </span>
            {product.originalPrice && (
              <span className="text-cream-muted text-sm line-through">
                {formatPrice(product.originalPrice)}
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  )
}
