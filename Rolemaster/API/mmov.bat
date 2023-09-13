@echo off
for /f "tokens=2 delims=:." %%x in ('chcp') do set cp=%%x
chcp 65001>nul
cls
echo ===== MANIOBRAS MOVIMIENTO =====

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
set "Dificultad="
echo Seleccione la dificultad de la maniobra
echo   1:Rutina  2:Fácil  3:Escasa Dificultad  4:Dificultad media  5:Difícil
echo   6:Muy difícil  7:Extremadamente difícil  8:Locura completa  9:Absurda
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
goto :dificultad


:: BONIF MM
:bonif
echo.
set "BonifMM="
echo Introduzca el valor del Bonificador de MM
echo     (signo + 2 dígitos, ejemplos: +20, -10, -05, +00)
set /P "BonifMM=Bonificador MM: "

SET "var="&for /f "delims=-+0123456789" %%i in ("%BonifMM%") do set var=%%i
if defined var (
   echo Bonificador MM incorrecto: %BonifMM%
   echo Debe ser signo y dos dígitos
   echo Ejemplos:
   echo     +20
   echo     -10
   echo     -05
   echo     +00
   echo.
   goto :bonif
)
:: echo La tirada es %Tirada%

:: ATURDIDO
:aturdido
echo.
set "Aturdido="
set /P "Aturdido=¿Aturdido? (0:No  1:Sí): "

if not %Aturdido%==0 (
if not %Aturdido%==1 (
  echo Introduzca 0 o 1
  echo.
  goto :aturdido
))

:: DERRIBADO
:derribado
echo.
set "Derribado="
set /P "Derribado=¿Derribado? (0:No  1:Sí): "

if not %Derribado%==0 (
if not %Derribado%==1 (
  echo Introduzca 0 o 1
  echo.
  goto :derribado
))

:: EXTREMIDAD INUTILIZADA
:extremidadinutilizada
echo.
set "ExtremidadInutilizada="
set /P "ExtremidadInutilizada=¿Extremidad inutilizada? (0:No  1:Sí): "

if not %ExtremidadInutilizada%==0 (
if not %ExtremidadInutilizada%==1 (
  echo Introduzca 0 o 1
  echo.
  goto :extremidadinutilizada
))


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
node maniobras "!mm %Dif%%BonifMM%%Aturdido%%Derribado%%ExtremidadInutilizada%%Tirada%/%Modificadores%"
node maniobras "!mm %Dif%%BonifMM%%Aturdido%%Derribado%%ExtremidadInutilizada%%Tirada%/%Modificadores%" >> MERP.log


chcp %cp%>nul
