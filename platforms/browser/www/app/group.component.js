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
var GroupComponent = (function () {
    function GroupComponent(_ref, _ds) {
        this._ref = _ref;
        this._ds = _ds;
        this.clickedDelete = new core_1.EventEmitter();
        this.newName = "";
        this.arrowSrc = 'icon_expand.png';
        this.expanded = false;
        this._authData = this._ref.getAuth();
    }
    GroupComponent.prototype.ngOnInit = function () {
        if (this._authData != null) {
            this.getNotes();
        }
    };
    GroupComponent.prototype.getNotes = function () {
        var _this = this;
        if (this._authData != null) {
            this._ds.getAllNotesInGroup(this.groupName).then(function (notes) { return _this.notes = notes; });
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
        var content = this.getContent();
        for (var _i = 0, content_1 = content; _i < content_1.length; _i++) {
            var key = content_1[_i];
            this._ds.deleteNote(key);
        }
        this._ds.deleteGroup(this.group.$key);
        this.clickedDelete.emit('');
    };
    GroupComponent.prototype.editGroupName = function () {
        if (this._authData != null) {
            this._ds.updateGroupName(this.group.$key, this.groupName);
        }
    };
    GroupComponent.prototype.changeNotesInTheGroup = function (id) {
        this._ds.changeNoteGroup(id, this.groupName);
    };
    GroupComponent.prototype.enterKey = function (key) {
        if (this._authData != null) {
            if (key === 13) {
                var content = this.getContent();
                for (var _i = 0, content_2 = content; _i < content_2.length; _i++) {
                    var key_1 = content_2[_i];
                    console.log('key: ' + key_1);
                    this._ds.changeNoteGroup(key_1, this.groupName);
                }
                this.editGroupName();
                this.getNotes();
            }
        }
    };
    // Expand category on click arrowBtn
    GroupComponent.prototype.toggleExpand = function () {
        this.expanded = !this.expanded;
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
        __metadata('design:paramtypes', [Firebase, data_service_1.DataService])
    ], GroupComponent);
    return GroupComponent;
}());
exports.GroupComponent = GroupComponent;
//# sourceMappingURL=group.component.js.map