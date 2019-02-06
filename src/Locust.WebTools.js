//================================= Locust.WebTools =================================
(function (w) {
    function __error(msg) {
		if (w.console && w.console.error) {
			w.console.error(msg);
		} else {
			throw msg;
		}
	}
	if (!w) {
        throw "Locust.WebTools: no context given (use 'Locust.Base.js')";
    }
    if (!w.Locust) {
		__error("Locust.WebTools: Locust namespace not found (use 'Locust.Base.js')");
		return;
    }
	if (!w.jQuery) {
        __error("Locust.WebTools: jQuery library not found");
        return;
    }
    if (!w.Locust.WebTools) {
        w.Locust.WebTools = {};
    }
	w.Locust.WebTools.makeSeoFriendly = function (s, customReplace) {
        var result = [];
		
        if (s && s.length) {
			s = s.toLowerCase();
            var arr = s.split('');
            var prev_ch;
			
            for (var i = 0; i < arr.length; i++) {
                var ch = arr[i];

				if (customReplace) {
                    var replace = customReplace[ch];
                    if (replace) {
                        result.push(replace);
                        continue;
                    }
                }
				
                if (ch == '&') {
                    result.push("and");
                    continue;
                }

                if (['+', '/', '\\', '|', '.', '?', '!', '*', '#', ':', '>', '<', '%', '@', '$', '^', '\t', '\n', '\r'].indexOf(ch) >= 0) {
                    continue;
                }

                if (['-', ' ', '(', ')'].indexOf(ch) >= 0) {
                    if (prev_ch != '-')
                        result.push('-');
                    prev_ch = '-';
                } else {
                    result.push(ch);
                    prev_ch = ch;
                }
            }
			
			if (result.length > 0 && result[result.length - 1] == '-') {
                result.removeAt(result.length - 1);
            }
        }
		
        return result.join("");
    };
    w.Locust.WebTools.getArray = function (select, valueProperty, textProperty, valueType) {
        var result = [];
        var _valueProperty = "id";
        if (valueProperty != undefined) {
            _valueProperty = valueProperty;
        }
        var _textProperty = "name";
        if (textProperty != undefined) {
            _textProperty = textProperty;
        }

        w.jQuery(select).find("option").each(function (i, x) {
            var item = {};

            item[_valueProperty] = w.jQuery(x).val();
			
            if (valueType != undefined) {
                switch (valueType) {
                    case "int": item[_valueProperty] = parseInt(item[_valueProperty]); break;
                    case "float": item[_valueProperty] = parseFloat(item[_valueProperty]); break;
                    case "date": item[_valueProperty] = new Date(item[_valueProperty]); break;
                }
            }
			
            item[_textProperty] = w.jQuery(x).text();

            result.push(item);
        });

        return result;
    };
    w.Locust.WebTools.parseQuery = function (url) {
        var result = {};
        var iq = url.indexOf('?');
        var ih = url.indexOf('#');
        var arr;

        if (iq > 0) {
            if (ih > 0) {
                if (ih - iq - 1 > 0) {
                    arr = url.substr(iq + 1, ih - iq - 1);
                }
            } else {
                arr = url.substr(iq + 1);
            }
        } else {
            if (url.left(4).toLowerCase() != "http") {
                arr = url;
            }
        }

        if (arr) {
            arr.split('&').forEach(function (keyValue) {
                var ei = keyValue.indexOf('=');
                var key = keyValue.substr(0, ei);
                var value = decodeURIComponent(keyValue.substr(ei + 1));

                result[key] = value;
            });
        }

        return result;
    };
    w.Locust.WebTools.querystring = function () {
        return w.Locust.WebTools.parseQuery(w.location.href);
    };
    
    w.Locust.WebTools.POPUP_DEFAULT_WIDTH = 400;
    w.Locust.WebTools.POPUP_DEFAULT_HEIGHT = 300;

	w.Locust.WebTools.popup = function (url, title, specs) {
		// source: https://stackoverflow.com/questions/4068373/center-a-popup-window-on-screen
		// with slight modification
		
		// Fixes dual-screen position                         Most browsers      Firefox
		var dualScreenLeft = window.screenLeft != undefined ? window.screenLeft : window.screenX;
		var dualScreenTop = window.screenTop != undefined ? window.screenTop : window.screenY;

		var width = window.innerWidth ? window.innerWidth : document.documentElement.clientWidth ? document.documentElement.clientWidth : screen.width;
		var height = window.innerHeight ? window.innerHeight : document.documentElement.clientHeight ? document.documentElement.clientHeight : screen.height;
		var _w = specs ? specs.width : 0;
		var _h = specs ? specs.height: 0;

		if (!_w) _w = w.Locust.WebTools.POPUP_DEFAULT_WIDTH;
		if (!_h) _h = w.Locust.WebTools.POPUP_DEFAULT_HEIGHT;
		
		var left = ((width / 2) - (_w / 2)) + dualScreenLeft;
		var top = ((height / 2) - (_h / 2)) + dualScreenTop;
		var _specs = [];
		
		_specs.push("top=" + top);
		_specs.push("left=" + left);
		_specs.push("width=" + _w);
		_specs.push("height=" + _h);
		
		w.Locust.eachKey(specs, function(key) {
			var _key = key.toLowerCase();
			var i = _specs.indexOf(_key);
			var value = specs[key];

			if (typeof value == "boolean") {
			    value = value ? "yes" : "no";
			}

			if (i >= 0) {
				_specs[i] = _key + "=" + value;
			} else {
				_specs.push(_key + "=" + value);
			}
		});
		
		var win = window.open(url, title, _specs.join(','));

		// Puts focus on the win
		if (window.focus) {
			win.focus();
		}
		
		return win;
    }
    w.Locust.WebTools.jsEncode = function (value) {
        // converted from Microsfot .NET System.Web.HttpUtility.JavaScriptStringEncode()
        // https://github.com/dotnet/corefx/blob/e23f83e6172ef2d879342e1c4883012749b91ef1/src/System.Web.HttpUtility/src/System/Web/Util/HttpEncoder.cs

        function charRequiresJavaScriptEncoding(ch) {
            return ch < 0x20 // control chars always have to be encoded
                || ch == '\"' // chars which must be encoded per JSON spec
                || ch == '\\'
                || ch == '\'' // HTML-sensitive chars encoded for safety
                || ch == '<'
                || ch == '>'
                || ch == '&'
                || ch == '\u0085' // newline chars (see Unicode 6.2, Table 5-1 [http://www.unicode.org/versions/Unicode6.2.0/ch05.pdf]) have to be encoded
                || ch == '\u2028'
                || ch == '\u2029';
        }
        function toHexString(num) {
            var result = ('000' + (num).toString(16)).right(4);

            return result;
        }
        function appendCharAsUnicodeJavaScript(builder, ch) {
            if (ch == ' ') {
                builder.append(' ');
            } else {
                builder.append("\\u" + toHexString(ch.charCodeAt(0)));
            }
        }

        value = (value || "").toString();

        if (!value.length) {
            return "";
        }

        var b = null;
        var startIndex = 0;
        var count = 0;

        for (var i = 0; i < value.length; i++)
        {
            var c = value[i];

            // Append the unhandled characters (that do not require special treament)
            // to the string builder when special characters are detected.

            if (charRequiresJavaScriptEncoding(c)) {
                if (b == null) {
                    b = new w.Locust.Text.StringBuilder();
                }

                if (count > 0) {
                    b.append(value, startIndex, count);
                }

                startIndex = i + 1;
                count = 0;

                switch (c) {
                    case '\r':
                        b.append("\\r");
                        break;
                    case '\t':
                        b.append("\\t");
                        break;
                    case '\"':
                        b.append("\\\"");
                        break;
                    case '\\':
                        b.append("\\\\");
                        break;
                    case '\n':
                        b.append("\\n");
                        break;
                    case '\b':
                        b.append("\\b");
                        break;
                    case '\f':
                        b.append("\\f");
                        break;
                    case ' ':
                        b.append(' ');
                        break;
                    default:
                        appendCharAsUnicodeJavaScript(b, c);
                        break;
                }
            } else {
                count++;
            }
        }

        if (b == null) {
            return value;
        }

        if (count > 0) {
            b.append(value, startIndex, count);
        }

        return b.build();
    }
	if (w.$w == undefined) {
		w.$w = w.Locust.WebTools;
	}
})(__locustMainContext);
