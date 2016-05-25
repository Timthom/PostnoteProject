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
var note_component_1 = require('./note.component');
var reverse_pipe_1 = require('./reverse.pipe');
var dropdown_component_1 = require('./dropdown.component');
var angularfire2_1 = require('angularfire2');
var CreatorComponent = (function () {
    function CreatorComponent(_ds, _ref) {
        this._ds = _ds;
        this._ref = _ref;
        this.title = "";
        this.text = "";
        this.selectedGroup = "noGroup";
        this._authData = this._ref.getAuth();
        console.log("inne i creatorcomponents konstruktor");
    }
    CreatorComponent.prototype.ngOnInit = function () {
        console.log("inne i OnInit i creatorcomponent...");
        if (this._authData != null) {
            console.log("Bör inte köras");
            this.getNotes();
        }
    };
    CreatorComponent.prototype.getNotes = function () {
        var _this = this;
        if (this._authData != null) {
            console.log("Bör inte köras");
            console.log("inne i getNotes i creatorcomponent");
            this._ds.getAllNotesInGroup('noGroup').then(function (notes) { return _this.notes = notes; });
        }
    };
    CreatorComponent.prototype.groupChanged = function (event) {
        if (this._authData != null) {
            console.log("Bör inte köras");
            this.selectedGroup = event;
        }
    };
    CreatorComponent.prototype.save = function () {
        if (this._authData != null) {
            console.log("Bör inte köras");
            if (this.title !== '') {
                var time = new Date().getTime();
                this._ds.addNoteToNotes(this.title, this.text, this.selectedGroup, time, "yellow");
                this.title = '';
                this.text = '';
            }
        }
    };
    CreatorComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'creator',
            templateUrl: 'creator.component.html',
            styleUrls: ['creator.component.css'],
            directives: [router_deprecated_1.ROUTER_DIRECTIVES, note_component_1.NoteComponent, dropdown_component_1.DropdownComponent],
            pipes: [reverse_pipe_1.Reverse],
            providers: []
        }),
        router_deprecated_1.RouteConfig([]),
        __param(1, core_1.Inject(angularfire2_1.FirebaseRef)), 
        __metadata('design:paramtypes', [data_service_1.DataService, Firebase])
    ], CreatorComponent);
    return CreatorComponent;
}());
exports.CreatorComponent = CreatorComponent;
//# sourceMappingURL=creator.component.js.map