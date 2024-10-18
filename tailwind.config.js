/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'custom-blue': '#26DBE4',
        'header-bg':"#fcedee",
        'bg':"#141055",
        'footer':"#FC0149"
      },
    },
  },
  plugins: [],
}
