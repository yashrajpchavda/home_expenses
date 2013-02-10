/*
 * App Router to handle the routes globally
 */

// TODO : Fix to make it work with change in locationbar selects appropriate menu

define(["jQuery", "Underscore", "Backbone"], function($, _, Backbone) {
	return Backbone.Router.extend({
		routes : {
			"status" : "month_expense_status",
			"add" : "new_expense",
			"expenses" : "all_expenses",
			"log_out" : "log_out"
		},

		// a route to be triggered when status menu is selected
		month_expense_status : function() {
			console.log("status");
			//$("#app_content").empty();
			
			// display loader
			GlobalsManager.event_aggregator.trigger("loader");
			
			GlobalsManager.event_aggregator.trigger("close:state");
			require(["ExpenseStatusView", "BudgetModel"], function(ExpenseStatusView, BudgetModel) {
				var budget_model = new BudgetModel();
				var expense_status_view = new ExpenseStatusView({
					model : budget_model
				});
			});
		},

		// a route to be triggered when new expense is selected
		new_expense : function() {
			console.log("new");
			//$("#app_content").empty();
			
			// display loader
			GlobalsManager.event_aggregator.trigger("loader");
			
			GlobalsManager.event_aggregator.trigger("close:state");
			require(["NewExpenseView", "ExpenseModel"], function(NewExpenseView, ExpenseModel) {
				var expense_model = new ExpenseModel();
				var new_expense_view = new NewExpenseView({
					model : expense_model
				});
			});
		},

		// a route to be triggered when update expense is selected
		all_expenses : function() {
			//console.log("update");
			// display loader
			GlobalsManager.event_aggregator.trigger("loader");
			
			GlobalsManager.event_aggregator.trigger("close:state");
			require(["AllExpenses", "ExpensesCollection"], function(AllExpenses, ExpensesCollection) {
				var collection = new ExpensesCollection();
				var all_exspenses_view = new AllExpenses({
					collection : collection
				});
			});
		},
		
		// a route to be triggered when log_out is selected
		log_out : function(){
			var evt_aggr = GlobalsManager.event_aggregator;
			evt_aggr.trigger("close:state");
			evt_aggr.trigger("close:menu");
			
			$.ajax({
				type : "delete",
				url : "/sessions/" + GlobalsManager.get("logged_in_user").get("id")
			}).done(function(){
				require(["LoggedOutView"], function(LoggedOutView) {
					var logged_out_view = new LoggedOutView();
				});
			});
		}
	})
});
