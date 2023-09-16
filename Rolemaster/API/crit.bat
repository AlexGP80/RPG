@echo off
for /f "tokens=2 delims=:." %%x in ('chcp') do set cp=%%x
chcp 65001>nul
cls
echo ===== CRÍTICOS =====

:: MENSAJE
echo.
echo Introduzca un mensaje descriptivo de la acción.
set /P "Mensaje=Mensaje: "

if defined Mensaje (
  echo. >> MERP.log
  echo. >> MERP.log
  echo %Mensaje% >> MERP.log
)

:: GRAVEDAD
:gravedad
echo.
set "Gravedad="
set /P "Gravedad=Seleccione la gravedad del crítico (T, A, B, C, D, E): "

if not %Gravedad%==T (
if not %Gravedad%==A (
if not %Gravedad%==B (
IF NOT %Gravedad%==C (
IF NOT %Gravedad%==D (
if not %Gravedad%==E (
  echo Gravedad de crítico incorrecta: %Gravedad%
  echo.
  goto :gravedad
))))))


:: TIPO DE CRÍTICO
:tipocritico
echo.
set "Tipo="
echo Tipo de crítico: 
echo    AP:Aplastamiento   TA:Tajo   PE:Perforación   DE:Desequilibrio   PR:Presa
echo    CA:Calor   FR:Frío   EL:Electricidad   IM:Impacto   GR:Grandes Criaturas
echo    EN:Criaturas Enormes   SG:Sortilegios contra Grandes Criaturas
set /P "Tipo=Seleccione el tipo de crítico: "

if not %Tipo%==AP (
if not %Tipo%==TA (
if not %Tipo%==PE (
if not %Tipo%==DE (
if not %Tipo%==PR (
if not %Tipo%==CA (
if not %Tipo%==FR (
if not %Tipo%==EL (
if not %Tipo%==IM (
if not %Tipo%==GR (
if not %Tipo%==EN (
if not %Tipo%==SG (
  echo El tipo de crítico %Tipo% no existe.
  echo.
  goto :tipocritico
))))))))))))


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

:: RESULTADOS
echo.
node crits "!crit %Gravedad%%Tipo%%Tirada%
node crits "!crit %Gravedad%%Tipo%%Tirada%" >> MERP.log


chcp %cp%>nul
