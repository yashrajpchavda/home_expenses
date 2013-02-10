define(["jQuery", "Underscore", "BackboneView"], function($, _, BackboneView) {
	return BackboneView.extend({
		el : "body",
		
		events : {
			"click #login" : "login"
		},

		initialize : function() {
			_.bindAll(this, "render", "close", "login");

			this.render();
		},

		render : function() {

			var n = noty({
				text : "You've been successfully logged out !!",
				
				type : "information",
				layout : 'center',
				theme : 'defaultTheme',
				timeout: 500,
				callback: {
					afterClose: function() {
						window.location = GlobalsManager.get("login_url");
					}
				},
				modal : true
			});

			return this;
		},
		
		login : function($noty){
			// close the noty and point the location url to the login url
			$noty.close();
			window.location = GlobalsManager.get("login_url");
		},

		close : function() {

		}
	})
});
