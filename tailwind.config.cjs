/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./index.html"],
  theme: {
    letterSpacing:{
      widest:".20em"
    },
    colors:{
      lightBlue : "#72A6D5",
      background: "#090C0D",
      lightGrey:"#A6A6A6",
      borderColor:"#494F52",
      white:"#FFFFFF",
      black:"#000000",
      inputBg:"#181A1B"
    },
    extend:
    {
      fontFamily: {
        'figtree': ['Figtree', 'sans-serif'],
        'satoshi':['Satoshi', 'sans-serif'],
        'inter':['Inter','sans-serif'],
        'poppins':['Poppins','sans-serif']
      },
    },
  },
  plugins: [],
}