/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Outfit"', '"Plus Jakarta Sans"', 'sans-serif'],
        heading: ['"Outfit"', '"Plus Jakarta Sans"', 'sans-serif'],
        sans: ['"Plus Jakarta Sans"', '"Outfit"', 'sans-serif'],
        serif: ['"Outfit"', '"Plus Jakarta Sans"', 'sans-serif'],
        editorial: ['"Playfair Display"', 'Georgia', 'serif'],
      },
      keyframes: {
        marquee: {
          '0%':   { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        popIn: {
          '0%':   { transform: 'scale(0.92) translateY(12px)', opacity: '0' },
          '100%': { transform: 'scale(1) translateY(0)',       opacity: '1' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-6px)' },
        }
      },
      animation: {
        'marquee': 'marquee 32s linear infinite',
        'pop-in':  'popIn 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'float':   'float 4s ease-in-out infinite',
      },
      colors: {
        gift: {
          50: '#fff1f2',
          100: '#ffe4e6',
          200: '#fecdd3',
          300: '#fda4af',
          400: '#fb7185',
          500: '#f43f5e',
          600: '#e11d48',
          700: '#be123c',
          800: '#9f1239',
          900: '#580A1A',
          950: '#380510',
          gold: '#D4AF37',
          champagne: '#F7E7CE',
          cream: '#FAF8F5'
        },
      },
      spacing: {
        '3.5': '0.875rem',
        '4.5': '1.125rem',
        '5.5': '1.375rem',
      },
      boxShadow: {
        '2xs': '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        'card-hover': '0 20px 40px -15px rgba(159, 18, 57, 0.12)',
        'gift': '0 14px 36px -10px rgba(159, 18, 57, 0.22)',
        'glass': '0 8px 32px 0 rgba(31, 38, 135, 0.07)',
      },
    },
  },
  plugins: [],
}
