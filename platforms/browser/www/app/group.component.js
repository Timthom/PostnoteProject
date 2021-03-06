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
var reverse_pipe_1 = require('./reverse.pipe');
var sort_notes_pipe_1 = require('./sort-notes.pipe');
var value_service_1 = require('./value.service');
var ng2_dragula_1 = require('ng2-dragula/ng2-dragula');
var localstorage_service_1 = require('./localstorage.service');
var ng2_toastr_1 = require('ng2-toastr/ng2-toastr');
var GroupComponent = (function () {
    function GroupComponent(_ref, _ds, _tx, _ls, toastr) {
        this._ref = _ref;
        this._ds = _ds;
        this._tx = _tx;
        this._ls = _ls;
        this.toastr = toastr;
        this.clickedDelete = new core_1.EventEmitter();
        this.notesChanged = new core_1.EventEmitter();
        this.newName = "";
        this.arrowSrc = 'icon_expand.png';
        this.expanded = this._tx._toggleExpand;
        this.editingName = false;
        this.enableEditIfNull = '';
        this.editSrc = 'icon_edit.png';
        this._authData = this._ref.getAuth();
    }
    GroupComponent.prototype.ngOnInit = function () {
        this.getNotes();
    };
    GroupComponent.prototype.saveId = function () {
        this._tx._focusedId = this.group.$key;
        this._tx._focusedNoteKeys = this.getContent();
    };
    GroupComponent.prototype.getNotes = function () {
        var _this = this;
        if (this._authData != null) {
            this._ds.getAllNotesInGroup(this.groupName).then(function (notes) { return _this.notes = notes; });
        }
        else {
            this.notes = this._ls.getNotesInGroup(this.groupName);
        }
    };
    GroupComponent.prototype.getContent = function () {
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
    GroupComponent.prototype.deleteGroup = function () {
        for (var item in this.groups) {
            if (this._tx._focusedId == this.groups[item].$key) {
                this.groups.splice(item, 1);
                break;
            }
        }
        if (this._authData != null) {
            //To be able to iterate through all notes
            //Remove all notes in group
            for (var _i = 0, _a = this._tx._focusedNoteKeys; _i < _a.length; _i++) {
                var key = _a[_i];
                this._ds.deleteNote(key);
            }
            this._ds.deleteGroup(this._tx._focusedId);
        }
        else {
            //Removes notes of the group
            for (var _b = 0, _c = this._tx._focusedNoteKeys; _b < _c.length; _b++) {
                var note = _c[_b];
                this._ls.deleteNote(note);
            }
            this._ls.deleteGroup(this._tx._focusedId);
        }
        this._tx._toggleExpand = false;
        this.clickedDelete.emit('');
    };
    GroupComponent.prototype.editGroupName = function () {
        //change name in shared model
        for (var index in this.groups) {
            if (this.group.$key == this.groups[index].$key) {
                this.groups[index].name = this.groupName;
                break;
            }
        }
        if (this._authData != null) {
            this._ds.updateGroupName(this.group.$key, this.groupName);
        }
        else {
            this._ls.updateGroupName(this.group.$key, this.groupName);
        }
        this.clickedDelete.emit(''); //Also works for edits!
        this.toastr.success('Group-name updated!');
    };
    // Enable inputfield to edit text in field when user click on pen icon else disable inputfield
    GroupComponent.prototype.editClick = function () {
        this.editingName = !this.editingName;
        if (this.editingName) {
            this.enableEditIfNull = null;
            this.editSrc = 'icon_save.png';
        }
        else {
            if (this._authData != null) {
                var content = this.getContent();
                // changes notes in the group to the new group
                for (var _i = 0, content_1 = content; _i < content_1.length; _i++) {
                    var key = content_1[_i];
                    this._ds.changeNoteGroup(key, this.groupName);
                }
            }
            else {
                for (var _a = 0, _b = this.notes; _a < _b.length; _a++) {
                    var note = _b[_a];
                    this._ls.changeNoteGroup(note.$key, this.groupName);
                }
            }
            this.enableEditIfNull = '';
            this.editGroupName();
            this.getNotes();
            this.editSrc = 'icon_edit.png';
        }
    };
    // Expand category on click arrowBtn
    GroupComponent.prototype.groupExpand = function () {
        // Uffes idea:"
        if (!this.editingName) {
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
        }
    };
    GroupComponent.prototype.emitNotes = function (groups) {
        this.notesChanged.emit('');
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
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], GroupComponent.prototype, "notesChanged", void 0);
    GroupComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'group',
            providers: [router_deprecated_1.ROUTER_PROVIDERS, localstorage_service_1.LocalStorageService, ng2_toastr_1.ToastsManager],
            templateUrl: 'group.component.html',
            styleUrls: ['group.component.css'],
            directives: [router_deprecated_1.ROUTER_DIRECTIVES, note_component_1.NoteComponent, ng2_dragula_1.Dragula],
            pipes: [reverse_pipe_1.Reverse, sort_notes_pipe_1.SortNotes]
        }),
        router_deprecated_1.RouteConfig([]),
        __param(0, core_2.Inject(angularfire2_1.FirebaseRef)), 
        __metadata('design:paramtypes', [Firebase, data_service_1.DataService, value_service_1.ValueService, localstorage_service_1.LocalStorageService, ng2_toastr_1.ToastsManager])
    ], GroupComponent);
    return GroupComponent;
}());
exports.GroupComponent = GroupComponent;
//# sourceMappingURL=group.component.js.map