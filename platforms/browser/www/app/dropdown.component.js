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
var angularfire2_1 = require('angularfire2');
var data_service_1 = require('./data.service');
var common_1 = require('@angular/common');
var ng2_bootstrap_1 = require('ng2-bootstrap/ng2-bootstrap');
var core_2 = require('@angular/core');
var DropdownComponent = (function () {
    function DropdownComponent(_ref, _ds) {
        this._ref = _ref;
        this._ds = _ds;
        this.changeGroup = new core_1.EventEmitter();
        this.changeNoteGroup = new core_1.EventEmitter();
        this.disabled = false;
        this.status = { isopen: false };
        this.items = ['The first choice!',
            'And another choice for you.', 'but wait! A third!'];
        this._authData = this._ref.getAuth();
    }
    DropdownComponent.prototype.toggled = function (open) {
        console.log('Dropdown is now: ', open);
    };
    DropdownComponent.prototype.toggleDropdown = function ($event) {
        $event.preventDefault();
        $event.stopPropagation();
        this.status.isopen = !this.status.isopen;
    };
    DropdownComponent.prototype.ngOnInit = function () {
        if (this._authData != null) {
            this.getTitles();
        }
    };
    DropdownComponent.prototype.getTitles = function () {
        var _this = this;
        if (this._authData != null) {
            this._ds.getAllGroups().then(function (titles) { return _this.groups = titles; });
        }
    };
    DropdownComponent.prototype.selectGroup = function (group) {
        if (this._authData != null) {
            this.changeGroup.emit(group);
            this.changeNoteGroup.emit(group);
            var buttonText = document.getElementById('group_name');
            buttonText.innerHTML = group;
            console.log("Group selected " + group);
        }
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], DropdownComponent.prototype, "group", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], DropdownComponent.prototype, "changeGroup", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], DropdownComponent.prototype, "noteGroup", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], DropdownComponent.prototype, "changeNoteGroup", void 0);
    DropdownComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'dropdown',
            providers: [router_deprecated_1.ROUTER_PROVIDERS],
            templateUrl: 'dropdown.component.html',
            styleUrls: ['dropdown.component.css'],
            directives: [router_deprecated_1.ROUTER_DIRECTIVES, ng2_bootstrap_1.DROPDOWN_DIRECTIVES, common_1.CORE_DIRECTIVES],
            pipes: []
        }),
        router_deprecated_1.RouteConfig([]),
        __param(0, core_2.Inject(angularfire2_1.FirebaseRef)), 
        __metadata('design:paramtypes', [Firebase, data_service_1.DataService])
    ], DropdownComponent);
    return DropdownComponent;
}());
exports.DropdownComponent = DropdownComponent;
//# sourceMappingURL=dropdown.component.js.map