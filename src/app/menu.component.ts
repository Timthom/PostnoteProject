import {Component} from '@angular/core';
import {RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS} from '@angular/router-deprecated';
import {AngularFire} from 'angularfire2';
import {FirebaseListObservable} from 'angularfire2';
import {Note}from './note';


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

export class MenuComponent {
    adding: boolean =false;
    titles :FirebaseListObservable<any[]>;
    buttonText: string ="Add category";
    groups: String[] = ["Food", "Work", "Cleaning", "Shopping"]; 

    constructor(private _af:AngularFire){
      this.titles = this._af.list('/notes');

    }
    jumpToNote(note:string){
      
      var element = document.getElementById(note);
      
      element.scrollIntoView(true);
      
    }
    
    toggleInput(){
      this.adding = !this.adding;
      if(this.adding){
        this.buttonText = "Cancel";
      }
      else{
        this.buttonText ="Add category";
      }
    }
}