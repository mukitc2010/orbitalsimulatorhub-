# Start n8n for blog automation
# Run this script to start n8n

Write-Host "🚀 Starting n8n..." -ForegroundColor Cyan
Write-Host ""
Write-Host "n8n will open at: http://localhost:5678" -ForegroundColor Green
Write-Host ""
Write-Host "To stop n8n, press Ctrl+C" -ForegroundColor Yellow
Write-Host ""

$env:Path = "C:\Program Files\nodejs;" + $env:Path
n8n start
