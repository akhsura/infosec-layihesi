# Run as Administrator to import CA to LocalMachine root store
# Usage: powershell -ExecutionPolicy Bypass -File import_ca_admin.ps1

$certPath = (Get-ChildItem rootCA.pem -ErrorAction Stop).FullName
Write-Host "Importing CA from: $certPath"

try {
    Import-Certificate -FilePath $certPath -CertStoreLocation Cert:\LocalMachine\Root -ErrorAction Stop
    Write-Host "SUCCESS: CA imported to LocalMachine\Root"
    Write-Host "Browser HTTPS connections to 127.0.0.1:5000 should now be trusted!"
} catch {
    Write-Host "ERROR: Could not import to LocalMachine: $_"
    Write-Host "Trying CurrentUser instead..."
    try {
        Import-Certificate -FilePath $certPath -CertStoreLocation Cert:\CurrentUser\Root -ErrorAction Stop
        Write-Host "SUCCESS: CA imported to CurrentUser\Root"
    } catch {
        Write-Host "ERROR: Could not import to CurrentUser either: $_"
        Exit 1
    }
}
