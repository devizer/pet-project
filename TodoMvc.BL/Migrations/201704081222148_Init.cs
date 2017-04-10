namespace TodoMvc.BL.Migrations
{
    using System;
    using System.Data.Entity.Migrations;

    public partial class Init : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.TodoList",
                c => new
                {
                    Id = c.Long(nullable: false, identity: true),
                    Title = c.String(maxLength: 2147483647),
                })
                .PrimaryKey(t => t.Id);

            CreateTable(
                "dbo.TodoTask",
                c => new
                {
                    Id = c.Long(nullable: false, identity: true),
                    Title = c.String(nullable: false, maxLength: 2147483647),
                    Completed = c.Boolean(nullable: false),
                    IdList = c.Long(nullable: false),
                })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.TodoList", t => t.IdList, cascadeDelete: true)
                .Index(t => t.IdList);

        }

        public override void Down()
        {
            DropForeignKey("dbo.TodoTask", "IdList", "dbo.TodoList");
            DropIndex("dbo.TodoTask", new[] { "IdList" });
            DropTable("dbo.TodoTask");
            DropTable("dbo.TodoList");
        }
    }
}
