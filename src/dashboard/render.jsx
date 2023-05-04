import { render } from "preact"
import { ThemeProvider, createTheme } from "@mui/material/styles"
import "./render.css"

const theme = createTheme({
  palette: {
    mode: "dark",
    background: {
      paper: "#090F21",
    },
    grey: {
      50: "#f8fafc",
      100: "#f1f5f9",
      200: "#e2e8f0",
      300: "#cbd5e1",
      400: "#94a3b8",
      500: "#64748b",
      600: "#475569",
      700: "#334155",
      800: "#1e293b",
      900: "#0f172a",
      950: "#020617",
      A100: "#f1f5f9",
      A200: "#e2e8f0",
      A400: "#94a3b8",
      A700: "#334155",
    },
    text: {
      primary: "#f1f5f9",
      secondary: "#e2e8f0",
      disabled: "#94a3b8",
    },
    divider: "#334155",
  },
})

export default (App) =>
  render(
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>,

    document.getElementById("root")
  )
