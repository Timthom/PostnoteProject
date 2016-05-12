import {Component, OnInit} from '@angular/core';
import {RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS} from '@angular/router-deprecated';
import {AngularFire} from 'angularfire2';
import {FirebaseListObservable} from 'angularfire2';
import {DataService} from './data.service';
import {CORE_DIRECTIVES} from '@angular/common';
import {DROPDOWN_DIRECTIVES} from 'ng2-bootstrap/ng2-bootstrap';
import {Note}from './note';

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
    public disabled:boolean = false;
    public status:{isopen:boolean} = {isopen: false};
    public items:Array<string> = ['The first choice!',
    'And another choice for you.', 'but wait! A third!'];

    public toggled(open:boolean):void {
    console.log('Dropdown is now: ', open);
    }

    public toggleDropdown($event:MouseEvent):void {
    $event.preventDefault();
    $event.stopPropagation();
    this.status.isopen = !this.status.isopen;
    }
    
    groups :FirebaseListObservable<any[]>;  
  
    constructor(private _ds: DataService) {}
    
    ngOnInit() {
        this.getTitles();
    }
    
    getTitles() {
        this._ds.getAllGroups().then(titles => this.groups = titles);
    }
    
    selectGroup(group: string){
        
        
      var buttonText: HTMLElement = document.getElementById('group_name');
      buttonText.innerHTML = group;
      
      console.log("Group selected " + group);
    }
}