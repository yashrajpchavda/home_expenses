/*
 * A model which inherits user model and represents the logged in user in the system
 */

define(["jQuery", "Underscore", "Backbone", "UserModel"], function($, _, Backbone, UserModel) {
	return UserModel.extend({
		url : function() {
			return "/get_current_user"
		},
		
		initialize : function() {
			
		}
	});
});
