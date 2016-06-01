import {Component} from '@angular/core';
import {RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS} from '@angular/router-deprecated';
import { AngularFire, defaultFirebase, FirebaseRef, FirebaseListObservable } from 'angularfire2';
import {NoteComponent} from './note.component';
import {MenuComponent} from './menu.component';
import {GroupComponent} from './group.component';
import {DataService} from './data.service';
import {OnInit} from '@angular/core';
import {CreatorComponent} from './creator.component';
import {HeaderbarComponent} from './headerbar/headerbar.component'
import {ValueService} from './value.service';
import { Injectable, Inject } from '@angular/core';
import {CanReuse} from "@angular/router-deprecated";

import {LocalStorageService} from './localStorage.service';

@Component({
  moduleId: module.id,
  selector: 'postnote2-app',
  providers: [ROUTER_PROVIDERS, DataService, AngularFire, LocalStorageService],
  templateUrl: 'postnote2.component.html',
  styleUrls: ['postnote2.component.css'],
  directives: [ROUTER_DIRECTIVES, NoteComponent, MenuComponent, GroupComponent, CreatorComponent, HeaderbarComponent],
  pipes: []
})

export class Postnote2App implements OnInit{
    
    _authData;
    
  allGroups :FirebaseListObservable<any[]>;
   statusCheckSideBar:boolean = this._vs._showSideBar;
   constructor(@Inject(FirebaseRef) private _ref: Firebase, private _ds: DataService, private _vs:ValueService, private _ls: LocalStorageService) {
        console.log("Här är auth data: " + this._ref.getAuth());
        this._authData = this._ref.getAuth();
        console.log("Här är auth data 2: " + this._authData);
        console.log(this._ls);
   }
    
    ngOnInit() {
       if(this._authData != null) {
        this.getGroups();
        console.log("Bör inte köras");
       } else {
           console.log("ngoninit in postnote2component offline");
       }
    }

    getGroups() {
        if (this._authData != null) {
            //console.log('inne i get groups');
            this._ds.getAllGroups().then(groups => this.allGroups = groups);
            console.log("Bör inte köras");
        } else {
            console.log("getgroups in postnote2component offline");
        }
    }

    addGroup() {
        this.getGroups();
    }

    deleteGroup() {
        this.getGroups();
    }

    openSideBar() {
        this._vs._showSideBar = !this._vs._showSideBar;
        this.statusCheckSideBar = this._vs._showSideBar;
    }
    

}
