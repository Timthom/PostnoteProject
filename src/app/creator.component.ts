import {Component, Inject} from '@angular/core';
import {RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS} from '@angular/router-deprecated';
import {AngularFire} from 'angularfire2';
import {FirebaseListObservable} from 'angularfire2';
import {DataService} from './data.service';
import {OnInit} from '@angular/core';
import {Note} from './note';
import {NoteComponent} from './note.component';
import {Postnote2App} from './postNote2.component';
import { Injectable } from '@angular/core';
import { defaultFirebase, FirebaseRef } from 'angularFire2';
import { Observable } from 'rxjs/Observable';

@Component({
  moduleId: module.id,
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
    
   
    constructor(private _af: AngularFire, private _ds: DataService) {
        console.log("inne i creatorcomponents konstruktor");

        this.notes = this._af.list('/notes', {
            
        });
        console.log(this.notes);
        //console.log(this.notes.count);
    }
    
    ngOnInit() {
        console.log("inne i OnInit i creatorcomponent");
        this.getNotes();
        console.log(this.notes);
    }
    
    getNotes() {
        console.log("inne i getNotes i creatorcomponent");
        //this._dataService.getAllNotes().then(notes => this.notes = notes);
        console.log(this.notes);
    }
    
    save() {
        if(this.title !== '') {
            //add to database
            this._ds.addNoteToNotes(this.title, this.text);
            this.title = '';
            this.text = '';
        }
    }
}
