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
var value_service_1 = require('./value.service');
var localstorage_service_1 = require('./localstorage.service');
var ng2_dragula_1 = require('ng2-dragula/ng2-dragula');
var MenuGroupComponent = (function () {
    function MenuGroupComponent(_ref, _ds, _tx, _ls) {
        this._ref = _ref;
        this._ds = _ds;
        this._tx = _tx;
        this._ls = _ls;
        this.arrowSrc = 'icon_expand.png';
        this.editingName = false;
        this.editSrc = 'icon_edit.png';
        this.groupsChanged = new core_1.EventEmitter();
        this._authData = this._ref.getAuth();
    }
    MenuGroupComponent.prototype.ngOnInit = function () {
        this.getNotes();
    };
    MenuGroupComponent.prototype.saveId = function () {
        this._tx._focusedId = this.group.$key;
    };
    MenuGroupComponent.prototype.getNotes = function () {
        var _this = this;
        if (this._authData != null) {
            this._ds.getAllNotesInGroup(this.group.name).then(function (titles) { return _this.notes = titles; });
        }
        else {
            this.notes = this._ls.getNotesInGroup(this.group.name);
        }
    };
    MenuGroupComponent.prototype.deleteGroup = function () {
        console.log("DELETE GROUP");
        //remove from shared model
        for (var item in this.groups) {
            console.log("CHECKING " + this.groups[item].$key);
            if (this.group.$key == this.groups[item].$key) {
                console.log("REMOVING no " + item);
                this.groups.splice(item, 1);
                break;
            }
        }
        //remove from firebase
        if (this._authData != null) {
            this._ds.deleteGroup(this._tx._focusedId);
        }
        else {
            this._ls.deleteGroup(this._tx._focusedId);
        }
        this._tx._toggleExpand = false;
        this.groupsChanged.emit(this.groups);
    };
    MenuGroupComponent.prototype.editGroup = function () {
        if (this._authData != null) {
            this._ds.updateGroupName(this.group.$key, this.group.name);
        }
        else {
            this._ls.updateGroupName(this.group.$key, this.group.name);
        }
        //this.groupsChanged.emit('');
    };
    MenuGroupComponent.prototype.getContent = function () {
        var doneInLoopArray;
        var arrayOfKeys = [];
        this.notes.forEach(function (result) {
            doneInLoopArray = result;
        });
        doneInLoopArray.forEach(function (note) {
            arrayOfKeys.push(note.$key);
        });
        return arrayOfKeys;
    };
    //When pressing the edit button, it enables editing on the input field
    MenuGroupComponent.prototype.editing = function () {
        this.editingName = !this.editingName;
        if (this.editingName) {
            document.getElementById(this.group.$key).removeAttribute("readonly");
            document.getElementById(this.group.$key).focus();
            this.editSrc = 'icon_save.png';
        }
        else {
            document.getElementById(this.group.$key).setAttribute("readonly", "true");
            if (this._authData != null) {
                var content = this.getContent();
                // changes notes in the group to the new group
                for (var _i = 0, content_1 = content; _i < content_1.length; _i++) {
                    var key = content_1[_i];
                    this._ds.changeNoteGroup(key, this.group.name);
                }
            }
            else {
                for (var _a = 0, _b = this.notes; _a < _b.length; _a++) {
                    var note = _b[_a];
                    this._ls.changeNoteGroup(note.$key, this.group.name);
                }
            }
            this.editSrc = 'icon_edit.png';
            this.editGroup();
            this.getNotes();
            this._tx._toggleExpand = false;
        }
    };
    MenuGroupComponent.prototype.toggleExpand = function () {
        if (this.arrowSrc == 'icon_hide.png') {
            this.expanded = false;
        }
        else {
            this.expanded = true;
        }
        // this.expanded = this._tx._toggleExpand;
        if (this.expanded) {
            this.arrowSrc = 'icon_hide.png';
        }
        else {
            this.arrowSrc = 'icon_expand.png';
        }
    };
    MenuGroupComponent.prototype.jumpToNote = function (note) {
        var element = document.getElementById(note);
        element.scrollIntoView(true);
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], MenuGroupComponent.prototype, "groups", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], MenuGroupComponent.prototype, "group", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], MenuGroupComponent.prototype, "groupsChanged", void 0);
    MenuGroupComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'menuGroup',
            providers: [localstorage_service_1.LocalStorageService, ng2_dragula_1.Dragula],
            templateUrl: 'menugroup.component.html',
            styleUrls: ['menugroup.component.css'],
            pipes: []
        }),
        __param(0, core_2.Inject(angularfire2_1.FirebaseRef)), 
        __metadata('design:paramtypes', [Firebase, data_service_1.DataService, value_service_1.ValueService, localstorage_service_1.LocalStorageService])
    ], MenuGroupComponent);
    return MenuGroupComponent;
}());
exports.MenuGroupComponent = MenuGroupComponent;
//# sourceMappingURL=menugroup.component.js.map