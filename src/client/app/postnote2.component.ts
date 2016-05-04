import {Component} from 'angular2/core';
import {RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS} from 'angular2/router';
import {AngularFire} from 'angularfire2';
import {FirebaseListObservable} from 'angularfire2';
import {NoteComponent} from './note.component';
import {MenuComponent} from './menu.component';
import {GroupComponent} from './group.component';
import {DataService} from './data.service';
import {OnInit} from 'angular2/core';
import {CreatorComponent} from './creator.component';

@Component({
  moduleId: __moduleName,
  selector: 'postnote2-app',
  providers: [ROUTER_PROVIDERS, DataService],
  templateUrl: 'postnote2.component.html',
  styleUrls: ['postnote2.component.css'],
  directives: [ROUTER_DIRECTIVES, NoteComponent, MenuComponent, GroupComponent, CreatorComponent],
  pipes: []
})
@RouteConfig([
])
export class Postnote2App implements OnInit {
  constructor(private _dataService: DataService) {}
  
 ngOnInit() {
    
 }
  
}
