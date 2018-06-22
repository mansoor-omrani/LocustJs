(function (w) {
    function __error(msg) {
		if (w.console && w.console.error) {
			w.console.error(msg);
		} else {
			throw msg;
		}
	}
	if (!w) {
        throw "Locust.Language: no context given (use 'Locust.Base.js')";
    }
    if (!w.Locust) {
		__error("Locust.Language: Locust namespace not found (use 'Locust.Base.js')");
		return;
    }
    if (!w.Locust.Language) {
        w.Locust.Language = {};
    }
    w.Locust.Language.QUERYSTRING_PARAM_NAME = "la";
    w.Locust.Language.SCHEME = "url";

    w.Locust.Language.Lang = function (shortName, name, localName, digits, dir, align) {
        var _self = this;

        _self.shortName = shortName;
        _self.name = name;
        _self.localName = localName;
        _self.digits = digits;
        _self.dir = dir;
        _self.altDir = (dir == "ltr") ? "rtl" : "ltr";
        _self.align = align;
        _self.altAlign = (align == "left") ? "right" : "left";

        _self.number = function (s) {
            var result = '';

            for (var i = 0; i < s.length; i++) {
                var ascii = s.charCodeAt(i);
                result += ((ascii >= 48) && (ascii <= 57)) ? _self.digits : s.charAt(i);
            };
            return result;
        }
    }

    w.Locust.Language.En = new w.Locust.Language.Lang("en", "English", "انگلیسی", ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'], "ltr", "left");
    w.Locust.Language.Fa = new w.Locust.Language.Lang("fa", "Farsi", "فارسی", ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'], "rtl", "right");
    w.Locust.Language.Current = w.Locust.Language.En;

    var _la = "";

    if (w.Locust.Language.SCHEME == "url") {
        var _path = w.location.pathname;
        var _slashIndex = _path.indexOf('/', 1);

        if (_slashIndex > 0) {
            _la = _path.substr(1, _slashIndex - 1).toLowerCase();
        } else {
            if (_slashIndex == -1) {
                _la = _path.substr(1).toLowerCase();
            }
        }
    } else if (w.Locust.Language.SCHEME == "querystring") {
        var _urlParams = new URLSearchParams(w.location.search);

        if (_urlParams.has(w.Locust.Language.QUERYSTRING_PARAM_NAME)) {
            _la = _urlParams.get(w.Locust.Language.QUERYSTRING_PARAM_NAME).toLowerCase();
        }
    }

    if (_la == "fa") {
        w.Locust.Language.Current = w.Locust.Language.Fa;
    }
})(__locustMainContext);
