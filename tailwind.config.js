const { nextui } = require("@nextui-org/react");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      flex: {
        2: "2 2 0%",
        3: "3 3 0%",
        4: "4 4 0%",
      },
    },
  },
  darkMode: "class",
  plugins: [
    nextui({
      themes: {
        light: {
          colors: {
            background: "#FAF5F0",
            foreground: "#262322",
            primary: {
              DEFAULT: "#C97D60",
              foreground: "#262322",
            },
          },
        },
        dark: {
          colors: {
            background: {
              DEFAULT: "#262322",
              500: "#201E1D",
              600: "#161413",
            },
            foreground: "#F2E5D7",
            primary: {
              DEFAULT: "#C97D60",
              foreground: "#262322",
            },
          },
        },
      },
    }),
  ],
};
