@echo off
for /f "tokens=2 delims=:." %%x in ('chcp') do set cp=%%x
chcp 65001>nul
cls
echo ===== ATAQUE SIN ARMAS =====

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

if not defined Armadura (
  goto :armadura
)

if not %Armadura%==SA (
if not %Armadura%==CU (
IF NOT %Armadura%==CE (
IF NOT %Armadura%==CM (
if not %Armadura%==CO (
if not %Armadura%==sa (
if not %Armadura%==cu (
IF NOT %Armadura%==ce (
IF NOT %Armadura%==cm (
if not %Armadura%==co (
  echo La armadura %Armadura% no existe.
  echo.
  goto :armadura
))))))))))

:: echo La armadura seleccionada es %ARMADURA%

:: TAMAÑO
:tamano
echo.
set "Tam="
echo Seleccione el tamaño del atacante
echo    D:Diminuto   P:Pequeño   M:Mediano   G:Grande   E:Enorme
set /P "Tam=Seleccione el tamaño (D, P, M, G, E): "

if not defined Tam (
  goto :tamano
)

if not %Tam%==d (
if not %Tam%==p (
IF NOT %Tam%==m (
IF NOT %Tam%==g (
if not %Tam%==e (
if not %Tam%==d (
if not %Tam%==P (
IF NOT %Tam%==M (
IF NOT %Tam%==G (
if not %Tam%==E (
  echo Tamaño no válido: %Tam%
  echo.
  goto tamano
))))))))))


:: Tipo ataque
:tipoataque
echo.
set "Tipo="
echo Seleccione el tipo de ataque:
echo    pu:Puño/Patada  lu:Lucha libre
set /P "Tipo=: "

if not defined Tipo (
  goto :tipoataque
)

if not %Tipo%==pu (if not %Tipo%==lu (
  echo El tipo %Tipo% no es correcto.
  echo.
  goto :tipoataque
))



:: TIRADA
:tirada
echo.
set "Tirada="
set /P "Tirada=Tirada: "

if not defined Tirada (
  goto :tirada
)

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
set /P "BO=Suma bonificadores de FUE y AGI del atacante: "

if not defined BO (
  goto :bofensiva
)

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

if not defined BD (
  goto :bdefensiva
)

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
echo    El defensor puede parar el ataque CC del atacante si él mismo lo está
echo    atacando a su vez. Puede destinar a parada toda o parte su BO.
set /P "Parada=BO del defensor destinada a parar este ataque: "

if not defined Parada (
  goto :parada
)

SET "var="&for /f "delims=0123456789" %%i in ("%Parada%") do set var=%%i
if defined var (
   echo Valor de parada incorrecto: %Parada%
   echo Sólo se permiten valores numéricos para la parada.
   echo.
   goto :parada
)


:: MODIFICADORES POSICIONALES
:modposicionales
echo.
set "Encaramiento="
echo Seleccione el encaramiento del ataque:
echo   1:Ataque frontal
echo   2:Ataque de flanco
echo   3:Ataque por la espalda
set /P "Encaramiento=Seleccione (1-3): "

if not defined Encaramiento (
  goto :modposicionales
)

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

if not defined Sorprendido (
  goto :sorprendido
)

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

if not defined CaidoAturdido (
  goto :caidoaturdido
)

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


:atacanteherido
echo.
set "AtacanteHerido="
set /P "AtacanteHerido=El atacante ha perdido más de la mitad de sus PVs (S/N): "

if not defined AtacanteHerido (
  goto :atacanteherido
)

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

if not defined MOV (
  goto :movido
)

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
set /P "Modificadores=Modificadores: "

if not defined Modificadores (
  goto :modificadores
)

SET "var="&for /f "delims=+-0123456789" %%i in ("%Modificadores%") do set var=%%i
if defined var (
   echo Modificadores incorrectos: %Modificadores%
   echo Sólo se permiten valores numéricos y los caracteres "+" y "-" para los modificadores.
   echo.
   goto :modificadores
)

:: RESULTADOS
echo.
node ataques "!atanim %Tam%%Armadura%%Tipo%/%Tirada%+%Modificadores%%ModEncaramiento%+%BO%-%BD%-%Parada%%ModSorprendido%%ModCaidoAturdido%%ModAtacanteHerido%-%MOV%%ModDesenvaina%"
node ataques "!atanim %Tam%%Armadura%%Tipo%/%Tirada%+%Modificadores%%ModEncaramiento%+%BO%-%BD%-%Parada%%ModSorprendido%%ModCaidoAturdido%%ModAtacanteHerido%-%MOV%%ModDesenvaina%" >> MERP.log



chcp %cp%>nul
