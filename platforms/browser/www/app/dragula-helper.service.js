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
var DragulaHelperService = (function () {
    function DragulaHelperService(_dataservice, _ref, _ls) {
        this._dataservice = _dataservice;
        this._ref = _ref;
        this._ls = _ls;
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
            console.log("drop, value: ");
            console.log(value);
            //Detta ger mig en sträng med id:t...
            //console.log(value[1].attributes[3].nodeValue);
            //Detta ger mig namnet på gruppen, varsam på att om man lägger i creator så är den tom...
            //  console.log(value[2].parentElement.firstElementChild.id);
            //  console.log(value[2].parentElement.firstElementChild.id === "");
            var id = value[1].attributes[3].nodeValue;
            var group;
            // console.log(`cosnollen group = ${value[2].parentElement.parentElement.firstElementChild.id}`);
            if (value[2].parentElement.parentElement.firstElementChild.id === '') {
                // console.log('group är null');
                group = 'noGroup';
            }
            else {
                group = value[2].parentElement.parentElement.firstElementChild.id;
            }
            // console.log('1');
            // this._notes.child(id).child('group').once('value').then(function(s) {
            //   let currentGroup = s.val();
            //   console.log('cg '+ currentGroup)
            //    if (currentGroup == group) {
            //       console.log('dropped note in same group will not update group...')
            //    } else {
            //      this.updateGroup(id, group);
            //    }
            // }); 
            /* Vill göra en kontroll på om den bytte till en annan grupp men måste läsa på om promises mer först... */
            console.log('nu testar jag');
            var currentGroup = _this._dataservice.getGroupNameFromId(id);
            // console.log('2');
            currentGroup.then(function (result) { return (console.log('inne i promisen: ' + result)); });
            // console.log('3');
            //  console.log(group + ' <--  + currentGroup:');
            //  console.log('6');
            //  console.log(currentGroup);
            //  console.log('7');
            // if (currentGroup == group) {
            //   do nothing
            // } else {
            // console.log(`id = ${id}, group = ${group}`);
            if (_this._authData != null) {
                // console.log('inloggad');
                _this._dataservice.changeNoteGroup(id, group);
            }
            else {
                _this._ls.changeNoteGroup(id, group);
            }
            // }
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
            console.log("out, value: ");
            console.log(value);
        });
    };
    DragulaHelperService.prototype.updateGroup = function (id, group) {
        if (this._authData) {
            this._ls.changeNoteGroup(id, group);
        }
        else {
            console.log('inloggad');
            this._dataservice.changeNoteGroup(id, group);
        }
    };
    DragulaHelperService = __decorate([
        core_1.Injectable(),
        __param(1, core_1.Inject(angularfire2_1.FirebaseRef)), 
        __metadata('design:paramtypes', [data_service_1.DataService, Firebase, localstorage_service_1.LocalStorageService])
    ], DragulaHelperService);
    return DragulaHelperService;
}());
exports.DragulaHelperService = DragulaHelperService;
//# sourceMappingURL=dragula-helper.service.js.map