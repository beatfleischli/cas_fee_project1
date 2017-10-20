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
            case "filter":
                if(location.hash===newHash+'_'+butKey){
                    notesController.dispatch();
                }else {
                    location.hash = newHash + '_' + butKey;
                }
                break;
            case "saveOrCancel":
                location.hash = newHash+'_'+butKey;
                break;
            case "setimp":
                notesController.setImportance(e);
                break;
            case "setfin":
                notesController.setFinished(e);
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
                this.setStyle(butNewVal);
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
  //      this.view.model = this.model;
        this.view.out = mainEl;
        if(!location.hash ) location.hash = "#list";
        asideEl.addEventListener('click',notesController.eventClick);
        asideEl.addEventListener('change',notesController.eventChange.bind(this));
        mainEl.addEventListener('click',notesController.eventClick.bind(this));
        window.addEventListener("hashchange",notesController.dispatch.bind(this));
//        window.addEventListener("popstate",notesController.eventPop.bind(this));
        this.view.init();

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
        case "new":
            this.addNote();
            break;
        case "list":
        case "sort":
            this.listNotes(detail);
            break;
        case "saveOrCancel":
            this.saveOrCancel(detail);
            break;
        case "filter":
            this.listNotes(false,detail);
            break;
        default:
            this.showMessage("Action could not be found");
            break;
        }
    },
    addNote: function () {
        var note = this.model.getEmptyNote();
        this.view.renderEdit(note);
    },
    editNote: function (key) {
        var note = this.model.getNote(key);
        note["key"]=key;
        this.view.renderEdit(note);

/*        $("form").submit(function(e){
            alert('submit intercepted');
            e.preventDefault(e);
        });*/
    },
    listNotes: function (sortBy,filter) {
        var notesData = this.model.getAllNotes(sortBy,filter);
//        this.view.renderList(this.model.completeProps(notesData));
        if(1>notesData.length){
            location.hash = '#new';
        }else {
            this.view.renderList(notesData);
        }
    },
    saveOrCancel: function (doWhat) {
        if('save'=== doWhat){
            var note = this.model.serializeForm(document.getElementById('note'));
            this.model.setNote(note);
        }else if('delete'=== doWhat){
            var note = this.model.serializeForm(document.getElementById('note'));
            this.model.deleteNote(note);
        }
        location.hash = "#list";
    },
    showMessage: function (string) {
        this.view.renderError(string)
    },
    setStyle: function () {
        this.showMessage('Style successfully changed.');
    },
    setImportance: function (e) {
        var newimp = e.target.dataset.index;
        document.getElementById('importance').value=newimp;
        this.view.renderImportance(newimp);
        console.log(newimp);
    },
    setFinished: function (e) {
        var target = e.target;
        if(e.target.type === 'checkbox'){
            var date='';
            if(e.target.checked===true){
                date = this.getDate('',true);
            }
            this.view.renderFinishedOn(date);
            console.log('checkbox')
        }else if(e.target.type === 'date'){
            console.log('date')
        }
        console.log(e.target);
    },
    getDate: function (delta,reverse) {
        var delta = delta || 0;
        var newDate = new Date(Date.now()+delta*1000*3600*24);
        var dd = newDate.getDate();
        var mm = newDate.getMonth()+1; //January is 0!

        var yyyy = newDate.getFullYear();
        if(dd<10){
            dd='0'+dd;
        }
        if(mm<10){
            mm='0'+mm;
        }

        if(reverse){
            return yyyy+'-'+mm+'-'+dd;
        }else{
            return dd+'/'+mm+'/'+yyyy;
        }
    }
}