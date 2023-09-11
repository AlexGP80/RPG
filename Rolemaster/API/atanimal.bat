@echo off
for /f "tokens=2 delims=:." %%x in ('chcp') do set cp=%%x
chcp 1252>nul
cls
echo ===== ATAQUE SIN ARMAS =====

:: MENSAJE
echo.
echo Introduzca un mensaje descriptivo de la acci�n.
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

:: TAMA�O
echo.
set "Tam="
echo Seleccione el tama�o del atacante
echo    D:Diminuto   P:Peque�o   M:Mediano   G:Grande   E:Enorme
set /P "Tam=Seleccione el tama�o (D, P, M, G, E): "

if not %Tam%==D (
if not %Tam%==P (
IF NOT %Tam%==M (
IF NOT %Tam%==G (
if not %Tam%==E (
  echo Tama�o no v�lido: %Tam%
  echo.
  exit
)))))


:: Tipo ataque
echo.
set "Tipo="
echo Seleccione el tipo de ataque:
echo    pi:Pico  mo:Mordisco  ga:Garra/Zarpa  cu:Cuerno  co:Colmillo  ag:Aguij�n
echo    apr:Apresar/Fagocitar  em:Embestida  to:Topetazo  di:Diminutos
echo    ps:Pisot�n  ca:Ca�da  ap:Aplastamiento  pu:Pu�o/Patada  lu:Lucha libre
set /P "Tipo=: "

if not %Tipo%==pi (if not %Tipo%==mo (if not %Tipo%==ga (if not %Tipo%==cu (
if not %Tipo%==co (if not %Tipo%==ag (if not %Tipo%==apr (if not %Tipo%==em (
if not %Tipo%==to (if not %Tipo%==di (if not %Tipo%==ps (if not %Tipo%==ca (
if not %Tipo%==ap (if not %Tipo%==pu (if not %Tipo%==lu (
  echo El tipo %Tipo% no es correcto.
  echo.
  exit
)))))))))))))))

rem echo El arma seleccionada es %ARMA%


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
rem echo La tirada es %Tirada%

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
node ataques "!atanim %Tam%%Armadura%%Tipo%/%Tirada%+%Modificadores%"
node ataques "!atanim %Tam%%Armadura%%Tipo%/%Tirada%+%Modificadores%" >> MERP.log



chcp %cp%>nul
