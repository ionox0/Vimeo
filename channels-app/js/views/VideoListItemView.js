'use strict';

/*
Item view for individual video in video-list-view
*/
module.exports = function VideoListItemView(model, eventDelegator){

  this.eventDelegator = eventDelegator;
  this.parentEl = '#video-list-view';
  this.template = JST['video-list-item-view'];

  /*
  Initialize function
  */
  this.initialize = function(){
    this.model = model;
    this.id = this.model.id;
    this.selector = '[data-id=' + this.id + ']';
  };

  /*
  Render function
  */
  this.render = function(){
    var thiz = this;
    $(this.parentEl).append(this.template(this.model));
    $(this.selector)
      .css('background-image', 'url(' + this.model.thumbnail_medium + ')');

    //TODO: register listener in initialize()
    $(this.selector).on('click', function(e){
      eventDelegator.trigger('show:video', thiz.model);
      e.preventDefault();
      return false;
    });
  };

  this.initialize();

};
