/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'cute-pink': '#ffe4e9',
        'cute-pink-dark': '#ff758f',
        'cute-rose': '#ff4d6d',
        'cute-purple': '#7209b7',
        'soft-bg': '#fff0f3',
      },
      fontFamily: {
        handwriting: ['Sacramento', 'cursive'],
        rounded: ['Fredoka', 'sans-serif'],
        sans: ['Outfit', 'sans-serif'],
      },
      animation: {
        'float': 'float 3s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
        'sparkle': 'sparkle 1.5s infinite alternate',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 15px rgba(255, 77, 109, 0.4)' },
          '50%': { boxShadow: '0 0 30px rgba(255, 77, 109, 0.8)' },
        },
        sparkle: {
          '0%': { opacity: '0.4', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1.1)' },
        }
      }
    },
  },
  plugins: [],
}
