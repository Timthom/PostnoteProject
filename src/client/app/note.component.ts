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
/*
export class NoteClass {
    constructor(titleName){
        titleName = ""
    }
    
    getInputText(){
        
    }
}

var divContainer;
var titleArray = [];

var iDiv = document.createElement('div');
iDiv.id = 'header';
document.getElementById('container').appendChild(iDiv);

var button = document.createElement('button');
button.id = 'test';
document.getElementById('header').appendChild(button);
*/