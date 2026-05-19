/*global QUnit*/

sap.ui.define([
	"dmsuiapp/controller/dms_ui.controller"
], function (Controller) {
	"use strict";

	QUnit.module("dms_ui Controller");

	QUnit.test("I should test the dms_ui controller", function (assert) {
		var oAppController = new Controller();
		oAppController.onInit();
		assert.ok(oAppController);
	});

});
