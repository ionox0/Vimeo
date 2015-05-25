'use strict';

/*
SearchView
*/
module.exports = function SearchView(){

  this.region = '#header-region';
	this.selector = '.search-view';
  this.template = JST['search-view'];

  this.initialize = function(){
  	console.log('initialize');
  	$(this.selector).on('submit', function(e){
  		console.log(window.location.host + '/#' + e.currentTarget[0].value);
  		window.location.href = 'http://' + window.location.host + '/#' + e.currentTarget[0].value;
  		window.location.reload();
  		e.preventDefault();
  		return false;
  	});
  };

	/*
  Render function
  */
  this.render = function(){
  	console.log('render');
    $(this.region).html(this.template(this.model));
    this.initialize();
  };

  this.initialize();

};