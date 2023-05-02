import { render } from "preact"
import { ThemeProvider, createTheme } from "@mui/material/styles"
import "./render.css"

const theme = createTheme({
  palette: {
    mode: "dark",
  },
})

export default (App) =>
  render(
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>,

    document.getElementById("root")
  )
