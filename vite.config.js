import { defineConfig } from "vite"
import { resolve } from "path"
import preact from "@preact/preset-vite"

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  plugins: [preact()],
  base: "./",
  build: {
    target: "chrome95",
    emptyOutDir: false,
    sourcemap: true,
    outDir: mode,
    rollupOptions: {
      input:
        mode === "dashboard"
          ? resolve(__dirname, `${mode}.html`)
          : {
              pundits: resolve(__dirname, `pundits.html`),
              host: resolve(__dirname, `host.html`),
            },
    },
  },
}))
