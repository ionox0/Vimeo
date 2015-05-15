'use strict';

/*
EventDelegator for view/module communication
*/
module.exports = function EventDelegator(){

  this.events = {};

  this.registerListener = function(event, trigger){
    this.events.event = trigger;
  };


  this.trigger = function(event, data){
    this.events.event(data);
  };

};
