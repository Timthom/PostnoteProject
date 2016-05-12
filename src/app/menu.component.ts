import {Component, OnInit} from '@angular/core';
import {RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS} from '@angular/router-deprecated';
import {AngularFire} from 'angularfire2';
import {FirebaseListObservable} from 'angularfire2';
import {Note}from './note';
import {DataService} from './data.service';


@Component({
  moduleId: module.id,
  selector: 'menu',
  providers: [ROUTER_PROVIDERS],
  templateUrl: 'menu.component.html',
  styleUrls: ['menu.component.css'],
  directives: [ROUTER_DIRECTIVES],
  pipes: []
})
@RouteConfig([
])

export class MenuComponent implements OnInit {
  
    titles :FirebaseListObservable<any[]>;  
  
    constructor(private _ds: DataService) {}
    
    ngOnInit() {
        this.getTitles();
    }
    
    getTitles() {
        this._ds.getAllNotes().then(titles => this.titles = titles);
    }
    
    jumpToNote(note:string){
      
      var element = document.getElementById(note);
      
      element.scrollIntoView(true);
      
      console.log("Loggar ut note ", element);
    }
}