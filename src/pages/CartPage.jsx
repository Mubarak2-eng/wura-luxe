import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  Trash2,
  Plus,
  Minus,
  ShoppingBag,
  ArrowRight,
  Sparkles,
  ShieldCheck,
  Tag,
  ChevronRight,
  Truck,
} from 'lucide-react'
import {
  useCartStore,
  getCartSubtotal,
  getCartDiscount,
  getCartShipping,
  getCartTotal,
  FREE_SHIPPING_THRESHOLD,
} from '../store/cartStore'
import { formatPrice } from '../utils/helpers'
import { whatsAppOrderLink } from '../utils/whatsapp'
import toast from 'react-hot-toast'

export default function CartPage() {
  const [promoInput, setPromoInput] = useState('')
  const navigate = useNavigate()

  const {
    items,
    promoCode,
    promoDiscount,
    shippingCost,
    removeItem,
    updateQuantity,
    applyPromo,
    removePromo,
  } = useCartStore()

  const subtotal = getCartSubtotal(items)
  const discount = getCartDiscount(items, promoDiscount)
  const shipping = getCartShipping(items, shippingCost)
  const total = getCartTotal(items, promoDiscount, shippingCost)

  const freeShippingProgress = Math.min(
    100,
    Math.round((subtotal / FREE_SHIPPING_THRESHOLD) * 100)
  )
  const amountToFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal)

  const handleApplyPromo = (e) => {
    e.preventDefault()
    if (!promoInput.trim()) return
    const res = applyPromo(promoInput)
    if (res.success) {
      toast.success(res.message)
      setPromoInput('')
    } else {
      toast.error(res.message)
    }
  }

  if (items.length === 0) {
    return (
      <div className="section-pad py-24 flex flex-col items-center justify-center text-center min-h-[60vh]">
        <div className="w-20 h-20 rounded-full bg-[#FCFAF6] border border-[#E9DED0] flex items-center justify-center mb-6 text-[#C7A66A]">
          <ShoppingBag className="w-10 h-10" />
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#211713] mb-2">
          Your Fragrance Bag is Empty
        </h1>
        <p className="text-sm text-[#7A726C] mb-8 max-w-md font-light">
          Discover our bestseller flacons, concentrated Arabian attar oils, and viral layering combos.
        </p>
        <Link to="/shop" className="btn-espresso px-8 py-4 text-xs font-bold rounded">
          Start Shopping
        </Link>
      </div>
    )
  }

  return (
    <div className="bg-[#FAF6EF] min-h-screen pb-20">
      
      {/* ── Breadcrumb Navigation ── */}
      <div className="border-b border-[#E9DED0] bg-[#FCFAF6] py-3.5">
        <div className="section-pad flex items-center gap-2 text-xs text-[#7A726C]">
          <Link to="/" className="hover:text-[#211713] transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <Link to="/shop" className="hover:text-[#211713] transition-colors">
            Shop
          </Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-[#211713] font-semibold">Shopping Bag</span>
        </div>
      </div>

      <div className="section-pad py-10 sm:py-14">
        
        {/* Page Heading */}
        <div className="mb-10">
          <span className="text-xs uppercase font-bold tracking-[0.2em] text-[#C7A66A] block mb-2">
            YOUR SELECTION
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#211713]">
            Shopping Bag ({items.length} {items.length > 1 ? 'items' : 'item'})
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* ── Left: Items Table / List ── */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* Free Delivery Bar */}
            <div className="bg-white p-5 rounded-2xl border border-[#E9DED0] shadow-sm">
              {subtotal >= FREE_SHIPPING_THRESHOLD ? (
                <div className="flex items-center gap-2 text-xs font-semibold text-[#211713]">
                  <Sparkles className="w-4 h-4 text-[#C7A66A]" />
                  <span>You've qualified for <strong>Free Standard Lagos Delivery</strong>!</span>
                </div>
              ) : (
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs text-[#393431]">
                    <span className="flex items-center gap-2">
                      <Truck className="w-4 h-4 text-[#C7A66A]" />
                      Add <strong>{formatPrice(amountToFreeShipping)}</strong> more for Free Lagos Delivery
                    </span>
                    <span className="font-bold text-[#C7A66A]">{freeShippingProgress}%</span>
                  </div>
                  <div className="w-full h-2 bg-[#FAF6EF] rounded-full overflow-hidden border border-[#E9DED0]">
                    <div
                      className="h-full bg-[#C7A66A] transition-all duration-500 rounded-full"
                      style={{ width: `${freeShippingProgress}%` }}
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Items Cards */}
            <div className="space-y-4">
              {items.map((item) => (
                <div
                  key={item.key}
                  className="bg-white p-5 rounded-2xl border border-[#E9DED0] shadow-sm flex flex-col sm:flex-row gap-5 items-start sm:items-center"
                >
                  <Link
                    to={`/product/${item.slug}`}
                    className="w-20 h-24 sm:w-24 sm:h-28 rounded-xl overflow-hidden bg-[#FAF6EF] shrink-0 border border-[#E9DED0]"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </Link>

                  <div className="flex-1 min-w-0">
                    <span className="text-[10px] uppercase font-bold text-[#C7A66A] tracking-wider">
                      {item.subtitle || 'Mama Fragrance'}
                    </span>
                    <Link to={`/product/${item.slug}`}>
                      <h3 className="font-serif text-base sm:text-lg font-bold text-[#211713] hover:text-[#C7A66A] transition-colors truncate">
                        {item.name}
                      </h3>
                    </Link>
                    <p className="text-xs text-[#7A726C] mt-0.5">
                      Bottle Size: <strong className="text-[#211713]">{item.volume}</strong>
                    </p>
                    <div className="font-sans text-sm font-bold text-[#211713] mt-1">
                      {formatPrice(item.price)}
                    </div>
                  </div>

                  {/* Quantity and Line Total */}
                  <div className="flex items-center gap-5 w-full sm:w-auto justify-between sm:justify-start pt-3 sm:pt-0 border-t sm:border-t-0 border-[#E9DED0]">
                    <div className="flex items-center rounded-lg bg-[#FAF6EF] border border-[#E9DED0]">
                      <button
                        onClick={() => updateQuantity(item.key, item.quantity - 1)}
                        className="p-2 text-[#393431] hover:bg-[#E9DED0] rounded-l-lg transition-colors"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="px-3 text-xs font-bold text-[#211713]">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.key, item.quantity + 1)}
                        className="p-2 text-[#393431] hover:bg-[#E9DED0] rounded-r-lg transition-colors"
                        aria-label="Increase quantity"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    <div className="font-sans text-base font-bold text-[#211713] whitespace-nowrap min-w-[90px] text-right">
                      {formatPrice(item.price * item.quantity)}
                    </div>

                    <button
                      onClick={() => removeItem(item.key)}
                      className="p-2 text-[#7A726C] hover:text-red-600 transition-colors"
                      title="Remove item"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Promo Code Card */}
            <div className="bg-white p-6 rounded-2xl border border-[#E9DED0] shadow-sm">
              <h4 className="font-serif font-bold text-sm text-[#211713] mb-3 flex items-center gap-1.5">
                <Tag className="w-4 h-4 text-[#C7A66A]" /> Have a Promotional Code?
              </h4>

              {promoCode ? (
                <div className="flex items-center justify-between p-3 rounded-xl bg-[#FAF6EF] border border-[#C7A66A]/50 text-xs">
                  <span className="font-semibold text-[#211713]">
                    🏷️ Applied Code: <strong>{promoCode}</strong> (-{formatPrice(discount)})
                  </span>
                  <button onClick={removePromo} className="text-red-600 font-bold hover:underline">
                    Remove
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApplyPromo} className="flex gap-2">
                  <input
                    value={promoInput}
                    onChange={(e) => setPromoInput(e.target.value)}
                    placeholder="Enter code (e.g. MAMA10, MAMA20)..."
                    className="flex-1 bg-[#FAF6EF] border border-[#E9DED0] rounded-lg px-4 py-2.5 text-xs text-[#211713] placeholder-[#7A726C] focus:outline-none focus:border-[#C7A66A]"
                  />
                  <button type="submit" className="btn-espresso px-5 py-2.5 rounded-lg text-xs font-bold">
                    Apply Code
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* ── Right: Order Summary ── */}
          <div className="lg:col-span-4">
            <div className="bg-white p-7 rounded-2xl border border-[#E9DED0] shadow-luxury sticky top-28 space-y-6">
              <h3 className="font-serif text-xl font-bold text-[#211713] pb-4 border-b border-[#E9DED0]">
                Order Summary
              </h3>

              <div className="space-y-3 text-xs text-[#393431]">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold text-[#211713]">{formatPrice(subtotal)}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-[#C7A66A] font-semibold">
                    <span>Discount</span>
                    <span>-{formatPrice(discount)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Estimated Delivery</span>
                  <span>
                    {shipping === 0 ? (
                      <strong className="text-green-700">FREE</strong>
                    ) : (
                      formatPrice(shipping)
                    )}
                  </span>
                </div>
                <div className="flex justify-between text-base font-bold text-[#211713] pt-3 border-t border-[#E9DED0]">
                  <span>Total Payable</span>
                  <span>{formatPrice(total)}</span>
                </div>
              </div>

              <div className="space-y-3 pt-2">
                <button
                  onClick={() => navigate('/checkout')}
                  className="w-full btn-espresso py-4 text-xs font-bold rounded shadow-md flex items-center justify-center gap-2"
                >
                  <span>Proceed to Checkout</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <a
                  href={whatsAppOrderLink(items, total)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 rounded-lg border border-[#25D366] text-[#25D366] hover:bg-[#25D366] hover:text-white text-xs font-bold text-center flex items-center justify-center gap-2 transition-all"
                >
                  <span>Quick WhatsApp Order</span>
                </a>
              </div>

              <div className="pt-4 border-t border-[#FAF6EF] space-y-2 text-[11px] text-[#7A726C]">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#C7A66A]" />
                  <span>100% Genuine, Sealed Perfumes</span>
                </div>
                <div className="flex items-center gap-2">
                  <Truck className="w-3.5 h-3.5 text-[#C7A66A]" />
                  <span>Fast Delivery Across All 36 States + FCT</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
