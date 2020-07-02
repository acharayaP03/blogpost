const moment = require('moment');

module.exports = {
    formateDate : function(date, formate){
        return moment(date).format(formate);
    }
}