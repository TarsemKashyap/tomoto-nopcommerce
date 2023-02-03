using FluentMigrator.Builders.Create.Table;
using Nop.Core.Domain.Customers;
using Nop.Core.Domain.Orders;
using Nop.Data.Extensions;

namespace Nop.Data.Mapping.Builders.Orders
{
    public partial class DeliveryManOrderMappingBuilder : NopEntityBuilder<DeliveryManOrderMapping>
    {
        #region Methods

        /// <summary>
        /// Apply entity configuration
        /// </summary>
        /// <param name="table">Create table expression builder</param>
        public override void MapEntity(CreateTableExpressionBuilder table)
        {
            table
                .WithColumn(nameof(DeliveryManOrderMapping.DeliveryManId)).AsInt32().Nullable().ForeignKey<Customer>(onDelete:System.Data.Rule.None)
                .WithColumn(nameof(DeliveryManOrderMapping.OrderId)).AsInt32().ForeignKey<Order>(onDelete:System.Data.Rule.None);
        }

        #endregion
    }
}
