/*
 * An edit expense view
 */

define(["jQuery", "Underscore", "Backbone", "BackboneView", "text!app/templates/edit_expense.jst"], function($, _, Backbone, BackboneView, EditExpenseTemplate) {
	return BackboneView.extend({

		events : {
			"click #btn_save" : "update_expense"
		},

		initialize : function() {
			_.bindAll(this, "render", "close", "update_expense");
			this.template = Handlebars.compile(EditExpenseTemplate);

			// Bind the validation to the current view
			Backbone.Validation.bind(this, {
				valid : function(view, attr, selector) {
					// do something
					// find the control group and error container and add respective classes to them
					console.log("valid : " + attr);
					var $control_group = view.$("#" + attr).parents(".control-group");
					$control_group.find(".help-inline").html("");
					$control_group.removeClass("error").addClass("success");
				},
				invalid : function(view, attr, error, selector) {
					// do something
					// find the control group and error container and add respective classes to them
					console.log("In Valid : " + attr + " " + error);
					var $control_group = view.$("#" + attr).parents(".control-group");
					$control_group.find(".help-inline").html(error);
					$control_group.addClass("error").removeClass("success");
				}
			});
		},

		render : function() {
			// payment_type is passed as a json to the view, generating json here
			var payment_type_options = [{
				val : "paymenttype",
				text : "Payment Type"
			}, {
				val : "cash",
				text : "Cash"
			}, {
				val : "sodexo",
				text : "Sodexo",
				sel : true
			}]

			this.$el.html(this.template({
				user : GlobalsManager.get("logged_in_user").get("username"),
				model : this.model.toJSON(),
				payment_type_options : payment_type_options
			}));
			this.setElement(this.$(".edit-expense"));
			
			// call date-picker on paid_date control
			this.$("#paid_date").datepicker({
				dateFormat: "dd/mm/yy",
				changeMonth: true,
				changeYear: true,
				maxDate : new Date
			});

			//selecting expense dropdown
			this.$("#expense_type option[value='" + this.model.get("expense_type") + "']").attr("selected", true);

			//selecting payment dropdown
			this.$("#payment_type option[value='" + this.model.get("payment_type") + "']").attr("selected", true);

			return this;
		},

		// a method to be executed when the update button is clicked
		update_expense : function(event) {
			
			// display loader
			GlobalsManager.event_aggregator.trigger("loader");

			// generating the attributes
			var attrs = {
				expense_type : this.$("#expense_type").val(),
				description : this.$("#description").val(),
				payment_type : this.$("#payment_type").val(),
				amount : this.$("#amount").val(),
				paid_date : this.$("#paid_date").val(),
				user_id : GlobalsManager.get("logged_in_user").get("user_id")
			}
			
			this.model.set(attrs);			
			
			// storing this reference to be used in the callbacks of the save
			var _view = this;

			// saving the model is its valid
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
							callback : {
								onClose : function(){
									// triggering the modal view's close whenever noty is closed
									_view.event_aggregator.trigger("close:modal", { model_id : _view.model.get("id") });
								}
							},
							modal : true							
						});
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
							theme : 'defaultTheme'
						});
					}
				});
			} else {
				// hide loader
				GlobalsManager.event_aggregator.trigger("loader", {
					hide: true
				});
			}
		},

		// a method to be executed when the view is closed, removes html and unbinds all the events
		close : function() {
			console.log("close edit expense");
			this.remove();
			this.off();
			this.event_aggregator.off(null, null, this);
		}
	})
});
