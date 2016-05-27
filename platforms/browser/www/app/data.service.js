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
var angularfire2_1 = require('angularfire2');
var DataService = (function () {
    function DataService(_ref, _af) {
        this._ref = _ref;
        this._af = _af;
        console.log("NU KÖR CONSTRUCTORN!!!");
        console.log("Här är auth data: " + this._ref.getAuth());
        if (this._ref.getAuth() == null)
            return;
        if (localStorage.getItem('token') == null)
            return;
        console.log("Skrivs ej ut???");
        var token = localStorage.getItem('token');
        this._ref.authWithCustomToken(token, function (error, authData) {
            if (error) {
                console.log("Authentication Failed!", error);
            }
            else {
                console.log("Authenticated successfully with payload:", authData);
            }
        }, { remember: "sessionOnly"
        });
        var authData = _ref.getAuth();
        console.log(authData);
        this._afNotes = _af.database.list('/users/' + authData.uid + '/notes');
        this._afGroups = _af.database.list('/users/' + authData.uid + '/groups', {
            query: {
                orderByChild: 'timeStamp'
            }
        });
        this._notes = _ref.child('/users/' + authData.uid + '/notes');
        this._groups = _ref.child('/users/' + authData.uid + '/groups');
        console.log("inne i dataservice konstruktor");
    }
    //returns all notes in the DB...
    DataService.prototype.getAllNotes = function () {
        console.log("Körs typ detta eller vad händer!??!?!?!");
        if (this._ref.getAuth() == null)
            return;
        var token = localStorage.getItem('token');
        this._ref.authWithCustomToken(token, function (error, authData) {
            if (error) {
                console.log("Authentication Failed!", error);
            }
            else {
                console.log("Authenticated successfully with payload:", authData);
            }
        }, { remember: "sessionOnly"
        });
        console.log(token);
        return Promise.resolve(this._afNotes);
    };
    //adds a new note(FirebaseListObservable with random id) to the database...
    DataService.prototype.addNoteToNotes = function (title, text, group, time, color) {
        if (this._ref.getAuth() == null)
            return;
        var token = localStorage.getItem('token');
        this._ref.authWithCustomToken(token, function (error, authData) {
            if (error) {
                console.log("Authentication Failed!", error);
            }
            else {
                console.log("Authenticated successfully with payload:", authData);
            }
        }, { remember: "sessionOnly"
        });
        console.log(token);
        console.log(this._notes.ref);
        this._notes.push({ 'title': title, 'text': text, 'group': group, 'timeStamp': (time * -1), 'color': color });
        console.log(Firebase);
    };
    //updates the notes title with the chosen id...
    DataService.prototype.updateNoteTitle = function (id, newTitle) {
        if (this._ref.getAuth() == null)
            return;
        var token = localStorage.getItem('token');
        this._ref.authWithCustomToken(token, function (error, authData) {
            if (error) {
                console.log("Authentication Failed!", error);
            }
            else {
                console.log("Authenticated successfully with payload:", authData);
            }
        }, { remember: "sessionOnly"
        });
        this._notes.child(id).update({ 'title': newTitle });
    };
    //updates the notes text with the chosen id...
    DataService.prototype.updateNoteText = function (id, newText) {
        if (this._ref.getAuth() == null)
            return;
        var token = localStorage.getItem('token');
        this._ref.authWithCustomToken(token, function (error, authData) {
            if (error) {
                console.log("Authentication Failed!", error);
            }
            else {
                console.log("Authenticated successfully with payload:", authData);
            }
        }, { remember: "sessionOnly"
        });
        this._notes.child(id).update({ 'text': newText });
    };
    //updates notes backgroundcolor...
    DataService.prototype.updateNoteColor = function (id, color) {
        this._notes.child(id).update({ 'color': color });
    };
    //deletes the note with the chosen id...
    DataService.prototype.deleteNote = function (id) {
        if (this._ref.getAuth() == null)
            return;
        var token = localStorage.getItem('token');
        this._notes.authWithCustomToken(token, function (error, authData) {
            if (error) {
                console.log("Authentication Failed!", error);
            }
            else {
                console.log("Authenticated successfully with payload:", authData);
            }
        }, { remember: "sessionOnly"
        });
        this._notes.child(id).remove();
    };
    //returns every Note based on category
    DataService.prototype.getAllNotesInGroup = function (groupName) {
        if (this._ref.getAuth() == null)
            return;
        var token = localStorage.getItem('token');
        this._ref.authWithCustomToken(token, function (error, authData) {
            if (error) {
                console.log("Authentication Failed!", error);
            }
            else {
                console.log("Authenticated successfully with payload:", authData);
            }
        }, { remember: "sessionOnly"
        });
        var authData = this._ref.getAuth();
        console.log(authData);
        var tempObservable = this._af.database.list('/users/' + authData.uid + '/notes', {
            query: {
                orderByChild: 'group',
                equalTo: groupName
            }
        });
        return Promise.resolve(tempObservable);
    };
    //returns all groups in the DB...
    DataService.prototype.getAllGroups = function () {
        if (this._ref.getAuth() == null)
            return;
        var token = localStorage.getItem('token');
        this._ref.authWithCustomToken(token, function (error, authData) {
            if (error) {
                console.log("Authentication Failed!", error);
            }
            else {
                console.log("Authenticated successfully with payload:", authData);
            }
        }, { remember: "sessionOnly"
        });
        return Promise.resolve(this._afGroups);
    };
    //adds a new group(FirebaseListObservable with random id) to the database. 
    DataService.prototype.addGroupToGroups = function (name, time) {
        if (this._ref.getAuth() == null)
            return;
        var token = localStorage.getItem('token');
        this._ref.authWithCustomToken(token, function (error, authData) {
            if (error) {
                console.log("Authentication Failed!", error);
            }
            else {
                console.log("Authenticated successfully with payload:", authData);
            }
        }, { remember: "sessionOnly"
        });
        this._groups.push({ 'name': name, 'timeStamp': (time * -1) });
    };
    //updates the group name with the chosen id...
    DataService.prototype.updateGroupName = function (id, name) {
        var token = localStorage.getItem('token');
        this._ref.authWithCustomToken(token, function (error, authData) {
            if (error) {
                console.log("Authentication Failed!", error);
            }
            else {
                console.log("Authenticated successfully with payload:", authData);
            }
        }, { remember: "sessionOnly"
        });
        this._groups.child(id).update({ 'name': name });
    };
    //deletes the group with the chosen id...
    DataService.prototype.deleteGroup = function (id) {
        var token = localStorage.getItem('token');
        this._ref.authWithCustomToken(token, function (error, authData) {
            if (error) {
                console.log("Authentication Failed!", error);
            }
            else {
                console.log("Authenticated successfully with payload:", authData);
            }
        }, { remember: "sessionOnly"
        });
        this._groups.child(id).remove();
    };
    //changes the notes group resident...
    DataService.prototype.changeNoteGroup = function (id, group) {
        var token = localStorage.getItem('token');
        this._notes.authWithCustomToken(token, function (error, authData) {
            if (error) {
                console.log("Authentication Failed!", error);
            }
            else {
                console.log("Authenticated successfully with payload:", authData);
            }
        }, { remember: "sessionOnly"
        });
        this._notes.child(id).update({ 'group': group });
    };
    DataService = __decorate([
        core_1.Injectable(),
        __param(0, core_1.Inject(angularfire2_1.FirebaseRef)), 
        __metadata('design:paramtypes', [Firebase, angularfire2_1.AngularFire])
    ], DataService);
    return DataService;
}());
exports.DataService = DataService;
//# sourceMappingURL=data.service.js.map