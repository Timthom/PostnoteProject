import {Component, Input, Pipe} from '@angular/core';
import {AngularFire} from 'angularfire2';
import {FirebaseListObservable} from 'angularfire2';
import {DataService} from './data.service';
import {OnInit} from '@angular/core';
import {Postnote2App} from './postNote2.component';
import { Injectable, Inject } from '@angular/core';
import { defaultFirebase, FirebaseRef } from 'angularfire2';
import { Observable } from 'rxjs/Observable';
import {ValueService} from './value.service';


@Component({
  moduleId: module.id,
  selector: 'menuGroup',
  templateUrl: 'menugroup.component.html',
  styleUrls: ['menugroup.component.css'],
  pipes: []
})


export class MenuGroupComponent implements OnInit {
  arrowSrc: string = 'icon_expand.png';
  expanded: boolean = this._tx._toggleExpand;
  editingName: boolean = false;
  notes: FirebaseListObservable<any[]>;

  @Input()
  group;
  _authData;
  editSrc: string = 'icon_edit.png';

  constructor( @Inject(FirebaseRef) private _ref: Firebase, private _ds: DataService, private _tx: ValueService) {
    this._authData = this._ref.getAuth();
  }

  ngOnInit() {
    if (this._authData != null) {
      this.getNotes();
    }
  }

  getNotes() {
    if (this._authData != null) {
      this._ds.getAllNotesInGroup(this.group.name).then(titles => this.notes = titles);
    }
  }

  deleteGroup() {
    if (this._authData != null) {
      this._ds.deleteGroup(this.group.$key);
      this._tx._toggleExpand = false;
    }
  }

  editGroupName() {
    if (this._authData != null) {
      this._ds.updateGroupName(this.group.$key, this.group.name);
    }
  }

  editGroup() {
    if (this._authData != null) {
      this._ds.updateGroupName(this.group.$key, this.group.name);
    }
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
    if (this._authData != null) {
      this.editingName = !this.editingName;
      if (this.editingName) {
        document.getElementById(this.group.$key).removeAttribute("readonly");
        document.getElementById(this.group.$key).focus();
        this.editSrc = 'icon_save.png';
      } else {
        document.getElementById(this.group.$key).setAttribute("readonly", "true");
        let content = this.getContent();
        // changes notes in the group to the new group
        for (let key of content) {
          this._ds.changeNoteGroup(key, this.group.name);
        }
        this.editSrc = 'icon_edit.png';
        this.editGroup();
        this.getNotes();
        this._tx._toggleExpand = false;
      }
    }
  }

  toggleExpand() {
    if(this.arrowSrc == 'icon_hide.png'){
      this._tx._toggleExpand = false;
    } else {
      this._tx._toggleExpand = true;
    }
    this.expanded = this._tx._toggleExpand;
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

  jumpToGroup(groupId: string) {
    var element = document.getElementById(groupId);
    element.scrollIntoView(true);
    console.log(element);
  }

}