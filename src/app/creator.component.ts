import {Component, Inject, Pipe, EventEmitter, Input, Output} from '@angular/core';
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
import { Dragula } from 'ng2-dragula/ng2-dragula';
import {LocalStorageService} from './localstorage.service';
import {FirstLetter} from './first-letter.pipe';



@Component({
    moduleId: module.id,
    selector: 'creator',
    templateUrl: 'creator.component.html',
    styleUrls: ['creator.component.css'],
    directives: [ROUTER_DIRECTIVES, NoteComponent, DropdownComponent, Dragula],
    pipes: [Reverse, FirstLetter],
    providers: [LocalStorageService]
})
@RouteConfig([
])
export class CreatorComponent {
    title: string = "";
    text: string = "";
    notes: any;
    groups: any;
    selectedGroup: string = "noGroup";
    _authData;
    categoriesVisible: boolean = false;
    //buttons: any;

    constructor(private _ds: DataService, @Inject(FirebaseRef) private _ref: Firebase, private _ls: LocalStorageService) {
        this._authData = this._ref.getAuth();
    }

    ngOnInit() {
        this.getNotes();
        this.getGroups();
    }

    getGroups() {
        if (this._authData != null) {
            this._ds.getAllGroups().then(groups => this.groups = groups);
        } else {
            this.groups = this._ls.getAllGroups();
        }
    }


    getNotes() {
        if (this._authData != null) {
            this._ds.getAllNotesInGroup('noGroup').then(notes => this.notes = notes);
        } else {
            this.notes = this._ls.getNotesInGroup('noGroup');
        }
    }

    //Emitted from dropdown?
    groupChanged(event) {
        //Causes a bug where the creators dropdown changes when you change a notes group?
        this.selectedGroup = event;
    }

    save() {
        if (this.title !== '' || this.text !== '') {
            let time = new Date().getTime();

            if (this._authData != null) {
                this._ds.addNoteToNotes(this.title, this.text, this.selectedGroup, time, "yellow");

            } else {
                let newNote = new Note(this.title, this.text, this.selectedGroup, time.toString(), "yellow");
                this._ls.addNoteToNotes(newNote);
                this.getNotes(); //Update view
            }

            this.title = '';
            this.text = '';
        }
    }

    open() {
        this.categoriesVisible = !this.categoriesVisible;
    }
}