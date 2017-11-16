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

    function makeDateHandy(date){
        var today = new Date(),
            given = date.split('-'),
            y = today.getFullYear(),
            m = today.getMonth()+1,
            d = today.getDate(),
            result='';

        var diff = parseInt(given[0]) - y;

        switch (diff){
            default:
                if(1<diff){
                    result = `In ${diff} years.`
                }else{
                    result = `${diff} years ago.`
                }
                break;
            case -1:
                break;
            case 1:
                break;
            case 0:
                diff = parseInt(given[1] - m);
                switch (diff){

                }
        }

        alert(diff);
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