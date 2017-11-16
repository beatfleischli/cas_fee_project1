import request from "../utils/requests.js"



class RestClient {


    getTemplate (page,callback) {
        request.asyncRequest("GET",'public/hbs/'+page+'.hbs',null,callback);
    }

    getNotes(callback) {
        request.asyncRequest("GET",'/notes','',callback);
    }

    createNote(note,callback){
        request.asyncRequest("POST",'/notes',JSON.stringify(note),callback);
    }

    updateNote(note,callback){
        request.asyncRequest("POST",`/notes/${note['_id']}`,JSON.stringify(note),callback);
    }

    deleteNote(note,callback){
        request.asyncRequest("DELETE",`/notes/${note['_id']}`,'',callback);
    }


}

export default new RestClient();