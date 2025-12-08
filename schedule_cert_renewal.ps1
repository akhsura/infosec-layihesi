# Schedule automatic HTTPS certificate renewal check
# Run as Administrator: powershell -ExecutionPolicy Bypass -File schedule_cert_renewal.ps1

$taskName = "Flask-HTTPS-Cert-Renewal"
$pythonScript = "check_cert_renewal.py"
$workDir = Get-Location
$pythonExe = (Get-Command python).Source

# Create task trigger (daily at 2 AM)
$trigger = New-ScheduledTaskTrigger -Daily -At 2am

# Create task action
$action = New-ScheduledTaskAction `
    -Execute $pythonExe `
    -Argument $pythonScript `
    -WorkingDirectory $workDir

# Create task settings
$settings = New-ScheduledTaskSettingsSet -AllowStartIfOnBatteries -DontStopIfGoingOnBatteries

# Register the task
try {
    Register-ScheduledTask `
        -TaskName $taskName `
        -Trigger $trigger `
        -Action $action `
        -Settings $settings `
        -RunLevel Highest `
        -Force -ErrorAction Stop
    
    Write-Host "[OK] Task '$taskName' scheduled successfully!"
    Write-Host "     Runs daily at 2:00 AM"
    Write-Host "     Will auto-renew certificates if expiring within 30 days"
} catch {
    Write-Host "[ERROR] Failed to create task: $_"
    Exit 1
}
