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
        public void _1_Id_of_List_is_Generated()
        {
            TodoDb db = new TodoDb();
            var first = new TodoList() { Title = "First List" };
            db.TodoLists.AddOrUpdate(x => x.Title, first);
            db.SaveChanges();
            Assert.Greater(first.Id, 0);
        }

        [Test]
        public void _2_Id_of_Task_is_Generated()
        {
            TodoDb db = new TodoDb();
            var first = new TodoTask() { Title = "Write more Tests", IdList = db.TodoLists.First().Id};
            db.TodoTasks.AddOrUpdate(x => x.Title, first);
            db.SaveChanges();
            Assert.Greater(first.Id, 0);
        }
    }
}
