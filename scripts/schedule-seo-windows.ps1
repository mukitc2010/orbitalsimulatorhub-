# Schedule Auto SEO Every 2 Hours — Windows Task Scheduler
# Run this script once to create the scheduled task

$taskName = "OrbitalSimulatorHub-AutoSEO"
$scriptPath = "c:\Users\mukit\OneDrive\Desktop\nasaArchitech\satellite_simulator_web"
$nodePath = "node"
$script = "scripts\auto-seo-update.js"

# Remove existing task if present
Unregister-ScheduledTask -TaskName $taskName -ErrorAction SilentlyContinue

# Create action: run node script
$action = New-ScheduledTaskAction -Execute $nodePath -Argument $script -WorkingDirectory $scriptPath
$trigger = New-ScheduledTaskTrigger -Once -At (Get-Date) -RepetitionInterval (New-TimeSpan -Hours 2) -RepetitionDuration (New-TimeSpan -Days 365)

Register-ScheduledTask -TaskName $taskName -Action $action -Trigger $trigger -Description "Auto SEO update every 2 hours for Orbital Simulator Hub"

Write-Host "Task '$taskName' created. Runs every 2 hours." -ForegroundColor Green
Write-Host "To disable: Unregister-ScheduledTask -TaskName '$taskName'" -ForegroundColor Yellow
