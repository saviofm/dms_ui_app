sap.ui.define([
    "sap/ui/core/mvc/Controller"
], (Controller) => {
    "use strict";

    return Controller.extend("dmsuiapp.controller.dms_ui", {
        onComponentCreated(oEvent) {
            this._oAdmin = oEvent.getParameter("component");
        }
    });
});
