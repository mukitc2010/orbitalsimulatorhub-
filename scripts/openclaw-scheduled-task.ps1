# OpenClaw Scheduled Task — runs every 6 hours for reliable GitHub → Vercel updates
# Uses Claude (Anthropic) for AI content generation, falls back to Ollama.
# Run once to register. Works even if OpenClaw gateway is down.

$projectPath = "c:\Users\mukit\OneDrive\Desktop\nasaArchitech\satellite_simulator_web"
$taskName = "OrbitalSimulatorHub-OpenClaw-Update"
$envFile = Join-Path $projectPath ".env"

# Build the command that loads .env and runs the update
$scriptBlock = @"
Set-Location '$projectPath'
if (Test-Path '$envFile') {
    Get-Content '$envFile' | ForEach-Object {
        if (`$_ -match '^([^#][^=]+)=(.*)$') {
            [System.Environment]::SetEnvironmentVariable(`$matches[1].Trim(), `$matches[2].Trim(), 'Process')
        }
    }
}
`$env:AI_PROVIDER = 'anthropic'
npm run openclaw:update 2>&1 | Out-File (Join-Path '$projectPath' 'logs\openclaw-update.log') -Append
"@

$action = New-ScheduledTaskAction -Execute "powershell" -Argument "-NoProfile -ExecutionPolicy Bypass -Command `"$scriptBlock`"" -WorkingDirectory $projectPath
$trigger = New-ScheduledTaskTrigger -Once -At (Get-Date) -RepetitionInterval (New-TimeSpan -Hours 6) -RepetitionDuration (New-TimeSpan -Days 3650)
$settings = New-ScheduledTaskSettingsSet -AllowStartIfOnBatteries -DontStopIfGoingOnBatteries -StartWhenAvailable

Register-ScheduledTask -TaskName $taskName -Action $action -Trigger $trigger -Settings $settings -Force

Write-Host "Task '$taskName' registered. Runs every 6 hours with Claude AI."
Write-Host "   To run now: Start-ScheduledTask -TaskName '$taskName'"
Write-Host "   To remove: Unregister-ScheduledTask -TaskName '$taskName'"
