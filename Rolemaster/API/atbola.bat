@echo off
for /f "tokens=2 delims=:." %%x in ('chcp') do set cp=%%x
chcp 65001>nul
cls
echo ===== ATAQUE DE BOLA =====

:: MENSAJE
echo.
echo Introduzca un mensaje descriptivo de la acción.
set /P "Mensaje=Mensaje: "

if defined Mensaje (
  echo. >> MERP.log
  echo. >> MERP.log
  echo %Mensaje% >> MERP.log
)

:: ARMADURA
echo.
set "Armadura="
set /P "Armadura=Seleccione el tipo de armadura (SA, CU, CE, CM, CO): "

if not %Armadura%==SA (
if not %Armadura%==CU (
IF NOT %Armadura%==CE (
IF NOT %Armadura%==CM (
if not %Armadura%==CO (
  echo La armadura %Armadura% no existe.
  echo.
  exit
)))))

:: echo La armadura seleccionada es %ARMADURA%


:: TIPO
echo.
set "Bola="
set /P "Bola=Tipo de bola (FU:Fuego / FR:Frío): "

if not %Bola%==FR (if not %Bola%==FU (
  echo Tipo de bola %Bola% incorrecto.
  echo.
  exit
))



:: TIRADA
echo.
set "Tirada="
set /P "Tirada=Tirada: "

SET "var="&for /f "delims=0123456789" %%i in ("%Tirada%") do set var=%%i
if defined var (
   echo Valor de tirada incorrecto: %Tirada%
   echo Sólo se permiten valores numéricos para la tirada.
   echo.
   exit
)
rem echo La tirada es %Tirada%

:: MODIFICADORES
echo.
set "Modificadores="
set /P "Modificadores=Modificadores: "

SET "var="&for /f "delims=+-0123456789" %%i in ("%Modificadores%") do set var=%%i
if defined var (
   echo Modificadores incorrectos: %Modificadores%
   echo Sólo se permiten valores numéricos y los caracteres "+" y "-" para los modificadores.
   echo.
   exit
)

:: RESULTADOS
echo.
node ataques "!bola %Bola%%Armadura%%Tirada%+%Modificadores%"
node ataques "!bola %Bola%%Armadura%%Tirada%+%Modificadores%" >> MERP.log

chcp %cp%>nul
