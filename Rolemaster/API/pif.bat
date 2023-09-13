@echo off
for /f "tokens=2 delims=:." %%x in ('chcp') do set cp=%%x
chcp 65001>nul
cls
echo ===== PIFIAS =====

:: MENSAJE
echo.
echo Introduzca un mensaje descriptivo de la acción.
set /P "Mensaje=Mensaje: "

if defined Mensaje (
  echo. >> MERP.log
  echo. >> MERP.log
  echo %Mensaje% >> MERP.log
)


:: TIPO DE PIFIA
:pifia
echo.
set "Tipo="
echo Tipos de pifia: 
echo    E=Empuñadas, P=Proyectil, S=Sortilegios, M=Maniobras de movimiento
set /P "Tipo=Seleccione el tipo de pifia (E,P,S,M): "


if %Tipo%==E goto :empuñadas
if %Tipo%==P goto :proyectil
if %Tipo%==S goto :sortilegios
if %Tipo%==M goto :maniobras

echo Tipo de pifia incorrecto: %Tipo%
goto :pifia


:empuñadas
echo.
SET "Arma="
echo Tipo de arma: 
echo     1:Contundentes   2:De filo   3:Dos manos   4:De asta   5:Montado
set /P "Arma=Seleccione el tipo de arma (1,2,3,4,5): "

if %Arma%==1 (
  set "Mod=-20"
)
if %Arma%==2 (
  set "Mod=-10"
)
if %Arma%==3 (
  set "Mod=+00"
)
if %Arma%==4 (
  set "Mod=+10"
)
if %Arma%==5 (
  set "Mod=+20"
)

if not defined Mod (
  echo Tipo de arma incorrecto: %Arma%
  goto :empuñadas
)
goto :tirada




:proyectil
echo.
SET "Arma="
echo Arma: 
echo     1:Honda   2:Arco corto   3:Arco compuesto   4:Arco largo   5:Ballesta
set /P "Arma=Seleccione el tipo de arma (1,2,3,4,5): "

if %Arma%==1 (
  set "Mod=-20"
)
if %Arma%==2 (
  set "Mod=-10"
)
if %Arma%==3 (
  set "Mod=+00"
)
if %Arma%==4 (
  set "Mod=+10"
)
if %Arma%==5 (
  set "Mod=+20"
)

if not defined Mod (
  echo Arma incorrecta: %Arma%
  goto :proyectil
)
goto :tirada


:sortilegios
echo.
SET "Sortilegio="
set /P "Sortilegio=Seleccione la clase de sortilegio (I,U,P,F,E): "

if %Sortilegio%==I (
  set "Mod=-20"
)
if %Sortilegio%==U (
  set "Mod=-10"
)
if %Sortilegio%==P (
  set "Mod=+00"
)
if %Sortilegio%==F (
  set "Mod=+10"
)
if %Sortilegio%==E (
  set "Mod=+20"
)

if not defined Mod (
  echo Clase de sortilegio incorrecta: %Sortilegio%
  goto :sortilegios
)
goto :tirada


:maniobras
echo.
SET "Dificultad="
echo Dificultad de la maniobra: 
echo    1:Rutina   2:Fácil   3:Poca dificultad   4:Dificultad media   5:Difícil
echo    6:Muy difícil   7:Extremadamente difícil   8:Locura completa   9:Absurdo
set /P "Dificultad=Seleccione la dificultad (1,2,3,4,5,6,7,8,9): "

if %Dificultad%==1 (
  set "Mod=-50"
)
if %Dificultad%==2 (
  set "Mod=-35"
)
if %Dificultad%==3 (
  set "Mod=-20"
)
if %Dificultad%==4 (
  set "Mod=-10"
)
if %Dificultad%==5 (
  set "Mod=+00"
)
if %Dificultad%==6 (
  set "Mod=+05"
)
if %Dificultad%==7 (
  set "Mod=+10"
)
if %Dificultad%==8 (
  set "Mod=+15"
)
if %Dificultad%==9 (
  set "Mod=+20"
)

if not defined Mod (
  echo Dificultad incorrecta: %Dificultad%
  goto :maniobras
)
goto :tirada





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
node crits "!pif %Tipo%%Mod%%Tirada%
exit

chcp %cp%>nul
