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
    colorCount: number = 0; 

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

    save(group: any) {
        // if (this.title !== '' || this.text !== '') {
            let time = new Date().getTime();

            if (this._authData != null) {
                this._ds.addNoteToNotes("", "", group, time, this.randomColor());

            } else {
                let newNote = new Note("", "", group, time.toString(), this.randomColor());
                this._ls.addNoteToNotes(newNote);
                this.getNotes(); //Update view
            }

            this.categoriesVisible = false; 
            // this.title = '';
            // this.text = '';
        // }
    }

    open() {
        this.categoriesVisible = !this.categoriesVisible;
    }
    
    randomColor () {
       var colors = ["blue", "magenta", "yellow", "green", "pink", "orange"];
       // if we want to pick a random color.......
       //var color = colors[Math.floor(Math.random()*colors.length)];
       var color = colors[this.colorCount];
       this.colorCount++;
       if(this.colorCount === 6){
           this.colorCount = 0; 
       }
       return color;
   }
    
}