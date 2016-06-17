import { Injectable } from '@angular/core';

@Injectable()
export class ValueService {

  _showSideBar: boolean = false;
  _toggleExpand: boolean = false;
  _focusedId: string = '';
  _focusedNoteKeys: string[] = [];

  constructor() { }

  get showSideBar() {
    return this._showSideBar;
  }

  set showSideBar(b: boolean) {
    this._showSideBar = b;
  }

  // getters and setter for the toggle arrow
  get toggleExpand() {
    return this._toggleExpand;
  }

  set toggleExpand(b: boolean) {
    this._toggleExpand = b;
  }

  get focusedId() {
    return this._focusedId;
  }

  set focusedId(id: string) {
    this._focusedId = id;
  }

  get focusedNoteKeys() {
    return this._focusedNoteKeys;
  }

  set focusedNoteKeys(keys: string[]) {
    this._focusedNoteKeys = keys;
  }

}
