module.exports = {
  purge: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      backgroundColor: {
        'pastel-blue-light': '#DDEBF7',
        'pastel-purple-light': '#E5DCF5',
        'pastel-pink-light': '#FDEEF3',
        'pastel-blue': '#467FCF',
        'pastel-purple': '#9B5DE5',
        'pastel-pink': '#F15BB5',
      },
      textColor: {
        'pastel-blue': '#467FCF',
        'pastel-purple': '#9B5DE5',
        'pastel-pink': '#F15BB5',
        'pastel-blue-light': '#DDEBF7',
        'pastel-purple-light': '#E5DCF5',
        'pastel-pink-light': '#FDEEF3',
      },
      gradientColorStops: {
        'pastel-blue': '#467FCF',
        'pastel-purple': '#9B5DE5',
        'pastel-pink': '#F15BB5',
        'pastel-blue-light': '#DDEBF7',
        'pastel-purple-light': '#E5DCF5',
        'pastel-pink-light': '#FDEEF3',
      },
      borderColor: {
        'black': '#000000',
      },
      boxShadow: {
        'button': '0px 6px 0px black',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
