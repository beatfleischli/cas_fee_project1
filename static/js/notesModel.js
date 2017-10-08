const notesModel={
    loadNotes: function () {
        this.notes = JSON.parse(localStorage.getItem('notes'));
    },
    writeNotes: function () {
        localStorage.setItem('notes',JSON.stringify(this.notes));
    },
    setNote: function (index, note) {
        if (index){
            this.notes[index]=note;
        }else{
            this.notes.push(note);
        }
    },
    getNote: function (index) {
        return this.notes[index];
    }
}