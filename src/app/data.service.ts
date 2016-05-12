import { Injectable, Inject } from '@angular/core';
import { Note } from './note';
import { AngularFire, defaultFirebase, FirebaseRef, FirebaseListObservable } from 'angularfire2';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class DataService {
    _notes: Firebase;
    _groups: Firebase;
    _afNotes: FirebaseListObservable<any[]>;
    _afGroups: FirebaseListObservable<any[]>;
    
    constructor (@Inject(FirebaseRef) private _ref: Firebase, private _af: AngularFire){
        this._afNotes = _af.database.list('/notes');
        this._afGroups = _af.database.list('/groups');
        this._notes = _ref.child('notes');
        this._groups = _ref.child('groups');
        console.log("inne i dataservice konstruktor");
    }
    
     getAllNotes() {
      return Promise.resolve(this._afNotes);
    }
    
     //adds a new note(FirebaseListObservable with random id) to the database. 
    addNoteToNotes(title: string, text: string) {
        console.log("inne i addnotetonotes");
        this._notes.push({'title': title, 'text': text, 'group': 'noGroup'});
    }
    
    //updates the notes title with the chosen id...
    updateNoteTitle(id: string, newTitle: string) {
        this._notes.child(id).update({'title': newTitle});
    }
    
    //updates the notes text with the chosen id...
    updateNoteText(id: string, newText: string) {
        this._notes.child(id).update({'text': newText});
    }
    
    //deletes the note with the chosen id...
    deleteNote(id: string) {
        this._notes.child(id).remove();
    }
    
    //returns every Note based on category
    getNotesInCategory(category: string) {
        
    }
    
    getAllGroups() {
      return Promise.resolve(this._afGroups);
    }
    
     //adds a new group(FirebaseListObservable with random id) to the database. 
    addGroupToGroups(title: string, text: string) {
    }
    
    //updates the group name with the chosen id...
    updateGroupName(id: string, newTitle: string) {
    }
    
    //deletes the group with the chosen id...
    deleteGroup(id: string) {
    }
}