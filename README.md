# Pet Project - TodoMVC


### AngularJS + C#/.NET
* [ ] **_TODO-1_: Add support for managing more than one list.** This includes the ability for the user to add new/delete existing lists as well as to give each list a meaningful name. 
* [X] **_TODO-2_: Replace the local storage with a proper server-side back-end** implemented on top of C# 6.0, ASP.NET Web API, Entity Framework and a small embedded database of your choice. All connected clients should share the same lists. Auto-refresh of views on client-side will not be required. Bonus points are awarded if you manage to wrap your new API in a self-hosted OWIN service, e.g. using Katana's Microsoft.AspNet.WebApi.OwinSelfHost.
* [ ] **_TODO-3_: Add a basic build process** (using [webpack](https://webpack.github.io/)) that automatically...
  * ...combines all JavaScript source files into a single minified asset.
  * ...generates source maps compatible with the debugger built into the Chrome Developer Tools. 
  * ...uses `livereload` to automatically triggers a reload of static assets in the browser as required.
* [X] **_TODO-4_: Document the REST API using Swagger**, then use some tooling such as [Swashbuckle](https://github.com/domaindrivendev/Swashbuckle.AspNetCore) to provide a fully integrated user experience.


#### How to build
Please use 
```
restore-build-test-run.cmd
```

It downloads `nuget.exe` into %AppData%\Temp\nuget.exe, restores nuget packges, build sources using latest Visual Studio, lauches tests using nunit console runner and launch TodoMvc.W3API.exe
Warning! Todo.W3API.exe requires permission to open http-listener. Also it may require firewall rule.

