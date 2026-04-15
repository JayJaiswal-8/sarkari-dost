/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      animation: {
        'morph': 'morph 15s ease-in-out infinite',
        'pulse-slow': 'pulse 6s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        morph: {
          '0%, 100%': { 'border-radius': '40% 60% 60% 40% / 40% 40% 60% 60%' },
          '33%': { 'border-radius': '60% 40% 40% 60% / 60% 60% 40% 40%' },
          '66%': { 'border-radius': '40% 60% 40% 60% / 40% 40% 60% 60%' },
        },
      },
    },
  },
  plugins: [],
}
