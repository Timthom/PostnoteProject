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
var dragula_helper_service_1 = require('./dragula-helper.service');
var NoteComponent = (function () {
    function NoteComponent(_ref, _ds, _ls, _dragulaHelper) {
        this._ref = _ref;
        this._ds = _ds;
        this._ls = _ls;
        this._dragulaHelper = _dragulaHelper;
        this.noteChanged = new core_1.EventEmitter();
        this.isEditable = false;
        this.delete_button = true;
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
        this.isEditable = true;
        this.enabledIfNull = null;
    };
    NoteComponent.prototype.save = function () {
        if (this.noteSelectedGroup == undefined) {
            this.noteSelectedGroup = this.group; //use the same one
        }
        if (this._authData != null) {
            this._ds.updateNoteTitle(this.noteInNote.$key, this.title);
            this._ds.updateNoteText(this.noteInNote.$key, this.text);
            this._ds.changeNoteGroup(this.noteInNote.$key, this.noteSelectedGroup); //moved
            if (this.colorString != undefined) {
                this._ds.updateNoteColor(this.noteInNote.$key, this.colorString); //moved
            }
        }
        else {
            this._ls.updateNoteTitle(this.noteInNote.$key, this.title);
            this._ls.updateNoteText(this.noteInNote.$key, this.text);
            this._ls.changeNoteGroup(this.noteInNote.$key, this.noteSelectedGroup); //moved
            if (this.colorString != undefined) {
                this._ls.updateNoteColor(this.noteInNote.$key, this.colorString); //moved
            }
        }
        this.noteChanged.emit('');
        this.isEditable = false;
        this.enabledIfNull = "";
    };
    //Emitted from dropdown
    NoteComponent.prototype.noteGroupChanged = function (event) {
        var _this = this;
        console.log("h\u00E4r kommer event " + event);
        this.noteSelectedGroup = event;
        if (this._authData != null) {
            var getPosInfo = this._ds.getPositionFromId(this.noteInNote.$key);
            var getOldGroupInfo = this._ds.getGroupNameFromId(this.noteInNote.$key);
            Promise.all([getPosInfo, getOldGroupInfo]).then(function (result) {
                var prevPos = result[0];
                var oldGroup = result[1];
                console.log("prevPos = " + prevPos + ", oldGroup = " + oldGroup + ", newGroup = " + _this.noteSelectedGroup);
                _this._dragulaHelper.groupChangedByDropDown(oldGroup, _this.noteSelectedGroup, prevPos, _this.noteInNote.$key);
                // this._ds.changeNoteGroup(this.noteInNote.$key, this.noteSelectedGroup);
            });
        }
        else {
            this._ls.changeNoteGroup(this.noteInNote.$key, this.noteSelectedGroup);
        }
        //this.noteChanged.emit(''); uppdateras m.h.a. editclick??
    };
    NoteComponent.prototype.colorChanged = function (event) {
        this.colorSwitch(event);
        this.isEditable = true;
        this.colorString = event;
        if (this._authData != null) {
        }
        else {
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
        var o = this;
        if (o._authData != null) {
            var getIdInfo = o._ds.getPositionFromId(o.noteInNote.$key);
            getIdInfo.then(function (prevPos) { return o._dragulaHelper.updatePositionsInGroupAndThenDeleteNoteWhenPressingDelete(o.group, prevPos, o.noteInNote); });
        }
        else {
            o._ls.deleteNote(o.noteInNote.$key);
        }
        ;
        o.noteChanged.emit('');
        this.delete_button = !this.delete_button;
    };
    NoteComponent.prototype.groupsChanged = function () {
        this.dropdownComponents.toArray().forEach(function (child) { return child.getTitles(); });
    };
    __decorate([
        core_1.ViewChildren(dropdown_component_1.DropdownComponent), 
        __metadata('design:type', core_1.QueryList)
    ], NoteComponent.prototype, "dropdownComponents", void 0);
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
    __decorate([
        core_2.Input(), 
        __metadata('design:type', Object)
    ], NoteComponent.prototype, "groups", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], NoteComponent.prototype, "noteChanged", void 0);
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
        __metadata('design:paramtypes', [Firebase, data_service_1.DataService, localstorage_service_1.LocalStorageService, dragula_helper_service_1.DragulaHelperService])
    ], NoteComponent);
    return NoteComponent;
}());
exports.NoteComponent = NoteComponent;
//# sourceMappingURL=note.component.js.map