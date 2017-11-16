
import utils from "../utils/utils.js"

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
        html += '<span class="inactive" data-action="setImportance" data-hide="true" data-key="'+index+'"></span>';
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
    var finishedOn = utils.makeDateHandy(finOn);
    var html = '';
    if (finishedOn){
        html = ' '+ finishedOn + ' ';
    }else{
        html = ' - '
    }
    return html;
});

export default {};