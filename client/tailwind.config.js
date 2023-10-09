/** @type {import('tailwindcss').Config} */

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "path-to-your-node_modules/@material-tailwind/react/components/**/*.{js,ts,jsx,tsx}",
    "path-to-your-node_modules/@material-tailwind/react/theme/components/**/*.{js,ts,jsx,tsx}",
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
      'color-slate-300':'rgb(203,213,225)',
      'color-neutral-400':'rgb(163,163,163)',
    },
    screens: {
      'sm': { 'min': '300px', 'max': '767px' },
      // => @media (min-width: 640px and max-width: 767px) { ... }

      'md': { 'min': '768px', 'max': '1023px' },
      // => @media (min-width: 768px and max-width: 1023px) { ... }

      'lg': { 'min': '1024px', 'max': '1279px' },
      // => @media (min-width: 1024px and max-width: 1279px) { ... }

      'xl': { 'min': '1280px', 'max': '1535px' },
      // => @media (min-width: 1280px and max-width: 1535px) { ... }

      '2xl': { 'min': '1536px' },
      // => @media (min-width: 1536px) { ... }
  },
  },
  plugins: [],
}

