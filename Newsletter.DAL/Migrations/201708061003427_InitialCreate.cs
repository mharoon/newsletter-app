namespace Newsletter.DAL.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class InitialCreate : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.SourceType",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Name = c.String(nullable: false, maxLength: 100),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "dbo.Subscriber",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        SourceID = c.Int(nullable: false),
                        Email = c.String(nullable: false, maxLength: 50),
                        Reason = c.String(),
                        CreationDate = c.DateTime(nullable: false),
                        IsActive = c.Boolean(nullable: false),
                        SourceType_Id = c.Int(),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.SourceType", t => t.SourceType_Id)
                .Index(t => t.SourceType_Id);
            
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.Subscriber", "SourceType_Id", "dbo.SourceType");
            DropIndex("dbo.Subscriber", new[] { "SourceType_Id" });
            DropTable("dbo.Subscriber");
            DropTable("dbo.SourceType");
        }
    }
}
