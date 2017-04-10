call nuget-restore.cmd 
call build-and-test.cmd
pushd TodoMvc.W3API\bin\Debug
start TodoMvc.W3API.exe
popd
