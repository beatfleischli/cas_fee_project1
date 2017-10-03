/*function save(){
    alert('Hello'); exit;
    var noteString = $('#note').serializeArray();
 //   var key =
    var indexed_array = {};

    $.map(noteString, function(n, i){
        indexed_array[n['name']] = n['value'];
    });
//    console.log(JSON.stringify(indexed_array));
    alert(indexed_array);

    return false;
}*/
// alert("Hello");
var page = window.location.href.substr(window.location.href.lastIndexOf('/'));
//alert(window.location.href.substr(window.location.href.lastIndexOf('/')));

function cancel(){

    /*var fieldValuePairs = $('#note').serializeArray();
    $.each(fieldValuePairs, function(index, fieldValuePair) {
        alert("Item " + index + " is [" + fieldValuePair.name + "," + fieldValuePair.value + "]");
    });*/

 /*   var endDate = document.getElementById('until');
    var description = document.getElementById('desc');
    alert(description.value);*/
    // alert('Hello');
    var kvpairs = [];
    var form = document.getElementById('note');
    alert(form.elements);
        for ( var i = 0; i < form.elements.length; i++ ) {
        var e = form.elements[i];
        kvpairs.push(encodeURIComponent(e.name) + "=" + encodeURIComponent(e.value));
    }
    alert(kvpairs.join("\n"));
//    var queryString = kvpairs.join("&");
}

function changeCSS(cssFile, cssLinkIndex) {

    var oldlink = document.getElementsByTagName("link").item(cssLinkIndex);

    var newlink = document.createElement("link");
    newlink.setAttribute("rel", "stylesheet");
    newlink.setAttribute("type", "text/css");
    newlink.setAttribute("href", cssFile);

    document.getElementsByTagName("head").item(0).replaceChild(newlink, oldlink);
}


function guid() {
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
        s4() + '-' + s4() + s4() + s4();
}

function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
}

if('/newNote.html'===page){

note.onsubmit = function(){
 //   alert("Prevent submit");
    return false;
}

/*window.onbeforeunload = function() {
    return false;
};*/

document.getElementById("style").addEventListener("change", function(){
    var style = document.getElementById("style").value;
    if('fancy'===style){
        changeCSS('./css/fee_p1_2.css',0);
    }else{
        changeCSS('./css/fee_p1.css',0);
    }
//    alert(style);
});

document.getElementById("butCancel").addEventListener("click", function(){
    alert(key);
});

document.getElementById("newNote").addEventListener("click", function(){
    sessionStorage.setItem("currentRecord",null);
    location.reload();
});

document.getElementById("butSave").addEventListener("click", function(){

    var noteString = $('#note').serializeArray();
    var noteArray = {};

    $.map(noteString, function(n, i){
        noteArray[n['name']] = n['value'];
    });
    console.log(JSON.stringify(noteArray));

    localStorage.setItem(key,JSON.stringify(noteArray));
});



var key = sessionStorage.getItem("currentRecord");
var record = '';
if(key) {
    record = localStorage.getItem(key);
    sessionStorage.setItem("currentRecord",null);
}else{
    key = guid();
}


if(false){
}

}else{
//    alert('page index');

    $(function () {
        // Grab the template script
        var templateScript = $("#note-template").html();

        // Compile the template
        var templateComp = Handlebars.compile(templateScript);

        // Define our data object
        var notes = '';

        for(var i=0;i<localStorage.length;i++){
            record=localStorage.getItem(localStorage.key(i));
            alert(record);
            notes += templateComp(record);
            alert(notes);
        }

        // Add the compiled html to the page
        $('.main').html(notes);
    });


}