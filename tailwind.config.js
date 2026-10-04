/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        espresso: {
          DEFAULT: '#211713',
          dark: '#17100D',
          darker: '#0F0A08',
          light: '#2E221D',
          surface: '#291E19',
          border: '#3D2F28',
        },
        ivory: {
          DEFAULT: '#FAF6EF',
          light: '#FCFAF6',
          dark: '#F3ECE0',
          muted: '#EFE7DA',
        },
        champagne: {
          DEFAULT: '#C7A66A',
          hover: '#B89352',
          light: '#DFC79C',
          lighter: '#F1E7D4',
          dark: '#9E7F46',
          border: 'rgba(199, 166, 106, 0.3)',
          glow: 'rgba(199, 166, 106, 0.25)',
        },
        beige: {
          DEFAULT: '#E9DED0',
          light: '#F4ECE3',
          dark: '#D6C5B3',
          card: '#F6EFE7',
          border: '#E1D3C2',
        },
        charcoal: {
          DEFAULT: '#393431',
          light: '#5A534E',
          muted: '#7A726C',
          border: '#4D4743',
        },
      },
      fontFamily: {
        serif: ['"Playfair Display"', '"Cormorant Garamond"', 'Georgia', 'serif'],
        playfair: ['"Playfair Display"', 'serif'],
        cormorant: ['"Cormorant Garamond"', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'Inter', 'sans-serif'],
        inter: ['Inter', '"Plus Jakarta Sans"', 'sans-serif'],
      },
      boxShadow: {
        'luxury': '0 10px 30px -10px rgba(33, 23, 19, 0.08)',
        'luxury-lg': '0 20px 40px -15px rgba(33, 23, 19, 0.12)',
        'luxury-hover': '0 25px 50px -12px rgba(33, 23, 19, 0.18)',
        'gold-glow': '0 0 25px rgba(199, 166, 106, 0.25)',
      },
      letterSpacing: {
        'luxury': '0.15em',
        'luxury-wide': '0.25em',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out',
        'slide-up': 'slideUp 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
        'float-slow': 'float 7s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(15px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
      },
    },
  },
  plugins: [],
}
