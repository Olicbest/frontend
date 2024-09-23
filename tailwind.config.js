/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: ["Poppins", "Helvetica", "Arial", "Tahoma", ]
    },
  },
  plugins: [
    require('daisyui')
  ],
  daisyui: {
    themes: [
      "light"
    ],
  },
}