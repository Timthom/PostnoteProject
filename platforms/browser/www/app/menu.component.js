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
var data_service_1 = require('./data.service');
var menugroup_component_1 = require('./menugroup.component');
var value_service_1 = require('./value.service');
var angularfire2_1 = require('angularfire2');
var core_2 = require('@angular/core');
var MenuComponent = (function () {
    function MenuComponent(_ref, _ds, _vs) {
        this._ref = _ref;
        this._ds = _ds;
        this._vs = _vs;
        this.showingCancel = false;
        this.adding = false;
        this.groupName = "";
        this.buttonText = "Add category";
        this.checkSideBar = this._vs._showSideBar;
        this.clicked = new core_1.EventEmitter();
        this._authData = this._ref.getAuth();
    }
    MenuComponent.prototype.routerCanReuse = function () {
        return false;
    };
    MenuComponent.prototype.ngOnInit = function () {
        if (this._authData != null) {
            this.getTitles();
            this.getGroups();
        }
    };
    MenuComponent.prototype.getTitles = function () {
        var _this = this;
        if (this._authData != null) {
            this._ds.getAllNotes().then(function (titles) { return _this.titles = titles; });
            this._ds.getAllNotesInGroup('noGroup').then(function (notes) { return _this.titles = notes; });
        }
    };
    MenuComponent.prototype.getGroups = function () {
        var _this = this;
        if (this._authData != null) {
            this._ds.getAllGroups().then(function (groups) { return _this.myGroups = groups; });
        }
    };
    MenuComponent.prototype.jumpToNote = function (note) {
        var element = document.getElementById(note);
        element.scrollIntoView(true);
    };
    MenuComponent.prototype.toggleInput = function () {
        this.adding = !this.adding;
        this.showingCancel = !this.showingCancel;
        if (this.adding) {
            this.buttonText = "Cancel";
        }
        else {
            this.buttonText = "Add category";
        }
    };
    MenuComponent.prototype.addGroup = function () {
        if (this._authData != null) {
            if (this.groupName.trim().length > 0) {
                var time = new Date().getTime();
                this._ds.addGroupToGroups(this.groupName, time);
                this.groupName = "";
                this.getGroups();
                this.getTitles();
                this.clicked.emit('');
                this.adding = false;
                this.buttonText = "Add category";
            }
        }
    };
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], MenuComponent.prototype, "clicked", void 0);
    MenuComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'menu',
            providers: [router_deprecated_1.ROUTER_PROVIDERS],
            templateUrl: 'menu.component.html',
            styleUrls: ['menu.component.css'],
            directives: [router_deprecated_1.ROUTER_DIRECTIVES, menugroup_component_1.MenuGroupComponent],
            pipes: []
        }),
        __param(0, core_2.Inject(angularfire2_1.FirebaseRef)), 
        __metadata('design:paramtypes', [Firebase, data_service_1.DataService, value_service_1.ValueService])
    ], MenuComponent);
    return MenuComponent;
}());
exports.MenuComponent = MenuComponent;
//# sourceMappingURL=menu.component.js.map