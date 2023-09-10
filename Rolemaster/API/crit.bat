@echo off
for /f "tokens=2 delims=:." %%x in ('chcp') do set cp=%%x
chcp 1252>nul
cls
echo ===== CRÍTICOS =====

:: GRAVEDAD
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
  exit
))))))

:: echo La gravedad seleccionada es %Gravedad%

:: TIPO DE CRÍTICO
echo.
set "Tipo="
echo Tipo de crítico: 
echo    K:Aplastamiento   S:Tajo   P:Perforación   U:Desequilibrio   G:Presa
echo    C:Calor   F:Frío   E:Electricidad   I:Impacto   L: Grandes Criaturas
echo    X: Sortilegios contra Grandes Criaturas
set /P "Tipo=Seleccione el tipo de crítico: "

if not %Tipo%==K (
if not %Tipo%==S (
if not %Tipo%==P (
if not %Tipo%==U (
if not %Tipo%==G (
if not %Tipo%==C (
if not %Tipo%==F (
if not %Tipo%==E (
if not %Tipo%==I (
if not %Tipo%==L (
if not %Tipo%==X (
  echo El tipo de crítico %Tipo% no existe.
  echo.
  exit
)))))))))))

:: echo El tipo de crítico seleccionado es %Tipo%

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
:: echo La tirada es %Tirada%

:: RESULTADOS
echo.
node crits "!crit %Gravedad%%Tipo%%Tirada%


chcp %cp%>nul
