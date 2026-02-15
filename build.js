import { readdir, stat, mkdir, cp, rm } from "fs/promises"
import { join, dirname } from "path"
import { fileURLToPath } from "url"
import { exec } from "child_process"
import { promisify } from "util"

const execPromise = promisify(exec)
const __dirname = dirname(fileURLToPath(import.meta.url))

const DIST_DIR = join(__dirname, "dist")
const DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/

// Detect package manager - use npm in CI environments like Vercel
const isCI = process.env.CI || process.env.VERCEL
const PKG_MANAGER = isCI ? "npm" : "pnpm"
const INSTALL_TIMEOUT = 120000 // 2 minutes timeout

async function exists(path) {
    try {
        await stat(path)
        return true
    } catch {
        return false
    }
}

async function buildProject(dateFolder, projectName) {
    const projectPath = join(__dirname, dateFolder, projectName)
    const packageJsonPath = join(projectPath, "package.json")

    // Check if package.json exists (skip if not a buildable project)
    if (!(await exists(packageJsonPath))) {
        console.log(`⏭️  Skipping ${dateFolder}/${projectName} (no package.json)`)
        return false
    }

    console.log(`🔨 Building ${dateFolder}/${projectName}...`)

    try {
        // Install dependencies if node_modules doesn't exist
        const nodeModulesPath = join(projectPath, "node_modules")
        if (!(await exists(nodeModulesPath))) {
            console.log(`   📦 Installing dependencies with ${PKG_MANAGER}...`)
            await execPromise(`${PKG_MANAGER} install`, {
                cwd: projectPath,
                timeout: INSTALL_TIMEOUT
            })
        }

        // Build the project
        console.log(`   🏗️  Building...`)
        await execPromise("node --run build", {
            cwd: projectPath,
            timeout: INSTALL_TIMEOUT
        })

        // Copy built files to dist
        const projectDistPath = join(projectPath, "dist")
        const targetPath = join(DIST_DIR, dateFolder, projectName)

        if (await exists(projectDistPath)) {
            await mkdir(dirname(targetPath), { recursive: true })
            await cp(projectDistPath, targetPath, { recursive: true })
            console.log(`✅ Built ${dateFolder}/${projectName}`)
            return true
        } else {
            console.log(`⚠️  No dist folder found for ${dateFolder}/${projectName}`)
            return false
        }
    } catch (error) {
        console.error(`❌ Error building ${dateFolder}/${projectName}:`)
        console.log(error)
        return false
    }
}

