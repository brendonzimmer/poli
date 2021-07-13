module.exports = {
  mode: "jit",
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        logo: "MADE TOMMY",
      },
      colors: {
        bright: {
          DEFAULT: "hsl(249,47%,97%)",
        },
        primary: {
          DEFAULT: "hsl(250,100%,15%)",
        },
        secondary: {
          darker: "hsl(253,5%,20%)",
          dark: "hsl(253,5%,35%)",
          "slightly-dark": "hsl(253,5%,55%)",
          DEFAULT: "hsl(253,5%,65%)",
          light: "hsl(253,15%,75%)",
          lighter: "hsl(253,15%,87%)",
        },
        nav: {
          DEFAULT: "hsl(249,34%,88%)",
        },
        button: {
          dark: "hsl(250,60%,60%)",
          DEFAULT: "hsl(250,64%,68%)",
          light: "hsl(250,70%,77%)",
          lighter: "hsl(250,70%,85%)",
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require("@tailwindcss/forms"), require("@tailwindcss/line-clamp")],
};
