/*
 * File contains requirejs paths and a start point for the application.
 */

require.config({
	paths : {
		App : "app/app",
		AppMenu : "app/views/app_menu",
		AppRouter : "app/app_router",
		Backbone : "lib/backbone",
		BackboneValidation : "lib/plugins/backbone/backbone_validation",
		BackboneView : "app/views/backbone.view",
		Bootstrap : "lib/plugins/bootstrap/bootstrap",
		BudgetModel : "app/models/budget",
		EditExpenseView : "app/views/edit_expense",		
		EventAggregator : "lib/plugins/backbone/event_aggregator",
		ExpenseItemView : "app/views/expense_item",
		ExpenseModel : "app/models/expense",
		ExpensesCollection : "app/collections/expenses",
		ExpenseStatusView : "app/views/expense_status",
		ExtraExpenses : "app/collections/extra_expenses",
		GlobalsManager : "lib/plugins/globals_manager",
		Handlebars : "lib/handlebars",
		jQuery : "lib/jquery",
		jQueryUI: "lib/plugins/jquery-ui/jquery-ui-1.9.2.custom",
		Loader : "lib/loader/loader",
		LoggedOutView : "app/views/logged_out",
		LoggedInUserModel : "app/models/logged_in_user",
		NewExpenseView : "app/views/new_expense",
		NotyCenterLayout : "lib/plugins/noty/noty_center_layout",
		NotyDefaultTheme : "lib/plugins/noty/noty_default_theme",
		NotyJquery : "lib/plugins/noty/jquery_noty",
		Underscore : "lib/underscore",
		AllExpenses : "app/views/all_expenses",
		UserModel : "app/models/user"
	},
	waitSeconds: 30
});

/*
 * Require app and start application.
 */

require(["jQuery", "App"], function ($, App) {
	$(document).ready(function() {
		App.init();	
	});
});