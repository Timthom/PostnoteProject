import {Component} from 'angular2/core';
import {RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS} from 'angular2/router';
import {AngularFire} from 'angularfire2';
import {FirebaseListObservable} from 'angularfire2';
import {DataService} from './data.service';
//added
import {Input} from 'angular2/core';
import {Note} from './note';

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

export class NoteComponent{
   @Input()
   noteInNote; 
  
  @Input()
  title;
  
  @Input()
  text;
  
  
  constructor(private _ds: DataService) {
    console.log('in constructor'); 
  }

  isEditable: boolean = false;
    
    editClick() {
      
      var titleField = document.getElementById('title');
      var textField = document.getElementById('text_field');
      
      if(this.isEditable) {
        console.log('updating');
        titleField.style.border = "";
        textField.style.border = "";
        this._ds.updateNoteTitle(this.noteInNote.$key, this.title);
        this._ds.updateNoteText(this.noteInNote.$key, this.text);
      } else {
        console.log('notdating');
        titleField.style.border = "dashed 1px black";
        textField.style.border = "dashed 1px black";
        textField.style.width = "278px";
      }
      this.isEditable = !this.isEditable;  
      
    }
    
    deleteClick() {
      this._ds.deleteNote(this.noteInNote.$key);
    }
    
}
