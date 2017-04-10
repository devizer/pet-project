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
        protected virtual ITodoDataAccess Repository { get; private set; }

        public BaseControllerWithDataAccess()
        {
            // we are using TodoDB connection string from config
            Repository = new TodoDataAccess(new TodoDb());
        }
    }
}
