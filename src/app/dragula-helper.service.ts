import { Injectable, Inject } from '@angular/core';
import { AngularFire, defaultFirebase, FirebaseRef, FirebaseListObservable } from 'angularfire2';
import { DragulaService } from 'ng2-dragula/ng2-dragula';
import {DataService} from './data.service';
import { LocalStorageService } from './localstorage.service'
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

@Injectable()
export class DragulaHelperService {
_notes: any;
_authData: any;
// _canSaveSibling: boolean = true;
_savedSibling: any;

  constructor(private _dataservice: DataService,  @Inject(FirebaseRef) private _ref: Firebase, private _ls: LocalStorageService, public toastr: ToastsManager) {
    this._authData = this._ref.getAuth();
    
    /***** This is only because I dont know how to return the promise from dataservice *****/
    let authData = this._ref.getAuth();
   // this._notes = this._ref.child('/users/' + authData.uid + '/notes');
  }

  /***********************************************************
  -------------------Dragula stuff below----------------------
  ***********************************************************/
  
  _configureDragula(dragulaService: DragulaService) {
    dragulaService.setOptions('drag-bag', {
      isContainer: function (el) {
        /* Denna skriver ut själva notedivobjectet, här kommer man åt alla element inom notes... */
        // console.log('isContainer el: ');
        // console.log(el);
        
        return false; // only elements in drake.containers will be taken into account
      },
      moves: function (el, source, handle, sibling) {
       /* 
       el är samma som ovan, den note man håller och alla dess element 
       source kan man se div.classname och alla els inom den diven, inte bara den man håller
       handle är det element där man tog tag i noten. man kommer åt allt inom också...
       sibling är den som ligger till höger om noten... om längst till höger så är sibling null...
       */ 
      //  console.log(`moves, el: `);
      //  console.log(el);
      //  console.log(`moves, source: `);
      //  console.log(source);
      //  console.log(`moves, handle: `);
      //  console.log(handle);
      //  console.log(`moves, sibling: `);
      //  console.log(sibling);
       
        return true; // elements are always draggable by default
      },
      accepts: function (el, target, source, sibling) {
       /* 
       enda nya är target som är det elementet där den släpps...
       */ 
      //  console.log(`accepts, el: `);
      //  console.log(el);
      //  console.log(`accepts, target: `);
      //  console.log(target);
      //  console.log(`accepts, source: `);
      //  console.log(source);
      //  console.log(`accepts, sibling: `);
      //  console.log(sibling); 
        
        return true; // elements can be dropped in any of the `containers` by default
      },
      invalid: function (el, handle) {
      /* 
      inget nytt...
      */ 
      //  console.log(`invalid, el: `);
      //  console.log(el);
      //  console.log(`invalid, handle: `);
      //  console.log(handle);
       
        return false; // don't prevent any drags from initiating by default
      },
      direction: 'horizontal',           // Y axis is considered when determining where an element would be dropped
      copy: false,                       // elements are moved by default, not copied
      copySortSource: false,             // elements in copy-source containers can be reordered
      revertOnSpill: false,              // spilling will put the element back where it was dragged from, if this is true
      removeOnSpill: false,              // spilling will `.remove` the element, if this is true
      mirrorContainer: document.body,    // set the element that gets mirror elements appended
      ignoreInputTextSelection: true     // allows users to select input text, see details below
    });
    
    dragulaService.drag.subscribe((value) => {
      /* 
      man får ut en array med tre index...
      [0]: namnet på containern...
      [1]: note.elementet som drogs...
      [2]: diven som den dras ifrån...
      */ 
      //  console.log(`drag, value: `);
      //  console.log(value);
      
      // if (this._canSaveSibling) {
        // this._canSaveSibling = false;
        // console.log('next sibling: ');
        // console.log(this._savedSibling);
        // console.log('next sibling id: ');
        // console.log(this._savedSibling.id);
        // console.log('next sibling next sibling: ');
        // console.log(this._savedSibling.nextSibling);
      // }
      


    });
    
    dragulaService.drop.subscribe((value) => {
      /* 
      man får ut en array med fem index...
      [0]: namnet på containern...
      [1]: note.elementet som drogs...
      [2]: diven som den släpps i...
      [3]: diven som den dras ifrån...
      [4]: Sibling, den till höger om där den släpptes... om sist null...
      */ 
       console.log(`drop, value: `);
       console.log(value);
       
       
       //Detta ger mig en sträng med id:t...
       //console.log(value[1].attributes[3].nodeValue);
       
       //Detta ger mig namnet på gruppen, varsam på att om man lägger i creator så är den tom...
       //  console.log(value[2].parentElement.parentElement.parentElement.firstElementChild.firstElementChild.id);
       //  console.log(value[2].parentElement.firstElementChild.id === "");
       // this._canSaveSibling = true; 
      let id: string = value[1].attributes[3].nodeValue;
      let group: string;
      
      if (value[2].parentElement.parentElement.parentElement.firstElementChild.firstElementChild.id === '') {
        console.log('group är null');        
        group = 'noGroup'
      } else {
        group = value[2].parentElement.parentElement.parentElement.firstElementChild.firstElementChild.id;
      }
      
      let getGroupInfo: any = this._dataservice.getGroupNameFromId(id);
      getGroupInfo.then((result) => this.startUpdatingPositions(result, group, value[1], value[4]));

      if (this._authData != null) {
        this._dataservice.changeNoteGroup(id, group);
      } else {
        this._ls.changeNoteGroup(id, group);
      }
      
      this.toastr.success('Note moved', 'Yippie');
    });
    
    dragulaService.over.subscribe((value) => {
      /* 
      man får ut en array med fyra index...
      [0]: namnet på containern...
      [1]: note.elementet som drogs...
      [2]: containern. som den är över ifrån...
      [3]: containers som den drogs ifrån...
      */ 
      //  console.log(`over, value: `);
      //  console.log(value);
      
     
    });
    
    dragulaService.out.subscribe((value) => {
      /* 
      man får ut en array med fyra index...
      [0]: namnet på containern...
      [1]: note.elementet som drogs...
      [2]: containern. som den är över ifrån...
      [3]: containers som den drogs ifrån...
      */ 
        // console.log(`out, value: `);
        // console.log(value);     
    });
    
  }
  
