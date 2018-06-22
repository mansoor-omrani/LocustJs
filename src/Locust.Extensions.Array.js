(function(w) {
	function __error(msg) {
		if (w.console && w.console.error) {
			w.console.error(msg);
		} else {
			throw msg;
		}
	};
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
		_logger.warning("Locust.Extensions.Array", "warning: Array.prototype.clone already declared.");
	}
	// https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
	if (!w.Array.prototype.shuffle) {
		w.Array.prototype.shuffle = function () {
			var currentIndex = this.length, temporaryValue, randomIndex;

			// While there remain elements to shuffle...
			while (0 !== currentIndex) {

				// Pick a remaining element...
				randomIndex = Math.floor(Math.random() * currentIndex);
				currentIndex -= 1;

				// And swap it with the current element.
				temporaryValue = this[currentIndex];
				this[currentIndex] = this[randomIndex];
				this[randomIndex] = temporaryValue;
			}

			return this;
		}
	} else {
		_logger.warning("Locust.Extensions.Array", "warning: Array.prototype.shuffle already declared.");
	}
	if (!w.Array.prototype.insertAt) {
		w.Array.prototype.insertAt = function (index, item) {
			return this.splice(index, 0, item);
		}
	} else {
		_logger.warning("Locust.Extensions.Array", "warning: Array.prototype.insertAt already declared.");
	}
	if (!w.Array.prototype.removeAt) {
		w.Array.prototype.removeAt = function (index) {
			return this.splice(index, 1)[0];
		}
	} else {
		_logger.warning("Locust.Extensions.Array", "warning: Array.prototype.removeAt already declared.");
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
		_logger.warning("Locust.Extensions.Array", "warning: Array.prototype.all already declared.");
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
		_logger.warning("Locust.Extensions.Array", "warning: Array.prototype.any already declared.");
	}
})(__locustMainContext);