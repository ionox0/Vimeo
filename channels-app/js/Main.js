'use strict';

require('es6-promise').polyfill();

$(document).ready(function(){

  var location = window.location.href.split('\/');
  var channel = location[location.length - 1].replace('#', '');

  window.VimeoChannelsApp.start(channel);

});




