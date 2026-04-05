# Start All Services
Write-Host "Starting Orbital Simulator Hub Services..." -ForegroundColor Green
Write-Host ""

Write-Host "Starting Ollama..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-NoExit", "-Command", "ollama serve" -WindowStyle Normal
Start-Sleep -Seconds 3

Write-Host "Starting API Server..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd 'C:\Users\mukit\OneDrive\Desktop\nasaArchitech\satellite_simulator_web'; npm run dev:api" -WindowStyle Normal
Start-Sleep -Seconds 3

Write-Host "Starting n8n..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-NoExit", "-Command", "n8n start" -WindowStyle Normal
Start-Sleep -Seconds 3

Write-Host ""
Write-Host "✅ All services starting!" -ForegroundColor Green
Write-Host ""
Write-Host "Check:" -ForegroundColor Cyan
Write-Host "  - Ollama: http://localhost:11434/api/tags"
Write-Host "  - API: http://localhost:3003/api/blog/health"
Write-Host "  - n8n: http://localhost:5678"
Write-Host ""
Read-Host "Press Enter to continue"
