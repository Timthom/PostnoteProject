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
var authorization_service_1 = require("../authorization.service");
var create_user_account_component_1 = require('../createuser.components/create-user-account.component');
var login_component_1 = require('../login.components/login.component');
var postnote2_component_1 = require('../postnote2.component');
var menu_component_1 = require('../menu.component');
var logout_component_1 = require('../logout/logout.component');
var UserHandlerComponent = (function () {
    function UserHandlerComponent(_authServiceHandler, _router) {
        this._authServiceHandler = _authServiceHandler;
        this._router = _router;
        this.switchWindow = false;
        this.loggingOut = false;
        this.loggingIn = false;
        console.log("Refreshing???");
    }
    UserHandlerComponent.prototype.routerCanReuse = function () {
        return false;
    };
    UserHandlerComponent.prototype.isAuth = function () {
        //console.log("Auth method is working!");
        return this._authServiceHandler.isAuthenticated();
    };
    UserHandlerComponent.prototype.logoutUser = function () {
        //console.log("Loggas ut?");
        this._authServiceHandler.killAuth();
        this.switchWindow = false;
        this.loggingOut = false;
        this.loggingIn = false;
        // this._router.renavigate();
        // this._router.parent.navigate(['UserHandlerRoute']);
    };
    UserHandlerComponent.prototype.switchTo = function () {
        return this.switchWindow;
    };
    UserHandlerComponent.prototype.isLoggingOut = function () {
        return this.loggingOut;
    };
    UserHandlerComponent.prototype.isLoggingIn = function () {
        return this.loggingIn;
    };
    UserHandlerComponent.prototype.switchToCreateAccountWindow = function () {
        this.switchWindow = true;
        // this._router.parent.navigate(['CreateUserAccountRoute']);
    };
    UserHandlerComponent.prototype.switchToLoginWindow = function () {
        // this._router.parent.navigate(['LoginUserRoute']);
        this.loggingIn = !this.loggingIn;
    };
    UserHandlerComponent.prototype.switchToLogoutWindow = function () {
        //console.log("Byter till logout!");
        //console.log(this.loggingOut);
        this.loggingOut = !this.loggingOut;
    };
    UserHandlerComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'user-handler',
            templateUrl: 'user-handler.component.html',
            styleUrls: ['user-handler.component.css'],
            directives: [router_deprecated_1.ROUTER_DIRECTIVES, create_user_account_component_1.CreateUserAccountComponent, login_component_1.LoginComponent, postnote2_component_1.Postnote2App, menu_component_1.MenuComponent, logout_component_1.LogoutComponent],
            outputs: ['_userLoggedOut']
        }), 
        __metadata('design:paramtypes', [authorization_service_1.AuthorizationService, router_deprecated_1.Router])
    ], UserHandlerComponent);
    return UserHandlerComponent;
}());
exports.UserHandlerComponent = UserHandlerComponent;
//# sourceMappingURL=user-handler.component.js.map