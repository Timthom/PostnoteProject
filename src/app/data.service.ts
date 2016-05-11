import { Injectable, Inject } from '@angular/core';
import { Note } from './note';
import { AngularFire, defaultFirebase, FirebaseRef, FirebaseListObservable } from 'angularfire2';
import { Observable } from 'rxjs/Observable';

/*
Denna klassen kommer fungera som en länk mellan datan och componenterna...
Klassen kommer att ha metoder som hämtar data och som sätter data...
Klassen kommer att ha metoder som att getNoteWithId...
Klassen kommer att ha metoder som att getArrayOfNotesBasedOnCategory...
Klassen kommer att ha metoder som att getArrayOfAllNote...
Klassen kommer att ha metoder som att getArrayOfStarredNotes...
ETC...
*/


@Injectable()
export class DataService {
    _notes: Firebase;
    
    constructor (@Inject(FirebaseRef) private _ref: Firebase){
        this._notes = _ref.child('notes');
        console.log("inne i dataservice konstruktor");
    }
    
     getAllNotes() {
      console.log("getAllNotes i DataService");
      return Promise.resolve(this._notes);
    }
    
     //adds a new note(FirebaseListObservable with random id) to the database. 
    public addNoteToNotes(title: string, text: string) {
        console.log("inne i addnotetonotes");
        this._notes.push({'title': title, 'text': text});
    }
    
    //updates the notes title with the chosen id...
    public updateNoteTitle(id: string, newTitle: string) {
        this._notes.child(id).update({'title': newTitle});
    }
    
    //updates the notes text with the chosen id...
    public updateNoteText(id: string, newText: string) {
        this._notes.child(id).update({'text': newText});
    }
    
    //deletes the note with the chosen id...
    public deleteNote(id: string) {
        this._notes.child(id).remove();
    }
    
    //returns every Note based on category
    public getNotesInCategory(category: string) {
        
    }
    
}