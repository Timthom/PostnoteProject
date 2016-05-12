import { Component, OnInit } from '@angular/core';
import {RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS} from '@angular/router-deprecated';
import {AngularFire} from 'angularfire2';
import {FirebaseListObservable} from 'angularfire2';
import {Postnote2App} from '../postnote2.component';
import {DataService} from '../data.service';

@Component({
  moduleId: module.id,
  selector: 'my-app',
  providers: [ROUTER_PROVIDERS, DataService, AngularFire],
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css'],
  directives: [ROUTER_DIRECTIVES, Postnote2App],
  pipes: []
})
@RouteConfig([
])
export class AppComponent implements OnInit {

  constructor() {}

  ngOnInit() {
  }

}
