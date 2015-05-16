'use strict';

/*
The main view of the currently selected video
*/
module.exports = function VideoTheaterView(model, eventDelegator){

  var thiz = this;
  this.selector = '#video-theater';
  this.template = JST['video-theater-view'];
  eventDelegator.registerListener('show:video', function(video){
    thiz.showVideo(video);
  });

  /*
  Initialize function
  */
  this.initialize = function(model){
    this.model = model;
    //$(this.selector).css({height: $(window).height() - $('#video-list-view').height() - $('#ribbon').height() });
  };

  /*
  Render function
  */
  this.render = function(){
    $(this.selector).html(this.template(this.model));
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
