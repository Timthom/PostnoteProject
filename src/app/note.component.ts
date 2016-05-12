import {Component} from '@angular/core';
import {RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS} from '@angular/router-deprecated';
import {AngularFire} from 'angularfire2';
import {FirebaseListObservable} from 'angularfire2';
import {DataService} from './data.service';
//added
import {Input} from '@angular/core';
import {Note} from './note';

@Component({
  moduleId: module.id,
  selector: 'note',
  providers: [ROUTER_PROVIDERS],
  templateUrl: 'note.component.html',
  styleUrls: ['note.component.css'],
  directives: [ROUTER_DIRECTIVES],
  pipes: []
})
@RouteConfig([
])

export class NoteComponent{
  @Input()
  noteInNote; 
  
  @Input()
  title;
  
  @Input()
  text;
  
  constructor(private _ds: DataService) {
    console.log('in constructor'); 
    //varför undefined här?...
    console.log(this.noteInNote);
  }

  isEditable: boolean = false;
  enabledIfNull: string = "";
    
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
    
    deleteClick() {
      this._ds.deleteNote(this.noteInNote.$key);
    }
    
}
