import {Component, Input, Output, EventEmitter} from '@angular/core';
import {RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS} from '@angular/router-deprecated';
import {NoteComponent} from './note.component';
import {DataService} from './data.service';
import { AngularFire, defaultFirebase, FirebaseRef, FirebaseListObservable } from 'angularfire2';
import { Injectable, Inject } from '@angular/core';
import {Reverse} from './reverse.pipe';
import {SortNotes} from './sort-notes.pipe';
import {ValueService} from './value.service';
import { Dragula } from 'ng2-dragula/ng2-dragula';
import {LocalStorageService} from './localstorage.service';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

@Component({
  moduleId: module.id,
  selector: 'group',
  providers: [ROUTER_PROVIDERS, LocalStorageService, ToastsManager],
  templateUrl: 'group.component.html',
  styleUrls: ['group.component.css'],
  directives: [ROUTER_DIRECTIVES, NoteComponent, Dragula],
  pipes: [Reverse, SortNotes]
})
@RouteConfig([
])

export class GroupComponent {

  groups: any;
  notes: any;

  @Input() group;
  @Input() groupName;
  @Input() note;

  @Output() clickedDelete = new EventEmitter();
  @Output() notesChanged = new EventEmitter();

  newName: string = "";
  contentList: string[];
  arrowSrc: string;
  expanded: boolean;
  editingName: boolean = false;
  enableEditIfNull: string = '';
  editSrc: string = 'icon_edit.png';
  _authData;
  groupId;

  constructor( @Inject(FirebaseRef)
  private _ref: Firebase,
    private _ds: DataService,
    private _tx: ValueService,
    private _ls: LocalStorageService,
    public toastr: ToastsManager) {
    this._authData = this._ref.getAuth();
  }

  ngOnInit() {
    this.getNotes();

    // checks if name already exists, if not then adds it to array of group names.
    // also adds a new "false" status of the groups expand.
    if (this._tx._toggleDelete == true) {
      let toPush = true;
      for (let content of this._tx._groupNames) {
        if (this.group.name == content) {
          toPush = false;
        }
      }
      if (toPush == true) {
        console.log("Adding group");
        this._tx._groupNames.push(this.group.name);
        if (this._tx._groupNames.length > this._tx._groupCount) {
          this._tx._groupExpandeds.push("false");
        }
      }
    } else {
      if (this._tx._toggleCreate == true) {
        console.log("inside toPush");
        this._tx._groupNames.unshift(this.group.name);
        if (this._tx._groupNames.length > this._tx._groupCount) {
          this._tx._groupExpandeds.unshift("false");
        }
        this._tx._toggleCreate = false;
      }
      this._tx._toggleDelete = true;
    }

    // updates each group with what status of expand it had before the re-rendering.
    // console.log(this._tx._groupNames.length);
    for (var i = 0; i < this._tx._groupNames.length; i++) {
      if (this.group.name == this._tx._groupNames[i]) {
        if (this._tx._groupExpandeds[i] == "true") {
          this.expanded = true;
          this.arrowSrc = 'icon_hide.png';
        } else {
          this.expanded = false;
          this.arrowSrc = 'icon_expand.png';
        }
      }
    }
  }

  saveId() {
    this._tx._focusedId = this.group.$key;
    this._tx._focusedName = this.group.name;
    this._tx._focusedNoteKeys = this.getContent();
  }

  getNotes() {
    if (this._authData != null) {
      this._ds.getAllNotesInGroup(this.groupName).then(notes => this.notes = notes);
    } else {
      this.notes = this._ls.getNotesInGroup(this.groupName);
    }
  }

  getContent() {
    let doneInLoopArray;
    let arrayOfKeys: any[] = [];

    if (this._authData != null) {
      this.notes.forEach(function (result) {
        doneInLoopArray = result;
      });

      doneInLoopArray.forEach(function (note) {
        arrayOfKeys.push(note.$key);
      });
    } else {
      let notesInGroup = this._ls.getNotesInGroup(this.groupName);
      for(let content of notesInGroup){
        arrayOfKeys.push(content.$key);
      }
    }

    return arrayOfKeys;
  }

