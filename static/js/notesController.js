'useStrict'

const notesController = {
    eventClick: function (e) {
        var butClass = e.target.classList[0],
            butKey = e.target.dataset.key,
            newHash = '#'+butClass;

        console.log(butClass);
        console.log(butKey);

        switch (butClass){
            case "new":
                location.hash = newHash;
                break;
            case "edit":
                location.hash = newHash+'_'+butKey;
                break;
            case "sort":
                location.hash = newHash+'_'+butKey;
                break;
            case "filter":
                location.hash = newHash+'_'+butKey;
                break;
            case "saveOrCancel":
                location.hash = newHash+'_'+butKey;
                break;
        }
    },
    eventChange: function (e) {
        var butClass = e.target.classList[0],
            butNewVal = e.target.value,
            newHash = '#'+butClass;

        console.log(butClass);
        console.log(butNewVal);

        switch (butClass){
            case "style":
                this.changeStyle(butNewVal);
                break;
        }
    },
    eventPop: function (e){
        var newHash = location.hash.substr(1).split('_'),
            butClass = newHash[0],
            butNewVal = newHash[1];

        console.log(e.state);
        console.log(window.innerDoClick);
//        console.log(butNewVal);
    },
    bootstrap: function (model,view,asideEl,mainEl) {
        this.model = model;
        this.view = view;
        this.view.out = mainEl;
        if(!location.hash ) location.hash = "#list";
        asideEl.addEventListener('click',notesController.eventClick);
        asideEl.addEventListener('change',notesController.eventChange.bind(this));
        mainEl.addEventListener('click',notesController.eventClick.bind(this));
        window.addEventListener("hashchange",notesController.dispatch.bind(this));
//        window.addEventListener("popstate",notesController.eventPop.bind(this));

        this.dispatch();
    },
    dispatch: function () {
        var params = location.hash.substr(1).split('_');
        var action = params[0];
        var detail = params[1];

        switch (action) {
        case "edit":
            this.editNote(detail);
            break;
        case "add":
            this.addNote();
            break;
        case "list":
            this.listNotes();
            break;
        case "saveOrCancel":
            this.saveOrCancel(detail);
            break;
        default:
            this.showMessage("Action could not be found");
            break;
        }
    },
    addNote: function () {
        this.view.renderEdit(this.out);
    },
    editNote: function (key) {
        var note = this.model.getNote(key);
        this.view.renderEdit(note);
        var form = document.getElementById("note");
        form.onsubmit = function(){
            //   alert("Prevent submit");
            return false;
        }
/*        $("form").submit(function(e){
            alert('submit intercepted');
            e.preventDefault(e);
        });*/
    },
    listNotes: function () {
        var notesData = this.model.getAllNotes();
        this.view.renderList(this.model.completeProps(notesData));
    },
    saveOrCancel: function (doWhat) {
        if('save'=== doWhat){
            var note = this.model.serializeForm(document.getElementById('note'));
            this.model.setNote(note);
        }
        location.hash = "#list";
    },
    showMessage: function (string) {
        this.view.renderError(string)
    },
    changeStyle: function () {
        this.showMessage('Style successfully changed.');
    }
}