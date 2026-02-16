# Start API server and n8n together
# This script starts both services needed for auto-posting

Write-Host "🚀 Starting Blog Auto-Posting System..." -ForegroundColor Cyan
Write-Host ""

# Add Node.js to PATH
$env:Path = "C:\Program Files\nodejs;" + $env:Path

# Start API server in background
Write-Host "📡 Starting API server..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$PSScriptRoot\..'; `$env:Path = 'C:\Program Files\nodejs;' + `$env:Path; npm run dev:api" -WindowStyle Minimized

Write-Host "✅ API server starting on http://localhost:3001" -ForegroundColor Green
Write-Host ""
Start-Sleep -Seconds 3

# Start n8n
Write-Host "🤖 Starting n8n..." -ForegroundColor Yellow
Write-Host ""
Write-Host "n8n will open at: http://localhost:5678" -ForegroundColor Green
Write-Host ""
Write-Host "Next steps:" -ForegroundColor Cyan
Write-Host "1. Import workflow: n8n/workflows/auto-blog-posting.json" -ForegroundColor White
Write-Host "2. Toggle 'Active' switch ON" -ForegroundColor White
Write-Host "3. Posts will generate automatically!" -ForegroundColor White
Write-Host ""
Write-Host "Press Ctrl+C to stop n8n" -ForegroundColor Yellow
Write-Host ""

n8n start
