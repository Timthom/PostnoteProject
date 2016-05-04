import {Component} from 'angular2/core';
import {RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS} from 'angular2/router';
import {AngularFire} from 'angularfire2';
import {FirebaseListObservable} from 'angularfire2';

@Component({
  moduleId: __moduleName,
  selector: 'note',
  providers: [ROUTER_PROVIDERS],
  templateUrl: 'note.component.html',
  styleUrls: ['note.component.css'],
  directives: [ROUTER_DIRECTIVES],
  pipes: []
})
@RouteConfig([
])

export class NoteComponent {
    
    
}
