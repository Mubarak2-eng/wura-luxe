import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useWishlistStore = create(
  persist(
    (set, get) => ({
      items: [], // array of product IDs

      add: (productId) => {
        if (!get().items.includes(productId)) {
          set({ items: [...get().items, productId] })
        }
      },

      remove: (productId) => {
        set({ items: get().items.filter((id) => id !== productId) })
      },

      toggle: (productId) => {
        const { items, add, remove } = get()
        if (items.includes(productId)) {
          remove(productId)
          return false // removed
        } else {
          add(productId)
          return true // added
        }
      },

      isWishlisted: (productId) => get().items.includes(productId),

      clear: () => set({ items: [] }),
    }),
    {
      name: 'wura-wishlist',
    }
  )
)
