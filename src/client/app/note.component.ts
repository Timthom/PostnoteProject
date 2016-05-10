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

export class NoteComponent {
  
  constructor(private _ds: DataService) {
    console.log('in constructor');  
  }
  
   @Input()
   noteInNote; 
  
  //title: string = this.noteInNote.title;
  //text: string = this.noteInNote.text;
  isEditable: boolean = false;
    
    editClick() {
      console.log(this.isEditable);
      var titleField = document.getElementById('title');
      var textField = document.getElementById('text_field');
      
      if(this.isEditable) {
        console.log('updating');
        titleField.style.border = "";
        textField.style.border = "";
        
        console.log('title text: '+ titleField.innerText);
        console.log('text text: '+ textField.innerText);
        //this._ds.updateNoteTitle(this.noteInNote.$key, titleField.innerHTML);
        //this._ds.updateNoteText(this.noteInNote.$key, textField.innerHTML);
      } else {
        console.log('notdating');
        titleField.style.border = "dashed 1px black";
        textField.style.border = "dashed 1px black";
        textField.focus();
      }
      this.isEditable = !this.isEditable;  
      var x = document.activeElement.tagName;
      console.log(x);
      console.log('key: ' + this.noteInNote.$key);
      console.log(this.noteInNote.title);
    }
    
}
