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
import { DragulaService } from 'ng2-dragula/ng2-dragula';
import { DragulaHelperService } from '../dragula-helper.service';
import {LocalStorageService} from '../localstorage.service';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

@Component({
  moduleId: module.id,
  selector: 'my-app',
  providers: [ROUTER_PROVIDERS, DataService, AngularFire,ValueService, DragulaHelperService, LocalStorageService, ToastsManager],
  viewProviders: [DragulaService],
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css'],
  directives: [UserHandlerComponent, ROUTER_DIRECTIVES],
  pipes: []
})

@RouteConfig([
  {
    path: "/",
    name: 'UserHandlerRoute',
    component: UserHandlerComponent
  }
   
])

export class AppComponent{
  
  constructor(private _dragulaService: DragulaService, private _dhs: DragulaHelperService, private _authServiceHandler: AuthorizationService, public toastr: ToastsManager) {
    this._dhs._configureDragula(_dragulaService);
  }
}