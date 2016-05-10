import {Component, Inject} from 'angular2/core';
import {RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS} from 'angular2/router';
import {AngularFire} from 'angularfire2';
import {FirebaseListObservable} from 'angularfire2';
import {DataService} from './data.service';
import {OnInit} from 'angular2/core';
import {Note} from './note';
import {NoteComponent} from './note.component';
import {Postnote2App} from './postNote2.component';
import { Injectable } from 'angular2/core';
import { defaultFirebase, FirebaseRef } from 'angularFire2';
import { Observable } from 'rxjs/Observable';

@Component({
  moduleId: __moduleName,
  selector: 'creator',
  templateUrl: 'creator.component.html',
  styleUrls: ['creator.component.css'],
  directives: [ROUTER_DIRECTIVES, NoteComponent],
  pipes: [],
  providers: []
})
@RouteConfig([
])
export class CreatorComponent {
    title: string = ""; 
    text: string = ""; 
    note: Note;
    notes: FirebaseListObservable<Note[]>; 
   
    constructor(private _af: AngularFire) {

        this.notes = this._af.list('/notes');
       
    }
    
    ngOnInit() {
        this.getNotes();
    }
    
    getNotes() {
        //this._dataService.getAllNotes().then(notes => this.notes = notes);
        ;
    }
    
    save() {
        this.note = new Note (this.title, this.text);
        //add to database
        
        if(this.title !== ""){
            console.log(this.title);
            console.log(this.text);
            //this.notes.splice(0,0, this.note);
           
            this.title = ""; 
            this.text = "";
        }
    }
}
