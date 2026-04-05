# Open n8n with Import Instructions
Write-Host "🚀 Opening n8n with Import Instructions..." -ForegroundColor Green
Write-Host ""

# Open n8n in browser
Start-Process "http://localhost:5678"

# Wait a moment
Start-Sleep -Seconds 2

# Show instructions
Write-Host "📋 IMPORT INSTRUCTIONS:" -ForegroundColor Cyan
Write-Host ""
Write-Host "1. In n8n, click 'Workflows' → 'Import from File'" -ForegroundColor Yellow
Write-Host ""
Write-Host "2. Import these files:" -ForegroundColor Yellow
$workflow1 = Join-Path $PSScriptRoot "..\n8n\workflows\daily-rss-to-blog.json"
$workflow2 = Join-Path $PSScriptRoot "..\n8n\workflows\daily-ollama-research.json"
Write-Host "   - $workflow1" -ForegroundColor White
Write-Host "   - $workflow2" -ForegroundColor White
Write-Host ""
Write-Host "3. After importing, click 'Execute Workflow' on one to test" -ForegroundColor Yellow
Write-Host ""
Write-Host "4. Go to 'Workflows' page and toggle 'Active' ON for both" -ForegroundColor Yellow
Write-Host ""
Write-Host "✅ That's it! Workflows will run automatically!" -ForegroundColor Green
Write-Host ""

# Copy workflow paths to clipboard for easy access
$workflow1 | Set-Clipboard
Write-Host "💡 Workflow 1 path copied to clipboard!" -ForegroundColor Cyan
Write-Host "   Paste it when n8n asks for file path" -ForegroundColor Cyan
Write-Host ""
