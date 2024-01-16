/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        wiggle: {
          '0%, 100%': {},
          '25%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(2deg)' },
          '75%': { transform: 'rotate(-1deg)' },
        },
      }
    },
  },
  plugins: [],
}

