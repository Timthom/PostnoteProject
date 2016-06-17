"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var core_1 = require('@angular/core');
var angularfire2_1 = require('angularfire2');
var data_service_1 = require('./data.service');
var localstorage_service_1 = require('./localstorage.service');
var ng2_toastr_1 = require('ng2-toastr/ng2-toastr');
var DragulaHelperService = (function () {
    function DragulaHelperService(_dataservice, _ref, _ls, toastr) {
        this._dataservice = _dataservice;
        this._ref = _ref;
        this._ls = _ls;
        this.toastr = toastr;
        this._authData = this._ref.getAuth();
        /***** This is only because I dont know how to return the promise from dataservice *****/
        var authData = this._ref.getAuth();
        // this._notes = this._ref.child('/users/' + authData.uid + '/notes');
    }
    /***********************************************************
    -------------------Dragula stuff below----------------------
    ***********************************************************/
    DragulaHelperService.prototype._configureDragula = function (dragulaService) {
        var _this = this;
        var self = this;
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
                if (self.checkMobileUser()) {
                    return false;
                }
                else {
                    return true; // elements are always draggable by default
                }
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
            direction: 'horizontal',
            copy: false,
            copySortSource: false,
            revertOnSpill: false,
            removeOnSpill: false,
            mirrorContainer: document.body,
            ignoreInputTextSelection: true // allows users to select input text, see details below
        });
        dragulaService.drag.subscribe(function (value) {
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
        dragulaService.drop.subscribe(function (value) {
            /*
            man får ut en array med fem index...
            [0]: namnet på containern...
            [1]: note.elementet som drogs...
            [2]: diven som den släpps i...
            [3]: diven som den dras ifrån...
            [4]: Sibling, den till höger om där den släpptes... om sist null...
            */
            //  console.log(`drop, value: `);
            //  console.log(value);
            //Detta ger mig en sträng med id:t...
            //console.log(value[1].attributes[3].nodeValue);
            //Detta ger mig namnet på gruppen, varsam på att om man lägger i creator så är den tom...
            //  console.log(value[2].parentElement.parentElement.parentElement.firstElementChild.firstElementChild.id);
            //  console.log(value[2].parentElement.firstElementChild.id === "");
            // this._canSaveSibling = true; 
            var id = value[1].attributes[3].nodeValue;
            var group;
            // console.log(`group är = ${value[2].parentElement.parentElement.parentElement.children[2].firstElementChild.id}`)
            if (value[2].parentElement.parentElement.parentElement.children[2].firstElementChild.id === '') {
                // console.log('group är null');        
                group = 'noGroup';
            }
            else {
                group = value[2].parentElement.parentElement.parentElement.children[2].firstElementChild.id;
            }
            var getGroupInfo = _this._dataservice.getGroupNameFromId(id);
            getGroupInfo.then(function (result) { return _this.startUpdatingPositions(result, group, value[1], value[4]); });
            if (_this._authData != null) {
                _this._dataservice.changeNoteGroup(id, group);
            }
            else {
                _this._ls.changeNoteGroup(id, group);
            }
            _this.toastr.success('Note moved', 'Yippie');
        });
        dragulaService.over.subscribe(function (value) {
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
        dragulaService.out.subscribe(function (value) {
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
    };
    DragulaHelperService.prototype.updateGroup = function (id, group) {
        if (this._authData) {
            this._ls.changeNoteGroup(id, group);
        }
        else {
            // console.log('inloggad');     
            this._dataservice.changeNoteGroup(id, group);
        }
    };
    // updateEverySiblingOnRight() {
    //    console.log("här skall vi uppdatera positionene på this._savedSibling: ");
    //    console.log(this._savedSibling);
    //   if(this._savedSibling.nextSibling){ //use nextElementSibling ffs
    //     this._savedSibling = this._savedSibling.nextSibling;
    //     this.updateEverySiblingOnRight();
    //   }
    // }
    DragulaHelperService.prototype.startUpdatingPositions = function (oldGroup, newGroup, droppedNote, siblingNote) {
        var _this = this;
        //Gets the position from droppedNote before it changes, and firesOfThe function...
        var getIdPromise = this._dataservice.getPositionFromId(droppedNote.id);
        getIdPromise.then(function (prevPos) {
            _this.updateAndDecreasePositionOnEverySiblingInPreviousGroup(oldGroup, droppedNote, prevPos, newGroup, siblingNote);
        });
    };
    DragulaHelperService.prototype.updateAndIncreasePositionOnEverySiblingOnRightOnDrop = function (oldGroup, newGroup, droppedNote, siblingNote) {
        var _this = this;
        var tempNote = droppedNote;
        //If there is siblings to the right of dropped items -> we must update their positions... If not -> we must take the siblings to the lefts position and ++...
        if (siblingNote) {
            // console.log('finns en siblingNote till höger');
            // console.log(siblingNote);
            var getPos = this._dataservice.getPositionFromId(siblingNote.id);
            getPos.then(function (result) {
                var tempPos = result;
                //Update the dropped note with the position that it took ergo the note on the right...
                _this._dataservice.updateNotePosition(tempNote.id, tempPos);
                tempNote = tempNote.nextElementSibling;
                tempPos++;
                //Update the note on the right until the end of notes with position++...
                while (tempNote) {
                    // console.log('tempNote = ');
                    // console.log(tempNote);
                    // console.log(`inne i whileLoopen där tempPos = ${tempPos} och tempNote.id = ${tempNote.id}`);
                    _this._dataservice.updateNotePosition(tempNote.id, tempPos);
                    tempNote = tempNote.nextElementSibling;
                    tempPos++;
                }
            });
        }
        else {
            // console.log('finns ingen siblingnote till höger');
            // console.log(siblingNote);
            // console.log('finns prevsibling?');
            // console.log(droppedNote.previousElementSibling.id);
            // console.log('se ovan');
            var getPos = this._dataservice.getPositionFromId(droppedNote.previousElementSibling.id);
            getPos.then(function (result) {
                var tempPos = result;
                //Update the dropped note with the position (the note on the left + 1 ergo last position)...
                _this._dataservice.updateNotePosition(droppedNote.id, (result + 1));
            });
        }
    };
    DragulaHelperService.prototype.updateAndDecreasePositionOnEverySiblingInPreviousGroup = function (oldGroup, droppedNote, prevPos, newGroup, siblingNote) {
        var _this = this;
        // let getWholeGroup: any = this._dataservice.getWholeCurrentGroupFromGroupName(oldGroup);
        // getWholeGroup.then((result) => {
        //   console.log('klar....');
        // });
        // console.log('här kommer droppedNote');
        // console.log(droppedNote);
        // console.log(`inne i updatde and decrease...`);
        var notesInGroup = this._dataservice.getAllNotesInGroup(oldGroup);
        notesInGroup.then(function (res) {
            var doneInLoopArray;
            var arrayOfKeys = [];
            var arrayOfPos = [];
            var self = _this;
            res.forEach(function (result) {
                doneInLoopArray = result;
            });
            doneInLoopArray.forEach(function (note) {
                // console.log(`inne i loopen för att göra saker där prevPos = ${prevPos}, note.position = ${note.position}, note.$key = ${note.$key}`);
                if (note.position > prevPos) {
                    // console.log(`positionen är större än prev...`);
                    self._dataservice.updateNotePosition(note.$key, (note.position - 1));
                }
            });
            _this.updateAndIncreasePositionOnEverySiblingOnRightOnDrop(oldGroup, newGroup, droppedNote, siblingNote);
        });
    };
    DragulaHelperService.prototype.updatePositionsInGroupAndThenDeleteNoteWhenPressingDelete = function (group, prevPos, noteInNote) {
        var _this = this;
        // console.log(`inne i updatePositionsInGroupWhenPressingDelete där group = ${group}`);
        this._dataservice.deleteNote(noteInNote.$key);
        var notesInGroup = this._dataservice.getAllNotesInGroup(group);
        notesInGroup.then(function (res) {
            // console.log(`inne i then...`);
            var doneInLoopArray;
            var arrayOfKeys = [];
            var arrayOfPos = [];
            var self = _this;
            res.forEach(function (result) {
                doneInLoopArray = result;
            });
            doneInLoopArray.forEach(function (note) {
                // console.log(`inne i loopen för att göra saker där prevPos = ${prevPos}, note.position = ${note.position}, note.$key = ${note.$key}`);
                if (note.position > prevPos) {
                    // console.log(`positionen är större än prev...`);
                    self._dataservice.updateNotePosition(note.$key, (note.position - 1));
                }
            });
        });
    };
    DragulaHelperService.prototype.updatePositionsInGroup = function (group) {
        var _this = this;
        // console.log(`inne i updatePositionsInGroup där group = ${group}`);
        var notesInGroup = this._dataservice.getAllNotesInGroup(group);
        notesInGroup.then(function (res) {
            // console.log(`inne i then...`);
            var doneInLoopArray;
            var arrayOfKeys = [];
            var arrayOfPos = [];
            var self = _this;
            res.forEach(function (result) {
                doneInLoopArray = result;
            });
            doneInLoopArray.forEach(function (note) {
                // console.log(`inne i loopen för att göra saker där note.position = ${note.position}, note.position + 1 = ${note.position + 1} , note.$key = ${note.$key}`);
                self._dataservice.updateNotePosition(note.$key, (note.position + 1));
            });
        });
    };
    DragulaHelperService.prototype.groupChangedByDropDown = function (oldGroup, newgroup, prevPos, id) {
        this._dataservice.changeNoteGroup(id, newgroup);
        this._dataservice.updateNotePosition(id, -1);
        this.updatePositionsInGroup(newgroup);
        this.changePreviousGroupWhenChangingThroughDropdown(oldGroup, prevPos);
    };
    DragulaHelperService.prototype.changePreviousGroupWhenChangingThroughDropdown = function (oldGroup, prevPos) {
        var _this = this;
        var notesInGroup = this._dataservice.getAllNotesInGroup(oldGroup);
        notesInGroup.then(function (res) {
            var doneInLoopArray;
            var arrayOfKeys = [];
            var arrayOfPos = [];
            var self = _this;
            res.forEach(function (result) {
                doneInLoopArray = result;
            });
            doneInLoopArray.forEach(function (note) {
                // console.log(`inne i loopen för att göra saker där prevPos = ${prevPos}, note.position = ${note.position}, note.$key = ${note.$key}`);
                if (note.position > prevPos) {
                    // console.log(`positionen är större än prev...`);
                    self._dataservice.updateNotePosition(note.$key, (note.position - 1));
                }
            });
        });
    };
    //If the user is on a mobile phone, dragula should be disable since unneccessary sofar and it is hard to scroll of enabled...
    DragulaHelperService.prototype.checkMobileUser = function () {
        if (navigator.userAgent.match(/Android/i)
            || navigator.userAgent.match(/webOS/i)
            || navigator.userAgent.match(/iPhone/i)
            || navigator.userAgent.match(/iPad/i)
            || navigator.userAgent.match(/iPod/i)
            || navigator.userAgent.match(/BlackBerry/i)
            || navigator.userAgent.match(/Windows Phone/i)) {
            return true;
        }
        else {
            return false;
        }
    };
    DragulaHelperService = __decorate([
        core_1.Injectable(),
        __param(1, core_1.Inject(angularfire2_1.FirebaseRef)), 
        __metadata('design:paramtypes', [data_service_1.DataService, Firebase, localstorage_service_1.LocalStorageService, ng2_toastr_1.ToastsManager])
    ], DragulaHelperService);
    return DragulaHelperService;
}());
exports.DragulaHelperService = DragulaHelperService;
//# sourceMappingURL=dragula-helper.service.js.map