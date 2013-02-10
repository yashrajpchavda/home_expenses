/*
 * An entry point for the application.
 */

define(["AppMenu", "AppRouter", "Backbone"], function(AppMenu, AppRouter, Backbone) {
	var _init = function() {
		// require things to be executed only once here
		require(["LoggedInUserModel", "Bootstrap", "GlobalsManager", "Handlebars", "BackboneValidation", "NotyCenterLayout", "NotyDefaultTheme", "jQueryUI"], function(LoggedInUserModel) {

			// store the current url in globalsmanager to be accessible on the log out page
			GlobalsManager.set("login_url", location.href);

			var logged_in_user = new LoggedInUserModel();

			logged_in_user.fetch({
				success : function(model, response) {
					GlobalsManager.set("logged_in_user", model);
					_start_up();
				},
				error : function(model, response) {
					var n = noty({
						text : response.message,
						type : response.status,
						dismissQueue : true,
						layout : 'center',
						theme : 'defaultTheme'
					});
				}
			});
		});
	}
	var _start_up = function() {
		// initialize the app menu
		var app_menu = new AppMenu({
			selected : "status"
		});

		// initialize the app router
		var app_router = new AppRouter();

		Backbone.history.start();

		// select the default menu
		app_router.navigate("status", {
			trigger : true
		});

	}

	return {
		"init" : _init
	}
});
