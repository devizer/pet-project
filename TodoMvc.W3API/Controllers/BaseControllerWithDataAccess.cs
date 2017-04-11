using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web.Http;
using TodoMvc.BL;

namespace TodoMvc.W3API.Controllers
{
    public abstract class BaseControllerWithDataAccess : ApiController
    {
        protected virtual ITodoDataAccess Repository { get; set; }

        // Here is the simple way to force an injection
        protected BaseControllerWithDataAccess(ITodoDataAccess repository)
        {
            if (repository == null)
                throw new ArgumentNullException(nameof(repository));

            Repository = repository;
        }
    }
}
