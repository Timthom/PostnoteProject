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
  groups: any;

  @Output()
  noteChanged = new EventEmitter();

  _authData;
  test: any;

  ngOnInit() {
    this.colorInit(this.color);
  }


  constructor( @Inject(FirebaseRef) private _ref: Firebase, private _ds: DataService, private _ls: LocalStorageService) {
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

  editClick() {
    this.isEditable = true;
    this.enabledIfNull = null;
  }

  save() {
    if(this.noteSelectedGroup == undefined){ //If no group selected
      this.noteSelectedGroup = this.group; //use the same one
    }
    if (this._authData != null) {
      this._ds.updateNoteTitle(this.noteInNote.$key, this.title);
      this._ds.updateNoteText(this.noteInNote.$key, this.text);
      this._ds.changeNoteGroup(this.noteInNote.$key, this.noteSelectedGroup);//moved

    } else {
      this._ls.updateNoteTitle(this.noteInNote.$key, this.title);
      this._ls.updateNoteText(this.noteInNote.$key, this.text);
      this._ls.changeNoteGroup(this.noteInNote.$key, this.noteSelectedGroup);//moved

    }
  
      this.noteChanged.emit('');
    this.isEditable = false;
    this.enabledIfNull = "";

  }

  //Emitted from dropdown
  noteGroupChanged(event) {
    this.noteSelectedGroup = event;
  }

  colorChanged(event) {
    this.colorSwitch(event);
    this.isEditable = true;
    if (this._authData != null) {
      this._ds.updateNoteColor(this.noteInNote.$key, event);
    } else {
      this._ls.updateNoteColor(this.noteInNote.$key, event);
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
      o._ds.deleteNote(o.noteInNote.$key);
    } else {
      o._ls.deleteNote(o.noteInNote.$key);

    };

    o.noteChanged.emit('');
    this.delete_button = !this.delete_button;
  }

  groupsChanged() {
    this.dropdownComponents.toArray().forEach((child) => child.getTitles());
  }
}

