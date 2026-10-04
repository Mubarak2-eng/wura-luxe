import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Heart, ShoppingBag, Star, Check, Sparkles } from 'lucide-react'
import { motion } from 'framer-motion'
import { formatPrice, discountPercent } from '../../utils/helpers'
import { useCartStore } from '../../store/cartStore'
import { useWishlistStore } from '../../store/wishlistStore'
import toast from 'react-hot-toast'

export default function ProductCard({ product, className = '' }) {
  const [selectedVolume, setSelectedVolume] = useState(
    product.volumes ? product.volumes[0] : 'Standard'
  )
  const [isHovered, setIsHovered] = useState(false)
  const [addedAnimation, setAddedAnimation] = useState(false)
  
  const addItem = useCartStore((s) => s.addItem)
  const { isWishlisted, toggle: toggleWishlist } = useWishlistStore()
  const wishlisted = isWishlisted(product.id)
  const navigate = useNavigate()

  const currentPrice =
    product.sizePrices && product.sizePrices[selectedVolume]
      ? product.sizePrices[selectedVolume]
      : product.price

  const hasDiscount = product.originalPrice && product.originalPrice > currentPrice
  const discountPct = hasDiscount
    ? discountPercent(product.originalPrice, currentPrice)
    : 0

  const handleAddToCart = (e) => {
    e.preventDefault()
    e.stopPropagation()
    addItem(product, selectedVolume, 1, currentPrice)
    setAddedAnimation(true)
    setTimeout(() => setAddedAnimation(false), 1500)
    toast.success(`Added ${product.name} to your bag`)
  }

  const handleWishlist = (e) => {
    e.preventDefault()
    e.stopPropagation()
    const added = toggleWishlist(product.id)
    if (added) {
      toast.success(`Saved to your Wishlist`)
    } else {
      toast('Removed from Wishlist', { icon: '🤍' })
    }
  }

  return (
    <div
      className={`group relative bg-white rounded-lg border border-[#E9DED0] hover:border-[#C7A66A]/60 shadow-sm hover:shadow-luxury transition-all duration-300 flex flex-col justify-between overflow-hidden ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* ── Badges Bar (Sale / New / Best Seller) ── */}
      <div className="absolute top-3 left-3 z-10 flex flex-col gap-1.5 pointer-events-none">
        {hasDiscount && (
          <span className="bg-[#211713] text-[#FAF6EF] text-[10px] font-bold px-2 py-0.5 rounded tracking-wider uppercase shadow-sm">
            Save {discountPct}%
          </span>
        )}
        {product.isNew && (
          <span className="bg-[#C7A66A] text-white text-[10px] font-bold px-2 py-0.5 rounded tracking-wider uppercase shadow-sm">
            New
          </span>
        )}
        {product.bestSeller && !product.isNew && (
          <span className="bg-[#FAF6EF] text-[#211713] border border-[#E9DED0] text-[9px] font-bold px-1.5 py-0.5 rounded tracking-wider uppercase">
            Bestseller
          </span>
        )}
      </div>

      {/* ── Wishlist Toggle Button ── */}
      <button
        onClick={handleWishlist}
        className={`absolute top-3 right-3 z-10 w-9 h-9 rounded-full flex items-center justify-center transition-all ${
          wishlisted
            ? 'bg-[#211713] text-[#C7A66A] shadow-md'
            : 'bg-white/85 backdrop-blur-sm text-[#393431] hover:text-[#211713] hover:bg-white shadow-sm'
        }`}
        aria-label={wishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
      >
        <Heart
          className={`w-4 h-4 transition-transform active:scale-75 ${
            wishlisted ? 'fill-[#C7A66A] text-[#C7A66A]' : ''
          }`}
        />
      </button>

      {/* ── Image & Hover Secondary Image ── */}
      <Link
        to={`/product/${product.slug}`}
        className="relative block aspect-[4/4.5] w-full overflow-hidden bg-[#FAF6EF]"
      >
        {/* Primary Image */}
        <img
          src={product.images[0]}
          alt={product.name}
          loading="lazy"
          className={`h-full w-full object-cover object-center transition-all duration-700 ease-out ${
            isHovered && product.images[1]
              ? 'opacity-0 scale-105'
              : 'opacity-100 scale-100'
          }`}
        />

        {/* Secondary Hover Image (Smooth Reveal) */}
        {product.images[1] && (
          <img
            src={product.images[1]}
            alt={`${product.name} secondary view`}
            loading="lazy"
            className={`absolute inset-0 h-full w-full object-cover object-center transition-all duration-700 ease-out ${
              isHovered ? 'opacity-100 scale-105' : 'opacity-0 scale-100'
            }`}
          />
        )}

        {/* Quick-Add Overlay on Desktop Hover */}
        <div
          className={`absolute inset-x-3 bottom-3 z-10 transition-all duration-300 hidden md:block ${
            isHovered
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-2 pointer-events-none'
          }`}
        >
          <button
            onClick={handleAddToCart}
            className="w-full btn-espresso py-2.5 text-xs font-bold rounded shadow-md flex items-center justify-center gap-2"
          >
            {addedAnimation ? (
              <>
                <Check className="w-3.5 h-3.5 text-[#C7A66A]" /> Added to Bag
              </>
            ) : (
              <>
                <ShoppingBag className="w-3.5 h-3.5" /> Quick Add
              </>
            )}
          </button>
        </div>
      </Link>

      {/* ── Product Information ── */}
      <div className="p-4 flex flex-col flex-1 justify-between">
        <div>
          {/* Subtitle / Brand & Scent Family */}
          <div className="flex items-center justify-between gap-1 text-[11px] text-[#7A726C] mb-1">
            <span className="uppercase tracking-wider font-semibold truncate">
              {product.subtitle || product.gender || 'Fragrance'}
            </span>
            {product.scentProfile && (
              <span className="text-[10px] text-[#C7A66A] font-medium shrink-0">
                {product.scentProfile.split('&')[0]}
              </span>
            )}
          </div>

          {/* Product Title */}
          <Link to={`/product/${product.slug}`} className="block group-hover:text-[#C7A66A] transition-colors">
            <h3 className="font-serif font-bold text-base text-[#211713] line-clamp-1 leading-snug mb-1">
              {product.name}
            </h3>
          </Link>

          {/* Rating Stars */}
          <div className="flex items-center gap-1.5 mb-2.5">
            <div className="flex text-[#C7A66A]">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={`w-3 h-3 ${
                    i < Math.floor(product.rating || 5)
                      ? 'fill-[#C7A66A] text-[#C7A66A]'
                      : 'text-[#E9DED0]'
                  }`}
                />
              ))}
            </div>
            <span className="text-[11px] text-[#7A726C]">
              ({product.reviewCount || 40})
            </span>
          </div>

          {/* Size Pills (if multiple volumes available) */}
          {product.volumes && product.volumes.length > 1 && (
            <div className="flex flex-wrap gap-1.5 mb-3">
              {product.volumes.map((vol) => (
                <button
                  key={vol}
                  onClick={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                    setSelectedVolume(vol)
                  }}
                  className={`text-[10px] font-medium px-2 py-0.5 rounded border transition-colors ${
                    selectedVolume === vol
                      ? 'border-[#211713] bg-[#211713] text-[#FAF6EF]'
                      : 'border-[#E9DED0] bg-[#FAF6EF] text-[#393431] hover:border-[#C7A66A]'
                  }`}
                >
                  {vol}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* ── Price and Mobile Add Button ── */}
        <div className="pt-2 border-t border-[#E9DED0]/60 flex items-center justify-between gap-2 mt-auto">
          <div className="flex flex-col">
            <div className="flex items-baseline gap-2">
              <span className="font-sans font-bold text-sm sm:text-base text-[#211713]">
                {formatPrice(currentPrice)}
              </span>
              {hasDiscount && (
                <span className="text-xs text-[#7A726C] line-through">
                  {formatPrice(product.originalPrice)}
                </span>
              )}
            </div>
            <span className="text-[10px] text-[#7A726C]">
              {selectedVolume}
            </span>
          </div>

          {/* Mobile Direct Add Button */}
          <button
            onClick={handleAddToCart}
            className="md:hidden p-2 rounded bg-[#211713] text-[#FAF6EF] hover:bg-[#31231D] active:scale-95 transition-all"
            aria-label="Add to cart"
          >
            {addedAnimation ? (
              <Check className="w-4 h-4 text-[#C7A66A]" />
            ) : (
              <ShoppingBag className="w-4 h-4" />
            )}
          </button>
        </div>
      </div>
    </div>
  )
}
