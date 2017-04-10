using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.Cors;
using Ninject.Web.WebApi.Filter;
using TodoMvc.BL;

namespace TodoMvc.W3API.Controllers
{
    /// <summary>
    /// Manage Lists
    /// </summary>
    [RoutePrefix(ApiPath.V1 + "/lists")]
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class ListsController : BaseControllerWithDataAccess
    {

        /// <summary>
        /// Create new List
        /// </summary>
        [HttpPut, Route("")]
        public long Add(string title)
        {
            return Repository.CreateList(title);
        }

        /// <summary>
        /// Get all todo-lists and their tasks
        /// </summary>
        [HttpGet, Route(""), ExpiresImmediately]
        public List<TodoList> GetAll()
        {
            return Repository.GetAllLists().ToList();
        }

        /// <summary>
        /// Delete the List
        /// </summary>
        [HttpDelete, Route("{idList:long}")]
        public void Delete(long idList)
        {
            Repository.DeleteList(idList);
        }

        /// <summary>
        /// Update list's title
        /// </summary>
        [HttpPost, Route("{idList:long}/title")]
        public void Update(long idList, string title)
        {
            Repository.UpdateList(idList, title);
        }


    }
}
