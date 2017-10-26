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
                if('#list'!==location.hash) {
                    notesController.setImportance(e);
                }
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
            case "setfin":
                this.setFinished(e,butNewVal);
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
        this.view.renderPage('edit',note);
    },
    editNote: function (key) {
        var note = this.model.getNote(key);
        this.view.renderPage('edit',note);
    },
    listNotes: function (sortBy,filter) {
        var notesData = this.model.getAllNotes(sortBy,filter);
//        this.view.renderList(this.model.completeProps(notesData));
        if(1>notesData.length){
            location.hash = '#new';
        }else {
            this.view.renderPage('list',notesData);
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
    setStyle: function (style) {

        var cssFile,
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
    setImportance: function (e) {
        var newimp = e.target.dataset.index;
        document.getElementById('importance').value=newimp;
        this.view.renderImportance(newimp);
        console.log(newimp);
    },
    setFinished: function (e,newDate) {
        console.log(e.target.id);
        if(e.target.type === 'checkbox'){
            var date='';
            if(e.target.checked===true){
                date = this.getDate('',true);
            }
            if(-1<e.target.id.indexOf('_')) {
                var id = e.target.id.split('_')[1];
                this.model.setFinished(id, date);
            }
            this.view.renderFinishedOn(e.target.id,date);
        }else if(e.target.type === 'date'){
  //          console.log('setfin - date')
            if(newDate){
                this.view.renderFinished(true);
            }else{
                this.view.renderFinished(false);
            }
        }
    },
    getDate: function (delta,reverse) {
        var delta = delta || 0;
        var newDate = new Date(Date.now()+delta*1000*3600*24);
        var dd = ("0"+newDate.getDate()).slice(-2);
        var mm = ("0"+(newDate.getMonth()+1)).slice(-2);
        var yyyy = newDate.getFullYear();

        if(reverse){
            return yyyy+'-'+mm+'-'+dd;
        }else{
            return dd+'/'+mm+'/'+yyyy;
        }
    }
}