  deleteGroup() {
    for (var i = 0; i < this._tx._groupNames.length; i++) {
      if (this._tx._focusedName == this._tx._groupNames[i]) {
        this._tx._groupNames.splice(i, 1);
        this._tx._groupExpandeds.splice(i, 1);
        this._tx._toggleDelete = false;
      }
    }
    this._tx._groupCount = this._tx._groupNames.length;
    for (var item in this.groups) {
      if (this._tx._focusedId == this.groups[item].$key) {
        this.groups.splice(item, 1);
        break;
      }
    }
    if (this._authData != null) {
      //To be able to iterate through all notes
      //Remove all notes in group
      for (let key of this._tx._focusedNoteKeys) {
        this._ds.deleteNote(key);
      }
      this._ds.deleteGroup(this._tx._focusedId);
    } else {//if not logged in
      //Removes notes of the group
      for (let note of this._tx._focusedNoteKeys) {
        this._ls.deleteNote(note);
      }
      this._ls.deleteGroup(this._tx._focusedId);
    }
    this.clickedDelete.emit('');
  }

  editGroupName() {
    //change name in shared model
    for (var index in this.groups) {
      if (this.group.$key == this.groups[index].$key) {
        this.groups[index].name = this.groupName;
        break;
      }
    }
    if (this._authData != null) {
      this._ds.updateGroupName(this.group.$key, this.groupName);
    } else {
      this._ls.updateGroupName(this.group.$key, this.groupName);
      //TEMPORARY
      //location.reload();
    }
    this.clickedDelete.emit(''); //Also works for edits!
    // this.toastr.success('Group name updated!');
    this._tx._toggleDelete = false;
  }

  // Enable inputfield to edit text in field when user click on pen icon else disable inputfield
  editClick() {
    this.editingName = !this.editingName;
    if (this.editingName) {
      this.enableEditIfNull = null;
      this.editSrc = 'icon_save.png';
    } else {
      if (this._authData != null) {
        let content = this.getContent();
        // changes notes in the group to the new group
        for (let key of content) {
          this._ds.changeNoteGroup(key, this.groupName);
        }
      } else {
        for (let note of this.notes) {
          this._ls.changeNoteGroup(note.$key, this.groupName);
        }
      }
      this.enableEditIfNull = '';
      this.updateTX();
      this.editGroupName();
      for (var i = 0; i < this._tx._groupNames.length; i++) {
        if (this._tx._groupNames[i] == this.group.name) {
          this._tx._groupExpandeds[i] = "true";
        }
      }
      console.log(this._tx._groupNames.length);
      this.getNotes();
      this.editSrc = 'icon_edit.png';
    }
  }

  // sets the groupname and status to new name with status = true. 
  updateTX() {
    for (var i = 0; i < this._tx._groupNames.length; i++) {
      if (this._tx._groupNames[i] == this.group.name) {
        this._tx._groupNames[i] = this.groupName;
        this._tx._groupExpandeds[i] = "true";
      }
    }
  }

  // Expand category on click arrowBtn
  groupExpand() {
    // Uffes idea:
    if (!this.editingName) {
      this.expanded = !this.expanded;
      if (this.expanded) {
        this.arrowSrc = 'icon_hide.png';
      } else {
        this.arrowSrc = 'icon_expand.png';
      }
    }
    for (let content of this._tx._groupNames) {
      console.log(content);
    }
    for (var i = 0; i < this._tx._groupNames.length; i++) {
      if (this.group.name == this._tx._groupNames[i]) {
        if (this.expanded == true) {
          this._tx._groupExpandeds[i] = "true";
        } else {
          this._tx._groupExpandeds[i] = "false";
        }
      }
    }
    for (let booleans of this._tx._groupExpandeds) {
      console.log(booleans);
    }
    console.log("*===*");
  }
  emitNotes(groups: any) {
    this.notesChanged.emit('');
  }

  //Checks if this is the group that was jumped to,
  //in that case calls ngOnInit (refreshes)
  maybeExpand() {
    if(this.group.name === this._tx._clickedGroup){
      this.ngOnInit();
    }
  }

}