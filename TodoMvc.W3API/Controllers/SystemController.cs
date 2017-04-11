using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.Cors;
using TodoMvc.BL;

namespace TodoMvc.W3API.Controllers
{
    [RoutePrefix(ApiPath.V1 + "/system")]
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class SystemController : ApiController
    {

        /// <summary>
        /// Returns the build number and a kind of configuration (development | production)
        /// </summary>
        [Route("build-info"), AcceptVerbs("POST"), ExpiresImmediately]
        public string GetBuildInfo()
        {
#if DEBUG
            string suffix = "development";
#else
            string suffix = "production";
#endif
            return string.Format("{0}, {1}",
                typeof(TodoDb).Assembly.GetName().Version,
                suffix);
        }

    }
}
