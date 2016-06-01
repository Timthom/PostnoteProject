import {Component, Input, Output, EventEmitter} from '@angular/core';
import {RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS} from '@angular/router-deprecated';
import {NoteComponent} from './note.component';
import {DataService} from './data.service';
import { AngularFire, defaultFirebase, FirebaseRef, FirebaseListObservable } from 'angularfire2';
import { Injectable, Inject } from '@angular/core';
import {Reverse} from './reverse.pipe';
import {ValueService} from './value.service';
import { Dragula } from 'ng2-dragula/ng2-dragula';

@Component({
  moduleId: module.id,
  selector: 'group',
  providers: [ROUTER_PROVIDERS],
  templateUrl: 'group.component.html',
  styleUrls: ['group.component.css'],
  directives: [ROUTER_DIRECTIVES, NoteComponent, Dragula],
  pipes: [Reverse]
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

  @Output() clickedDelete = new EventEmitter();

  notes: any;

  newName: string = "";
  contentList: string[];
  arrowSrc: string = 'icon_expand.png';
  expanded: boolean = this._tx._toggleExpand;
  editingName: boolean = false;
  enableEditIfNull:string = '';
  editSrc: string = 'icon_edit.png';
  _authData;

  constructor( @Inject(FirebaseRef) private _ref: Firebase, private _ds: DataService, private _tx: ValueService) {
    this._authData = this._ref.getAuth();
    
  }
  
  ngOnInit() {
    if (this._authData != null) {
      this.getNotes();
    } else {
      console.log("ngOnInit in groupcomponent offline");
    }
  }

  getNotes() {
    if (this._authData != null) {
      this._ds.getAllNotesInGroup(this.groupName).then(notes => this.notes = notes);
    } else {
      console.log("getnotes in groupcomponent offline");
    }
  }

  getContent() {
    if(this._authData != null) {
      let doneInLoopArray;
      let arrayOfKeys: any[] = [];
      
      this.notes.forEach(function (result) {
        doneInLoopArray = result;
      });
      
      doneInLoopArray.forEach(function (note) {
      arrayOfKeys.push(note.$key);
    });
    
    return arrayOfKeys;
  }
}
    
  deleteGroup() {
    if (this._authData != null) {
      
      let content = this.getContent();
      
      for (let key of content) {
        this._ds.deleteNote(key);
      }
      
      this._ds.deleteGroup(this.group.$key);
      this.clickedDelete.emit('');
    }
  }
  //
  editGroupName() {
    if (this._authData != null) {
      this._ds.updateGroupName(this.group.$key, this.groupName);
    } else {
      console.log("editgroupname in groupcomponent offline");
    }
  }

  /* enterKey(key) {
     if (this._authData != null) {
       if (key === 13) {
         let content = this.getContent();
         for (let key of content) {
           console.log('key: ' + key);
           this._ds.changeNoteGroup(key, this.groupName);
         }
 
         this.editGroupName();
         this.getNotes();
       }
     }
   }*/

  // Enable inputfield to edit text in field when user click on pen icon else disable inputfield
  editClick() {
    if (this._authData != null) {
      this.editingName = !this.editingName;

      if (this.editingName) {
        this.enableEditIfNull = null;
        this.editSrc = 'icon_save.png';
        
      } else {
        let content = this.getContent();
        // changes notes in the group to the new group
        for (let key of content) {
          this._ds.changeNoteGroup(key, this.groupName);
        }
        this.enableEditIfNull = '';
        this.editGroupName();
        this.getNotes();
        
        this.editSrc = 'icon_edit.png';

      }
    } else {
      console.log("enterkey in groupcomponent offline");
    }
  }

  // Expand category on click arrowBtn
  groupExpand() {
    this._tx._toggleExpand = !this._tx._toggleExpand;
    this.expanded = this._tx._toggleExpand;
    if (this.expanded) {
      this.arrowSrc = 'icon_hide.png';
    }
    else {
      this.arrowSrc = 'icon_expand.png';
    }
  }
  
}