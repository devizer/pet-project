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

            HttpStatusCode? status = null;

            if (context.Exception is NotImplementedException)
                status = HttpStatusCode.NotImplemented;

            else if (context.Exception is NotFoundException)
                status = HttpStatusCode.NotFound;

            else if (context.Exception is ArgumentException)
                status = HttpStatusCode.BadRequest;

            if (status != null)
            {
                context.Response = new HttpResponseMessage(status.Value);

                if (context.Exception != null)
                {
                    string response = JsonConvert.SerializeObject(new
                    {
                        type = context.Exception.GetType().FullName,
                        message = context.Exception.Message
                    });

                    context.Response.ReasonPhrase = context.Exception.Message;
                    context.Response.Content = new StringContent(response, Encoding.UTF8, "application/json");
                }
            }
        }
    }
}
