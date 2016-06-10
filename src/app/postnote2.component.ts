import {Component} from '@angular/core';
import {RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS} from '@angular/router-deprecated';
import { AngularFire, defaultFirebase, FirebaseRef, FirebaseListObservable } from 'angularfire2';
import {NoteComponent} from './note.component';
import {MenuComponent} from './menu.component';
import {GroupComponent} from './group.component';
import {DataService} from './data.service';
import {OnInit, Output, EventEmitter} from '@angular/core';
import {CreatorComponent} from './creator.component';
import {HeaderbarComponent} from './headerbar/headerbar.component'
import {ValueService} from './value.service';
import { Injectable, Inject } from '@angular/core';
import {CanReuse} from "@angular/router-deprecated";
import {LocalStorageService} from './localStorage.service';
import { MenuGroupComponent } from './menugroup.component';


@Component({
    moduleId: module.id,
    selector: 'postnote2-app',
    providers: [ROUTER_PROVIDERS, DataService, AngularFire, LocalStorageService, MenuGroupComponent],
    templateUrl: 'postnote2.component.html',
    styleUrls: ['postnote2.component.css'],
    directives: [ROUTER_DIRECTIVES, NoteComponent, MenuComponent, GroupComponent, CreatorComponent, HeaderbarComponent],
    pipes: []
})

export class Postnote2App implements OnInit {

    _authData;

    @Output() groupChanged = new EventEmitter();

    btnImage: string = 'icon_menu.png';
    allGroups: any;
    statusCheckSideBar: boolean = this._vs._showSideBar;
    constructor( @Inject(FirebaseRef) private _ref: Firebase, private _ds: DataService, private _vs: ValueService, private _ls: LocalStorageService, private _menuGroup: MenuGroupComponent) {
        this._authData = this._ref.getAuth();
        this._menuGroup.groupsChanged.subscribe(this.getGroups());
    }

    ngOnInit() {
        this.getGroups();

    }

    getGroups() {

        if (this._authData != null) {
            this._ds.getAllGroups().then(groups => this.allGroups = groups);
        } else {
            this.allGroups = this._ls.getAllGroups();
        }
    }

    addGroup() {
        this.getGroups();
    }

    deleteGroup() {
        this.getGroups();
        this.groupChanged.emit('');
    }

    toggleSideBar() {
        this._vs._showSideBar = !this._vs._showSideBar;
        this.statusCheckSideBar = this._vs._showSideBar;
        if (this.statusCheckSideBar) {
            this.btnImage = 'icon_back.png';
        } else {
            this.btnImage = 'icon_menu.png';
        }
    }
    
}
