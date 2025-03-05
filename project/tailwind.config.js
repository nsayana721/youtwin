/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#FEF2F0',
          100: '#FDE6E2',
          200: '#FBC7BE',
          300: '#F9A99A',
          400: '#F88B76',
          500: '#F75B48',
          600: '#F63A23',
          700: '#E91E06',
          800: '#C41904',
          900: '#9F1403',
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};
