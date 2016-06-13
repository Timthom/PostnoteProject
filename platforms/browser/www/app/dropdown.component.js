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
var localstorage_service_1 = require('./localstorage.service');
var menu_component_1 = require('./menu.component');
var menugroup_component_1 = require('./menugroup.component');
var DropdownComponent = (function () {
    function DropdownComponent(_ref, _ds, _ls, _menu, _menuGroup) {
        this._ref = _ref;
        this._ds = _ds;
        this._ls = _ls;
        this._menu = _menu;
        this._menuGroup = _menuGroup;
        this.changeGroup = new core_1.EventEmitter();
        this.changeNoteGroup = new core_1.EventEmitter();
        this.disabled = false;
        this.status = { isopen: false };
        this._authData = this._ref.getAuth();
        //_menu.clicked.subscribe(this.getTitles());
        //_menuGroup.groupsChanged.subscribe(this.getTitles());
    }
    DropdownComponent.prototype.toggled = function (open) {
    };
    DropdownComponent.prototype.toggleDropdown = function ($event) {
        $event.preventDefault();
        $event.stopPropagation();
        this.status.isopen = !this.status.isopen;
    };
    DropdownComponent.prototype.ngOnInit = function () {
        this.getTitles();
    };
    DropdownComponent.prototype.getTitles = function () {
        var _this = this;
        if (this._authData != null) {
            this._ds.getAllGroups().then(function (titles) { return _this.groups = titles; });
        }
        else {
            this.groups = this._ls.getAllGroups();
        }
    };
    DropdownComponent.prototype.selectGroup = function (group) {
        //Emits to creator?
        this.changeGroup.emit(group);
        //Emits to note component and group component?
        this.changeNoteGroup.emit(group);
        var buttonText = document.getElementById('group_name');
        buttonText.innerHTML = group;
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
            providers: [router_deprecated_1.ROUTER_PROVIDERS, localstorage_service_1.LocalStorageService, menu_component_1.MenuComponent, menugroup_component_1.MenuGroupComponent],
            templateUrl: 'dropdown.component.html',
            styleUrls: ['dropdown.component.css'],
            directives: [router_deprecated_1.ROUTER_DIRECTIVES, ng2_bootstrap_1.DROPDOWN_DIRECTIVES, common_1.CORE_DIRECTIVES],
            pipes: []
        }),
        router_deprecated_1.RouteConfig([]),
        __param(0, core_2.Inject(angularfire2_1.FirebaseRef)), 
        __metadata('design:paramtypes', [Firebase, data_service_1.DataService, localstorage_service_1.LocalStorageService, menu_component_1.MenuComponent, menugroup_component_1.MenuGroupComponent])
    ], DropdownComponent);
    return DropdownComponent;
}());
exports.DropdownComponent = DropdownComponent;
//# sourceMappingURL=dropdown.component.js.map