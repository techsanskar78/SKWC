import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        ivory: '#FBF7F0',
        cream: '#F4EBDD',
        champagne: '#E8D5B7',
        maroon: '#5C0A22',
        burgundy: '#6E0E2E',
        gold: '#B78A3C',
        charcoal: '#1C1712',
      },
      fontFamily: {
        serif: ['var(--font-serif)', 'Georgia', 'serif'],
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        widest2: '0.25em',
      },
    },
  },
  plugins: [],
};
export default config;
