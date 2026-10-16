/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'warm-white': '#FAF9F6',
        editorial: {
          bg: '#FAF9F6',
          white: '#FFFFFF',
          primary: '#171717',
          secondary: '#737373',
          border: '#E7E5E4',
          accent: '#6554D9',
        },
        brand: {
          50: '#f7f6fd',
          100: '#efedfb',
          500: '#6554D9',
          600: '#5644cb',
          700: '#4835b8',
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
      },
      boxShadow: {
        'subtle': '0 1px 3px rgba(0, 0, 0, 0.04), 0 1px 2px rgba(0, 0, 0, 0.02)',
        'card': '0 2px 8px -2px rgba(0, 0, 0, 0.04)',
        'card-hover': '0 12px 24px -6px rgba(0, 0, 0, 0.06)',
      },
      borderColor: {
        DEFAULT: '#E7E5E4',
      }
    },
  },
  plugins: [],
}
