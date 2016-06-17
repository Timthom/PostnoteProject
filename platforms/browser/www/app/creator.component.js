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
var sort_notes_pipe_1 = require('./sort-notes.pipe');
var dropdown_component_1 = require('./dropdown.component');
var angularfire2_1 = require('angularfire2');
var ng2_dragula_1 = require('ng2-dragula/ng2-dragula');
var localstorage_service_1 = require('./localstorage.service');
var first_letter_pipe_1 = require('./first-letter.pipe');
var ng2_toastr_1 = require('ng2-toastr/ng2-toastr');
var ng2_cookies_1 = require('ng2-cookies/ng2-cookies');
var CreatorComponent = (function () {
    function CreatorComponent(_ds, _ref, _ls, toastr) {
        this._ds = _ds;
        this._ref = _ref;
        this._ls = _ls;
        this.toastr = toastr;
        this.notesChanged = new core_1.EventEmitter();
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
        if (this.visits()) {
            var time = new Date().getTime();
            var newNote = new note_1.Note("Welcome!!", "This is your first time here at PostNote, you can choose to log in or create your own account or you can just start using the app right now only on this device by using the addbutton in the bottom corner to add new notes like this one, or add a new category in the menu to the left!\nHave fun!", "noGroup", time.toString(), this.randomColor());
            this._ls.addNoteToNotes(newNote);
            this.notesChanged.emit('');
        }
    };
    CreatorComponent.prototype.getGroups = function () {
        var _this = this;
        var token = localStorage.getItem('token');
        if (this._authData != null && token != null) {
            this._ds.getAllGroups().then(function (groups) { return _this.groups = groups; });
        }
        else {
            this.groups = this._ls.getAllGroups();
        }
    };
    CreatorComponent.prototype.getNotes = function () {
        var _this = this;
        var token = localStorage.getItem('token');
        if (this._authData != null && token != null) {
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
        var time = new Date().getTime();
        if (this._authData != null) {
            this._ds.addNoteToNotes("new note", "", group, time, this.randomColor());
        }
        else {
            var newNote = new note_1.Note("new note", "", group, time.toString(), this.randomColor());
            this._ls.addNoteToNotes(newNote);
            this.notesChanged.emit('');
        }
        this.getNotes(); //Update view
        this.categoriesVisible = false;
        if (group == "noGroup") {
            this.toastr.success('A new note was created');
        }
        else {
            this.toastr.success('A new note was created in ' + group);
        }
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
    CreatorComponent.prototype.hideCategoryButtons = function () {
        this.categoriesVisible = false;
    };
    CreatorComponent.prototype.noteChanged = function () {
        this.notesChanged.emit('');
        this.getNotes();
    };
    CreatorComponent.prototype.groupsChanged = function () {
        this.noteComponents.toArray().forEach(function (child) { return child.groupsChanged(); });
        this.getGroups();
    };
    CreatorComponent.prototype.visits = function () {
        var count = ng2_cookies_1.Cookie.get('count');
        if (count == null) {
            ng2_cookies_1.Cookie.set('count', '1');
            console.log("first time here");
            return true;
        }
        else {
            var newcount = +count + 1;
            ng2_cookies_1.Cookie.delete('count');
            ng2_cookies_1.Cookie.set('count', 'newcount', 1000000);
            console.log("not first time here");
            return false;
        }
    };
    __decorate([
        core_1.ViewChildren(note_component_1.NoteComponent), 
        __metadata('design:type', core_1.QueryList)
    ], CreatorComponent.prototype, "noteComponents", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], CreatorComponent.prototype, "notesChanged", void 0);
    CreatorComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'creator',
            templateUrl: 'creator.component.html',
            styleUrls: ['creator.component.css'],
            directives: [router_deprecated_1.ROUTER_DIRECTIVES, note_component_1.NoteComponent, dropdown_component_1.DropdownComponent, ng2_dragula_1.Dragula],
            pipes: [reverse_pipe_1.Reverse, first_letter_pipe_1.FirstLetter, sort_notes_pipe_1.SortNotes],
            providers: [localstorage_service_1.LocalStorageService, ng2_cookies_1.Cookie]
        }),
        router_deprecated_1.RouteConfig([]),
        __param(1, core_1.Inject(angularfire2_1.FirebaseRef)), 
        __metadata('design:paramtypes', [data_service_1.DataService, Firebase, localstorage_service_1.LocalStorageService, ng2_toastr_1.ToastsManager])
    ], CreatorComponent);
    return CreatorComponent;
}());
exports.CreatorComponent = CreatorComponent;
//# sourceMappingURL=creator.component.js.map