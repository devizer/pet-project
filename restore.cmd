taskkill /F /T /IM TodoMvc.W3API.exe 
pushd %systemdrive%\
mkdir ToDo.MVC 1>nul 2>nul
cd ToDo.MVC
"C:\Program Files\7-Zip\7zG.exe" x \\desktop-vh\Shared\todo-mvc.zip -y
cd TodoMvc.W3API\bin\Debug\ 
start TodoMvc.W3API.exe 
popd