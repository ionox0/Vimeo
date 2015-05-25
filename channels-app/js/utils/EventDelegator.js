'use strict';

/*
EventDelegator for view/module communication
*/
module.exports = function EventDelegator(){

  this.events = {};

  this.registerListener = function(event, trigger){
  	this.events[event] ? 
    	this.events[event].push(trigger)
    	: (this.events[event] = [], this.events[event].push(trigger));
  };

  this.trigger = function(event, data){
    _.each(this.events[event], function(trigger){ trigger(data); });
  };

};
