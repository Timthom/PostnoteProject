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
var note_component_1 = require('./note.component');
var data_service_1 = require('./data.service');
var angularfire2_1 = require('angularfire2');
var core_2 = require('@angular/core');
var value_service_1 = require('./value.service');
var GroupComponent = (function () {
    function GroupComponent(_ref, _ds, _tx) {
        this._ref = _ref;
        this._ds = _ds;
        this._tx = _tx;
        this.clickedDelete = new core_1.EventEmitter();
        this.newName = "";
        this.arrowSrc = 'icon_expand.png';
        this.expanded = this._tx._toggleExpand;
        this.editingName = false;
        this.enableEditIfNull = '';
        this.editSrc = 'icon_edit.png';
        this._authData = this._ref.getAuth();
    }
    GroupComponent.prototype.ngOnInit = function () {
        if (this._authData != null) {
            this.getNotes();
        }
        else {
            console.log("ngOnInit in groupcomponent offline");
        }
    };
    GroupComponent.prototype.getNotes = function () {
        var _this = this;
        if (this._authData != null) {
            this._ds.getAllNotesInGroup(this.groupName).then(function (notes) { return _this.notes = notes; });
        }
        else {
            console.log("getnotes in groupcomponent offline");
        }
    };
    GroupComponent.prototype.getContent = function () {
        if (this._authData != null) {
            var doneInLoopArray_1;
            var arrayOfKeys_1 = [];
            this.notes.forEach(function (result) {
                doneInLoopArray_1 = result;
            });
            doneInLoopArray_1.forEach(function (note) {
                arrayOfKeys_1.push(note.$key);
            });
            return arrayOfKeys_1;
        }
    };
    GroupComponent.prototype.deleteGroup = function () {
        if (this._authData != null) {
            var content = this.getContent();
            for (var _i = 0, content_1 = content; _i < content_1.length; _i++) {
                var key = content_1[_i];
                this._ds.deleteNote(key);
            }
            this._ds.deleteGroup(this.group.$key);
            this.clickedDelete.emit('');
            this._tx._toggleExpand = false;
        }
    };
    //
    GroupComponent.prototype.editGroupName = function () {
        if (this._authData != null) {
            this._ds.updateGroupName(this.group.$key, this.groupName);
        }
        else {
            console.log("editgroupname in groupcomponent offline");
        }
    };
    // Enable inputfield to edit text in field when user click on pen icon else disable inputfield
    GroupComponent.prototype.editClick = function () {
        if (this._authData != null) {
            this.editingName = !this.editingName;
            if (this.editingName) {
                this.enableEditIfNull = null;
                this.editSrc = 'icon_save.png';
            }
            else {
                var content = this.getContent();
                // changes notes in the group to the new group
                for (var _i = 0, content_2 = content; _i < content_2.length; _i++) {
                    var key = content_2[_i];
                    this._ds.changeNoteGroup(key, this.groupName);
                }
                this.enableEditIfNull = '';
                this.editGroupName();
                this.getNotes();
                this.editSrc = 'icon_edit.png';
                this._tx._toggleExpand = false;
            }
        }
        else {
            console.log("enterkey in groupcomponent offline");
        }
    };
    // Expand category on click arrowBtn
    GroupComponent.prototype.groupExpand = function () {
        // Uffes idea:
        if (this.arrowSrc == 'icon_hide.png') {
            this._tx._toggleExpand = false;
        }
        else {
            this._tx._toggleExpand = true;
        }
        this.expanded = this._tx._toggleExpand;
        if (this.expanded) {
            this.arrowSrc = 'icon_hide.png';
        }
        else {
            this.arrowSrc = 'icon_expand.png';
        }
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], GroupComponent.prototype, "group", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], GroupComponent.prototype, "groupName", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], GroupComponent.prototype, "note", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], GroupComponent.prototype, "clickedDelete", void 0);
    GroupComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'group',
            providers: [router_deprecated_1.ROUTER_PROVIDERS],
            templateUrl: 'group.component.html',
            styleUrls: ['group.component.css'],
            directives: [router_deprecated_1.ROUTER_DIRECTIVES, note_component_1.NoteComponent],
            pipes: []
        }),
        router_deprecated_1.RouteConfig([]),
        __param(0, core_2.Inject(angularfire2_1.FirebaseRef)), 
        __metadata('design:paramtypes', [Firebase, data_service_1.DataService, value_service_1.ValueService])
    ], GroupComponent);
    return GroupComponent;
}());
exports.GroupComponent = GroupComponent;
//# sourceMappingURL=group.component.js.map