'use strict';

/*
The main view of the currently selected video
*/
module.exports = function VideoTheaterView(model, EventDelegator){

  var thiz = this;
  this.region = '#video-theater-region';
  this.template = JST['video-theater-view'];

  /*
  Initialize function
  */
  this.initialize = function(model){
    this.model = model;
    EventDelegator.registerListener('show:video', function(video){
      thiz.showVideo(video);
    });
  };

  /*
  Render function
  */
  this.render = function(){
    $(this.region).html(this.template(this.model));
  };

  /*
  Triggered from EventDelegator
  Reinitialize and rerender
  */
  this.showVideo = function(model){
    this.model = model;
    this.render();
  };

  this.initialize(model);

};
