/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          red: '#FF686B',
          orange: '#FFAC81',
          yellow: '#FFFF00',
          green: '#38B000',
          blue: '#3A86FF',
          purple: '#7161EF',
        },
        secondary: {
          red: '#FFADAD',
          orange: '#FFD6A5',
          yellow: '#FDFFB6',
          green: '#7BF1A8',
          blue: '#A2D2FF',
          purple: '#BDB2FF',
        },
      },
    },
  },
  plugins: [
    require('tailwind-scrollbar-hide'),
  ],
};