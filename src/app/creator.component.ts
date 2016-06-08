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
import {Group} from './group';



@Component({
  moduleId: module.id,
  selector: 'creator',
  templateUrl: 'creator.component.html',
  styleUrls: ['creator.component.css'],
  directives: [ROUTER_DIRECTIVES, NoteComponent, DropdownComponent, Dragula],
  pipes: [Reverse],
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
    colorCount: number = 0; 
    _authData;
    categoriesVisible: boolean = false;
    groupButtons: any = [];

    constructor(private _ds: DataService, @Inject(FirebaseRef) private _ref: Firebase, private _ls: LocalStorageService) {
        this._authData = this._ref.getAuth();
    }

    ngOnInit() {
        this.getNotes();
        this.createGroupButtons();
        
    }
    
    createGroupButtons () {
        this.getGroups();
        var yPosition: number = 40;
        
        for(var group of this.groups){
            var node = document.createElement('BUTTON');
            
            yPosition += 50;
            
            node.style.display = 'none';
            node.style.position = 'fixed';
            node.style.outline = 'none';
            node.style.height = '30px';
            node.style.width = '30px';
            node.style.borderRadius = '100%';
            node.style.border = 'none';
            node.style.right = '30px';
            node.style.bottom = yPosition + 'px';
            node.style.backgroundColor = '#FFFFFF';
            node.style.boxShadow = '0 3px 7px rgba(0, 0, 0, 0.5)';
            node.style.zIndex = '3';
            
            node.innerHTML = group.name.charAt(0).toUpperCase();
            
            document.getElementById('groupButtons').appendChild(node);
            console.log(node);
            
            this.groupButtons.push(node);
            //document.getElementById('groupButtons').appendChild('<button class="categoryButton" [class.categoryButtonVisible]="categoriesVisible">' + group.name.charAt(0) + '</button>');
        }
        
        console.log(this.groupButtons);
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
​
            if (this._authData != null) {
                this._ds.addNoteToNotes(this.title, this.text, this.selectedGroup, time, this.randomColor());
​
            } else {
                let newNote = new Note(this.title, this.text, this.selectedGroup, time.toString(), this.randomColor());
                this._ls.addNoteToNotes(newNote);
                this.getNotes(); //Update view
                if(this.selectedGroup != 'noGroup'){
                    //TEMPORARY
                    location.reload();
                }
            }
            
            this.title = '';
            this.text = '';
        }
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
        
        
    open() {
        this.categoriesVisible = !this.categoriesVisible;
        
        for(var button of this.groupButtons) {
            if(this.categoriesVisible) {
                button.style.display = 'block';
            } else {
                button.style.display = 'none';
            }
        }
    }
    
}