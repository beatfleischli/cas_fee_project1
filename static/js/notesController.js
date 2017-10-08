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
        this.out = mainEl;
        this.currentView = location.hash || "#listNotes";
        asideEl.addEventListener('click',notesController.asideEvent);
        mainEl.addEventListener('click',notesController.mainEvent);
        this.renderUI();
    },
    renderUI: function () {
        switch (this.currentView) {
        case "#edit":
            this.view.renderEdit(this.out);
            break;
        case "#new":
            this.view.renderEdit(this.out);
            break;
        case "#list":
            this.view.renderList(this.out);
            break;
        default:
            this.view.renderError(this.out);
            break;
        }
    }
}