# Iniciar Plataforma EduSpace
Write-Host "==========================================" -ForegroundColor Cyan
Write-Host "    INICIANDO PLATAFORMA EDUSPACE         " -ForegroundColor Cyan
Write-Host "==========================================" -ForegroundColor Cyan

Write-Host "`n[1/3] Iniciando contenedores Docker..." -ForegroundColor Yellow
$containers = docker ps -a -q --filter "name=e2e-"
if ($containers) {
    docker start $containers
}

Write-Host "`n[2/3] Levantando los 13 microservicios Java..." -ForegroundColor Yellow
python tools/e2e/e2e_runner.py restart-services

Write-Host "`n[3/3] Iniciando el Frontend Angular..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-NoExit", "-Command", "npm --prefix frontend start"

Write-Host "`n==========================================" -ForegroundColor Green
Write-Host "    ¡EDUSPACE ESTÁ LISTO!                 " -ForegroundColor Green
Write-Host "    Abre tu navegador en:                 " -ForegroundColor Green
Write-Host "    👉 http://localhost:4200              " -ForegroundColor Green
Write-Host "==========================================" -ForegroundColor Green

