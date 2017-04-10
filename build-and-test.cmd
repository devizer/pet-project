call build-only.cmd
set work=TodoMvc.BL.Tests\bin\Debug
pushd "%work%"
..\..\..\packages\NUnit.ConsoleRunner.3.6.1\tools\nunit3-console.exe --workers=1 TodoMvc.BL.Tests.dll
popd
