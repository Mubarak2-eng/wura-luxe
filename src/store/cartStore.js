import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const PROMO_CODES = {
  WURA10: { discount: 0.10, label: '10% off' },
  LUXE20: { discount: 0.20, label: '20% off' },
  GOLD15: { discount: 0.15, label: '15% off' },
}

export const useCartStore = create(
  persist(
    (set, get) => ({
      items: [],
      promoCode: null,
      promoDiscount: 0,
      shippingCost: 3000,

      addItem: (product, volume, quantity = 1) => {
        const { items } = get()
        const key = `${product.id}-${volume}`
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
                price: product.price,
                image: product.images[0],
                volume,
                slug: product.slug,
                quantity,
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
        return { success: false, message: 'Invalid promo code' }
      },

      removePromo: () => set({ promoCode: null, promoDiscount: 0 }),
    }),
    {
      name: 'wura-cart',
    }
  )
)

// ── Standalone selector helpers (call these outside of Zustand state) ──

export const getCartSubtotal = (items) =>
  items.reduce((acc, i) => acc + i.price * i.quantity, 0)

export const getCartDiscount = (items, promoDiscount) =>
  Math.round(getCartSubtotal(items) * promoDiscount)

export const getCartTotal = (items, promoDiscount, shippingCost) => {
  const sub = getCartSubtotal(items)
  const disc = getCartDiscount(items, promoDiscount)
  return sub - disc + (items.length > 0 ? shippingCost : 0)
}

export const getCartItemCount = (items) =>
  items.reduce((acc, i) => acc + i.quantity, 0)
