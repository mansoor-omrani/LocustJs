(function (w) {
    if (!w) {
        console.log("Locust.Conversion: no context given (use 'Locust.Base.js')");
        return;
    }
    if (!w.Locust) {
        console.log("Locust.Conversion: Locust namespace not found (use 'Locust.Base.js')");
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
