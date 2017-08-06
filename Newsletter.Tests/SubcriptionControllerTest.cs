using System.Web.Mvc;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Newsletter.Service;
using Moq;
using Newsletter.Models.DTO;
using Newsletter.WebAngular.Controllers;
using Newsletter.Models.Util;

namespace Newsletter.Tests
{
    [TestClass]
    public class SubscriptionControllerTests
    {
        SubscriptionController ControllerUnderTest;
        private Mock<ISubscribersService> SubscribersService;
        private Mock<ISourceTypeService> SourceTypeService;

        [TestInitialize]
        public void Setup()
        {
            SubscribersService = new Mock<ISubscribersService>();
            SourceTypeService = new Mock<ISourceTypeService>();
            ControllerUnderTest = new SubscriptionController(SubscribersService.Object, SourceTypeService.Object);

        }

        [TestMethod]
        public void IndexShouldReturnAView()
        {
            var actionResult = ControllerUnderTest.Index();

            var result = actionResult as ActionResult;

            Assert.IsInstanceOfType(result,typeof(ActionResult));
        }

        [TestMethod]
        public void GiveASuccessJsonResultWhenSubscribeCalled()
        {
            SubscriberEntity subscriber = new SubscriberEntity();
            subscriber.Email = "test@test.com";

            var jsonResult = ControllerUnderTest.Subscribe(subscriber);

            var dto = jsonResult.Data as DataTransferObject;

            Assert.AreEqual(ServiceConstants.Success,dto.StatusCode);
        }

    }
}
