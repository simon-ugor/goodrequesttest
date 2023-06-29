/** @type {import('tailwindcss').Config} */

const colors = require('tailwindcss/colors')

module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      black: colors.black,
      white: colors.white,
      gray: colors.gray,
      emerald: colors.emerald,
      indigo: colors.indigo,
      yellow: colors.yellow,
      red: "#FF0000",
      brown: "#CD8B65",
      gainsboro: "#dcdcdc"
    },
    extend: {
      gridTemplateRows: {
        "2": "20% 35%",
        "3": "5% auto 30%"
      },
      gridTemplateColumns: {
        "4": "18% auto 25% 18%",
        "3": "18% auto 18%",
        "2": "20% 90%"
      },
    },
  },
  plugins: [require("daisyui")],
}

