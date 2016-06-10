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
var core_1 = require("@angular/core");
var angularfire2_1 = require('angularfire2');
var AuthorizationService = (function () {
    function AuthorizationService(_ref) {
        this._ref = _ref;
    }
    AuthorizationService.prototype.createUserAccount = function (user) {
        this._ref.createUser({
            email: user.email,
            password: user.password
        }, function (error, userData) {
            if (error) {
                alert('E-post adressen finns redan. Välj en annan!');
            }
            else {
                alert("Registreringen lyckades");
            }
        });
    };
    AuthorizationService.prototype.loginUser = function (user) {
        this._ref.authWithPassword({
            email: user.email,
            password: user.password
        }, function (error, authData) {
            if (error) {
                alert("Fel användarnamn eller lösenord. Försök igen!");
            }
            else {
                localStorage.setItem('token', authData.token);
                console.log(authData);
                alert("Du är nu inloggad!");
            }
        });
    };
    AuthorizationService.prototype.loginFacebookAuth = function () {
        this._ref.authWithOAuthPopup("facebook", function (error, authData) {
            if (error) {
                console.log("Login Failed!", error);
            }
            else {
                console.log("Authenticated successfully with payload:", authData);
                localStorage.setItem('token', authData.token);
            }
        }, { remember: "sessionOnly"
        });
    };
    AuthorizationService.prototype.loginGoogleAuth = function () {
        this._ref.authWithOAuthPopup("google", function (error, authData) {
            if (error) {
                console.log("Login Failed!", error);
            }
            else {
                console.log("Authenticated successfully with payload:", authData);
                localStorage.setItem('token', authData.token);
            }
        }, { remember: "sessionOnly"
        });
    };
    AuthorizationService.prototype.loginTwitterAuth = function () {
        this._ref.authWithOAuthPopup("twitter", function (error, authData) {
            if (error) {
                console.log("Login Failed!", error);
            }
            else {
                console.log("Authenticated successfully with payload:", authData);
                localStorage.setItem('token', authData.token);
            }
        }, { remember: "sessionOnly"
        });
    };
    AuthorizationService.prototype.loginGitHubAuth = function () {
        this._ref.authWithOAuthPopup("github", function (error, authData) {
            if (error) {
                console.log("Login Failed!", error);
            }
            else {
                console.log("Authenticated successfully with payload:", authData);
                localStorage.setItem('token', authData.token);
            }
        }, { remember: "sessionOnly"
        });
    };
    AuthorizationService.prototype.isAuthenticated = function () {
        if (localStorage.getItem('token') == null) {
            localStorage.getItem('token');
        }
        return localStorage.getItem('token') !== null;
    };
    AuthorizationService.prototype.killAuth = function () {
        this._ref.unauth();
        localStorage.removeItem('token');
    };
    AuthorizationService = __decorate([
        core_1.Injectable(),
        __param(0, core_1.Inject(angularfire2_1.FirebaseRef)), 
        __metadata('design:paramtypes', [Object])
    ], AuthorizationService);
    return AuthorizationService;
}());
exports.AuthorizationService = AuthorizationService;
//# sourceMappingURL=authorization.service.js.map