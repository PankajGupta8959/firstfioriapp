/* global QUnit */
QUnit.config.autostart = false;

sap.ui.getCore().attachInit(function () {
	"use strict";

	sap.ui.require([
		"ibm/fin/ar/project1/test/unit/AllTests"
	], function () {
		QUnit.start();
	});
});