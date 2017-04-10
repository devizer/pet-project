using System;
using System.Reflection;
using System.Web.Http;
using Autofac;
using Autofac.Integration.WebApi;
using Microsoft.Owin;
using Microsoft.Owin.Diagnostics;
using Microsoft.Owin.FileSystems;
using Microsoft.Owin.StaticFiles;
using Ninject;
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
            config.Filters.Add(new NotFoundExceptionFilterAttribute());
            config.Filters.Add(new NotImplExceptionFilterAttribute());
            config.EnableCors();

            /*
                        config.Routes.MapHttpRoute(
                            name: "DefaultApi",
                            routeTemplate: "api/{controller}/{id}",
                            defaults: new { id = RouteParameter.Optional }
                        );
            */


            var builder = new ContainerBuilder();
            builder.RegisterApiControllers(Assembly.GetExecutingAssembly());
            builder.Register<ITodoDataAccess>(c => new TodoDataAccess(new TodoDb()));
            var container = builder.Build();

            config.DependencyResolver = new AutofacWebApiDependencyResolver(container);


            // config.DependencyResolver = new NinjectResolver(CreateKernel());
            var resolver = config.DependencyResolver;

            config.IncludeErrorDetailPolicy = IncludeErrorDetailPolicy.LocalOnly;
            config.MapHttpAttributeRoutes();

            config
                .EnableSwagger(c =>
                {
                    c.SingleApiVersion("v1", "Shared TODO List (Single Page Application and Web API)");
                    c.IncludeXmlComments("todo_app.xmldocs.xml");
                })
                .EnableSwaggerUi();


#if DEBUG
            appBuilder.UseErrorPage(ErrorPageOptions.ShowAll);
#endif

            // appBuilder.UseNinjectMiddleware(CreateKernel).UseNinjectWebApi(config);

            appBuilder.UseAutofacMiddleware(container);
            appBuilder.UseAutofacWebApi(config);
            appBuilder.UseWebApi(config);



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

        private static IKernel CreateKernel()
        {
            var kernel = new StandardKernel() ;
            kernel.Bind<ITodoDataAccess>().ToConstructor(_ => new TodoDataAccess(new TodoDb()));
            return kernel;
        }
    }




}

