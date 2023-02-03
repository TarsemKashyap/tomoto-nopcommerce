using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Nop.Core.Domain.Common;
using Nop.Core.Domain.Localization;
using Nop.Core.Domain.Seo;

namespace Nop.Core.Domain.Vendors
{
    public partial class GeoLocation: BaseEntity
    {
        public int VendorId { get; set; }
        public decimal Lat { get; set; }
        public decimal Lng { get; set; }
        public string State { get; set; }
        public string City { get; set; }
        //public string CityName { get; set; }
        //public string Pincode { get; set; }
    }
}
