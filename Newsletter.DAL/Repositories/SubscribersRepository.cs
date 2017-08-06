using Newsletter.DAL.Infrastructure;
using Newsletter.Models.DTO;
using System.Linq;

namespace Newsletter.DAL.Repositories
{
    public class SubscribersRepository : RepositoryBase<SubscriberEntity>, ISubscribersRepository
    {
        public SubscribersRepository(IDbFactory dbFactory) : base(dbFactory)
        {
        }

        public bool CheckIfEmailExists(string Email)
        {
            var subscriberExists = DbContext.Subsribers.Where(x => x.Email.Equals(Email)).FirstOrDefault();

            return !(subscriberExists == null);
        }
    }
}

public interface ISubscribersRepository : IRepository<SubscriberEntity>
{
    bool CheckIfEmailExists(string Email);
}
