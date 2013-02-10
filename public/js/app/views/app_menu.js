/*
 * A view to render the view
 */


// TODO : Still need to make it work with the default select menu code

define(["jQuery", "Underscore", "BackboneView", "Handlebars", "text!app/templates/app_menu.jst"], function($, _, BackboneView, Handlebars, MenuTemplate) {
	return BackboneView.extend({
		el : "#navigation",

		events : {
			"click a.menu-a" : "menu_click"
		},

		initialize : function() {
			_.bindAll(this, "render", "menu_click", "select", "close");
			this.template = Handlebars.compile(MenuTemplate);
			this.event_aggregator.on("select:menu", this.select);
			this.event_aggregator.on("close:menu", this.close);
			this.render();
		},

		render : function() {
			// the tabs to be available in the menu
			// # TODO : fetch the tabs from the server or pass them with the current user
			var tabs = [{
				href : "#status",
				title : "Status",
				selected : "true"
			}, {
				href : "#add",
				title : "Add"
			}, {
				href : "#expenses",
				title : "Expenses"
			}];
			this.$el.html(this.template({
				tabs : tabs,
				user : GlobalsManager.get("logged_in_user").get("username")
			}));
			this.setElement("#app_menu");
			return this;
		},

		// a method which takes care of adding the active class to the li to have proper css
		menu_click : function(event) {
			this.$("ul.nav li.active").removeClass("active");
			var $anchor = $(event.currentTarget);
			var $li = $anchor.parent("li");
			$li.addClass("active");
		},

		// a method to select the tab
		select : function(obj) {
			console.log("select fired " + obj.link);
			this.$("ul.nav li.active").removeClass("active");
			var $all_a = this.$("ul.nav a.menu-a");
			var self = this;
			$all_a.each(function(index, element) {
				var $elem = $(element);
				if ($elem.attr("href") === "#" + obj.link) {
					$elem.parent("li").addClass("active");
					return false;
				}
			});
		},

		// a method to close the view, removes the html, unbind all the events
		close : function() {
			console.log("menu close");
			this.remove();
			this.off();
			this.event_aggregator.off(null, null, this);
		}
	});
});
