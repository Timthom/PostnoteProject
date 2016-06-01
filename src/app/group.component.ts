import {Component, Input, Output, EventEmitter} from '@angular/core';
import {RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS} from '@angular/router-deprecated';
import {NoteComponent} from './note.component';
import {DataService} from './data.service';
import { AngularFire, defaultFirebase, FirebaseRef, FirebaseListObservable } from 'angularfire2';
import { Injectable, Inject } from '@angular/core';
import {Reverse} from './reverse.pipe';
import {ValueService} from './value.service';
import { Dragula, DragulaService } from 'ng2-dragula/ng2-dragula';

@Component({
  moduleId: module.id,
  selector: 'group',
  providers: [ROUTER_PROVIDERS],
  templateUrl: 'group.component.html',
  styleUrls: ['group.component.css'],
  directives: [ROUTER_DIRECTIVES, NoteComponent, Dragula],
  pipes: [Reverse],
  viewProviders: [DragulaService]
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

  constructor( @Inject(FirebaseRef) private _ref: Firebase, private _ds: DataService, private _tx: ValueService, private _dragulaService: DragulaService) {
    this._authData = this._ref.getAuth();
    
    this._configureDragula();
    //dragula options below...
    
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
  
  /***********************************************************
  -------------------Dragula stuff below----------------------
  ***********************************************************/
  
  _configureDragula() {
    this._dragulaService.setOptions('drag-bag', {
      isContainer: function (el) {
        // console.log('isContainer el: '+el);
        return false; // only elements in drake.containers will be taken into account
      },
      moves: function (el, source, handle, sibling) {
        // console.log(`moves, el: ${el} source: ${source} handle: ${handle} sibling: ${sibling}`);
        return true; // elements are always draggable by default
      },
      accepts: function (el, target, source, sibling) {
        // console.log(`accepts, el: ${el} target: ${target}  source: ${source} sibling: ${sibling}`);
        return true; // elements can be dropped in any of the `containers` by default
      },
      invalid: function (el, handle) {
        // console.log(`invalid, el: ${el} handle: ${handle}`);
        // console.log(`el.tagname: ${el.tagName}`);
        return false; // don't prevent any drags from initiating by default
      },
      direction: 'horizontal',             // Y axis is considered when determining where an element would be dropped
      copy: false,                       // elements are moved by default, not copied
      copySortSource: false,             // elements in copy-source containers can be reordered
      revertOnSpill: false,              // spilling will put the element back where it was dragged from, if this is true
      removeOnSpill: false,              // spilling will `.remove` the element, if this is true
      mirrorContainer: document.body,    // set the element that gets mirror elements appended
      ignoreInputTextSelection: true     // allows users to select input text, see details below
    });
    
    this._dragulaService.drag.subscribe((value) => {
      console.log(`drag: ${value[0]}`);
      this._onDrag(value.slice(1));
    });
    this._dragulaService.drop.subscribe((value) => {
      console.log(`drop: ${value[0]}`);
      this._onDrop(value.slice(1));
    });
    this._dragulaService.over.subscribe((value) => {
      console.log(`over: ${value[0]}`);
      this._onOver(value.slice(1));
    });
    this._dragulaService.out.subscribe((value) => {
      console.log(`out: ${value[0]}`);
      this._onOut(value.slice(1));
    });
    
  }
  
  private _onDrag(args) {
    let [e, el] = args;
    // do something
   console.log(`Inne i onDrag e: ${e}, el: ${el}`);
  }

  private _onDrop(args) {
    let [e, el] = args;
    // do something
    console.log(`Inne i onDrop e: ${e}, el: ${el}`);
  }

  private _onOver(args) {
    let [e, el, container] = args;
    // do something
    console.log(`Inne i onOver e: ${e}, el: ${el}, container: ${container}`);
  }

  private _onOut(args) {
    let [e, el, container] = args;
    // do something
    console.log(`Inne i onOut e: ${e}, el: ${el}, container: ${container}`);
  }
   
}