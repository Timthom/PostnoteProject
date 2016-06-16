"use strict";
var platform_browser_dynamic_1 = require('@angular/platform-browser-dynamic');
var core_1 = require('@angular/core');
var _1 = require('./app/');
var _2 = require('./app/app/');
var angularfire2_1 = require('angularfire2/angularfire2');
var authorization_service_1 = require("./app/authorization.service");
var ng2_toastr_1 = require('ng2-toastr/ng2-toastr');
var ng2_toastr_2 = require('ng2-toastr/ng2-toastr');
if (_1.environment.production) {
    core_1.enableProdMode();
}
var options = {
    positionClass: 'toast-bottom-center'
};
document.addEventListener('deviceready', function () {
    platform_browser_dynamic_1.bootstrap(_2.AppComponent, [
        angularfire2_1.FIREBASE_PROVIDERS, [authorization_service_1.AuthorizationService, ng2_toastr_2.ToastsManager], core_1.provide(ng2_toastr_1.ToastOptions, { useValue: new ng2_toastr_1.ToastOptions(options) }),
        angularfire2_1.defaultFirebase('https://dazzling-fire-7472.firebaseio.com')
    ]);
}, false);
//# sourceMappingURL=main.js.map