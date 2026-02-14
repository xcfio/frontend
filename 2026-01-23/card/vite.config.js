import { defineConfig } from "vite"

const path = `${import.meta.dirname}`.replaceAll("\\", "/").split("/").reverse()
export default defineConfig({ base: `${path[1]}/${path[0]}`, plugins: [] })
