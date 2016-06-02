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
var authorization_service_1 = require("../authorization.service");
var LogoutComponent = (function () {
    function LogoutComponent(_authService) {
        this._authService = _authService;
        this.emitLogout = new core_1.EventEmitter();
    }
    LogoutComponent.prototype.ngOnInit = function () {
    };
    LogoutComponent.prototype.logout = function () {
        this.emitLogout.emit('');
    };
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], LogoutComponent.prototype, "emitLogout", void 0);
    LogoutComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'logout-user',
            templateUrl: 'logout.component.html',
            styleUrls: ['logout.component.css']
        }), 
        __metadata('design:paramtypes', [authorization_service_1.AuthorizationService])
    ], LogoutComponent);
    return LogoutComponent;
}());
exports.LogoutComponent = LogoutComponent;
//# sourceMappingURL=logout.component.js.map