import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS} from '@angular/router-deprecated';
import {Note}from './note';
import {DataService} from './data.service';
import {MenuGroupComponent} from './menugroup.component';
import {ValueService} from './value.service';
import {AngularFire, defaultFirebase, FirebaseRef, FirebaseListObservable} from 'angularfire2';
import {Injectable, Inject} from '@angular/core';
import {CanReuse} from "@angular/router-deprecated";

@Component({
  moduleId: module.id,
  selector: 'menu',
  providers: [ROUTER_PROVIDERS],
  templateUrl: 'menu.component.html',
  styleUrls: ['menu.component.css'],
  directives: [ROUTER_DIRECTIVES, MenuGroupComponent],
  pipes: []
})

export class MenuComponent implements OnInit, CanReuse {

  routerCanReuse() {
    return false;
  }

  showingCancel: boolean = false;
  adding: boolean = false;
  groupName: string = "";
  titles: FirebaseListObservable<any[]>;
  buttonText: string = "Add category";
  myGroups: FirebaseListObservable<any[]>;
  checkSideBar: boolean = this._vs._showSideBar;
  _authData;

  @Output() clicked = new EventEmitter();

  constructor( @Inject(FirebaseRef) private _ref: Firebase, private _ds: DataService, private _vs: ValueService) {
    this._authData = this._ref.getAuth();
  }

  ngOnInit() {
    if (this._authData != null) {
      this.getTitles();
      this.getGroups();
    } else {
      console.log("ngOnInit in menu offline");
      //skall innehålla samma funktioner? 
    }
  }

  getTitles() {
    if (this._authData != null) {
      this._ds.getAllNotes().then(titles => this.titles = titles);
      this._ds.getAllNotesInGroup('noGroup').then(notes => this.titles = notes);
    } else {
      console.log("get titles offline");
    }
  }

  getGroups() {
    if (this._authData != null) {
      this._ds.getAllGroups().then(groups => this.myGroups = groups);
    } else {
      console.log("get groups offline");
    }
  }


  jumpToNote(note: string) {
    var element = document.getElementById(note);
    element.scrollIntoView(true);
  }

  toggleInput() {
    this.adding = !this.adding;
    this.showingCancel = !this.showingCancel;
    if (this.adding) {
      this.buttonText = "Cancel";
    } else {
      this.buttonText = "Add category";
    }
  }

  addGroup() {
    if (this._authData != null) {
      if (this.groupName.trim().length > 0) {
        let time = new Date().getTime();
        this._ds.addGroupToGroups(this.groupName, time);
        this.groupName = "";
        this.getGroups();
        this.getTitles();
        this.clicked.emit('');
        this.adding = false;
        this.buttonText = "Add category";
      }
    } else {
      console.log("added group offline");
    }
  }
}