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
var note_component_1 = require('./note.component');
var menu_component_1 = require('./menu.component');
var group_component_1 = require('./group.component');
var data_service_1 = require('./data.service');
var core_2 = require('@angular/core');
var creator_component_1 = require('./creator.component');
var headerbar_component_1 = require('./headerbar/headerbar.component');
var value_service_1 = require('./value.service');
var core_3 = require('@angular/core');
var localstorage_service_1 = require('./localstorage.service');
var menugroup_component_1 = require('./menugroup.component');
var core_4 = require('@angular/core');
var dropdown_component_1 = require('./dropdown.component');
core_4.enableProdMode();
var Postnote2App = (function () {
    function Postnote2App(_ref, _ds, _vs, _ls, _menuGroup) {
        this._ref = _ref;
        this._ds = _ds;
        this._vs = _vs;
        this._ls = _ls;
        this._menuGroup = _menuGroup;
        this.groupChanged = new core_2.EventEmitter();
        this.navbarColor = this.randomColor();
        this.btnImage = 'icon_menu.png';
        this.statusCheckSideBar = this._vs._showSideBar;
        this._authData = this._ref.getAuth();
        this._menuGroup.groupsChanged.subscribe(this.getGroups());
        this._token = localStorage.getItem('token');
    }
    Postnote2App.prototype.ngOnInit = function () {
        this.getGroups();
        this.getNotes();
    };
    Postnote2App.prototype.getGroups = function () {
        var _this = this;
        var token = localStorage.getItem('token');
        if (this._authData != null && token != null) {
            this._ds.getAllGroups().then(function (groups) { return _this.allGroups = groups; });
        }
        else {
            this.allGroups = this._ls.getAllGroups();
        }
    };
    Postnote2App.prototype.getNotes = function () {
        var _this = this;
        var token = localStorage.getItem('token');
        if (this._authData != null && token != null) {
            this._ds.getAllNotes().then(function (notes) { return _this.allNotes = notes; });
        }
        else {
            this.allNotes = this._ls.getAllNotes();
        }
    };
    Postnote2App.prototype.groupsChanged = function (groups) {
        this.creatorComponent.groupsChanged();
        this.getGroups();
        if (this.menuComponent != undefined) {
            this.menuComponent.getGroups();
        }
    };
    Postnote2App.prototype.addGroup = function () {
        this.getGroups();
    };
    Postnote2App.prototype.deleteGroup = function () {
        this.getGroups();
        this.groupChanged.emit('');
    };
    Postnote2App.prototype.toggleSideBar = function () {
        this._vs._showSideBar = !this._vs._showSideBar;
        this.statusCheckSideBar = this._vs._showSideBar;
        if (this.statusCheckSideBar) {
            this.btnImage = 'icon_back.png';
        }
        else {
            this.btnImage = 'icon_menu.png';
        }
    };
    Postnote2App.prototype.ngAfterViewInit = function () {
    };
    Postnote2App.prototype.updateNotes = function () {
        //this.menuComponent.getTitles; //funkar ändå..
        this.groupComponents.toArray().forEach(function (child) { return child.getNotes(); });
        this.creatorComponent.getNotes();
    };
    Postnote2App.prototype.randomColor = function () {
        var colors = ["#F490B7", "#FFA334", "#F56D7E", "#8FD3CE", "#EEF66C", "mediumseagreen"];
        var color = colors[Math.floor(Math.random() * colors.length)];
        return color;
    };
    __decorate([
        core_2.Output(), 
        __metadata('design:type', Object)
    ], Postnote2App.prototype, "groupChanged", void 0);
    __decorate([
        core_1.ViewChild(menu_component_1.MenuComponent), 
        __metadata('design:type', menu_component_1.MenuComponent)
    ], Postnote2App.prototype, "menuComponent", void 0);
    __decorate([
        core_1.ViewChildren(group_component_1.GroupComponent), 
        __metadata('design:type', core_1.QueryList)
    ], Postnote2App.prototype, "groupComponents", void 0);
    __decorate([
        core_1.ViewChild(creator_component_1.CreatorComponent), 
        __metadata('design:type', creator_component_1.CreatorComponent)
    ], Postnote2App.prototype, "creatorComponent", void 0);
    Postnote2App = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'postnote2-app',
            providers: [router_deprecated_1.ROUTER_PROVIDERS, data_service_1.DataService, angularfire2_1.AngularFire, localstorage_service_1.LocalStorageService, menugroup_component_1.MenuGroupComponent],
            templateUrl: 'postnote2.component.html',
            styleUrls: ['postnote2.component.css'],
            directives: [router_deprecated_1.ROUTER_DIRECTIVES, note_component_1.NoteComponent, menu_component_1.MenuComponent, group_component_1.GroupComponent, creator_component_1.CreatorComponent, headerbar_component_1.HeaderbarComponent, dropdown_component_1.DropdownComponent],
            pipes: []
        }),
        __param(0, core_3.Inject(angularfire2_1.FirebaseRef)), 
        __metadata('design:paramtypes', [Firebase, data_service_1.DataService, value_service_1.ValueService, localstorage_service_1.LocalStorageService, menugroup_component_1.MenuGroupComponent])
    ], Postnote2App);
    return Postnote2App;
}());
exports.Postnote2App = Postnote2App;
//# sourceMappingURL=postnote2.component.js.map