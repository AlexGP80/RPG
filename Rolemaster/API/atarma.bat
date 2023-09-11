@echo off
for /f "tokens=2 delims=:." %%x in ('chcp') do set cp=%%x
chcp 1252>nul
cls
echo ===== ATAQUE CON ARMAS =====

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


:: ARMA
echo.
set "Arma="
echo Seleccione el arma (ea, da, ha, ci, ec, lt, ga, ma, mc, rd, mg, j1, j2, l1,
echo                     l2, lc, ab, hc, my, bs, e2, bo, ak, ac, al, ba, ho)
set /P "Arma=: "

if not %Arma%==ea (if not %Arma%==da (if not %Arma%==ha (if not %Arma%==ci (
if not %Arma%==ec (if not %Arma%==lt (if not %Arma%==ga (if not %Arma%==ma (
if not %Arma%==mc (if not %Arma%==rd (if not %Arma%==mg (if not %Arma%==j1 (
if not %Arma%==j2 (if not %Arma%==l1 (if not %Arma%==l2 (if not %Arma%==lc (
if not %Arma%==ab (if not %Arma%==hc (if not %Arma%==my (if not %Arma%==bs (
if not %Arma%==e2 (if not %Arma%==bo (if not %Arma%==ak (if not %Arma%==ac (
if not %Arma%==al (if not %Arma%==ba (if not %Arma%==ho (
  echo El arma %Arma% no existe.
  echo.
  exit
)))))))))))))))))))))))))))

rem echo El arma seleccionada es %ARMA%


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
node ataques "!atarma %Armadura%%Arma%/%Tirada%+%Modificadores%"
node ataques "!atarma %Armadura%%Arma%/%Tirada%+%Modificadores%" >> MERP.log



chcp %cp%>nul
