/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.tsx", "./src/components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        black: "#000000",
        dev: "#fea005",
        primary:'#EE6928'
      },
      fontSize: {
        'title-main': '21px', 
      },
      fontWeight: {
        'title-main': '600',
      },
    },
  },
  plugins: [],
};
