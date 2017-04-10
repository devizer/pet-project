pushd version
call inc-build.cmd
popd

echo for($v=15; $v -ge 11; $v--) { $p="HKLM:\Software\Microsoft\MSBuild\$v.0"; $i1=(Get-Item -ErrorAction SilentlyContinue -Path $p); if ($i1) { $ret=$i1.GetValue("MSBuildOverrideTasksPath"); if ($ret) { $exe = "${ret}msbuild.exe"; if (Test-Path $exe) { Write-Host "$exe"; Exit 0; } } } } Exit 1; | powershell -OutputFormat Text -command - > "%USERPROFILE%\.lastmsbuild"
for /F "delims=" %%v in (%USERPROFILE%\.lastmsbuild) DO set LAST_MSBUILD=%%v
echo Last MSBUILD: "%LAST_MSBUILD%"
"%LAST_MSBUILD%" /t:Clean,Rebuild /p:Configuration=Debug /p:DefineConstants="TRACE;DEBUG"
