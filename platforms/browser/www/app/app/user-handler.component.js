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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var core_1 = require('@angular/core');
var router_deprecated_1 = require('@angular/router-deprecated');
var authorization_service_1 = require("../authorization.service");
var create_user_account_component_1 = require('../createuser.components/create-user-account.component');
var login_component_1 = require('../login.components/login.component');
var postnote2_component_1 = require('../postnote2.component');
var menu_component_1 = require('../menu.component');
var logout_component_1 = require('../logout/logout.component');
var localstorage_service_1 = require('../localstorage.service');
var core_2 = require('@angular/core');
var angularfire2_1 = require('angularfire2');
var ng2_toastr_1 = require('ng2-toastr/ng2-toastr');
var UserHandlerComponent = (function () {
    function UserHandlerComponent(_authServiceHandler, _router, _ref, toastr) {
        this._authServiceHandler = _authServiceHandler;
        this._router = _router;
        this._ref = _ref;
        this.toastr = toastr;
        this.switchWindow = false;
        this.loggingOut = false;
        this.loggingIn = false;
        this.createUser = false;
        this.sessionExpired = false;
    }
    UserHandlerComponent.prototype.isAuth = function () {
        return this._authServiceHandler.isAuthenticated();
    };
    UserHandlerComponent.prototype.logoutUser = function () {
        this._router.parent.navigate(['UserHandlerRoute']);
        this._authServiceHandler.killAuth();
        this.switchWindow = false;
        this.loggingOut = false;
        this.loggingIn = false;
        if (this.sessionExpired) {
            this.toastr.warning("Your session has expired. Please log in again!", "Alert!");
        }
        else {
            this.toastr.info("You've been successfully logged out!");
        }
        this.sessionExpired = false;
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
    UserHandlerComponent.prototype.switchToLoginWindow = function () {
        if (this.createUser == true) {
            this.loggingIn = false;
            this.createUser = false;
        }
        else {
            this.loggingIn = !this.loggingIn;
        }
    };
    UserHandlerComponent.prototype.switchToLogoutWindow = function () {
        this.checkIfUserSessionHasExpired();
        this.loggingOut = !this.loggingOut;
    };
    UserHandlerComponent.prototype.switchToCreateAccountWindow = function () {
        this.switchWindow = true;
    };
    UserHandlerComponent.prototype.isCreatingAccount = function () {
        return this.createUser;
    };
    UserHandlerComponent.prototype.createUserAccount = function () {
        this.loggingIn = false;
        this.createUser = true;
    };
    UserHandlerComponent.prototype.loginUser = function () {
        this.loggingIn = true;
        this.createUser = false;
    };
    UserHandlerComponent.prototype.checkIfUserSessionHasExpired = function () {
        var authData = this._ref.getAuth();
        if (authData != null) {
            var o = this;
            var ref = new Firebase("https://dazzling-fire-7472.firebaseio.com/users/" + authData.uid);
            ref.once("value").then(function (snapshot) {
                var d = new Date();
                var n = d.getTime();
                var lastExpire = (snapshot.val().expire / 1000);
                var currentExpire = (n / 1000);
                var result = currentExpire - lastExpire;
                if (result >= 10) {
                    o.sessionExpired = true;
                    o.logoutUser();
                }
                else {
                    var ref = new Firebase("https://dazzling-fire-7472.firebaseio.com/users");
                    ref.child(authData.uid).once('value', function (snapshot) {
                        ref.child(authData.uid).update({
                            expire: n
                        });
                    });
                }
            });
        }
    };
    UserHandlerComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'user-handler',
            templateUrl: 'user-handler.component.html',
            styleUrls: ['user-handler.component.css'],
            directives: [router_deprecated_1.ROUTER_DIRECTIVES, create_user_account_component_1.CreateUserAccountComponent, login_component_1.LoginComponent, postnote2_component_1.Postnote2App, menu_component_1.MenuComponent, logout_component_1.LogoutComponent],
            outputs: ['_userLoggedOut'],
            providers: [localstorage_service_1.LocalStorageService],
        }),
        __param(2, core_2.Inject(angularfire2_1.FirebaseRef)), 
        __metadata('design:paramtypes', [authorization_service_1.AuthorizationService, router_deprecated_1.Router, Firebase, ng2_toastr_1.ToastsManager])
    ], UserHandlerComponent);
    return UserHandlerComponent;
}());
exports.UserHandlerComponent = UserHandlerComponent;
//# sourceMappingURL=user-handler.component.js.map