
using System.Collections.Generic;
using Nop.Web.Framework.Models;
using Nop.Web.Models.Media;
namespace Nop.Web.Models.Catalog
{
    public partial record class LatLangModel: BaseNopModel
    {
     
        public decimal lat { get; set; }
        public decimal lng { get; set; }
        public int vendorId { get; set; }
    }
}
