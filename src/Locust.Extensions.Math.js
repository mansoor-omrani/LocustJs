(function(w) {
	function __error(msg) {
		if (w.console && w.console.error) {
			w.console.error(msg);
		} else {
			throw msg;
		}
	}
	if (!w) {
		throw "Locust.Extensions.Math: no context given (use 'Locust.Base.js')";
	}
	if (!w.Locust) {
		__error("Locust.Extensions.Math: Locust namespace not found (use 'Locust.Base.js')");
		return;
	}
	if (!w.Locust.Logging) {
		__error("Locust.Extensions.Array: Locust.Logging namespace not found (use 'Locust.Logging.js')");
		return;
	}
	
	var _logger = w.Locust.getLogger();
	
	if (!w.Math.roundBy) {
		w.Math.roundBy = function (n, decimalPlaces) {
			var scale = w.Math.pow(10, decimalPlaces);
			
			return w.Math.round(scale * n) / scale;
		}
	} else {
		_logger.warning("Locust.Extensions.Math", "Math.roundBy already declared.");
	}
	
	if (!w.Math.rand) {
		w.Math.rand = function(i, j) {
			return w.Math.floor(Math.random() * j) + 1;
		}
	} else {
		_logger.warning("Locust.Extensions.Math", "Math.rand already declared.");
	}
})(__locustMainContext);