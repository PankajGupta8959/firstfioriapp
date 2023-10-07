sap.ui.define([
    'emc/fin/ar/controller/BaseController',
    'sap/ui/model/Filter',
    'sap/ui/model/FilterOperator'
], function(BaseController, Filter, FilterOperator) {
    'use strict';
    return BaseController.extend("emc.fin.ar.controller.View1",{
        onInit : function() {
            this.oRouter = this.getOwnerComponent().getRouter();
        },
        onNext: function(sPath){
            this.oRouter.navTo("details",{
                pid : sPath.replace( "/" , "" )
            }); 
            //Step 1: Get the current view object
            // var oView = this.getView();

            // //Step 2: Get the mother object (parent)
            // var oAppCon = oView.getParent();

            // //Step 3: Let the parent navigate to second view
            // oAppCon.to("idView2");

        },
      
        onSearch : function(oEvent){
            var oValue = oEvent.getParameter("query");
            if (oValue === undefined) {
                var oValue = oEvent.getParameter("newValue");
            }
            var oFilter1 = new Filter("name", FilterOperator.Contains, oValue);
            var oFilter2 = new Filter("type", FilterOperator.Contains, oValue);
            var oFilter = new Filter({
                filters : [oFilter1, oFilter2],
                and : false
            })
            var oBindingItems = this.getView().byId('idList').getBinding("items");
            oBindingItems.filter([oFilter]);

        },

		onItemDelete: function(oEvent) {
			var oListToDelete = oEvent.getParameter("listItem");
            var oList = oEvent.getSource();
            oList.removeItem(oListToDelete);
		},

		onSelChange: function(oEvent) {

            var oSelectItem = oEvent.getParameter("listItem");
            var sPath = oSelectItem.getBindingContextPath();
            // var oView2 = this.getView().getParent().getPages()[1];
            // Split screen code
            // var oView2 = this.getView().getParent().getParent().getDetailPages()[0];

            // oView2.bindElement(sPath, {
            //     expand: 'To_Supplier',
            // });

			this.onNext(sPath);
		},

		onAdd: function(oEvent) {
			this.oRouter.navTo("add")
		},

    });
});