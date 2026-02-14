import { platform } from "node:os"
import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"

const path = `${import.meta.dirname}`.replaceAll("\\", "/").split("/").reverse()
export default defineConfig({ base: platform() !== "win32" ? `${path[1]}/${path[0]}` : "./", plugins: [react()] })
