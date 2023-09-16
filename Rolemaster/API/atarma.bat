@echo off
for /f "tokens=2 delims=:." %%x in ('chcp') do set cp=%%x
chcp 65001>nul
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
:armadura
echo.
set "Armadura="
set /P "Armadura=Seleccione el tipo de armadura (SA, CU, CE, CM, CO): "

if %Armadura%==sa (
  set "Armadura=SA"
)
if %Armadura%==cu (
  set "Armadura=CU"
)
if %Armadura%==ce (
  set "Armadura=CE"
)
if %Armadura%==cm (
  set "Armadura=CM"
)
if %Armadura%==co (
  set "Armadura=CO"
)

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


:: ARMA
:arma
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
  if not %Arma%==EA (if not %Arma%==DA (if not %Arma%==HA (if not %Arma%==CI (
if not %Arma%==EC (if not %Arma%==LT (if not %Arma%==GA (if not %Arma%==MA (
if not %Arma%==MC (if not %Arma%==RD (if not %Arma%==MG (if not %Arma%==J1 (
if not %Arma%==J2 (if not %Arma%==L1 (if not %Arma%==L2 (if not %Arma%==LC (
if not %Arma%==AB (if not %Arma%==HC (if not %Arma%==MY (if not %Arma%==BS (
if not %Arma%==E2 (if not %Arma%==BO (if not %Arma%==AK (if not %Arma%==AC (
if not %Arma%==AL (if not %Arma%==BA (if not %Arma%==HO (

  echo El arma %Arma% no existe.
  echo.
  goto :arma
))))))))))))))))))))))))))))))))))))))))))))))))))))))



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


:: BONIFICACIÓN OFENSIVA
:bofensiva
echo.
set "BO="
set /P "BO=Bonificación Ofensiva del atacante: "

SET "var="&for /f "delims=+-0123456789" %%i in ("%BO%") do set var=%%i
if defined var (
   echo Valor de Bonificación Ofensiva incorrecto: %BO%
   echo Sólo se permiten valores numéricos para la Bonificación Ofensiva.
   echo.
   goto :bofensiva
)

:: BONIFICACIÓN DEFENSIVA
:bdefensiva
echo.
set "BD="
set /P "BD=Bonificación Defensiva del blanco: "

SET "var="&for /f "delims=+-0123456789" %%i in ("%BD%") do set var=%%i
if defined var (
   echo Valor de Bonificación Defensiva incorrecto: %BD%
   echo Sólo se permiten valores numéricos para la Bonificación Defensiva.
   echo.
   goto :bdefensiva
)


:: PARADA
:parada
echo.
set "Parada="
echo Seleccione la BO del defensor utilizada para parar.
echo  - Cuerpo a cuerpo: puede parar el ataque CC del blanco 
echo                     que el defensor esté atacando, con toda
echo                     o parte su bonificación ofensiva.
echo  - A distancia: si el defensor tiene un escudo y está
echo                 encarado al atacante, puede parar pero sólo 
echo                 hasta la mitad de su bonificación ofensiva.
set /P "Parada=BO del defensor destinada a parar este ataque: "

SET "var="&for /f "delims=0123456789" %%i in ("%Parada%") do set var=%%i
if defined var (
   echo Valor de parada incorrecto: %Parada%
   echo Sólo se permiten valores numéricos para la parada.
   echo.
   goto :parada
)

:: ATAQUE CUERPO A CUERPO O A DISTANCIA
:tipoataque
echo.
set "TipoAtaque="
set /P "TipoAtaque=Tipo de ataque (1:Cuerpo a cuerpo   2:Proyectiles/Arrojadizas): "

if %TipoAtaque%==1 (
  goto :modposicionales
)
if %TipoAtaque%==2 (
  goto :alcance
)

echo Tipo de ataque incorrecto: %TipoAtaque%
goto :tipoataque


:: MODIFICADORES POSICIONALES
:modposicionales
echo.
set "Encaramiento="
echo Seleccione el encaramiento del ataque:
echo   1:Ataque frontal
echo   2:Ataque de flanco
echo   3:Ataque por la espalda
set /P "Encaramiento=Seleccione (1-3): "

if %Encaramiento%==1 (
  set "ModEncaramiento=+00"
  goto :sorprendido 
)
if %Encaramiento%==2 (
  set "ModEncaramiento=+15"
  goto :sorprendido 
)
if %Encaramiento%==3 (
  set "ModEncaramiento=+35"
  goto :sorprendido 
)

echo Encaramiento incorrecto: %Encaramiento%
goto :modposicionales



:sorprendido
echo.
set "Sorprendido="
set /P "Sorprendido=Defensor sorprendido (S/N): "

if %Sorprendido%==N (
  set "ModSorprendido=+00"
  goto :caidoaturdido
)
if %Sorprendido%==S (
  set "ModSorprendido=+20"
  goto :caidoaturdido
)

if %Sorprendido%==n (
  set "ModSorprendido=+00"
  goto :caidoaturdido
)
if %Sorprendido%==s (
  set "ModSorprendido=+20"
  goto :caidoaturdido
)

echo Valor de sorprendido incorrecto: %Sorprendido%
goto :sorprendido


:caidoaturdido
echo.
set "CaidoAturdido="
set /P "CaidoAturdido=Defensor caído o aturdido (S/N): "

