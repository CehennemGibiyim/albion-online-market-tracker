/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'albion': {
          'gold': '#FFD700',
          'silver': '#C0C0C0',
          'bronze': '#CD7F32',
          'dark': '#0f0f0f',
          'darker': '#1a1a1a',
          'card': '#2d2d2d',
          'border': '#4a4a4a',
          'text': '#ffffff',
          'text-secondary': '#b0b0b0',
        }
      },
      fontFamily: {
        'albion': ['Segoe UI', 'Roboto', 'sans-serif'],
      },
      animation: {
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
      },
      keyframes: {
        'pulse-glow': {
          '0%, 100%': { boxShadow: '0 0 20px rgba(255, 215, 0, 0.3)' },
          '50%': { boxShadow: '0 0 30px rgba(255, 215, 0, 0.6)' },
        }
      }
    },
  },
  plugins: [],
}
