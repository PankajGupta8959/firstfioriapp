sap.ui.define([
    'emc/fin/ar/controller/BaseController',
    "sap/ui/model/json/JSONModel",
    "sap/m/MessageBox",
    "sap/m/MessageToast"
], function (BaseController,
    JSONModel, MessageBox, MessageToast) {
    'use strict';
    return BaseController.extend("emc.fin.ar.controller.Add", {

        onInit: function () {
            var oModel = new JSONModel();
            oModel.setData({
                "prodData":
                {
                    "PRODUCT_ID": "",
                    "TYPE_CODE": "PR",
                    "CATEGORY": "",
                    "NAME": "",
                    "DESCRIPTION": "",
                    "SUPPLIER_ID": "0100000005",
                    "SUPPLIER_NAME": "TECUM",
                    "TAX_TARIF_CODE": "1 ",
                    "MEASURE_UNIT": "EA",
                    "WEIGHT_MEASURE": "4.300",
                    "PRICE": 0,
                    "CURRENCY_CODE": "USD",

                }

            });

            this.getView().setModel(oModel, "prod");
        },

        onSave: function() {
            // Prepare Our Payload for sending  on ABAP System
            var oPayload = this.getView().getModel("prod").getProperty("/prodData");

            // Get the OData Model object
            var oDataModel = this.getView().getModel();

            // Create the OData Model
            oDataModel.create("/ProductSet", oPayload, {
                success : function(data) {
                    MessageToast.show("Data inserted Successfully");
                },
                error : function(oErr){
                    // MessageBox.error("It's an Error");
                MessageBox.error(JSON.parse(oErr.responseText).error.innererror.errordetails[0].message);

                }
            })

        },

		onClear: function(oEvent) {
			
            this.getView().getModel("prod").setData({
                "prodData":
                {
                    "PRODUCT_ID": "",
                    "TYPE_CODE": "PR",
                    "CATEGORY": "",
                    "NAME": "",
                    "DESCRIPTION": "",
                    "SUPPLIER_ID": "0100000005",
                    "SUPPLIER_NAME": "TECUM",
                    "TAX_TARIF_CODE": "1 ",
                    "MEASURE_UNIT": "EA",
                    "WEIGHT_MEASURE": "4.300",
                    "PRICE": 0,
                    "CURRENCY_CODE": "USD",

                }

            });
		},

		onEnter: function(oEvent) {
            // Get the value which will user fill on screen
			var val = oEvent.getParameter("value");
            var oModel = this.getView().getModel("prod");

            // Get the OData model object
            var oDataModel = this.getView().getModel();

            // Prepare the path 
            var sPath = "/ProductSet('"+ val +"')";

            // Fire OData calls
            oDataModel.read(sPath, {
                success: function(data) {
                    oModel.setProperty('/prodData',data);
                }
            })
		}
    });
}); 
// sap.ui.define([
//     'emc/fin/ar/controller/BaseController',
//     'sap/ui/model/json/JSONModel',
//     'sap/m/MessageToast',
//     'sap/m/MessageBox'
// ], function(BaseController,JSONModel, MessageToast,MessageBox) {
//     'use strict';
//     return BaseController.extend("emc.fin.ar.controller.Add",{
//         onInit: function(){
//             var oModel = new JSONModel();
//             oModel.setData({
//                 "prodData": {
//                     "PRODUCT_ID" : "",
//                     "TYPE_CODE" : "PR",
//                     "CATEGORY" : "",
//                     "NAME" : "",
//                     "DESCRIPTION" : "",
//                     "SUPPLIER_ID" : "0100000005",
//                     "SUPPLIER_NAME" : "TECUM",
//                     "PRICE" : 0,
//                     "CURRENCY_CODE" : "USD",
//                     "TAX_TARIF_CODE" : "1 ",
//                     "MEASURE_UNIT" : "EA",
//                     "WEIGHT_MEASURE": "4.300",
                    
//                 }
//             });
//             this.getView().setModel(oModel,"prod");
//         },
//         onEnter: function(oEvent){
//             //Step 1: What value of product id user give on screen
//             var val = oEvent.getParameter("value");
//             var oModel = this.getView().getModel("prod");
//             //Step 2: Get The OData Model object
//             var oDataModel = this.getView().getModel();
//             //Step 3: Prepare path to read single product data
//             var sPath = "/ProductSet('" + val + "')";
//             //Step 4: fire OData GET call to read
//             oDataModel.read(sPath, {
//                 success: function(data){
//                     //Step 5: Set the data back to local model
//                     oModel.setProperty("/prodData", data);
//                 }
//             });
            


//         },
//         onSave: function(){
//             //Step 1: Prepare our payload which we want to send to ABAP system
//             var payload = this.getView().getModel("prod").getProperty("/prodData");
//             //Step 2: Get the odata model object (default model)
//             var oDataModel = this.getView().getModel();
//             //Step 3: Trigger POST call from OData Model to /ProductSet entityset and send data
//             oDataModel.create("/ProductSet", payload,{
//                 //Step 4: Handle call back for SUCCESS and ERROR
//                 success: function(data){
//                     MessageToast.show("Yo Amigo! you did it! 😊");
//                 },
//                 error: function(oErr){
//                     //MessageBox.error("Oops! something is fishy 😒");
//                     MessageBox.error(JSON.parse(oErr.responseText).error.innererror.errordetails[0].message);
//                 }
//             });
            
//         }
//         // onClearScreen: function (params) {
//         //     this.getView().getModel("prod").setData({
//         //         "prodData": {
//         //             "PRODUCT_ID" : "",
//         //             "TYPE_CODE" : "PR",
//         //             "CATEGORY" : "",
//         //             "NAME" : "",
//         //             "DESCRIPTION" : "",
//         //             "SUPPLIER_ID" : "0100000051",
//         //             "SUPPLIER_NAME" : "TECUM",
//         //             "PRICE" : 0,
//         //             "CURRENCY_CODE" : "USD",
//         //             "TAX_TARIF_CODE" : "1 ",
//         //             "MEASURE_UNIT" : "EA",
//         //             "DIM_UNIT" : "CM"
//         //         }
//         //     });
//         // }
//     });
// }); 