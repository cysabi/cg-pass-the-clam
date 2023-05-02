const defaultTheme = require("tailwindcss/defaultTheme")

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        graphics: ["'Triester Sans'", ...defaultTheme.fontFamily.sans],
        dashboard: ["'Open Sans'", ...defaultTheme.fontFamily.sans],
        mono: ["'IBM Plex Mono'", ...defaultTheme.fontFamily.mono],
      },
    },
  },
  plugins: [],
}
