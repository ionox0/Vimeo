'use strict';

var utils = require('../utils/Utils');

/*
Video Channel with associated metadata and collection of videos
*/
module.exports = function VideoChannel(channel){

  var thiz = this;
  this.channel = channel;
  this.baseUrl = 'https://vimeo.com/api/v2/channel/';
  this.infoUrl = this.baseUrl + this.channel + '/info.json';

  /*
  Fetch video data from api
  @return promise
  */
  this.fetch = function(){
    return utils.sendXhrReturnPromise('GET', this.infoUrl)
      .then(function(data){thiz.setProperties(data);},
        function(error){console.log(error);});
  };

  /*
  Iterate through json from api and set model's properties
  */
  this.setProperties = function(apiData){
    for (var key in apiData){
      this[key] = apiData[key];
    }
  };

};
