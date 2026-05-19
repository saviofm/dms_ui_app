/* global QUnit */
QUnit.config.autostart = false;

sap.ui.require(["dmsuiapp/test/integration/AllJourneys"
], function () {
	QUnit.start();
});
