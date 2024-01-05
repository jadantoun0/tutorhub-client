/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      width: {
        '350': '500px',
        '120': '30rem',
        '140': '35rem'
      },
      height: {
        '88': '22rem'
      },
      colors: {
        'gray': '#D9D9D9',
        'violet': '#592ACD',
        'darkColor': '#fc03a9',
        'borderColor': '#D1D1D1'
      },
    },
  },  
  plugins: [],
}

