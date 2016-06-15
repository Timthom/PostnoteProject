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

@Component({
  moduleId: module.id,
  selector: 'menuGroup',
  providers: [LocalStorageService, Dragula],
  templateUrl: 'menugroup.component.html',
  styleUrls: ['menugroup.component.css'],
  pipes: []
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

  constructor( @Inject(FirebaseRef) private _ref: Firebase, private _ds: DataService, private _tx: ValueService, private _ls: LocalStorageService) {

    this._authData = this._ref.getAuth();
  }

  ngOnInit() {
    this.getNotes();
  }

  saveId(){
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
      this.editSrc = 'icon_edit.png';
      this.editGroup();
      this.getNotes();
      this._tx._toggleExpand = false;
    }
  }

  toggleExpand() {
    if (this.arrowSrc == 'icon_hide.png') {
      this.expanded = false;
    } else {
      this.expanded = true;
    }
    // this.expanded = this._tx._toggleExpand;

    if (this.expanded) {
      this.arrowSrc = 'icon_hide.png';
    }
    else {
      this.arrowSrc = 'icon_expand.png';
    }
  }

  jumpToNote(note: string) {
    var element = document.getElementById(note);
    element.scrollIntoView(true);
  }

}