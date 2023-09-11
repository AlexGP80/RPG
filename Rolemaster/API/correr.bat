@echo off
for /f "tokens=2 delims=:." %%x in ('chcp') do set cp=%%x
chcp 1252>nul
cls
echo ===== CORRER =====

:: MENSAJE
echo.
echo Introduzca un mensaje descriptivo de la acci�n.
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
echo   1:Rutina  2:F�cil  3:Escasa Dificultad  4:Dificultad media  5:Dif�cil
echo   6:Muy dif�cil  7:Extremadamente dif�cil  8:Locura completa  9:Absurda
set /P "Dificultad=Seleccione (1-9): "

if %Dificultad%==1 (
    set "Dif=rut"
    goto :bonif
)
if %Dificultad%==2 (
    set "Dif=fac"
    goto :bonif
)
if %Dificultad%==3 (
    set "Dif=edf"
    goto :bonif
)
if %Dificultad%==4 (
    set "Dif=dfm"
    goto :bonif
)
if %Dificultad%==5 (
    set "Dif=dif"
    goto :bonif
)
if %Dificultad%==6 (
    set "Dif=mdf"
    goto :bonif
)
if %Dificultad%==7 (
    set "Dif=xdf"
    goto :bonif
)
if %Dificultad%==8 (
    set "Dif=loc"
    goto :bonif
)
if %Dificultad%==9 (
    set "Dif=abs"
    goto :bonif
)

echo Dificultad incorrecta: %Dificultad%
echo.
exit


:: BONIF MM
:bonif
echo.
set "BonifMM="
echo Introduzca el valor del Bonificador de MM
echo     (signo + 2 d�gitos, ejemplos: +20, -10, -05, +00)
set /P "BonifMM=Bonificador MM: "

SET "var="&for /f "delims=-+0123456789" %%i in ("%BonifMM%") do set var=%%i
if defined var (
   echo Bonificador MM incorrecto: %BonifMM%
   echo Debe ser signo y dos d�gitos
   echo Ejemplos:
   echo     +20
   echo     -10
   echo     -05
   echo     +00
   echo.
   exit
)
:: echo La tirada es %Tirada%

:: ATURDIDO
echo.
set "Aturdido="
set /P "Aturdido=�Aturdido? (0:No  1:S�): "

if not %Aturdido%==0 (
if not %Aturdido%==1 (
  echo Introduzca 0 o 1
  echo.
  exit
))

:: DERRIBADO
echo.
set "Derribado="
set /P "Derribado=�Derribado? (0:No  1:S�): "

if not %Derribado%==0 (
if not %Derribado%==1 (
  echo Introduzca 0 o 1
  echo.
  exit
))

:: EXTREMIDAD INUTILIZADA
echo.
set "ExtremidadInutilizada="
set /P "ExtremidadInutilizada=�Extremidad inutilizada? (0:No  1:S�): "

if not %ExtremidadInutilizada%==0 (
if not %ExtremidadInutilizada%==1 (
  echo Introduzca 0 o 1
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
   echo S�lo se permiten valores num�ricos para la tirada.
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
   echo S�lo se permiten valores num�ricos y los caracteres "+" y "-" para los modificadores.
   echo.
   exit
)
:: RESULTADOS
echo.
node maniobras "!correr %Dif%%BonifMM%%Aturdido%%Derribado%%ExtremidadInutilizada%%Tirada%/%Modificadores%"
node maniobras "!correr %Dif%%BonifMM%%Aturdido%%Derribado%%ExtremidadInutilizada%%Tirada%/%Modificadores%" >> MERP.log


chcp %cp%>nul
