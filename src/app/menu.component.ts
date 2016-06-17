import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS} from '@angular/router-deprecated';
import {Note}from './note';
import {DataService} from './data.service';
import {MenuGroupComponent} from './menugroup.component';
import {ValueService} from './value.service';
import {AngularFire, defaultFirebase, FirebaseRef, FirebaseListObservable} from 'angularfire2';
import {Injectable, Inject} from '@angular/core';
import {CanReuse} from "@angular/router-deprecated";
import {Group} from './group';
import {LocalStorageService} from './localstorage.service';
import {Reverse} from './reverse.pipe';
//import {Postnote2App} from './postnote2.component';

@Component({
  moduleId: module.id,
  selector: 'menu',
  providers: [ROUTER_PROVIDERS, LocalStorageService],
  templateUrl: 'menu.component.html',
  styleUrls: ['menu.component.css'],
  directives: [ROUTER_DIRECTIVES, MenuGroupComponent],
  pipes: [Reverse]
})

export class MenuComponent implements OnInit, CanReuse {

  routerCanReuse() {
    return false;
  }
  
  myGroups: any;
  notes: any;

  showingCancel: boolean = false;
  adding: boolean = false;
  groupName: string = "";
  titles: any;
  buttonText: string = "Add category";
  
  checkSideBar: boolean = this._vs._showSideBar;
  _authData;

  @Output() clicked = new EventEmitter();


  constructor( @Inject(FirebaseRef) private _ref: Firebase, private _ds: DataService, private _vs: ValueService, private _ls: LocalStorageService) {

    this._authData = this._ref.getAuth();
    //_postNote2.groupChanged.subscribe(this.getGroups);

  }

  ngOnInit() {
    this.getTitles();
    this.getGroups();
  }

  getTitles() {
    if (this._authData != null) {
      this._ds.getAllNotes().then(titles => this.titles = titles);
      this._ds.getAllNotesInGroup('noGroup').then(notes => this.titles = notes);
    } else {
      this.titles = this._ls.getNotesInGroup('noGroup');
    }
  }

  getGroups() {
    if (this._authData != null) {
      this._ds.getAllGroups().then(groups => this.myGroups = groups);
    } else {
      this.myGroups = this._ls.getAllGroups();
    }
  }


  jumpToNote(note: string) {
    var element = document.getElementById(note).offsetTop-(window.innerHeight/11);
    window.scrollTo(0, element);
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
    if (this.groupName.trim().length > 0) {
      let time = new Date().getTime();

      if (this._authData != null) {
        this._ds.addGroupToGroups(this.groupName, time);
        this.getGroups();
        this.getTitles();

      } else {
        let newGroup = new Group(this.groupName, time.toString());
        this._ls.saveGroup(newGroup);
        this.getGroups();
        //TEMPORARY
        //location.reload();
      }
      this.clicked.emit('');

      //Reset input after adding
      this.groupName = "";
      this.adding = false;
      this.showingCancel = !this.showingCancel;
      this.buttonText = "Add category";
    }
  }
  
  groupsChanged(groups : any){
    this.clicked.emit('');
  }
}


