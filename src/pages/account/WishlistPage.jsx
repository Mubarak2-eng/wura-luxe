import { Link } from 'react-router-dom'
import { Heart, ShoppingBag, Trash2 } from 'lucide-react'
import { useWishlistStore } from '../../store/wishlistStore'
import { useCartStore } from '../../store/cartStore'
import { getProductById } from '../../data/products'
import { formatPrice } from '../../utils/helpers'
import Button from '../../components/ui/Button'
import toast from 'react-hot-toast'

export default function WishlistPage() {
  const { items: wishlistIds, remove } = useWishlistStore()
  const { addItem } = useCartStore()

  const wishlistProducts = wishlistIds
    .map(getProductById)
    .filter(Boolean)

  const handleAddToCart = (product) => {
    addItem(product, product.volumes[0])
    toast.success(`${product.name} added to cart!`, { icon: '🛒' })
  }

  const handleRemove = (productId, name) => {
    remove(productId)
    toast(`${name} removed from wishlist`, { duration: 2000 })
  }

  return (
    <div className="section-pad py-12">
      <h1 className="font-playfair text-4xl text-cream mb-2">My Wishlist</h1>
      <div className="w-16 h-px bg-gold mb-10" />

      {wishlistProducts.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 text-center">
          <Heart className="w-16 h-16 text-dark-border mb-5" />
          <h2 className="font-playfair text-2xl text-cream mb-2">
            Your wishlist is empty
          </h2>
          <p className="text-cream-muted mb-8 max-w-sm">
            Save your favourite fragrances here by tapping the heart icon on any product.
          </p>
          <Button as={Link} to="/shop">
            Browse Collection
          </Button>
        </div>
      ) : (
        <>
          <p className="text-cream-muted text-sm mb-6">
            {wishlistProducts.length}{' '}
            {wishlistProducts.length === 1 ? 'item' : 'items'} saved
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {wishlistProducts.map((product) => (
              <div key={product.id} className="luxury-card overflow-hidden group">
                <Link
                  to={`/product/${product.slug}`}
                  className="block aspect-[3/4] overflow-hidden"
                >
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </Link>
                <div className="p-4">
                  <Link to={`/product/${product.slug}`}>
                    <h3 className="font-playfair text-cream text-lg hover:text-gold transition-colors">
                      {product.name}
                    </h3>
                  </Link>
                  <p className="text-gold font-semibold mt-1">
                    {formatPrice(product.price)}
                  </p>
                  <div className="flex gap-2 mt-4">
                    <button
                      onClick={() => handleAddToCart(product)}
                      className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-gold text-dark text-xs font-semibold tracking-wider hover:bg-gold-light transition-colors"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      Add to Cart
                    </button>
                    <button
                      onClick={() => handleRemove(product.id, product.name)}
                      className="px-3 py-2.5 border border-dark-border text-cream-muted hover:text-red-400 hover:border-red-800 transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  )
}
