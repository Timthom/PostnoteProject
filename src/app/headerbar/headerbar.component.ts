import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'headerbar',
  templateUrl: 'headerbar.component.html',
  styleUrls: ['headerbar.component.css']
})
export class HeaderbarComponent implements OnInit {

  @Output() openSideBar = new EventEmitter();

  constructor() {}

  ngOnInit() {
  }
  
   toggleSideBar(){
       this.openSideBar.emit('');
    }

}
