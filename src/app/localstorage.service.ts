import { Injectable } from '@angular/core';
import { Note } from './note';


@Injectable()
export class LocalStorageService {
    
    constructor () {
        console.log("inne i LocalStorageService constructor");
    }
    
    // function addToStorage(listToSave) {
    //     var newArray = [];
    //     for(var i = 0; i < listToSave.length; i++){
    //         newArray.push(listToSave[i].title);
    //     }
    //     localStorage.setItem("savedItems", JSON.stringify(newArray));
    // }

    // function getItems() {
    //     var saved = JSON.parse(localStorage.getItem("savedItems"));
    //     return saved;
    
    // }

    // function printItems(){
    //     var arrayToPrint = getItems();
    //     for(var i = 0; i < arrayToPrint.length; i++){
    //         myItemList.add(arrayToPrint[i]);
    //     }
    // }
    
}