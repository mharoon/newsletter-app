using Newsletter.Models.DTO;
using Newsletter.Models.Util;
using Newsletter.Service;
using Newsletter.WebAngular.Resx;
using Newsletter.WebAngular.Util;
using System;
using System.Web.Mvc;

namespace Newsletter.WebAngular.Controllers
{
    public class SubscriptionController : Controller
    {
        private readonly ISubscribersService subscribersService;
        private readonly ISourceTypeService sourceTypeService;

        public SubscriptionController(ISubscribersService subscribersService, ISourceTypeService sourceTypeService)
        {
            this.subscribersService = subscribersService;
            this.sourceTypeService = sourceTypeService;
        }

        public ActionResult Index()
        {
            return View();
        }

        public JsonResult Subscribe(SubscriberEntity user) {

            DataTransferObject transferObj = new DataTransferObject();
            try
            {
                if (!subscribersService.CheckIfEmailExists(user.Email))
                {
                    user.IsActive = true;
                    user.CreationDate = DateTime.UtcNow;
                    subscribersService.CreateSubscriber(user);
                    subscribersService.SaveSubscriber();

                    transferObj.StatusCode = ServiceConstants.Success;
                    return Json(transferObj);
                }
                else {

                    transferObj.StatusCode = ServiceConstants.DuplicateEmail;
                    transferObj.StatusMessage = AppResources.Email_Exist;
                    return Json(transferObj);
                }
            }
            catch (Exception ex) {
                Logging.LogException(ex);
            }

            transferObj.StatusCode = ServiceConstants.Error;
            transferObj.StatusMessage = AppResources.Server_Error;
            return Json(transferObj);
        }

        public JsonResult GetSourceTypes()
        {
            var sources = sourceTypeService.GetSourceTypes();

            return Json(sources);
        }

        public JsonResult CheckEmailExists(string Email)
        {
            if (Email == null)
            {
                return Json(false);
            }

            try
            {
                return Json(subscribersService.CheckIfEmailExists(Email));
            }
            catch (Exception ex)
            {
                Logging.LogException(ex);
            }

            return Json(false);
        }



    }
}