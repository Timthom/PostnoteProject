import {Component, Inject, Pipe} from '@angular/core';
import {RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS} from '@angular/router-deprecated';
import {DataService} from './data.service';
import {OnInit} from '@angular/core';
import {Note} from './note';
import {NoteComponent} from './note.component';
import {Postnote2App} from './postNote2.component';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Reverse } from './reverse.pipe';
import {DropdownComponent} from './dropdown.component';
import { AngularFire, defaultFirebase, FirebaseRef, FirebaseListObservable } from 'angularfire2';

@Component({
  moduleId: module.id,
  selector: 'creator',
  templateUrl: 'creator.component.html',
  styleUrls: ['creator.component.css'],
  directives: [ROUTER_DIRECTIVES, NoteComponent, DropdownComponent],
  pipes: [Reverse],
  providers: []
})
@RouteConfig([
])
export class CreatorComponent {
    title: string = ""; 
    text: string = "";
    notes: FirebaseListObservable<any[]>; 
    selectedGroup: string = "noGroup";
    _authData;
    
    constructor(private _ds: DataService, @Inject(FirebaseRef) private _ref: Firebase) {
        this._authData = this._ref.getAuth()
        console.log("inne i creatorcomponents konstruktor");
    }
    
    ngOnInit() {
        
        console.log("inne i OnInit i creatorcomponent...");
        if(this._authData != null) {
            console.log("Bör inte köras");
        this.getNotes();
        }
    }
    
    getNotes() {
        if(this._authData != null) {
        console.log("Bör inte köras");
        console.log("inne i getNotes i creatorcomponent");
        this._ds.getAllNotesInGroup('noGroup').then(notes => this.notes = notes);
        }
    }
    
    groupChanged(event) {
        if(this._authData != null) {
        console.log("Bör inte köras");
        this.selectedGroup = event;    
        }    
    }
    
    save() {
        if(this._authData != null) {
        console.log("Bör inte köras");
        if(this.title !== '') {
            let time = new Date().getTime();            
            this._ds.addNoteToNotes(this.title, this.text, this.selectedGroup, time, "yellow");
            this.title = '';
            this.text = '';
        }
        }
    }
}