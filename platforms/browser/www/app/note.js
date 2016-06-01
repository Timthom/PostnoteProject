"use strict";
var Note = (function () {
    function Note(title, text, group, $key, color) {
        this.title = title;
        this.text = text;
        this.group = group;
        this.$key = $key;
        this.color = color;
        console.log("inne i note.ts konstruktor");
    }
    return Note;
}());
exports.Note = Note;
//# sourceMappingURL=note.js.map