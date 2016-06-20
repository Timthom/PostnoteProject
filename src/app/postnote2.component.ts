import {Component, ViewChild, AfterViewInit, ViewChildren, QueryList} from '@angular/core';
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
import {LocalStorageService} from './localstorage.service';
import { MenuGroupComponent } from './menugroup.component';
import {enableProdMode} from '@angular/core';
import { DropdownComponent } from './dropdown.component';
enableProdMode();


@Component({
    moduleId: module.id,
    selector: 'postnote2-app',
    providers: [ROUTER_PROVIDERS, DataService, AngularFire, LocalStorageService, MenuGroupComponent],
    templateUrl: 'postnote2.component.html',
    styleUrls: ['postnote2.component.css'],
    directives: [ROUTER_DIRECTIVES, NoteComponent, MenuComponent, GroupComponent, CreatorComponent, HeaderbarComponent, DropdownComponent],
    pipes: []
})

export class Postnote2App implements OnInit, AfterViewInit{
    
    allNotes: any;
    allGroups: any;

    _authData;
    _token;

    @Output() groupChanged = new EventEmitter();
    
    @ViewChild(MenuComponent)
    private menuComponent : MenuComponent;
    
    @ViewChildren(GroupComponent)
    private groupComponents : QueryList<GroupComponent>;
    
    @ViewChild(CreatorComponent)
    private creatorComponent : CreatorComponent;

    navbarColor: string  = this.randomColor();
    btnImage: string = 'icon_menu.png';
    statusCheckSideBar: boolean = this._vs._showSideBar;
   

    constructor( @Inject(FirebaseRef) private _ref: Firebase, private _ds: DataService, private _vs: ValueService, private _ls: LocalStorageService, private _menuGroup: MenuGroupComponent) {
        this._authData = this._ref.getAuth();
        this._menuGroup.groupsChanged.subscribe(this.getGroups());
        this._token = localStorage.getItem('token');
    }

    ngOnInit() {
        this.getGroups();
        this.getNotes();

    }

    getGroups() {
        const token = localStorage.getItem('token');
        if (this._authData != null && token != null) {
            this._ds.getAllGroups().then(groups => this.allGroups = groups);
        } else {
            this.allGroups = this._ls.getAllGroups();
        }
       

    }
    
    getNotes() {

        const token = localStorage.getItem('token');
        if (this._authData != null && token != null) {
            this._ds.getAllNotes().then(notes => this.allNotes = notes);
        } else {
            this.allNotes = this._ls.getAllNotes();
        }
    }

    groupsChanged(groups : any){
        this.creatorComponent.groupsChanged();
        this.getGroups();
        if(this.menuComponent != undefined){ //If we have access to the menu
            this.menuComponent.getGroups();
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
    
    ngAfterViewInit(){
        
    }
    
    updateNotes() {
        //this.menuComponent.getTitles; //funkar ändå..
        this.groupComponents.toArray().forEach((child)=>child.getNotes());
        this.creatorComponent.getNotes();
    }

    randomColor() {
        var colors = ["#F490B7", "#FFA334", "#F56D7E", "#8FD3CE", "#EEF66C", "mediumseagreen"];
        var color = colors[Math.floor(Math.random()*colors.length)];

        return color;
    }

}
