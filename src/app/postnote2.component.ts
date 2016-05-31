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
import{UserHandlerComponent} from './app/user-handler.component';

@Component({
    moduleId: module.id,
    selector: 'postnote2-app',
    providers: [ROUTER_PROVIDERS, DataService, AngularFire],
    templateUrl: 'postnote2.component.html',
    styleUrls: ['postnote2.component.css'],
    directives: [ROUTER_DIRECTIVES, NoteComponent, MenuComponent, GroupComponent, CreatorComponent/*, UserHandlerComponent*/],
    pipes: []
})

export class Postnote2App implements OnInit, CanReuse {

    _authData;
    //111111111111111111111User handler
    _userLogOut;

    routerCanReuse() {
        return false;
    }

    allGroups: FirebaseListObservable<any[]>;
    statusCheckSideBar: boolean = this._vs._showSideBar;
    constructor( @Inject(FirebaseRef) private _ref: Firebase, private _ds: DataService, private _vs: ValueService/*,private _uh:UserHandlerComponent*/) {
        //console.log("Här är auth data: " + this._ref.getAuth());
        this._authData = this._ref.getAuth();
        
        //111111111111111111111 Getting methods from user handler component
        //this._userLogOut = this._uh.switchToLogoutWindow();
        
        //console.log("Här är auth data 2: " + this._authData);
    }
    
    // Func to logout
    logOutUser(){
        console.log('ask user to logout');
    }
    loginUser(){
        console.log('Ask user to login');
    }
    

    ngOnInit() {
        if (this._authData != null) {
            this.getGroups();
            //console.log("Bör inte köras");
        }
    }

    getGroups() {
        if (this._authData != null) {
            //console.log('inne i get groups');
            this._ds.getAllGroups().then(groups => this.allGroups = groups);
            //console.log("Bör inte köras");
        }
    }

    addGroup() {
        this.getGroups();
    }

    deleteGroup() {
        this.getGroups();
    }

    openSideBar(event) {
        this._vs._showSideBar = !this._vs._showSideBar;
        this.statusCheckSideBar = this._vs._showSideBar;
    }

}
