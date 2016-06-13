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
var note_1 = require('./note');
var note_component_1 = require('./note.component');
var reverse_pipe_1 = require('./reverse.pipe');
var dropdown_component_1 = require('./dropdown.component');
var angularfire2_1 = require('angularfire2');
var ng2_dragula_1 = require('ng2-dragula/ng2-dragula');
var localstorage_service_1 = require('./localstorage.service');
var first_letter_pipe_1 = require('./first-letter.pipe');
var CreatorComponent = (function () {
    function CreatorComponent(_ds, _ref, _ls) {
        this._ds = _ds;
        this._ref = _ref;
        this._ls = _ls;
        this.title = "";
        this.text = "";
        this.selectedGroup = "noGroup";
        this.categoriesVisible = false;
        this.colorCount = 0;
        this._authData = this._ref.getAuth();
    }
    CreatorComponent.prototype.ngOnInit = function () {
        this.getNotes();
        this.getGroups();
    };
    CreatorComponent.prototype.getGroups = function () {
        var _this = this;
        if (this._authData != null) {
            this._ds.getAllGroups().then(function (groups) { return _this.groups = groups; });
        }
        else {
            this.groups = this._ls.getAllGroups();
        }
    };
    CreatorComponent.prototype.getNotes = function () {
        var _this = this;
        if (this._authData != null) {
            this._ds.getAllNotesInGroup('noGroup').then(function (notes) { return _this.notes = notes; });
        }
        else {
            this.notes = this._ls.getNotesInGroup('noGroup');
        }
    };
    //Emitted from dropdown?
    CreatorComponent.prototype.groupChanged = function (event) {
        //Causes a bug where the creators dropdown changes when you change a notes group?
        this.selectedGroup = event;
    };
    CreatorComponent.prototype.save = function (group) {
        // if (this.title !== '' || this.text !== '') {
        var time = new Date().getTime();
        if (this._authData != null) {
            this._ds.addNoteToNotes("", "", group, time, this.randomColor());
        }
        else {
            var newNote = new note_1.Note("", "", group, time.toString(), this.randomColor());
            this._ls.addNoteToNotes(newNote);
            this.getNotes(); //Update view
        }
        this.categoriesVisible = false;
        // this.title = '';
        // this.text = '';
        // }
    };
    CreatorComponent.prototype.open = function () {
        this.categoriesVisible = !this.categoriesVisible;
    };
    CreatorComponent.prototype.randomColor = function () {
        var colors = ["blue", "magenta", "yellow", "green", "pink", "orange"];
        // if we want to pick a random color.......
        //var color = colors[Math.floor(Math.random()*colors.length)];
        var color = colors[this.colorCount];
        this.colorCount++;
        if (this.colorCount === 6) {
            this.colorCount = 0;
        }
        return color;
    };
    CreatorComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'creator',
            templateUrl: 'creator.component.html',
            styleUrls: ['creator.component.css'],
            directives: [router_deprecated_1.ROUTER_DIRECTIVES, note_component_1.NoteComponent, dropdown_component_1.DropdownComponent, ng2_dragula_1.Dragula],
            pipes: [reverse_pipe_1.Reverse, first_letter_pipe_1.FirstLetter],
            providers: [localstorage_service_1.LocalStorageService]
        }),
        router_deprecated_1.RouteConfig([]),
        __param(1, core_1.Inject(angularfire2_1.FirebaseRef)), 
        __metadata('design:paramtypes', [data_service_1.DataService, Firebase, localstorage_service_1.LocalStorageService])
    ], CreatorComponent);
    return CreatorComponent;
}());
exports.CreatorComponent = CreatorComponent;
//# sourceMappingURL=creator.component.js.map