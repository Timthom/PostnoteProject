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
    @Output() changeColor = new EventEmitter();
    
    showingColors: boolean = false;  
  
    constructor(private _ds: DataService) {}
    
    ngOnInit() {
        
    }
    
    selectColor(color: string){
      this.changeColor.emit(color);
      this.showingColors = false;
    }
    
    colorButtonClick() {
      this.showingColors = !this.showingColors;
    }
}