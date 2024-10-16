/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'custom-blue': '#26DBE4',
        'header-bg':"#fcedee"
      },
    },
  },
  plugins: [],
}
