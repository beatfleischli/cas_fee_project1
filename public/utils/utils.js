let utils = (function () {

    function isValidDate (date) {
        var p = date.split('/');
        var d = new Date(p[2], p[1] - 1, p[0]);
        return d && ((d.getMonth() + 1) === p[1]) && (d.getYear()===p[0]);
    }

    function getDate(delta,reverse) {
        var delta = delta || 0;
        var newDate = new Date(Date.now()+delta*1000*3600*24);
        var dd = ("0"+newDate.getDate()).slice(-2);
        var mm = ("0"+(newDate.getMonth()+1)).slice(-2);
        var yyyy = newDate.getFullYear();

        if(reverse){
            return yyyy+'-'+mm+'-'+dd;
        }else{
            return dd+'/'+mm+'/'+yyyy;
        }
    }

    function getDayOfWeek(dayNr){
        let day = 'Someday';
        switch (dayNr) {
            case 0:
                day = "Sunday";
                break;
            case 1:
                day = "Monday";
                break;
            case 2:
                day = "Tuesday";
                break;
            case 3:
                day = "Wednesday";
                break;
            case 4:
                day = "Thursday";
                break;
            case 5:
                day = "Friday";
                break;
            case 6:
                day = "Saturday";
        }

        return day;
    }

    function makeDateHandy(date){
        var today = Math.floor ( new Date() /(1000*3600*24)),
            oldDate = new Date(date),
            oldDateNr = oldDate /(1000*3600*24),
            weekDay = '',
            result='';

        var diff = (oldDateNr - today);

        switch (diff){
            case -1:
                result = 'Yesterday';
                break;
            case 1:
                result = 'Tomorrow';
                break;
            case 0:
                result = 'Today';
                break;
            default:
                if((7>diff)&&(1<diff)){
                    result = `Next ${getDayOfWeek(oldDate.getDay())}`
                }else if((-7<diff)&&(-1>diff)){
                    result = `Last ${getDayOfWeek(oldDate.getDay())}`
                }else{
                    result = date;
                }
                break;
        }

        return result;
    }


    function guid () {
        return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
    }

    function s4 () {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    }


    function objectToArray (object) {
        var array = [];
        for(var notes in object){
            array.push(object[notes]);
        }
        return array;
    }


    return {
        //public if to private function
        isValidDate:isValidDate,

        getDate: getDate,

        getNewGuid: guid,

        objectToArray,

        makeDateHandy,

    }

}());

export default utils;