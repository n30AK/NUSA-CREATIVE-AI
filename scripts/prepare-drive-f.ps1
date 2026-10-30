$ErrorActionPreference = "Stop"
$Root = "F:\NUSA-CREATIVE-AI"
$RequiredFreeGB = 20

if (-not (Test-Path "F:\")) {
  throw "Drive F: tidak ditemukan. Pastikan drive F terpasang dan dapat diakses."
}

$Drive = Get-PSDrive -Name F
$FreeGB = [math]::Round($Drive.Free / 1GB, 2)
Write-Host "Drive F: tersedia — ruang kosong: $FreeGB GB"

if ($FreeGB -lt $RequiredFreeGB) {
  Write-Warning "Ruang kosong kurang dari $RequiredFreeGB GB. Struktur folder tetap dapat dibuat, tetapi jangan unduh model besar."
}

$Folders = @(
  "apps\web",
  "apps\worker-windows",
  "services",
  "packages",
  "database\migrations",
  "storage\products",
  "storage\images",
  "storage\videos",
  "storage\exports",
  "models",
  "cache",
  "logs",
  "docs",
  "scripts"
)

New-Item -ItemType Directory -Force -Path $Root | Out-Null
foreach ($Folder in $Folders) {
  New-Item -ItemType Directory -Force -Path (Join-Path $Root $Folder) | Out-Null
}

Write-Host ""
Write-Host "Struktur workspace berhasil disiapkan: $Root"
Write-Host "Tidak ada file lama yang dihapus dan tidak ada model besar yang diunduh."
