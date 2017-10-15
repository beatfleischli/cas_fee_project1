'useStrict'

const notesModel={
    loadNotes: function () {
        this.notes = JSON.parse(localStorage.getItem('notesData'));
    },
    writeNotes: function () {
        localStorage.setItem('notesData',JSON.stringify(this.notes));
    },
    setNote: function (note) {
        var key;
        if (note["_undefined"]){
            key = this.guid();
        }else{
            key = note["key"];
        }
        this.notes[key] = note["value"];
        this.writeNotes();
    },
    getNote: function (index) {
        console.log(this.notes[index]);
        return this.notes[index];
    },
    getAllNotes: function () {
        this.loadNotes();
        return this.notes;
    },
    completeProps: function (notesData) {
        for(var property in notesData){
            if (notesData.hasOwnProperty(property)){
                notesData[property].key=property;
                notesData[property].summary=(notesData[property].description).substr(0,15)+'...';
            }
        }
        return notesData;
    },
    guid: function () {
    return this.s4() + this.s4() + '-' + this.s4() + '-' + this.s4() + '-' +
        this.s4() + '-' + this.s4() + this.s4() + this.s4();
    },
    s4: function () {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    },
    serializeForm: function (formElement) {
//        alert(formElement.elements["key"].value);
        var key = formElement.elements["key"].value || "_undefined",
            created = formElement.elements["created"].value || new Date(),
            note = [];
        note["key"] = key;
        note["value"] = {
            "caption": formElement.elements["caption"].value,
            "description": formElement.elements["description"].value,
            "summary": formElement.elements["description"].value.substr(0, 15) + '...',
            "importance": formElement.elements["importance"].value,
            "due": formElement.elements["due"].value,
            "created": created
        };

        return note;
    }
}