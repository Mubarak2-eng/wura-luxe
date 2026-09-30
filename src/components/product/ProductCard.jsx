import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Heart, ShoppingBag, Eye, Zap, Star, ShieldCheck } from 'lucide-react'
import { motion } from 'framer-motion'
import { useCartStore } from '../../store/cartStore'
import { useWishlistStore } from '../../store/wishlistStore'
import { formatPrice, discountPercent } from '../../utils/helpers'
import StarRating from '../ui/StarRating'
import Badge from '../ui/Badge'
import toast from 'react-hot-toast'

export default function ProductCard({ product }) {
  const [imageLoaded, setImageLoaded] = useState(false)
  const { addItem } = useCartStore()
  const { toggle, isWishlisted } = useWishlistStore()
  const wishlisted = isWishlisted(product.id)

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
    <motion.div
      whileHover={{ y: -8 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      className="group block"
    >
      <div className="glass-panel rounded-2xl sm:rounded-3xl p-4 sm:p-5 border border-gold/20 hover:border-gold/60 transition-all duration-400 flex flex-col justify-between h-full bg-[#08080f]/80 relative overflow-hidden shadow-xl hover:shadow-[0_20px_40px_rgba(212,175,55,0.18)]">
        
        {/* Top Floating Glow Pill */}
        <div className="relative aspect-[3/4] rounded-xl sm:rounded-2xl overflow-hidden mb-4 bg-[#050508] border border-white/10">
          {!imageLoaded && (
            <div className="absolute inset-0 bg-white/5 animate-pulse" />
          )}

          <img
            src={product.images[0]}
            alt={product.name}
            loading="lazy"
            onLoad={() => setImageLoaded(true)}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          />

          {/* Bottom Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#08080f] via-transparent to-transparent opacity-80" />

          {/* Badges */}
          <div className="absolute top-2.5 left-2.5 flex flex-col gap-1 z-10">
            {product.stockPhoto && (
              <span className="bg-gold-bright text-black font-space font-extrabold text-[9px] uppercase tracking-wider px-2 py-0.5 rounded shadow-[0_0_10px_#ffd700]">
                Live Stock
              </span>
            )}
            {product.isNew && <Badge variant="new">New Release</Badge>}
            {discount > 0 && <Badge variant="sale">-{discount}% OFF</Badge>}
          </div>

          {/* Floating Actions */}
          <div className="absolute top-2.5 right-2.5 flex flex-col gap-1.5 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={handleWishlist}
              className={`w-8 h-8 rounded-lg flex items-center justify-center border transition-all ${
                wishlisted
                  ? 'bg-gold border-gold text-black'
                  : 'bg-black/70 border-white/20 text-cream-soft hover:border-gold hover:text-gold'
              }`}
              title="Save to wishlist"
            >
              <Heart className={`w-3.5 h-3.5 ${wishlisted ? 'fill-black' : ''}`} />
            </motion.button>
            <Link
              to={`/product/${product.slug}`}
              className="w-8 h-8 rounded-lg flex items-center justify-center border bg-black/70 border-white/20 text-cream-soft hover:border-gold hover:text-gold transition-all"
              title="Quick view"
            >
              <Eye className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Scent Longevity Meter on Card Bottom */}
          {product.longevity && (
            <div className="absolute bottom-2 left-2.5 right-2.5 flex items-center justify-between text-[10px] font-space text-cream-muted bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-md border border-white/10">
              <span className="text-gold-light font-bold flex items-center gap-1">
                <Zap className="w-2.5 h-2.5 text-gold-bright" />
                {product.longevity}
              </span>
              <span className="text-white/70">{product.sillage}</span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="flex flex-col flex-1 justify-between">
          <div>
            <div className="flex items-center justify-between mb-1">
              <span className="text-[10px] tracking-[0.25em] text-gold/80 uppercase font-space font-medium truncate max-w-[180px]">
                {product.fragranceFamily}
              </span>
              <div className="flex items-center gap-1 text-[11px] text-gold-bright font-space">
                <Star className="w-3 h-3 fill-gold-bright text-gold-bright" />
                <span>{product.rating}</span>
              </div>
            </div>

            <Link to={`/product/${product.slug}`}>
              <h3 className="font-syne text-base sm:text-lg font-bold text-white group-hover:text-gold-bright transition-colors line-clamp-1 mb-1">
                {product.name}
              </h3>
            </Link>

            {product.subtitle && (
              <p className="text-xs text-cream-muted font-space mb-3 line-clamp-1">
                {product.subtitle}
              </p>
            )}
          </div>

          {/* Price & Add to Cart button */}
          <div className="pt-3 border-t border-white/10 flex items-center justify-between gap-2 mt-2">
            <div className="flex flex-col">
              <span className="font-syne text-base sm:text-lg font-bold text-gold-bright">
                {formatPrice(product.price)}
              </span>
              {product.originalPrice && (
                <span className="text-[11px] text-cream-muted line-through">
                  {formatPrice(product.originalPrice)}
                </span>
              )}
            </div>

            <button
              onClick={handleAddToCart}
              className="btn-futuristic py-2.5 px-3.5 rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-[0_0_15px_rgba(212,175,55,0.3)]"
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Add</span>
            </button>
          </div>

        </div>
      </div>
    </motion.div>
  )
}
