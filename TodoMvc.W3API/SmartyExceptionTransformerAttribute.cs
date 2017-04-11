using System;
using System.Net;
using System.Net.Http;
using System.Web.Http.Filters;
using TodoMvc.BL;

namespace TodoMvc.W3API
{
    public class SmartyExceptionTransformerAttribute : ExceptionFilterAttribute
    {
        public override void OnException(HttpActionExecutedContext context)
        {
            if (context.Exception is NotImplementedException)
            {
                context.Response = new HttpResponseMessage(HttpStatusCode.NotImplemented);
            }

            else if (context.Exception is NotFoundException)
            {
                context.Response = new HttpResponseMessage(HttpStatusCode.NotFound)
                {
                    ReasonPhrase = context.Exception.Message,
                };
            }

            else if (context.Exception is ArgumentException)
            {
                context.Response = new HttpResponseMessage(HttpStatusCode.BadRequest)
                {
                    ReasonPhrase = context.Exception.Message,
                };
            }

            else if (context.Exception != null)
            {
                context.Response = new HttpResponseMessage(HttpStatusCode.InternalServerError)
                {
                    ReasonPhrase = context.Exception.Message,
                };
            }

        }
    }
}