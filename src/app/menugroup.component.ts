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


@Component({
  moduleId: module.id,
  selector: 'menuGroup',
  providers: [LocalStorageService],
  templateUrl: 'menugroup.component.html',
  styleUrls: ['menugroup.component.css'],
  pipes: []
})


export class MenuGroupComponent implements OnInit {
  arrowSrc: string = 'icon_expand_white.png';
  expanded: boolean = this._tx._toggleExpand;
  editingName: boolean = false;
  notes: any;

  @Input()
  group;
  _authData;

  @Output() groupsChanged: EventEmitter<string> = new EventEmitter();

  constructor( @Inject(FirebaseRef) private _ref: Firebase, private _ds: DataService, private _tx: ValueService, private _ls: LocalStorageService) {

    this._authData = this._ref.getAuth();
  }

  ngOnInit() {
    this.getNotes();
  }

  getNotes() {
    if (this._authData != null) {
      this._ds.getAllNotesInGroup(this.group.name).then(titles => this.notes = titles);
    } else {
      this.notes = this._ls.getNotesInGroup(this.group.name);
    }
  }

  deleteGroup() {
    if (this._authData != null) {
      this._ds.deleteGroup(this.group.$key);
    } else {
      this._ls.deleteGroup(this.group.$key);
    }
    //this.groupsChanged.emit('');
    console.log(this.groupsChanged);
    this.groupsChanged.next([]);
  }


  editGroup() {
    if (this._authData != null) {
      this._ds.updateGroupName(this.group.$key, this.group.name);
    } else {
      this._ls.updateGroupName(this.group.$key, this.group.name);
    }
    this.groupsChanged.emit('');
  }

  //When pressing the edit button, it enables editing on the input field
  editing() {
    this.editingName = !this.editingName;

    if (this.editingName) {
      document.getElementById(this.group.$key).removeAttribute("readonly");
      document.getElementById(this.group.$key).focus();
    } else {
      document.getElementById(this.group.$key).setAttribute("readonly", "true");
      this.editGroup();
    }

  }

  toggleExpand() {
    this._tx._toggleExpand = !this._tx._toggleExpand;
    this.expanded = this._tx._toggleExpand;

    if (this.expanded) {
      this.arrowSrc = 'icon_hide_white.png';
    }
    else {
      this.arrowSrc = 'icon_expand_white.png';
    }
  }

  jumpToNote(note: string) {
    var element = document.getElementById(note);
    element.scrollIntoView(true);
  }

  jumpToGroup(groupId: string) {
    var element = document.getElementById(groupId);
    element.scrollIntoView(true);
  }

}