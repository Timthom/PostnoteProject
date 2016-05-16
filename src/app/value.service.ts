import { Injectable } from '@angular/core';

@Injectable()
export class ValueService {

  _showSideBar:boolean = true;

  constructor() {}
  
    get showSideBar(){
    return this._showSideBar;
    }
    
    set showSideBar(b:boolean){
      this._showSideBar = b;
    }

}
