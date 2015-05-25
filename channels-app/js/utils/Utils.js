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
    var fadeout = null;
    $(window).mousemove(function() {
      if (this.fadeout === null){
        clearTimeout(fadeout);
        fadeout = setTimeout(hide, time);
        $(selector).fadeIn('slow');
      }
    }); 
    function hide(){
      $(selector).fadeOut('slow');
      clearTimeout(fadeout);
    }
  }

};
