@echo off
SETLOCAL
set /p tipo="individual / acumulado: "
set /p nivel="nivel: "
node w10_tesoro5e.js "%tipo% %nivel%"
ENDLOCAL