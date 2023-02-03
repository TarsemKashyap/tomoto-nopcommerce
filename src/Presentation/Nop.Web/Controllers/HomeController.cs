using System.Collections.Generic;
using System.Linq;
using DocumentFormat.OpenXml.Bibliography;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Nop.Core.Http.Extensions;
using Nop.Web.Extensions;
using Nop.Web.Models.Catalog;

namespace Nop.Web.Controllers
{
    public partial class HomeController : BasePublicController
    {
        public virtual IActionResult Index()
        {
            return View();
        }
        [HttpPost]
        public virtual IActionResult JsonObject(List<LatLangModel> newData)
        {
            List<int> data = newData.Select(x => x.vendorId).ToList();

            //HttpContext.Session.Set<List<LatLangModel>>("latlngModel", newData);
            HttpContext.Session.SetComplexData("latlngModel", newData);


            return Json(new {succes=true});
        }


        [HttpPost]
        public virtual IActionResult SaveDeliveryLocation(string lat,string lng)
        {
            //List<int> data = newData.Select(x => x.vendorId).ToList();

            ////HttpContext.Session.Set<List<LatLangModel>>("latlngModel", newData);
            //HttpContext.Session.SetComplexData("latlngModel", newData);
            HttpContext.Session.SetString("DeliveryLat", lat);
            HttpContext.Session.SetString("DeliveryLng", lng);


            return Json(new { succes = true });
        }
    }
}