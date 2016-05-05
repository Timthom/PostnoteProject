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
    title: string = ""; 
    text: string = ""; 
    //notes: Note[] = []; 
    
    notes: String[] = []; 
    
    save() {
        if(this.title !== ""){
            console.log(this.title);
            console.log(this.text);
            this.notes.splice(0,0, this.title);
            
            
            console.log(this.notes);
            this.title = ""; 
            this.text = "";
        }
    }
    
}