'use strict';

/*
The main view of the currently selected video
*/
module.exports = function VideoTheaterView(model, eventDelegator){

  var thiz = this;
  this.parentEl = '#video-theater';
  this.template = JST['video-theater-view'];
  this.eventDelegator = eventDelegator;
  eventDelegator.registerListener('showVideo', function(video){
    thiz.showVideo(video);
  });

  /*
  Initialize function
  */
  this.initialize = function(model){
    this.model = model;
    this.selector = '[data-id=' + this.model.id + '-theater]';
  };

  /*
  Render function
  */
  this.render = function(){
    $(this.parentEl).html(this.template(this.model));
    $(this.selector)
      .css('background-image', 'url(' + this.model.thumbnail_large + ')');
  };

  /*
  Triggered from EventDelegator
  Reinitialize and rerender
  */
  this.showVideo = function(model){
    this.initialize(model);
    this.render();
  };

  this.initialize(model);

};
