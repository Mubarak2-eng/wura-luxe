import { Link } from 'react-router-dom'
import { Heart, Trash2, ShoppingBag } from 'lucide-react'
import { useWishlistStore } from '../../store/wishlistStore'
import { useCartStore } from '../../store/cartStore'
import { products } from '../../data/products'
import toast from 'react-hot-toast'

const getProductById = (id) => products.find((p) => p.id === id)

export default function WishlistPage() {
  const { items, remove } = useWishlistStore()
  const addToCart = useCartStore((s) => s.addItem)

  const wishlistProducts = items.map(getProductById).filter(Boolean)

  const handleAddToCart = (product) => {
    const selectedVolume = product.volumes?.[0] || product.sizes?.[0] || null
    const price = selectedVolume && product.sizePrices
      ? product.sizePrices[selectedVolume]
      : product.price
    addToCart({
      id: product.id,
      name: product.name,
      price,
      image: product.images?.[0] || '',
      volume: selectedVolume,
      slug: product.slug,
    })
    toast.success(`${product.name} added to cart`)
  }

  return (
    <div className="bg-[#FAF6EF] min-h-screen pb-20">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-[#E9DED0]">
        <div className="section-pad py-3 flex items-center gap-2 text-xs text-[#7A726C]">
          <Link to="/" className="hover:text-[#211713]">Home</Link>
          <span>/</span>
          <Link to="/account/profile" className="hover:text-[#211713]">My Account</Link>
          <span>/</span>
          <span className="text-[#211713] font-semibold">Wishlist</span>
        </div>
      </div>

      <div className="section-pad py-10">
        <div className="flex items-center gap-3 mb-7">
          <Heart className="w-5 h-5 text-[#C7A66A]" />
          <h1 className="font-serif text-2xl font-bold text-[#211713]">My Wishlist</h1>
          {wishlistProducts.length > 0 && (
            <span className="ml-auto bg-[#FAF6EF] border border-[#E9DED0] px-3 py-1 rounded-full text-xs font-bold text-[#393431]">
              {wishlistProducts.length} saved
            </span>
          )}
        </div>

        {wishlistProducts.length === 0 ? (
          <div className="bg-white border border-[#E9DED0] rounded-2xl shadow-sm py-20 text-center">
            <Heart className="w-10 h-10 text-[#E9DED0] mx-auto mb-4" />
            <p className="font-serif text-lg font-bold text-[#211713] mb-2">Your wishlist is empty</p>
            <p className="text-sm text-[#7A726C] font-light mb-6">Save fragrances you love to return to them later.</p>
            <Link to="/shop" className="btn-espresso px-8 py-3 text-xs font-bold rounded">
              EXPLORE FRAGRANCES
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {wishlistProducts.map((product) => {
              const defaultVolume = product.volumes?.[0]
              const displayPrice = defaultVolume && product.sizePrices
                ? product.sizePrices[defaultVolume]
                : product.price

              return (
                <div
                  key={product.id}
                  className="bg-white border border-[#E9DED0] rounded-2xl overflow-hidden shadow-sm hover:shadow-luxury hover:border-[#C7A66A]/50 transition-all group"
                >
                  {/* Image */}
                  <Link to={`/product/${product.slug}`} className="block relative aspect-[3/4] overflow-hidden bg-[#FAF6EF]">
                    <img
                      src={product.images?.[0]}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    {product.onSale && (
                      <div className="absolute top-2 left-2 bg-[#C7A66A] text-white text-[10px] font-bold px-2 py-0.5 rounded">
                        SALE
                      </div>
                    )}
                  </Link>

                  {/* Details */}
                  <div className="p-4 space-y-3">
                    <div>
                      {product.subtitle && (
                        <p className="text-[10px] font-bold uppercase tracking-wider text-[#C7A66A]">{product.subtitle}</p>
                      )}
                      <Link to={`/product/${product.slug}`} className="font-serif font-bold text-sm text-[#211713] hover:text-[#C7A66A] transition-colors line-clamp-1">
                        {product.name}
                      </Link>
                      {defaultVolume && (
                        <p className="text-xs text-[#7A726C] mt-0.5">{defaultVolume}</p>
                      )}
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-bold text-sm text-[#211713]">
                          ₦{displayPrice?.toLocaleString()}
                        </p>
                        {product.onSale && product.originalPrice && (
                          <p className="text-xs text-[#B0A89E] line-through">
                            ₦{product.originalPrice.toLocaleString()}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleAddToCart(product)}
                        disabled={!product.inStock}
                        className="flex-1 flex items-center justify-center gap-1.5 btn-espresso py-2 text-xs font-bold rounded-lg disabled:opacity-40"
                      >
                        <ShoppingBag className="w-3.5 h-3.5" />
                        {product.inStock ? 'Add to Cart' : 'Out of Stock'}
                      </button>
                      <button
                        onClick={() => {
                          remove(product.id)
                          toast('Removed from wishlist', { icon: '💔' })
                        }}
                        className="w-9 h-9 rounded-lg border border-[#E9DED0] flex items-center justify-center text-[#B0A89E] hover:text-red-500 hover:border-red-200 transition-colors flex-shrink-0"
                        title="Remove from wishlist"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
