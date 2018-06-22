(function (w) {
    function __error(msg) {
		if (w.console && w.console.log) {
			console.log(msg);
		} else {
			throw msg;
		}
	};
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
        var retValue = defaultValue;
        if (str !== null) {
            if (str.length > 0) {
                if (!isNaN(str)) {
                    retValue = parseInt(str);
                }
            }
        }
        return retValue;
    }
})(__locustMainContext);
