import {Component, Input, Pipe} from '@angular/core';
import {AngularFire} from 'angularfire2';
import {FirebaseListObservable} from 'angularfire2';
import {DataService} from './data.service';
import {OnInit} from '@angular/core';
import {Postnote2App} from './postNote2.component';
import { Injectable } from '@angular/core';
import { defaultFirebase, FirebaseRef } from 'angularfire2';
import { Observable } from 'rxjs/Observable';


@Component({
  moduleId: module.id,
  selector: 'menuGroup',
  templateUrl: 'menuGroup.component.html',
  styleUrls: ['menuGroup.component.css'],
  pipes: []
})


export class MenuGroupComponent {
  @Input()
  group; 
  
  @Input()
  groupName;
}