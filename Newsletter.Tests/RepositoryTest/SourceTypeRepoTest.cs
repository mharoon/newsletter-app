using Microsoft.VisualStudio.TestTools.UnitTesting;
using Moq;
using Newsletter.DAL.Infrastructure;
using Newsletter.DAL.Repositories;
using Newsletter.Models.DTO;
using Newsletter.Service;
using System.Collections.Generic;


namespace Newsletter.Tests.RepositoryTest
{
    class SourceTypeRepoTest
    {
        Mock<ISourceTypeRepository> sourceTypeRepository;
        ISourceTypeService sourceTypeService;
        Mock<IUnitOfWork> unitOfWork;
        List<SourceTypeEntitiy> lstSources;

        [TestInitialize]
        public void Initialize()
        {
            sourceTypeRepository = new Mock<ISourceTypeRepository>();
            unitOfWork = new Mock<IUnitOfWork>();
            sourceTypeService = new SourceTypeService(sourceTypeRepository.Object, unitOfWork.Object);
            lstSources = new List<SourceTypeEntitiy>() {
             new SourceTypeEntitiy() { Id = 1, Name = "Advert" },
             new SourceTypeEntitiy() { Id = 2, Name = "Word Of Mouth" },
             new SourceTypeEntitiy() { Id = 3, Name = "Others" }
            };


        }

        [TestMethod]
        public void SourceType_Get_All()
        {
            //Arrange
            sourceTypeRepository.Setup(x => x.GetAll()).Returns(lstSources);

            //Act
            List<SourceTypeEntitiy> results = sourceTypeService.GetSourceTypes() as List<SourceTypeEntitiy>;

            //Assert
            Assert.IsNotNull(results);
            Assert.AreEqual(3, results.Count);
        }

    }
}
