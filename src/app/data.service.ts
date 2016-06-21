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

        if (this._ref.getAuth() == null) {
            return;
        }
        
        //Varför sker det här?
        if (localStorage.getItem('token') == null) {
            // console.log('return#2');
            return;
        }
        
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

        
    }

    //returns all notes in the DB...
    getAllNotes() {

        this.refresh();

        if (this._ref.getAuth() == null) return;

        const token = localStorage.getItem('token');
        this._ref.authWithCustomToken(token, function (error, authData) {

            if (error) {

            } else {

            }
        }, {
            remember: "default"
            });

        return Promise.resolve(this._afNotes);
    }

    //adds a new note(FirebaseListObservable with random id) to the database...
    addNoteToNotes(title: string, text: string, group: string, time: number, color: string, position: number) {

        this.refresh();

        if (this._ref.getAuth() == null) return;

        const token = localStorage.getItem('token');
        this._ref.authWithCustomToken(token, function (error, authData) {

            if (error) {

            } else {

            }
        }, {
            remember: "default"
            }); console.log(token);



        this._notes.push({ 'title': title, 'text': text, 'group': group, 'timeStamp': (time * -1), 'color': color, 'position': position });

    }

    //updates the notes title with the chosen id...
    updateNoteTitle(id: string, newTitle: string) {

        this.refresh();

        if (this._ref.getAuth() == null) return;

        const token = localStorage.getItem('token');
        this._ref.authWithCustomToken(token, function (error, authData) {

            if (error) {

            } else {

            }
        }, {
            remember: "default"
            });
        this._notes.child(id).update({ 'title': newTitle });
    }

    //updates the notes text with the chosen id...
    updateNoteText(id: string, newText: string) {

        this.refresh();

        if (this._ref.getAuth() == null) return;

        const token = localStorage.getItem('token');
        this._ref.authWithCustomToken(token, function (error, authData) {

            if (error) {

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
        this.refresh();

        this._notes.child(id).update({ 'color': color });
    }

    //deletes the note with the chosen id...
    deleteNote(id: string) {

        this.refresh();

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

        this.refresh();

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

        this.refresh();

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

        this.refresh();

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

        this.refresh();

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

        this.refresh();

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

        this.refresh();

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

    /* Vill göra denna med promises om jag hinner //Marcus... */    
    getGroupNameFromId(id: string) {

        this.refresh();

        let notes = this._notes;
        return new Promise(function(resolve){
        notes.child(id).child('group').on('value', (s) => resolve(s.val()))
        });      
    }
    
    getPositionFromId(id: string) {

        this.refresh();

        let notes = this._notes;
        return new Promise(function(resolve){
        notes.child(id).child('position').on('value', (s) => resolve(s.val()))
        });      
    }    
    
    updateNotePosition(id: string, position: number) {

        this.refresh();
        
        this._notes.child(id).update({ 'position': position });
    } 

    refresh() {

        var authData = this._ref.getAuth();
        
        this._afUserInfo = this._af.database.list('/users/' + authData.uid);
        this._afNotes = this._af.database.list('/users/' + authData.uid + '/notes');
        this._afGroups = this._af.database.list('/users/' + authData.uid + '/groups', {
            query: {
                orderByChild: 'timeStamp'
            }
        });


        this._notes = this._ref.child('/users/' + authData.uid + '/notes');

        this._groups = this._ref.child('/users/' + authData.uid + '/groups');

    }
    
}