

let restClient = (function () {


    function getTemplate (page,saveTo,renderTo,content) {
        asyncRequest("GET",'public/hbs/'+page+'.hbs',null,(function (template) {
            var compiledTemplate = Handlebars.compile(template);
            saveTo[page] = compiledTemplate;
            renderTo.innerHTML = compiledTemplate(content);
        }));
    }

    function getNotes() {
        asyncRequest("GET",'notes')
    }

    function createNote(note){

    }


    return {
        getTemplate,
        getNotes,
    }


}());