/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{js,ts,css,jsx,tsx,scss,sass}'],
  theme: {
    extend: {
      colors: {
        primary: '#DA70D6',
        secondary: '#E6A4B4',
        yellowish: '#FAF3E0'
      },
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
        serif: ['Playfair Display', 'serif'],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': {transform: 'translateY(0)'},
          '50%': {transform: 'translateY(-10px)'},
        }
      }
    },
  },
  plugins: [],
};
