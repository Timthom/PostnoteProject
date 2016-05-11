import {Component} from 'angular2/core';
import {RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS} from 'angular2/router';
import {AngularFire} from 'angularfire2';
import {FirebaseListObservable} from 'angularfire2';
import {MenuComponent} from './menu.component';
import {DataService} from './data.service';
import {OnInit} from 'angular2/core';
import {AllNotesComponent} from './allnotes.component';
import {LoginComponent} from './createuser.login.components/login.component';
import {CreateUserAccountComponent} from './createuser.login.components/create-user-account.component';

@Component({
  moduleId: __moduleName,
  selector: 'postnote2-app',
  providers: [ROUTER_PROVIDERS, DataService, AngularFire],
  templateUrl: 'postnote2.component.html',
  styleUrls: ['postnote2.component.css'],
  directives: [ROUTER_DIRECTIVES, MenuComponent],
  pipes: []   
})

@RouteConfig([
  {path: '/route1', name:'AllNotes', component: AllNotesComponent, useAsDefault : true},
  {path: '/route2', name:'CreateUserAccount', component: CreateUserAccountComponent},
  {path: '/route3', name:'Login', component: LoginComponent}
])

export class Postnote2App implements OnInit {
  constructor() {
    console.log("inne i postnote2app konstruktor");
  }
  
 ngOnInit() {
    console.log("inne i onInit i postnoteapp2");
 }
  
}
