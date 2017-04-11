using System.Web.Http;
using System.Web.Http.Cors;
using Swashbuckle.Swagger.Annotations;
using TodoMvc.BL;

namespace TodoMvc.W3API.Controllers
{
    [RoutePrefix(ApiPath.V1 + "/lists/{idList:long}/tasks")]
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class TasksController : BaseControllerWithDataAccess
    {
        public TasksController(ITodoDataAccess repository) : base(repository)
        {
        }

        /// <summary>
        /// Create new task
        /// </summary>
        [HttpPut, Route("")]
        [SwaggerResponse(404, "Specified list not found.")]
        [SwaggerResponse(400, "Task's title is required.")]
        public IdResponse AddTask(long idList, string title, bool completed)
        {
            return new IdResponse(Repository.AddTask(idList, title, completed));
        }

        /// <summary>
        /// Delete task
        /// </summary>
        [HttpDelete, Route("{idTask:long}")]
        [SwaggerResponse(404, "Specified list or task not found. See status phrase for details.")]
        public void DeleteTask(long idList, long idTask)
        {
            Repository.DeleteTask(idList, idTask);
        }

        /// <summary>
        /// Update task's title
        /// </summary>
        [HttpPost, Route("{idTask:long}/title")]
        [SwaggerResponse(404, "Specified list or task not found. See status phrase for details.")]
        [SwaggerResponse(400, "Task's title is required.")]
        public void UpdateTaskTitle(long idList, long idTask, string title)
        {
            Repository.UpdateTaskTitle(idList, idTask, title);
        }

        /// <summary>
        /// Update task's status
        /// </summary>
        [HttpPost, Route("{idTask:long}/completed")]
        [SwaggerResponse(404, "Specified list or task not found. See status phrase for details.")]
        public void UpdateTaskCompleted(long idList, long idTask, bool completed)
        {
            Repository.UpdateTaskCompleted(idList, idTask, completed);
        }


    }
}