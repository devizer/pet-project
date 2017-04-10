@echo off

rem 1. Increment Build Number
for /F %%v in (-Version-Number.cfg) DO set MYVERSION=%%v
for /F %%b in (-Build-Number.cfg) DO set MYBUILD=%%b
Set /A MYBUILD=%MYBUILD% + 1
Echo NEW Build: "%MYBUILD%"
Echo %MYBUILD% > -Build-Number.cfg

rem 2. Embed Version into AssemblyVersion.cs
echo [assembly: System.Reflection.AssemblyVersion("%MYVERSION%.%MYBUILD%")] > ..\TodoMvc.BL\Properties\AssemblyVersion.cs