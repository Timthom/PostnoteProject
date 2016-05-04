import {Component} from 'angular2/core';
import {RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS} from 'angular2/router';
import {AngularFire} from 'angularfire2';
import {FirebaseListObservable} from 'angularfire2';
import {NoteComponent} from './note.component';
import {MenuComponent} from './menu.component';
import {GroupComponent} from './group.component';
import {DataService} from './data.service';
import {OnInit} from 'angular2/core';

@Component({
  moduleId: __moduleName,
  selector: 'postnote2-app',
  providers: [ROUTER_PROVIDERS, DataService],
  templateUrl: 'postnote2.component.html',
  styleUrls: ['postnote2.component.css'],
  directives: [ROUTER_DIRECTIVES, NoteComponent, MenuComponent, GroupComponent],
  pipes: []
})
@RouteConfig([
])
export class Postnote2App implements OnInit {
  constructor(private _dataService: DataService) {}
  
  ngOnInit() {
    
 }
  
  defaultMeaning: number = 42;

  meaningOfLife(meaning?: number) {
    return `The meaning of life is ${meaning || this.defaultMeaning}`;
  }
}
