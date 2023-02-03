using System.Collections.Generic;
using System.Threading.Tasks;
using Nop.Core.Domain.Orders;

namespace Nop.Services.Orders
{
    /// <summary>
    /// Product attribute service interface
    /// </summary>
    public partial interface IDeliveryManOrderService
    {
        Task<IList<DeliveryManOrderMapping>> GetDeliveryManOrderMappingsAsync();
        Task<DeliveryManOrderMapping> GetActiveMappingsByOrderIdAsync(int orderId);
        Task InsertDeliveryManOrderMappingsAsync(DeliveryManOrderMapping deliveryManOrderMapping);
    }
}
