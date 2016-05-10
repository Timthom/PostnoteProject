import { Injectable } from 'angular2/core';
import { Note } from './note';
import { AngularFire, defaultFirebase, FirebaseRef, FirebaseListObservable } from 'angularFire2';
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
    
    constructor (private _ref: Firebase, private _notes: Firebase){
        this._ref = new Firebase('https://dazzling-fire-7472.firebaseio.com');
        this._notes = this._ref.child('notes')
    }
    
     //adds a new note(FirebaseListObservable with random id) to the database. 
    public addNoteToNotes(title: string, text: string) {
        this._notes.push({Title: title, Text: text});
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