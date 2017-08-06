using Newsletter.DAL.Infrastructure;
using Newsletter.Models.DTO;

namespace Newsletter.DAL.Repositories
{
    public class SourceTypeRepository: RepositoryBase<SourceTypeEntitiy>, ISourceTypeRepository
    {
        public SourceTypeRepository(IDbFactory dbFactory) : base(dbFactory)
        {
        }
    }

    public interface ISourceTypeRepository : IRepository<SourceTypeEntitiy>
    {

    }
}
