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
  selector: 'allnotes',
  providers: [ROUTER_PROVIDERS, DataService, AngularFire],
  templateUrl: 'allnotes.component.html',
  styleUrls: ['allnotes.component.css'],
  directives: [ROUTER_DIRECTIVES, NoteComponent, MenuComponent, GroupComponent, CreatorComponent],
  pipes: []
})



export class AllNotesComponent implements OnInit {
  constructor() {
    console.log("inne i postnote2app konstruktor");
  }
  
 ngOnInit() {
    console.log("inne i onInit i postnoteapp2");
 }
  
}