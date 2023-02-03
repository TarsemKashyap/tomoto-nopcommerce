/*
** nopCommerce ajax cart implementation
*/


var AjaxCart = {
    loadWaiting: false,
    usepopupnotifications: false,
    topcartselector: '',
    topwishlistselector: '',
    flyoutcartselector: '',
    localized_data: false,

    init: function (usepopupnotifications, topcartselector, topwishlistselector, flyoutcartselector, localized_data) {
        this.loadWaiting = false;
        this.usepopupnotifications = usepopupnotifications;
        this.topcartselector = topcartselector;
        this.topwishlistselector = topwishlistselector;
        this.flyoutcartselector = flyoutcartselector;
        this.localized_data = localized_data;
    },

    setLoadWaiting: function (display) {
      displayAjaxLoading(display);
        this.loadWaiting = display;
    },

    //add a product to the cart/wishlist from the catalog pages
  addproducttocart_catalog: function (urladd) {
        if (this.loadWaiting !== false) {
            return;
        }
        this.setLoadWaiting(true);

        var postData = {};
        addAntiForgeryToken(postData);
        $.ajax({
            cache: false,
            url: urladd,
            type: "POST",
            data: postData,
            success: this.success_process,
            complete: this.resetLoadWaiting,
            error: this.ajaxFailure
        });
    },

    //add a product to the cart/wishlist from the product details page
  addproducttocart_details: function (urladd, formselector) {
    if (this.loadWaiting !== false) {
            return;
        }
        this.setLoadWaiting(true);

    $.ajax({
      cache: false,
      url: urladd,
      data: $(formselector).serialize(),
      type: "POST",
      success: this.success_process,
      complete: this.resetLoadWaiting,
      error: this.ajaxFailure
        });
    },

    // checkvendor

  checkvendor: function (urladd, formselector, productid, shoppingcarttype, requestfrom) {
    if (this.loadWaiting !== false) {
      return;
    }
    this.setLoadWaiting(true);
    var postData = null;
    if (formselector == null) {
      postData = {};
      addAntiForgeryToken(postData);
    }
    else {
      postData = $(formselector).serialize();
    }
    $.ajax({
      cache: false,
      url: 'shoppingcart/checkforvendor/' + productid + '/' + shoppingcarttype,
      data: postData,
      type: "POST",
      //success: function (jqXHR, textStatus) {
      //  console.log(jqXHR);
      //  if (jqXHR.success) {

      //    AjaxCart.setLoadWaiting(false);
      //    if (requestfrom == "AddToCart") {
      //      AjaxCart.addproducttocart_details(urladd, formselector);
      //      return false;
      //    }
      //    if (requestfrom == "ProductBox") {
      //      AjaxCart.addproducttocart_catalog(urladd); return false;
      //    }
      //  }
      //  else {
      //    var yesbtnId = 'Addproductbtn_' + productid;
      //    var nobtnId = 'closeModal_' + productid;

      //    var html = `<p >${jqXHR.message}</p>`
      //    var footerhtml = `<button type="button" id="${yesbtnId}" class="btn btn-primary">
      //            ${jqXHR.yesbtnText}
      //            </button>
      //            <button type="button" id="${nobtnId}" class="btn btn-primary">
      //              ${jqXHR.noBtnText}
      //            </button>`
      //    $(".modal-body").html(html);
      //    console.log(footerhtml);
      //    $(".modal-footer").html(footerhtml);
      //    $("#Novendorproduct-window").addClass("Show_popup");
      //    $(".master-wrapper-page").addClass("stack_position");






      //    $('#' + yesbtnId).click(function () {
      //      ClosePopup();
      //      if (requestfrom == "AddToCart") {
      //        AjaxCart.addproducttocart_details(urladd, formselector);
      //        return false;
      //      }
      //      if (requestfrom == "ProductBox") {
      //        AjaxCart.addproducttocart_catalog(urladd); return false;
      //      }
      //    })
      //    $('#' + nobtnId).click(function () {
      //      ClosePopup();
      //    })
      //    $("#CloseVendor").click(function () {
      //      ClosePopup();
      //    })
      //    function ClosePopup() {
      //      $("#Novendorproduct-window").removeClass("Show_popup");
      //      $(".master-wrapper-page").removeClass("stack_position");
      //    }




      //  }
      //},
      success: function (response) {
        response.urladd = urladd,
          response.formselector = formselector,
          response.requestfrom = requestfrom,
          AjaxCart.success_processCommon(response)
      },
        complete: this.resetLoadWaiting,
        error: this.ajaxFailure
      });

    
 
  },

  //add a product from catalog for vendor
  
  addVproducttocart_catalog: function (urladd, checkforvendor) {
    urladd = urladd + "?checkVendor="+checkforvendor;
    console.log(urladd);
    if (this.loadWaiting !== false) {
      return;
    }
    this.setLoadWaiting(true);
    var postData = {};
    addAntiForgeryToken(postData);
    $.ajax({
      cache: false,
      url: urladd,
      type: "POST",
      data: postData,
      success: function (response) { AjaxCart.success_processCommon(response) },
      complete: this.resetLoadWaiting,
      error: this.ajaxFailure
    });
  },




  success_processCommon: function (response) {
    if (response.updatetopcartsectionhtml) {
      $(AjaxCart.topcartselector).html(response.updatetopcartsectionhtml);
    }
    if (response.updatetopwishlistsectionhtml) {
      $(AjaxCart.topwishlistselector).html(response.updatetopwishlistsectionhtml);
    }
    if (response.updateflyoutcartsectionhtml) {
      $(AjaxCart.flyoutcartselector).replaceWith(response.updateflyoutcartsectionhtml);
    }
    if (response.message && response.isShowVendoralertPopup != true) {
      //display notification
      if (response.success === true) {
        //success
        if (AjaxCart.usepopupnotifications === true) {
          displayPopupNotification(response.message, 'success', true);
        }
        else {
          //specify timeout for success messages
          displayBarNotification(response.message, 'success', 3500);
        }
      }
      else {
        //error
        if (AjaxCart.usepopupnotifications === true) {
          displayPopupNotification(response.message, 'error', true);
        }
        else {
          //no timeout for errors
          displayBarNotification(response.message, 'error', 0);
        }
      }
      return false;
    }
    if (response.redirect) {
      location.href = response.redirect;
      return true;
    }

    if (response.success) {
      AjaxCart.setLoadWaiting(false);
      if (response.requestfrom == "AddToCart") {
        AjaxCart.addproducttocart_details(response.urladd, response.formselector);
        return false;
      }
      if (response.requestfrom == "ProductBox") {
        AjaxCart.addVproducttocart_catalog(response.urladd, false); return false;
      }
    }
    else if (response.message && response.isShowVendoralertPopup == true) {
      var yesbtnId = 'Addproductbtn_' + response.productid;
      var nobtnId = 'closeModal_' + response.productid;

      var html = `<p >${response.message}</p>`
      var footerhtml = `<button type="button" id="${yesbtnId}" class="btn btn-primary">
                    ${response.yesbtnText}
                    </button>
                    <button type="button" id="${nobtnId}" class="btn btn-primary">
                      ${response.noBtnText}
                    </button>`
      $(".modal-body").html(html);
      console.log(footerhtml);
      $(".modal-footer").html(footerhtml);
      $("#Novendorproduct-window").addClass("Show_popup");
      $(".master-wrapper-page").addClass("stack_position");



      $('#' + yesbtnId).click(function () {
        ClosePopup();
        if (response.requestfrom == "AddToCart") {
          AjaxCart.addproducttocart_details(response.urladd, response.formselector);
          return false;
        }
        if (response.requestfrom == "ProductBox") {
          AjaxCart.addVproducttocart_catalog(response.urladd, false); return false;
        }
      })
      $('#' + nobtnId).click(function () {
        ClosePopup();
      })
      $("#CloseVendor").click(function () {
        ClosePopup();
      })
      function ClosePopup() {
        $("#Novendorproduct-window").removeClass("Show_popup");
        $(".master-wrapper-page").removeClass("stack_position");
      }
    }

     
    return false;
  },

    //add a product to compare list
    addproducttocomparelist: function (urladd) {
        if (this.loadWaiting !== false) {
            return;
        }
        this.setLoadWaiting(true);

        var postData = {};
        addAntiForgeryToken(postData);

        $.ajax({
            cache: false,
            url: urladd,
            type: "POST",
            data: postData,
            success: this.success_process,
            complete: this.resetLoadWaiting,
            error: this.ajaxFailure
        });
    },

  success_process: function (response) {

        if (response.updatetopcartsectionhtml) {
            $(AjaxCart.topcartselector).html(response.updatetopcartsectionhtml);
        }
        if (response.updatetopwishlistsectionhtml) {
            $(AjaxCart.topwishlistselector).html(response.updatetopwishlistsectionhtml);
        }
        if (response.updateflyoutcartsectionhtml) {
            $(AjaxCart.flyoutcartselector).replaceWith(response.updateflyoutcartsectionhtml);
        }
        if (response.message) {
            //display notification
            if (response.success === true) {
                //success
                if (AjaxCart.usepopupnotifications === true) {
                    displayPopupNotification(response.message, 'success', true);
                }
                else {
                    //specify timeout for success messages
                    displayBarNotification(response.message, 'success', 3500);
                }
            }
            else {
                //error
                if (AjaxCart.usepopupnotifications === true) {
                    displayPopupNotification(response.message, 'error', true);
                }
                else {
                    //no timeout for errors
                    displayBarNotification(response.message, 'error', 0);
                }
            }
            return false;
        }
        if (response.redirect) {
            location.href = response.redirect;
            return true;
      }
        return false;
    },

    resetLoadWaiting: function () {
        AjaxCart.setLoadWaiting(false);
    },

    ajaxFailure: function () {
        alert(this.localized_data.AjaxCartFailure);
  },
};