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
var router_deprecated_1 = require('@angular/router-deprecated');
var data_service_1 = require('./data.service');
//added
var core_2 = require('@angular/core');
var dropdown_component_1 = require('./dropdown.component');
var colorpicker_component_1 = require('./colorpicker.component');
var NoteComponent = (function () {
    function NoteComponent(_ds) {
        this._ds = _ds;
        this.isEditable = false;
        this.enabledIfNull = "";
        this.noteSelectedGroup = this.group;
        this.isPink = false;
        this.isMagenta = false;
        this.isOrange = false;
        this.isBlue = false;
        this.isYellow = true;
        this.isGreen = false;
        //console.log('in constructor');
    }
    NoteComponent.prototype.ngOnInit = function () {
        this.colorInit(this.color);
    };
    NoteComponent.prototype.editClick = function () {
        if (this.isEditable) {
            console.log('updating');
            this._ds.updateNoteTitle(this.noteInNote.$key, this.title);
            this._ds.updateNoteText(this.noteInNote.$key, this.text);
            this.enabledIfNull = "";
        }
        else {
            console.log('notdating');
            this.enabledIfNull = null;
        }
        this.isEditable = !this.isEditable;
    };
    NoteComponent.prototype.noteGroupChanged = function (event) {
        this.noteSelectedGroup = event;
        this._ds.changeNoteGroup(this.noteInNote.$key, this.noteSelectedGroup);
    };
    NoteComponent.prototype.colorChanged = function (event) {
        this.colorSwitch(event);
        this.isEditable = true;
        this._ds.updateNoteColor(this.noteInNote.$key, event);
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
        this._ds.deleteNote(this.noteInNote.$key);
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
        __metadata('design:paramtypes', [data_service_1.DataService])
    ], NoteComponent);
    return NoteComponent;
}());
exports.NoteComponent = NoteComponent;
//# sourceMappingURL=note.component.js.map