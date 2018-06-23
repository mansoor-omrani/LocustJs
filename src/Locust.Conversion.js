//================================= Locust.Conversion =================================
(function (w) {
    function __error(msg) {
		if (w.console && w.console.error) {
			w.console.error(msg);
		} else {
			throw msg;
		}
	}
	if (!w) {
        throw "Locust.Convert: no context given (use 'Locust.Base.js')";
    }
    if (!w.Locust) {
		__error("Locust.Convert: Locust namespace not found (use 'Locust.Base.js')");
		return;
    }
    if (!w.Locust.Convert) {
        w.Locust.Convert = {};
    }
    Locust.Convert.TryParseInt = function (str, defaultValue) {
        // source: http://pietschsoft.com/post/2008/01/14/JavaScript-intTryParse-Equivalent
        var result = defaultValue;
		
        if (str !== null) {
            if (str.length > 0) {
                if (!w.isNaN(str)) {
                    result = w.parseInt(str);
                }
            }
        }
		
        return result;
    }
})(__locustMainContext);
