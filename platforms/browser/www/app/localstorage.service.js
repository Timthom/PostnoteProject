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
        console.log("inne i LocalStorageService constructor");
        if (!localStorage.getItem("savedNotes")) {
            this.notes = [];
        }
        else {
            this.notes = this.getAllNotes();
        }
        this.groups = this.getAllGroups();
    }
    LocalStorageService.prototype.getAllNotes = function () {
        this.notes = JSON.parse(localStorage.getItem("savedNotes"));
        return this.notes;
    };
    LocalStorageService.prototype.getAllGroups = function () {
        this.groups = JSON.parse(localStorage.getItem("savedGroups"));
        return this.groups;
    };
    LocalStorageService.prototype.saveGroup = function (group) {
        this.groups.push(group);
        localStorage.setItem("savedGroups", JSON.stringify(this.groups));
    };
    LocalStorageService.prototype.getNotesInGroup = function () {
        //GET all notes in each group!?
    };
    LocalStorageService.prototype.deleteGroup = function (groupkey) {
        console.log(groupkey);
        for (var item in this.groups) {
            console.log(item);
            if (groupkey == this.groups[item].$key) {
                this.groups.splice(item, 1);
                console.log(this.groups);
                localStorage.setItem("savedGroups", JSON.stringify(this.groups));
                //TO DO : Refresha menyn!
                return;
            }
        }
    };
    LocalStorageService.prototype.updateGroupName = function (groupkey, newName) {
        for (var item in this.groups) {
            if (groupkey == this.groups[item].$key) {
                this.groups[item].name = newName;
                localStorage.setItem("savedGroups", JSON.stringify(this.groups));
                return;
            }
        }
    };
    LocalStorageService.prototype.addNoteToNotes = function (note) {
        this.notes.push(note);
        localStorage.setItem("savedNotes", JSON.stringify(this.notes));
        console.log(this.notes);
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