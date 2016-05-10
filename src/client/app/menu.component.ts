import {Component} from 'angular2/core';
import {RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS} from 'angular2/router';
import {AngularFire} from 'angularfire2';
import {FirebaseListObservable} from 'angularfire2';
import {Note}from './note';


@Component({
  moduleId: __moduleName,
  selector: 'menu',
  providers: [ROUTER_PROVIDERS],
  templateUrl: 'menu.component.html',
  styleUrls: ['menu.component.css'],
  directives: [ROUTER_DIRECTIVES],
  pipes: []
})
@RouteConfig([
])

export class MenuComponent {
    
    titles :FirebaseListObservable<Note[]>;

    constructor(private _af:AngularFire){
      this.titles = this._af.list('/notes');

    }
    jumpToNote(note:Note){
      console.log("Loggar ut note ",note);
    }
}