import type { Config } from 'tailwindcss'

// Resolve content globs relative to THIS config file, not process.cwd(),
// so Tailwind scans the right files regardless of where the dev server
// was launched from.
const root = __dirname.replace(/\\/g, '/')

const config: Config = {
  content: [
    `${root}/pages/**/*.{js,ts,jsx,tsx,mdx}`,
    `${root}/components/**/*.{js,ts,jsx,tsx,mdx}`,
    `${root}/app/**/*.{js,ts,jsx,tsx,mdx}`,
  ],
  theme: {
    extend: {
      colors: {
        ocean: '#00E5FF',
        coral: '#FF5C2A',
        gold: '#D4A843',
        abyss: '#02060A',
        deep: '#060D17',
        slate: '#0A1628',
        muted: '#8892A0',
      },
      fontFamily: {
        display: ['var(--font-display)', 'sans-serif'],
        body: ['var(--font-body)', 'sans-serif'],
        mono: ['var(--font-mono)', 'monospace'],
      },
      animation: {
        'fade-up': 'fadeUp 0.8s ease forwards',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'spin-slow': 'spin 20s linear infinite',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}
export default config
