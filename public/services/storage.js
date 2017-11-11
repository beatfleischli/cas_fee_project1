'use strict'

let storage = (function () {

    function loadNotes () {
        var notes = JSON.parse(localStorage.getItem('notesData')) || {};
        return notes;
    }

    function writeNotes (notes) {
        localStorage.setItem('notesData',JSON.stringify(notes));
    }

    return {
        load: loadNotes,
        write: writeNotes
    }


})();