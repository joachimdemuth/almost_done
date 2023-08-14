/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
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
