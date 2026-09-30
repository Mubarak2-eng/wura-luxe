import { Link } from 'react-router-dom'
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight, Sparkles, ShieldCheck } from 'lucide-react'
import {
  useCartStore,
  getCartSubtotal,
  getCartDiscount,
  getCartTotal,
} from '../store/cartStore'
import { formatPrice } from '../utils/helpers'
import { whatsAppOrderLink } from '../utils/whatsapp'
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
      <div className="section-pad py-24 flex flex-col items-center justify-center text-center min-h-[60vh]">
        <div className="w-20 h-20 rounded-3xl bg-gold/10 border border-gold/30 flex items-center justify-center mb-6">
          <ShoppingBag className="w-10 h-10 text-gold-bright" />
        </div>
        <h1 className="font-syne text-4xl text-white mb-2">Your Scent Vault is Empty</h1>
        <p className="font-cinzel text-gold-light italic text-lg mb-6">
          "Smell as good as you look!"
        </p>
        <p className="text-cream-muted text-sm mb-8 max-w-sm font-light">
          Explore our viral Arabian flacons, French niche elixirs, and layering sets.
        </p>
        <Link to="/shop" className="btn-futuristic px-8 py-4 rounded-xl text-xs font-bold">
          Enter The Vault
        </Link>
      </div>
    )
  }

  return (
    <div className="section-pad py-16">
      <div className="text-center max-w-3xl mx-auto mb-12">
        <div className="cyber-badge mb-3">
          <Sparkles className="w-3.5 h-3.5 text-gold-bright" />
          <span>VAULT REVIEW & SECURE CHECKOUT</span>
        </div>
        <h1 className="font-syne text-4xl sm:text-5xl font-black text-white mb-2">
          Your Scent <span className="text-liquid-gold">Vault</span>
        </h1>
        <p className="font-cinzel text-gold-light italic text-lg">
          "Smell as good as you look!"
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Items list */}
        <div className="lg:col-span-8 flex flex-col gap-4">
          {items.map((item) => (
            <div
              key={item.key}
              className="glass-panel p-5 rounded-2xl border border-white/10 hover:border-gold/30 transition-all flex flex-col sm:flex-row gap-5 items-start sm:items-center"
            >
              <Link to={`/product/${item.slug}`} className="w-20 h-24 sm:w-24 sm:h-28 rounded-xl overflow-hidden bg-black shrink-0 border border-white/10">
                <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
              </Link>

              <div className="flex-1 min-w-0">
                <Link to={`/product/${item.slug}`}>
                  <h3 className="font-syne text-lg font-bold text-white hover:text-gold-bright transition-colors truncate">
                    {item.name}
                  </h3>
                </Link>
                <span className="text-xs text-gold-light font-space">{item.volume}</span>
                <div className="font-syne text-base font-bold text-gold-bright mt-1">
                  {formatPrice(item.price)}
                </div>
              </div>

              {/* Quantity controls */}
              <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-start pt-3 sm:pt-0 border-t sm:border-t-0 border-white/10">
                <div className="flex items-center rounded-xl bg-white/5 border border-white/10">
                  <button
                    onClick={() => updateQuantity(item.key, item.quantity - 1)}
                    className="p-2.5 text-cream-soft hover:text-gold"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="px-3 text-xs font-space font-bold text-white">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.key, item.quantity + 1)}
                    className="p-2.5 text-cream-soft hover:text-gold"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="font-syne text-base font-bold text-white whitespace-nowrap">
                  {formatPrice(item.price * item.quantity)}
                </div>

                <button
                  onClick={() => removeItem(item.key)}
                  className="p-2.5 text-cream-muted hover:text-red-400 transition-colors"
                  title="Remove item"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}

          {/* Promo code box */}
          <div className="glass-panel p-6 rounded-2xl border border-white/10">
            <h4 className="text-xs font-space font-bold text-white uppercase tracking-wider mb-3">
              VIP Promo Code
            </h4>
            {promoCode ? (
              <div className="flex items-center justify-between p-3 rounded-xl bg-gold/10 border border-gold/40 text-gold-bright text-xs font-space">
                <span>🏷️ Code applied: {promoCode} ({Math.round(promoDiscount * 100)}% Discount)</span>
                <button onClick={removePromo} className="text-red-400 hover:underline">Remove</button>
              </div>
            ) : (
              <div className="flex gap-2">
                <input
                  value={promoInput}
                  onChange={(e) => setPromoInput(e.target.value.toUpperCase())}
                  placeholder="Enter MAMA10, VIP20, or GOLD15..."
                  className="flex-1 bg-[#090912] border border-white/10 rounded-xl px-4 py-3 text-xs text-white placeholder-cream-muted focus:outline-none focus:border-gold-bright"
                />
                <button
                  onClick={handleApplyPromo}
                  className="btn-futuristic px-5 py-3 rounded-xl text-xs font-bold"
                >
                  Apply
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Order summary sidebar */}
        <div className="lg:col-span-4">
          <div className="glass-panel p-7 rounded-3xl border border-gold/30 sticky top-28 shadow-2xl">
            <h3 className="font-syne text-xl font-bold text-white mb-6">
              Vault Summary
            </h3>

            <div className="space-y-3 text-xs font-space text-cream-muted mb-6 pb-6 border-b border-white/10">
              <div className="flex justify-between">
                <span>Subtotal ({items.length} items)</span>
                <span className="text-white font-bold">{formatPrice(sub)}</span>
              </div>
              {disc > 0 && (
                <div className="flex justify-between text-gold-bright">
                  <span>VIP Discount</span>
                  <span>-{formatPrice(disc)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Nationwide Shipping</span>
                <span className="text-white font-bold">{formatPrice(shippingCost)}</span>
              </div>
              <div className="flex justify-between text-base font-syne font-black text-white pt-2">
                <span>Total Amount</span>
                <span className="text-gold-bright">{formatPrice(tot)}</span>
              </div>
            </div>

            <div className="space-y-3">
              <Link
                to="/checkout"
                className="btn-futuristic w-full py-4 rounded-xl text-xs font-extrabold flex items-center justify-center gap-2"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <a
                href={whatsAppOrderLink(items, tot)}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 rounded-xl bg-[#25D366]/20 border border-[#25D366]/50 text-[#25D366] text-xs font-bold font-space text-center flex items-center justify-center gap-2 hover:bg-[#25D366] hover:text-black transition-all"
              >
                <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                <span>Instant WhatsApp Order</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
