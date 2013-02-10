// define(["jQuery", "Underscore", "Backbone"], function($, _, Backbone) {
// return Backbone.View.extend({
//
// event_aggregator : _.extend({}, Backbone.Events),
//
// initialize : function(){
// GlobalsManager.set("event_aggregator", this.event_aggregator)
// }
// });
// });

/*
 * A view which will be inherited by all the child views
 * Should contain generic methods which should be available for all the views
 */

define(["jQuery", "Underscore", "Backbone", "EventAggregator"], function($, _, Backbone, EventAggregator) {
	var BackboneView = function(options) {
		//this.event_aggregator = this.event_aggregator || _.extend({}, Backbone.Events);
		this.event_aggregator = EventAggregator;
		
		var loader = function(params) {
			var overlay = $("<div>");
			overlay.attr("id", "external_overlay").addClass("modal-backdrop");
			overlay.html("<span id='ajax_loader'></span>");
			
			console.log("----------------loader executed");
			
			if (!!params && params.hide) {
				setTimeout(function() {
					$("#external_overlay").remove();	
				}, 300);
			}	else {
				if (!$("#external_overlay").length > 0) {
					$("body").append(overlay);
				}
			}
		};
		
		this.event_aggregator.off("loader");		
		this.event_aggregator.on("loader", loader, this);

		Backbone.View.apply(this, [options]);
	};

	_.extend(BackboneView.prototype, Backbone.View.prototype, {
		// put all of Panel's methods here. For example:
		sayHi : function() {
			console.log('hello from Pannel');
		}
	});

	BackboneView.extend = Backbone.View.extend;

	return BackboneView;
});
