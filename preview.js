import { createServer } from "vite"
import { fileURLToPath } from "url"
import { dirname, join } from "path"
import { existsSync } from "fs"

const __dirname = dirname(fileURLToPath(import.meta.url))
const distDir = join(__dirname, "dist")

if (!existsSync(distDir)) {
    console.error('❌ dist folder not found! Run "pnpm run build" first.')
    process.exit(1)
}

const server = await createServer({
    root: distDir,
    server: {
        port: 3000,
        open: true
    },
    configureServer(server) {
        server.middlewares.use((req, res, next) => {
            console.log(`📄 ${req.method} ${req.url}`)
            next()
        })
    }
})

await server.listen()

console.log("")
console.log("🚀 Preview server started!")
console.log("")
console.log("   Local:   http://localhost:3000")
console.log("")
console.log("   Test your projects at:")
console.log("   - http://localhost:3000/ (index page)")
console.log("   - http://localhost:3000/<date>/<project-name>")
console.log("")
console.log("Press Ctrl+C to stop")
