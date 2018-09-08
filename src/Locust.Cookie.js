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
			defaultEncoder: function(x){
				return JSON.stringify(x);
			},
			defaultDecoder: function(x){
				try {
					return JSON.parse(x);
				} catch (e) {
					return x;
				}
			},
			set: function (config) {
			    var _config = {
			        name: "",
			        value: "",
			        expireDays: 0,
			        path: "/",
			        encode: null,
			        logger: null
			    };

			    if (typeof config == "string") {
			        _config.name = config;
			    } else {
			        _config = w.jQuery.extend(_config, config);
			    }
			    _config.logger = w.Locust.getLogger(_config.logger);
				
				if (!w.document) {
					_config.logger.abort("Locust.Cookie.set", "no document found");
					return;
				}
				
				if (!w.navigator.cookieEnabled) {
					_config.logger.abort("Locust.Cookie.set", "document does not support cookies");
					return;
				}
				
				if (!_config.name) {
					throw "no name is specified for the cookie";
				}
				
				var expires;
				var days = w.Locust.Convert.tryParseInt(_config.expireDays, 0);
				
				if (days) {
				    var date = new Date();
					
                    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
					
                    expires = "; expires=" + date.toGMTString();
					_config.logger.trace("Locust.Cookie.set", _config.name + ": " + expires);
                } else {
                    expires = "";
					_config.logger.trace("Locust.Cookie.set", _config.name + ": no expireDays is set");
                }
				
				var _value = _config.value;
				
				if (w.jQuery.isFunction(_config.encode)) {
					_value = _config.encode(_value);
					_config.logger.trace("Locust.Cookie", _config.name + ": encoded value = " + _value);
				}
				
				var _path = _config.path || "/";
				
                w.document.cookie = encodeURIComponent(_config.name) + "=" + encodeURIComponent(_value) + expires + "; path=" + _path;
				
                return _config.value;
			},
			iterate: function (config) {
			    var _config = w.jQuery.extend({
			        decode: null,
			        logger: null,
                    callback: null
			    }, config);

			    _config.logger = w.Locust.getLogger(_config.logger);

			    if (!w.document) {
			        _config.logger.abort("Locust.Cookie.iterate", "no document found");
			        return;
			    }

			    if (!w.navigator.cookieEnabled) {
			        _config.logger.abort("Locust.Cookie.iterate", "document does not support cookies");
			        return;
			    }

			    var cookies = w.document.cookie.splitString(';', w.StringSplitOptions.TrimAndRemoveEmptyEntries);
			    var _i = 0;

			    for (var i = 0; i < cookies.length; i++) {
			        var cookie = cookies[i];
			        var equalSignIndex = cookie.indexOf("=");

			        if (equalSignIndex > 0) {
			            var nameAndEqualSign = cookie.substring(0, equalSignIndex + 1);
			            var name = nameAndEqualSign.substr(0, nameAndEqualSign.length - 1);
			            var value = decodeURIComponent(cookie.substring(nameAndEqualSign.length, cookie.length));

			            if (w.jQuery.isFunction(_config.decode)) {
			                try {
			                    value = _config.decode(value);
			                } catch (e) {
			                    if (logger) {
			                        logger.warn("Locust.Cookie.iterate", "cookie: " + name + ", decoding cookie value failed.");
			                    }
			                    value = {
			                        origin: value,
                                    error: e
			                    }
			                }
			            }

			            if (w.jQuery.isFunction(_config.callback)) {
			                var r = _config.callback(_i, {
			                    name: name,
			                    value: value
			                });

			                if (typeof r == "boolean" && r) {
			                    break;
			                }
			            }

			            _i++;
			        }
			    }
			},
            get: function (name) {
				var _config = {
					name: "",
					decode: null,
					logger: null
				};
				
				if (typeof name == "string") {
				    _config.name = name;
				} else {
					_config = w.jQuery.extend(_config, name);
				}
				_config.logger = w.Locust.getLogger(_config.logger);
				
				if (!w.document) {
					_config.logger.abort("Locust.Cookie.get", "no document found");
					return;
				}
				
				if (!w.navigator.cookieEnabled) {
					_config.logger.abort("Locust.Cookie.get", "document does not support cookies");
					return;
				}
				
				if (!_config.name) {
					throw "no cookie name is specified";
				}
				
				var result = null;
                var nameAndEqualSign = encodeURIComponent(_config.name) + "=";
                var cookies = w.document.cookie.splitString(';', w.StringSplitOptions.TrimAndRemoveEmptyEntries);
				
                for (var i = 0; i < cookies.length; i++) {
                    var cookie = cookies[i];
					
                    if (cookie.indexOf(nameAndEqualSign) == 0) {
						result = decodeURIComponent(cookie.substring(nameAndEqualSign.length, cookie.length));
						
						_config.logger.trace("Locust.Cookie.get", _config.name + ": found. [" + result + "]");
						
						if (w.jQuery.isFunction(_config.decode)) {
						    result = _config.decode(result);
							_config.logger.trace("Locust.Cookie.get", _config.name + ": decoded value = " + result);
						}
						
						break;
					}
                }
				
                return result;
            },
			getAll: function (config) {
				var result = [];
				
				config.callback = function (i, cookie) {
				    result.push(cookie);
				}

				w.Locust.Cookie.iterate(config)
				
                return result;
			},
			getOrSet: function (config) {
			    var result = w.Locust.Cookie.get(config);

			    if (result == null) {
			        result = w.Locust.Cookie.set(config);
			    }

			    return result;
			},
            remove: function (name, path) {
                w.Locust.Cookie.set(name, "", -1, path);
            }
		};
    }
    
	if (w.$k == undefined) {
		w.$k = w.Locust.Cookie;
	}
})(__locustMainContext);
