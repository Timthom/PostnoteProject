import {Component, Input, Pipe} from '@angular/core';
import {AngularFire} from 'angularfire2';
import {FirebaseListObservable} from 'angularfire2';
import {DataService} from './data.service';
import {OnInit} from '@angular/core';
import {Postnote2App} from './postNote2.component';
import { Injectable } from '@angular/core';
import { defaultFirebase, FirebaseRef } from 'angularfire2';
import { Observable } from 'rxjs/Observable';


@Component({
  moduleId: module.id,
  selector: 'menuGroup',
  templateUrl: 'menuGroup.component.html',
  styleUrls: ['menuGroup.component.css'],
  pipes: []
})


export class MenuGroupComponent implements OnInit{
  arrowSrc: string = 'icon_expand_white.png';
  expanded: boolean = false;
  editingName: boolean = false;
  notes: FirebaseListObservable<any[]>;
  
  @Input()
  group; 
  
  constructor(private _ds: DataService) {}

  ngOnInit() {
        this.getNotes();
  }

  getNotes() {
        this._ds.getAllNotesInGroup(this.group.name).then(titles => this.notes = titles);
        
  }
   
   deleteGroup() {
      this._ds.deleteGroup(this.group.$key);
    }
    
    editGroupName() {
      this._ds.updateGroupName(this.group.$key, this.group.name);
    }
    
    editGroup() {
      this._ds.updateGroupName(this.group.$key, this.group.name);
    }
    
    //When pressing the edit button, it enables editing on the input field
    editing() {
      this.editingName = !this.editingName;
      if(this.editingName){
        document.getElementById(this.group.$key).removeAttribute("readonly");
        document.getElementById(this.group.$key).focus();

      }else{
        document.getElementById(this.group.$key).setAttribute("readonly", "true");
        this.editGroup();
      }
    }
  
  toggleExpand() {
    this.expanded = !this.expanded;
    if(this.expanded){
      this.arrowSrc = 'icon_hide_white.png';
    }
    else{
      this.arrowSrc = 'icon_expand_white.png';
    }
  }
  
  
 jumpToNote(note:string){
      var element = document.getElementById(note);
      element.scrollIntoView(true);  
  
  }
  
  jumpToGroup(groupId :string){
      var element = document.getElementById(groupId);
      element.scrollIntoView(true);
      console.log(element);
  }
  
}