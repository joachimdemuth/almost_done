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
      'button-hover': '#0045bbff',
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
          'TASA Explorer',
          'sans-serif'
        ],
        'display': [
          'TASA Orbiter Display',
          'sans-serif'
        ],
      },
      animation: {
        'prolong' : 'prolong 0.s ease-in-out forwards',
      },
      keyframes: {
        'prolong' : {
          '0%' : { borderRadius: '50px',
        background: 'transparent'},
          '100%' : { borderRadius: '8px',
        background: '#52ff0050' },
        }
      }
    },
  },
  plugins: [],
}
