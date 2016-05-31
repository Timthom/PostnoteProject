import {Component, Inject, Pipe} from '@angular/core';
import {RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS} from '@angular/router-deprecated';
import {DataService} from './data.service';
import {OnInit} from '@angular/core';
import {Note} from './note';
import {NoteComponent} from './note.component';
import {Postnote2App} from './postNote2.component';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Reverse} from './reverse.pipe';
import {DropdownComponent} from './dropdown.component';
import { AngularFire, defaultFirebase, FirebaseRef, FirebaseListObservable } from 'angularfire2';
import { Dragula, DragulaService } from 'ng2-dragula/ng2-dragula';
import {LocalStorageService} from './localstorage.service';

@Component({
  moduleId: module.id,
  selector: 'creator',
  templateUrl: 'creator.component.html',
  styleUrls: ['creator.component.css'],
  directives: [ROUTER_DIRECTIVES, NoteComponent, DropdownComponent, Dragula],
  pipes: [Reverse],
  providers: [LocalStorageService],
  viewProviders: [DragulaService]
})
@RouteConfig([
])
export class CreatorComponent {
    title: string = "";
    text: string = "";
    notes: any;
    selectedGroup: string = "noGroup";
    _authData;
    
    constructor(private _ds: DataService, @Inject(FirebaseRef) private _ref: Firebase, private _dragulaService: DragulaService, private _ls: LocalStorageService) {
        this._authData = this._ref.getAuth()
        console.log("inne i creatorcomponents konstruktor");
        _dragulaService.setOptions('drag-bag', {
           
        });
    }

    ngOnInit() {

        console.log("inne i OnInit i creatorcomponent...");
        if (this._authData != null) {
            console.log("Bör inte köras");
            this.getNotes();
        } else {
            console.log("ngOnInit in creatorcomponent offline");
        }
    }

    getNotes() {
        if (this._authData != null) {
            console.log("inne i getNotes i creatorcomponent");
            this._ds.getAllNotesInGroup('noGroup').then(notes => this.notes = notes);
        } else {
            console.log("getnotes in creatorcomponent offline");
        }
    }

    groupChanged(event) {
        if (this._authData != null) {
            this.selectedGroup = event;
        } else {
            console.log("groupchanged in creatorcomponent offline");
        }
    }

    save() {
        if (this._authData != null) {
            if (this.title !== '') {
                let time = new Date().getTime();
                this._ds.addNoteToNotes(this.title, this.text, this.selectedGroup, time, "yellow");
                this.title = '';
                this.text = '';
            }
        } else {
            console.log("save in creatorcomponent offline");
            if(this.title !== ''){
                let time = new Date().getTime();
                let newNote = new Note(this.title, this.text, this.selectedGroup, time.toString(), "yellow");
                this._ls.addNoteToNotes(newNote);
                this.title = '';
                this.text = '';
            }
        }
    }
}