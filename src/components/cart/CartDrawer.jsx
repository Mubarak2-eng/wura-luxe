import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  ShoppingBag,
  X,
  Plus,
  Minus,
  Trash2,
  ArrowRight,
  Sparkles,
  Tag,
  Truck,
  ShieldCheck,
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  useCartStore,
  getCartSubtotal,
  getCartDiscount,
  getCartShipping,
  getCartTotal,
  getCartItemCount,
  FREE_SHIPPING_THRESHOLD,
} from '../../store/cartStore'
import { formatPrice } from '../../utils/helpers'
import toast from 'react-hot-toast'

export default function CartDrawer({ isOpen, onClose }) {
  const [promoInput, setPromoInput] = useState('')
  const {
    items,
    removeItem,
    updateQuantity,
    promoCode,
    promoDiscount,
    applyPromo,
    removePromo,
    shippingCost,
  } = useCartStore()

  const navigate = useNavigate()
  const subtotal = getCartSubtotal(items)
  const discount = getCartDiscount(items, promoDiscount)
  const shipping = getCartShipping(items, shippingCost)
  const total = getCartTotal(items, promoDiscount, shippingCost)
  const itemCount = getCartItemCount(items)

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

  const handleCheckout = () => {
    onClose()
    navigate('/checkout')
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-[#211713]/60 backdrop-blur-sm"
            onClick={onClose}
          />

          <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="w-screen max-w-md bg-[#FAF6EF] shadow-2xl flex flex-col border-l border-[#E9DED0]"
            >
              {/* ── Header ── */}
              <div className="p-5 sm:p-6 border-b border-[#E9DED0] bg-[#FCFAF6] flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <ShoppingBag className="w-5 h-5 text-[#C7A66A]" />
                  <h2 className="font-serif font-bold text-lg text-[#211713]">
                    Your Fragrance Bag
                  </h2>
                  <span className="text-xs bg-[#E9DED0] text-[#211713] font-bold px-2 py-0.5 rounded-full">
                    {itemCount}
                  </span>
                </div>
                <button
                  onClick={onClose}
                  className="p-1.5 rounded-full text-[#7A726C] hover:text-[#211713] hover:bg-[#E9DED0]/50 transition-colors"
                  aria-label="Close bag"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* ── Free Shipping Meter ── */}
              <div className="bg-[#FAF6EF] px-6 py-3 border-b border-[#E9DED0]">
                {subtotal >= FREE_SHIPPING_THRESHOLD ? (
                  <div className="flex items-center gap-2 text-xs font-semibold text-[#211713]">
                    <Sparkles className="w-4 h-4 text-[#C7A66A]" />
                    <span>You've unlocked <strong>Free Standard Delivery</strong> in Lagos!</span>
                  </div>
                ) : (
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs text-[#393431]">
                      <span className="flex items-center gap-1.5">
                        <Truck className="w-3.5 h-3.5 text-[#C7A66A]" />
                        Add <strong>{formatPrice(amountToFreeShipping)}</strong> for Free Delivery
                      </span>
                      <span className="font-bold text-[#C7A66A]">{freeShippingProgress}%</span>
                    </div>
                    <div className="w-full h-1.5 bg-[#E9DED0] rounded-full overflow-hidden">
                      <div
                        className="h-full bg-[#C7A66A] transition-all duration-500 rounded-full"
                        style={{ width: `${freeShippingProgress}%` }}
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* ── Cart Items List ── */}
              <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-4">
                {items.length === 0 ? (
                  <div className="text-center py-16 flex flex-col items-center justify-center">
                    <div className="w-16 h-16 rounded-full bg-[#FCFAF6] border border-[#E9DED0] flex items-center justify-center text-[#C7A66A] mb-4">
                      <ShoppingBag className="w-7 h-7" />
                    </div>
                    <h3 className="font-serif font-bold text-lg text-[#211713] mb-1">
                      Your bag is empty
                    </h3>
                    <p className="text-xs text-[#7A726C] max-w-xs mb-6">
                      Discover our bestsellers and signature fragrance oils to begin your journey.
                    </p>
                    <button
                      onClick={() => {
                        onClose()
                        navigate('/shop')
                      }}
                      className="btn-espresso text-xs px-6 py-3"
                    >
                      Shop Bestsellers
                    </button>
                  </div>
                ) : (
                  items.map((item) => (
                    <div
                      key={item.key}
                      className="flex gap-4 p-3.5 rounded-xl bg-white border border-[#E9DED0] shadow-sm relative group"
                    >
                      <Link
                        to={`/product/${item.slug}`}
                        onClick={onClose}
                        className="w-18 h-20 rounded-lg overflow-hidden bg-[#FAF6EF] border border-[#E9DED0] shrink-0"
                      >
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </Link>

                      <div className="flex-1 flex flex-col justify-between">
                        <div>
                          <div className="flex items-start justify-between gap-2">
                            <Link
                              to={`/product/${item.slug}`}
                              onClick={onClose}
                              className="font-serif font-bold text-sm text-[#211713] hover:text-[#C7A66A] transition-colors line-clamp-1"
                            >
                              {item.name}
                            </Link>
                            <button
                              onClick={() => removeItem(item.key)}
                              className="text-[#7A726C] hover:text-red-600 transition-colors p-0.5"
                              title="Remove item"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                          <p className="text-[11px] text-[#7A726C]">
                            Size: <span className="font-medium text-[#211713]">{item.volume}</span>
                          </p>
                        </div>

                        <div className="flex items-center justify-between mt-2 pt-2 border-t border-[#FAF6EF]">
                          <span className="font-bold text-sm text-[#211713]">
                            {formatPrice(item.price * item.quantity)}
                          </span>

                          {/* Quantity Controls */}
                          <div className="flex items-center border border-[#E9DED0] rounded-md bg-[#FAF6EF]">
                            <button
                              onClick={() => updateQuantity(item.key, item.quantity - 1)}
                              className="p-1 hover:bg-[#E9DED0] text-[#393431] transition-colors"
                              aria-label="Decrease quantity"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="px-2.5 text-xs font-bold text-[#211713]">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.key, item.quantity + 1)}
                              className="p-1 hover:bg-[#E9DED0] text-[#393431] transition-colors"
                              aria-label="Increase quantity"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* ── Footer & Checkout summary ── */}
              {items.length > 0 && (
                <div className="p-5 sm:p-6 bg-[#FCFAF6] border-t border-[#E9DED0] space-y-4">
                  {/* Coupon Code Input */}
                  {promoCode ? (
                    <div className="flex items-center justify-between p-2.5 bg-[#FAF6EF] border border-[#C7A66A]/40 rounded-lg text-xs">
                      <div className="flex items-center gap-1.5 text-[#211713] font-semibold">
                        <Tag className="w-3.5 h-3.5 text-[#C7A66A]" />
                        <span>Code Applied: <strong>{promoCode}</strong> (-{formatPrice(discount)})</span>
                      </div>
                      <button
                        onClick={removePromo}
                        className="text-[11px] text-red-600 font-bold hover:underline"
                      >
                        Remove
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleApplyPromo} className="flex gap-2">
                      <div className="relative flex-1">
                        <Tag className="w-3.5 h-3.5 text-[#7A726C] absolute left-3 top-1/2 -translate-y-1/2" />
                        <input
                          value={promoInput}
                          onChange={(e) => setPromoInput(e.target.value)}
                          placeholder="Promo code (e.g. MAMA10)"
                          className="w-full bg-white border border-[#E9DED0] rounded-lg pl-8 pr-3 py-2 text-xs focus:outline-none focus:border-[#C7A66A]"
                        />
                      </div>
                      <button
                        type="submit"
                        className="px-3 py-2 bg-[#E9DED0] hover:bg-[#C7A66A] hover:text-white text-xs font-bold rounded-lg text-[#211713] transition-colors"
                      >
                        Apply
                      </button>
                    </form>
                  )}

                  {/* Pricing Breakdown */}
                  <div className="space-y-1.5 text-xs text-[#393431] pt-1">
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
                      <span>Delivery (Lagos Standard)</span>
                      <span>
                        {shipping === 0 ? (
                          <span className="text-green-700 font-bold">FREE</span>
                        ) : (
                          formatPrice(shipping)
                        )}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm font-bold text-[#211713] pt-2 border-t border-[#E9DED0]">
                      <span>Estimated Total</span>
                      <span>{formatPrice(total)}</span>
                    </div>
                  </div>

                  {/* Checkout CTA */}
                  <div className="space-y-2">
                    <button
                      onClick={handleCheckout}
                      className="w-full btn-espresso py-3.5 text-xs font-bold rounded shadow-lg flex items-center justify-center gap-2"
                    >
                      <span>Proceed to Checkout</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>

                    <Link
                      to="/cart"
                      onClick={onClose}
                      className="block text-center text-xs font-semibold text-[#7A726C] hover:text-[#211713] py-1 transition-colors"
                    >
                      View Detailed Cart Page
                    </Link>
                  </div>

                  <div className="flex items-center justify-center gap-4 text-[10px] text-[#7A726C] pt-1">
                    <span className="flex items-center gap-1">
                      <ShieldCheck className="w-3 h-3 text-[#C7A66A]" /> 100% Authentic Scents
                    </span>
                    <span>•</span>
                    <span>Paystack Secure Checkout</span>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  )
}
