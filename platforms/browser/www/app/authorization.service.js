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
var ng2_toastr_1 = require('ng2-toastr/ng2-toastr');
var angularfire2_1 = require('angularfire2');
var AuthorizationService = (function () {
    function AuthorizationService(_ref, toastr) {
        this._ref = _ref;
        this.toastr = toastr;
    }
    AuthorizationService.prototype.createUserAccount = function (user) {
        var that = this;
        this._ref.createUser({
            email: user.email,
            password: user.password
        }, function (error, userData) {
            if (error) {
                that.toastr.error("The email address is already exists. Choose another one!", "Error!");
                that.userExists = false;
            }
            else {
                that.toastr.success("Your account has been successfully created!", "Success!");
                that.userExists = true;
            }
        });
    };
    AuthorizationService.prototype.loginUser = function (user) {
        var that = this;
        this.user = null;
        this._ref.authWithPassword({
            email: user.email,
            password: user.password
        }, function (error, authData) {
            if (error) {
                that.toastr.warning("Wrong username or password. Please try again!", "Alert!");
            }
            else {
                localStorage.setItem('token', authData.token);
                that.toastr.info("Welcome, You are now logged in!");
                var d = new Date();
                var n = d.getTime();
                var ref = new Firebase("https://dazzling-fire-7472.firebaseio.com/users");
                ref.child(authData.uid).once('value', function (snapshot) {
                    ref.child(authData.uid).update({
                        provider: authData.provider,
                        email: authData.password.email,
                        expire: n
                    });
                });
            }
        });
    };
    AuthorizationService.prototype.loginFacebookAuth = function () {
        this.user = null;
        this._ref.authWithOAuthPopup("facebook", function (error, authData) {
            if (error) {
                // console.log("Login Failed!", error); 
                if (error.code === "TRANSPORT_UNAVAILABLE") {
                    // fall-back to browser redirects, and pick up the session
                    // automatically when we come back to the origin page
                    ref.authWithOAuthRedirect("facebook", function (error) {
                        localStorage.setItem('token', authData.token);
                        var d = new Date();
                        var n = d.getTime();
                        var ref = new Firebase("https://dazzling-fire-7472.firebaseio.com/users");
                        ref.child(authData.uid).once('value', function (snapshot) {
                            ref.child(authData.uid).update({
                                provider: authData.provider,
                                email: authData.facebook.email,
                                expire: n
                            });
                        });
                    });
                }
            }
            else if (authData) {
                localStorage.setItem('token', authData.token);
                var d = new Date();
                var n = d.getTime();
                var ref = new Firebase("https://dazzling-fire-7472.firebaseio.com/users");
                ref.child(authData.uid).once('value', function (snapshot) {
                    ref.child(authData.uid).update({
                        provider: authData.provider,
                        email: authData.facebook.email,
                        expire: n
                    });
                });
            }
        }, { remember: "default", scope: "email"
        });
    };
    AuthorizationService.prototype.loginGoogleAuth = function () {
        this.user = null;
        this._ref.authWithOAuthPopup("google", function (error, authData) {
            if (error) {
                // console.log("Login Failed!", error); 
                if (error.code === "TRANSPORT_UNAVAILABLE") {
                    // fall-back to browser redirects, and pick up the session
                    // automatically when we come back to the origin page
                    ref.authWithOAuthRedirect("google", function (error) {
                        localStorage.setItem('token', authData.token);
                        var d = new Date();
                        var n = d.getTime();
                        var ref = new Firebase("https://dazzling-fire-7472.firebaseio.com/users");
                        ref.child(authData.uid).once('value', function (snapshot) {
                            ref.child(authData.uid).update({
                                provider: authData.provider,
                                email: authData.google.email,
                                expire: n
                            });
                        });
                    });
                }
            }
            else if (authData) {
                localStorage.setItem('token', authData.token);
                var d = new Date();
                var n = d.getTime();
                var ref = new Firebase("https://dazzling-fire-7472.firebaseio.com/users");
                ref.child(authData.uid).once('value', function (snapshot) {
                    ref.child(authData.uid).update({
                        provider: authData.provider,
                        email: authData.google.email,
                        expire: n
                    });
                });
            }
        }, { remember: "default", scope: "email"
        });
    };
    AuthorizationService.prototype.loginTwitterAuth = function () {
        this.user = null;
        this._ref.authWithOAuthPopup("twitter", function (error, authData) {
            if (error) {
                console.log("Login Failed!", error);
                if (error.code === "TRANSPORT_UNAVAILABLE") {
                    // fall-back to browser redirects, and pick up the session
                    // automatically when we come back to the origin page
                    ref.authWithOAuthRedirect("twitter", function (error) {
                        localStorage.setItem('token', authData.token);
                        var d = new Date();
                        var n = d.getTime();
                        var ref = new Firebase("https://dazzling-fire-7472.firebaseio.com/users");
                        ref.child(authData.uid).once('value', function (snapshot) {
                            ref.child(authData.uid).update({
                                provider: authData.provider,
                                email: authData.twitter.username,
                                expire: n
                            });
                        });
                    });
                }
            }
            else if (authData) {
                localStorage.setItem('token', authData.token);
                var d = new Date();
                var n = d.getTime();
                var ref = new Firebase("https://dazzling-fire-7472.firebaseio.com/users");
                ref.child(authData.uid).once('value', function (snapshot) {
                    ref.child(authData.uid).update({
                        provider: authData.provider,
                        email: authData.twitter.username,
                        expire: n
                    });
                });
            }
        }, { remember: "default", scope: "username"
        });
    };
    AuthorizationService.prototype.loginGitHubAuth = function () {
        this.user = null;
        this._ref.authWithOAuthPopup("github", function (error, authData) {
            if (error) {
                // console.log("Login Failed!", error); 
                if (error.code === "TRANSPORT_UNAVAILABLE") {
                    // fall-back to browser redirects, and pick up the session
                    // automatically when we come back to the origin page
                    ref.authWithOAuthRedirect("github", function (error) {
                        localStorage.setItem('token', authData.token);
                        var d = new Date();
                        var n = d.getTime();
                        var ref = new Firebase("https://dazzling-fire-7472.firebaseio.com/users");
                        ref.child(authData.uid).once('value', function (snapshot) {
                            ref.child(authData.uid).update({
                                provider: authData.provider,
                                email: authData.github.email,
                                expire: n
                            });
                        });
                    });
                }
            }
            else if (authData) {
                localStorage.setItem('token', authData.token);
                var d = new Date();
                var n = d.getTime();
                var ref = new Firebase("https://dazzling-fire-7472.firebaseio.com/users");
                ref.child(authData.uid).once('value', function (snapshot) {
                    ref.child(authData.uid).update({
                        provider: authData.provider,
                        email: authData.github.email,
                        expire: n
                    });
                });
            }
        }, { remember: "default", scope: "user"
        });
    };
    AuthorizationService.prototype.isAuthenticated = function () {
        var _this = this;
        if (localStorage.getItem('token') == null) {
            localStorage.getItem('token');
        }
        if (this._ref.getAuth() != null && this.user == null) {
            console.log(this.user);
            this.getLoggedInUser().then(function (res) { return _this.user = res; });
        }
        return localStorage.getItem('token') !== null;
    };
    AuthorizationService.prototype.killAuth = function () {
        this._ref.unauth();
        localStorage.removeItem('token');
    };
    AuthorizationService.prototype.getLoggedInUser = function () {
        var authData = this._ref.getAuth();
        var ref = new Firebase("https://dazzling-fire-7472.firebaseio.com/users/" + authData.uid);
        return ref.once("value").then(function (snapshot) {
            return snapshot.val().email;
        });
    };
    AuthorizationService.prototype.returnLoggedInUser = function () {
        return this.user;
    };
    AuthorizationService.prototype.returnCreateUserSucceed = function () {
        return this.userExists;
    };
    AuthorizationService = __decorate([
        core_1.Injectable(),
        __param(0, core_1.Inject(angularfire2_1.FirebaseRef)), 
        __metadata('design:paramtypes', [Object, ng2_toastr_1.ToastsManager])
    ], AuthorizationService);
    return AuthorizationService;
}());
exports.AuthorizationService = AuthorizationService;
//# sourceMappingURL=authorization.service.js.map