import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Heart, ShoppingBag, Eye, Zap, Star } from 'lucide-react'
import { motion, useReducedMotion } from 'framer-motion'
import { useCartStore } from '../../store/cartStore'
import { useWishlistStore } from '../../store/wishlistStore'
import { formatPrice, discountPercent } from '../../utils/helpers'
import Badge from '../ui/Badge'
import toast from 'react-hot-toast'

export default function ProductCard({ product }) {
  const [imageLoaded, setImageLoaded] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const { addItem } = useCartStore()
  const { toggle, isWishlisted } = useWishlistStore()
  const wishlisted = isWishlisted(product.id)
  const shouldReduceMotion = useReducedMotion()

  const handleAddToCart = (e) => {
    e.preventDefault()
    e.stopPropagation()
    addItem(product, product.volumes[0])
    toast.success(`${product.name} added to Vault! ✨`, {
      icon: '🛒',
      duration: 2500,
    })
  }

  const handleWishlist = (e) => {
    e.preventDefault()
    e.stopPropagation()
    const added = toggle(product.id)
    toast(added ? '❤️ Saved to Wishlist' : 'Removed from Wishlist', { duration: 2000 })
  }

  const discount = discountPercent(product.originalPrice, product.price)

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group block h-full select-none"
    >
      <div className="glass-panel rounded-2xl sm:rounded-3xl p-3.5 sm:p-5 border border-gold/20 hover:border-gold/60 transition-all duration-300 flex flex-col justify-between h-full bg-[#08080f]/85 relative overflow-hidden shadow-xl hover:shadow-[0_20px_45px_rgba(212,175,55,0.18)]">
        
        {/* Flacon Visual Frame */}
        <div className="relative aspect-[3/4] rounded-xl sm:rounded-2xl overflow-hidden mb-3.5 sm:mb-4 bg-[#050508] border border-white/10">
          {!imageLoaded && (
            <div className="absolute inset-0 bg-white/5 animate-pulse" />
          )}

          {/* ── Product Image: Smoothly scale up to 1.04x over 400ms on hover ── */}
          <motion.img
            src={product.images[0]}
            alt={product.name}
            loading="lazy"
            onLoad={() => setImageLoaded(true)}
            animate={
              shouldReduceMotion
                ? {}
                : {
                    scale: isHovered ? 1.04 : 1.0,
                  }
            }
            transition={{
              duration: 0.4, // 400ms
              ease: [0.16, 1, 0.3, 1], // Tight organic ease-out curve
            }}
            className="w-full h-full object-cover transform-gpu will-change-transform"
          />

          {/* Bottom Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#08080f] via-transparent to-transparent opacity-80 pointer-events-none" />

          {/* Top Badges */}
          <div className="absolute top-2.5 left-2.5 flex flex-col gap-1 z-10">
            {product.stockPhoto && (
              <span className="bg-gold-bright text-black font-space font-extrabold text-[9px] uppercase tracking-wider px-2 py-0.5 rounded shadow-[0_0_10px_#ffd700]">
                Live Stock
              </span>
            )}
            {product.isNew && <Badge variant="new">New</Badge>}
            {discount > 0 && <Badge variant="sale">-{discount}%</Badge>}
          </div>

          {/* Wishlist & Quick Look buttons */}
          <div className="absolute top-2.5 right-2.5 flex flex-col gap-1.5 z-10">
            <button
              onClick={handleWishlist}
              className={`w-8 h-8 rounded-lg flex items-center justify-center border transition-all ${
                wishlisted
                  ? 'bg-gold border-gold text-black'
                  : 'bg-black/75 border-white/20 text-cream-soft hover:border-gold hover:text-gold'
              }`}
              title="Save to wishlist"
            >
              <Heart className={`w-3.5 h-3.5 ${wishlisted ? 'fill-black' : ''}`} />
            </button>
            <Link
              to={`/product/${product.slug}`}
              className="w-8 h-8 rounded-lg flex items-center justify-center border bg-black/75 border-white/20 text-cream-soft hover:border-gold hover:text-gold transition-all"
              title="Quick inspect"
            >
              <Eye className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Scent Longevity Meter on Card Bottom */}
          {product.longevity && (
            <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between text-[9px] sm:text-[10px] font-space text-cream-muted bg-black/70 backdrop-blur-md px-2 py-1 rounded-md border border-white/10 z-0">
              <span className="text-gold-light font-bold flex items-center gap-1">
                <Zap className="w-2.5 h-2.5 text-gold-bright" />
                {product.longevity}
              </span>
              <span className="text-white/70">{product.sillage}</span>
            </div>
          )}

          {/* ── Desktop Hover Reveal: Quick Add button fades in (0 -> 1) and translates up by 8px ── */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={
              isHovered
                ? { opacity: 1, y: 0 }
                : { opacity: 0, y: 8 }
            }
            transition={{
              duration: 0.25,
              ease: [0.16, 1, 0.3, 1], // Tight ease-out curve
            }}
            className="absolute inset-x-2 bottom-2 z-10 hidden md:block pointer-events-auto"
          >
            <button
              onClick={handleAddToCart}
              className="btn-futuristic w-full py-2.5 rounded-xl text-xs font-extrabold flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(212,175,55,0.4)]"
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>Quick Add to Vault</span>
            </button>
          </motion.div>
        </div>

        {/* Content */}
        <div className="flex flex-col flex-1 justify-between">
          <div>
            <div className="flex items-center justify-between mb-1">
              <span className="text-[9px] sm:text-[10px] tracking-[0.2em] text-gold/80 uppercase font-space font-medium truncate max-w-[150px] sm:max-w-[180px]">
                {product.fragranceFamily}
              </span>
              <div className="flex items-center gap-1 text-[11px] text-gold-bright font-space">
                <Star className="w-3 h-3 fill-gold-bright text-gold-bright" />
                <span>{product.rating}</span>
              </div>
            </div>

            <Link to={`/product/${product.slug}`}>
              <h3 className="font-syne text-sm sm:text-base lg:text-lg font-bold text-white group-hover:text-gold-bright transition-colors line-clamp-1 mb-0.5 sm:mb-1">
                {product.name}
              </h3>
            </Link>

            {product.subtitle && (
              <p className="text-[11px] sm:text-xs text-cream-muted font-space mb-2.5 sm:mb-3 line-clamp-1">
                {product.subtitle}
              </p>
            )}
          </div>

          {/* Price & Mobile Instant Add Row */}
          <div className="pt-2.5 sm:pt-3 border-t border-white/10 flex items-center justify-between gap-2 mt-1">
            <div className="flex flex-col">
              <span className="font-syne text-sm sm:text-base lg:text-lg font-bold text-gold-bright">
                {formatPrice(product.price)}
              </span>
              {product.originalPrice && (
                <span className="text-[10px] sm:text-[11px] text-cream-muted line-through">
                  {formatPrice(product.originalPrice)}
                </span>
              )}
            </div>

            {/* Mobile Touch Quick Add (Always accessible on touch screens without requiring hover) */}
            <div className="md:hidden">
              <button
                onClick={handleAddToCart}
                className="btn-futuristic p-2.5 rounded-xl text-xs font-bold flex items-center justify-center shadow-[0_0_15px_rgba(212,175,55,0.3)] min-w-[40px] min-h-[40px]"
                aria-label="Add to cart"
              >
                <ShoppingBag className="w-4 h-4 text-black" />
              </button>
            </div>

            {/* Desktop link hint */}
            <Link
              to={`/product/${product.slug}`}
              className="hidden md:inline-flex text-[11px] font-space text-cream-muted hover:text-gold transition-colors"
            >
              Details →
            </Link>
          </div>

        </div>
      </div>
    </div>
  )
}
