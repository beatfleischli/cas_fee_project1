'useStrict'

const notesView = {
    noteTempls: [],
    renderList: function (notesList) {
        notesTemplateText=$('#notesListTemplate').html();
        createNotesHtml = Handlebars.compile (notesTemplateText);
        this.out.innerHTML = createNotesHtml(notesList);
    },
    renderEdit: function (note) {
        noteTemplateText=$('#noteEditTemplate').html();
        createNoteHtml = Handlebars.compile (noteTemplateText);
        this.out.innerHTML = createNoteHtml(note);
        this.setOnsubmit('note','off');

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
    renderFinishedOn: function (date) {
        document.getElementById('finishedOn').value = date;
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