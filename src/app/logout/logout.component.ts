import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import {AuthorizationService} from "../authorization.service";
import {DataService} from '../data.service';
import {ValueService} from '../value.service';



@Component({
  moduleId: module.id,
  selector: 'logout-user',
  templateUrl: 'logout.component.html',
  styleUrls: ['logout.component.css']
})
export class LogoutComponent implements OnInit {
  @Output() emitLogout = new EventEmitter();

  constructor(private _authService: AuthorizationService, private _tx: ValueService, private _ds: DataService) { }
  ngOnInit() {
  }

  logout() {
    this._tx._groupNames = [];
    this._tx._groupExpandeds = [];
    this.emitLogout.emit('');
  }

  loggedInUser() {
    return this._authService.returnLoggedInUser();
  }
} 


