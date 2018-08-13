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
        throw "Locust.FileManager: no context given (use 'Locust.Base.js')";
    }
    if (!w.Locust) {
		__error("Locust.FileManager: Locust namespace not found (use 'Locust.Base.js')");
		return;
    }
	if (!w.jQuery) {
        __error("Locust.FileManager: jQuery library not found");
        return;
    }
    if (!w.Locust.FileManager) {
        w.Locust.FileManager = {};
    }
	if (!w.Locust.FileManager.callFunction) {
        w.Locust.FileManager.callFunction = function (path, field, frm) {
			var elm;

			if (frm) {
				var _frm = w.jQuery("form#" + frm);

				if (_frm.length > 0) {
					elm = _frm.find("[name=" + field + "]");

					if (elm.length == 0) {
						elm = _frm.find("[id=" + field + "]");
						
						if (elm.length == 0) {
							elm = undefined;
						}
					}
				}
			}

			if (elm == undefined){
				elm = w.jQuery("[name=" + field + "]");

				if (elm.length == 0) {
					elm = w.jQuery("[id=" + field + "]");
				}
			}

			if (w.jQuery.isFunction(elm.val)) {
				elm.val(path);
			}
		};
    }
	if (w.$fm == undefined) {
		w.$fm = w.Locust.FileManager;
	}
})(__locustMainContext);
