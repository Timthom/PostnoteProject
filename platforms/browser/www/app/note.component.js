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
//added
var core_2 = require('@angular/core');
var dropdown_component_1 = require('./dropdown.component');
var colorpicker_component_1 = require('./colorpicker.component');
var angularfire2_1 = require('angularfire2');
var localstorage_service_1 = require('./localstorage.service');
var NoteComponent = (function () {
    function NoteComponent(_ref, _ds, _ls) {
        this._ref = _ref;
        this._ds = _ds;
        this._ls = _ls;
        this.isEditable = false;
        this.enabledIfNull = "";
        this.noteSelectedGroup = this.group;
        this.isPink = false;
        this.isMagenta = false;
        this.isOrange = false;
        this.isBlue = false;
        this.isYellow = true;
        this.isGreen = false;
        this._authData = this._ref.getAuth();
    }
    NoteComponent.prototype.ngOnInit = function () {
        this.colorInit(this.color);
    };
    NoteComponent.prototype.editClick = function () {
        //IF TODO
        if (this.isEditable) {
            if (this._authData != null) {
                this._ds.updateNoteTitle(this.noteInNote.$key, this.title);
                this._ds.updateNoteText(this.noteInNote.$key, this.text);
            }
            else {
                this._ls.updateNoteTitle(this.noteInNote.$key, this.title);
                this._ls.updateNoteText(this.noteInNote.$key, this.text);
            }
            this.enabledIfNull = "";
        }
        else {
            this.enabledIfNull = null;
        }
        this.isEditable = !this.isEditable;
    };
    //Emitted from dropdown
    NoteComponent.prototype.noteGroupChanged = function (event) {
        this.noteSelectedGroup = event;
        if (this._authData != null) {
            this._ds.changeNoteGroup(this.noteInNote.$key, this.noteSelectedGroup);
        }
        else {
            this._ls.changeNoteGroup(this.noteInNote.$key, this.noteSelectedGroup);
            //TEMPORARY
            location.reload();
        }
    };
    NoteComponent.prototype.colorChanged = function (event) {
        //IF TODO
        this.colorSwitch(event);
        this.isEditable = true;
        if (this._authData != null) {
            this._ds.updateNoteColor(this.noteInNote.$key, event);
        }
        else {
            this._ls.updateNoteColor(this.noteInNote.$key, event);
        }
    };
    NoteComponent.prototype.resetColors = function () {
        this.isPink = false;
        this.isMagenta = false;
        this.isOrange = false;
        this.isBlue = false;
        this.isYellow = false;
        this.isGreen = false;
    };
    NoteComponent.prototype.colorInit = function (event) {
        this.colorSwitch(event);
    };
    NoteComponent.prototype.colorSwitch = function (event) {
        this.resetColors();
        switch (event) {
            case "pink":
                this.isPink = true;
                break;
            case "magenta":
                this.isMagenta = true;
                break;
            case "orange":
                this.isOrange = true;
                break;
            case "blue":
                this.isBlue = true;
                break;
            case "yellow":
                this.isYellow = true;
                break;
            case "green":
                this.isGreen = true;
                break;
            default:
                this.isYellow = true;
        }
    };
    NoteComponent.prototype.deleteClick = function () {
        if (this._authData != null) {
            this._ds.deleteNote(this.noteInNote.$key);
        }
        else {
            this._ls.deleteNote(this.noteInNote.$key);
            //TEMPORARY
            location.reload();
        }
    };
    __decorate([
        core_2.Input(), 
        __metadata('design:type', Object)
    ], NoteComponent.prototype, "noteInNote", void 0);
    __decorate([
        core_2.Input(), 
        __metadata('design:type', Object)
    ], NoteComponent.prototype, "title", void 0);
    __decorate([
        core_2.Input(), 
        __metadata('design:type', Object)
    ], NoteComponent.prototype, "text", void 0);
    __decorate([
        core_2.Input(), 
        __metadata('design:type', Object)
    ], NoteComponent.prototype, "group", void 0);
    __decorate([
        core_2.Input(), 
        __metadata('design:type', Object)
    ], NoteComponent.prototype, "color", void 0);
    NoteComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'note',
            providers: [router_deprecated_1.ROUTER_PROVIDERS],
            templateUrl: 'note.component.html',
            styleUrls: ['note.component.css'],
            directives: [router_deprecated_1.ROUTER_DIRECTIVES, dropdown_component_1.DropdownComponent, colorpicker_component_1.ColorpickerComponent],
            pipes: []
        }),
        router_deprecated_1.RouteConfig([]),
        __param(0, core_2.Inject(angularfire2_1.FirebaseRef)), 
        __metadata('design:paramtypes', [Firebase, data_service_1.DataService, localstorage_service_1.LocalStorageService])
    ], NoteComponent);
    return NoteComponent;
}());
exports.NoteComponent = NoteComponent;
//# sourceMappingURL=note.component.js.map