import { Component, OnInit } from '@angular/core';
import {RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS} from '@angular/router-deprecated';
import {AngularFire} from 'angularfire2';
import {FirebaseListObservable} from 'angularfire2';
import {Postnote2App} from '../postnote2.component';
import {MenuComponent} from '../menu.component';
import {DataService} from '../data.service';
import {LoginComponent} from '../login.components/login.component';
import {CreateUserAccountComponent} from '../createuser.components/create-user-account.component';

@Component({
  moduleId: module.id,
  selector: 'my-app',
  providers: [ROUTER_PROVIDERS, DataService, AngularFire],
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css'],
  directives: [ROUTER_DIRECTIVES, MenuComponent],
  pipes: []
})

@RouteConfig([
   {path: '/route1', name:'Login', component: LoginComponent, useAsDefault : true},
   {path: '/route2', name:'AllNotes', component: Postnote2App},
   {path: '/route3', name:'CreateUserAccount', component: CreateUserAccountComponent}
])

export class AppComponent implements OnInit {

  constructor() {}

  ngOnInit() {}
  
}
