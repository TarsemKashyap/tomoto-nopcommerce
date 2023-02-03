//using FluentMigrator.Builders.Create.Table;
//using Nop.Core.Domain.Vendors;

//namespace Nop.Data.Mapping.Builders
//{
//    /// <summary>
//    /// Represents a store entity builder
//    /// </summary>
//    public partial class GeoLocationBuilder : NopEntityBuilder<Nop.Core.Domain.Vendors.GeoLocation>
//    {
//        #region Methods

//        /// <summary>
//        /// Apply entity configuration
//        /// </summary>
//        /// <param name="table">Create table expression builder</param>
//        public override void MapEntity(CreateTableExpressionBuilder table)
//        {
//            table
//                .WithColumn(nameof(Nop.Core.Domain.Vendors.GeoLocation.CityName)).AsString(400).Nullable()
//              .WithColumn(nameof(Nop.Core.Domain.Vendors.GeoLocation.Pincode)).AsString(400).Nullable();
              
//        }

//        #endregion
//    }
//}