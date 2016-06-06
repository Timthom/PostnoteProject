import { Injectable, Inject } from '@angular/core';
import { Note } from './note';
import { AngularFire, defaultFirebase, FirebaseRef, FirebaseListObservable } from 'angularfire2';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class DataService {
    _notes: Firebase;
    _groups: Firebase;
    _afNotes: FirebaseListObservable<any[]>;
    _afGroups: FirebaseListObservable<any[]>;
    _afUserInfo: FirebaseListObservable<any[]>;

    constructor( @Inject(FirebaseRef) private _ref: Firebase, private _af: AngularFire) {
        console.log("NU KÖR CONSTRUCTORN!!!");
        console.log("Här är auth data: " + this._ref.getAuth());

        if (this._ref.getAuth() == null) {
            return;
        }
        if (localStorage.getItem('token') == null) {
            return;
        }

        console.log("Skrivs ej ut???");
        const token = localStorage.getItem('token');
        this._ref.authWithCustomToken(token, function (error, authData) {


            if (error) {
                //console.log("Authentication Failed!", error);
            } else {
                //console.log("Authenticated successfully with payload:", authData);
            }
        }, {
            remember: "default"
            });

        var authData = _ref.getAuth();
        
        this._afUserInfo = _af.database.list('/users/' + authData.uid);
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
    getAllNotes() {

        console.log("Körs typ detta eller vad händer!??!?!?!");

        if (this._ref.getAuth() == null) return;

        const token = localStorage.getItem('token');
        this._ref.authWithCustomToken(token, function (error, authData) {

            if (error) {
                //console.log("Authentication Failed!", error);
            } else {
                //console.log("Authenticated successfully with payload:", authData);
            }
        }, {
            remember: "default"
            });
        console.log(token);
        return Promise.resolve(this._afNotes);
    }

    //adds a new note(FirebaseListObservable with random id) to the database...
    addNoteToNotes(title: string, text: string, group: string, time: number, color: string) {

        if (this._ref.getAuth() == null) return;

        const token = localStorage.getItem('token');
        this._ref.authWithCustomToken(token, function (error, authData) {

            if (error) {
                //console.log("Authentication Failed!", error);
            } else {
                //console.log("Authenticated successfully with payload:", authData);
            }
        }, {
            remember: "default"
            }); console.log(token);

        console.log(this._notes.ref);

        this._notes.push({ 'title': title, 'text': text, 'group': group, 'timeStamp': (time * -1), 'color': color });
        console.log(Firebase);
    }

    //updates the notes title with the chosen id...
    updateNoteTitle(id: string, newTitle: string) {

        if (this._ref.getAuth() == null) return;

        const token = localStorage.getItem('token');
        this._ref.authWithCustomToken(token, function (error, authData) {

            if (error) {
                //console.log("Authentication Failed!", error);
            } else {
                //console.log("Authenticated successfully with payload:", authData);
            }
        }, {
            remember: "default"
            });
        this._notes.child(id).update({ 'title': newTitle });
    }

    //updates the notes text with the chosen id...
    updateNoteText(id: string, newText: string) {

        if (this._ref.getAuth() == null) return;

        const token = localStorage.getItem('token');
        this._ref.authWithCustomToken(token, function (error, authData) {

            if (error) {
                //console.log("Authentication Failed!", error);
            } else {
                //console.log("Authenticated successfully with payload:", authData);
            }
        }, {
            remember: "default"
            });
        this._notes.child(id).update({ 'text': newText });
    }

    //updates notes backgroundcolor...
    updateNoteColor(id: string, color: string) {
        this._notes.child(id).update({ 'color': color });
    }

    //deletes the note with the chosen id...
    deleteNote(id: string) {

        if (this._ref.getAuth() == null) return;

        const token = localStorage.getItem('token');
        this._notes.authWithCustomToken(token, function (error, authData) {

            if (error) {
                //console.log("Authentication Failed!", error);
            } else {
                //console.log("Authenticated successfully with payload:", authData);
            }
        }, {
            remember: "default"
            });
        this._notes.child(id).remove();
    }

    //returns every Note based on category
    getAllNotesInGroup(groupName: string) {

        if (this._ref.getAuth() == null) return;

        const token = localStorage.getItem('token');
        this._ref.authWithCustomToken(token, function (error, authData) {

            if (error) {
                //console.log("Authentication Failed!", error);
            } else {
                //console.log("Authenticated successfully with payload:", authData);
            }
        }, {
            remember: "default"
            });
        var authData = this._ref.getAuth();
        //console.log(authData);
        let tempObservable: FirebaseListObservable<any[]> = this._af.database.list('/users/' + authData.uid + '/notes', {
            query: {
                orderByChild: 'group',
                equalTo: groupName
            }
        });

        return Promise.resolve(tempObservable);
    }

    //returns all groups in the DB...
    getAllGroups() {

        if (this._ref.getAuth() == null) return;

        const token = localStorage.getItem('token');
        this._ref.authWithCustomToken(token, function (error, authData) {

            if (error) {
                //console.log("Authentication Failed!", error);
            } else {
                //console.log("Authenticated successfully with payload:", authData);
            }
        }, {
            remember: "default"
            });
        return Promise.resolve(this._afGroups);
    }

    //adds a new group(FirebaseListObservable with random id) to the database. 

    addGroupToGroups(name: string, time: number) {

        if (this._ref.getAuth() == null) return;

        const token = localStorage.getItem('token');
        this._ref.authWithCustomToken(token, function (error, authData) {

            if (error) {
                //console.log("Authentication Failed!", error);
            } else {
                //console.log("Authenticated successfully with payload:", authData);
            }
        }, {
            remember: "default"
            });
        this._groups.push({ 'name': name, 'timeStamp': (time * -1) });
    }

    //updates the group name with the chosen id...
    updateGroupName(id: string, name: string) {
        const token = localStorage.getItem('token');
        this._ref.authWithCustomToken(token, function (error, authData) {

            if (error) {
                //console.log("Authentication Failed!", error);
            } else {
                //console.log("Authenticated successfully with payload:", authData);
            }
        }, {
            remember: "default"
            });
        this._groups.child(id).update({ 'name': name });
    }

    //deletes the group with the chosen id...
    deleteGroup(id: string) {
        const token = localStorage.getItem('token');
        this._ref.authWithCustomToken(token, function (error, authData) {

            if (error) {
                //console.log("Authentication Failed!", error);
            } else {
                //console.log("Authenticated successfully with payload:", authData);
            }
        }, {
            remember: "default"
            });
        this._groups.child(id).remove();
    }

    //changes the notes group resident...
    changeNoteGroup(id: string, group: string) {
        const token = localStorage.getItem('token');
        this._notes.authWithCustomToken(token, function (error, authData) {

            if (error) {
                //console.log("Authentication Failed!", error);
            } else {
                //console.log("Authenticated successfully with payload:", authData);
            }
        }, {
            remember: "default"
            });
        this._notes.child(id).update({ 'group': group });
    } 
}