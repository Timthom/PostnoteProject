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
var LocalStorageService = (function () {
    function LocalStorageService() {
        this.notes = new Array;
        this.groups = new Array;
        if (!localStorage.getItem("savedNotes")) {
            this.notes = [];
        }
        else {
            this.notes = this.getAllNotes();
        }
        if (!localStorage.getItem("savedGroups")) {
            this.groups = [];
        }
        else {
            this.groups = this.getAllGroups();
        }
    }
    LocalStorageService.prototype.getAllGroups = function () {
        if (JSON.parse(localStorage.getItem("savedGroups"))) {
            this.groups = JSON.parse(localStorage.getItem("savedGroups"));
            return this.groups;
        }
        else {
            return [];
        }
    };
    LocalStorageService.prototype.saveGroup = function (group) {
        this.groups.push(group);
        localStorage.setItem("savedGroups", JSON.stringify(this.groups));
    };
    LocalStorageService.prototype.deleteGroup = function (groupkey) {
        //The notes in group are removed in the components before this method is called
        for (var item in this.groups) {
            if (groupkey == this.groups[item].$key) {
                this.groups.splice(item, 1);
                localStorage.setItem("savedGroups", JSON.stringify(this.groups));
                //TO DO : Refresha menyn!
                return;
            }
        }
    };
    LocalStorageService.prototype.updateGroupName = function (groupkey, newName) {
        var oldGroupName;
        for (var item in this.groups) {
            if (groupkey == this.groups[item].$key) {
                oldGroupName = this.groups[item].name;
                this.groups[item].name = newName;
                localStorage.setItem("savedGroups", JSON.stringify(this.groups));
            }
        }
        for (var item in this.notes) {
            if (oldGroupName == this.notes[item].group) {
                this.changeNoteGroup(this.notes[item].$key, newName); //change to new
            }
        }
        localStorage.setItem("savedNotes", JSON.stringify(this.notes));
    };
    LocalStorageService.prototype.getAllNotes = function () {
        this.notes = JSON.parse(localStorage.getItem("savedNotes"));
        return this.notes;
    };
    LocalStorageService.prototype.getNotesInGroup = function (groupName) {
        if (localStorage.getItem("savedNotes")) {
            this.notes = JSON.parse(localStorage.getItem("savedNotes"));
            var groupNotes = new Array;
            for (var _i = 0, _a = this.notes; _i < _a.length; _i++) {
                var item = _a[_i];
                if (item.group === groupName) {
                    groupNotes.push(item);
                }
            }
            return groupNotes;
        }
        else {
            return [];
        }
    };
    LocalStorageService.prototype.changeNoteGroup = function (key, newGroup) {
        for (var item in this.notes) {
            if (key == this.notes[item].$key) {
                this.notes[item].group = newGroup;
                localStorage.setItem("savedNotes", JSON.stringify(this.notes));
                return;
            }
        }
    };
    LocalStorageService.prototype.addNoteToNotes = function (note) {
        this.notes.push(note);
        localStorage.setItem("savedNotes", JSON.stringify(this.notes));
        console.log("ADD NOTE TO LS");
    };
    LocalStorageService.prototype.deleteNote = function (key) {
        for (var item in this.notes) {
            if (key == this.notes[item].$key) {
                this.notes.splice(item, 1);
                localStorage.setItem("savedNotes", JSON.stringify(this.notes));
                //TO DO : Refresha
                return;
            }
        }
    };
    LocalStorageService.prototype.updateNoteTitle = function (noteKey, newTitle) {
        for (var item in this.notes) {
            if (noteKey == this.notes[item].$key) {
                this.notes[item].title = newTitle;
                localStorage.setItem("savedNotes", JSON.stringify(this.notes));
                //TO DO : Refresha
                return;
            }
        }
    };
    LocalStorageService.prototype.updateNoteText = function (noteKey, newText) {
        for (var item in this.notes) {
            if (noteKey == this.notes[item].$key) {
                this.notes[item].text = newText;
                localStorage.setItem("savedNotes", JSON.stringify(this.notes));
                //TO DO : Refresha
                return;
            }
        }
    };
    LocalStorageService.prototype.updateNoteColor = function (noteKey, color) {
        for (var item in this.notes) {
            if (noteKey == this.notes[item].$key) {
                this.notes[item].color = color;
                localStorage.setItem("savedNotes", JSON.stringify(this.notes));
                //TO DO : Refresha
                return;
            }
        }
    };
    //For testing.... 
    LocalStorageService.prototype.clearing = function () {
        this.groups = [];
        localStorage.setItem("savedGroups", JSON.stringify(this.groups));
        this.notes = [];
        localStorage.setItem("savedNotes", JSON.stringify(this.notes));
    };
    LocalStorageService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], LocalStorageService);
    return LocalStorageService;
}());
exports.LocalStorageService = LocalStorageService;
//# sourceMappingURL=localstorage.service.js.map