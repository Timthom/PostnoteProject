import {Component, Input, Output, EventEmitter} from '@angular/core';
import {RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS} from '@angular/router-deprecated';
import {NoteComponent} from './note.component';
import {DataService} from './data.service';
import { AngularFire, defaultFirebase, FirebaseRef, FirebaseListObservable } from 'angularfire2';
import { Injectable, Inject } from '@angular/core';
import {Reverse} from './reverse.pipe';
import {SortNotes} from './sort-notes.pipe';
import {ValueService} from './value.service';
import { Dragula } from 'ng2-dragula/ng2-dragula';
import {LocalStorageService} from './localstorage.service';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

@Component({
  moduleId: module.id,
  selector: 'group',
  providers: [ROUTER_PROVIDERS, LocalStorageService, ToastsManager],
  templateUrl: 'group.component.html',
  styleUrls: ['group.component.css'],
  directives: [ROUTER_DIRECTIVES, NoteComponent, Dragula],
  pipes: [Reverse, SortNotes]
})
@RouteConfig([
])

export class GroupComponent {

  groups: any;
  notes: any;

  @Input()
  group;

  @Input()
  groupName;

  @Input()
  note;

  @Output() clickedDelete = new EventEmitter();
  @Output() notesChanged = new EventEmitter();



  newName: string = "";
  contentList: string[];
  arrowSrc: string = 'icon_expand.png';
  expanded: boolean = this._tx._toggleExpand;
  editingName: boolean = false;
  enableEditIfNull: string = '';
  editSrc: string = 'icon_edit.png';
  _authData;
  groupId;

  constructor( @Inject(FirebaseRef)
  private _ref: Firebase,
    private _ds: DataService,
    private _tx: ValueService,
    private _ls: LocalStorageService,
    public toastr: ToastsManager) {
    this._authData = this._ref.getAuth();
  }

  ngOnInit() {
    this.getNotes();
  }

  saveId() {
    this._tx._focusedId = this.group.$key;
  }

  getNotes() {
    if (this._authData != null) {
      this._ds.getAllNotesInGroup(this.groupName).then(notes => this.notes = notes);
    } else {
      this.notes = this._ls.getNotesInGroup(this.groupName);
    }
  }

  getContent() {
    if (this._authData != null) {
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
    //remove from shared model
    //console.log(this.groups);
    // for (var item in this.groups) {
    //   console.log("LOOPAR "+ item);
    //   console.log("GROUP KEY " + this.group.$key);
    //   console.log("LOOP KEY " + this.groups[item].$key);
    //         if (this.group.$key == this.groups[item].$key) {
    //             console.log("Removing item " + item);
    //             this.groups.splice(item, 1);
    //             //break;
    //         }
    // }
    if (this._authData != null) {
      //To be able to iterate through all notes
      let content = this.getContent();
      //Remove all notes in group
      for (let key of content) {
        this._ds.deleteNote(key);
      }
      this._ds.deleteGroup(this._tx._focusedId);
      this._tx._toggleExpand = false;
    } else {//if not logged in
      //Removes notes of the group
      for (let note of this.notes) {
        this._ls.deleteNote(note.$key);
      }
      this._ls.deleteGroup(this._tx._focusedId);
    }

    this.clickedDelete.emit('');
    this.toastr.success('hallelujah!', 'group deleted!');
  }


  editGroupName() {
    // //change name in shared model
    // for (var index in this.groups) {
    //         if (this.group.$key == this.groups[index].$key) {
    //             this.groups[index].name = this.groupName;
    //             break;
    //         }
    // }
    if (this._authData != null) {
      this._ds.updateGroupName(this.group.$key, this.groupName);
    } else {
      this._ls.updateGroupName(this.group.$key, this.groupName);
      //TEMPORARY
      //location.reload();
    }
    this.clickedDelete.emit(''); //Also works for edits!
    this.toastr.success('hallelujah!', 'group updated!');
  }

  // Enable inputfield to edit text in field when user click on pen icon else disable inputfield
  editClick() {
    this.editingName = !this.editingName;

    if (this.editingName) {
      this.enableEditIfNull = null;
      this.editSrc = 'icon_save.png';
    } else {
      if (this._authData != null) {
        let content = this.getContent();
        // changes notes in the group to the new group
        for (let key of content) {
          this._ds.changeNoteGroup(key, this.groupName);
        }
      } else {
        for (let note of this.notes) {
          this._ls.changeNoteGroup(note.$key, this.groupName);
        }
      }
      this.enableEditIfNull = '';
      this.editGroupName();
      this.getNotes();
      this.editSrc = 'icon_edit.png';
      this._tx._toggleExpand = false;
    }
  }

  // Expand category on click arrowBtn
  groupExpand() {
    // Uffes idea:
    if (!this.editingName) {
      if (this.arrowSrc == 'icon_hide.png') {
        this._tx._toggleExpand = false;
      } else {
        this._tx._toggleExpand = true;
      }
      this.expanded = this._tx._toggleExpand;
      if (this.expanded) {
        this.arrowSrc = 'icon_hide.png';
      }
      else {
        this.arrowSrc = 'icon_expand.png';
      }
    }
  }
  emitNotes(groups: any) {
    this.notesChanged.emit('');
  }


}