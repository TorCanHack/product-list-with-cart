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

      inset: {
        '1000': '62.5rem'
      },
      screens :{
        'lg': '1040px'
      },

      width: {
        '279': '17.438rem',
        '592': '37rem',
        '800': '50rem',
        
      }
    },
  },
  plugins: [],
}

