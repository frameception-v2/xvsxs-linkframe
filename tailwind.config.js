/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#814FEF',
          50: '#F5F1FE',
          100: '#E9E0FD',
          200: '#D6C4FC',
          500: '#814FEF',
          900: '#2A1454',
        },
      },
      fontFamily: {
        sans: ['Nunito', 'system-ui', 'sans-serif'],
      },
      keyframes: {
        spring: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.05)' },
        },
        slide: {
          '0%': { opacity: 0, transform: 'translateY(20px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
      },
      animation: {
        spring: 'spring 300ms ease-in-out',
        slide: 'slide 200ms ease-out',
      },
    },
  },
  plugins: [
    require('tailwindcss-safe-area'),
  ],
};
