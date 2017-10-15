'useStrict'

const notesView = {
    noteTempls: [],
    renderList: function (notesList) {
        notesTemplateText=$('#notesListTemplate').html();
        createNotesHtml = Handlebars.compile (notesTemplateText);
        this.out.innerHTML = createNotesHtml(notesList);
    },
    renderEdit: function (note) {
        noteTemplateText=$('#noteEditTemplate').html();
        createNoteHtml = Handlebars.compile (noteTemplateText);
        this.out.innerHTML = createNoteHtml(note);
    },
    renderError: function (message) {
        this.out.innerHTML = message || "Sorry, we couldn't understand your request!"
    }
}