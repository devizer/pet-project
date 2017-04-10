using System.Net;
using System.Net.Http;
using System.Web.Http.Filters;
using TodoMvc.BL;

namespace TodoMvc.W3API
{
    public class NotFoundExceptionFilterAttribute : ExceptionFilterAttribute
    {
        public override void OnException(HttpActionExecutedContext context)
        {
            if (context.Exception is NotFoundException)
            {
                
                context.Response = new HttpResponseMessage(HttpStatusCode.NotFound)
                {
                    ReasonPhrase = context.Exception.Message,
                };
            }
        }
    }
}