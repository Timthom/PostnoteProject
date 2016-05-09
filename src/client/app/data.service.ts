import { Injectable } from 'angular2/core';
import { notes } from './data-base';
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
    
    constructor (){
        
    }
    
    getAllNotes(){
        return Promise.resolve(notes);
    }
    
}