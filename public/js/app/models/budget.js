/*
 * Budget model to store current month's budget information
 */

define(["jQuery", "Underscore", "Backbone"], function($, _, Backbone) {
	return Backbone.Model.extend({
		url : "/current_month_budget",
		
		initialize : function(){
			
		},
		
		// define all budget model validations here
		validation : {
			next_month_owner : function(value) {
				if (value === "Next Month Owner") {
					return "Select Next Month Ownere";
				}
			},
			next_month_cash : [{
				required : true,
				msg : "Enter Next Month Cash"
			}, {
				pattern : "number",
				msg : "Next Month Cash ain't proper"
			}],
			next_month_sodexo : [{
				required : true,
				msg : "Enter Next Month Sodexo"
			}, {
				pattern : "number",
				msg : "Next Month Sodexo ain't proper"
			}]
		}
	})
});
