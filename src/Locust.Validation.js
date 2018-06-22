(function (w) {
    function __error(msg) {
		if (w.console && w.console.error) {
			w.console.error(msg);
		} else {
			throw msg;
		}
	}
	if (!w) {
        throw "Locust.Validation: no context given (use 'Locust.Base.js')";
    }
    if (!w.Locust) {
		__error("Locust.Validation: Locust namespace not found (use 'Locust.Base.js')");
		return;
    }
    if (!w.Locust.Validation) {
        w.Locust.Validation = {};
    }
    w.Locust.Validation.isValidURL = function (url) {
        var RegExp = /^(([\w]+:)?\/\/)?(([\d\w]|%[a-fA-f\d]{2,2})+(:([\d\w]|%[a-fA-f\d]{2,2})+)?@)?([\d\w][-\d\w]{0,253}[\d\w]\.)+[\w]{2,4}(:[\d]+)?(\/([-+_~.\d\w]|%[a-fA-f\d]{2,2})*)*(\?(&?([-+_~.\d\w]|%[a-fA-f\d]{2,2})=?)*)?(#([-+_~.\d\w]|%[a-fA-f\d]{2,2})*)?$/;
        return RegExp.test(url);
    }

    w.Locust.Validation.isValidEmail = function (email) {
        var RegExp = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
        return RegExp.test(email);
    }
})(__locustMainContext);
