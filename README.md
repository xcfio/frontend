# 🚀 Frontend Projects Portfolio

A comprehensive collection of frontend development projects, organized chronologically and deployed as a unified portfolio on Vercel.

## 🌐 Live Deployment

All projects are accessible at: `<your-vercel-url>/<date>/<project-name>`

Example: `https://your-project.vercel.app/2026-01-22/portfolio`

## 📁 Project Structure

Projects are organized by date folders (YYYY-MM-DD format):

- **2026-01-22**: Portfolio, Practice
- **2026-01-23**: Card, Amazon Product Page, Web Agency
- **2026-01-24**: Basketball Scoreboard
- **2026-01-25**: Birthday Gift
- **2026-01-30**: Home Town Project
- **2026-01-31**: Password Generator
- **2026-02-01**: Unit Converter
- **2026-02-02**: Love/Hate
- **2026-02-03**: Unit Converter (Tailwind)
- **2026-02-04**: Oldgram
- **2026-02-05**: Twimba
- **2026-02-06**: Restaurants
- **2026-02-07**: Responsive NFT
- **2026-02-08**: SciStream
- **2026-02-09**: Learning Journal
- **2026-02-13**: React Facts
- **2026-02-14**: Digital Business Card

## 🚀 Quick Start - Deployment

### Initial Setup

1. **Install Vercel CLI**:

    ```powershell
    pnpm add -g vercel
    ```

2. **Login to Vercel**:

    ```powershell
    vercel login
    ```

3. **Link your project** (first time only):
    ```powershell
    vercel link
    ```

### Deploy

**Option 1: Using PowerShell Script (Recommended)**

```powershell
.\deploy.ps1
```

**Option 2: Using npm scripts**

```powershell
# Production deployment
pnpm run deploy

# Preview deployment
pnpm run deploy:preview
```

**Option 3: Manual**

```powershell
# Build all projects
pnpm run build

# Deploy to Vercel
vercel --prod
```

## 🛠️ How It Works

1. **build-all.js** - Automated build script that:
    - Scans all date-based folders
    - Identifies projects with `package.json`
    - Builds each project using Vite
    - Consolidates all builds into a unified `dist` folder
    - Generates a beautiful index page listing all projects

2. **vercel.json** - Deployment configuration:
    - Defines build command and output directory
    - Enables clean URLs
    - Configures security headers

3. **deploy.ps1** - Convenience script for Windows/PowerShell:
    - Checks Vercel authentication
    - Builds all projects
    - Deploys to Vercel (production or preview)

## 📝 Adding New Projects

1. Create a date folder if it doesn't exist (format: `YYYY-MM-DD`)
2. Create your project folder inside
3. Ensure your project has:
    - `package.json` with a `build` script
    - Vite configuration
4. Next deployment will automatically include it

Example:

```powershell
# Create new project structure
mkdir 2026-02-15\my-new-project
cd 2026-02-15\my-new-project

# Initialize with Vite
pnpm create vite@latest . --template vanilla

# Develop your project...

# Deploy (from root directory)
cd ..\..
pnpm run deploy
```

## 🧪 Local Development

To work on individual projects:

```powershell
# Navigate to specific project
cd 2026-01-22\portfolio

# Install dependencies
pnpm install

# Run dev server
pnpm run dev

# Build locally
pnpm run build
```

## 📦 Technologies

- **Build Tool**: Vite
- **Package Manager**: pnpm
- **Hosting**: Vercel
- **Styling**: Various (Tailwind CSS, vanilla CSS)
- **Languages**: JavaScript, TypeScript

## 🔧 Configuration Files

- `package.json` - Root package configuration with deployment scripts
- `vercel.json` - Vercel deployment configuration
- `build-all.js` - Multi-project build automation
- `.vercelignore` - Files to exclude from deployment
- `deploy.ps1` - PowerShell deployment script

## 📚 Documentation

For detailed deployment instructions, see [DEPLOYMENT.md](DEPLOYMENT.md)

## 🎯 Features

- ✅ Automated multi-project builds
- ✅ Unified deployment to Vercel
- ✅ Clean URL structure (`/date/project-name`)
- ✅ Automatic index page generation
- ✅ Security headers configured
- ✅ Template projects for quick start

## 🔗 Custom Domain

To set up a custom domain:

1. Go to Vercel Dashboard → Your Project → Settings → Domains
2. Add your domain
3. Configure DNS as instructed
4. Projects will be available at `https://yourdomain.com/<date>/<project>`

## 📊 Build Statistics

Run `pnpm run build` to see:

- Number of projects built
- Build successes/failures
- Projects skipped
- Build time

## 🐛 Troubleshooting

**Build fails for specific project:**

- Check that project has `package.json`
- Verify `pnpm run build` works in that project
- Check console output for specific errors

**Clear Vercel cache:**

```powershell
vercel --prod --force
```

**Check deployed version:**

```powershell
vercel ls
```

## 📄 License

Individual projects may have their own licenses.

---

Built with ❤️ using Vite, pnpm, and Vercel
