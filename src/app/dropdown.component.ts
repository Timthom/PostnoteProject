import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS} from '@angular/router-deprecated';
import { AngularFire, defaultFirebase, FirebaseRef, FirebaseListObservable } from 'angularfire2';
import {DataService} from './data.service';
import {CORE_DIRECTIVES} from '@angular/common';
import {DROPDOWN_DIRECTIVES} from 'ng2-bootstrap/ng2-bootstrap';
import {Note}from './note';
import { Injectable, Inject } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'dropdown',
  providers: [ROUTER_PROVIDERS],
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
    public disabled:boolean = false;
    public status:{isopen:boolean} = {isopen: false};
    public items:Array<string> = ['The first choice!',
    'And another choice for you.', 'but wait! A third!'];
    _authData;

    public toggled(open:boolean):void {
    console.log('Dropdown is now: ', open);
    }

    public toggleDropdown($event:MouseEvent):void {
    $event.preventDefault();
    $event.stopPropagation();
    this.status.isopen = !this.status.isopen;
    }
    
    groups :FirebaseListObservable<any[]>;  
  
    constructor(@Inject(FirebaseRef) private _ref: Firebase, private _ds: DataService) {
        this._authData = this._ref.getAuth();
    }
    
    ngOnInit() {
        if(this._authData != null) {
        this.getTitles();
        }
    }
    
    getTitles() {
        if(this._authData != null) {
        this._ds.getAllGroups().then(titles => this.groups = titles);
        }
    }
    
    selectGroup(group: string){
        if(this._authData != null) {
      this.changeGroup.emit(group);
      this.changeNoteGroup.emit(group);
        
      var buttonText: HTMLElement = document.getElementById('group_name');
      buttonText.innerHTML = group;
      
      console.log("Group selected " + group);
    }
    }
}