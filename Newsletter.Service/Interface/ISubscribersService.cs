using Newsletter.Models.DTO;
using System.Collections.Generic;

namespace Newsletter.Service
{
    public interface ISubscribersService
    {
        IEnumerable<SubscriberEntity> GetSubscribers();
        IEnumerable<SourceTypeEntitiy> GetSourceTypes();
        void CreateSubscriber(SubscriberEntity sub);
        void SaveSubscriber();
        bool CheckIfEmailExists(string email);
    }
}
