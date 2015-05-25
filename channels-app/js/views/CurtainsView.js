'use strict';

/*
Curtains
*/
module.exports = function CurtainsView(EventDelegator){

	var thiz = this;
	this.rightSelector = $('[class^=curtain-right');
	this.leftSelector = $('[class^=curtain-left');
  this.region = '#video-theater-region';
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
  Reinitialize and rerender
  */
  this.openCurtains = function(){
    this.leftSelector
    .css('left', '-8%')
    .css('width', '10%')
    .css('border-radius', '1000px/1200px');

    this.rightSelector
    .css('right', '-8%')
    .css('width', '10%')
    .css('border-radius', '1000px/1200px');
  };

};