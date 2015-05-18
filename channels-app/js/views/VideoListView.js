'use strict';

var VideoListItemView = require('./VideoListItemView');

/*
Navigation list view for videos in the requested channel
TODO: Common base Views class
*/
module.exports = function VideoListView(collection, EventDelegator){

  this.initialize = function(){
    var thiz = this;
    this.collection = collection;
    this.template = JST['video-list-view'];
    this.children = [];
    _.each(this.collection.models, function(model){
      var videoListItemView = new VideoListItemView(model, EventDelegator);
      thiz.children.push(videoListItemView);
    });
  };

  /*
  Render itemView children
  */
  this.render = function(){
    _.each(this.children, function(itemView){ itemView.render(); });
  };

  this.initialize();

};
