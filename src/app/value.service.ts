import { Injectable } from '@angular/core';

@Injectable()
export class ValueService {

  _showSideBar: boolean = false;
  _toggleExpand: boolean = false;
  _focusedId: string = '';
  //_focusedName: string = '';
  _focusedNoteKeys: string[] = [];
  _groupNames: string[] = [];
  _groupExpandeds: string[] = [];
  _groupCount: number = 0;

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
  // Getting and settting focused Name
  /*get focusedName() {
    return this._focusedName;
  }
  set focusedName(name: string) {
    this._focusedName = name;
  }*/

  get focusedNoteKeys() {
    return this._focusedNoteKeys;
  }

  set focusedNoteKeys(keys: string[]) {
    this._focusedNoteKeys = keys;
  }

  get groupNames() {
    return this._groupNames;
  }

  set groupNames(names: string[]) {
    this._groupNames = names;
  }

  get groupExpandeds() {
    return this._groupExpandeds;
  }

  set groupExpandeds(names: string[]) {
    this._groupExpandeds = names;
  }

  get groupCount() {
    return this._groupCount;
  }

  set groupCount(savedNumber: number) {
    this._groupCount = savedNumber;
  }
}
