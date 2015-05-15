'use strict';

var VideoListItemView = require('./VideoListItemView');

/*
Navigation list view for videos in the requested channel
TODO: Common base Views class
*/
module.exports = function VideoListView(collection, eventDelegator){

  this.initialize = function(){
    var thiz = this;
    this.eventDelegator = eventDelegator;
    this.collection = collection;
    this.el = '#video-list-view';
    this.template = JST['video-list-view'];
    this.itemViews = [];
    _.each(this.collection.models, function(model){
      var videoListItemView = new VideoListItemView(model, eventDelegator);
      thiz.itemViews.push(videoListItemView);
    });
  };

  /*
  Render itemView children
  */
  this.render = function(){
    _.each(this.itemViews, function(itemView){ itemView.render(); });
  };

  this.initialize();

};
