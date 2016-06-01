import { Component, OnInit } from '@angular/core';
import {RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS, Router} from '@angular/router-deprecated';
import {AngularFire} from 'angularfire2';
import {FirebaseListObservable} from 'angularfire2';
import {Postnote2App} from '../postnote2.component';
import {DataService} from '../data.service';
import {ValueService} from '../value.service';
import {LoginComponent} from '../login.components/login.component';
import {CreateUserAccountComponent} from '../createuser.components/create-user-account.component';
import {AuthorizationService} from "../authorization.service";
import {UserHandlerComponent} from "./user-handler.component";
import {MenuComponent} from '../menu.component';
// import { DragulaService } from 'ng2-dragula/ng2-dragula';

@Component({
  moduleId: module.id,
  selector: 'my-app',
  providers: [ROUTER_PROVIDERS, DataService, AngularFire,ValueService],
  // viewProviders: [DragulaService],
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css'],
  directives: [UserHandlerComponent, ROUTER_DIRECTIVES],
  pipes: []
})

@RouteConfig([
   // {path: '/route1', name:'UserHandlerRoute', component: UserHandlerComponent, useAsDefault : true},
   
])

export class AppComponent{
  
  constructor() {
     console.log("Funkar?");
  }

 
  
}


 /* {path: '/route2', name:'AllNotes', component: Postnote2App},
   {path: '/route3', name:'CreateUserAccount', component: CreateUserAccountComponent} */