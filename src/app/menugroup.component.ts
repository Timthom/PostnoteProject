import {Component, Input, Pipe, Output, EventEmitter} from '@angular/core';
import {AngularFire} from 'angularfire2';
import {FirebaseListObservable} from 'angularfire2';
import {DataService} from './data.service';
import {OnInit} from '@angular/core';
import {Postnote2App} from './postNote2.component';
import { Injectable, Inject } from '@angular/core';
import { defaultFirebase, FirebaseRef } from 'angularfire2';
import { Observable } from 'rxjs/Observable';
import {ValueService} from './value.service';
import {LocalStorageService} from './localstorage.service';
import { Dragula } from 'ng2-dragula/ng2-dragula';
import {SortNotes} from './sort-notes.pipe';
import {Default} from './default.pipe';


@Component({
  moduleId: module.id,
  selector: 'menuGroup',
  providers: [LocalStorageService, Dragula],
  templateUrl: 'menugroup.component.html',
  styleUrls: ['menugroup.component.css'],
  pipes: [SortNotes, Default]
})


export class MenuGroupComponent implements OnInit {
  arrowSrc: string = 'icon_expand.png';
  expanded: boolean;
  editingName: boolean = false;
  notes: any;
  groups: any;

  @Input()
  group;
  _authData;
  editSrc: string = 'icon_edit.png';

  @Output() groupsChanged = new EventEmitter();
  @Output() closeMenu = new EventEmitter();

  constructor( @Inject(FirebaseRef) private _ref: Firebase, private _ds: DataService, private _tx: ValueService, private _ls: LocalStorageService) {

    this._authData = this._ref.getAuth();
  }

  ngOnInit() {
    this.getNotes();

    if (this._tx._toggleDelete == true) {
      console.log("uffe working in toggleDelete == true");
      this.initialAddOfGroups();
    } else {
      console.log("uffe working in toggleDelete == false");
      this.addAnotherGroup();
      this._tx._toggleDelete = true;
    }

    this.updateGroupStatuses();
  }

  initialAddOfGroups() {
    // checks if name already exists, if not then adds it to array of group names.
    // also adds a new "false" status of the groups expand.
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
  }

  addAnotherGroup() {
    if (this._tx._toggleCreate == true) {
      console.log("inside toPush");
      this._tx._groupNames.unshift(this.group.name);
      if (this._tx._groupNames.length > this._tx._groupCount) {
        this._tx._groupExpandeds.unshift("false");
      }
      console.log("uffe working in toggleCreate == true");
      this._tx._toggleCreate = false;
    }
  }

  updateGroupStatuses() {
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
      this._ds.getAllNotesInGroup(this.group.name).then(titles => this.notes = titles);
    } else {
      this.notes = this._ls.getNotesInGroup(this.group.name);
    }
  }

  //WILL NOT BE USED
  // deleteGroup() {
  //   console.log("DELETE GROUP");
  //   //remove from shared model
  //   // for (var item in this.groups) {
  //   //   console.log("CHECKING " + this.groups[item].$key);
  //   //         if (this.group.$key == this.groups[item].$key) {
  //   //             console.log("REMOVING no " + item);
  //   //             this.groups.splice(item, 1);
  //   //             break;
  //   //         }
  //   // }
  //   //remove from firebase
  //   if (this._authData != null) {
  //     this._ds.deleteGroup(this._tx._focusedId);
  //   } else {//remove from local storage
  //     this._ls.deleteGroup(this._tx._focusedId);
  //     //TEMPORARY
  //     //location.reload();
  //   }
  //   this._tx._toggleExpand = false;
  //   this.groupsChanged.emit(this.groups);
  // }


  editGroup() {
    //change name in shared model
    for (var index in this.groups) {
      if (this.group.$key == this.groups[index].$key) {
        this.groups[index].name = this.group.name;
        break;
      }
    }
    if (this._authData != null) {
      this._ds.updateGroupName(this.group.$key, this.group.name);
    } else {
      this._ls.updateGroupName(this.group.$key, this.group.name);
      //TEMPORARY
      //location.reload();
    }
    this.groupsChanged.emit(''); //Also works for edits!
    // this.toastr.success('Group name updated!');
    this._tx._toggleDelete = false;
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
      let notesInGroup = this._ls.getNotesInGroup(this.group.name);
      for (let content of notesInGroup) {
        arrayOfKeys.push(content.$key);
      }
    }

    return arrayOfKeys;
  }

  //When pressing the edit button, it enables editing on the input field
  editing() {
    this.editingName = !this.editingName;
    if (this.editingName) {
      document.getElementById(this.group.$key).removeAttribute("readonly");
      document.getElementById(this.group.$key).focus();
      this.editSrc = 'icon_save.png';
    } else {
      if (this._authData != null) {
        let content = this.getContent();
        // changes notes in the group to the new group
        for (let key of content) {
          this._ds.changeNoteGroup(key, this.group.name);
        }
      } else {
        for (let note of this.notes) {
          this._ls.changeNoteGroup(note.$key, this.group.name);
        }
      }
      document.getElementById(this.group.$key).setAttribute("readonly", "true");
      this.updateTX();
      this.editGroup();
      for (var i = 0; i < this._tx._groupNames.length; i++) {
        if (this._tx._groupNames[i] == this.group.name) {
          this._tx._groupExpandeds[i] = "true";
        }
      }
      //console.log(this._tx._groupNames.length);
      this.getNotes();
      this.editSrc = 'icon_edit.png';
    }
  }

  // sets the groupname and status to new name with status = true. 
  updateTX() {
    for (var i = 0; i < this._tx._groupNames.length; i++) {
      if (this._tx._groupNames[i] == this.group.name) {
        this._tx._groupNames[i] = this.group.name;
        this._tx._groupExpandeds[i] = "true";
      }
    }
  }

  toggleExpand() {
    if (!this.editingName) {
      this.expanded = !this.expanded;
      if (this.expanded) {
        this.arrowSrc = 'icon_hide.png';
      }
      else {
        this.arrowSrc = 'icon_expand.png';
      }
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

  jumpToNote(note: string) {
    if (this.editSrc == "icon_edit.png") {
      this.jumpToGroup(this.group.name);
      setTimeout(function () {
        var element = document.getElementById(note).offsetTop - (window.innerHeight / 11);
        window.scrollTo(0, element);
      }, 100);
    }
  }

  jumpToGroup(group: string) {
    if (this.editSrc == "icon_edit.png") {
      for (var i = 0; i < this._tx._groupNames.length; i++) {
        if (this.group.name == this._tx._groupNames[i]) {
          this._tx._groupExpandeds[i] = "true";
          console.log("this works?!");
          this.groupsChanged.emit('');
        }
      }
      this._tx._clickedGroup = this.group.name;//Saves the clicked group
      var element = document.getElementById(group).offsetTop - (window.innerHeight / 11);
      window.scrollTo(0, element);
      this.closeMenu.emit('');
    }
  }
}