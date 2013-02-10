/*
 * A view to represent individual expense item
 */

define(["jQuery", "Underscore", "BackboneView", "EditExpenseView", "text!app/templates/expense_item.jst"], function($, _, BackboneView, EditExpenseView, ExpenseItemTemplate) {
	return BackboneView.extend({
		tagName : "tr",

		events : {
			"click .edit-button" : "edit_expense"
		},

		initialize : function() {
			_.bindAll(this, "render", "close", "edit_expense", "render1", "close_modal");
			
			// bind events on event aggregator to be triggered from outside the view
			this.event_aggregator.on("destroy:expense_items", this.close, this);
			this.event_aggregator.on("close:modal", this.close_modal, this);
			
			this.template = Handlebars.compile(ExpenseItemTemplate);
			this.render();
		},

		render : function() {
			this.$el.html(this.template(this.model.toJSON()));
			
			this.$(".edit-button").tooltip();
			
			return this;
		},

		render1 : function() {
			this.$el.html(this.template(this.model.toJSON()));
			this.$el.addClass("info").delay(1000).queue(function(next) {
				$(this).removeClass("info", 1500);
				next();
			});
			
			this.$(".edit-button").tooltip();
			
		},

		// a method to popup the modal for the expense to be in the edit view
		edit_expense : function(event) {
			
			// display loader
			GlobalsManager.event_aggregator.trigger("loader");
			
			// modal is triggered based on the attributes, no javascript is written for that
			
			var $target = $(event.currentTarget);
			
			// get the modal from the current target's data-target attribute
			var modal = $target.attr("data-target");

			// initialize the view to be displayed in the modal
			var edit_expense_view = new EditExpenseView({
				model : this.model
			});

			var _view = this;

			// bind the hidden event of the modal, which closes the view which is rendered inside the modal
			this.$(modal).bind("hidden", function(evt) {
				edit_expense_view.close();
				_view.render1();
			});
			
			// set the html of the modal with the one to be displayed
			this.$(modal).html(edit_expense_view.render().$el);
			
			// hide loader
			GlobalsManager.event_aggregator.trigger("loader", {
				hide: true
			});

		},

		// a method to close the twitter bootstrap modal
		close_modal : function(data) {
			var modal = "#modal_" + data["model_id"];
			this.$(modal).modal("hide");
		},

		// a method to close the view, removes html, unbinds all the events
		close : function() {
			this.remove();
			this.off();
			this.model.off(null, null, this);
			this.event_aggregator.off(null, null, this);
		}
	});
});
