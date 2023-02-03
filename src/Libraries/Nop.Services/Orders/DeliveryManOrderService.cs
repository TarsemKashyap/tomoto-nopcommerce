using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Nop.Core;
using Nop.Core.Caching;
using Nop.Core.Domain.Orders;
using Nop.Data;

namespace Nop.Services.Orders
{
    /// <summary>
    /// Product attribute service
    /// </summary>
    public partial class DeliveryManOrderService : IDeliveryManOrderService
    {
        #region Fields
        private readonly IRepository<DeliveryManOrderMapping> _deliveryManOrderMappingRepository;


        #endregion

        #region Ctor

        public DeliveryManOrderService(IRepository<DeliveryManOrderMapping> deliveryManOrderMappingRepository)
        {
            _deliveryManOrderMappingRepository = deliveryManOrderMappingRepository;
        }

        #endregion

        #region Methods

        public async Task<IList<DeliveryManOrderMapping>> GetDeliveryManOrderMappingsAsync()
        {
            return new List<DeliveryManOrderMapping>();
        }

        public async Task<DeliveryManOrderMapping> GetActiveMappingsByOrderIdAsync(int orderId)
        {
            var ss = _deliveryManOrderMappingRepository.Table;
            var mapping = await ss.FirstOrDefaultAsync(x => x.OrderId == orderId && x.OrderStatus == true);
            return mapping;
        }

        public async Task InsertDeliveryManOrderMappingsAsync(DeliveryManOrderMapping deliveryManOrderMapping)
        {
            await _deliveryManOrderMappingRepository.InsertAsync(deliveryManOrderMapping);
        }
        #endregion
    }
}