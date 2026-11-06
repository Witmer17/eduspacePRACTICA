@echo off
echo ==========================================
echo    INICIANDO PLATAFORMA EDUSPACE
echo ==========================================

echo [1/3] Iniciando contenedores Docker (10 BDs, Kafka, MinIO, Mailpit)...
for /f "tokens=*" %%i in ('docker ps -a -q --filter "name=e2e-"') do docker start %%i

echo [2/3] Iniciando los 13 microservicios Java y Gateway...
python tools\e2e\e2e_runner.py restart-services

echo [3/3] Iniciando Frontend Angular...
start cmd /k "npm --prefix frontend start"

echo ==========================================
echo    EDUSPACE ESTA LISTO!
echo    Frontend: http://localhost:4200
echo ==========================================
pause

