'use strict'

const notesView = {
    noteTemplates: [],

    renderPage: function (page,content) {
        if(this.noteTemplates[page]){
            this.out.innerHTML = (this.noteTemplates[page])(content);
        }else{
            loadTemplate('hbs/'+page+'.hbs',(function (template) {
                var compiledTemplate = Handlebars.compile(template);
                this.noteTemplates[page] = compiledTemplate;
                this.out.innerHTML = compiledTemplate(content);
            }).bind(this));
        }
    },
    renderError: function (message) {
        this.out.innerHTML = message || "Sorry, we couldn't understand your request!"
    },
    renderImportance: function (importance) {
        var html = Handlebars.helpers.renderImportance.apply(this, [importance]),
            element = document.getElementsByClassName("importance")[0];
        element.innerHTML=html;
    },
    renderFinished: function (checked) {
        document.getElementById('finished').checked = checked;
    },
    renderFinishedOn: function (elId,newDate) {
        if("finished"===elId) {
            var date = document.getElementById('finishedOn').value;
            if (!utils.isValidDate(date)) {
                document.getElementById('finishedOn').value = newDate;
            }
        }else{
            var date = newDate || '-';
            document.querySelectorAll('[for="'+elId+'"]')[0].innerHTML = "Finished ["+ date + "]";
     //       document.getElementById(elId).innerHTML = "Finished ["+ newDate + "]";
        }
    },
    init: function () {

        Handlebars.registerHelper('renderImportance', function (importance) {
            var active = parseInt(importance);
            var inactive = 5 - active;
            var html = '';
            var index = 1;
            while (active--) {
                html += '<span class="active" data-action="setImportance" data-hide="true" data-key="'+index+'"></span>';
                index ++;
            }
            while (inactive--) {
                html += '<span class="" data-action="setImportance" data-hide="true" data-key="'+index+'"></span>';
                index ++;
            }
            return html;
        });
        Handlebars.registerHelper('renderFinished', function (fin) {
            var finished = parseInt(fin);
            var html = '';
            if (fin){
                html = 'checked';
            }
            return html;
        });
        Handlebars.registerHelper('renderFinishedOn', function (finOn) {
            var finishedOn = finOn;
            var html = '';
            if (finishedOn){
                html = ' ['+ finishedOn + ']';
            }else{
                html = ' [-]'
            }
            return html;
        });
    }
}