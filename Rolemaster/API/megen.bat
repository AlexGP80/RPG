@echo off
for /f "tokens=2 delims=:." %%x in ('chcp') do set cp=%%x
chcp 65001>nul
cls
echo ===== MANIOBRAS ESTÁTICAS GENERALES =====

:: MENSAJE
echo.
echo Introduzca un mensaje descriptivo de la acción.
set /P "Mensaje=Mensaje: "

if defined Mensaje (
  echo. >> MERP.log
  echo. >> MERP.log
  echo %Mensaje% >> MERP.log
)

:: DIFICULTAD
echo.
set "Dificultad="
echo Seleccione la dificultad de la maniobra
echo   1:Rutina  2:Fácil  3:Escasa Dificultad  4:Dificultad media  5:Difícil
echo   6:Muy difícil  7:Extremadamente difícil  8:Locura completa  9:Absurda
set /P "Dificultad=Seleccione (1-9): "

if %Dificultad%==1 (
    set "ModDificultad=+30"
    goto :bonif
)
if %Dificultad%==2 (
    set "ModDificultad=+20"
    goto :bonif
)
if %Dificultad%==3 (
    set "ModDificultad=+10"
    goto :bonif
)
if %Dificultad%==4 (
    set "ModDificultad=+00"
    goto :bonif
)
if %Dificultad%==5 (
    set "ModDificultad=-10"
    goto :bonif
)
if %Dificultad%==6 (
    set "ModDificultad=-20"
    goto :bonif
)
if %Dificultad%==7 (
    set "ModDificultad=-30"
    goto :bonif
)
if %Dificultad%==8 (
    set "ModDificultad=-50"
    goto :bonif
)
if %Dificultad%==9 (
    set "ModDificultad=-70"
    goto :bonif
)

echo Dificultad incorrecta: %Dificultad%
echo.
exit

:: BONIF ME
:bonif
echo.
set "BonifME="
echo Introduzca el valor del Bonificador de ME aplicable
echo     (signo + 2 dígitos, ejemplos: +20, -10, -05, +00)
set /P "BonifME=Bonificador ME: "

SET "var="&for /f "delims=-+0123456789" %%i in ("%BonifME%") do set var=%%i
if defined var (
   echo Bonificador ME incorrecto: %BonifME%
   echo Debe ser signo y dos dígitos
   echo Ejemplos:
   echo     +20
   echo     -10
   echo     -05
   echo     +00
   echo.
   exit
)


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
node maniobrasestaticas "!mest G%Tirada%;%BonifME%%ModDificultad%%Modificadores%"
node maniobrasestaticas "!mest G%Tirada%;%BonifME%%ModDificultad%%Modificadores%" >> MERP.log


chcp %cp%>nul