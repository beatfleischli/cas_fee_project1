'use strict'

const notesModel={
    maxImportance: 5,
    setFilters: {},
    loadNotes: function () {
        this.notes = JSON.parse(localStorage.getItem('notesData'));
    },
    writeNotes: function () {
        localStorage.setItem('notesData',JSON.stringify(this.notes));
    },
    setNote: function (note) {
        var key;
        if (note["key"]==="_undefined"){
            key = utils.getNewGuid();
        }else{
            key = note["key"];
        }
        this.notes[key] = note["value"];
        this.writeNotes();
    },
    setFinished: function (key,date) {
        if(date){
            this.notes[key].finished=true;
            this.notes[key].finishedOn=date;
        }else{
            this.notes[key].finished=false;
            this.notes[key].finishedOn='';
        }
        this.writeNotes();
    },
    deleteNote: function (note) {
        if (note["key"]!=="_undefined"){
            this.notes[note["key"]] = undefined;
            this.writeNotes();
            this.loadNotes();
        }
    },
    getNote: function (index) {
        if(!this.notes)this.loadNotes();
        console.log(this.notes[index]);
        return (index=this.notes[index]);
    },
    getEmptyNote: function () {
        var note ={
            caption:'new Note',
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
    getAllNotes: function (sortBy,filter) {
        if(!this.notes)this.loadNotes();
        if(sortBy){
            if(this.sortBy && this.sortBy===sortBy) {
                this.sortBy = undefined;
                return this.sortNotes(sortBy).reverse();
            }else{
                this.sortBy = sortBy;
                return this.sortNotes(sortBy);
            }
        }else if(filter){
            if((filter in this.setFilters) && (this.setFilters[filter]===true)){
                this.setFilters[filter]=false;
            }else {
                this.setFilters[filter]=true;
                switch (filter) {
                    case 'finished':
                        return this.filterByFinished(this.notes);
                        break;
                }
            }
        }
        return this.notes;
    },
    filterByFinished: function (notes) {
        var newNotes={};
        for(var note in notes){
            if(notes[note].finished===true){
                newNotes[note]=notes[note];
            }
        }
        return newNotes;
    },
    sortNotes: function (sortBy) {
/*        var array = $.map(this.notes, function(value, index) {
            return [value];
        });*/
        var array = this.objectToArray(this.notes);
        switch(sortBy){
            case 'due':
                array.sort(function(a,b){
                    if (a.due > b.due){
                        return 1;
                    }else if(a.due < b.due){
                        return -1;
                    }
                    return 0;
                });
                break;
            case 'created':
                array.sort(function(a,b){
                    if (a.created > b.created){
                        return 1;
                    }else if(a.created < b.created){
                        return -1;
                    }
                    return 0;
                });
                break;
            case 'importance':
                array.sort(function(a,b){
                    if (a.importance > b.importance){
                        return -1;
                    }else if(a.importance < b.importance){
                        return 1;
                    }
                    return 0;
                });
                break;
        }
        return array;
    },
    objectToArray: function (object) {
        var array = [];
        for(var notes in object){
            array.push(object[notes]);
        }
        return array;
    }
}