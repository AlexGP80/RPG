@echo off
for /f "tokens=2 delims=:." %%x in ('chcp') do set cp=%%x
chcp 65001>nul
cls
echo ===== MANIOBRAS ESTÁTICAS DE INFLUENCIA / INTERACCIÓN =====

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
:dificultad
echo.
set "ModLealtad="

set /P "ModLealtad=Lealtad de la audiencia (1:Neutral  2:A sueldo  3:Leal): "

if %ModLealtad%==1 (
    set "ModLealtad=+00"
    goto :dif
)
if %ModLealtad%==2 (
    set "ModLealtad=+20"
    goto :dif
)
if %ModLealtad%==3 (
    set "ModLealtad=+50"
    goto :dif
)

echo Valor de lealtad no reconocido: %ModLealtad%
goto :dificultad

:: DIFICULTAD
:dif
echo.
set "Dificultad="
echo Seleccione la dificultad de la maniobra de influencia / interacción
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
goto :dif

:: BONIF ME
:bonif
echo.
set "BonifME="
echo Introduzca el valor del Bonificador de maniobra aplicable
echo     (signo + 2 dígitos, ejemplos: +20, -10, -05, +00)
set /P "BonifME=Bonificador: "

SET "var="&for /f "delims=-+0123456789" %%i in ("%BonifME%") do set var=%%i
if defined var (
   echo Bonificador incorrecto: %BonifME%
   echo Debe ser signo y dos dígitos
   echo Ejemplos:
   echo     +20
   echo     -10
   echo     -05
   echo     +00
   echo.
   goto :bonif
)


:: TIRADA
:tirada
echo.
set "Tirada="
set /P "Tirada=Tirada: "

SET "var="&for /f "delims=0123456789" %%i in ("%Tirada%") do set var=%%i
if defined var (
   echo Valor de tirada incorrecto: %Tirada%
   echo Sólo se permiten valores numéricos para la tirada.
   echo.
   goto :tirada
)


:: MODIFICADORES
:modificadores
echo.
set "Modificadores="
set /P "Modificadores=Modificadores: "

SET "var="&for /f "delims=+-0123456789" %%i in ("%Modificadores%") do set var=%%i
if defined var (
   echo Modificadores incorrectos: %Modificadores%
   echo Sólo se permiten valores numéricos y los caracteres "+" y "-" para los modificadores.
   echo.
   goto :modificadores
)


:: RESULTADOS
echo.
node maniobrasestaticas "!mest I%Tirada%;%BonifME%%ModDificultad%%ModLealtad%%Modificadores%"
node maniobrasestaticas "!mest I%Tirada%;%BonifME%%ModDificultad%%ModLealtad%%Modificadores%" >> MERP.log


chcp %cp%>nul