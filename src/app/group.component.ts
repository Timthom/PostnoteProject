import {Component, Input, Output, EventEmitter} from '@angular/core';
import {RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS} from '@angular/router-deprecated';
import {NoteComponent} from './note.component';
import {DataService} from './data.service';
import { AngularFire, defaultFirebase, FirebaseRef, FirebaseListObservable } from 'angularfire2';
import { Injectable, Inject } from '@angular/core';

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

  @Output() clickedDelete = new EventEmitter();

  notes: FirebaseListObservable<any[]>;

  newName: string = "";
  contentList: string[];
  arrowSrc: string = 'icon_expand.png';
  expanded: boolean = false;
  _authData;

  constructor( @Inject(FirebaseRef) private _ref: Firebase, private _ds: DataService) {
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

  editGroupName() {
    if (this._authData != null) {
      this._ds.updateGroupName(this.group.$key, this.groupName);
    } else {
      console.log("editgroupname in groupcomponent offline");
    }
  }

  changeNotesInTheGroup(id) {
    if(this._authData != null) {
      this._ds.changeNoteGroup(id, this.groupName);
    }
  }

  enterKey(key) {
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
    } else {
      console.log("enterkey in groupcomponent offline");
    }
  }
  
// Expand category on click arrowBtn
  toggleExpand() {
    this.expanded = !this.expanded;
    if (this.expanded) {
      this.arrowSrc = 'icon_hide.png';
    }
    else {
      this.arrowSrc = 'icon_expand.png';
    }
  }
}