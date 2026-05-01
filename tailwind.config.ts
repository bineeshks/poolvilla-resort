import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        clay: '#B5451B',
        'clay-light': '#C8633E',
        'clay-deep': '#8B3210',
        sand: '#F0EBE1',
        'sand-dark': '#E2D9CC',
        cream: '#FAF7F2',
        'warm-white': '#FFFDF9',
        'villa-dark': '#2C1F14',
        gold: '#C9A96E',
        'text-mid': '#5C4A3A',
        'text-muted': '#9C8878',
      },
      fontFamily: {
        display: ['var(--font-cormorant)', 'serif'],
        body: ['var(--font-jost)', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
export default config
