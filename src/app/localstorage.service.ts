import { Injectable } from '@angular/core';
import { Note } from './note';


@Injectable()
export class LocalStorageService {
    
    notes: any[];
    
    
    constructor () {
        console.log("inne i LocalStorageService constructor");
    }
    
    getAllNotes () {
        this.notes = JSON.parse(localStorage.getItem("savedNotes"));
        return this.notes;
    }
    
    // addToStorage(listToSave) {
    //     var newArray = [];
    //     for(var i = 0; i < listToSave.length; i++){
    //         newArray.push(listToSave[i].title);
    //     }
    //     localStorage.setItem("savedItems", JSON.stringify(newArray));
    // }

    // getItems() {
    //     var saved = JSON.parse(localStorage.getItem("savedItems"));
    //     return saved;
    
    // }

    // printItems(){
    //     var arrayToPrint = this.getItems();
    //     for(var i = 0; i < arrayToPrint.length; i++){
    //         this.myItemList.add(arrayToPrint[i]);
    //     }
    // }
}