using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TodoMvc.BL
{
    // TODO: Fix possible NullReferenceException
    public class TodoDataAccess : ITodoDataAccess
    {
        private TodoDb Db;

        public TodoDataAccess(TodoDb db)
        {
            Db = db;
        }

        public long CreateList(string title)
        {
            var entity = new TodoList() {Title = title};
            Db.TodoLists.Add(entity);
            Db.SaveChanges();
            return entity.Id;
        }

        public void UpdateList(long idList, string title)
        {
            var list = Db.TodoLists.FirstOrDefault(x => x.Id == idList);
            if (list == null) NotFoundException.Throw("TodoList");

            list.Title = title;
            Db.SaveChanges();
        }

        public void DeleteList(long idList)
        {
            var list = Db.TodoLists.AsNoTracking().Include("Tasks").FirstOrDefault(x => x.Id == idList);
            if (list == null) NotFoundException.Throw("TodoList");

            Db.TodoTasks.RemoveRange(list.Tasks);
            Db.TodoLists.Remove(list);
            Db.SaveChanges();
        }

        public IEnumerable<TodoTask> SelectTasks(long idList, TaskStatus status)
        {
            var list = Db.TodoLists.AsNoTracking().FirstOrDefault(x => x.Id == idList);
            if (list == null) NotFoundException.Throw("TodoList");

            var query = Db.TodoTasks.AsNoTracking().Where(x => x.IdList == idList);
            if (status == TaskStatus.Active)
                query = query.Where(x => !x.Completed);
            else if (status == TaskStatus.Completed)
                query = query.Where(x => x.Completed);

            return query;
        }


        public long AddTask(long idList, string title, bool completed)
        {
            var list = Db.TodoLists.AsNoTracking().FirstOrDefault(x => x.Id == idList);
            if (list == null) NotFoundException.Throw("TodoList");

            var task = new TodoTask() {Completed = completed, IdList = idList, Title = title};
            Db.TodoTasks.Add(task);
            Db.SaveChanges();
            return task.Id;
        }

        public void UpdateTask(long idList, long idTask, string title, bool completed)
        {
            var list = Db.TodoLists.AsNoTracking().FirstOrDefault(x => x.Id == idList);
            if (list == null) NotFoundException.Throw("TodoList");

            var task = Db.TodoTasks.FirstOrDefault(x => x.Id == idTask);
            if (task == null) NotFoundException.Throw("TodoTask");

            task.Title = title;
            task.Completed = completed;
            Db.SaveChanges();
        }

        public void UpdateTaskTitle(long idList, long idTask, string title)
        {
            var list = Db.TodoLists.AsNoTracking().FirstOrDefault(x => x.Id == idList);
            if (list == null) NotFoundException.Throw("TodoList");

            var task = Db.TodoTasks.FirstOrDefault(x => x.Id == idTask);
            if (task == null) NotFoundException.Throw("TodoTask");

            task.Title = title;
            Db.SaveChanges();
        }

        public void UpdateTaskCompleted(long idList, long idTask, bool completed)
        {
            var list = Db.TodoLists.AsNoTracking().FirstOrDefault(x => x.Id == idList);
            if (list == null) NotFoundException.Throw("TodoList");

            var task = Db.TodoTasks.FirstOrDefault(x => x.Id == idTask);
            if (task == null) NotFoundException.Throw("TodoTask");

            task.Completed = completed;
            Db.SaveChanges();
        }

        public void DeleteTask(long idList, long idTask)
        {
            var list = Db.TodoLists.AsNoTracking().FirstOrDefault(x => x.Id == idList);
            if (list == null) NotFoundException.Throw("TodoList");

            var task = Db.TodoTasks.FirstOrDefault(x => x.Id == idTask);
            if (task == null) NotFoundException.Throw("TodoTask");

            Db.TodoTasks.Remove(task);
            Db.SaveChanges();
        }

        public void MarkTask(long idList, long idTask, bool completed)
        {
            var list = Db.TodoLists.AsNoTracking().FirstOrDefault(x => x.Id == idList);
            if (list == null) NotFoundException.Throw("TodoList");

            var task = Db.TodoTasks.FirstOrDefault(x => x.Id == idTask);
            if (task == null) NotFoundException.Throw("TodoTask");

            task.Completed = completed;
            Db.SaveChanges();
        }

        public IEnumerable<TodoList> GetAllLists()
        {
            var graph = Db.TodoLists.Include("Tasks");
            List<TodoList> ret = new List<TodoList>();
            foreach (var todoList in graph)
            {
                var list = new TodoList() {Id = todoList.Id, Title = todoList.Title, Tasks = new List<TodoTask>()};
                foreach (var t in todoList.Tasks)
                {
                    list.Tasks.Add(new TodoTask()
                    {
                        Id = t.Id,
                        IdList = t.IdList,
                        Title = t.Title,
                        Completed = t.Completed
                    });
                }

                ret.Add(list);
            }

            return ret;
        }
    }


}
