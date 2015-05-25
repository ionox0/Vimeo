'use strict';

/*
Singleton for utility methods
*/
module.exports = {

  /*
  Wrap xhr with native Promises/A+ spec promise
  */
  sendXhrReturnPromise: function(method, url){
    var promise = new Promise(function(resolve, reject){
      var request = new XMLHttpRequest();
      request.open(method, url);
      request.onload = function(){
        if (request.status === 200){
          resolve(JSON.parse(request.response));
        } else {
          reject(Error(request.statusText));
        }
      };
      request.send();
    });
    return promise;
  },

  setFader: function(selector, time){
    var thiz = this;
    this.fadeout = null;
    $(window).mousemove(function() {
      clearTimeout(thiz.fadeout);
      thiz.fadeout = setTimeout(hide, time);
      $(selector).fadeIn('slow');
    }); 
    function hide(){
      /*jshint validthis:true */
      $(selector).fadeOut('slow');
      clearTimeout(this.fadeout);
    }
  }

};
