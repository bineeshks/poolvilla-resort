import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: 'class',
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './booking/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        clay:        '#B5451B',
        'clay-light':'#C8633E',
        'clay-deep': '#8B3210',
        sand:        '#F0EBE1',
        'sand-dark': '#E2D9CC',
        cream:       '#FAF7F2',
        'warm-white':'#FFFDF9',
        'villa-dark':'#2C1F14',
        gold:        '#C9A96E',
        'text-mid':  '#5C4A3A',
        'text-muted':'#9C8878',
      },
      fontFamily: {
        display: ['var(--font-cormorant)', 'serif'],
        body:    ['var(--font-jost)', 'sans-serif'],
        sans:    ['var(--font-inter)', 'sans-serif'],
      },
      borderRadius: {
        sm: '2px',
      },
      boxShadow: {
        'luxury':  '0 8px 40px rgba(44, 31, 20, 0.12)',
        'glow-gold':'0 0 30px rgba(201, 169, 110, 0.2)',
      },
      transitionTimingFunction: {
        'luxury': 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
      animation: {
        'shimmer-sweep': 'shimmer-sweep 3s infinite',
        'fade-up': 'fade-up 0.7s ease both',
      },
      keyframes: {
        'shimmer-sweep': {
          '0%':   { transform: 'translateX(-100%)' },
          '60%':  { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
        'fade-up': {
          from: { opacity: '0', transform: 'translateY(24px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}
export default config
