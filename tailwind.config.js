/** @type {import('tailwindcss').Config} */
module.exports = {
  
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        'primary': '#F8FAED',
        'secondary': '#222223',
        'tertiary': '#4EA65A',
      },
    },
  },
  plugins: [],
}