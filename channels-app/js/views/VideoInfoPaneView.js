'use strict';

var Utils = require('../utils/Utils');

/*
Video info pane view
*/
module.exports = function InfoPaneView(model, EventDelegator){
	
	var thiz = this;
	this.region = '#video-info-pane-region';
	this.EventDelegator = EventDelegator;
	this.template = JST['video-info-pane-view'];

	/*
	Initialize
	*/
	this.initialize = function(model){
		this.model = model;
		EventDelegator.registerListener('show:video', function(video){
      thiz.showVideo(video);
    });
    Utils.setFader(this.region, 5000);
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