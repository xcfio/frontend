import devtools from "solid-devtools/vite"
import tailwindcss from "@tailwindcss/vite"
import solidPlugin from "vite-plugin-solid"
import { defineConfig } from "vite"
import { platform } from "node:os"

const path = `${import.meta.dirname}`.replaceAll("\\", "/").split("/").reverse()
export default defineConfig({
    base: platform() !== "win32" ? `${path[1]}/${path[0]}` : "./",
    plugins: [devtools(), solidPlugin(), tailwindcss()],
    build: { target: "esnext" }
})
