
using Nop.Web.Framework.Models;
using System.Collections.Generic;

namespace Nop.Web.Areas.Admin.Models.Vendors

{
    public partial record GeoLocationModel : BaseNopEntityModel
    {
        public GeoLocationModel()
        {
            VendorModel = new VendorModel();    
        }
        //public GeoLocationModel()
        //{
        //    latLng = new List<LongLat>();
        //}
        public string state { get; set; }
        public string city { get; set; }
        public decimal lat { get; set; }
        public decimal lng { get; set; }

        //public string CityName { get; set; }
        //public string Pincode { get; set; }
        public bool IsLoggedInAsVendor { get; set; }
        public VendorModel VendorModel { get; set; }
        
    }

   
}
