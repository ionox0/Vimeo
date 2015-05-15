'use strict';

var utils = require('../utils/Utils');

/*
Video model
TODO: Extend models from common base class
*/
module.exports = function VideoModel(){

  var video = {

    thiz: this,

    /*
    Set model's properties
    */
    setData: function(data){
      for (var key in data){
        this[key] = data[key];
      }
    }

  };

  return video;

};
