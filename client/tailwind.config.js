/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    colors: {
      // Configure your color palette here
      'color-primary':'rgb(255,255,255)',
      'color-secondary': 'rgb(0,28,48)',
      'color-third': 'rgb(23,107,135)',
      'color-error': 'rgb(190,0,10)',
      'color-button-create':'rgb(3,201,136)',
      'color-button-delete':'rgb(250,42,42)',
      'color-input':'rgb(68,64,60)',
      'color-navbarhover':'rgb(0,49,84)',
    }
  },
  plugins: [],
}

