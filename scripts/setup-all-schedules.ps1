# OpenClaw Full Schedule — News every 6h, SEO every 2h
# Run once to register both tasks. No OpenClaw gateway needed.

$projectPath = "c:\Users\mukit\OneDrive\Desktop\nasaArchitech\satellite_simulator_web"

# --- 1. News + Content + Deploy + Social — every 6 hours ---
$taskNews = "OrbitalSimulatorHub-News-Update"
Unregister-ScheduledTask -TaskName $taskNews -ErrorAction SilentlyContinue

$actionNews = New-ScheduledTaskAction -Execute "npm" -Argument "run openclaw:update" -WorkingDirectory $projectPath
$triggerNews = New-ScheduledTaskTrigger -Once -At (Get-Date) -RepetitionInterval (New-TimeSpan -Hours 6) -RepetitionDuration (New-TimeSpan -Days 3650)
$settingsNews = New-ScheduledTaskSettingsSet -AllowStartIfOnBatteries -DontStopIfGoingOnBatteries -StartWhenAvailable

Register-ScheduledTask -TaskName $taskNews -Action $actionNews -Trigger $triggerNews -Settings $settingsNews -Force
Write-Host "Task $taskNews - News + blog + deploy + social every 6 hours" -ForegroundColor Green

# --- 2. SEO (sitemap lastmod) — every 2 hours ---
$taskSeo = "OrbitalSimulatorHub-SEO-Update"
Unregister-ScheduledTask -TaskName $taskSeo -ErrorAction SilentlyContinue

$actionSeo = New-ScheduledTaskAction -Execute "npm" -Argument "run seo:auto" -WorkingDirectory $projectPath
$triggerSeo = New-ScheduledTaskTrigger -Once -At (Get-Date) -RepetitionInterval (New-TimeSpan -Hours 2) -RepetitionDuration (New-TimeSpan -Days 3650)
$settingsSeo = New-ScheduledTaskSettingsSet -AllowStartIfOnBatteries -DontStopIfGoingOnBatteries -StartWhenAvailable

Register-ScheduledTask -TaskName $taskSeo -Action $actionSeo -Trigger $triggerSeo -Settings $settingsSeo -Force
Write-Host "Task $taskSeo - SEO sitemap every 2 hours" -ForegroundColor Green

Write-Host ""
Write-Host "Run now:" -ForegroundColor Cyan
Write-Host "  Start-ScheduledTask -TaskName $taskNews"
Write-Host "  Start-ScheduledTask -TaskName $taskSeo"
Write-Host ""
Write-Host "Remove:" -ForegroundColor Yellow
Write-Host "  Unregister-ScheduledTask -TaskName $taskNews"
Write-Host "  Unregister-ScheduledTask -TaskName $taskSeo"
