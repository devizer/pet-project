using System.Web.Http;

namespace TodoMvc.W3API.Controllers
{
    [RoutePrefix(ApiPath.V1 + "/lists/{idList:long}/tasks")]
    public class TasksController : BaseControllerWithDataAccess
    {

        /// <summary>
        /// Create new task
        /// </summary>
        [HttpPut, Route("")]
        public long AddTask(long idList, string title, bool completed)
        {
            return Repository.AddTask(idList, title, completed);
        }

        /// <summary>
        /// Delete task
        /// </summary>
        [HttpDelete, Route("{idTask:long}")]
        public void DeleteTask(long idList, long idTask)
        {
            Repository.DeleteTask(idList, idTask);
        }

        /// <summary>
        /// Update task's title
        /// </summary>
        [HttpPost, Route("{idTask:long}/title")]
        public void UpdateTaskTitle(long idList, long idTask, string title)
        {
            Repository.UpdateTaskTitle(idList, idTask, title);
        }

        /// <summary>
        /// Update task's status
        /// </summary>
        [HttpPost, Route("{idTask:long}/completed")]
        public void UpdateTaskCompleted(long idList, long idTask, bool completed)
        {
            Repository.UpdateTaskCompleted(idList, idTask, completed);
        }


    }
}