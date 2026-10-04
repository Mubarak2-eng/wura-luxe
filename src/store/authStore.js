import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useAuthStore = create(
  persist(
    (set, get) => ({
      user: {
        id: 'user-demo-1',
        name: 'Oluchi Adeleke',
        email: 'oluchi@example.com',
        phone: '08034567890',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&q=80',
        address: '14 Admiralty Way, Lekki Phase 1',
        city: 'Lekki',
        state: 'Lagos State',
        createdAt: '2026-01-15T10:00:00.000Z',
      },
      isLoading: false,
      orders: [
        {
          id: 'MF-84920',
          createdAt: '2026-03-24T14:30:00.000Z',
          items: [
            {
              name: 'Shiyaaka Luxury Gold',
              volume: '100ml EDP',
              price: 38000,
              quantity: 1,
              image: '/images/products/shiyaaka-gold.jpg',
            },
            {
              name: 'Rouge 540 Scent Body Mist',
              volume: '250ml Mega Mist',
              price: 15000,
              quantity: 1,
              image: 'https://images.unsplash.com/photo-1563170351-be54b573ab31?w=800&q=85',
            },
          ],
          total: 53000,
          status: 'Delivered',
          paymentMethod: 'Paystack Card Payment',
          paymentStatus: 'Paid',
          shippingAddress: '14 Admiralty Way, Lekki Phase 1, Lagos State',
          trackingNumber: 'MF-84920',
          timeline: [
            { title: 'Order Confirmed', time: 'March 24, 2:30 PM', done: true },
            { title: 'Dispatched from Lagos Hub', time: 'March 25, 9:15 AM', done: true },
            { title: 'Out for Delivery', time: 'March 25, 1:40 PM', done: true },
            { title: 'Delivered Successfully', time: 'March 25, 3:20 PM', done: true },
          ],
        },
      ],

      signup: async ({ name, email, password, phone, state, city, address }) => {
        set({ isLoading: true })
        await new Promise((r) => setTimeout(r, 600))
        const user = {
          id: Date.now().toString(),
          name,
          email,
          phone: phone || '',
          state: state || 'Lagos State',
          city: city || 'Lagos',
          address: address || '',
          avatar: `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(name)}&backgroundColor=C7A66A&textColor=211713`,
          createdAt: new Date().toISOString(),
        }
        set({ user, isLoading: false })
        return { success: true }
      },

      login: async ({ email, password }) => {
        set({ isLoading: true })
        await new Promise((r) => setTimeout(r, 600))
        const existing = get().user
        if (existing && existing.email === email) {
          set({ isLoading: false })
          return { success: true }
        }
        const user = {
          id: 'user-' + Date.now(),
          name: email.split('@')[0].replace('.', ' '),
          email,
          phone: '08012345678',
          state: 'Lagos State',
          city: 'Lagos',
          address: 'Victoria Island, Lagos',
          avatar: `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(email)}&backgroundColor=C7A66A&textColor=211713`,
          createdAt: new Date().toISOString(),
        }
        set({ user, isLoading: false })
        return { success: true }
      },

      logout: () => {
        set({ user: null })
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
      name: 'mama-fragrance-auth',
    }
  )
)
