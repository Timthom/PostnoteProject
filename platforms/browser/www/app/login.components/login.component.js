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
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var authorization_service_1 = require("../authorization.service");
var router_deprecated_1 = require('@angular/router-deprecated');
var LoginComponent = (function () {
    function LoginComponent(_fb, _authService, _router) {
        this._fb = _fb;
        this._authService = _authService;
        this._router = _router;
        this.error = false;
        this.errorMessage = '';
    }
    LoginComponent.prototype.onLoggedIn = function () {
        this._authService.loginUser(this.myForm.value);
        /* if(this._authService.loginSuccess()) {
            this._router.parent.navigate(['PostnoteAppRoute']);
        } */
    };
    LoginComponent.prototype.ngOnInit = function () {
        this.myForm = this._fb.group({
            email: ['', common_1.Validators.required],
            password: ['', common_1.Validators.required],
        });
    };
    LoginComponent.prototype.loginWithFacebook = function () {
        this._authService.loginFacebookAuth();
    };
    LoginComponent.prototype.loginWithGoogle = function () {
        this._authService.loginGoogleAuth();
    };
    LoginComponent.prototype.loginWithTwitter = function () {
        this._authService.loginTwitterAuth();
    };
    LoginComponent.prototype.loginWithGitHub = function () {
        this._authService.loginGitHubAuth();
    };
    LoginComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'login-user',
            templateUrl: 'login.component.html',
            styleUrls: ['login.component.css'],
            directives: [router_deprecated_1.ROUTER_DIRECTIVES],
            pipes: [],
            providers: []
        }), 
        __metadata('design:paramtypes', [common_1.FormBuilder, authorization_service_1.AuthorizationService, router_deprecated_1.Router])
    ], LoginComponent);
    return LoginComponent;
}());
exports.LoginComponent = LoginComponent;
//# sourceMappingURL=login.component.js.map