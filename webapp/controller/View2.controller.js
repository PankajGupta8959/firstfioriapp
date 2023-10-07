sap.ui.define(
  [
    "emc/fin/ar/controller/BaseController",
    "emc/fin/ar/util/formatter",
    "sap/ui/core/Fragment",
    "sap/m/DisplayListItem",
    "sap/m/MessageBox",
    "sap/m/MessageToast",
  ],
  function (
    BaseController,
    Formatter,
    Fragment,
    DisplayListItem,
    MessageBox,
    MessageToast
  ) {
    "use strict";
    return BaseController.extend("emc.fin.ar.controller.View2", {
      formatter: Formatter,
      /**
       * @override
       */
      onInit: function() {
       this.oRouter = this.getOwnerComponent().getRouter();
       this.oRouter.getRoute('details').attachMatched(this.hercules , this);
      
      },
      hercules : function(oEvent) {
        console.log(oEvent);
        var params = oEvent.getParameter("arguments");
        var sPath = '/' + params.pid;
        this.getView().bindElement(sPath,{
          expand : "To_Supplier"
        });
      },
      onBack: function () {
        this.getView().getParent().to("idView1");
      },
      onMsgConfirm: function (status) {
        if (status === "OK") {
          MessageToast.show("The order is Placed Successfully");
        } else {
          MessageBox.warning("You Have Cancelled the order!!!!");
        }
      },
      onApprove: function () {
        MessageBox.confirm("Are you sure to Place a order", {
          onClose: this.onMsgConfirm.bind(this),
        });
      },

      onReject: function () {
        MessageBox.error("Order is Rejected");
      },
      supplierPopup: null,

      onFilter: function () {
        // alert("This is under Process");
        var that = this;
        if (!this.supplierPopup) {
          Fragment.load({
            id: "supplier",
            name: "emc.fin.ar.fragments.popup",
            controller: this,
          })
            // This is promise async
            .then(function (oFragment) {
              that.supplierPopup = oFragment;
              that.supplierPopup.setTitle("Suppliers");
              that.getView().addDependent(that.supplierPopup);
              that.supplierPopup.bindAggregation("items", {
                path: "/suppliers",
                template: new DisplayListItem({
                  label: "{name}",
                  value: "{sinceWhen}",
                }),
              });
              that.supplierPopup.open();
            });
        } else {
          this.supplierPopup.open();
        }
      },

      cityPopup: null,
      oCityField: null,
      onPopupConfirm: function (oEvent) {
        // Get the value which user select
        var oValueSelector = oEvent.getParameter("selectedItem");
        // get the name of that value
        var sLabel = oValueSelector.getLabel();
        if (oEvent.getSource().getId().indexOf("city") != -1) {
          // Now setting the value to the selected value
          this.oCityField.setValue(sLabel);
        } else {
        }
      },

      onF4Help: function (oEvent) {
        // alert("This is under Process");
        var that = this;
        this.oCityField = oEvent.getSource();
        if (!this.cityPopup) {
          Fragment.load({
            id: "city",
            name: "emc.fin.ar.fragments.popup",
            controller: this,
          }).then(function (oFragment) {
            that.cityPopup = oFragment;
            that.cityPopup.setTitle("Cities");
            that.getView().addDependent(that.cityPopup);
            that.cityPopup.setMultiSelect(false);
            that.cityPopup.bindAggregation("items", {
              path: "/cities",
              template: new DisplayListItem({
                label: "{name}",
                value: "{famousFor}",
              }),
            });
            that.cityPopup.open();
          });
        } else {
          this.cityPopup.open();
        }
      },
    });
  }
);
