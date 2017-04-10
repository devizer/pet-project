call clean.cmd
for /f %%i in ('datetime local') do set datetime=%%i
"C:\Program Files\7-Zip\7zG.exe" a -t7z -mx=9 -mfb=128 -md=128m -ms=on -xr!.git -xr!todo.db ^
  "C:\Users\CloudBackup\TodoMvc(angular,webapi) (%datetime%).7z" .