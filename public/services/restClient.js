

let restClient = (function () {


    function getTemplate (page,callback) {
        asyncRequest("GET",'public/hbs/'+page+'.hbs',null,callback);
    }

    function getNotes(callback) {
        asyncRequest("GET",'/notes','',callback);
    }

    function createNote(note,callback){
        asyncRequest("POST",'/notes',JSON.stringify(note),callback);
    }

    function updateNote(note,callback){
        asyncRequest("POST",`/notes/${note['_id']}`,JSON.stringify(note),callback);
    }

    function deleteNote(note,callback){
        asyncRequest("DELETE",`/notes/${note['_id']}`,'',callback);
    }


    return {
        getTemplate,
        getNotes,
        createNote,
        updateNote,
        deleteNote
    }


}());