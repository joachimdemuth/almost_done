/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    screens: {
      'sm': '480px',
      'md': '768px',
      'lg': '976px',
      'xl': '1440px',
    },
    colors: {
      'primary-blue': '#005CFF',
      'primary-lime-green': '#52FF00',
      'gray-100': '#F3F4F6',
      'gray-300': '#CBCBCB',
      'gray-400': '#BEBEBE',
      'text-black': '#091527',
      'primary-white': '#FFFFFF',
    },
    extend: {
      fontFamily: {
        'body': [
          'TASA Orbiter Text',
          'sans-serif'
        ],
        'display': [
          'TASA Orbiter Display',
          'sans-serif'
        ],
      },
    },
  },
  plugins: [],
}
