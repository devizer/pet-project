using System;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Web.Http.Filters;
using Newtonsoft.Json;
using TodoMvc.BL;

namespace TodoMvc.W3API
{
    public class SmartyExceptionTransformerAttribute : ExceptionFilterAttribute
    {
        public override void OnException(HttpActionExecutedContext context)
        {
            string response = context.Exception != null
                ? JsonConvert.SerializeObject(new
                {
                    type = context.Exception.GetType().FullName,
                    message = context.Exception.Message
                })
                : null;

            if (context.Exception is NotImplementedException)
            {
                context.Response = new HttpResponseMessage(HttpStatusCode.NotImplemented);
            }

            else if (context.Exception is NotFoundException)
            {
                context.Response = new HttpResponseMessage(HttpStatusCode.NotFound)
                {
                    ReasonPhrase = context.Exception.Message,
                    Content = response == null ? null : new StringContent(response, Encoding.UTF8, "application/json"),
                };
            }

            else if (context.Exception is ArgumentException)
            {
                context.Response = new HttpResponseMessage(HttpStatusCode.BadRequest)
                {
                    ReasonPhrase = context.Exception.Message,
                    Content = response == null ? null : new StringContent(response, Encoding.UTF8, "application/json"),
                };
            }

            else if (context.Exception != null)
            {
                context.Response = new HttpResponseMessage(HttpStatusCode.InternalServerError)
                {
                    ReasonPhrase = context.Exception.Message,
                    Content = response == null ? null : new StringContent(response, Encoding.UTF8, "application/json"),
                };
            }

        }
    }
}