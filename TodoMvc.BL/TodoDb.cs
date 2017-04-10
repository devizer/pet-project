using System.Data.Entity;
using System.Data.Entity.ModelConfiguration.Conventions;
using TodoMvc.BL.Migrations;

namespace TodoMvc.BL
{
    public class TodoDb : DbContext
    {
        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.Conventions.Remove<PluralizingTableNameConvention>();
        }

        static TodoDb()
        {
            // Development only
            // Database.SetInitializer(new DropCreateDatabaseIfModelChanges<TodoDb>());
            Database.SetInitializer(new MigrateDatabaseToLatestVersion<TodoDb, Configuration>());
        }

        public TodoDb() : base("TodoDB")
        {
        }

        public DbSet<TodoList> TodoLists { get; set; }

        public DbSet<TodoTask> TodoTasks { get; set; }


    }
}