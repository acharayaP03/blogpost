const moment = require('moment');

module.exports = {
    formateDate : function(date, formate){
        return moment(date).format(formate);
    },
    truncate: function (str, len) {
        if (str.length > len && str.length > 0) {
          let new_str = str + ' '
          new_str = str.substr(0, len)
          new_str = str.substr(0, new_str.lastIndexOf(' '))
          new_str = new_str.length > 0 ? new_str : str.substr(0, len)
          return new_str + '...'
        }
        return str
      },
    stripTags: function (input) {
        return input.replace(/&nbsp;|<(?:.|\n)*?>/ig, ' ')
    },
    stripNBSP: function(input){
      return input.replace(/&nbsp;/ig, " ");
    },
    getAllblogs: function(blogUser, loggedUser, blogId){
      if( blogUser._id.toString() === loggedUser._id.toString()){
        return blogId;
      }
    },
    select: function (selected, options) {
      return options
        .fn(this)
        .replace(
          new RegExp(' value="' + selected + '"'),
          '$& selected="selected"'
        )
        .replace(
          new RegExp('>' + selected + '</option>'),
          ' selected="selected"$&'
        )
    },
}