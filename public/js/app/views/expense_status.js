/*
 * A view for the expense status
 */

define( ["jQuery", "Underscore", "Backbone", "BackboneView", "text!app/templates/expense_status.jst"], function( $, _, Backbone, BackboneView, ExpenseStatusTemplate ) {
	return BackboneView.extend({
		el : "#app_content",

		events : {
			"click #handover_save" : "handover_save",
			"click #initiate_handover_process" : "initiate_handover_process"
		},

		initialize : function() {
			_.bindAll( this, "render", "close", "handover_save", "initiate_handover_process", "clear_handover_data" );
			this.template = Handlebars.compile( ExpenseStatusTemplate );
			this.event_aggregator.on( "close:state", this.close, this );
			//this.model.on( "change", this.render, this );
			
			// binding backbone validation with the view
			Backbone.Validation.bind(this, {
				valid : function(view, attr, selector) {
					var $control_group = view.$("#" + attr).parents(".control-group");
					$control_group.find(".help-inline").html("");
					$control_group.removeClass("error").addClass("success");
				},
				invalid : function(view, attr, error, selector) {
					var $control_group = view.$("#" + attr).parents(".control-group");
					$control_group.find(".help-inline").html(error);
					$control_group.addClass("error").removeClass("success");
				}
			});
			
			var $this = this;
			this.model.fetch({
				success: function() {
					$this.render();
				}
			});
			
			
			//this.render();
		},

		render : function() {
			this.$el.html( this.template( this.model.toJSON() ) );
			this.setElement( "#expense_status" );
			
			// hide loader
			GlobalsManager.event_aggregator.trigger("loader", {
				hide: true
			});
			
			return this;
		},
		
		handover_save: function( event ){
			var attrs = {
				next_month_owner : this.$( "#next_month_owner" ).val(),
				next_month_cash : this.$( "#next_month_cash" ).val(),
				next_month_sodexo : this.$( "#next_month_sodexo" ).val()
			}

			this.model.set(attrs);
		
			// validate the data before saving it to server			
			if( this.model.isValid() ) {
				// saving this referece for later use
				var $this = this;
				
				$.ajax({
					url: "/handover",
					type: "POST",
					data: attrs,
					success: function( response, status, jqXHR ) {
						var n = noty({
							text : response.message,
							type : response.status,
							dismissQueue : true,
							layout : 'center',
							theme : 'defaultTheme',
							callback : {
								onClose : function(){
									// triggering the modal's close whenever noty is closed
									$this.model.fetch({
										success: function() {
											$this.$("#handover_modal").modal("hide");
											$this.render();
										}
									});
								}
							},
							modal : true							
						});		
					}
				});
			}
		},
		
		// a method to be executed when initiate_handover is clicked
		initiate_handover_process: function(attribute){
			this.clear_handover_data();	
		},
		
		// a method to clear all handover related fields
		clear_handover_data: function(){
			this.$( "#next_month_owner" ).val("Select Next Month Owner");
			this.$( "#next_month_cash" ).val("");
			this.$( "#next_month_sodexo" ).val("");
			this.$( "span.help-inline" ).html("");
			this.$( "div.control-group" ).removeClass("success error");
		},
		
		close : function() {
			console.log("expense status close");
			this.remove();
			this.off();
			this.event_aggregator.off( null, null, this );
			this.model.off( null, null, this );
		}
	});
});
