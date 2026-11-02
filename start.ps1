param([int]$Port = 8015)
$ErrorActionPreference = 'Stop'
Set-Location -LiteralPath $PSScriptRoot
$academicPhp = 'D:\xampp\php8512\php.exe'
if (!(Test-Path -LiteralPath $academicPhp)) { $academicPhp = (Get-Command php).Source }
$env:PHPRC = Join-Path $PSScriptRoot 'php.local.ini'
& $academicPhp -c $env:PHPRC artisan serve --host=127.0.0.1 --port=$Port --no-reload
