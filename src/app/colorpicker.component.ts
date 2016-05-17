import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS} from '@angular/router-deprecated';
import {AngularFire} from 'angularfire2';
import {FirebaseListObservable} from 'angularfire2';
import {DataService} from './data.service';
import {Note}from './note';

@Component({
  moduleId: module.id,
  selector: 'colorpicker',
  providers: [ROUTER_PROVIDERS],
  templateUrl: 'colorpicker.component.html',
  styleUrls: ['colorpicker.component.css'],
  directives: [ROUTER_DIRECTIVES],
  pipes: []
})

@RouteConfig([
])

export class ColorpickerComponent implements OnInit {
    // @Input() group: string;
    // @Output() changeGroup = new EventEmitter();
    // @Input() noteGroup: string;
    // @Output() changeNoteGroup = new EventEmitter();  
    
    showingColors: boolean = false;
    public disabled:boolean = false;
    public status:{isopen:boolean} = {isopen: false};   
  
    constructor(private _ds: DataService) {}
    
    ngOnInit() {
        
    }
    
    selectColor(){
      
      console.log("color selected: ");
    }
    
    colorButtonClick() {
      this.showingColors = !this.showingColors;
    }
}