if %CaidoAturdido%==N (
  set "ModCaidoAturdido=+00"
  goto :atacanteherido
)
if %CaidoAturdido%==S (
  set "ModCaidoAturdido=+20"
  goto :atacanteherido
)
if %CaidoAturdido%==n (
  set "ModCaidoAturdido=+00"
  goto :atacanteherido
)
if %CaidoAturdido%==s (
  set "ModCaidoAturdido=+20"
  goto :atacanteherido
)

echo Valor de caído o aturdido incorrecto: %CaidoAturdido%
goto :caidoaturdido

:alcance
echo.
set "Alcance="
echo Introduzca el alcance del ataque
echo   1 : Corto alcance, hasta Alcance Básico del arma
echo   2 : Medio alcance, hasta doble de Alcance Básico del arma
echo   3 : Largo alcance, hasta triple de Alcance Básico del arma
echo   4 : Máximo alcance, hasta cuádruple de Alcance Básico del arma
echo   5 : Ballesta hasta 50 pies de distancia
set /P "Alcance=Seleccione (1-4): "

if %Alcance%==1 (
  set "ModAlcance=+00"
  goto :recarga
)
if %Alcance%==2 (
  set "ModAlcance=-25"
  goto :recarga
)
if %Alcance%==3 (
  set "ModAlcance=-50"
  goto :recarga
)
if %Alcance%==4 (
  set "ModAlcance=-75"
  goto :recarga
)
if %Alcance%==5 (
  set "ModAlcance=+20"
  goto :recarga
)

echo Alcance incorrecto: %Alcance%
goto :alcance



:recarga
echo.
set "Recarga="
echo Seleccione una de las siguientes opciones
echo   1: Recarga(0) con arco compuesto
echo   2: Recarga(0) con arco corto
echo   3: Recarga(0) con arco largo 
echo   4: Ninguna de las anteriores
set /P "Recarga=Seleccione (1-4): "

if %Recarga%==1 (
  set "ModRecarga=-25"
  goto :atacanteherido
)
if %Recarga%==2 (
  set "ModRecarga=-10"
  goto :atacanteherido
)
if %Recarga%==3 (
  set "ModRecarga=-35"
  goto :atacanteherido
)
if %Recarga%==4 (
  set "ModRecarga=+00"
  goto :atacanteherido
)

echo Recarga incorrecta: %Recarga%
goto :recarga

:atacanteherido
echo.
set "AtacanteHerido="
set /P "AtacanteHerido=El atacante ha perdido más de la mitad de sus PVs (S/N): "

if %AtacanteHerido%==S (
  set "ModAtacanteHerido=-20"
  goto :desenvaina
)
if %AtacanteHerido%==N (
  set "ModAtacanteHerido=+00"
  goto :desenvaina
)
if %AtacanteHerido%==s (
  set "ModAtacanteHerido=-20"
  goto :desenvaina
)
if %AtacanteHerido%==n (
  set "ModAtacanteHerido=+00"
  goto :desenvaina
)

echo Respuesta errónea: %AtacanteHerido%
goto :atacanteherido

:desenvaina
echo.
set "Desenvaina="
set /P "Desenvaina=El atacante desenvaina o cambia de sitio armas, o embraza un escudo (S/N): "

if %Desenvaina%==S (
  set "ModDesenvaina=-30"
  goto :movido
)
if %Desenvaina%==N (
  set "ModDesenvaina=+00"
  goto :movido
)
if %Desenvaina%==s (
  set "ModDesenvaina=-30"
  goto :movido
)
if %Desenvaina%==n (
  set "ModDesenvaina=+00"
  goto :movido
)

echo Respuesta errónea: %Desenvaina%
goto :desenvaina

:movido
echo.
set "MOV="
set /P "MOV=Número de pies que se ha movido el atacante: "

SET "var="&for /f "delims=0123456789" %%i in ("%MOV%") do set var=%%i
if defined var (
   echo Valor de movimiento incorrecto: %MOV%
   echo Sólo se permiten valores numéricos para el movimiento del atacante.
   echo.
   goto :movido
)


:: MODIFICADORES
:modificadores
echo.
set "Modificadores="
set /P "Modificadores=Otros modificadores aplicables: "

SET "var="&for /f "delims=+-0123456789" %%i in ("%Modificadores%") do set var=%%i
if defined var (
   echo Modificadores incorrectos: %Modificadores%
   echo Sólo se permiten valores numéricos y los caracteres "+" y "-" para los modificadores.
   echo.
   goto :modificadores
)

:: RESULTADOS
echo.
node ataques "!atarma %Armadura%%Arma%/%Tirada%+%Modificadores%%ModEncaramiento%+%BO%-%BD%-%Parada%%ModSorprendido%%ModCaidoAturdido%%ModAlcance%%ModRecarga%%ModAtacanteHerido%-%MOV%%ModDesenvaina%"
node ataques "!atarma %Armadura%%Arma%/%Tirada%+%Modificadores%%ModEncaramiento%+%BO%-%BD%-%Parada%%ModSorprendido%%ModCaidoAturdido%%ModAlcance%%ModRecarga%%ModAtacanteHerido%-%MOV%%ModDesenvaina%" >> MERP.log



chcp %cp%>nul
