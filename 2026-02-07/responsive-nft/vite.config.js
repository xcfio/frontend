import { defineConfig } from "vite"
import { platform } from "node:os"

const path = `${import.meta.dirname}`.replaceAll("\\", "/").split("/").reverse()
export default defineConfig({ base: platform() !== "win32" ? `${path[1]}/${path[0]}` : "./", plugins: [] })
