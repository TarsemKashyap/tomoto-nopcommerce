using System;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Primitives;
using Nop.Core.Domain.Catalog;
using Nop.Core.Domain.Common;
using Nop.Core.Domain.Vendors;
using Nop.Services.Common;
using Nop.Services.Customers;
using Nop.Services.Localization;
using Nop.Services.Logging;
using Nop.Services.Media;
using Nop.Services.Messages;
using Nop.Services.Security;
using Nop.Services.Seo;
using Nop.Services.Vendors;
using Nop.Services.Catalog;
using Nop.Web.Areas.Admin.Factories;
using Nop.Web.Areas.Admin.Infrastructure.Mapper.Extensions;
using Nop.Web.Areas.Admin.Models.Vendors;
using Nop.Web.Framework.Controllers;
using Nop.Web.Framework.Mvc;
using Nop.Web.Framework.Mvc.Filters;
using Nop.Core;
using System.Collections.Generic;

namespace Nop.Web.Areas.Admin.Controllers
{
    public class GeoLocation : BaseAdminController
    {
        private readonly IVendorModelFactory _vendorModelFactory;
        private readonly IVendorService _vendorService;
        private readonly IPermissionService _permessionService;
        private readonly IProductService _productService;
        private readonly IWorkContext _workContext;
        public GeoLocation(IVendorService vendorService, IPermissionService permessionService, IProductService productService, IWorkContext workContext)
        {
            this._vendorService = vendorService;
            this._permessionService = permessionService;
            _productService = productService;
            _workContext = workContext;

        }
        public async Task<IActionResult> Index()
        {
            if (!await _permessionService.AuthorizeAsync(StandardPermissionProvider.ManageProducts))
                return AccessDeniedView();
            GeoLocationModel geoLocationModel = new GeoLocationModel();
            geoLocationModel.IsLoggedInAsVendor = await _workContext.GetCurrentVendorAsync() != null;


            return View(geoLocationModel);
        }

        [HttpPost]
        public virtual async Task<IActionResult> AddLocation(List<GeoLocationModel> latLngArray)
        {

            if (!await _permessionService.AuthorizeAsync(StandardPermissionProvider.ManageProducts))
                return AccessDeniedView();

            var vendor = await _workContext.GetCurrentVendorAsync();

            if (latLngArray.Count() > 0)
            {

                foreach (var item in latLngArray)
                {

                    await _vendorService.InsertGeoLocationAsync(new Core.Domain.Vendors.GeoLocation
                    {

                        Lat = item.lat,
                        Lng = item.lng,
                        VendorId = vendor.Id,
                        City = item.city,
                        State = item.state

                    });
                    ;
                }



                return Json(new { success = true });
            }
            else
            {
                return Json(new { success = false });

            }






        }
        //[HttpGet]
        //public virtual async Task<IActionResult> List()
        //{
        //    if (!await _permessionService.AuthorizeAsync(StandardPermissionProvider.ManageProducts))
        //        return AccessDeniedView();

        //    GeoLocationModel geoLocation = new GeoLocationModel();
        //    geoLocation.IsLoggedInAsVendor = await _workContext.GetCurrentVendorAsync() != null;
        //    var vendor = await _workContext.GetCurrentVendorAsync();



        //    var locations = await _productService.CheckGeoLocationService(vendor.Id);

        //    var model = new List<GeoLocationModel>();

        //    foreach (var item in locations)
        //    {
        //        var geoLocationModel = new GeoLocationModel();
        //        geoLocationModel.Id = item.Id;
        //        geoLocationModel.lat = item.Lat;
        //        geoLocationModel.lng = item.Lng;
        //        geoLocationModel.state = item.State;
        //        geoLocationModel.city = item.City;

        //        model.Add(geoLocationModel);

        //    }

        //    return View(model);
        //}

        //[HttpPost]
        //public virtual async Task<IActionResult> Remove(int id)
        //{
        //    var obj = await _vendorService.GetLocationById(id);
        //    await _vendorService.RemoveLocation(obj);
        //    return RedirectToAction("List");


        //}
    }
}
