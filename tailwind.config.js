/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        gold: {
          DEFAULT: '#c9a84c',
          light: '#e8c97a',
          dark: '#a07c2d',
          50: '#fdf8ec',
          100: '#f9edcc',
          200: '#f2d98a',
          300: '#e8c97a',
          400: '#d4a84b',
          500: '#c9a84c',
          600: '#a07c2d',
          700: '#7d5e1e',
          800: '#5c4316',
          900: '#3d2c0e',
        },
        dark: {
          DEFAULT: '#080808',
          secondary: '#0d0d0d',
          card: '#141414',
          border: '#242018',
          hover: '#1c1c1c',
        },
        cream: {
          DEFAULT: '#f5f0e8',
          muted: '#7a7060',
          soft: '#c0b8a8',
        },
      },
      fontFamily: {
        playfair: ['"Playfair Display"', 'serif'],
        inter: ['Inter', 'sans-serif'],
      },
      backgroundImage: {
        'gold-gradient': 'linear-gradient(135deg, #c9a84c 0%, #f0d882 45%, #c9a84c 75%, #a07c2d 100%)',
        'gold-radial': 'radial-gradient(ellipse at center, #c9a84c 0%, #a07c2d 100%)',
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'slide-in-right': 'slideInRight 0.3s ease-out',
        'float': 'float 6s ease-in-out infinite',
        'pulse-gold': 'pulseGold 3s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideInRight: {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        pulseGold: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(201,168,76,0.2)' },
          '50%': { boxShadow: '0 0 40px rgba(201,168,76,0.5)' },
        },
      },
    },
  },
  plugins: [],
}
