const notesController = {
    asideEvent: function (e) {
        console.log(e.target.classList);
    },
    mainEvent: function (e) {
        console.log(e.target);
    },
    bootstrap: function (model,view,asideEl,mainEl) {
        this.model = model;
        this.view = view;
        this.view.out = mainEl;
        if(!location.hash ) location.hash = "#list";
        asideEl.addEventListener('click',notesController.asideEvent);
        asideEl.addEventListener('change',notesController.asideEvent);
        mainEl.addEventListener('click',notesController.mainEvent);
        this.dispatch();
    },
    dispatch: function () {
        var params = location.hash.substr(1).split('_');
        var action = params[0];
        var detail = params[1];

        switch (action) {
        case "edit":
            this.view.renderEdit(this.out);
            break;
        case "add":
            this.view.renderEdit(this.out);
            break;
        case "list":
            this.view.renderList(this.out);
            break;
        default:
            this.view.renderError(this.out);
            break;
        }
    },
    addNote: function () {

    },
    editNote: function () {

    },
    listNotes: function () {
        var notes = this.model.getAllNotes();
        this.view.renderList(notes);
    }
}