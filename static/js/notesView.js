'useStrict'

const notesView = {
    noteTemplates: [],
    loadTemplate: function (path,callback) {
        var request = new XMLHttpRequest();

        request.onload = function () {
            callback(request.responseText);
        };

        request.open("GET",path);
        request.send(null);
    },
    renderList: function (notesList) {
        notesTemplateText=$('#notesListTemplate').html();
        createNotesHtml = Handlebars.compile (notesTemplateText);
        this.out.innerHTML = createNotesHtml(notesList);
    },
    renderPage: function (page,content) {
        if(this.noteTemplates[page]){
            this.renderTemplate(this.noteTemplates[page],content);
  //          this.setOnsubmit('note','off');
        }else{
            this.loadTemplate('hbs/'+page+'.hbs',(function (template) {
                this.noteTemplates[page] = template;
                this.renderTemplate(template,content);
  //              this.setOnsubmit('note','off');
            }).bind(this));
        }
    },
    renderTemplate: function (template,content) {
        createNoteHtml = Handlebars.compile (template);
        this.out.innerHTML = createNoteHtml(content);
    },
    renderError: function (message) {
        this.out.innerHTML = message || "Sorry, we couldn't understand your request!"
    },
    renderImportance: function (importance) {
        var html = this.getHtmlImportance(importance),
            element = document.getElementsByClassName("importance")[0];
        element.innerHTML=html;
    },
    renderFinished: function (checked) {
        document.getElementById('finished').checked = checked;
    },
    renderFinishedOn: function (elId,newDate) {
        if("finished"===elId) {
            var date = document.getElementById('finishedOn').value;
            if (!this.isValidDate(date)) {
                document.getElementById('finishedOn').value = newDate;
            }
        }else{
            var date = newDate || '-';
            document.querySelectorAll('[for="'+elId+'"]')[0].innerHTML = "Finished ["+ date + "]";
     //       document.getElementById(elId).innerHTML = "Finished ["+ newDate + "]";
        }
    },
    getHtmlImportance: function (importance) {
        var active = parseInt(importance);
        var inactive = 5 - active;
        var html = '';
        var index = 1;
        while (active--) {
            html += '<span class="setimp active" data-index="'+index+'"></span>';
            index ++;
        }
        while (inactive--) {
            html += '<span class="setimp" data-index="'+index+'"></span>';
            index ++;
        }
        return html;
    },
    setOnsubmit: function (formId,onOff) {
        var form = document.getElementById(formId);
        form.onsubmit = function(){
            if('on'===onOff) {
                return true;
            }else{
                return false;
            }
        }
    },
    isValidDate: function (date) {
        var p = date.split('/');
        var d = new Date(p[2], p[1] - 1, p[0]);
        return d && ((d.getMonth() + 1) === p[1]) && (d.getYear()===p[0]);
    },
    init: function () {
/*        Handlebars.registerHelper('renderImportance', function (importance) {
            var active = parseInt(importance);
            var inactive = 5 - active;
            var html = '';
            var index = 1;
            while (active--) {
                html += '<span class="setimp active" data-index="'+index+'"></span>';
                index ++;
            }
            while (inactive--) {
                html += '<span class="setimp" data-index="'+index+'"></span>';
                index ++;
            }
            return html;
        });*/

        Handlebars.registerHelper('renderImportance', this.getHtmlImportance);
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