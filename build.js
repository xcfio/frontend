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
    const indexHtml = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Project Portfolio</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { 
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            padding: 2rem;
        }
        .container { 
            max-width: 1200px; 
            margin: 0 auto; 
            background: white;
            border-radius: 20px;
            padding: 3rem;
            box-shadow: 0 20px 60px rgba(0,0,0,0.3);
        }
        h1 { 
            color: #333; 
            margin-bottom: 1rem;
            font-size: 2.5rem;
        }
        .subtitle {
            color: #666;
            margin-bottom: 3rem;
            font-size: 1.1rem;
        }
        .date-section { 
            margin-bottom: 2.5rem; 
        }
        .date-header { 
            color: #667eea; 
            font-size: 1.5rem;
            margin-bottom: 1rem;
            padding-bottom: 0.5rem;
            border-bottom: 2px solid #667eea;
        }
        .projects { 
            display: grid; 
            grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); 
            gap: 1rem;
            margin-left: 1rem;
        }
        .project-link { 
            display: block;
            padding: 1rem 1.5rem;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            text-decoration: none;
            border-radius: 10px;
            transition: all 0.3s ease;
            font-weight: 500;
        }
        .project-link:hover { 
            transform: translateY(-5px);
            box-shadow: 0 10px 20px rgba(102, 126, 234, 0.3);
        }
        .stats {
            background: #f8f9fa;
            padding: 1.5rem;
            border-radius: 10px;
            margin-bottom: 2rem;
            display: flex;
            gap: 2rem;
            justify-content: center;
        }
        .stat {
            text-align: center;
        }
        .stat-number {
            font-size: 2rem;
            font-weight: bold;
            color: #667eea;
        }
        .stat-label {
            color: #666;
            font-size: 0.9rem;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>🚀 Project Portfolio</h1>
        <p class="subtitle">A collection of web development projects</p>
        <div class="stats">
            <div class="stat">
                <div class="stat-number">${successCount}</div>
                <div class="stat-label">Projects</div>
            </div>
            <div class="stat">
                <div class="stat-number">${dateFolders.length}</div>
                <div class="stat-label">Dates</div>
            </div>
        </div>
        <div id="projects"></div>
    </div>
    <script>
        const projects = ${JSON.stringify(
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
        )};

        const projectsDiv = document.getElementById('projects');
        projects.forEach(({ date, projects }) => {
            if (projects.length === 0) return;
            
            const section = document.createElement('div');
            section.className = 'date-section';
            
            const header = document.createElement('h2');
            header.className = 'date-header';
            header.textContent = date;
            section.appendChild(header);
            
            const grid = document.createElement('div');
            grid.className = 'projects';
            
            projects.forEach(project => {
                const link = document.createElement('a');
                link.className = 'project-link';
                link.href = \`/\${date}/\${project}\`;
                link.textContent = project.split('-').map(w => 
                    w.charAt(0).toUpperCase() + w.slice(1)
                ).join(' ');
                grid.appendChild(link);
            });
            
            section.appendChild(grid);
            projectsDiv.appendChild(section);
        });
    </script>
</body>
</html>`

    await mkdir(DIST_DIR, { recursive: true })
    await import("fs/promises").then((fs) => fs.writeFile(join(DIST_DIR, "index.html"), indexHtml))

    console.log("\n📊 Build Summary:")
    console.log(`   ✅ Successful: ${successCount}`)
    console.log(`   ⏭️  Skipped: ${skipCount}`)
    console.log(`   ❌ Failed: ${failCount}`)
    console.log(`\n🎉 Build complete! Output in ${DIST_DIR}`)
}

buildAll().catch(console.error)
