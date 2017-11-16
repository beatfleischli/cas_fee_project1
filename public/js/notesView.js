import restClient from "../services/restClient.js"
import x from "../utils/handlebarHelpers.js"   // call to register Helpers, x is never used

class NotesViewManager {

    constructor (){
        this.noteTemplates = []
        this.out = null
    }


    renderPage (page,content) {
        if(this.noteTemplates[page]){
            this.out.innerHTML = (this.noteTemplates[page])(content);
        }else{
            restClient.getTemplate(page,(function (template) {
                var compiledTemplate = Handlebars.compile(template);
                this.noteTemplates[page] = compiledTemplate;
                this.out.innerHTML = compiledTemplate(content);
            }).bind(this));
        }
    }
    renderError (message) {
        this.out.innerHTML = message || "Sorry, we couldn't understand your request!"
    }
    renderImportance (importance) {
        var html = Handlebars.helpers.renderImportance.apply(this, [importance]),
            element = document.getElementsByClassName("importance")[0];
        element.innerHTML=html;
    }
    renderFinished (checked) {
        document.getElementById('finished').checked = checked;
    }
    renderFinishedOn (elId,newDate) {
        if("finished"===elId) {
            document.getElementById('finishedOn').value = newDate;
        }else{
            let date = newDate || '-';
            document.querySelectorAll('[for="'+elId+'"]')[0].innerHTML = "Finished ["+ date + "]";
        }
    }
}

export default new NotesViewManager();