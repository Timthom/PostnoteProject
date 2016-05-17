import {Component, OnInit} from '@angular/core';
import {RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS} from '@angular/router-deprecated';
import {AngularFire} from 'angularfire2';
import {FirebaseListObservable} from 'angularfire2';
import {DataService} from './data.service';
//added
import {Input} from '@angular/core';
import {Note} from './note';
import {DropdownComponent} from './dropdown.component';
import {ColorpickerComponent} from './colorpicker.component';

@Component({
  moduleId: module.id,
  selector: 'note',
  providers: [ROUTER_PROVIDERS],
  templateUrl: 'note.component.html',
  styleUrls: ['note.component.css'],
  directives: [ROUTER_DIRECTIVES, DropdownComponent, ColorpickerComponent],
  pipes: []
})
@RouteConfig([
])

export class NoteComponent implements OnInit{
  @Input()
  noteInNote; 
  
  @Input()
  title;
  
  @Input()
  text;
  
  @Input()
  group;
  
  @Input()
  color;
  
  ngOnInit() {
      this.colorChanged(this.color);
  }
  
  constructor(private _ds: DataService) {
    console.log('in constructor'); 
  }

  isEditable: boolean = false;
  enabledIfNull: string = "";
  noteSelectedGroup: string = this.group;
  isPink: boolean = false; 
  isMagenta: boolean = false; 
  isOrange: boolean = false; 
  isBlue: boolean = false; 
  isYellow: boolean = true; 
  isGreen: boolean = false; 
  
    
    editClick() {
      
      if(this.isEditable) {
        console.log('updating');
        this._ds.updateNoteTitle(this.noteInNote.$key, this.title);
        this._ds.updateNoteText(this.noteInNote.$key, this.text);
        this.enabledIfNull = "";
      } else {
        console.log('notdating');
        this.enabledIfNull = null;
      }
      this.isEditable = !this.isEditable;  
      
    }

    noteGroupChanged(event) {
        this.noteSelectedGroup = event;
        this._ds.changeNoteGroup(this.noteInNote.$key, this.noteSelectedGroup);        
    }   
    
    colorChanged(event) {
      this.resetColors();
      switch (event){
        case "pink":
          this.isPink = true; 
          break; 
        case "magenta":
          this.isMagenta = true; 
          break; 
        case "orange":
          this.isOrange = true; 
          break; 
        case "blue":
          this.isBlue = true; 
          break; 
        case "yellow": 
          this.isYellow = true; 
          break; 
        case "green":
          this.isGreen = true; 
          break; 
        default: 
          this.isYellow = true; 
      }
      
      this._ds.updateNoteColor(this.noteInNote.$key, event);
    } 
    
    resetColors() {
        this.isPink = false; 
        this.isMagenta = false; 
        this.isOrange = false; 
        this.isBlue = false; 
        this.isYellow = false; 
        this.isGreen = false; 
    }
    
    deleteClick() {
        this._ds.deleteNote(this.noteInNote.$key);
    }
    
}
