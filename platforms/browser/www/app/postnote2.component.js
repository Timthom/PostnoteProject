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
var localStorage_service_1 = require('./localStorage.service');
var menugroup_component_1 = require('./menugroup.component');
var Postnote2App = (function () {
    function Postnote2App(_ref, _ds, _vs, _ls, _menuGroup) {
        this._ref = _ref;
        this._ds = _ds;
        this._vs = _vs;
        this._ls = _ls;
        this._menuGroup = _menuGroup;
        this.groupChanged = new core_2.EventEmitter();
        this.btnImage = 'icon_menu.png';
        this.statusCheckSideBar = this._vs._showSideBar;
        this._authData = this._ref.getAuth();
        this._menuGroup.groupsChanged.subscribe(this.getGroups());
    }
    Postnote2App.prototype.ngOnInit = function () {
        this.getGroups();
    };
    Postnote2App.prototype.getGroups = function () {
        var _this = this;
        if (this._authData != null) {
            this._ds.getAllGroups().then(function (groups) { return _this.allGroups = groups; });
        }
        else {
            this.allGroups = this._ls.getAllGroups();
        }
    };
    Postnote2App.prototype.addGroup = function () {
        this.getGroups();
    };
    Postnote2App.prototype.deleteGroup = function () {
        this.getGroups();
        this.groupChanged.emit('');
    };
    Postnote2App.prototype.openSideBar = function () {
        this._vs._showSideBar = !this._vs._showSideBar;
        this.statusCheckSideBar = this._vs._showSideBar;
        if (this.statusCheckSideBar) {
            this.btnImage = 'icon_back.png';
        }
        else {
            this.btnImage = 'icon_menu.png';
        }
    };
    __decorate([
        core_2.Output(), 
        __metadata('design:type', Object)
    ], Postnote2App.prototype, "groupChanged", void 0);
    Postnote2App = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'postnote2-app',
            providers: [router_deprecated_1.ROUTER_PROVIDERS, data_service_1.DataService, angularfire2_1.AngularFire, localStorage_service_1.LocalStorageService, menugroup_component_1.MenuGroupComponent],
            templateUrl: 'postnote2.component.html',
            styleUrls: ['postnote2.component.css'],
            directives: [router_deprecated_1.ROUTER_DIRECTIVES, note_component_1.NoteComponent, menu_component_1.MenuComponent, group_component_1.GroupComponent, creator_component_1.CreatorComponent, headerbar_component_1.HeaderbarComponent],
            pipes: []
        }),
        __param(0, core_3.Inject(angularfire2_1.FirebaseRef)), 
        __metadata('design:paramtypes', [Firebase, data_service_1.DataService, value_service_1.ValueService, localStorage_service_1.LocalStorageService, menugroup_component_1.MenuGroupComponent])
    ], Postnote2App);
    return Postnote2App;
}());
exports.Postnote2App = Postnote2App;
//# sourceMappingURL=postnote2.component.js.map