'use strict';

var EventDelegator = require('./utils/EventDelegator');
var SearchView = require('./views/SearchView');
var VideoCollection = require('./collections/VideoCollection');
var VideoChannel = require('./models/VideoChannel');
var VideoListView = require('./views/VideoListView');
var videoInfoPaneView = require('./views/VideoInfoPaneView');
var VideoTheaterView = require('./views/VideoTheaterView');
var CurtainsView = require('./views/CurtainsView');

/*
The brain and main controller
App has two main modes, searchMode and playMode
*/
window.VimeoChannelsApp = (function(){

  var app = {

    route: function(channel){
      if (!channel) {
        this.searchMode();
      } else {
        this.playMode(channel);
      }
    },

    /*
    Called on document.ready by main.js
    Initializes ListView and SlideshowView
    */
    initialize: function(){
      this.eventDelegator = new EventDelegator();
      this.curtainsView = new CurtainsView(this.eventDelegator);
      this.curtainsView.render();
    },

    searchMode: function(){
      this.searchView = new SearchView();
      this.searchView.render();
    },

    playMode: function(channel){
      var thiz = this;
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
