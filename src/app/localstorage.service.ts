import { Injectable } from '@angular/core';
import { Note } from './note';
import { Group } from './group';


@Injectable()
export class LocalStorageService {

    notes: any;
    groups: any;
    constructor() {
        this.notes = new Array;
        this.groups = new Array;

        if (!localStorage.getItem("savedNotes")) {
            this.notes = [];
        } else {
            this.notes = this.getAllNotes();
        }

        if (!localStorage.getItem("savedGroups")) {
            this.groups = [];
        } else {
            this.groups = this.getAllGroups();
        }
    }



    getAllGroups() {
        if (JSON.parse(localStorage.getItem("savedGroups"))) {
            this.groups = JSON.parse(localStorage.getItem("savedGroups"));
            return this.groups;
        } else {
            return [];
        }
    }

    saveGroup(group: Group) {
        this.groups.unshift(group);
        localStorage.setItem("savedGroups", JSON.stringify(this.groups));
    }



    deleteGroup(groupkey: string) {
        for (var item in this.groups) {
            if (groupkey == this.groups[item].$key) {
                this.groups.splice(item, 1);
                localStorage.setItem("savedGroups", JSON.stringify(this.groups));
                return;
            }
        }
    }

    updateGroupName(groupkey: string, newName: string) {
        var oldGroupName;
        for (var item in this.groups) {
            if (groupkey == this.groups[item].$key) { 
                this.getAllGroups();
                oldGroupName = this.groups[item].name;
                this.groups[item].name = newName;
                localStorage.setItem("savedGroups", JSON.stringify(this.groups));
            }
        }
        for (var item in this.notes) {
            if (oldGroupName == this.notes[item].group) { 
                this.getAllGroups();
                this.changeNoteGroup(this.notes[item].$key, newName);
            }
        }
        localStorage.setItem("savedNotes", JSON.stringify(this.notes));
    }

    getAllNotes() {
        this.notes = JSON.parse(localStorage.getItem("savedNotes"));
        return this.notes;
    }

    getNotesInGroup(groupName: string) {
        if (localStorage.getItem("savedNotes")) {
            this.notes = JSON.parse(localStorage.getItem("savedNotes"));
            let groupNotes = new Array;
            for (var item of this.notes) {
                if (item.group === groupName) {
                    groupNotes.push(item);
                }
            }
            return groupNotes;
        } else {
            return [];
        }
    }

    changeNoteGroup(key: string, newGroup: string) {
        for (var item in this.notes) {
            if (key == this.notes[item].$key) {
                this.getAllNotes();
                this.notes[item].group = newGroup;
                localStorage.setItem("savedNotes", JSON.stringify(this.notes));
                return;
            }
        }

    }

    addNoteToNotes(note: Note) {
        this.notes.push(note);
        localStorage.setItem("savedNotes", JSON.stringify(this.notes));
    }

    deleteNote(key: string) {
        for (var item in this.notes) {
            if (key == this.notes[item].$key) {
                this.getAllNotes();
                this.notes.splice(item, 1);
                localStorage.setItem("savedNotes", JSON.stringify(this.notes));
                return;
            }
        }

    }

    updateNoteTitle(noteKey: string, newTitle: string) {
        for (var item in this.notes) {
            if (noteKey == this.notes[item].$key) {
                this.getAllNotes();
                this.notes[item].title = newTitle;
                localStorage.setItem("savedNotes", JSON.stringify(this.notes));
                return;
            }
        }
    }

    updateNoteText(noteKey: string, newText: string) {
        for (var item in this.notes) {
            if (noteKey == this.notes[item].$key) {
                this.getAllNotes();
                this.notes[item].text = newText;
                localStorage.setItem("savedNotes", JSON.stringify(this.notes));
                return;
            }
        }
    }

    updateNoteColor(noteKey: string, color: string) {
        for (var item in this.notes) {
            if (noteKey == this.notes[item].$key) {
                this.getAllNotes();
                this.notes[item].color = color;
                localStorage.setItem("savedNotes", JSON.stringify(this.notes));
                return;
            }
        }
    }

     getGroupNameFromId(id: string) {
        for (var item in this.notes) {
            if (id == this.notes[item].$key) {
                this.getAllNotes();
                return this.notes[item].group;
            }
        }
    }

    getPositionFromId(id: string) {
          for (var item in this.notes) {
            if (id == this.notes[item].$key) {
                this.getAllNotes();
                return this.notes[item].position;
            }
        }
    }

    updateNotePosition(id: string, position: number) {
     for (var item in this.notes) {
            if (id == this.notes[item].$key) {
                this.getAllNotes();
                this.notes[item].position = position;
                localStorage.setItem("savedNotes", JSON.stringify(this.notes));
                return;
            }
        }
    }

    //For testing.... 
    clearing() {
        this.groups = [];
        localStorage.setItem("savedGroups", JSON.stringify(this.groups));
        this.notes = [];
        localStorage.setItem("savedNotes", JSON.stringify(this.notes));
    }

    printAll() {
        console.log("Notes in local: ");
        console.log(this.notes);
        console.log("Groups in local: ");
        console.log(this.groups);
    }
}

