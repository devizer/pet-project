using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.Owin.Hosting;
using TodoMvc.BL;

namespace TodoMvc.W3API
{
    class Program
    {
        static void Main(string[] args)
        {
            typeof(System.Data.SQLite.EF6.SQLiteProviderFactory).ToString();
            typeof(System.Data.SQLite.SQLiteFactory).ToString();

            string baseAddress = args.Length > 0 && !string.IsNullOrEmpty(args[0])
                ? args[0]
                : "http://*:9000/";

            var ver = typeof(TodoDb).Assembly.GetName().Version;
            Console.WriteLine($"Todo WebAPI ver {ver}");

            using (WebApp.Start<Startup>(url: baseAddress))
            {
                Console.WriteLine($"HTTP server is listening: {baseAddress}. Press enter to close the app.");
                ThreadPool.QueueUserWorkItem(_ => CheckDatabase());
                Console.ReadLine();
            }

        }

        static void CheckDatabase()
        {
            try
            {
                var db = new TodoDb();
                long lists = db.TodoLists.Count();
                long tasks = db.TodoTasks.Count();
                Console.WriteLine($"DB Connection is OK. Total lists: {lists}, tasks: {tasks}");
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Problem with the DB {Environment.NewLine + ex + Environment.NewLine}" +
                    $"App might not work properly((");
            }

        }
    }
}
