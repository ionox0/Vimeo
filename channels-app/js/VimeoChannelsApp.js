'use strict';

var EventDelegator = require('./utils/EventDelegator');
var VideoCollection = require('./collections/VideoCollection');
var VideoChannel = require('./models/VideoChannel');
var VideoListView = require('./views/VideoListView');
var VideoTheaterView = require('./views/VideoTheaterView');

/*
The brain and main controller
*/
window.VimeoChannelsApp = (function(){

  var app = {

    /*
    Called on document.ready by main.js
    Initializes ListView and SlideshowView
    TODO: Clean
    */
    start: function(channel){
      var thiz = this;
      this.eventDelegator = new EventDelegator();
      /*
      videoChannel holds the channel metadata
      videoCollection holds the videos metadata
      */
      this.videoCollection = new VideoCollection(channel);
      this.videoChannel = new VideoChannel(channel);
      thiz.videoChannel.fetch();
      this.videoChannel.collection = this.videoCollection;
      this.videoCollection.fetch(function(){
        thiz.videoListView = new VideoListView(thiz.videoCollection, thiz.eventDelegator);
        thiz.videoTheaterView = new VideoTheaterView(thiz.videoCollection.models[0], thiz.eventDelegator);
        thiz.videoListView.render();
        thiz.videoTheaterView.render();
      });
    }

  };

  return app;

})();
