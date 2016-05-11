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
  constructor() {
    console.log("inne i postnote2app konstruktor");
  }
  
 ngOnInit() {
    console.log("inne i onInit i postnoteapp2");
 }
  
}
