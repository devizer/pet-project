using System;
using System.Collections.Generic;
using System.Data.Entity.Migrations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using NUnit.Framework;

namespace TodoMvc.BL.Tests
{
    [TestFixture]
    public class All_Tests
    {
        [OneTimeSetUp]
        public void OneTimeSetUp()
        {
            Console.WriteLine("Dir: " + Environment.CurrentDirectory);
        }

        [Test]
        public void _1_Db_Connection_Works()
        {
            TodoDb db = new TodoDb();
            int listsCount = db.TodoLists.Count();
        }

        [Test]
        public void _2_Id_of_List_is_Generated()
        {
            TodoDb db = new TodoDb();
            var first = new TodoList() { Title = "First List" };
            db.TodoLists.AddOrUpdate(x => x.Title, first);
            db.SaveChanges();
            Assert.Greater(first.Id, 0);
        }

        [Test]
        public void _3_Id_of_Task_is_Generated()
        {
            TodoDb db = new TodoDb();
            var first = new TodoTask() { Title = "Write more Tests", IdList = db.TodoLists.First().Id};
            db.TodoTasks.AddOrUpdate(x => x.Title, first);
            db.SaveChanges();
            Assert.Greater(first.Id, 0);
        }

        [Test]
        public void _4_Test_Full_Flow()
        {

            TodoDataAccess prev = null;
            Func<TodoDataAccess> newDataAccess = () =>
            {
                prev?.Dispose();
                return prev = new TodoDataAccess(new TodoDb());
            };

            // Create List
            var title = "Temp List " + Guid.NewGuid();
            long id = newDataAccess().CreateList(title);

            // Get All Lists
            newDataAccess().SelectTasks(id, TaskStatus.All);
            var copy = newDataAccess().GetAllLists().FirstOrDefault(x => x.Id == id);
            Assert.NotNull(copy);
            Assert.AreEqual(title, copy.Title);

            // Update List
            var newTitle = "Temp List " + Guid.NewGuid();
            newDataAccess().UpdateList(id, newTitle);
            copy = newDataAccess().GetAllLists().FirstOrDefault(x => x.Id == id);
            Assert.NotNull(copy);
            Assert.AreEqual(newTitle, copy.Title);

            // Delete List
            newDataAccess().DeleteList(id);
            copy = newDataAccess().GetAllLists().FirstOrDefault(x => x.Id == id);
            Assert.IsNull(copy);

            // Tasks Management 
            id = newDataAccess().CreateList(title);

            // Create Task
            var taskTitle = "Some Task " + Guid.NewGuid();
            long idTask = newDataAccess().AddTask(id, taskTitle, true);
            copy = newDataAccess().GetAllLists().FirstOrDefault(x => x.Id == id);
            Assert.IsTrue(copy.Tasks.Any(x => x.Title == taskTitle && x.Completed));

            // Update Task
            var newTaskTitle = "Some Task " + Guid.NewGuid();
            newDataAccess().UpdateTask(id, idTask, newTaskTitle, false);
            copy = newDataAccess().GetAllLists().FirstOrDefault(x => x.Id == id);
            Assert.IsTrue(copy.Tasks.Any(x => x.Title == newTaskTitle && !x.Completed));

            // Delete Task
            newDataAccess().DeleteTask(id, idTask);
            copy = newDataAccess().GetAllLists().FirstOrDefault(x => x.Id == id);
            var task = copy.Tasks.FirstOrDefault(x => x.Id == idTask);
            Assert.IsNull(task);

            // Delete non-empty list
            newDataAccess().AddTask(id, "Some Another Task", true);
            newDataAccess().DeleteList(id);
            Assert.IsNull(newDataAccess().GetAllLists().FirstOrDefault(x => x.Id == id));

            prev?.Dispose();
        }
    }
}
