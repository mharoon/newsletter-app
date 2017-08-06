using System.Collections.Generic;
using Newsletter.Models.DTO;
using Newsletter.DAL.Infrastructure;
using Newsletter.DAL.Repositories;

namespace Newsletter.Service
{
    public class SubscribersService : ISubscribersService
    {
        private readonly ISubscribersRepository subscribersRepository;
        private readonly ISourceTypeRepository SourceTypeRepository;
        private readonly IUnitOfWork unitOfWork;

        public SubscribersService(ISubscribersRepository subscribersRepository, ISourceTypeRepository SourceRepository, IUnitOfWork unitOfWork)
        {
            this.subscribersRepository = subscribersRepository;
            this.SourceTypeRepository = SourceRepository;
            this.unitOfWork = unitOfWork;
        }

        public bool CheckIfEmailExists(string email)
        {
            return subscribersRepository.CheckIfEmailExists(email);
        }

        public void CreateSubscriber(SubscriberEntity sub)
        {
            subscribersRepository.Add(sub);
        }

        public IEnumerable<SourceTypeEntitiy> GetSourceTypes()
        {
            var sourceTypes = SourceTypeRepository.GetAll();
            return sourceTypes;
        }

        public IEnumerable<SubscriberEntity> GetSubscribers()
        {
            var subscribers = subscribersRepository.GetAll();
            return subscribers;
        }

        public void SaveSubscriber()
        {
            unitOfWork.Commit();
        }
    }
}
