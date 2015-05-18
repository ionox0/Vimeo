'use strict';

/*
Item view for individual video in video-list-view
*/
module.exports = function VideoListItemView(model, EventDelegator){

  var thiz = this;
  this.EventDelegator = EventDelegator;
  this.region = '#video-list-region';
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
    $(this.region).append(this.template(this.model));
    $(this.selector)
      .css('background-image', 'url(' + this.model.thumbnail_medium + ')');

    $(this.selector).on('click', function(e){
      EventDelegator.trigger('show:video', thiz.model);
      e.preventDefault();
      return false;
    });
  };

  this.initialize();

};
