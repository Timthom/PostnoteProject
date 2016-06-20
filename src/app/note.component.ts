import {Component, OnInit, Output, EventEmitter, ViewChild, ViewChildren, QueryList} from '@angular/core';
import {RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS} from '@angular/router-deprecated';
import {AngularFire} from 'angularfire2';
import {FirebaseListObservable} from 'angularfire2';
import {DataService} from './data.service';
//added
import {Input, Inject, Injectable} from '@angular/core';
import {Note} from './note';
import {DropdownComponent} from './dropdown.component';
import {ColorpickerComponent} from './colorpicker.component';
import { defaultFirebase, FirebaseRef } from 'angularfire2';
import {LocalStorageService} from './localstorage.service';
import { DragulaHelperService } from './dragula-helper.service';

@Component({
  moduleId: module.id,
  selector: 'note',
  providers: [ROUTER_PROVIDERS],
  templateUrl: 'note.component.html',
  styleUrls: ['note.component.css'],
  directives: [ROUTER_DIRECTIVES, DropdownComponent, ColorpickerComponent],
  pipes: []
})
@RouteConfig([
])

export class NoteComponent implements OnInit {

  @ViewChildren(DropdownComponent)
  private dropdownComponents: QueryList<DropdownComponent>;

  @Input()
  noteInNote;

  @Input()
  title;

  @Input()
  text;

  @Input()
  group;

  @Input()
  color;

  @Input()
  position;

  @Input()
  groups: any;

  @Output()
  noteChanged = new EventEmitter();

  _authData;
  test: any;

  ngOnInit() {
    this.colorInit(this.color);
  }

  constructor(@Inject(FirebaseRef) private _ref: Firebase, private _ds: DataService, private _ls: LocalStorageService, private _dragulaHelper: DragulaHelperService) {
    this._authData = this._ref.getAuth();
  }

  isEditable: boolean = false;
  delete_button: boolean = true;
  enabledIfNull: string = "";
  noteSelectedGroup: string = this.group;
  isPink: boolean = false;
  isMagenta: boolean = false;
  isOrange: boolean = false;
  isBlue: boolean = false;
  isYellow: boolean = true;
  isGreen: boolean = false;
  colorString: string; //for saving event from colorPicker

  editClick() {
    this.isEditable = true;
    this.enabledIfNull = null;
  }

  save() {
    
    if (this.noteSelectedGroup == undefined) { //If no group selected
      this.noteSelectedGroup = this.group; //use the same one
    }
    if (this._authData != null) {
      this._ds.updateNoteTitle(this.noteInNote.$key, this.title);
      this._ds.updateNoteText(this.noteInNote.$key, this.text);
      this._ds.changeNoteGroup(this.noteInNote.$key, this.noteSelectedGroup);//moved
      if (this.colorString != undefined) { //If new color has been chosen
        this._ds.updateNoteColor(this.noteInNote.$key, this.colorString);//moved
      }
    } else {
      this._ls.updateNoteTitle(this.noteInNote.$key, this.title);
      this._ls.updateNoteText(this.noteInNote.$key, this.text);
      this._ls.changeNoteGroup(this.noteInNote.$key, this.noteSelectedGroup);//moved
      if (this.colorString != undefined) { //If new color has been chosen
        this._ls.updateNoteColor(this.noteInNote.$key, this.colorString);//moved
      }
      // console.log("old pos " + this.noteInNote.position);
      // console.log("new position " + this.position);
      // this._ls.updateNotePosition(this.noteInNote.$key, this.position);

        // console.log('SAVE: här kommer alla i noGroup');
        // let tempNotes = this._ls.getNotesInGroup('noGroup');
        // for (let note of tempNotes) {
        //   console.log(`note.title = ${note.title}, note.position = ${note.position}`);
        // }

    }

    this.noteChanged.emit('');
    this.isEditable = false;
    this.enabledIfNull = "";

  }

  //Emitted from dropdown
  noteGroupChanged(event) {
    // console.log(`här kommer event ${event}`);

    this.noteSelectedGroup = event;

    if (this._authData != null) {
      let getPosInfo: any = this._ds.getPositionFromId(this.noteInNote.$key);
      let getOldGroupInfo: any = this._ds.getGroupNameFromId(this.noteInNote.$key);
      Promise.all([getPosInfo, getOldGroupInfo]).then((result) => {
        let prevPos = result[0];
        let oldGroup = result[1];
        // console.log(`prevPos = ${prevPos}, oldGroup = ${oldGroup}, newGroup = ${this.noteSelectedGroup}`);
        this._dragulaHelper.groupChangedByDropDown(oldGroup, this.noteSelectedGroup, prevPos, this.noteInNote.$key);
        // this._ds.changeNoteGroup(this.noteInNote.$key, this.noteSelectedGroup);
      });
    } else {
      this._dragulaHelper.groupChangedByDropDown(this.group, this.noteSelectedGroup, this._ls.getPositionFromId(this.noteInNote.$key), this.noteInNote.$key);
      // this._ls.changeNoteGroup(this.noteInNote.$key, this.noteSelectedGroup);
    }
    //this.noteChanged.emit(''); uppdateras m.h.a. editclick??
  }

  colorChanged(event) {
    this.colorSwitch(event);
    this.isEditable = true;
    this.colorString = event;
    if (this._authData != null) {
    } else {
    }
  }

  resetColors() {
    this.isPink = false;
    this.isMagenta = false;
    this.isOrange = false;
    this.isBlue = false;
    this.isYellow = false;
    this.isGreen = false;
  }

  colorInit(event) {
    this.colorSwitch(event);
  }

  colorSwitch(event) {
    this.resetColors();
    switch (event) {
      case "pink":
        this.isPink = true;
        break;
      case "magenta":
        this.isMagenta = true;
        break;
      case "orange":
        this.isOrange = true;
        break;
      case "blue":
        this.isBlue = true;
        break;
      case "yellow":
        this.isYellow = true;
        break;
      case "green":
        this.isGreen = true;
        break;
      default:
        this.isYellow = true;
    }
  }

  deleteClick() {
    var o = this;

    if (o._authData != null) {
     
      let getIdInfo: any = o._ds.getPositionFromId(o.noteInNote.$key);
      getIdInfo.then(prevPos => o._dragulaHelper.updatePositionsInGroupAndThenDeleteNoteWhenPressingDelete(o.group, prevPos, o.noteInNote));   
    } else {
      // console.log("deleteclick" + o.noteInNote.title + " pos: " + o.noteInNote.position);
      o._dragulaHelper.updatePositionsInGroupAndThenDeleteNoteWhenPressingDelete(o.group, o._ls.getPositionFromId(o.noteInNote.$key), o.noteInNote);   
    };

    o.noteChanged.emit('');
    this.delete_button = !this.delete_button;
  }

  groupsChanged() {
    this.dropdownComponents.toArray().forEach((child) => child.getTitles());
  }
}

