import { Injectable } from '@angular/core';
import { DragulaService } from 'ng2-dragula/ng2-dragula';

@Injectable()
export class DragulaHelperService {

  constructor() {}

  /***********************************************************
  -------------------Dragula stuff below----------------------
  ***********************************************************/
  
  _configureDragula(dragulaService: DragulaService) {
    dragulaService.setOptions('drag-bag', {
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
    
    dragulaService.drag.subscribe((value) => {
      // console.log(`drag: ${value[0]}`);
      this._onDrag(value.slice(1));
    });
    dragulaService.drop.subscribe((value) => {
      // console.log(`drop: ${value[0]}`);
      this._onDrop(value.slice(1));
    });
    dragulaService.over.subscribe((value) => {
      // console.log(`over: ${value[0]}`);
      this._onOver(value.slice(1));
    });
    dragulaService.out.subscribe((value) => {
      // console.log(`out: ${value[0]}`);
      this._onOut(value.slice(1));
    });
    
  }
  
  private _onDrag(args) {
    let [e, el] = args;
    // do something
  //  console.log(`Inne i onDrag e: ${e}, el: ${el}`);
  }

  private _onDrop(args) {
    let [e, el] = args;
    // do something
    // console.log(`Inne i onDrop e: ${e}, el: ${el}`);
  }

  private _onOver(args) {
    let [e, el, container] = args;
    // do something
    // console.log(`Inne i onOver e: ${e}, el: ${el}, container: ${container}`);
  }

  private _onOut(args) {
    let [e, el, container] = args;
    // do something
    // console.log(`Inne i onOut e: ${e}, el: ${el}, container: ${container}`);
  }
   
  

}
