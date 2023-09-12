@echo off
for /f "tokens=2 delims=:." %%x in ('chcp') do set cp=%%x
chcp 65001>nul
cls
echo ===== TIRADA DE RESISTENCIA =====

:: MENSAJE
echo.
echo Introduzca un mensaje descriptivo de la acción.
set /P "Mensaje=Mensaje: "

if defined Mensaje (
  echo. >> MERP.log
  echo. >> MERP.log
  echo %Mensaje% >> MERP.log
)


:: NIVEL ATACANTE
echo.
set "NivAt="
set /P "NivAt=Nivel del atacante: "

SET "var="&for /f "delims=0123456789" %%i in ("%NivAt%") do set var=%%i
if defined var (
   echo El nivel del atacante es incorrecto: %NivAt%
   echo Sólo se permiten valores numéricos.
   echo.
   exit
)

:: NIVEL DEFENSOR
echo.
set "NivDef="
set /P "NivDef=Nivel del defensor: "

SET "var="&for /f "delims=0123456789" %%i in ("%NivDef%") do set var=%%i
if defined var (
   echo El nivel del defensor es incorrecto: %NivDef%
   echo Sólo se permiten valores numéricos.
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
node ataques "!ttr %NivAt%/%NivDef%.%Tirada%:%Modificadores%"
node ataques "!ttr %NivAt%/%NivDef%.%Tirada%:%Modificadores%" >> MERP.log


chcp %cp%>nul