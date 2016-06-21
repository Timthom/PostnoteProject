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
  _savedSibling: any;
  _firstCall = true;

  constructor(private _dataservice: DataService, @Inject(FirebaseRef) private _ref: Firebase, private _ls: LocalStorageService, public toastr: ToastsManager) {
    this._authData = this._ref.getAuth();
    let authData = this._ref.getAuth();
  }

  /***********************************************************
  -------------------Dragula stuff below----------------------
  ***********************************************************/

  _configureDragula(dragulaService: DragulaService) {
    let self = this;
    dragulaService.setOptions('drag-bag', {
      isContainer: function (el) {

        return false; // only elements in drake.containers will be taken into account
      },
      moves: function (el, source, handle, sibling) {

        if (self.checkMobileUser()) {
          return false;
        } else {
          return true; // elements are always draggable by default
        }
      },
      accepts: function (el, target, source, sibling) {

        return true; // elements can be dropped in any of the `containers` by default
      },
      invalid: function (el, handle) {

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
    });

    dragulaService.drop.subscribe((value) => {
      this.checkconnection();
      let id: string = value[1].attributes[3].nodeValue;
      let group: string;
      if (!value[2].parentElement.parentElement.parentElement.children[2]) {
        group = 'noGroup'
      } else {
        group = value[2].parentElement.parentElement.parentElement.children[2].firstElementChild.id;
      }

      if (this._authData != null) {
        let getGroupInfo: any = this._dataservice.getGroupNameFromId(id);
        getGroupInfo.then((oldGroup) => this.startUpdatingPositions(oldGroup, group, value[1], value[4]));
        this._dataservice.changeNoteGroup(id, group);
      } else {
        this.startUpdatingPositions(this._ls.getGroupNameFromId(id), group, value[1], value[4]);
        this._ls.changeNoteGroup(id, group);
      }
    });

    dragulaService.over.subscribe((value) => {

    });

    dragulaService.out.subscribe((value) => {

    });

  }

  startUpdatingPositions(oldGroup: any, newGroup: string, droppedNote: any, siblingNote: any) {

    //Gets the position from droppedNote before it changes, and firesOfThe function...
    if (this._authData != null) {
      let getIdPromise: any = this._dataservice.getPositionFromId(droppedNote.id);
      getIdPromise.then((prevPos) => {
        this.updateAndDecreasePositionOnEverySiblingInPreviousGroup(oldGroup, droppedNote, prevPos, newGroup, siblingNote);
      });
    } else {
      this.updateAndDecreasePositionOnEverySiblingInPreviousGroup(oldGroup, droppedNote, this._ls.getPositionFromId(droppedNote.id), newGroup, siblingNote);

    }

  }

  updateAndIncreasePositionOnEverySiblingOnRightOnDrop(oldGroup: any, newGroup: string, droppedNote: any, siblingNote: any) {
    let tempNote: any = droppedNote;

    if (this._authData != null) {
      //If there is siblings to the right of dropped items -> we must update their positions... If not -> we must take the siblings to the lefts position and ++...
      if (siblingNote) {

        let getPos: any = this._dataservice.getPositionFromId(siblingNote.id);
        getPos.then((result) => {
          let tempPos = result;

          //Update the dropped note with the position that it took ergo the note on the right...
          //Update the note on the right until the end of notes with position++...
          while (tempNote) {
            this._dataservice.updateNotePosition(tempNote.id, tempPos);
            tempNote = tempNote.nextElementSibling;
            tempPos++;
          }
        });
      } else {

        let getPos: any = this._dataservice.getPositionFromId(droppedNote.previousElementSibling.id);
        getPos.then((result) => {
          let tempPos = result;

          //Update the dropped note with the position (the note on the left + 1 ergo last position)...
          this._dataservice.updateNotePosition(droppedNote.id, (result + 1));
        });
      }
    } else {
      if (siblingNote) {
        let tempPos = this._ls.getPositionFromId(siblingNote.id);
        while (tempNote) {
          this._ls.updateNotePosition(tempNote.id, tempPos);
          tempNote = tempNote.nextElementSibling;
          tempPos++;
        }
      } else {
        this._ls.updateNotePosition(droppedNote.id, (this._ls.getPositionFromId(droppedNote.previousElementSibling.id) + 1));
      }
    }
  }

  updateAndDecreasePositionOnEverySiblingInPreviousGroup(oldGroup: string, droppedNote: any, prevPos: number, newGroup: string, siblingNote: any) {
    let notesInGroup: any;
    if (this._authData != null) {
      notesInGroup = this._dataservice.getAllNotesInGroup(oldGroup);

      notesInGroup.then(res => {
        let doneInLoopArray;
        let self = this;

        res.forEach(function (result) {
          doneInLoopArray = result;
        });

        doneInLoopArray.forEach(function (note) {
          if (note.position > prevPos) {
            self._dataservice.updateNotePosition(note.$key, (note.position - 1));
          }
        });
        this.updateAndIncreasePositionOnEverySiblingOnRightOnDrop(oldGroup, newGroup, droppedNote, siblingNote);
      });

    } else {
      notesInGroup = this._ls.getNotesInGroup(oldGroup);
      for (var note of notesInGroup) {
        if (note.position > prevPos) {
          this._ls.updateNotePosition(note.$key, (note.position - 1));
        }
      }
      this.updateAndIncreasePositionOnEverySiblingOnRightOnDrop(oldGroup, newGroup, droppedNote, siblingNote);
    }
  }

  updatePositionsInGroupAndThenDeleteNoteWhenPressingDelete(group: string, prevPos: number, noteInNote: any) {
    this.checkconnection();
    if (this._authData != null) {
      this._dataservice.deleteNote(noteInNote.$key);
      let notesInGroup: any = this._dataservice.getAllNotesInGroup(group);

      notesInGroup.then(res => {
        let doneInLoopArray;
        let self = this;

        res.forEach(function (result) {
          doneInLoopArray = result;
        });

        doneInLoopArray.forEach(function (note) {
          if (note.position > prevPos) {
            self._dataservice.updateNotePosition(note.$key, (note.position - 1));
          }
        });
      });
    } else {
      if(this._firstCall) {
        this._firstCall = false;

        this._ls.deleteNote(noteInNote.$key);
        let notesInGroup: any = this._ls.getNotesInGroup(group);

      for (var note of notesInGroup) {
        if (note.position > prevPos) {
          this._ls.updateNotePosition(note.$key, ((note.position) - 1));
        }
      }
    }
      this._ls.deleteNote(noteInNote.$key);
      let notesInGroup: any = this._ls.getNotesInGroup(group);

      for (var note of notesInGroup) {
        if (note.position > prevPos) {
          this._ls.updateNotePosition(note.$key, ((note.position) - 1));
        }
      }
    }
  }


  updatePositionsInGroup(group: string) {
    let notesInGroup: any;
    if (this._authData != null) {
      notesInGroup = this._dataservice.getAllNotesInGroup(group);

      notesInGroup.then(res => {
        let doneInLoopArray;
        let self = this;

        res.forEach(function (result) {
          doneInLoopArray = result;
        });

        doneInLoopArray.forEach(function (note) {
          self._dataservice.updateNotePosition(note.$key, (note.position + 1));
        });
      });
    } else {
      notesInGroup = this._ls.getNotesInGroup(group);
      for (var note of notesInGroup) {
        this._ls.updateNotePosition(note.$key, (note.position + 1));
      }
    }
  }

  groupChangedByDropDown(oldGroup: string, newgroup: string, prevPos: number, id: string) {
    this.checkconnection();
    if (this._authData != null) {
      this._dataservice.changeNoteGroup(id, newgroup);
      this._dataservice.updateNotePosition(id, -1);
    } else {
      this._ls.changeNoteGroup(id, newgroup);
      this._ls.updateNotePosition(id, -1);
    }
    this.updatePositionsInGroup(newgroup);
    this.changePreviousGroupWhenChangingThroughDropdown(oldGroup, prevPos);
  }

  changePreviousGroupWhenChangingThroughDropdown(oldGroup: string, prevPos: number) {
    let notesInGroup: any;
    if (this._authData != null) {
      notesInGroup = this._dataservice.getAllNotesInGroup(oldGroup);

      notesInGroup.then(res => {
        let doneInLoopArray;
        let self = this;

        res.forEach(function (result) {
          doneInLoopArray = result;
        });

        doneInLoopArray.forEach(function (note) {
          if (note.position > prevPos) {
            self._dataservice.updateNotePosition(note.$key, (note.position - 1));
          }
        });
      });
    } else {
      notesInGroup = this._ls.getNotesInGroup(oldGroup);

      for (var note of notesInGroup) {
        if (note.position > prevPos) {
          this._ls.updateNotePosition(note.$key, (note.position - 1));
        }
      }
    }
  }

  //If the user is on a mobile phone, dragula should be disable since unneccessary sofar and it is hard to scroll of enabled...
  checkMobileUser() {
    if (navigator.userAgent.match(/Android/i)
      || navigator.userAgent.match(/webOS/i)
      || navigator.userAgent.match(/iPhone/i)
      || navigator.userAgent.match(/iPad/i)
      || navigator.userAgent.match(/iPod/i)
      || navigator.userAgent.match(/BlackBerry/i)
      || navigator.userAgent.match(/Windows Phone/i)
    ) {
      return true;
    }
    else {
      return false;
    }
  }

  //This is essential because if you start offline and the n log in authData is still null... Well not anymore...
  checkconnection() {
    if (this._authData != this._ref.getAuth()) {
      this._dataservice.refresh();
      this._authData = this._ref.getAuth();
    }
  }
}
