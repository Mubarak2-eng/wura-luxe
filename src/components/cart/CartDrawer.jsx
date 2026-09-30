import { useRef, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { X, Plus, Minus, Trash2, ShoppingBag, Tag, ArrowRight } from 'lucide-react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import {
  useCartStore,
  getCartSubtotal,
  getCartDiscount,
  getCartTotal,
} from '../../store/cartStore'
import { formatPrice } from '../../utils/helpers'
import { whatsAppOrderLink } from '../../utils/whatsapp'
import toast from 'react-hot-toast'

export default function CartDrawer({ isOpen, onClose }) {
  const drawerRef = useRef()
  const [promoInput, setPromoInput] = useState('')
  const shouldReduceMotion = useReducedMotion()

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

  // Escape key handler
  useEffect(() => {
    const handler = (e) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onClose])

  // Prevent background scroll when drawer is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  const handleApplyPromo = () => {
    const result = applyPromo(promoInput)
    if (result.success) toast.success(result.message)
    else toast.error(result.message)
  }

  // Exact curve: cubic-bezier(0.16, 1, 0.3, 1) over 350ms
  const drawerTransition = {
    duration: shouldReduceMotion ? 0.15 : 0.35,
    ease: [0.16, 1, 0.3, 1],
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          
          {/* ── Backdrop Overlay: Fade from 0 to 40% (0.4) opacity over 350ms ── */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.4 }}
            exit={{ opacity: 0 }}
            transition={drawerTransition}
            onClick={onClose}
            className="fixed inset-0 bg-black backdrop-blur-sm transform-gpu will-change-[opacity]"
            aria-hidden="true"
          />

          {/* ── Cart Drawer Panel: Slide from right edge over 350ms with [0.16, 1, 0.3, 1] ── */}
          <motion.aside
            ref={drawerRef}
            initial={shouldReduceMotion ? { opacity: 0 } : { x: '100%' }}
            animate={shouldReduceMotion ? { opacity: 1 } : { x: '0%' }}
            exit={shouldReduceMotion ? { opacity: 0 } : { x: '100%' }}
            transition={drawerTransition}
            className="fixed top-0 right-0 h-full w-full sm:w-[440px] max-w-full bg-[#07070d] border-l border-gold/30 z-50 flex flex-col shadow-[-20px_0_60px_rgba(0,0,0,0.9)] transform-gpu will-change-transform"
          >
            {/* Header with touch-friendly 44px close button */}
            <div className="flex items-center justify-between px-5 sm:px-6 py-4 sm:py-5 border-b border-white/10 bg-[#090912]/80 backdrop-blur-md">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-gold/15 border border-gold/30 flex items-center justify-center">
                  <ShoppingBag className="w-4 h-4 text-gold-bright" />
                </div>
                <div>
                  <h2 className="font-syne text-lg sm:text-xl font-bold text-white flex items-center gap-2">
                    <span>Scent Vault</span>
                    {items.length > 0 && (
                      <span className="text-xs font-space font-extrabold text-gold-bright bg-gold/10 px-2 py-0.5 rounded-full border border-gold/20">
                        {items.length}
                      </span>
                    )}
                  </h2>
                  <p className="text-[10px] text-cream-muted font-space uppercase">
                    "Smell as good as you look!"
                  </p>
                </div>
              </div>

              <button
                onClick={onClose}
                className="w-11 h-11 rounded-xl bg-white/5 hover:bg-white/10 text-cream-soft hover:text-white flex items-center justify-center transition-colors border border-white/10"
                aria-label="Close cart drawer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Scrollable Items Container */}
            <div className="flex-1 overflow-y-auto px-5 sm:px-6 py-4 overscroll-contain">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center py-12">
                  <div className="w-20 h-20 rounded-3xl bg-gold/10 border border-gold/30 flex items-center justify-center mb-5">
                    <ShoppingBag className="w-10 h-10 text-gold-bright" />
                  </div>
                  <p className="font-syne text-xl text-white font-bold mb-1">Your Vault is Empty</p>
                  <p className="font-cinzel text-gold-light italic text-sm mb-6">
                    "Smell as good as you look!"
                  </p>
                  <Link
                    to="/shop"
                    onClick={onClose}
                    className="btn-futuristic px-7 py-3 rounded-xl text-xs font-bold"
                  >
                    Explore Vault Signatures
                  </Link>
                </div>
              ) : (
                <div className="flex flex-col gap-3">
                  {items.map((item) => (
                    <div
                      key={item.key}
                      className="p-3.5 sm:p-4 rounded-2xl glass-panel border border-white/10 flex gap-3.5 items-center"
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-20 sm:w-18 sm:h-22 object-cover rounded-xl bg-black shrink-0 border border-white/10"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-white font-syne font-bold text-sm truncate">{item.name}</p>
                        <p className="text-xs text-gold-light font-space">{item.volume}</p>
                        <p className="text-gold-bright font-bold text-sm mt-1">{formatPrice(item.price)}</p>

                        {/* Quantity controls with generous 40px touch targets */}
                        <div className="flex items-center justify-between mt-2.5 pt-2 border-t border-white/10">
                          <div className="flex items-center rounded-lg bg-white/5 border border-white/10">
                            <button
                              onClick={() => updateQuantity(item.key, item.quantity - 1)}
                              className="w-8 h-8 flex items-center justify-center text-cream-soft hover:text-gold active:bg-white/10"
                              aria-label="Decrease quantity"
                            >
                              <Minus className="w-3.5 h-3.5" />
                            </button>
                            <span className="px-2.5 text-xs font-space font-bold text-white">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.key, item.quantity + 1)}
                              className="w-8 h-8 flex items-center justify-center text-cream-soft hover:text-gold active:bg-white/10"
                              aria-label="Increase quantity"
                            >
                              <Plus className="w-3.5 h-3.5" />
                            </button>
                          </div>

                          <button
                            onClick={() => removeItem(item.key)}
                            className="p-2 text-cream-muted hover:text-red-400 transition-colors"
                            aria-label="Remove item"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer with touch-friendly sticky checkout */}
            {items.length > 0 && (
              <div className="border-t border-white/10 bg-[#090912]/95 backdrop-blur-md px-5 sm:px-6 py-4 pb-6 flex flex-col gap-3.5 shadow-[0_-10px_30px_rgba(0,0,0,0.5)]">
                {/* Promo Code Input */}
                {promoCode ? (
                  <div className="flex items-center justify-between p-2.5 rounded-xl bg-gold/10 border border-gold/30 text-gold-bright text-xs font-space">
                    <div className="flex items-center gap-1.5">
                      <Tag className="w-3.5 h-3.5" />
                      <span>{promoCode} ({Math.round(promoDiscount * 100)}% off)</span>
                    </div>
                    <button onClick={removePromo} className="text-red-400 hover:underline">
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ) : (
                  <div className="flex gap-2">
                    <input
                      value={promoInput}
                      onChange={(e) => setPromoInput(e.target.value.toUpperCase())}
                      placeholder="Promo code (e.g. MAMA10)"
                      className="flex-1 bg-white/5 border border-white/10 text-white placeholder-cream-muted px-3 py-2.5 rounded-xl text-xs focus:outline-none focus:border-gold-bright"
                    />
                    <button
                      onClick={handleApplyPromo}
                      className="btn-futuristic px-4 py-2.5 rounded-xl text-xs font-bold shrink-0"
                    >
                      Apply
                    </button>
                  </div>
                )}

                {/* Subtotal breakdown */}
                <div className="space-y-1.5 text-xs font-space text-cream-muted">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span className="text-white font-bold">{formatPrice(sub)}</span>
                  </div>
                  {disc > 0 && (
                    <div className="flex justify-between text-gold-bright">
                      <span>Discount</span>
                      <span>-{formatPrice(disc)}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span className="text-white font-bold">{formatPrice(shippingCost)}</span>
                  </div>
                  <div className="flex justify-between text-base font-syne font-black text-white pt-1.5 border-t border-white/10">
                    <span>Total</span>
                    <span className="text-gold-bright">{formatPrice(tot)}</span>
                  </div>
                </div>

                {/* Sticky Action CTAs */}
                <div className="flex flex-col gap-2 pt-1">
                  <Link
                    to="/checkout"
                    onClick={onClose}
                    className="btn-futuristic w-full py-3.5 rounded-xl text-xs font-extrabold flex items-center justify-center gap-2 text-center"
                  >
                    <span>Proceed to Checkout</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>

                  <a
                    href={whatsAppOrderLink(items, tot)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3 rounded-xl bg-[#25D366]/20 border border-[#25D366]/50 text-[#25D366] text-xs font-bold font-space text-center flex items-center justify-center gap-2 hover:bg-[#25D366] hover:text-black transition-all"
                  >
                    <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                    <span>Instant WhatsApp Order</span>
                  </a>
                </div>
              </div>
            )}
          </motion.aside>
        </div>
      )}
    </AnimatePresence>
  )
}
