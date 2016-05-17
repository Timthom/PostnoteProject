import {Component, Input} from '@angular/core';
import {RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS} from '@angular/router-deprecated';
import {AngularFire} from 'angularfire2';
import {FirebaseListObservable} from 'angularfire2';
import {NoteComponent} from './note.component';
import {DataService} from './data.service'

@Component({
  moduleId: module.id,
  selector: 'group',
  providers: [ROUTER_PROVIDERS],
  templateUrl: 'group.component.html',
  styleUrls: ['group.component.css'],
  directives: [ROUTER_DIRECTIVES, NoteComponent],
  pipes: []
})
@RouteConfig([
])

export class GroupComponent {
  @Input()
  group; 
  
  @Input()
  groupName;
  
  @Input()
  note;
  
  notes: FirebaseListObservable<any[]>;
  
  newName: string = "";
  contentList: string[];
  
  constructor(private _ds: DataService) {
    }
    
    ngOnInit() {
        this.getNotes();
    }
    
    getNotes() {
        this._ds.getAllNotesInGroup(this.groupName).then(notes => this.notes = notes);
    }
    
    deleteGroup() {
      this._ds.deleteGroup(this.group.$key);
    }
    
    editGroupName() {
      this._ds.updateGroupName(this.group.$key, this.groupName);
    }
    
    enterKey(key) {
      var groupContent;
      var newOldName;
      var newName;
      this.notes.forEach(function(theGroup){
        var key = theGroup;
        groupContent = key;
        key.forEach(function(notesen){
          newOldName = notesen.group;
        });
        
      });
      console.log(this.contentList);
      if(key === 13) {
        let oldName = newOldName;
        this.editGroupName();
        this.contentList.forEach(function(theGroup){
          
        });
        
        /*for(var note in this.notes){
          this._ds.changeNoteGroup(this.note.$key, this.group)
        }
        console.log(this.group.$key);
        console.log(this.groupName);*/
        document.getElementById('group_name').blur();
      }
      this.contentList = groupContent;
      console.log(this.contentList);
    }
  
}