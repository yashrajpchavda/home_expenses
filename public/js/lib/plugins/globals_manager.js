define(["EventAggregator"], function(EventAggregator){

	var _props = {};	
	
	var _get = function(key) {
		if(key in _props) {
			return _props[key];
		} else {
			// TODO : Throw some exception if key doesn't exist
		}
	};
	
	var _set = function(key, value) {
		_props[key] = value;
	};
	
	GlobalsManager = {
		get : _get,
		set : _set,
		event_aggregator : EventAggregator
	};
	
	
});
