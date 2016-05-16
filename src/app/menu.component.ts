import {Component, OnInit} from '@angular/core';
import {RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS} from '@angular/router-deprecated';
import {AngularFire} from 'angularfire2';
import {FirebaseListObservable} from 'angularfire2';
import {Note}from './note';
import {DataService} from './data.service';
import {MenuGroupComponent} from './menugroup.component';
import {ValueService} from './value.service';



@Component({
  moduleId: module.id,
  selector: 'menu',
  providers: [ROUTER_PROVIDERS],
  templateUrl: 'menu.component.html',
  styleUrls: ['menu.component.css'],
  directives: [ROUTER_DIRECTIVES, MenuGroupComponent],
  pipes: []
})
@RouteConfig([
])


export class MenuComponent implements OnInit {
    adding: boolean =false;
    groupName: string ="";
    titles :FirebaseListObservable<any[]>;  
    buttonText: string ="Add category";
    myGroups: FirebaseListObservable<any[]>;
    checkSideBar: boolean = this._vs._showSideBar;
    constructor(private _ds: DataService, private _vs:ValueService) {}
    
    
    ngOnInit() {
        this.getTitles();
        this.getGroups();
    }

    getTitles() {
        this._ds.getAllNotes().then(titles => this.titles = titles);
    }
    
    getGroups() {
      this._ds.getAllGroups().then(groups => this.myGroups = groups);
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
    
    addGroup(){
      if(this.groupName.trim().length > 0){
        let time = new Date().getTime();  
        this._ds.addGroupToGroups(this.groupName, time);
        this.groupName = "";
      }
    }
        closeSideBar(){
        
        this._vs._showSideBar = !this._vs._showSideBar;
        console.log('menu innnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnn','side button gone');
    }
}