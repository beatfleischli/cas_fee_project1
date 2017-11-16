'use strict'
import model from "./notesModel.js"
import view from "./notesView.js"
import utils from "../utils/utils.js"

;(function (ns) {
    ns.defaultHash = '#list';
    let asideEl = null;
    let mainEl = null;

    ns.eventClick = function (e) {
        let butClass = e.target.classList[0],
            butKey = e.target.dataset.key,
            action = e.target.dataset.action,
            hide = e.target.dataset.hide || false,
            newHash = '';

        if(action){
            if(hide) {
                notesController[action](butKey);
            }else if('_r'===location.hash.slice(-2)){
                location.hash = notesController.defaultHash;
            }else {
                let arg = '';
                if (butKey) {
                    arg = "_" + butKey;
                }
                newHash = "#" + action + arg;
                if(location.hash === newHash){
                    location.hash = newHash + '_r';
                }else {
                    location.hash = newHash;
                }
            }
        }
    }

    ns.eventChange = function (e) {
        let butClass = e.target.classList[0],
            butNewVal = e.target.value,
            change = e.target.dataset.change;

        if(change) {
            notesController[change](e);
        }
    }

    ns.dispatch = function () {
        let params = location.hash.substr(1).split('_');
        let action = params[0];
        let detail = params[1];
        let extra = params[2];

        if (action && ns.hasOwnProperty(action)) {
            ns[action](detail, extra);
        }else{
            ns.showMessage("Action could not be found");
        }
    }

    ns.add = function () {
        let note = model.constructor.getEmptyNote();
//        model.getEmptyNote
        view.renderPage('edit',note);
    }

    ns.edit = function (key) {
        model.getNote(key,function (note) {
            view.renderPage('edit',note);
        });
    }

    ns.filter = function (filter,reverse) {
        if (reverse) {
            ns.list('', filter, false);
        }else{
            ns.list('', filter, true);
        }
    }

    ns.sort = function (sort,reverse) {
        ns.list(sort, '', reverse);
    }

    ns.list = function (sortBy,filter,reverse) {
        model.getAllNotes(sortBy,filter,reverse,(function(notesData){
            if((1>Object.keys(notesData).length)&&(!filter)){
                location.hash = '#add';
            }else {
                view.renderPage('list',notesData);
            }
        }).bind(this));
    }

    ns.saveOrCancel = function (doWhat) {
        if('save'=== doWhat){
            let note = ns.serializeForm(document.getElementById('note'));
            model.setNote(note,function(){
                location.hash = "#list";
            });
        }else if('delete'=== doWhat){
            let note = ns.serializeForm(document.getElementById('note'));
            model.deleteNote(note,function(){
                location.hash = "#list";
            });
        }else{
            location.hash = "#list";
        }
    }

    ns.showMessage = function (string) {
        view.renderError(string)
    }

    ns.setStyle = function (e) {

        let style = e.target.value,
            cssFile,
            cssLinkIndex = 0;

        if('fancy'===style){
            cssFile = './public/css/fee_p1_2.css';
        }else{
            cssFile = './public/css/fee_p1.css';
        }

        let oldlink = document.getElementsByTagName("link").item(cssLinkIndex);

        let newlink = document.createElement("link");
        newlink.setAttribute("rel", "stylesheet");
        newlink.setAttribute("type", "text/css");
        newlink.setAttribute("href", cssFile);

        document.getElementsByTagName("head").item(0).replaceChild(newlink, oldlink);
    }

    ns.setImportance = function (newimp) {
        if((location.hash.substr(0,location.hash.indexOf('_')) === "#edit")||(location.hash==="#add")){
            let newImp = newimp,
                oldImp = document.getElementById('importance').value;
            if(oldImp===newImp){
                newImp -=1;
            }
            document.getElementById('importance').value=newImp;
            view.renderImportance(newImp);
        }
    }

    ns.setFinished = function (e) {
        if(e.target.type === 'checkbox'){
            let date='';
            if(e.target.checked===true){
                date = utils.getDate('',true);
 //               let dateHandy = utils.makeDateHandy(date);
            }
            if(0<e.target.id.indexOf('_')) {
                let id = e.target.id.split('_')[1];
                model.setFinished(id, date,(function () {
                    if(date)date=utils.makeDateHandy(date);
                    view.renderFinishedOn(e.target.id,date);
                }).bind(this));
            }else{
                let oldDate = document.getElementById('finishedOn').value;
                if (utils.isValidDate(oldDate)) {
                    view.renderFinishedOn(e.target.id,oldDate);
                }else {
                    view.renderFinishedOn(e.target.id, date);
                }
            }

        }else if(e.target.type === 'date'){
            let newDate = e.target.value;
            if(newDate){
                view.renderFinished(true);
            }else{
                view.renderFinished(false);
            }
        }
    }

    ns.serializeForm = function (formElement) {
        let id = formElement.elements["_id"].value || undefined,
            created = formElement.elements["created"].value || new Date(),
            state = formElement.elements["state"].value || "OK",
        note = {
            "caption": formElement.elements["caption"].value,
            "description": formElement.elements["description"].value,
            "summary": formElement.elements["description"].value.substr(0, 15) + '...',
            "importance": formElement.elements["importance"].value,
            "due": formElement.elements["due"].value,
            "created": created,
            "finished": formElement.elements["finished"].checked,
            "finishedOn": formElement.elements["finishedOn"].value,
            "state": state,
            "_id": id
        };

        return note;
    }


    ns.bootstrap = function () {
        asideEl = document.getElementById('aside')
        mainEl =  document.getElementById('main')
        view.out = mainEl;
        if(!location.hash ) location.hash = ns.defaultHash;
        asideEl.addEventListener('click',ns.eventClick);
        asideEl.addEventListener('change',ns.eventChange);
        mainEl.addEventListener('click',ns.eventClick);
        mainEl.addEventListener('change',ns.eventChange);
        window.addEventListener("hashchange",ns.dispatch);

        ns.dispatch();
    }

})(window.notesController = window.notesController || {});