using Microsoft.VisualStudio.TestTools.UnitTesting;
using Moq;
using Newsletter.DAL.Infrastructure;
using Newsletter.DAL.Repositories;
using Newsletter.Models.DTO;
using Newsletter.Service;
using System.Collections.Generic;

namespace Newsletter.Tests.RepositoryTest
{
    class SubscribersRepoTest
    {
        Mock<ISubscribersRepository> subscriberRepository;
        ISubscribersService subscriberService;
        Mock<IUnitOfWork> unitOfWork;
        List<SubscriberEntity> lstSubscribers;
        Mock<ISourceTypeRepository> sourceRepository;
        List<SourceTypeEntitiy> lstSources;

        [TestInitialize]
        public void Initialize()
        {
            subscriberRepository = new Mock<ISubscribersRepository>();
            sourceRepository = new Mock<ISourceTypeRepository>();
            unitOfWork = new Mock<IUnitOfWork>();
            subscriberService = new SubscribersService(subscriberRepository.Object, sourceRepository.Object, unitOfWork.Object);


            lstSubscribers = new List<SubscriberEntity>() {
             new SubscriberEntity() { Id = 1, SourceID=1, Reason = "Abc",  Email="m.haroonyousuf@gmail.com" },
             new SubscriberEntity() { Id = 2, SourceID=2, Reason = "Hello",  Email="abc123@gmail.com" },
             new SubscriberEntity() { Id = 3, SourceID=3, Reason = "Hi",  Email="xyz123@hotmail.com" },
             new SubscriberEntity() { Id = 4, SourceID=3, Reason = "Test",  Email="UI123@hotmail.com" },
             new SubscriberEntity() { Id = 5, SourceID=3, Reason = "UI",  Email="bb123@gmail.com" },
            };


        }

        [TestMethod]
        public void Subscriber_Get_All()
        {
            //Arrange
            sourceRepository.Setup(x => x.GetAll()).Returns(lstSources);
            subscriberRepository.Setup(x => x.GetAll()).Returns(lstSubscribers);

            //Act
            List<SubscriberEntity> results = subscriberService.GetSubscribers() as List<SubscriberEntity>;

            //Assert
            Assert.IsNotNull(results);
            Assert.AreEqual(3, results.Count);
        }

        [TestMethod]
        public void CheckIfEmailExists()
        {
            //Arrange
            subscriberRepository.Setup(x => x.GetAll()).Returns(lstSubscribers);

            //Act
            bool result = subscriberService.CheckIfEmailExists("abc123@outlook.com");

            //Assert
            Assert.AreEqual(false, result);

        }
    }
}
