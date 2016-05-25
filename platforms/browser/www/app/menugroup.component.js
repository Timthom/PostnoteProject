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
var data_service_1 = require('./data.service');
var core_2 = require('@angular/core');
var angularfire2_1 = require('angularfire2');
var MenuGroupComponent = (function () {
    function MenuGroupComponent(_ref, _ds) {
        this._ref = _ref;
        this._ds = _ds;
        this.arrowSrc = 'icon_expand_white.png';
        this.expanded = false;
        this.editingName = false;
        this._authData = this._ref.getAuth();
    }
    MenuGroupComponent.prototype.ngOnInit = function () {
        if (this._authData != null) {
            this.getNotes();
        }
    };
    MenuGroupComponent.prototype.getNotes = function () {
        var _this = this;
        if (this._authData != null) {
            this._ds.getAllNotesInGroup(this.group.name).then(function (titles) { return _this.notes = titles; });
        }
    };
    MenuGroupComponent.prototype.deleteGroup = function () {
        if (this._authData != null) {
            this._ds.deleteGroup(this.group.$key);
        }
    };
    MenuGroupComponent.prototype.editGroupName = function () {
        if (this._authData != null) {
            this._ds.updateGroupName(this.group.$key, this.group.name);
        }
    };
    MenuGroupComponent.prototype.editGroup = function () {
        if (this._authData != null) {
            this._ds.updateGroupName(this.group.$key, this.group.name);
        }
    };
    //When pressing the edit button, it enables editing on the input field
    MenuGroupComponent.prototype.editing = function () {
        if (this._authData != null) {
            this.editingName = !this.editingName;
            if (this.editingName) {
                document.getElementById(this.group.$key).removeAttribute("readonly");
                document.getElementById(this.group.$key).focus();
            }
            else {
                document.getElementById(this.group.$key).setAttribute("readonly", "true");
                this.editGroup();
            }
        }
    };
    MenuGroupComponent.prototype.toggleExpand = function () {
        this.expanded = !this.expanded;
        if (this.expanded) {
            this.arrowSrc = 'icon_hide_white.png';
        }
        else {
            this.arrowSrc = 'icon_expand_white.png';
        }
    };
    MenuGroupComponent.prototype.jumpToNote = function (note) {
        var element = document.getElementById(note);
        element.scrollIntoView(true);
    };
    MenuGroupComponent.prototype.jumpToGroup = function (groupId) {
        var element = document.getElementById(groupId);
        element.scrollIntoView(true);
        console.log(element);
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], MenuGroupComponent.prototype, "group", void 0);
    MenuGroupComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'menuGroup',
            templateUrl: 'menugroup.component.html',
            styleUrls: ['menugroup.component.css'],
            pipes: []
        }),
        __param(0, core_2.Inject(angularfire2_1.FirebaseRef)), 
        __metadata('design:paramtypes', [Firebase, data_service_1.DataService])
    ], MenuGroupComponent);
    return MenuGroupComponent;
}());
exports.MenuGroupComponent = MenuGroupComponent;
//# sourceMappingURL=menugroup.component.js.map