@echo off
for /f "tokens=2 delims=:." %%x in ('chcp') do set cp=%%x
chcp 65001>nul
cls
echo ===== ATAQUE DE BASE =====

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
:armadura
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
  goto :armadura
)))))

:: echo La armadura seleccionada es %ARMADURA%


:: TIPO
:reino
echo.
set "Reino="
set /P "Reino=Reino de magia (ESE:Esencia / CAN:Canalización): "

if not %Reino%==ESE (if not %Reino%==CAN (
  echo Tipo de bola %Reino% incorrecto.
  echo.
  goto :tipo
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

:: BO SORTILEGIOS BÁSICOS
:bosortbase
echo.
set "BOSBase="
set /P "BOSBase=Introduzca la BO de Sortilegios de Base: "
SET "var="&for /f "delims=+-0123456789" %%i in ("%BOSBase%") do set var=%%i
if defined var (
   echo BO de Sortilegios de Base: %BOSBase%
   echo Sólo se permiten valores numéricos y los caracteres "+" y "-".
   echo.
   goto :bosortbase
)


:: NIVEL DEL SORTILEGIO
:nivelsort
echo.
set "NivSort="
set /P "NivSort=Introduzca el nivel del sortilegio (1-10): "

if %NivSort%==1 (
    set "ModSort=-1"
    goto :preparacion
)
if %NivSort%==2 (
    set "ModSort=-2"
    goto :preparacion
)
if %NivSort%==3 (
    set "ModSort=-3"
    goto :preparacion
)
if %NivSort%==4 (
    set "ModSort=-4"
    goto :preparacion
)
if %NivSort%==5 (
    set "ModSort=-5"
    goto :preparacion
)
if %NivSort%==6 (
    set "ModSort=-6"
    goto :preparacion
)
if %NivSort%==7 (
    set "ModSort=-7"
    goto :preparacion
)
if %NivSort%==8 (
    set "ModSort=-8"
    goto :preparacion
)
if %NivSort%==9 (
    set "ModSort=-9"
    goto :preparacion
)
if %NivSort%==10 (
    set "ModSort=-10"
    goto :preparacion
)

echo Nivel de sortilegio incorrecto: %NivSort%
goto :nivelsort

:: PREPARACIÓN
:preparacion
echo.
set "Prep="
set /P "Prep=Asaltos de preparación (0-4): "

if %Prep%==0 (
    set "ModPrep=-30"
    goto :distancia
)
if %Prep%==1 (
    set "ModPrep=-15"
    goto :distancia
)
if %Prep%==2 (
    set "ModPrep=+0"
    goto :distancia
)
if %Prep%==3 (
    set "ModPrep=+10"
    goto :distancia
)
if %Prep%==4 (
    set "ModPrep=+20"
    goto :distancia
)

echo Número de asaltos de preparación incorrecto: %Prep%
echo.
goto :preparacion


:distancia
echo.
set "Dist="
echo Seleccione la distancia:
echo    0: contacto
echo    1: de 1 a 10 pies
echo    2: de 11 a 50 pies
echo    3: de 51 a 101 pies
echo    4: de 101 a 300 pies
echo    5: más de 300 pies
set /P "Dist=Distancia (0-5): "

if %Dist%==0 (
    set "ModDistancia=+30"
    goto :estatico
)
if %Dist%==1 (
    set "ModDistancia=+10"
    goto :estatico
)
if %Dist%==2 (
    set "ModDistancia=+00"
    goto :estatico
)
if %Dist%==3 (
    set "ModDistancia=-10"
    goto :estatico
)
if %Dist%==4 (
    set "ModDistancia=-20"
    goto :estatico
)
if %Dist%==5 (
    set "ModDistancia=-30"
    goto :estatico
)

echo Distancia incorrecta: %Dist%
echo.
goto :distancia

:estatico
echo.
set "Estatico="
set /P "Estatico=Blanco estático (S/N): "

if %Estatico%==S (
    set "ModEstatico=+10"
    goto :resultados
)

if %Estatico%==N (
    set "ModEstatico=+00"
    goto :resultados
)

echo Introduzca S o N
goto :estatico


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
:resultados
echo.
    :: !base (CAN/ESE)(SA/CU...)100+100
node ataques "!base %Reino%%Armadura%%Tirada%+%Modificadores%%ModPrep%%ModDistancia%%ModEstatico%+%BOSBase%%ModSort%"
node ataques "!base %Reino%%Armadura%%Tirada%+%Modificadores%%ModPrep%%ModDistancia%%ModEstatico%+%BOSBase%%ModSort%" >> MERP.log

chcp %cp%>nul
