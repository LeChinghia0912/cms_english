import defaultTheme from "tailwindcss/defaultTheme";

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  // darkMode: "selector",
  theme: {
    extend: {
      colors: {
        primary: "#657C7D",
        secondary: "#FED766",
      },
    },

    screens: {
      xs: "480px",
      ...defaultTheme.screens,
    },
  },
  plugins: [require("daisyui")],
};
