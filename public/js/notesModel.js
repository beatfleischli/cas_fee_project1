'use strict'

const notesModel={
    setNote: function (note,callback) {
        if (note["_id"]===undefined) {
            restClient.createNote(note, (function (newNote) {
                newNote = JSON.parse(newNote);
                this.notes[newNote["_id"]] = newNote;
                callback();
            }).bind(this));
        }else{
            restClient.updateNote(note, (function (newNote) {
                newNote = JSON.parse(newNote);
                this.notes[newNote["_id"]] = newNote;
                callback();
            }).bind(this));
        }
    },
    setFinished: function (key,date,callback) {
        let note = this.notes[key];
        if(date){
            note.finished=true;
            note.finishedOn=date;
        }else{
            note.finished=false;
            note.finishedOn='';
        }
        this.setNote(note,callback);
    },
    deleteNote: function (note,callback) {
        if (note["_id"]===undefined) {
            callback();
        }else{
            restClient.deleteNote(note, (function (delNote) {
                delNote = JSON.parse(delNote);
                delete this.notes[delNote["_id"]];
                callback();
                alert(`The note ${delNote['caption']}'s state has been set to ${delNote['state']}`);
            }).bind(this));
        }
    },
    getNote: function (index) {
        if(!this.notes)this.notes=storage.load();
        console.log(this.notes[index]);
        return (index=this.notes[index]);
    },
    getEmptyNote: function () {
        var note ={
            caption:'New Note',
            created: '',
            description: '',
            due: '',
            finished: false,
            finishedOn:'',
            importance:0,
            summary: ''
        };
        return note;
    },
    getAllNotes: function (sortBy,filterBy,reverse,callback) {
        if(!this.notes){
            restClient.getNotes((function (notes) {
                notes = JSON.parse(notes);
                this.notes = {};
                if(0<notes.length) {
                    for (let i = 0; i < notes.length; i++) {
                        let item = notes[i];
                        this.notes[item["_id"]] = item;
                    }
                }
                callback (this.notes);
            }).bind(this));
        }else{
            let notesArray = utils.objectToArray(this.notes);
            if (sortBy) {
                notesArray.sort(function(a,b){
                    if (a[sortBy] > b[sortBy]){
                        return 1;
                    }else if(a[sortBy] < b[sortBy]){
                        return -1;
                    }
                    return 0;
                });
                if (reverse) {
                    notesArray.reverse();
                }
            }
            if (filterBy) {
                notesArray = notesArray.filter(function(item){
                    return item[filterBy]===reverse;
                })
            }
            callback(notesArray);
        }
    }
}