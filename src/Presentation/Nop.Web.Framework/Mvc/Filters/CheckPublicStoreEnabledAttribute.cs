using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using Nop.Core;
using Nop.Services.Customers;
// Bhanu Chauhan's Addition
namespace Nop.Web.Framework.Mvc.Filters
{
    public sealed class CheckPublicStoreEnabledAttribute : TypeFilterAttribute
    {
        #region Ctor

        /// <summary>
        /// Create instance of the filter attribute
        /// </summary>
        /// <param name="ignore">Whether to ignore the execution of filter actions</param>
        public CheckPublicStoreEnabledAttribute(bool ignore = false) : base(typeof(CheckPublicStoreEnabledFilter))
        {
            IgnoreFilter = ignore;
            Arguments = new object[] { ignore };
        }

        #endregion

        #region Properties

        /// <summary>
        /// Gets a value indicating whether to ignore the execution of filter actions
        /// </summary>
        public bool IgnoreFilter { get; }

        #endregion

        #region Nested filter

        /// <summary>
        /// Represents a filter that confirms access to public store
        /// </summary>
        private class CheckPublicStoreEnabledFilter : IAsyncAuthorizationFilter
        {
            #region Fields

            private readonly bool _ignoreFilter;
            private readonly ICustomerService _customerService;
            private readonly IWorkContext _workContext;

            #endregion

            #region Ctor

            public CheckPublicStoreEnabledFilter(bool ignoreFilter, IWorkContext workContext, ICustomerService customerService)
            {
                _ignoreFilter = ignoreFilter;
                _customerService = customerService;
                _workContext = workContext;
            }
            #endregion
            #region Methods

            /// <summary>
            /// Called early in the filter pipeline to confirm request is authorized
            /// </summary>
            /// <param name="context">Authorization filter context</param>
            /// <returns>A task that represents the asynchronous operation</returns>
            public async Task OnAuthorizationAsync(AuthorizationFilterContext context)
            {
                //whether current customer is Delivery Man
                //var customer = await _workContext.GetCurrentCustomerAsync();
                //if (await _customerService.IsDeliveryManAsync(customer))
                //{
                //    var actionName = context.HttpContext.Request.RouteValues["action"].ToString().ToLower();
                //    if (actionName != "login" && actionName != "logout")
                //    {
                //        context.Result = new RedirectToActionResult("Index", "Home", new { Area = AreaNames.Admin });
                //        return;
                //    }
                //}
                await Task.CompletedTask;
            }

            #endregion
        }

        #endregion
    }


}
