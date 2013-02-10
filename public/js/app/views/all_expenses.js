/*
 * A view to display all expenses
 */

define(["jQuery", "Underscore", "BackboneView", "ExpenseItemView", "text!app/templates/all_expenses.jst"], function($, _, BackboneView, ExpenseItemView, AllExpensesTemplate) {
	return BackboneView.extend({
		el : "#app_content",

		events : {

		},

		initialize : function() {
			_.bindAll(this, "close", "add_all", "add_one");
			
			// compile template
			this.template = Handlebars.compile(AllExpensesTemplate);
			
			// bind collection reset event to add all the models' html in the dom
			this.collection.on("reset", this.add_all, this);
			
			// bind close of the view to be triggered
			this.event_aggregator.on("close:state", this.close, this);
			
			this.$el.html(this.template());
			this.setElement("#update_expense");

			var dt = new Date();

			// fetch the collection, pass month as a parameter to get only current month's expense
			// # TODO : Change server code to return only current month's expenses
			this.collection.fetch();
		},

		// a method which will iterate through collection and adds models' html in the el
		add_all : function() {
			var $this = this;

			this.collection.each(function(model) {
				$this.add_one(model);
			});
			
			// hide loader
			GlobalsManager.event_aggregator.trigger("loader", {
				hide: true
			});
		},

		// a method to initialize the model, render and get the el
		add_one : function(model) {
			var item_view = new ExpenseItemView({
				model : model
			});

			this.$("#all_expenses").append(item_view.render().$el);
		},

		// a method to close the current view, clears out the html, unbinds all the events
		close : function() {
			console.log("update expense close");
			this.remove();
			this.off();
			this.event_aggregator.trigger("destroy:expense_items");
			this.event_aggregator.off(null, null, this);
		}
	});
});
