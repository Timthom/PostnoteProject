"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var router_deprecated_1 = require('@angular/router-deprecated');
var angularfire2_1 = require('angularfire2');
var data_service_1 = require('../data.service');
var value_service_1 = require('../value.service');
var user_handler_component_1 = require("./user-handler.component");
var ng2_dragula_1 = require('ng2-dragula/ng2-dragula');
var dragula_helper_service_1 = require('../dragula-helper.service');
var localstorage_service_1 = require('../localstorage.service');
var AppComponent = (function () {
    function AppComponent(_dragulaService, _dhs) {
        this._dragulaService = _dragulaService;
        this._dhs = _dhs;
        this._dhs._configureDragula(_dragulaService);
        console.log("Funkar?");
    }
    AppComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'my-app',
            providers: [router_deprecated_1.ROUTER_PROVIDERS, data_service_1.DataService, angularfire2_1.AngularFire, value_service_1.ValueService, dragula_helper_service_1.DragulaHelperService, localstorage_service_1.LocalStorageService],
            viewProviders: [ng2_dragula_1.DragulaService],
            templateUrl: 'app.component.html',
            styleUrls: ['app.component.css'],
            directives: [user_handler_component_1.UserHandlerComponent, router_deprecated_1.ROUTER_DIRECTIVES],
            pipes: []
        }),
        router_deprecated_1.RouteConfig([]), 
        __metadata('design:paramtypes', [ng2_dragula_1.DragulaService, dragula_helper_service_1.DragulaHelperService])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
/* {path: '/route2', name:'AllNotes', component: Postnote2App},
  {path: '/route3', name:'CreateUserAccount', component: CreateUserAccountComponent} */ 
//# sourceMappingURL=app.component.js.map