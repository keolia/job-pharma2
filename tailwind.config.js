/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        green: {
          50: '#e9f9f0',
          100: '#d1f0e0',
          200: '#a4e1c2',
          300: '#76d2a3',
          400: '#48c485',
          500: '#1abc9c',
          600: '#17b978',
          700: '#179f6b',
          800: '#128965',
          900: '#0a6e4e',
          950: '#064e38',
        },
      },
      boxShadow: {
        sm: '0 1px 2px 0 rgba(25,102,60,0.05)',
        DEFAULT: '0 1px 3px 0 rgba(25,102,60,0.1), 0 1px 2px -1px rgba(25,102,60,0.1)',
        md: '0 4px 6px -1px rgba(25,102,60,0.1), 0 2px 4px -2px rgba(25,102,60,0.1)',
        lg: '0 10px 15px -3px rgba(25,102,60,0.1), 0 4px 6px -4px rgba(25,102,60,0.1)',
        xl: '0 20px 25px -5px rgba(25,102,60,0.1), 0 8px 10px -6px rgba(25,102,60,0.1)',
      },
    },
  },
  plugins: [],
};