import { Injectable } from '@angular/core';
import { Note } from './note';
import { Group } from './group';


@Injectable()
export class LocalStorageService {

    notes: any;
    groups: any;


    constructor() {
        console.log("inne i LocalStorageService constructor");
        if (!localStorage.getItem("savedNotes")) {
            this.notes = [];
        } else {
            this.notes = this.getAllNotes();
        }
        this.groups = this.getAllGroups();
    }

    getAllNotes() {
        this.notes = JSON.parse(localStorage.getItem("savedNotes"));
        return this.notes;
    }

    getAllGroups() {
        this.groups = JSON.parse(localStorage.getItem("savedGroups"));
        return this.groups;
    }

    saveGroup(group: Group) {
        this.groups.push(group);
        localStorage.setItem("savedGroups", JSON.stringify(this.groups));
    }

    getNotesInGroup() {
        //GET all notes in each group!?
    }

    deleteGroup(groupkey: string) {
        console.log(groupkey);
        for (var item in this.groups) {
            console.log(item);
            if (groupkey == this.groups[item].$key) {
                this.groups.splice(item, 1);
                console.log(this.groups);
                localStorage.setItem("savedGroups", JSON.stringify(this.groups));
                //TO DO : Refresha menyn!
                return;
            }
        }
    }

    updateGroupName(groupkey: string, newName: string) {
        for (var item in this.groups) {
            if (groupkey == this.groups[item].$key) {
                this.groups[item].name = newName;
                localStorage.setItem("savedGroups", JSON.stringify(this.groups));
                return;
            }
        }
    }

    addNoteToNotes(note: Note) {
        this.notes.push(note);
        localStorage.setItem("savedNotes", JSON.stringify(this.notes));
        console.log(this.notes);
    }


    //For testing.... 
    clearing() {
        this.groups = [];
        localStorage.setItem("savedGroups", JSON.stringify(this.groups));
        this.notes = [];
        localStorage.setItem("savedNotes", JSON.stringify(this.notes));
    }

}