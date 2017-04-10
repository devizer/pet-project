using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using System.Web.Http.Controllers;
using System.Web.Http.Filters;

namespace TodoMvc.W3API
{
    public class ExpiresImmediatelyAttribute : ActionFilterAttribute
    {

        static readonly string ZeroDate = new DateTime(2000,1,1).ToString("R");
        public override void OnActionExecuting(HttpActionContext actionContext)
        {
            base.OnActionExecuting(actionContext);
        }

        public override void OnActionExecuted(HttpActionExecutedContext actionContext)
        {
            base.OnActionExecuted(actionContext);
            // return;

            // http 1.0
            actionContext.Response.Headers.Add("Pragma", "no-cache");

            // http 1.1
            actionContext.Response.Headers.Add("Cache-Control", "no-store");
        }


    }
}
