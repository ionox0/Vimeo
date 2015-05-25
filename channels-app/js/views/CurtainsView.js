'use strict';

/*
Curtains
*/
module.exports = function CurtainsView(EventDelegator){

	var thiz = this;
  this.region = '#curtains-region';
	this.rightSelector = '[class^=curtain-right]';
	this.leftSelector = '[class^=curtain-left]';
  this.template = JST['curtains-view'];

  /*
  Initialize function
  */
  this.initialize = (function(model){
    EventDelegator.registerListener('show:video', function(){
      thiz.openCurtains();
    });
  })();

  /*
  Render function
  */
  this.render = function(){
    $(this.region).html(this.template(this.model));
  };

  /*
  Triggered from EventDelegator
  */
  this.openCurtains = function(){
    $(this.leftSelector).addClass('open');
    $(this.rightSelector).addClass('open');
  };

};