# Git Auto-Deploy Script
# Commits changes and pushes to GitHub, triggering Vercel deployment

param(
    [string]$Message = "Auto-update: Blog post and SEO updates"
)

$projectPath = "c:\Users\mukit\OneDrive\Desktop\nasaArchitech\satellite_simulator_web"

Write-Host "🚀 Auto-deploying to live site..." -ForegroundColor Cyan
Write-Host ""

# Change to project directory
Set-Location $projectPath

# Generate RSS feed first
Write-Host "📰 Generating RSS feed..." -ForegroundColor Yellow
$env:Path = "C:\Program Files\nodejs;" + $env:Path
npm run generate:rss
if ($LASTEXITCODE -ne 0) {
    Write-Host "⚠️  RSS generation failed, continuing anyway..." -ForegroundColor Yellow
}

# Add changed files
Write-Host "📝 Staging changes..." -ForegroundColor Yellow
git add client/src/data/blogPosts.ts
git add client/src/data/seo-config.ts
git add client/src/data/dailyTopics.ts
git add client/src/data/researchContent.ts
git add client/src/astrobotKnowledge.ts
git add client/index.html
git add client/public/blog/rss.xml

# Check if there are changes
$status = git status --porcelain
if ([string]::IsNullOrWhiteSpace($status)) {
    Write-Host "✅ No changes to commit" -ForegroundColor Green
    exit 0
}

# Commit changes
Write-Host "💾 Committing changes..." -ForegroundColor Yellow
git commit -m $Message

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Commit failed!" -ForegroundColor Red
    exit 1
}

# Push to GitHub
Write-Host "📤 Pushing to GitHub..." -ForegroundColor Yellow
git push origin main

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Push failed!" -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "✅ Successfully pushed to GitHub!" -ForegroundColor Green
Write-Host "🔄 Vercel will automatically deploy in 1-2 minutes..." -ForegroundColor Cyan
Write-Host "🌐 Check: https://www.orbitalsimulatorhub.com/" -ForegroundColor Cyan
