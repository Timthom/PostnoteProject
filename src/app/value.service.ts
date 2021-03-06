import { Injectable } from '@angular/core';

@Injectable()
export class ValueService {

  _showSideBar: boolean = false;
  _toggleDelete: boolean = true;
  _toggleCreate: boolean = false;
  _focusedId: string = '';
  _focusedName: string = '';
  _focusedNoteKeys: string[] = [];
  _groupNames: string[] = [];
  _menuNames: string[] = [];
  _groupExpandeds: string[] = [];
  _menuExpandeds: string[] = [];
  _groupCount: number = 0;
  _clickedGroup: string = '';

  constructor() { }

  get showSideBar() {
    return this._showSideBar;
  }

  set showSideBar(b: boolean) {
    this._showSideBar = b;
  }

  get toggleDelete() {
    return this._toggleDelete;
  }

  set toggleDelete(b: boolean) {
    this._toggleDelete = b;
  }

  get toggleCreate() {
    return this._toggleCreate;
  }

  set toggleCreate(b: boolean) {
    this._toggleCreate = b;
  }

  get focusedId() {
    return this._focusedId;
  }

  set focusedId(id: string) {
    this._focusedId = id;
  }
  get focusedName() {
    return this._focusedName;
  }
  set focusedName(name: string) {
    this._focusedName = name;
  }

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

  get menuNames() {
    return this._menuNames;
  }

  set menuNames(names: string[]) {
    this._menuNames = names;
  }

  get menuExpandeds() {
    return this._menuExpandeds;
  }

  set menuExpandeds(names: string[]) {
    this._menuExpandeds = names;
  }
}
