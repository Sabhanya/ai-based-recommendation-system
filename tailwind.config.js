/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        agri: {
          50: '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',
          500: '#22c55e',
          600: '#16a34a',
          700: '#15803d',
          800: '#166534',
          900: '#14532d',
          950: '#052e16',
        },
        harvest: {
          50: '#fffbeb',
          100: '#fef3c7',
          200: '#fde68a',
          300: '#fcd34d',
          400: '#fbbf24',
          500: '#f59e0b',
          600: '#d97706',
          700: '#b45309',
        },
        earth: {
          50: '#faf8f5',
          100: '#f4ede4',
          200: '#e7d9c6',
          300: '#d5bea1',
          400: '#be9e7a',
          500: '#ab8359',
          600: '#926a45',
          700: '#755237',
          800: '#604430',
          900: '#503a2a',
        }
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', 'sans-serif'],
        telugu: ['"Noto Sans Telugu"', '"Gautami"', '"Mandali"', 'system-ui', 'sans-serif']
      },
      boxShadow: {
        'soft-sm': '0 2px 8px -2px rgba(22, 101, 52, 0.06)',
        'soft': '0 4px 20px -2px rgba(22, 101, 52, 0.08)',
        'soft-lg': '0 10px 30px -4px rgba(22, 101, 52, 0.12)',
        'glow': '0 0 25px rgba(34, 197, 94, 0.25)',
      }
    },
  },
  plugins: [],
}
