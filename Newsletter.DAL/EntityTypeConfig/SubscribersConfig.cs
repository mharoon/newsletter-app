using Newsletter.Models.DTO;
using System.Data.Entity.ModelConfiguration;

namespace Newsletter.DAL
{
    class SubscribersConfig: EntityTypeConfiguration<SubscriberEntity>
    {
        public SubscribersConfig()
        {
            ToTable("Subscriber");
            Property(x => x.Id).IsRequired();
            Property(x => x.Email).IsRequired().HasMaxLength(50);
            Property(x => x.Reason).IsOptional();
            Property(x => x.CreationDate).IsRequired();
            Property(x => x.IsActive).IsRequired();

        }

    }
}
