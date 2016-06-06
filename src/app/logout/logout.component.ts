import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import {AuthorizationService} from "../authorization.service";
import {DataService} from '../data.service';



@Component({
  moduleId: module.id,
  selector: 'logout-user',
  templateUrl: 'logout.component.html',
  styleUrls: ['logout.component.css']
})
export class LogoutComponent implements OnInit {
  @Output() emitLogout = new EventEmitter();

  constructor(private _authService: AuthorizationService, private _ds: DataService) { }
  ngOnInit() {
  }

  logout() {
    this.emitLogout.emit('');
  }

  loggedInUser() {
    return this._authService.returnLoggedInUser();
  }
} 


