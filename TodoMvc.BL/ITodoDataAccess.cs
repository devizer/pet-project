using System.Collections.Generic;

namespace TodoMvc.BL
{
}

namespace TodoMvc.BL
{
}

namespace TodoMvc.BL
{
    public interface ITodoDataAccess
    {
        long CreateList(string title);
        void UpdateList(long idList, string title);
        void DeleteList(long idList);
        TodoList SelectTasks(long idList, TaskStatus status);
        long AddTask(long idList, string title, bool completed);
        void UpdateTask(long idList, long idTask, string title, bool completed);
        void UpdateTaskTitle(long idList, long idTask, string title);
        void UpdateTaskCompleted(long idList, long idTask, bool completed);
        void DeleteTask(long idList, long idTask);
        void MarkTask(long idList, long idTask, bool completed);
        IEnumerable<TodoList> GetAllLists();
    }
}