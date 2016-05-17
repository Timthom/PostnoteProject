import {Component} from '@angular/core';
import {RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS} from '@angular/router-deprecated';
import {AngularFire} from 'angularfire2';
import {FirebaseListObservable} from 'angularfire2';
import {NoteComponent} from './note.component';
import {MenuComponent} from './menu.component';
import {GroupComponent} from './group.component';
import {DataService} from './data.service';
import {OnInit} from '@angular/core';
import {CreatorComponent} from './creator.component';
import{ValueService} from './value.service';

@Component({
  moduleId: module.id,
  selector: 'postnote2-app',
  providers: [ROUTER_PROVIDERS, DataService, AngularFire],
  templateUrl: 'postnote2.component.html',
  styleUrls: ['postnote2.component.css'],
  directives: [ROUTER_DIRECTIVES, NoteComponent, MenuComponent, GroupComponent, CreatorComponent],
  pipes: []
})
@RouteConfig([
])
export class Postnote2App implements OnInit {
  
  
  allGroups :FirebaseListObservable<any[]>;
   statusCheckSideBar:boolean = this._vs._showSideBar;
   constructor(private _ds: DataService, private _vs:ValueService) {}
    
    ngOnInit() {
        this.getGroups();
    }
    
    getGroups() {
        console.log('inne i get groups');
        this._ds.getAllGroups().then(groups => this.allGroups = groups);
    }
    
    addGroup() {
       console.log(event);
       this.getGroups();
    }
    
    
    openSideBar(){
  
        this._vs._showSideBar = !this._vs._showSideBar;
        this.statusCheckSideBar = this._vs._showSideBar;
        console.log('Menu in and show only button');
    }
  
}
