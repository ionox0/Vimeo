'use strict';

var EventDelegator = require('./utils/EventDelegator');
var VideoCollection = require('./collections/VideoCollection');
var VideoChannel = require('./models/VideoChannel');
var VideoListView = require('./views/VideoListView');
var videoInfoPaneView = require('./views/VideoInfoPaneView');
var VideoTheaterView = require('./views/VideoTheaterView');
var CurtainsView = require('./views/CurtainsView');

/*
The brain and main controller
*/
window.VimeoChannelsApp = (function(){

  var app = {

    /*
    Called on document.ready by main.js
    Initializes ListView and SlideshowView
    */
    start: function(channel){
      var thiz = this;
      this.eventDelegator = new EventDelegator();

      this.curtainsView = new CurtainsView(this.eventDelegator);
      this.curtainsView.render();

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
        thiz.videoInfoPaneView = new videoInfoPaneView(thiz.videoCollection.models[0], thiz.eventDelegator);
        thiz.videoTheaterView = new VideoTheaterView(thiz.videoCollection.models[0], thiz.eventDelegator);
        thiz.videoListView.render();
      });
    }

  };

  return app;

})();
