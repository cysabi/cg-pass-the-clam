import { defineConfig } from "vite"
import { resolve } from "path"
import preact from "@preact/preset-vite"

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  plugins: [preact()],
  base: "./",
  build: {
    target: "chrome95",
    sourcemap: true,
    outDir: mode,
    rollupOptions: {
      input: resolve(__dirname, `${mode}.html`),
    },
  },
}))
