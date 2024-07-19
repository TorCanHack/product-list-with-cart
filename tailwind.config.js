/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'brown-100': '#F5EEEC',
        'brown-300': '#CAAFA7',
        'brown-400': '#AD8A85',
        'brown-500': '#87635A',
        'brown-900': '#260F08'
      },
      fontSize: {
        '40': '2.5rem'
      },
      fontFamily: {
        'redHatText': 'Red Hat Text'
      }, 

      width: {
        '279': '17.438rem'
      }
    },
  },
  plugins: [],
}

