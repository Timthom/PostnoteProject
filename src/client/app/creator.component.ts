import {Component} from 'angular2/core';
import {RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS} from 'angular2/router';
import {AngularFire} from 'angularfire2';
import {FirebaseListObservable} from 'angularfire2';

@Component({
  moduleId: __moduleName,
  selector: 'creator',
  providers: [ROUTER_PROVIDERS],
  templateUrl: 'creator.component.html',
  styleUrls: ['creator.component.css'],
  directives: [ROUTER_DIRECTIVES],
  pipes: []
})
@RouteConfig([
])

export class CreatorComponent {
    
    
}