using System.Collections.Generic;
using Nop.Web.Framework.Models;
using Nop.Web.Models.Media;

namespace Nop.Web.Models.Catalog
{
    public partial record GeoLocationCheck : BaseNopEntityModel
    {

        public string Latitude { get; set; }
        public string Longitude { get; set; }

    }
}