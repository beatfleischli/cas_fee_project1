'use strict'

const notesController = {
    eventClick: function (e) {
        var butClass = e.target.classList[0],
            butKey = e.target.dataset.key,
            action = e.target.dataset.action,
            hide = e.target.dataset.hide || false,
            newHash = '#'+butClass;

        console.log(butClass);
        console.log(butKey);

        if(action){
            if(hide){
                notesController[action](butKey);
            }else {
                var arg = '';
                if (butKey) {
                    arg = "_" + butKey;
                }
                location.hash = "#" + action + arg;
            }
        }
    },
    eventChange: function (e) {
        var butClass = e.target.classList[0],
            butNewVal = e.target.value,
            change = e.target.dataset.change;

        console.log(butClass);
        console.log(butNewVal);


        if(change) {
            notesController[change](e);
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
        mainEl.addEventListener('change',notesController.eventChange.bind(this));
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
            case "add":
            case "list":
            case "sort":
                this[action](detail);
                break;
            case "saveOrCancel":
                this.saveOrCancel(detail);
                break;
            case "filter":
                this[action](detail);
                break;
            default:
                this.showMessage("Action could not be found");
                break;
        }
    },
    add: function () {
        var note = this.model.getEmptyNote();
        this.view.renderPage('edit',note);
    },
    edit: function (key) {
        var note = this.model.getNote(key);
/*        if(note.key==="_undefined"){
            note.key = key;
        }*/
        this.view.renderPage('edit',note);
    },
    filter: function(filter) {
        this.list(false,filter);
    },
    sort: function (sort){
        this.list(sort);
    },
    list: function (sortBy,filter) {
        var notesData = this.model.getAllNotes(sortBy,filter);
//        this.view.renderList(this.model.completeProps(notesData));
        // notesData.length
        if(1>Object.keys(notesData).length){
            location.hash = '#add';
        }else {
            this.view.renderPage('list',notesData);
        }
    },
    saveOrCancel: function (doWhat) {
        if('save'=== doWhat){
            var note = this.serializeForm(document.getElementById('note'));
            this.model.setNote(note);
        }else if('delete'=== doWhat){
            var note = this.serializeForm(document.getElementById('note'));
            this.model.deleteNote(note);
        }
        location.hash = "#list";
    },
    showMessage: function (string) {
        this.view.renderError(string)
    },
    setStyle: function (e) {

        var style = e.target.value,
            cssFile,
            cssLinkIndex = 0;

        if('fancy'===style){
            cssFile = './css/fee_p1_2.css';
        }else{
            cssFile = './css/fee_p1.css';
        }

        var oldlink = document.getElementsByTagName("link").item(cssLinkIndex);

        var newlink = document.createElement("link");
        newlink.setAttribute("rel", "stylesheet");
        newlink.setAttribute("type", "text/css");
        newlink.setAttribute("href", cssFile);

        document.getElementsByTagName("head").item(0).replaceChild(newlink, oldlink);
    },
    setImportance: function (newimp) {
        var newImp = newimp,
            oldImp = document.getElementById('importance').value;
        if(oldImp===newImp){
            newImp -=1;
        }
        document.getElementById('importance').value=newImp;
        this.view.renderImportance(newImp);
        console.log(newImp);
    },
    setFinished: function (e) {
        console.log(e.target.id);
        if(e.target.type === 'checkbox'){
            var date='';
            if(e.target.checked===true){
                date = utils.getDate('',true);
            }
            if(-1<e.target.id.indexOf('_')) {
                var id = e.target.id.split('_')[1];
                this.model.setFinished(id, date);
            }
            this.view.renderFinishedOn(e.target.id,date);
        }else if(e.target.type === 'date'){
  //          console.log('setfin - date')
            var newDate = e.target.value;
            if(newDate){
                this.view.renderFinished(true);
            }else{
                this.view.renderFinished(false);
            }
        }
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
            "created": created,
            "finished": formElement.elements["finished"].checked,
            "finishedOn": formElement.elements["finishedOn"].value,
            "key": key
        };

        return note;
    }
}