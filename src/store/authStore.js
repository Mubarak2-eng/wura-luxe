import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useAuthStore = create(
  persist(
    (set, get) => ({
      user: null,
      isLoading: false,
      orders: [],

      // Mock signup
      signup: async ({ name, email, password }) => {
        set({ isLoading: true })
        await new Promise((r) => setTimeout(r, 800))
        const user = {
          id: Date.now().toString(),
          name,
          email,
          avatar: `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(name)}&backgroundColor=c9a84c&textColor=0a0a0a`,
          createdAt: new Date().toISOString(),
        }
        set({ user, isLoading: false })
        return { success: true }
      },

      // Mock login
      login: async ({ email, password }) => {
        set({ isLoading: true })
        await new Promise((r) => setTimeout(r, 800))
        // Accept any credentials for demo
        const user = {
          id: '1',
          name: email.split('@')[0],
          email,
          avatar: `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(email)}&backgroundColor=c9a84c&textColor=0a0a0a`,
          createdAt: new Date().toISOString(),
        }
        set({ user, isLoading: false })
        return { success: true }
      },

      logout: () => {
        set({ user: null, orders: [] })
      },

      updateProfile: (updates) => {
        set({ user: { ...get().user, ...updates } })
      },

      addOrder: (order) => {
        set({ orders: [order, ...get().orders] })
      },

      isAuthenticated: () => !!get().user,
    }),
    {
      name: 'wura-auth',
    }
  )
)
