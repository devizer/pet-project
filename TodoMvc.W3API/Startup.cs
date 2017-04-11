using System;
using System.Reflection;
using System.Web.Http;
using Autofac;
using Autofac.Integration.WebApi;
using Microsoft.Owin;
using Microsoft.Owin.Diagnostics;
using Microsoft.Owin.FileSystems;
using Microsoft.Owin.StaticFiles;
using Owin;
using Swashbuckle.Application;
using TodoMvc.BL;

namespace TodoMvc.W3API
{
    public class Startup
    {
        public void Configuration(IAppBuilder appBuilder)
        {
            HttpConfiguration config = new HttpConfiguration();
            config.Filters.Add(new SmartyExceptionTransformerAttribute());
            config.EnableCors();

            /*
                        config.Routes.MapHttpRoute(
                            name: "DefaultApi",
                            routeTemplate: "api/{controller}/{id}",
                            defaults: new { id = RouteParameter.Optional }
                        );
            */


            // Autofaq configuration
            var builder = new ContainerBuilder();
            builder.Register<ITodoDataAccess>(c => new TodoDataAccess(new TodoDb()));
            builder.RegisterApiControllers(Assembly.GetExecutingAssembly());
            var container = builder.Build();
            config.DependencyResolver = new AutofacWebApiDependencyResolver(container);

            config.IncludeErrorDetailPolicy = IncludeErrorDetailPolicy.LocalOnly;
            config.MapHttpAttributeRoutes();

            config
                .EnableSwagger(c =>
                {
                    c.SingleApiVersion("v1", "Shared TODO List (Single Page Application and Web API)");
                    c.IncludeXmlComments("todo_app.xmldocs.xml");
                })
                .EnableSwaggerUi();



            appBuilder.UseAutofacMiddleware(container);
            appBuilder.UseAutofacWebApi(config);
            appBuilder.UseWebApi(config);

#if DEBUG
            appBuilder.UseErrorPage(ErrorPageOptions.ShowAll);
#endif




            // Static Files configuration
            var physicalFileSystem = new PhysicalFileSystem("w3root");
            var options = new FileServerOptions
            {
                EnableDefaultFiles = true,
                FileSystem = physicalFileSystem
            };
            options.StaticFileOptions.FileSystem = physicalFileSystem;
            options.StaticFileOptions.ServeUnknownFileTypes = true;
            options.DefaultFilesOptions.DefaultFileNames = new[]
            {
                "index.html", "default.html",
                "index.htm", "default.htm",
            };
            appBuilder.UseFileServer(options);
        }

    }
}

