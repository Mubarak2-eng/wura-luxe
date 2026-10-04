import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    chunkSizeWarningLimit: 700,
    rollupOptions: {
      output: {
        manualChunks: {
          // Core React runtime
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          // Animation
          'framer-motion': ['framer-motion'],
          // State management
          'zustand': ['zustand'],
          // UI utilities
          'ui-vendor': ['lucide-react', 'react-hot-toast'],
        },
      },
    },
  },
})
