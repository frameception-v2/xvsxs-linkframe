/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        safe: {
          top: "var(--safe-area-inset-top)",
          right: "var(--safe-area-inset-right)",
          bottom: "var(--safe-area-inset-bottom)",
          left: "var(--safe-area-inset-left)",
        }
      },
      borderRadius: {
        DEFAULT: "var(--radius)",
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
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
    require('@tailwindcss/container-queries'),
  ],
};
