import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS} from '@angular/router-deprecated';
import { AngularFire, defaultFirebase, FirebaseRef, FirebaseListObservable } from 'angularfire2';
import {DataService} from './data.service';
import {CORE_DIRECTIVES} from '@angular/common';
import {DROPDOWN_DIRECTIVES} from 'ng2-bootstrap/ng2-bootstrap';
import {Note}from './note';
import { Injectable, Inject } from '@angular/core';
import {LocalStorageService} from './localstorage.service';
import {MenuComponent} from './menu.component';
import {MenuGroupComponent} from './menugroup.component';
import {UserHandlerComponent} from './app/user-handler.component';


@Component({
    moduleId: module.id,
    selector: 'dropdown',
    providers: [ROUTER_PROVIDERS, LocalStorageService, MenuComponent, MenuGroupComponent],
    templateUrl: 'dropdown.component.html',
    styleUrls: ['dropdown.component.css'],
    directives: [ROUTER_DIRECTIVES, DROPDOWN_DIRECTIVES, CORE_DIRECTIVES],
    pipes: []
})

@RouteConfig([
])

export class DropdownComponent implements OnInit {
    @Input() group: string;
    @Output() changeGroup = new EventEmitter();
    @Input() noteGroup: string;
    @Output() changeNoteGroup = new EventEmitter();
    @Input() groups: any;
    public disabled: boolean = false;
    public status: { isopen: boolean } = { isopen: false };

    _authData;

    public toggled(open: boolean): void {
    }

    public toggleDropdown($event: MouseEvent): void {
        $event.preventDefault();
        $event.stopPropagation();
        this.status.isopen = !this.status.isopen;
    }



    constructor( @Inject(FirebaseRef) private _ref: Firebase, private _ds: DataService, private _ls: LocalStorageService, private _menu: MenuComponent, private _menuGroup: MenuGroupComponent) {
        this._authData = this._ref.getAuth();
      
    }

    ngOnInit() {
        this.getTitles();
    }

    getTitles() {
        if (this._authData != null) {
            this._ds.getAllGroups().then(titles => this.groups = titles);
        } else {
            this.groups = this._ls.getAllGroups();
        }
    }

    selectGroup(group: string) {
        //Emits to creator?
        this.changeGroup.emit(group);
        //Emits to note component and group component?
        this.changeNoteGroup.emit(group);
        var buttonText: HTMLElement = document.getElementById('group_name');
        buttonText.innerHTML = group;
    }
}