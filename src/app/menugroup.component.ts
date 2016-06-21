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

  @Input()
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
  }

  saveId() {
    this._tx._focusedId = this.group.$key;
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
    if (this._authData != null) {
      this._ds.updateGroupName(this.group.$key, this.group.name);
    } else {
      this._ls.updateGroupName(this.group.$key, this.group.name);
      //Not sure how this can work!

      //TEMPORARY
      //location.reload();
    }
    this.groupsChanged.emit('');
  }

  getContent() {
    let doneInLoopArray;
    let arrayOfKeys: any[] = [];
    this.notes.forEach(function (result) {
      doneInLoopArray = result;
    });
    doneInLoopArray.forEach(function (note) {
      arrayOfKeys.push(note.$key);
    });
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
      document.getElementById(this.group.$key).setAttribute("readonly", "true");
      if (this._authData != null) {
        let content = this.getContent();
        // changes notes in the group to the new group
        for (let key of content) {
          this._ds.changeNoteGroup(key, this.group.name);
        }
      } else { //if not logged in
        for (let note of this.notes) {
          this._ls.changeNoteGroup(note.$key, this.group.name);

        }
      }
      for (var i = 0; i < this._tx._groupNames.length; i++) {
        if (this._tx._groupNames[i] == this.group.name) {
          this._tx._groupNames.splice(i, 1);
          this._tx._groupExpandeds.splice(i, 1);
        }
      }
      this.editSrc = 'icon_edit.png';
      this.editGroup();
      this.getNotes();
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
        if (this._authData != null) {
          if (this.expanded == true) {
            this._tx._groupExpandeds[i] = "true";
          } else {
            this._tx._groupExpandeds[i] = "false";
          }
        }
      }
    }
    for (let booleans of this._tx._groupExpandeds) {
      console.log(booleans);
    }
    console.log("=============");
  }

  jumpToNote(note: string) {
    this.jumpToGroup(this.group.name);
    setTimeout(function () {
      var element = document.getElementById(note).offsetTop - (window.innerHeight / 11);
      window.scrollTo(0, element);
    }, 100);

  }

  jumpToGroup(group: string) {
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