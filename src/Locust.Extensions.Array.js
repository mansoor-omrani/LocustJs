//================================= Locust.Extensions.Array =================================
(function(w) {
	function __error(msg) {
		if (w.console && w.console.error) {
			w.console.error(msg);
		} else {
			throw msg;
		}
	}
	if (!w) {
		throw "Locust.Extensions.Array: no context given (use 'Locust.Base.js')";
	}
	if (!w.Locust) {
		__error("Locust.Extensions.Array: Locust namespace not found (use 'Locust.Base.js')");
		return;
	}
	if (!w.Locust.Logging) {
		__error("Locust.Extensions.Array: Locust.Logging namespace not found (use 'Locust.Logging.js')");
		return;
	}
	var _logger = w.Locust.getLogger();
	// ------------------------ Array extensions -----------------------------//
	if (!w.Array.prototype.clone) {
		w.Array.prototype.clone = function () {
			return this.slice(0);
		}
	} else {
		_logger.warn("Locust.Extensions.Array", "warning: Array.prototype.clone already declared.");
	}
	// https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
	if (!w.Array.prototype.shuffle) {
		w.Array.prototype.shuffle = function () {
			var currentIndex = this.length, temporaryValue, randomIndex;

			// While there remain elements to shuffle...
			while (0 !== currentIndex) {

				// Pick a remaining element...
				randomIndex = w.Math.floor(w.Math.random() * currentIndex);
				currentIndex -= 1;

				// And swap it with the current element.
				temporaryValue = this[currentIndex];
				this[currentIndex] = this[randomIndex];
				this[randomIndex] = temporaryValue;
			}

			return this;
		}
	} else {
		_logger.warn("Locust.Extensions.Array", "warning: Array.prototype.shuffle already declared.");
	}
	if (!w.Array.prototype.insertAt) {
		w.Array.prototype.insertAt = function (index, item) {
			return this.splice(index, 0, item);
		}
	} else {
		_logger.warn("Locust.Extensions.Array", "warning: Array.prototype.insertAt already declared.");
	}
	if (!w.Array.prototype.removeAt) {
		w.Array.prototype.removeAt = function (index) {
			return this.splice(index, 1)[0];
		}
	} else {
		_logger.warn("Locust.Extensions.Array", "warning: Array.prototype.removeAt already declared.");
	}
	if (!w.Array.prototype.all) {
		w.Array.prototype.all = function (fn) {
			var result = true;
			if (!fn || typeof fn != "function") {
				throw "no function is given or the argument is not a function";
			} else {
				for (var i = 0; i < this.length; i++) {
					if (!fn(this[i])) {
						result = false;
						break;
					}
				}
			}
			return result;
		}
	} else {
		_logger.warn("Locust.Extensions.Array", "warning: Array.prototype.all already declared.");
	}
	if (!w.Array.prototype.any) {
		w.Array.prototype.any = function (fn) {
			var result = false;
			if (!fn || typeof fn != "function") {
				throw "no function is given or the argument is not a function";
			} else {
				for (var i = 0; i < this.length; i++) {
					if (!fn(this[i])) {
						result = true;
						break;
					}
				}
			}
			return result;
		}
	} else {
		_logger.warn("Locust.Extensions.Array", "warning: Array.prototype.any already declared.");
	}
	if (!w.Array.prototype.Objectify) {
		/*	this method has close relation with String.prototype.nestedSplit in Locust.Extensions.String
			examples
			input:
			[
				["a", 1],
				["b", "ali"]
			]
			output: { "a": 1, "b": "ali" }
			
			input:
				[
					[ ["a",1],["b", "ali"] ],
					[ ["a",2],["b", "reza"],["c", true] ],
					[ ["a",3],["b"],["c", false] ],
					[ ["b", "saeed"],["c", true] ]
				]
			output:
				[
					{ "a": 1, "b": "ali" },
					{ "a": 2, "b": "reza" , "c": true },
					{ "a": 3, "b": null, "c": false },
					{ "b": "saeed", "c": true}
				]
		*/
		
		w.Array.prototype.Objectify = function () {
			var result;
			var arr = this;
			
			if (!w.jQuery.isArray(arr)) {
				result = {};
				result[arr.toString()] = null;
				
				return result;
			}
			if (arr.length == 0)
				return null;
			if (arr.length == 1) {
				result = {};
				result[arr[0].toString()] = null;
				
				return result;
			}
			
			for (var i = 0; i < arr.length; i += 2) {
				var key = arr[i];
				var value = (i + 1 < arr.length) ? arr[i + 1]: null;

				if (i == 0) {
					result = (w.jQuery.isArray(key))?[]:{};
				}
				
				if (w.jQuery.isArray(key)) {
					var temp1 = key.Objectify();
					var temp2;
					var temp = {};
					
					if (value) {
						if (w.jQuery.isArray(value))
							temp2 = value.Objectify();
						else
							temp2 = value;
					}
					
					if (!w.jQuery.isArray(temp1)) {
						temp = w.jQuery.extend(temp, temp1, temp2);
						
						if (Object.keys(temp).length == (temp1 ? Object.keys(temp1).length : 0) + (temp2 ? Object.keys(temp2).length: 0)) {
							if (w.jQuery.isArray(result)) {
								result = temp;
								continue;
							}
						}
					}
					
					if (w.jQuery.isArray(result)) {
						result.push(temp1);
						
						if (temp2)
							result.push(temp2);
					} else {
						w.jQuery.extend(result, temp1);
						w.jQuery.extend(result, temp2);
					}
				} else {
					if (w.jQuery.isArray(value))
						result[key] = value.Objectify();
					else
						result[key] = value;
				}
			}
			
			if (w.jQuery.isArray(result) && result.length == 1) {
				result = result[0];
			}
			
			return result;
		}
	} else {
		_logger.warn("Locust.Extensions.Array", "warning: Array.prototype.removeAt already declared.");
	}
})(__locustMainContext);