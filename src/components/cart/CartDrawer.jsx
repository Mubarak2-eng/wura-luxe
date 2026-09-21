import { useRef, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { X, Plus, Minus, Trash2, ShoppingBag, Tag } from 'lucide-react'
import {
  useCartStore,
  getCartSubtotal,
  getCartDiscount,
  getCartTotal,
} from '../../store/cartStore'
import { formatPrice } from '../../utils/helpers'
import { whatsAppOrderLink } from '../../utils/whatsapp'
import Button from '../ui/Button'
import toast from 'react-hot-toast'

export default function CartDrawer({ isOpen, onClose }) {
  const drawerRef = useRef()
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

  useEffect(() => {
    const handler = (e) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onClose])

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  const handleApplyPromo = () => {
    const result = applyPromo(promoInput)
    if (result.success) toast.success(result.message)
    else toast.error(result.message)
  }

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          onClick={onClose}
        />
      )}

      <aside
        ref={drawerRef}
        className={`fixed top-0 right-0 h-full w-full sm:w-[420px] bg-dark-secondary border-l border-dark-border z-50 flex flex-col transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-dark-border">
          <div className="flex items-center gap-3">
            <ShoppingBag className="w-5 h-5 text-gold" />
            <h2 className="font-playfair text-xl text-cream">
              Your Cart
              {items.length > 0 && (
                <span className="text-gold ml-2 text-base">({items.length})</span>
              )}
            </h2>
          </div>
          <button onClick={onClose} className="p-1 text-cream-muted hover:text-gold transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <ShoppingBag className="w-16 h-16 text-dark-border mb-4" />
              <p className="font-playfair text-xl text-cream mb-2">Your cart is empty</p>
              <p className="text-sm text-cream-muted mb-6">Discover our luxury fragrance collection</p>
              <Button as={Link} to="/shop" onClick={onClose}>Shop Now</Button>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              {items.map((item) => (
                <div key={item.key} className="flex gap-4 py-4 border-b border-dark-border last:border-0">
                  <img src={item.image} alt={item.name} className="w-20 h-24 object-cover shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-cream font-medium text-sm truncate">{item.name}</p>
                    <p className="text-cream-muted text-xs mt-0.5">{item.volume}</p>
                    <p className="text-gold font-semibold text-sm mt-1">{formatPrice(item.price)}</p>
                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center border border-dark-border">
                        <button
                          onClick={() => updateQuantity(item.key, item.quantity - 1)}
                          className="px-2.5 py-1.5 text-cream-muted hover:text-gold transition-colors"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="px-3 text-cream text-sm">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.key, item.quantity + 1)}
                          className="px-2.5 py-1.5 text-cream-muted hover:text-gold transition-colors"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <button onClick={() => removeItem(item.key)} className="text-cream-muted hover:text-red-400 transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-dark-border px-6 py-5 flex flex-col gap-4">
            {promoCode ? (
              <div className="flex items-center justify-between bg-gold/10 border border-gold/30 px-3 py-2">
                <div className="flex items-center gap-2 text-gold text-sm">
                  <Tag className="w-4 h-4" />
                  <span>{promoCode} — {Math.round(promoDiscount * 100)}% off</span>
                </div>
                <button onClick={removePromo} className="text-cream-muted hover:text-red-400 transition-colors">
                  <X className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="flex gap-2">
                <input
                  value={promoInput}
                  onChange={(e) => setPromoInput(e.target.value)}
                  placeholder="Promo code…"
                  className="flex-1 bg-dark border border-dark-border text-cream placeholder-cream-muted px-3 py-2 text-sm focus:outline-none focus:border-gold"
                />
                <button
                  onClick={handleApplyPromo}
                  className="px-4 py-2 border border-gold text-gold text-sm hover:bg-gold hover:text-dark transition-colors"
                >
                  Apply
                </button>
              </div>
            )}

            <div className="flex flex-col gap-2 text-sm">
              <div className="flex justify-between text-cream-muted">
                <span>Subtotal</span><span>{formatPrice(sub)}</span>
              </div>
              {disc > 0 && (
                <div className="flex justify-between text-gold">
                  <span>Discount</span><span>-{formatPrice(disc)}</span>
                </div>
              )}
              <div className="flex justify-between text-cream-muted">
                <span>Shipping</span><span>{formatPrice(shippingCost)}</span>
              </div>
              <div className="flex justify-between text-cream font-semibold text-base pt-2 border-t border-dark-border">
                <span>Total</span><span className="text-gold">{formatPrice(tot)}</span>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <Button as={Link} to="/checkout" onClick={onClose} fullWidth size="lg">
                Proceed to Checkout
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
            </div>
          </div>
        )}
      </aside>
    </>
  )
}
