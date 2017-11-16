import restClient from "../services/restClient.js"
import  utils from "../utils/utils.js"

class Notes {
    constructor(){

    }
}


class NotesManager{
/*    constructor(){
        restClient.getNotes((function (notes) {
            notes = JSON.parse(notes);
            this.notes = {};
            if(0<notes.length) {
                for (let i = 0; i < notes.length; i++) {
                    let item = notes[i];
                    this.notes[item["_id"]] = item;
                }
            }
        }).bind(this));
    }*/
    setNote (note,callback) {
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
    }
    setFinished (key,date,callback) {
        let note = this.notes[key];
        if(''===date){
            note.finished=false;
            note.finishedOn='';
        }else{
            note.finished=true;
            note.finishedOn=date;
        }
        this.setNote(note,callback);
    }
    deleteNote (note,callback) {
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
    }
    getNote (index,callback) {
        if(!this.notes){
            this.loadNotes(function(notes){
                callback(notes[index])
            });
        }else{
            console.log(this.notes[index]);
            let note = this.notes[index];
            let test = utils.makeDateHandy(note.finishedOn);
            callback(this.notes[index]);
        }
    }
    loadNotes (callback){
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
    }
    getAllNotes (sortBy,filterBy,reverse,callback) {
        if(!this.notes){
            this.loadNotes(callback);
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
    static getEmptyNote () {
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
    }
}

export default new NotesManager();