  updateGroup(id: string, group: string) {
      if (this._authData) {
        this._ls.changeNoteGroup(id, group);
      } else {
        console.log('inloggad');     
        this._dataservice.changeNoteGroup(id, group);        
      }
  }
  
  // updateEverySiblingOnRight() {
  //    console.log("här skall vi uppdatera positionene på this._savedSibling: ");
  //    console.log(this._savedSibling);
    
  //   if(this._savedSibling.nextSibling){ //use nextElementSibling ffs
  //     this._savedSibling = this._savedSibling.nextSibling;
  //     this.updateEverySiblingOnRight();
  //   }
  // }
 
  startUpdatingPositions(oldGroup: any, newGroup: string, droppedNote: any, siblingNote: any){

    //Gets the position from droppedNote before it changes, and firesOfThe function...
    let getIdPromise: any = this._dataservice.getPositionFromId(droppedNote.id);
    getIdPromise.then((prevPos) => {
      this.updateAndDecreasePositionOnEverySiblingInPreviousGroup(oldGroup, droppedNote, prevPos, newGroup, siblingNote);
    });
  }

  updateAndIncreasePositionOnEverySiblingOnRightOnDrop(oldGroup: any, newGroup: string, droppedNote: any, siblingNote: any) {   
    let tempNote: any = droppedNote;

    //If there is siblings to the right of dropped items -> we must update their positions... If not -> we must take the siblings to the lefts position and ++...
    if (siblingNote) {
      console.log('finns en siblingNote till höger');
      console.log(siblingNote);

      let getPos: any = this._dataservice.getPositionFromId(siblingNote.id);
      getPos.then((result) => {
        let tempPos = result;
      
        //Update the dropped note with the position that it took ergo the note on the right...
        this._dataservice.updateNotePosition(tempNote.id, tempPos);
        tempNote = tempNote.nextElementSibling;
        tempPos++; 
        //Update the note on the right until the end of notes with position++...
        while(tempNote) {
          console.log('tempNote = ');
          console.log(tempNote);
          console.log(`inne i whileLoopen där tempPos = ${tempPos} och tempNote.id = ${tempNote.id}`);
          this._dataservice.updateNotePosition(tempNote.id, tempPos);
          tempNote = tempNote.nextElementSibling;
          tempPos++;
        }
      });
    } else {
      console.log('finns ingen siblingnote till höger');
      console.log(siblingNote);
      console.log('finns prevsibling?');
      console.log(droppedNote.previousElementSibling.id);
      console.log('se ovan');

      let getPos: any = this._dataservice.getPositionFromId(droppedNote.previousElementSibling.id);
      getPos.then((result) => {
        let tempPos = result;
      
        //Update the dropped note with the position (the note on the left + 1 ergo last position)...
        this._dataservice.updateNotePosition(droppedNote.id, (result + 1));
      });
    }
  }
  
  updateAndDecreasePositionOnEverySiblingInPreviousGroup(oldGroup: string, droppedNote: any, prevPos: number, newGroup: string, siblingNote: any) {
    // let getWholeGroup: any = this._dataservice.getWholeCurrentGroupFromGroupName(oldGroup);
    // getWholeGroup.then((result) => {
    //   console.log('klar....');
    // });
    console.log('här kommer droppedNote');
    console.log(droppedNote);
    console.log(`inne i updatde and decrease...`);
    let notesInGroup: any = this._dataservice.getAllNotesInGroup(oldGroup);
    
    notesInGroup.then(res => {
      let doneInLoopArray;
      let arrayOfKeys: any[] = [];
      let arrayOfPos: any[] = [];
      let self = this;

      res.forEach(function (result) {
        doneInLoopArray = result;
      });

      doneInLoopArray.forEach(function (note) {
        console.log(`inne i loopen för att göra saker där prevPos = ${prevPos}, note.position = ${note.position}, note.$key = ${note.$key}`);
        if (note.position > prevPos) {
          console.log(`positionen är större än prev...`);
          self._dataservice.updateNotePosition(note.$key, (note.position - 1));
        }
      });
      

    this.updateAndIncreasePositionOnEverySiblingOnRightOnDrop(oldGroup, newGroup, droppedNote, siblingNote);  
    });
    
    
  }
  
}
