using System.Data.Entity;
using Newsletter.Models.DTO;
using System.Data.Entity.ModelConfiguration.Conventions;
using System.Data.Common;

namespace Newsletter.DAL
{
    public class NewsletterContext : DbContext
    {

        public DbSet<SourceTypeEntitiy> SourceType { get; set; }
        public DbSet<SubscriberEntity> Subsribers { get; set; }

        public virtual void Commit()
        {
            base.SaveChanges();
        }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.Conventions.Remove<PluralizingTableNameConvention>();

            modelBuilder.Configurations.Add(new SourceTypeConfig());
            modelBuilder.Configurations.Add(new SubscribersConfig());
        }

        public NewsletterContext()
            : base("NewsletterConnection")
        {

        }

        public NewsletterContext(string nameOrConnectionString)
            : base(nameOrConnectionString)
        {

        }

        //constructor for unit test
        public NewsletterContext(DbConnection connection)
            : base(connection, true)
        {

        }
    }
}
