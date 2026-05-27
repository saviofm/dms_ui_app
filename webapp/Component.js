sap.ui.define([
    "sap/ui/core/UIComponent",
    "dmsuiapp/model/models"
], (UIComponent, models) => {
    "use strict";

    return UIComponent.extend("dmsuiapp.Component", {
        metadata: {
            manifest: "json",
            interfaces: [
                "sap.ui.core.IAsyncContentCreation"
            ]
        },

        init() {
            UIComponent.prototype.init.apply(this, arguments);

            sap.ui.loader.config({
                paths: {
                    "com/sap/ecm/reuse/admin": "/comsapecmreuse.comsapecmreuseadmin-1.0.0"
                }
            });

            this.setModel(models.createDeviceModel(), "device");
            this.getRouter().initialize();
        }
    });
});
