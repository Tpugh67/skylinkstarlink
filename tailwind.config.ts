import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        sky: {
          50:  '#e8f4fd',
          100: '#c3e0f9',
          200: '#9acbf4',
          300: '#66aeed',
          400: '#3d93e6',
          500: '#1a78de',
          600: '#1260b8',
          700: '#0c4a90',
          800: '#083468',
          900: '#051e40',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        display: ['var(--font-sora)', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
export default config
