namespace Nop.Core.Domain.Orders
{
    public class DeliveryManOrderMapping:BaseEntity
    {
        public int DeliveryManId { get; set; }
        public int OrderId { get; set; }
        public bool OrderStatus { get; set; }
    }
}
