function save(){
//    alert('Hello');
    var noteString = $('#note').serializeArray();
 //   var key =
    var indexed_array = {};

    $.map(noteString, function(n, i){
        indexed_array[n['name']] = n['value'];
    });
    console.log(JSON.stringify(indexed_array));
    alert(indexed_array);
}

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