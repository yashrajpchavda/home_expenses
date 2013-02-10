/*
 * Expense model to represent each expense in the system
 */

define(["jQuery", "Underscore", "Backbone"], function($, _, Backbone) {
	return Backbone.Model.extend({

		url : function() {
			return "/expenses" + (!!this.id ? ("/" + this.id) : (""));
		},

		initialize : function() {

		},

		// define all expense model validations here
		validation : {
			expense_type : function(value) {
				if (value === "Expense Type") {
					return "Select Expense Type";
				}
			}, 
			description : {
				required : true,
				msg : "Enter Description"
			},
			payment_type : function(value) {
				if (value === "Payment Type") {
					return "Select Payment Type";
				}
			},
			amount : [{
				required : true,
				msg : "Enter Amount"
			}, {
				pattern : "number",
				msg : "Amount ain't proper"
			}],
			paid_date : {
				required : true,
				msg : "Select Paid Date"
			}
		}
	});
});
