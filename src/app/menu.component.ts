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

<<<<<<< HEAD
export class MenuComponent implements OnInit {
    adding: boolean =false;
    titles :FirebaseListObservable<any[]>;  
    buttonText: string ="Add category";
    groups: String[] = ["Food", "Work", "Cleaning", "Shopping"]; 
 
    constructor(private _ds: DataService) {}
    
    //Vet ej om den behövs
    //constructor(private _af:AngularFire){
      //this.titles = this._af.list('/notes');
    //}
    
    ngOnInit() {
        this.getTitles();
    }

    getTitles() {
        this._ds.getAllNotes().then(titles => this.titles = titles);
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