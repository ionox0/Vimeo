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
    debugger;
    $(this.leftSelector)
    .css('left', '-8%')
    .css('width', '7%')
    .css('border-radius', '0px 0px 1000px/1200px 0px');

    $(this.rightSelector)
    .css('right', '-8%')
    .css('width', '7%')
    .css('border-radius', '0px 0px 0px 1000px/1200px');
  };

};