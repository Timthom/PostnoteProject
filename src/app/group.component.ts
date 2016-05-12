import {Component, Input} from '@angular/core';
import {RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS} from '@angular/router-deprecated';
import {AngularFire} from 'angularfire2';
import {FirebaseListObservable} from 'angularfire2';
import {NoteComponent} from './note.component';

@Component({
  moduleId: module.id,
  selector: 'group',
  providers: [ROUTER_PROVIDERS],
  templateUrl: 'group.component.html',
  styleUrls: ['group.component.css'],
  directives: [ROUTER_DIRECTIVES, NoteComponent],
  pipes: []
})
@RouteConfig([
])

export class GroupComponent {
  @Input()
  group; 
  
  @Input()
  groupName;
}