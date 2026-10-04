import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const PROMO_CODES = {
  MAMA10: { discount: 0.10, label: '10% off Mama Welcome' },
  MAMA20: { discount: 0.20, label: '20% off VIP Scent Reward' },
  SIGNATURE15: { discount: 0.15, label: '15% off Signature Collection' },
}

export const FREE_SHIPPING_THRESHOLD = 50000

export const useCartStore = create(
  persist(
    (set, get) => ({
      items: [],
      promoCode: null,
      promoDiscount: 0,
      shippingCost: 3000,
      deliveryMethod: 'lagos-standard',

      setDeliveryMethod: (method, cost) => {
        set({ deliveryMethod: method, shippingCost: cost })
      },

      addItem: (product, volume, quantity = 1, priceOverride = null) => {
        const { items } = get()
        const selectedVolume = volume || (product.volumes && product.volumes[0]) || 'Standard'
        const unitPrice = priceOverride !== null ? priceOverride : (product.sizePrices?.[selectedVolume] || product.price)
        const key = `${product.id}-${selectedVolume}`
        
        const existing = items.find((i) => i.key === key)
        if (existing) {
          set({
            items: items.map((i) =>
              i.key === key ? { ...i, quantity: i.quantity + quantity } : i
            ),
          })
        } else {
          set({
            items: [
              ...items,
              {
                key,
                productId: product.id,
                name: product.name,
                subtitle: product.subtitle || '',
                price: unitPrice,
                image: product.images[0],
                volume: selectedVolume,
                slug: product.slug,
                quantity,
                category: product.category,
              },
            ],
          })
        }
      },

      removeItem: (key) => {
        set({ items: get().items.filter((i) => i.key !== key) })
      },

      updateQuantity: (key, quantity) => {
        if (quantity < 1) {
          set({ items: get().items.filter((i) => i.key !== key) })
          return
        }
        set({
          items: get().items.map((i) =>
            i.key === key ? { ...i, quantity } : i
          ),
        })
      },

      clearCart: () => set({ items: [], promoCode: null, promoDiscount: 0 }),

      applyPromo: (code) => {
        const upper = code.trim().toUpperCase()
        const promo = PROMO_CODES[upper]
        if (promo) {
          set({ promoCode: upper, promoDiscount: promo.discount })
          return { success: true, message: `Promo applied: ${promo.label}` }
        }
        set({ promoCode: null, promoDiscount: 0 })
        return { success: false, message: 'Invalid or expired promotional code' }
      },

      removePromo: () => set({ promoCode: null, promoDiscount: 0 }),
    }),
    {
      name: 'mama-fragrance-cart',
    }
  )
)

// ── Standalone selector helpers ──────────────────────────────────────────────

export const getCartSubtotal = (items) =>
  items.reduce((acc, i) => acc + i.price * i.quantity, 0)

export const getCartDiscount = (items, promoDiscount) =>
  Math.round(getCartSubtotal(items) * promoDiscount)

export const getCartShipping = (items, baseShippingCost = 3000) => {
  const sub = getCartSubtotal(items)
  if (items.length === 0) return 0
  if (sub >= FREE_SHIPPING_THRESHOLD && baseShippingCost === 3000) {
    return 0 // Free standard delivery threshold met!
  }
  return baseShippingCost
}

export const getCartTotal = (items, promoDiscount, shippingCost) => {
  const sub = getCartSubtotal(items)
  const disc = getCartDiscount(items, promoDiscount)
  const ship = getCartShipping(items, shippingCost)
  return sub - disc + ship
}

export const getCartItemCount = (items) =>
  items.reduce((acc, i) => acc + i.quantity, 0)
