/*
 * Collection to store all expenses
 */
define(["jQuery", "Underscore", "Backbone", "ExpenseModel"], function($, _, Backbone, ExpenseModel) {
	return Backbone.Collection.extend({
		
		model : ExpenseModel,
		
		url : function(){
			return "/expenses"			
		},
		
		initialize : function(){
			
		},
		
		parse : function(response){
			return response;
		}
	});
});
