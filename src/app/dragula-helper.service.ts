import { Injectable } from '@angular/core';
import { DragulaService } from 'ng2-dragula/ng2-dragula';
import {DataService} from './data.service';

@Injectable()
export class DragulaHelperService {

  constructor(private _dataservice: DataService) {}

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
      //  console.log(`drop, value: `);
      //  console.log(value);
       
       //Detta ger mig en sträng med id:t...
       //console.log(value[1].attributes[3].nodeValue);
       
       //Detta ger mig namnet på gruppen, varsam på att om man lägger i creator så är den tom...
       //  console.log(value[2].parentElement.firstElementChild.id);
       //  console.log(value[2].parentElement.firstElementChild.id === "");
       
      let id: string = value[1].attributes[3].nodeValue;
      let group: string;
      if (value[2].parentElement.firstElementChild.id === '') {
        group = 'noGroup'
      } else {
        group = value[2].parentElement.firstElementChild.id;
      }
      
      /* Vill göra en kontroll på om den bytte till en annan grupp men måste läsa på om promises mer först... */
      // let currentGroup: string = this._dataservice.getGroupNameFromId(id) ;
      // console.log(group + ' <-- ' + currentGroup);
      // if (currentGroup == group) {
      //   do nothing
      // } else {
        this._dataservice.changeNoteGroup(id, group);
      // }
      
      
      
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
      //  console.log(`out, value: `);
      //  console.log(value);

      
      
      

    });
    
  }
  
}
