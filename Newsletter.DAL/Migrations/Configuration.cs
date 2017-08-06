namespace Newsletter.DAL.Migrations
{
    using Models.DTO;
    using System;
    using System.Collections.Generic;
    using System.Data.Entity;
    using System.Data.Entity.Migrations;


    internal sealed class Configuration : DbMigrationsConfiguration<Newsletter.DAL.NewsletterContext>
    {
        public Configuration()
        {
            AutomaticMigrationsEnabled = false;
        }

        protected override void Seed(Newsletter.DAL.NewsletterContext context)
        {
            context.SourceType.AddRange(new List<SourceTypeEntitiy>
            {
                 new SourceTypeEntitiy {
                    Id = 1,
                    Name = "Advert"

                },
                new SourceTypeEntitiy {
                    Id = 2,
                    Name = "Word Of Mouth"
                },
                new SourceTypeEntitiy {
                    Id = 3,
                    Name = "Other"
                }
            });

            context.Commit();
        }
    }
}
