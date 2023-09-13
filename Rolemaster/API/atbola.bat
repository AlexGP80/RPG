@echo off
for /f "tokens=2 delims=:." %%x in ('chcp') do set cp=%%x
chcp 65001>nul
cls
echo ===== ATAQUE DE BOLA =====

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
:tipo
echo.
set "Bola="
set /P "Bola=Tipo de bola (FU:Fuego / FR:Frío): "

if not %Bola%==FR (if not %Bola%==FU (
  echo Tipo de bola %Bola% incorrecto.
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
echo    0: de 0 a 10 pies
echo    1: de 11 a 50 pies
echo    2: de 51 a 100 pies
echo    3: de 101 a 200 pies
echo    4: de 201 a 300 pies
echo    5: mayor de 300 pies
set /P "Dist=Distancia (0-5): "

if %Dist%==0 (
    set "ModDistancia=+35"
    goto :central
)
if %Dist%==1 (
    set "ModDistancia=+00"
    goto :central
)
if %Dist%==2 (
    set "ModDistancia=-25"
    goto :central
)
if %Dist%==3 (
    set "ModDistancia=-40"
    goto :central
)
if %Dist%==4 (
    set "ModDistancia=-55"
    goto :central
)
if %Dist%==5 (
    set "ModDistancia=-75"
    goto :central
)

echo Distancia incorrecta: %Dist%
echo.
goto :distancia

:central
echo.
set "Central="
set /P "Central=El blanco se encuentra en el punto central (S/N): "

if %Central%==S (
    set "ModCentral=+20"
    goto :resultados
)

if %Central%==N (
    set "ModCentral=+00"
    goto :resultados
)

echo Introduzca S o N
goto :central


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
ECHO node ataques "!bola %Bola%%Armadura%%Tirada%+%Modificadores%%ModPrep%%ModDistancia%%ModCentral%+%BOSBase%%ModSort%"
node ataques "!bola %Bola%%Armadura%%Tirada%+%Modificadores%%ModPrep%%ModDistancia%%ModCentral%+%BOSBase%%ModSort%"
node ataques "!bola %Bola%%Armadura%%Tirada%+%Modificadores%%ModPrep%%ModDistancia%%ModCentral%+%BOSBase%%ModSort%" >> MERP.log

chcp %cp%>nul
