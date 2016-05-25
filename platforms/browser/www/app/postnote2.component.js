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
var creator_component_1 = require('./creator.component');
var headerbar_component_1 = require('./headerbar/headerbar.component');
var value_service_1 = require('./value.service');
var core_2 = require('@angular/core');
var Postnote2App = (function () {
    function Postnote2App(_ref, _ds, _vs) {
        this._ref = _ref;
        this._ds = _ds;
        this._vs = _vs;
        this.statusCheckSideBar = this._vs._showSideBar;
        console.log("Här är auth data: " + this._ref.getAuth());
        this._authData = this._ref.getAuth();
        console.log("Här är auth data 2: " + this._authData);
    }
    Postnote2App.prototype.routerCanReuse = function () {
        return false;
    };
    Postnote2App.prototype.ngOnInit = function () {
        if (this._authData != null) {
            this.getGroups();
            console.log("Bör inte köras");
        }
    };
    Postnote2App.prototype.getGroups = function () {
        var _this = this;
        if (this._authData != null) {
            console.log('inne i get groups');
            this._ds.getAllGroups().then(function (groups) { return _this.allGroups = groups; });
            console.log("Bör inte köras");
        }
    };
    Postnote2App.prototype.addGroup = function () {
        this.getGroups();
    };
    Postnote2App.prototype.deleteGroup = function () {
        this.getGroups();
    };
    Postnote2App.prototype.openSideBar = function (event) {
        this._vs._showSideBar = !this._vs._showSideBar;
        this.statusCheckSideBar = this._vs._showSideBar;
    };
    Postnote2App = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'postnote2-app',
            providers: [router_deprecated_1.ROUTER_PROVIDERS, data_service_1.DataService, angularfire2_1.AngularFire],
            templateUrl: 'postnote2.component.html',
            styleUrls: ['postnote2.component.css'],
            directives: [router_deprecated_1.ROUTER_DIRECTIVES, note_component_1.NoteComponent, menu_component_1.MenuComponent, group_component_1.GroupComponent, creator_component_1.CreatorComponent, headerbar_component_1.HeaderbarComponent],
            pipes: []
        }),
        __param(0, core_2.Inject(angularfire2_1.FirebaseRef)), 
        __metadata('design:paramtypes', [Firebase, data_service_1.DataService, value_service_1.ValueService])
    ], Postnote2App);
    return Postnote2App;
}());
exports.Postnote2App = Postnote2App;
//# sourceMappingURL=postnote2.component.js.map