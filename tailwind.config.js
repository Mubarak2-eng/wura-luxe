/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        void: {
          DEFAULT: '#030305',
          darker: '#010103',
          card: '#09090f',
          glass: 'rgba(12, 12, 20, 0.72)',
          border: 'rgba(212, 175, 55, 0.15)',
          glow: 'rgba(212, 175, 55, 0.25)',
        },
        gold: {
          DEFAULT: '#d4af37',
          light: '#f5e29f',
          bright: '#ffd700',
          dark: '#997a15',
          metallic: '#c5a059',
          50: '#fbf8eb',
          100: '#f4edcd',
          200: '#ead898',
          300: '#dcbe5e',
          400: '#d4af37',
          500: '#b89222',
          600: '#946f19',
          700: '#765117',
          800: '#644219',
          900: '#56381a',
        },
        amber: {
          neon: '#ff9e00',
        },
        champagne: {
          DEFAULT: '#f3e5ab',
          light: '#faf4dc',
        },
      },
      fontFamily: {
        cinzel: ['Cinzel', 'serif'],
        syne: ['Syne', 'sans-serif'],
        space: ['"Space Grotesk"', 'sans-serif'],
        jakarta: ['"Plus Jakarta Sans"', 'sans-serif'],
        playfair: ['"Playfair Display"', 'serif'],
      },
      backgroundImage: {
        'futuristic-grid': "radial-gradient(circle at 50% 50%, rgba(212,175,55,0.06) 0%, transparent 80%), linear-gradient(to right, rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.02) 1px, transparent 1px)",
        'gold-metallic-grad': 'linear-gradient(135deg, #ffd700 0%, #d4af37 35%, #f5e29f 50%, #997a15 80%, #ffd700 100%)',
        'glass-grad': 'linear-gradient(135deg, rgba(255,255,255,0.07) 0%, rgba(255,255,255,0.01) 100%)',
        'cyber-glow': 'radial-gradient(circle at center, rgba(212,175,55,0.18) 0%, rgba(212,175,55,0.02) 50%, transparent 80%)',
      },
      animation: {
        'float-slow': 'float 8s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 4s ease-in-out infinite',
        'shimmer': 'shimmer 2.5s infinite linear',
        'border-spin': 'borderSpin 6s linear infinite',
        'aurora': 'aurora 15s ease infinite alternate',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-14px) rotate(1deg)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.4', filter: 'drop-shadow(0 0 15px rgba(212,175,55,0.2))' },
          '50%': { opacity: '0.9', filter: 'drop-shadow(0 0 35px rgba(212,175,55,0.6))' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        aurora: {
          '0%': { transform: 'rotate(0deg) scale(1)' },
          '50%': { transform: 'rotate(180deg) scale(1.15)' },
          '100%': { transform: 'rotate(360deg) scale(1)' },
        },
      },
    },
  },
  plugins: [],
}
