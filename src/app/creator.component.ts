import {Component, Inject, Pipe, EventEmitter, Input, Output, ViewChild, ViewChildren, QueryList} from '@angular/core';
import {RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS} from '@angular/router-deprecated';
import {DataService} from './data.service';
import {OnInit} from '@angular/core';
import {Note} from './note';
import {NoteComponent} from './note.component';
import {Postnote2App} from './postNote2.component';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Reverse} from './reverse.pipe';
import {SortNotes} from './sort-notes.pipe';
import {DropdownComponent} from './dropdown.component';
import { AngularFire, defaultFirebase, FirebaseRef, FirebaseListObservable } from 'angularfire2';
import { Dragula } from 'ng2-dragula/ng2-dragula';
import {LocalStorageService} from './localstorage.service';
import {FirstLetter} from './first-letter.pipe';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { DragulaHelperService } from './dragula-helper.service';

@Component({
    moduleId: module.id,
    selector: 'creator',
    templateUrl: 'creator.component.html',
    styleUrls: ['creator.component.css'],
    directives: [ROUTER_DIRECTIVES, NoteComponent, DropdownComponent, Dragula],
    pipes: [Reverse, FirstLetter, SortNotes],
    providers: [LocalStorageService, Cookie]
})
@RouteConfig([
])
export class CreatorComponent {
    @ViewChildren(NoteComponent)
    private noteComponents: QueryList<NoteComponent>;

    groups: any;

    notes: any;

    @Output()
    notesChanged = new EventEmitter();


    title: string = "";
    text: string = "";


    selectedGroup: string = "noGroup";
    _authData;
    categoriesVisible: boolean = false;
    colorCount: number = 0;

    constructor(private _ds: DataService, @Inject(FirebaseRef) private _ref: Firebase, private _ls: LocalStorageService, public toastr: ToastsManager, private _dragulaHelper: DragulaHelperService) {
        this._authData = this._ref.getAuth();
    }

    ngOnInit() {
        this.getNotes();
        this.getGroups();

        if(this.visits()){
                let time = new Date().getTime();
                let newNote = new Note("Welcome!!", "This is your first time here at PostNote, you can choose to log in or create your own account or you can just start using the app right now only on this device by using the addbutton in the bottom corner to add new notes like this one, or add a new category in the menu to the left!\nHave fun!" , "noGroup", time.toString(), this.randomColor(), -1);
                this._ls.addNoteToNotes(newNote);
                this.notesChanged.emit('');
        }
    }

    getGroups() {
        const token = localStorage.getItem('token');
        if (this._authData != null && token != null) {
            this._ds.getAllGroups().then(groups => this.groups = groups);
        } else {
            this.groups = this._ls.getAllGroups();

        }
    }


    getNotes() {
        const token = localStorage.getItem('token');
        if (this._authData != null && token != null) {
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
        let time = new Date().getTime();
        let self = this;

        if (this._authData != null) {
            console.log(`inne i save med group = ${group}`);
            this._ds.addNoteToNotes("", "", group, time, this.randomColor(), -1);

        } else {
            let newNote = new Note("", "", group, time.toString(), this.randomColor(), -1);
            this._ls.addNoteToNotes(newNote);
            this.notesChanged.emit('');
        }

        this._dragulaHelper.updatePositionsInGroup(group);
        // this.getNotes(); //Update view // dont need it since calles fix...
        this.categoriesVisible = false;

        if (group == "noGroup") {
            this.toastr.success('A new note was created');
        } else {
            this.toastr.success('A new note was created in ' + group);
        }
    }

    open() {
        this.categoriesVisible = !this.categoriesVisible;
    }

    randomColor() {
        var colors = ["blue", "magenta", "yellow", "green", "pink", "orange"];
        // if we want to pick a random color.......
        //var color = colors[Math.floor(Math.random()*colors.length)];
        var color = colors[this.colorCount];
        this.colorCount++;
        if (this.colorCount === 6) {
            this.colorCount = 0;
        }
        return color;
    }

    hideCategoryButtons() {
        this.categoriesVisible = false;
    }


    noteChanged() {
        this.notesChanged.emit('');
        this.getNotes();
    }

    groupsChanged() {
        this.noteComponents.toArray().forEach((child) => child.groupsChanged());
        this.getGroups();

    }    

    visits() {
        var count = Cookie.get('count');
        if(count == null) {
            Cookie.set('count','1');
            return true;
        }else {
            var newcount = +count + 1;
            Cookie.delete('count');
            Cookie.set('count', 'newcount', 1000000);
            return false;
        }
    }
}