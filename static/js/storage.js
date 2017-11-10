'use strict'

let storage = (function () {

    function loadNotes () {
        return JSON.parse(localStorage.getItem('notesData'));
    }

    function writeNotes (notes) {
        localStorage.setItem('notesData',JSON.stringify(notes));
    }

    return {
        load: loadNotes,
        write: writeNotes
    }


})();