using Newsletter.Models.DTO;
using System.Data.Entity.ModelConfiguration;

namespace Newsletter.DAL
{
    class SourceTypeConfig : EntityTypeConfiguration<SourceTypeEntitiy>
    {
        public SourceTypeConfig()
        {
            ToTable("SourceType");
            Property(x => x.Name).HasMaxLength(100).IsRequired();
        }
    }
}
