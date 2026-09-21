import { Link } from 'react-router-dom'
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight } from 'lucide-react'
import {
  useCartStore,
  getCartSubtotal,
  getCartDiscount,
  getCartTotal,
} from '../store/cartStore'
import { formatPrice } from '../utils/helpers'
import { whatsAppOrderLink } from '../utils/whatsapp'
import Button from '../components/ui/Button'
import { useState } from 'react'
import toast from 'react-hot-toast'

export default function CartPage() {
  const [promoInput, setPromoInput] = useState('')

  const items = useCartStore((s) => s.items)
  const promoCode = useCartStore((s) => s.promoCode)
  const promoDiscount = useCartStore((s) => s.promoDiscount)
  const shippingCost = useCartStore((s) => s.shippingCost)
  const removeItem = useCartStore((s) => s.removeItem)
  const updateQuantity = useCartStore((s) => s.updateQuantity)
  const applyPromo = useCartStore((s) => s.applyPromo)
  const removePromo = useCartStore((s) => s.removePromo)

  const sub = getCartSubtotal(items)
  const disc = getCartDiscount(items, promoDiscount)
  const tot = getCartTotal(items, promoDiscount, shippingCost)

  const handleApplyPromo = () => {
    const result = applyPromo(promoInput)
    if (result.success) toast.success(result.message)
    else toast.error(result.message)
  }

  if (items.length === 0) {
    return (
      <div className="section-pad py-20 flex flex-col items-center justify-center text-center min-h-[60vh]">
        <ShoppingBag className="w-20 h-20 text-dark-border mb-6" />
        <h1 className="font-playfair text-4xl text-cream mb-3">Your cart is empty</h1>
        <p className="text-cream-muted mb-8 max-w-sm">
          Discover our curated collection of luxury fragrances.
        </p>
        <Button as={Link} to="/shop" size="lg">Continue Shopping</Button>
      </div>
    )
  }

  return (
    <div className="section-pad py-12">
      <h1 className="font-playfair text-4xl text-cream mb-2">Shopping Cart</h1>
      <div className="w-16 h-px bg-gold mb-10" />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Items */}
        <div className="lg:col-span-2 flex flex-col gap-4">
          {items.map((item) => (
            <div key={item.key} className="luxury-card p-5 flex gap-5 items-start">
              <Link to={`/product/${item.slug}`}>
                <img src={item.image} alt={item.name} className="w-24 h-28 object-cover" />
              </Link>
              <div className="flex-1 min-w-0">
                <Link to={`/product/${item.slug}`}>
                  <h3 className="font-playfair text-xl text-cream hover:text-gold transition-colors">
                    {item.name}
                  </h3>
                </Link>
                <p className="text-cream-muted text-sm mt-1">{item.volume}</p>
                <p className="text-gold font-semibold mt-2">{formatPrice(item.price)}</p>
                <div className="flex items-center justify-between mt-4">
                  <div className="flex items-center border border-dark-border">
                    <button
                      onClick={() => updateQuantity(item.key, item.quantity - 1)}
                      className="px-3 py-2 text-cream-muted hover:text-gold transition-colors"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="px-4 text-cream text-sm">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.key, item.quantity + 1)}
                      className="px-3 py-2 text-cream-muted hover:text-gold transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-cream font-semibold">
                      {formatPrice(item.price * item.quantity)}
                    </span>
                    <button
                      onClick={() => removeItem(item.key)}
                      className="text-cream-muted hover:text-red-400 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* Promo code */}
          <div className="luxury-card p-5">
            <p className="text-cream text-sm font-medium mb-3">Have a promo code?</p>
            {promoCode ? (
              <div className="flex items-center justify-between bg-gold/10 border border-gold/30 px-4 py-3">
                <span className="text-gold text-sm">
                  🏷️ {promoCode} — {Math.round(promoDiscount * 100)}% off applied
                </span>
                <button onClick={removePromo} className="text-cream-muted hover:text-red-400 text-xs transition-colors">
                  Remove
                </button>
              </div>
            ) : (
              <div className="flex gap-3">
                <input
                  value={promoInput}
                  onChange={(e) => setPromoInput(e.target.value.toUpperCase())}
                  placeholder="Enter promo code…"
                  className="flex-1 bg-dark border border-dark-border text-cream placeholder-cream-muted px-4 py-3 text-sm focus:outline-none focus:border-gold"
                />
                <button
                  onClick={handleApplyPromo}
                  className="px-6 py-3 border border-gold text-gold text-sm hover:bg-gold hover:text-dark transition-colors"
                >
                  Apply
                </button>
              </div>
            )}
            <p className="text-xs text-cream-muted mt-2">Try: WURA10, LUXE20, or GOLD15</p>
          </div>
        </div>

        {/* Order summary */}
        <div className="luxury-card p-6 h-fit sticky top-24">
          <h2 className="font-playfair text-2xl text-cream mb-6">Order Summary</h2>
          <div className="flex flex-col gap-3 text-sm mb-6">
            <div className="flex justify-between text-cream-muted">
              <span>Subtotal ({items.length} items)</span>
              <span>{formatPrice(sub)}</span>
            </div>
            {disc > 0 && (
              <div className="flex justify-between text-gold">
                <span>Discount</span>
                <span>-{formatPrice(disc)}</span>
              </div>
            )}
            <div className="flex justify-between text-cream-muted">
              <span>Shipping</span>
              <span>{formatPrice(shippingCost)}</span>
            </div>
            <div className="flex justify-between text-cream font-semibold text-base pt-3 border-t border-dark-border">
              <span>Total</span>
              <span className="text-gold">{formatPrice(tot)}</span>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <Button as={Link} to="/checkout" fullWidth size="lg">
              Checkout <ArrowRight className="w-4 h-4" />
            </Button>
            <a
              href={whatsAppOrderLink(items, tot)}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3 border border-[#25D366] text-[#25D366] text-sm font-semibold text-center flex items-center justify-center gap-2 hover:bg-[#25D366] hover:text-white transition-colors"
            >
              <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              Order via WhatsApp
            </a>
            <Link to="/shop" className="text-center text-sm text-cream-muted hover:text-gold transition-colors">
              ← Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
