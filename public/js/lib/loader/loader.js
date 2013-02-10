define(["order!/js/lib/loader/jquery.js", "order!/js/lib/loader/underscore.js", "order!/js/lib/loader/backbone.js", "order!/js/lib/loader/handlebars.js"], function(){
	return {
		$ : jQuery.noConflict(),
		_ : _.noConflict(),
		Backbone : Backbone.noConflict(),
		Handlebars : Handlebars
	}	
});
