/*
 * A view for new expense
 */

define(["jQuery", "Underscore", "BackboneView", "Backbone", "text!app/templates/new_expense.jst"], function($, _, BackboneView, Backbone, NewExpenseTemplate) {
	return BackboneView.extend({
		el : "#app_content",

		events : {
			"click #btn_save" : "save_expense",
			"click #btn_clear" : "clear_fields"
		},

		initialize : function() {
			_.bindAll(this, "render", "close", "save_expense");
			this.template = Handlebars.compile(NewExpenseTemplate);
			this.event_aggregator.on("close:state", this.close, this);

			// binding backbone validation with the view
			Backbone.Validation.bind(this, {
				valid : function(view, attr, selector) {
					// do something
					console.log("valid : " + attr);
					var $control_group = view.$("#" + attr).parents(".control-group");
					$control_group.find(".help-inline").html("");
					$control_group.removeClass("error").addClass("success");
				},
				invalid : function(view, attr, error, selector) {
					// do something
					console.log("In Valid : " + attr + " " + error);
					var $control_group = view.$("#" + attr).parents(".control-group");
					$control_group.find(".help-inline").html(error);
					$control_group.addClass("error").removeClass("success");
				}
			});

			this.render();
		},

		render : function() {
			var opts = {
				user : GlobalsManager.get("logged_in_user").get("username")
			};
			this.$el.html(this.template({
				options : opts
			}));
			this.setElement("#new_expense");
			
			// call date-picker on paid_date control
			this.$("#paid_date").datepicker({
				dateFormat: "dd/mm/yy",
				changeMonth: true,
				changeYear: true,
				maxDate : new Date
			});
			
			// hide loader
			GlobalsManager.event_aggregator.trigger("loader", {
				hide: true
			});
			
			return this;
		},

		// a method to save the expenses
		save_expense : function(event) {
			
			// display loader
			GlobalsManager.event_aggregator.trigger("loader");
			
			var attrs = {
				expense_type : this.$("#expense_type").val(),
				description : this.$("#description").val(),
				payment_type : this.$("#payment_type").val(),
				amount : this.$("#amount").val(),
				paid_date : this.$("#paid_date").val()
			}

			this.model.set(attrs);

			var _view = this;

			if (this.model.isValid()) {
				this.model.save(attrs, {
					success : function(model, response) {
						// hide loader
						GlobalsManager.event_aggregator.trigger("loader", {
							hide: true
						});
						var n = noty({
							text : response.message,
							type : response.status,
							dismissQueue : true,
							layout : 'center',
							theme : 'defaultTheme',
							modal : true
						});
						
						_view.$("#btn_clear").trigger("click");
					},
					error : function(model, response) {
						// hide loader
						GlobalsManager.event_aggregator.trigger("loader", {
							hide: true
						});
						var n = noty({
							text : response.message,
							type : response.status,
							dismissQueue : true,
							layout : 'center',
							theme : 'defaultTheme',
							modal : true
						});
					}
				});
			} else {
				// hide loader
				GlobalsManager.event_aggregator.trigger("loader", {
					hide: true
				});
			}

			return false;
		},

		// a method to clear the fields after saving the expense
		clear_fields : function(event) {
			this.$("#description").val("");
			this.$("#payment_type").val("Payment Type");
			this.$("#amount").val("");
			this.$("#paid_date").val("");
			this.$("#expense_type").val("Expense Type").focus();

			this.$(".control-group").removeClass("error").removeClass("success");
			this.$(".help-inline").html("");

		},

		// a method to close the view, removes html, unbinds events
		close : function() {
			console.log("new expense close");
			this.remove();
			this.off();
			this.event_aggregator.off(null, null, this);
		},
	});
});
