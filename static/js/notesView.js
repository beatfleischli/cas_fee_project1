const notesView = {
    renderList: function (out, notesList) {
        notesTemplateText=$('#notesListTemplate').html();
    },
    renderEdit: function (out, note) {
        noteTemplateText=$('#noteEditTemplate').html();
    },
    renderError: function (out) {
        out.innerHTML = "Sorry, we couldn't understand your request!"
    }
}