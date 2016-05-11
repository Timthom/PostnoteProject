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
<<<<<<< HEAD:src/app/note.component.ts
    console.log('in constructor'); 
    //varför undefined här?...
    console.log(this.noteInNote);
=======
    console.log('in constructor');
>>>>>>> Uffe:src/client/app/note.component.ts
  }

  isEditable: boolean = false;
    
    editClick() {
      
      var titleField = document.getElementsByClassName[0]('title');
      var textField = document.getElementsByClassName[0]('text_field');
      
      console.log(titleField);
      console.log(textField);
      
      if(this.isEditable) {
        console.log('updating');
        titleField.style.border = "";
        textField.style.border = "";
        titleField.style.pointerEvents = "none";
        textField.style.pointerEvents = "none";
        this._ds.updateNoteTitle(this.noteInNote.$key, this.title);
        this._ds.updateNoteText(this.noteInNote.$key, this.text);
      } else {
        console.log('notdating');
        titleField.style.border = "dashed 1px black";
        textField.style.border = "dashed 1px black";
        textField.style.width = "278px";
        titleField.style.pointerEvents = "auto";
        textField.style.pointerEvents = "auto";
      }
      this.isEditable = !this.isEditable;  
      
    }
    
    deleteClick() {
      this._ds.deleteNote(this.noteInNote.$key);
    }
    
}
