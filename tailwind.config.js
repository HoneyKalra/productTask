/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["../projects/src/*{.html,.js}"],
  theme: {
    extend: {
      fontFamily:{
        'primary':['jost']
      }
    },
  },
  plugins: [],
};
