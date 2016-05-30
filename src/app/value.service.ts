import { Injectable } from '@angular/core';

@Injectable()
export class ValueService {

  _showSideBar:boolean = true;
  _toggleExpand:boolean = false;

  constructor() {}
  
    get showSideBar(){
    return this._showSideBar;
    }
    
    set showSideBar(b:boolean){
      this._showSideBar = b;
    }
    
    
    // getters and setter for the toggle arrow
        get toggleExpand(){
    return this._toggleExpand;
    }
    
    set toggleExpand(b:boolean){
      this._toggleExpand = b;
    }

}
