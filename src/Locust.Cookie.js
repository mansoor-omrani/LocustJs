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
        throw "Locust.Cookie: no context given (use 'Locust.Base.js')";
    }
    if (!w.Locust) {
		__error("Locust.Cookie: Locust namespace not found (use 'Locust.Base.js')");
		return;
    }
	if (!w.jQuery) {
        __error("Locust.Cookie: jQuery library not found");
        return;
    }
    if (!w.Locust.Cookie) {
        w.Locust.Cookie = {
			DefaultEncoder: function(x){
				return JSON.stringify(x);
			},
			DefaultDecoder: function(x){
				try {
					return JSON.parse(x);
				} catch (e) {
					return x;
				}
			},
			Set: function (config) {
				var _config = w.jQuery.extend({
					name: "",
					value: "",
					expireDays: 0,
					path: "/",
					encode: null,
					logger: null
				}, config);
				
				_config.logger = w.Locust.getLogger(_config.logger);
				
				if (!w.document) {
					_config.logger.abort("Locust.Cookie.Set", "no document found");
					return;
				}
				
				if (!w.document.cookie) {
					_config.logger.abort("Locust.Cookie.Set", "document does not support cookies");
					return;
				}
				
				if (!_config.name) {
					throw "no name is specified for the cookie";
				}
				
				var expires;
				var days = w.Locust.Convert.TryParseInt(_config.expireDays, 0);
				
				if (days) {
				    var date = new Date();
					
                    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
					
                    expires = "; expires=" + date.toGMTString();
					_config.logger.info("Locust.Cookie.Set", _config.name + ": " + expires);
                } else {
                    expires = "";
					_config.logger.info("Locust.Cookie.Set", _config.name + ": no expireDays is set");
                }
				
				var _value = _config.value;
				
				if (w.jQuery.isFunction(_config.encode)) {
					_value = _config.encode(_value);
					_config.logger.debug("Locust.Cookie", _config.name + ": encoded value = " + _value);
				}
				
				var _path = _config.path || "/";
				
                w.document.cookie = encodeURIComponent(_config.name) + "=" + encodeURIComponent(_value) + expires + "; path=" + _path;
				
				return _value;
            },
            Get: function (name) {
				var _config = {
					name: "",
					decode: null,
					logger: null
				};
				
				if (typeof name == "string") {
					_config.name = config;
				} else {
					_config = w.jQuery.extend(_config, config);
				}
				_config.logger = w.Locust.getLogger(_config.logger);
				
				if (!w.document) {
					_config.logger.abort("Locust.Cookie.Get", "no document found");
					return;
				}
				
				if (!w.document.cookie) {
					_config.logger.abort("Locust.Cookie.Get", "document does not support cookies");
					return;
				}
				
				if (!_config.name) {
					throw "no cookie name is specified";
				}
				
				var result = null;
                var nameAndEqualSign = encodeURIComponent(name) + "=";
                var cookies = w.document.cookie.splitString(';', w.StringSplitOptions.TrimAndRemoveEmptyEntries);
				
                for (var i = 0; i < cookies.length; i++) {
                    var cookie = cookies[i];
					
                    if (cookie.indexOf(nameAndEqualSign) == 0) {
						result = decodeURIComponent(cookie.substring(nameAndEqualSign.length, cookie.length));
						
						_config.logger.debug("Locust.Cookie.Get", _config.name + ": found. [" + result + "]");
						
						if (w.jQuery.isFunction(_config.decode)) {
							result = _config.decode(_value);
							_config.logger.debug("Locust.Cookie.Get", _config.name + ": decoded value = " + result);
						}
						
						break;
					}
                }
				
                return result;
            },
			GetAll: function (config) {
				var _config = w.jQuery.extend({
					decode: null,
					logger: null
				}, config);
				
				_config.logger = w.Locust.getLogger(_config.logger);
				
				if (!w.document) {
					_config.logger.abort("Locust.Cookie.GetAll", "no document found");
					return;
				}
				
				if (!w.document.cookie) {
					_config.logger.abort("Locust.Cookie.GetAll", "document does not support cookies");
					return;
				}
				
				var result = [];
				var cookies = w.document.cookie.splitString(';', w.StringSplitOptions.TrimAndRemoveEmptyEntries);
				
				for (var i = 0; i < cookies.length; i++) {
                    var cookie = cookies[i];
					var equalSignIndex = cookie.indexOf("=");
					
                    if (equalSignIndex > 0) {
						var value = cookie.substr(equalSignIndex + 1);
						if (w.jQuery.isFunction(_config.decode)) {
							value = _config.decode(value);
						}
						result.push({ name: cookie.substr(0, equalSignIndex), value: value });
					}
                }
				
                return result;
			},
			GetOrSet: function (config) {
				var result = w.Locust.Cookie.Get(config);
				
				if (result == null) {
					result = w.Locust.Cookie.Set(config);
				}
				
				return result;
			},
            Remove: function (name, path) {
                w.Locust.Cookie.Set(name, "", -1, path);
            }
		};
    }
    
	if (w.$k == undefined) {
		w.$k = w.Locust.Cookie;
	}
})(__locustMainContext);
