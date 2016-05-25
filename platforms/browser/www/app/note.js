"use strict";
var Note = (function () {
    //Kommer tillkomma andra variabler...
    function Note(title, text) {
        this.title = title;
        this.text = text;
        console.log("inne i note.ts konstruktor");
    }
    return Note;
}());
exports.Note = Note;
//# sourceMappingURL=note.js.map