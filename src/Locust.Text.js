//================================= Locust.Validation =================================
(function (w) {
    function __error(msg) {
		if (w.console && w.console.error) {
			w.console.error(msg);
		} else {
			throw msg;
		}
	}
	if (!w) {
        throw "Locust.Text: no context given (use 'Locust.Base.js')";
    }
    if (!w.Locust) {
		__error("Locust.Text: Locust namespace not found (use 'Locust.Base.js')");
		return;
    }
    if (!w.Locust.Text) {
        w.Locust.Text = {};
    }
    w.Locust.Text.StringBuilder = function () {
        var buffer = [];
        var result = "";
        var result_built = false;
        
        this.append = function (value, index, len) {
            result_built = false;
            value = (value || "").toString();

            if (value) {
                if (index != undefined) {
                    value = value.substr(index, len);
                }
                buffer.push(value);
            }
        }
        this.build = function () {
            if (!result_built) {
                result = buffer.join("");
                result_built = true;
                buffer = [];
            }

            return result;
        }
    }
})(__locustMainContext);