async function buildAll() {
    console.log("🚀 Starting build process...\n")

    // Clean dist directory
    if (await exists(DIST_DIR)) {
        console.log("🧹 Cleaning dist directory...")
        await rm(DIST_DIR, { recursive: true })
    }
    await mkdir(DIST_DIR, { recursive: true })

    // Get all date folders
    const entries = await readdir(__dirname, { withFileTypes: true })
    const dateFolders = entries
        .filter((entry) => entry.isDirectory() && DATE_PATTERN.test(entry.name))
        .map((entry) => entry.name)
        .sort()

    console.log(`📁 Found ${dateFolders.length} date folders\n`)

    let successCount = 0
    let failCount = 0
    let skipCount = 0

    // Build each project
    for (const dateFolder of dateFolders) {
        const datePath = join(__dirname, dateFolder)
        const projectFolders = await readdir(datePath, { withFileTypes: true })

        for (const projectFolder of projectFolders) {
            if (projectFolder.isDirectory()) {
                const result = await buildProject(dateFolder, projectFolder.name)
                if (result === true) successCount++
                else if (result === false && result !== null) failCount++
                else skipCount++
            }
        }
        console.log("") // Empty line between date folders
    }

    // Create index.html for root
    const indexHtml = `
        <!doctype html>
        <html lang="en">
            <head>
                <meta charset="UTF-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <title>My Projects</title>
                <script src="https://cdn.tailwindcss.com"></script>
                <script src="https://cdn.jsdelivr.net/npm/lodash@4.17.23/lodash.min.js"></script>
                <style>
                    @import url("https://fonts.googleapis.com/css2?family=Comfortaa:wght@300..700&display=swap");
                    @import "tailwindcss";

                    * {
                        font-family: Comfortaa;
                    }

                    .dot-pattern {
                        background-image: radial-gradient(circle, #222222 1px, transparent 1px);
                        background-size: 20px 20px;
                    }
                </style>
            </head>
            <body class="bg-[#0A0A0A] text-white dot-pattern min-h-screen">
                <!-- Container -->
                <div class="max-w-5xl mx-6 lg:mx-auto px-1 py-8 flex flex-col gap-10">
                    <header class="bg-neutral-900/50 p-12 rounded-2xl">
                        <h1 class="text-5xl font-bold mb-2">Projects</h1>
                        <p class="text-neutral-500 text-sm"><span class="font-semibold" id="total">21</span> projects</p>
                    </header>
                    <main class="bg-neutral-900/50 p-8 rounded-2xl">
                        <table class="w-full">
                            <thead>
                                <tr class="text-neutral-600 text-xs uppercase tracking-wider border-b border-neutral-800">
                                    <th class="w-2/6 text-left pb-3 font-semibold">Date</th>
                                    <th class="w-4/6 text-left pb-3 font-semibold">Project</th>
                                </tr>
                            </thead>
                            <tbody class="text-sm" id="table-body">
                                <tr class="border-b border-neutral-900 hover:bg-neutral-900/30 transition-colors">
                                    <td class="py-4">
                                        <time class="text-neutral-500 font-mono text-xs" datetime="2026-02-26">2026-02-26</time>
                                    </td>
                                    <td class="py-4">
                                        <a href="#" class="text-neutral-200 font-medium">Cool</a>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </main>
                </div>
            </body>
            <script>
                const table = document.getElementById("table-body")
                const total = document.getElementById("total")
                /**
                 * @type {Map<string, { date: string, path: string }>}
                 */
                const AllProjects = new Map()

                function component([name, { date, path }]) {
                    return \`
                        <tr class="border-b border-neutral-900 hover:bg-neutral-900/30 transition-colors">
                            <td class="py-4">
                                <time class="text-neutral-500 font-mono text-xs" datetime="\${date}">\${date}</time>
                            </td>
                            <td class="py-4">
                                <a href="\${path}" class="text-neutral-200 font-medium">$\{name}</a>
                            </td>
                        </tr>
                    \`
                }

                const array = ${JSON.stringify(
                    await Promise.all(
                        dateFolders.map(async (dateFolder) => {
                            const datePath = join(__dirname, dateFolder)
                            const projectFolders = await readdir(datePath, { withFileTypes: true })
                            const projects = []
                            for (const pf of projectFolders) {
                                if (pf.isDirectory()) {
                                    const pkgPath = join(datePath, pf.name, "package.json")
                                    if (await exists(pkgPath)) {
                                        projects.push(pf.name)
                                    }
                                }
                            }
                            return { date: dateFolder, projects }
                        })
                    )
                )}

                for (const { date, projects } of array) {
                    for (const project of projects) AllProjects.set(_.startCase(project), { date, path: \`\${date}/\${project}\` })
                }

                total.textContent = AllProjects.size
                table.innerHTML = Array.from(AllProjects.entries())
                    .map((x) => component(x))
                    .join("\\n")
            </script>
        </html>
    `

    await mkdir(DIST_DIR, { recursive: true })
    await import("fs/promises").then((fs) => fs.writeFile(join(DIST_DIR, "index.html"), indexHtml))

    console.log("\n📊 Build Summary:")
    console.log(`   ✅ Successful: ${successCount}`)
    console.log(`   ⏭️  Skipped: ${skipCount}`)
    console.log(`   ❌ Failed: ${failCount}`)
    console.log(`\n🎉 Build complete! Output in ${DIST_DIR}`)
}

buildAll().catch(console.error)
