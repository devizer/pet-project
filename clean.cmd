rd /q /s packages
for %%d in (TodoMvc.BL TodoMvc.BL.Tests TodoMvc.W3API) DO (
  rd /q /s %%d\bin
  rd /q /s %%d\obj
)
