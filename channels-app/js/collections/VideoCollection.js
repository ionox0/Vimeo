'use strict';

var Video = require('../models/VideoModel');
var utils = require('../utils/Utils');

/*
Collection of videos for the selected channel
*/
module.exports = function VideoCollection(channel){

  this.models = [];
  this.channel = channel;
  this.baseUrl = 'https://vimeo.com/api/v2/channel/';
  this.videosUrl = this.baseUrl + this.channel + '/videos.json';

  /*
  Fetch video data from api
  @return promise
  */
  this.fetch = function(callback){
    this.callback = callback;
    var thiz = this;
    utils.sendXhrReturnPromise('GET', this.videosUrl)
      .then(
        function(data){
          thiz.addModels(data);
          thiz.callback();
        },
        function(error){console.log(error);
      });
  };

  /*
  Iterate through json from api and set model's properties
  */
  this.addModels = function(apiData){
    var thiz = this;
    _.each(apiData, function(videoData){
      var video = new Video();
      video.setData(videoData);
      thiz.models.push(video);
    });
  };

};
