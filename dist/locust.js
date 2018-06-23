//================================= Locust.0 =================================
var __locustMainContext = window;
var __warnings = true;

//================================= Locust.Base =================================
(function (w) {
	if (!w) {
        throw "Locust.Base: no context given. aborting.";
    }
    if (!w.Locust) {
        w.Locust = { };
    }
    if (!w.Locust.Name) {
        w.Locust.Name = "Locust";
    }
    if (!w.Locust.Version) {
        w.Locust.Version = "1.1.2";
    }
    if (!w.Locust.isEmpty || typeof w.Locust.isEmpty != "function") {
        w.Locust.isEmpty = function(x) {
            if (x == undefined || x == null) {
                return true;
			}
			
            for (var key in x) {
                if (x.hasOwnProperty(key)) {
					return false;
				}
            }

            return true;
        };
    }
    
	w.$$ = w.Locust;
})(__locustMainContext);

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

//================================= Locust.Logging =================================
(function (w) {
	function __error(msg) {
		if (w.console && w.console.error) {
			w.console.error(msg);
		} else {
			throw msg;
		}
	};
	if (!w) {
        throw "Locust.Logging: no context given (use 'Locust.Base.js')";
    }
    if (!w.Locust) {
		__error("Locust.Logging: Locust namespace not found (use 'Locust.Base.js')");
		return;
    }
    if (!w.Locust.Logging) {
        w.Locust.Logging = {};
    }
	
	w.Locust.Logging.__LOG_TRACE_COLOR = "darkcyan";
	w.Locust.Logging.__LOG_INFO_COLOR = "black";
	w.Locust.Logging.__LOG_PRIMARY_COLOR = "blue";
	w.Locust.Logging.__LOG_SECONDARY_COLOR = "gray";
	w.Locust.Logging.__LOG_SUCCESS_COLOR = "green";
	w.Locust.Logging.__LOG_ALERT_COLOR = "darkorange";
	w.Locust.Logging.__LOG_WARNING_COLOR = "brown";
	w.Locust.Logging.__LOG_DANGER_COLOR = "red";
	w.Locust.Logging.__LOG_FAIL_COLOR = "red";
	w.Locust.Logging.__LOG_ABORT_COLOR = "darkred";
	w.Locust.Logging.__LOG_CANCEL_COLOR = "purple";
	w.Locust.Logging.__LOG_SUGGEST_COLOR = "magenta";
	
	w.Locust.Logging.__LOG_TRACE = false;
	w.Locust.Logging.__LOG_INFO = true;
	w.Locust.Logging.__LOG_PRIMARY = false;
	w.Locust.Logging.__LOG_SECONDARY = false;
	w.Locust.Logging.__LOG_SUCCESS = false;
	w.Locust.Logging.__LOG_ALERT = false;
	w.Locust.Logging.__LOG_WARNING = false;
	w.Locust.Logging.__LOG_DANGER = true;
	w.Locust.Logging.__LOG_FAIL = true;
	w.Locust.Logging.__LOG_ABORT = true;
	w.Locust.Logging.__LOG_CANCEL = true;
	w.Locust.Logging.__LOG_SUGGEST = false;
	
	// ------------------------- Locust.Logging.BaseLogger ----------------------------
	
	w.Locust.Logging.BaseLogger = function() {
		var _self = this;
    };
	w.Locust.Logging.BaseLogger.prototype.prepareMessage = function(category, message) {
		return (category ? (category + (message ? ": " + message : "")) : message);
	};
	w.Locust.Logging.BaseLogger.prototype.log = function (category, message, type) {
		type = type ? type.toLowerCase() : "";
		
		switch (type) {
			case "primary": _self.primary(category, message); break;
			case "secondary": _self.secondary(category, message); break;
			case "success": _self.success(category, message); break;
			case "warning": _self.warning(category, message); break;
			case "alert": _self.alert(category, message); break;
			case "fail": _self.fail(category, message); break;
			case "danger": _self.danger(category, message); break;
			case "abort": _self.abort(category, message); break;
			case "cancel": _self.cancel(category, message); break;
			case "suggest": _self.suggest(category, message); break;
			case "trace": _self.trace(category, message); break;
			default: _self.info(category, message);
		}
	};
	
	w.Locust.Logging.BaseLogger.prototype.info = function(category, message) { };
	w.Locust.Logging.BaseLogger.prototype.primary = function(category, message) { };
	w.Locust.Logging.BaseLogger.prototype.secondary = function(category, message) { };
	w.Locust.Logging.BaseLogger.prototype.success = function(category, message) { };
	w.Locust.Logging.BaseLogger.prototype.alert = function(category, message) { };
	w.Locust.Logging.BaseLogger.prototype.warning = function(category, message) { };
	w.Locust.Logging.BaseLogger.prototype.danger = function(category, message) { };
	w.Locust.Logging.BaseLogger.prototype.fail = function(category, message) { };
	w.Locust.Logging.BaseLogger.prototype.abort = function(category, message) { };
	w.Locust.Logging.BaseLogger.prototype.cancel = function(category, message) { };
	w.Locust.Logging.BaseLogger.prototype.suggest = function(category, message) { };
	w.Locust.Logging.BaseLogger.prototype.trace = function(category, message) { };
	
	// ------------------------- Locust.Logging.ConsoleLogger ----------------------------
	
    w.Locust.Logging.ConsoleLogger = function () {
		var _self = this;
		
		w.Locust.Logging.BaseLogger.call(this);
    };
	
	w.Locust.Logging.ConsoleLogger.prototype = Object.create(w.Locust.Logging.BaseLogger.prototype);
	w.Locust.Logging.ConsoleLogger.prototype.constructor = w.Locust.Logging.ConsoleLogger;
	
	w.Locust.Logging.ConsoleLogger.prototype.info = function(category, message) {
		if (w.Locust.Logging.__LOG_INFO)
			w.console.log('%c' + this.prepareMessage(category, message), 'color: ' + w.Locust.Logging.__LOG_INFO_COLOR);
	};
	w.Locust.Logging.ConsoleLogger.prototype.primary = function(category, message) {
		if (w.Locust.Logging.__LOG_PRIMARY)
			w.console.log('%c' + this.prepareMessage(category, message), 'color: ' + w.Locust.Logging.__LOG_PRIMARY_COLOR);
	};
	w.Locust.Logging.ConsoleLogger.prototype.secondary = function(category, message) {
		if (w.Locust.Logging.__LOG_SECONDARY)
			w.console.log('%c' + this.prepareMessage(category, message), 'color: ' + w.Locust.Logging.__LOG_SECONDARY_COLOR);
	};
	w.Locust.Logging.ConsoleLogger.prototype.success = function(category, message) {
		if (w.Locust.Logging.__LOG_SUCCESS)
			w.console.log('%c' + this.prepareMessage(category, message), 'color: ' + w.Locust.Logging.__LOG_SUCCESS_COLOR);
	};
	w.Locust.Logging.ConsoleLogger.prototype.alert = function(category, message) {
		if (w.Locust.Logging.__LOG_ALERT)
			w.console.log('%c' + this.prepareMessage(category, message), 'color: ' + w.Locust.Logging.__LOG_ALERT_COLOR);
	};
	w.Locust.Logging.ConsoleLogger.prototype.warning = function(category, message) {
		if (w.Locust.Logging.__LOG_WARNING)
			w.console.warn('%c' + this.prepareMessage(category, message), 'color: ' + w.Locust.Logging.__LOG_WARNING_COLOR);
	};
	w.Locust.Logging.ConsoleLogger.prototype.danger = function(category, message) {
		if (w.Locust.Logging.__LOG_DANGER)
			w.console.error('%c' + this.prepareMessage(category, message), 'color: ' + w.Locust.Logging.__LOG_DANGER_COLOR + ';font-weight:bold');
	};
	w.Locust.Logging.ConsoleLogger.prototype.fail = function(category, message) {
		if (w.Locust.Logging.__LOG_FAIL)
			w.console.log('%c' + this.prepareMessage(category, message), 'color: ' + w.Locust.Logging.__LOG_FAIL_COLOR);
	};
	w.Locust.Logging.ConsoleLogger.prototype.abort = function(category, message) {
		if (w.Locust.Logging.__LOG_ABORT)
			w.console.log('%c' + this.prepareMessage(category, message), 'color: ' + w.Locust.Logging.__LOG_ABORT_COLOR);
	};
	w.Locust.Logging.ConsoleLogger.prototype.cancel = function(category, message) {
		if (w.Locust.Logging.__LOG_CANCEL)
			w.console.log('%c' + this.prepareMessage(category, message), 'color: ' + w.Locust.Logging.__LOG_CANCEL_COLOR);
	};
	w.Locust.Logging.ConsoleLogger.prototype.suggest = function(category, message) {
		if (w.Locust.Logging.__LOG_SUGGEST)
			w.console.log('%c' + this.prepareMessage(category, message), 'color: ' + w.Locust.Logging.__LOG_SUGGEST_COLOR);
	};
	w.Locust.Logging.ConsoleLogger.prototype.trace = function(category, message) {
		if (w.Locust.Logging.__LOG_TRACE)
			w.console.trace('%c' + this.prepareMessage(category, message), 'color: ' + w.Locust.Logging.__LOG_TRACE_COLOR);
	};
	
	// ------------------------- Locust.Logging.DOMLogger ----------------------------
	
	w.Locust.Logging.DOMLogger = function () {
		var _self = this;
		
		if (!w.$) {
			w.console.error("Locust.Logging.DOMLogger: jQuery not found");
		}
		
		this._config = { target: ".logs" };

		if (config) {
			this._config = w.$.extend(this._config, config);
		}
		
		w.Locust.Logging.BaseLogger.call(this);
    };
	
	w.Locust.Logging.DOMLogger.prototype = Object.create(w.Locust.Logging.BaseLogger.prototype);
	w.Locust.Logging.DOMLogger.prototype.constructor = w.Locust.Logging.DOMLogger;
	w.Locust.Logging.DOMLogger.prototype._log = function (type, msg, style) {
		w.$(this._config.target).append("<div style='" + style + "' class='log log-" + type + "'>" + msg + "</div>");
	};
	w.Locust.Logging.DOMLogger.prototype.info = function(category, message) {
		if (w.Locust.Logging.__LOG_INFO)
			this._log("info", this.prepareMessage(category, message), 'color: ' + w.Locust.Logging.__LOG_INFO_COLOR);
	};
	w.Locust.Logging.DOMLogger.prototype.primary = function(category, message) {
		if (w.Locust.Logging.__LOG_PRIMARY)
			this._log("primary", this.prepareMessage(category, message), 'color: ' + w.Locust.Logging.__LOG_PRIMARY_COLOR);
	};
	w.Locust.Logging.DOMLogger.prototype.secondary = function(category, message) {
		if (w.Locust.Logging.__LOG_SECONDARY)
			this._log("secondary", this.prepareMessage(category, message), 'color: ' + w.Locust.Logging.__LOG_SECONDARY_COLOR);
	};
	w.Locust.Logging.DOMLogger.prototype.success = function(category, message) {
		if (w.Locust.Logging.__LOG_SUCCESS)
			this._log("success", this.prepareMessage(category, message), 'color: ' + w.Locust.Logging.__LOG_SUCCESS_COLOR);
	};
	w.Locust.Logging.DOMLogger.prototype.alert = function(category, message) {
		if (w.Locust.Logging.__LOG_ALERT)
			this._log("alert", this.prepareMessage(category, message), 'color: ' + w.Locust.Logging.__LOG_ALERT_COLOR);
	};
	w.Locust.Logging.DOMLogger.prototype.warning = function(category, message) {
		if (w.Locust.Logging.__LOG_WARNING)
			this._log("warning", this.prepareMessage(category, message), 'color: ' + w.Locust.Logging.__LOG_WARNING_COLOR);
	};
	w.Locust.Logging.DOMLogger.prototype.danger = function(category, message) {
		if (w.Locust.Logging.__LOG_DANGER)
			this._log("danger", this.prepareMessage(category, message), 'color: ' + w.Locust.Logging.__LOG_DANGER_COLOR + ';font-weight:bold');
	};
	w.Locust.Logging.DOMLogger.prototype.fail = function(category, message) {
		if (w.Locust.Logging.__LOG_FAIL)
			this._log("fail", this.prepareMessage(category, message), 'color: ' + w.Locust.Logging.__LOG_FAIL_COLOR);
	};
	w.Locust.Logging.DOMLogger.prototype.abort = function(category, message) {
		if (w.Locust.Logging.__LOG_ABORT)
			this._log("abort", this.prepareMessage(category, message), 'color: ' + w.Locust.Logging.__LOG_ABORT_COLOR);
	};
	w.Locust.Logging.DOMLogger.prototype.cancel = function(category, message) {
		if (w.Locust.Logging.__LOG_CANCEL)
			this._log("cancel", this.prepareMessage(category, message), 'color: ' + w.Locust.Logging.__LOG_CANCEL_COLOR);
	};
	w.Locust.Logging.DOMLogger.prototype.suggest = function(category, message) {
		if (w.Locust.Logging.__LOG_SUGGEST)
			this._log("suggest", this.prepareMessage(category, message), 'color: ' + w.Locust.Logging.__LOG_SUGGEST_COLOR);
	};
	w.Locust.Logging.DOMLogger.prototype.trace = function(category, message) {
		if (w.Locust.Logging.__LOG_TRACE)
			this._log("trace", this.prepareMessage(category, message), 'color: ' + w.Locust.Logging.__LOG_TRACE_COLOR);
	};
	
	// ------------------------- helpers ----------------------------
	
	w.Locust.getLogger = function(logger) {
		var result = logger;
		var ok = true;
		var methods = ["trace","info","primary","secondary","success","alert","warning","danger","fail","abort","cancel","suggest"];
		
		if (!logger || typeof logger != "object") {
			ok = false;
		} else {
			for (var i = 0; i < methods.length; i++) {
				if (!logger[methods[i]] || typeof logger[methods[i]] != "function") {
					ok = false;
					break;
				}
			}
		}
		
		if (!ok) {
			result = new w.Locust.Logging.ConsoleLogger();
		}
			
		return result;
	};
})(__locustMainContext);

//================================= Locust.Extensions.Array =================================
(function(w) {
	function __error(msg) {
		if (w.console && w.console.error) {
			w.console.error(msg);
		} else {
			throw msg;
		}
	}
	if (!w) {
		throw "Locust.Extensions.Array: no context given (use 'Locust.Base.js')";
	}
	if (!w.Locust) {
		__error("Locust.Extensions.Array: Locust namespace not found (use 'Locust.Base.js')");
		return;
	}
	if (!w.Locust.Logging) {
		__error("Locust.Extensions.Array: Locust.Logging namespace not found (use 'Locust.Logging.js')");
		return;
	}
	var _logger = w.Locust.getLogger();
	// ------------------------ Array extensions -----------------------------//
	if (!w.Array.prototype.clone) {
		w.Array.prototype.clone = function () {
			return this.slice(0);
		}
	} else {
		_logger.warning("Locust.Extensions.Array", "warning: Array.prototype.clone already declared.");
	}
	// https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
	if (!w.Array.prototype.shuffle) {
		w.Array.prototype.shuffle = function () {
			var currentIndex = this.length, temporaryValue, randomIndex;

			// While there remain elements to shuffle...
			while (0 !== currentIndex) {

				// Pick a remaining element...
				randomIndex = w.Math.floor(w.Math.random() * currentIndex);
				currentIndex -= 1;

				// And swap it with the current element.
				temporaryValue = this[currentIndex];
				this[currentIndex] = this[randomIndex];
				this[randomIndex] = temporaryValue;
			}

			return this;
		}
	} else {
		_logger.warning("Locust.Extensions.Array", "warning: Array.prototype.shuffle already declared.");
	}
	if (!w.Array.prototype.insertAt) {
		w.Array.prototype.insertAt = function (index, item) {
			return this.splice(index, 0, item);
		}
	} else {
		_logger.warning("Locust.Extensions.Array", "warning: Array.prototype.insertAt already declared.");
	}
	if (!w.Array.prototype.removeAt) {
		w.Array.prototype.removeAt = function (index) {
			return this.splice(index, 1)[0];
		}
	} else {
		_logger.warning("Locust.Extensions.Array", "warning: Array.prototype.removeAt already declared.");
	}
	if (!w.Array.prototype.all) {
		w.Array.prototype.all = function (fn) {
			var result = true;
			if (!fn || typeof fn != "function") {
				throw "no function is given or the argument is not a function";
			} else {
				for (var i = 0; i < this.length; i++) {
					if (!fn(this[i])) {
						result = false;
						break;
					}
				}
			}
			return result;
		}
	} else {
		_logger.warning("Locust.Extensions.Array", "warning: Array.prototype.all already declared.");
	}
	if (!w.Array.prototype.any) {
		w.Array.prototype.any = function (fn) {
			var result = false;
			if (!fn || typeof fn != "function") {
				throw "no function is given or the argument is not a function";
			} else {
				for (var i = 0; i < this.length; i++) {
					if (!fn(this[i])) {
						result = true;
						break;
					}
				}
			}
			return result;
		}
	} else {
		_logger.warning("Locust.Extensions.Array", "warning: Array.prototype.any already declared.");
	}
})(__locustMainContext);
//================================= Locust.Extensions.Math =================================
(function(w) {
	function __error(msg) {
		if (w.console && w.console.error) {
			w.console.error(msg);
		} else {
			throw msg;
		}
	}
	if (!w) {
		throw "Locust.Extensions.Math: no context given (use 'Locust.Base.js')";
	}
	if (!w.Locust) {
		__error("Locust.Extensions.Math: Locust namespace not found (use 'Locust.Base.js')");
		return;
	}
	if (!w.Locust.Logging) {
		__error("Locust.Extensions.Array: Locust.Logging namespace not found (use 'Locust.Logging.js')");
		return;
	}
	
	var _logger = w.Locust.getLogger();
	
	if (!w.Math.roundBy) {
		w.Math.roundBy = function (n, decimalPlaces) {
			var scale = w.Math.pow(10, decimalPlaces);
			
			return w.Math.round(scale * n) / scale;
		}
	} else {
		_logger.warning("Locust.Extensions.Math", "Math.roundBy already declared.");
	}
	
	if (!w.Math.rand) {
		w.Math.rand = function(i, j) {
			return w.Math.floor(Math.random() * j) + 1;
		}
	} else {
		_logger.warning("Locust.Extensions.Math", "Math.rand already declared.");
	}
})(__locustMainContext);
//================================= Locust.Extensions.String =================================
(function(w) {
	function __error(msg) {
		if (w.console && w.console.error) {
			w.console.error(msg);
		} else {
			throw msg;
		}
	};
	if (!w) {
		throw "Locust.Extensions.String: no context given (use 'Locust.Base.js')";
	}
	if (!w.Locust) {
		__error("Locust.Extensions.String: Locust namespace not found (use 'Locust.Base.js')");
		return;
	}
	if (!w.Locust.Logging) {
		__error("Locust.Extensions.Array: Locust.Logging namespace not found (use 'Locust.Logging.js')");
		return;
	}
	var _logger = w.Locust.getLogger();
	// ------------------------ String extensions -----------------------------//
	w.StringSplitOptions =
	{
		None: 0,
		RemoveEmptyEntries: 1,
		TrimEntries: 2,
		TrimAndRemoveEmptyEntries: 3,
		ToLowerEntries: 4,
		TrimToLowerAndRemoveEmptyEntries: 5,
		ToUpperEntries: 6,
		TrimToUpperAndRemoveEmptyEntries: 7
	};
	
	if (!w.String.prototype.replaceAll) {
		w.String.prototype.replaceAll = function (find, replace) {
			var str = this;
			return str.replace(new RegExp(find.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&'), 'g'), replace);
		}
	} else {
		_logger.warning("Locust.Extensions.String", "String.prototype.replaceAll already declared.");
	}
	
	if (!w.String.prototype.reverse) {
		w.String.prototype.reverse = function () {
			return this.split("").reverse().join("");
		}
	} else {
		_logger.warning("Locust.Extensions.String", "String.prototype.reverse already declared.");
	}
	
	if (!w.String.prototype.ltrim) {
		w.String.prototype.ltrim = function () {
			return this.replace(/^\s+/, '');
		}
	} else {
		_logger.warning("Locust.Extensions.String", "String.prototype.ltrim already declared.");
	}
	
	if (!w.String.prototype.rtrim) {
		w.String.prototype.rtrim = function () {
			return this.replace(/\s+$/, '');
		}
	} else {
		_logger.warning("Locust.Extensions.String", "String.prototype.rtrim already declared.");
	}
	
	if (!w.String.prototype.toBytes) {
		w.String.prototype.toBytes = function () {
			var data = [];
			for (var i = 0; i < this.length; i++) {
				data.push(this.charCodeAt(i));
			}
			return data;
		}
	} else {
		_logger.warning("Locust.Extensions.String", "String.prototype.toBytes already declared.");
	}
	
	if (!w.String.prototype.format) {
		w.String.prototype.format = function (values) {
			var s = this;

			if (w.Array.isArray(values)) {
				var i = 0;
				values.forEach(function (value) {
					s = s.replaceAll("{" + i + "}", value);
					i++;
				})
			} else {
				for (var key in values) {
					s = s.replaceAll("{" + key + "}", values[key]);
				}
			}

			return s;
		}
	} else {
		_logger.warning("Locust.Extensions.String", "String.prototype.format already declared.");
	}
	
	if (!w.String.prototype.isPunctuation) {
		w.String.prototype.isPunctuation = function () {
			var __punctutationChars = ".,;:?!()-'\"/\\{}[]%#";

			return this.length == 1 && (__punctutationChars.indexOf(this) >= 0);
		}
	} else {
		_logger.warning("Locust.Extensions.String", "String.prototype.isPunctuation already declared.");
	}
	
	if (!w.String.prototype.isControl) {
		w.String.prototype.isControl = function () {
			var __chars = "~!@#$%^&*()_+|<>?:\"{}[];',./-=\\`";

			return this.length == 1 && (__chars.indexOf(this) >= 0);
		}
	} else {
		_logger.warning("Locust.Extensions.String", "String.prototype.isControl already declared.");
	}
	
	if (!w.String.prototype.isAlpha) {
		w.String.prototype.isAlpha = function () {
			return this.match(/^[a-z]+$/i) !== null;
		}
	} else {
		_logger.warning("Locust.Extensions.String", "String.prototype.isAlpha already declared.");
	}
	
	
	if (!w.String.prototype.isLetter) {
		w.String.prototype.isLetter = function () {
			return this.isAlpha();
		}
	} else {
		_logger.warning("Locust.Extensions.String", "String.prototype.isLetter already declared.");
	}
	
	if (!w.String.prototype.isLower) {
		w.String.prototype.isLower = function () {
			return this.match(/^[a-z]+$/) !== null;
		}
	} else {
		_logger.warning("Locust.Extensions.String", "String.prototype.isLower already declared.");
	}
	
	if (!w.String.prototype.isUpper) {
		w.String.prototype.isUpper = function () {
			return this.match(/^[A-Z]+$/) !== null;
		}
	} else {
		_logger.warning("Locust.Extensions.String", "String.prototype.isUpper already declared.");
	}
	
	if (!w.String.prototype.isDigit) {
		w.String.prototype.isDigit = function () {
			return this.match(/^[0-9]+$/) !== null;
		}
	} else {
		_logger.warning("Locust.Extensions.String", "String.prototype.isDigit already declared.");
	}
	
	if (!w.String.prototype.isAlphaNum) {
		w.String.prototype.isAlphaNum = function () {
			return this.match(/^[a-z0-9]+$/i) !== null;
		}
	} else {
		_logger.warning("Locust.Extensions.String", "String.prototype.isAlphaNum already declared.");
	}
	
	if (!w.String.prototype.isArithmatic) {
		w.String.prototype.isArithmatic = function () {
			var __chars = "/\\+-()%^*";
			var result = true;
			
			for (var i = 0; i < this.length; i++) {
				if (__chars.indexOf(this[i]) == -1) {
					result = false;
					break;
				}
			}
			return result && this.length;
		}
	} else {
		_logger.warning("Locust.Extensions.String", "String.prototype.isArithmatic already declared.");
	}
	
	if (!w.String.prototype.isLogic) {
		w.String.prototype.isLogic = function () {
			var __items = ["&&", "||", "!"];

			return (this.length == 1 || this.length == 2) && (__items.indexOf(this) >= 0);
		}
	} else {
		_logger.warning("Locust.Extensions.String", "String.prototype.isLogic already declared.");
	}
	
	if (!w.String.prototype.isBitwise) {
		w.String.prototype.isBitwise = function () {
			var __items = ["&", "|", ">>", "<<"];

			return (this.length == 1 || this.length == 2) && (__items.indexOf(this) >= 0);
		}
	} else {
		_logger.warning("Locust.Extensions.String", "String.prototype.isBitwise already declared.");
	}
	
	if (!w.String.prototype.isComparison) {
		w.String.prototype.isComparison = function () {
			var __items = ["==", "!=", "<>", ">", "<", ">=", "<="];

			return (this.length == 1 || this.length == 2) && (__items.indexOf(this) >= 0);
		}
	} else {
		_logger.warning("Locust.Extensions.String", "String.prototype.isComparison already declared.");
	}
	
	if (!w.String.prototype.isWhitespace) {
		w.String.prototype.isWhitespace = function () {
			return this.length == 1 && (this == '\r' || this == '\n' || this == ' ' || this == '\t' || this == '\v');
		}
	} else {
		_logger.warning("Locust.Extensions.String", "String.prototype.isWhitespace already declared.");
	}
	
	if (!w.String.prototype.isMath) {
		w.String.prototype.isMath = function () {
			return this.isArithmatic() || this.isLogic() || this.isBitwise() || this.isComparison();
		}
	} else {
		_logger.warning("Locust.Extensions.String", "String.prototype.isMath already declared.");
	}
	
	if (!w.String.prototype.splitString) {
		w.String.prototype.splitString = function (separator, splitOptions) {
			var result = [];
			var arr = this.split(separator);
			i = 0;
			while (i < arr.length) {
				var _item;
				var item = arr[i++];
				switch (splitOptions) {
					case w.StringSplitOptions.RemoveEmptyEntries: if (item) result.push(item); break;
					case w.StringSplitOptions.TrimEntries: result.push((item || "").trim()); break;
					case w.StringSplitOptions.TrimAndRemoveEmptyEntries:
						_item = (item || "").toString().trim();
						if (_item)
							result.push(_item);
						break;
					case w.StringSplitOptions.ToLowerEntries: result.push((item || "").toString().toLowerCase()); break;
					case w.StringSplitOptions.TrimToLowerAndRemoveEmptyEntries:
						_item = (item || "").toString().trim().toLowerCase();
						if (_item)
							result.push(_item);
						break;
					case w.StringSplitOptions.ToUpperEntries: result.push((item || "").toString().toUpperCase()); break;
					case w.StringSplitOptions.TrimToUpperAndRemoveEmptyEntries:
						_item = (item || "").toString().trim().toUpperCase();
						if (_item)
							result.push(_item);
						break;
					default: result.push(item); break;
				}
			}
			return result;
		}
	} else {
		_logger.warning("Locust.Extensions.String", "String.prototype.splitString already declared.");
	}
})(__locustMainContext);
//================================= Locust.Bootstrap =================================
(function (w) {
	function __error(msg) {
		if (w.console && w.console.error) {
			w.console.error(msg);
		} else {
			throw msg;
		}
	}
	if (!w) {
        throw "Locust.Bootstrap: no context given (use 'Locust.Base.js')";
    }
    if (!w.Locust) {
		__error("Locust.Bootstrap: Locust namespace not found (use 'Locust.Base.js')");
		return;
    }
	if (!w.jQuery) {
        __error("Locust.Bootstrap: jQuery library not found");
        return;
    }
    var __modal_cnt = 0;
    var __btn_cnt = 0;

    function _validateDisplay(display) {
        return display == "default" || display == "primary" || display == "success" || display == "info" || display == "danger" || display == "warning";
    }
    function _validateSize(size) {
        return size == "xs" || size == "sm" || size == "lg";
    }
    function __createButton(config) {
        var result = "";
        var _config = w.jQuery.extend({
            id: "",
            autoid: false,
            text: "Submit",
            title: "",
            display: "default",     // default, primary, success, info, danger, warning
            size: "",               // xs, sm, lg
            "class": "",
            style: "",
            type: "button"          // button, submit
        }, config);

        var autoGeneratedId = false;
        var __id = "";

        if (_config.id) {
            if (w.jQuery("#" + _config.id).length && _config.autoid) {
                _config.id += __btn_cnt++;
                autoGeneratedId = true;
            }

            __id = " id='" + _config.id + "'";
        }

        if (_validateDisplay(_config.display)) {
            _config.display = " btn-" + _config.display;
        }
        if (_validateSize(_config.size)) {
            _config.size = " btn-" + _config.size;
        }
        if (_config.style) {
            _config.style = " style=\"" + _config.style + "\"";
        }
        if (_config.type) {
            _config.type = " type=\"" + _config.type + "\"";
        }
        if (_config.title) {
            _config.title = " title=\"" + _config.title + "\"";
        }
        if (_config["class"]) {
            _config["class"] = " " + _config["class"];
        }

        var _other_attributes = "";

        for (var key in _config) {
            if (_config.hasOwnProperty(key)) {
                _other_attributes += key + "=\"" + _config[key] + "\"";
            }
        };

        result += "<button" + __id + " class=\"btn" + _config.display + _config.size + _config["class"] + "\" " + _config.style + _config.type + _config.title + _other_attributes + ">" + _config.text + "</button>";

        return { html: result, autoGeneratedId: autoGeneratedId, id: _config.id };
    }
    function __createModal(config) {
        var result = "";
        var _config = w.jQuery.extend({
            id: "",
            autoid: false,
            title: "",
            body: "",
            footer: "",
            size: "",
            keyboard: true
        }, config);

        var autoGeneratedId = false;

        if (!_config.id) {
            _config.id = "modal-" + __modal_cnt++;
            autoGeneratedId = true;
        } else {
            if (w.jQuery("#" + _config.id).length && _config.autoid) {
                _config.id += __modal_cnt++;
                autoGeneratedId = true;
            }
        }

        _config.size = (_validateSize(_config.size)) ? "modal-" + _config.size : "";

        result =
"<div id='" + _config.id + "' class='modal fade' tabindex='-1' role='dialog' aria-labelledby='" + _config.id + "Label'>" +
"	<div class='modal-dialog " + _config.size + "' role='document'>" +
"		<div class='modal-content'>" +
"			<div class='modal-header'>" +
"				<button type='button' class='close' data-dismiss='modal' aria-label='Close'><span aria-hidden='true'>×</span></button>" +
"				<h4 class='modal-title'>{" + _config.title + "}</h4>" +
"			</div>" +
"			<div class='modal-body'>" +
"				<p>" + _config.body + "</p>" +
"			</div>" +
"			<div class='modal-footer" + (_config.footer ? "" : " hidden") + "'>" +
"				" + _config.footer +
"			</div>" +
"		</div>" +
"	</div>" +
"</div>";

        return { html: result, autoGeneratedId: autoGeneratedId, id: _config.id };
    }
    function __appendModal(_config) {
        var result = { };
        
        if (w.jQuery("#" + _config.id).length == 0) {
            result = __createModal(_config);

            w.jQuery("body").append(result.html);

            result.alreadyCreated = false;
        } else {
            result.alreadyCreated = true;
        }

        return result;
    }

    function __prepareModal(_config) {
        w.jQuery("#" + _config.id + " h4.modal-title").html(_config.title);
        w.jQuery("#" + _config.id + " div.modal-body").html(_config.content);
        w.jQuery("#" + _config.id + " div.modal-footer").removeClass("hidden").html(_config.footer);

        w.jQuery("#" + _config.id).modal({
            backdrop: _config.backdrop,
            keyboard: _config.keyboard
        });
    }

    if (!w.$$.Bootstrap) {
        w.$$.Bootstrap = {};
    }
    if (!w.$$.Bootstrap.confirm || typeof w.$$.Bootstrap.confirm != "function") {
        w.$$.Bootstrap.confirm = function (config) {
            function _processButtonsString(buttons) {
                var _result = "";
                var arr = buttons.split(',');

                w.jQuery(arr).each(function (i, item) {
                    var _props = item.split(':');
                    var _txt = _props[0].trim();

                    if (_props.length > 1) {
                        var _id = "";
                        var _display = "default";
                        var _size = "";
                        var _dismiss = "";

                        w.jQuery(_props).each(function (i, x) {
                            x = x.trim();

                            if (x == "xs" || x == "sm" || x == "lg") {
                                _size = x;
                            } else if (x == "default" || x == "primary" || x == "info" || x == "success" || x == "danger" || x == "warning") {
                                _display = x;
                            } else if (x == "dismiss") {
                                _dismiss = "modal";
                            } else {
                                _id = x;
                            }
                        });
                    }
                    
                    _result += __createButton({ text: _txt, id: _id, display: _display, size: _size, "data-dismiss": _dismiss }).html;
                });

                return _result;
            }
            var _config = w.jQuery.extend({
                id: "",
                title: "",
                body: "",
                size: "",
                buttons: "",
                footer: "",
                keyboard: false,
                backdrop: 'static'
            }, config);

            if (_config.buttons) {
                if (typeof _config.buttons == "string") {
                    _config.footer = _processButtonsString(_config.buttons);
                } else if (w.jQuery.isArray(_config.buttons)) {
                    _config.footer = "";
                    w.jQuery(_config.buttons).each(function (i, btn) {
                        _config.footer += __createButton(btn).html;
                    });
                }
            }

            var result = __appendModal(_config);

            __prepareModal(_config);

            return result;
        }
    }

    if (!w.$$.Bootstrap.modal || typeof w.$$.Bootstrap.modal != "function") {
        w.$$.Bootstrap.modal = function (config) {
            var _config = w.jQuery.extend({
                id: "",
                title: "",
                body: "",
                footer: "",
                size: "",
                keyboard: true
            }, config);

            var result = __appendModal(_config);

            __prepareModal(_config);

            return result;
        }
    }

    if (!w.$$.Bootstrap.Button || typeof w.$$.Bootstrap.Button != "function") {
        w.$$.Bootstrap.Button = __createButton;
    }
    if (!w.$$.Bootstrap.Modal || typeof w.$$.Bootstrap.Modal != "function") {
        w.$$.Bootstrap.Modal = __createModal;
    }

    // ------------ fix multiple modals ----------------
	// solution 1
    // source:	https://www.bootply.com/elez9J62fk
    w.jQuery(document).on('show.bs.modal', '.modal', function () {
        var zIndex = calculateZIndex();

        w.jQuery(this).css('z-index', zIndex);

        setTimeout(function () {
            w.jQuery('.modal-backdrop').not('.modal-stack').css('z-index', zIndex - 1).addClass('modal-stack');
        }, 0);
    })
    w.jQuery(document).on('hidden.bs.modal', '.modal', function () {
        w.jQuery('.modal:visible').length && w.jQuery(document.body).addClass('modal-open');
    })
    function calculateZIndex() {
        var zIndex = Math.max.apply(null, Array.prototype.map.call(document.querySelectorAll('*'), function (el) {
            return +el.style.zIndex;
        })) + 10;

        return zIndex;
    }
})(__locustMainContext);

//================================= Locust.Compression =================================
(function (w) {
	function __error(msg) {
		if (w.console && w.console.error) {
			w.console.error(msg);
		} else {
			throw msg;
		}
	}
	if (!w) {
        throw "Locust.Compression: no context given (use 'Locust.Base.js')";
    }
    if (!w.Locust) {
		__error("Locust.Compression: Locust namespace not found (use 'Locust.Base.js')");
		return;
    }
	if (!w.Locust.Logging) {
		__error("Locust.Compression: Locust.Logging namespace not found (use 'Locust.Logging.js')");
		return;
	}
	if (!w.jQuery) {
        __error("Locust.Compression: jQuery library not found");
        return;
    }
    if (!w.Locust.Compression) {
        w.Locust.Compression = {};
    }
    w.Locust.Compression.ZLibCompression = function (config) {
        var _self = this;
        var _name = "Locust.Compression.ZLibCompression";
        var _config = w.jQuery.extend({
            logger: null
        }, config);

        _config.logger = w.Locust.getLogger(_config.logger);

        _self.compressString = function (rawStr) {
            if (!pako) {
                _config.logger.fail(_name, "compressString(): pako library not loaded.");
                _config.logger.suggest(_name, "https://www.npmjs.com/package/pako");
				
                return "";
            }
            return pako.deflate(rawStr, { to: 'string' })
        }
        _self.decompressString = function (compressedStr) {
            if (!pako) {
                _config.logger.fail(_name, "decompressString(): pako library not loaded.");
				_config.logger.suggest(_name, "https://www.npmjs.com/package/pako");
				
                return "";
            }
            return pako.inflate(compressedStr, { to: 'string' });
        }
    }
})(__locustMainContext);

//================================= Locust.Cryptography =================================
(function (w) {
    function __error(msg) {
		if (w.console && w.console.error) {
			w.console.error(msg);
		} else {
			throw msg;
		}
	}
	
	if (!w) {
        throw "Locust.Cryptography: no context given (use 'Locust.Base.js')";
    }
    if (!w.Locust) {
		__error("Locust.Cryptography: Locust namespace not found (use 'Locust.Base.js')");
		return;
    }
	if (!w.Locust.Logging) {
		__error("Locust.Cryptography: Locust.Logging namespace not found (use 'Locust.Logging.js')");
		return;
	}
	if (!w.jQuery) {
        __error("Locust.Cryptography: jQuery library not found");
        return;
    }
	if (!w.Locust.Cryptography) {
        w.Locust.Cryptography = {};
    }
	// source: https://jsfiddle.net/orlovsky/sxk584d6/
    // with a little alteration regarding salt and also applying Base64 to encrypt/decrypt
    // requires: js-base64
    w.Locust.Cryptography.XorCrypt = function (config) {
		var _self = this;
        var _config = w.jQuery.extend({ base64: true, logger: null }, config);
		
        _config.logger = w.Locust.getLogger(_config.logger);
		
		if (_config.base64 && !w.Base64) {
			_config.logger.fail("Locust.Cryptography.XorCrypt", "js-base64 library not found.");
			_config.logger.suggest("Locust.Cryptography.XorCrypt", "https://www.npmjs.com/package/js-base64");
			
			return;
		}
		
        function keyCharAt(key, i) {
            return key.charCodeAt(w.Math.floor(i % key.length));
        }

        _self.encrypt = function (str, key) {
            var result = "";
			
            for (var i = 0; i < str.length; i++) {
                result += w.String.fromCharCode(keyCharAt(key, i) ^ str.charCodeAt(i));
            }
			
            if (_config.base64)
                return w.Base64.encode(result);
            else
                return result;
        }

        _self.decrypt = function (hash, key) {
            var result = "";
			
            _hash = _config.base64 ? w.Base64.decode(hash) : hash;
			
            for (var i = 0; i < _hash.length; i++) {
                result += w.String.fromCharCode(keyCharAt(key, i) ^ _hash.charCodeAt(i));
            }
			
            return result;
        }
    }
})(__locustMainContext);

//================================= Locust.Form =================================
(function (w) {
    function __error(msg) {
		if (w.console && w.console.error) {
			w.console.error(msg);
		} else {
			throw msg;
		}
	}
	if (!w) {
        throw "Locust.Form: no context given (use 'Locust.Base.js')";
    }
    if (!w.Locust) {
		__error("Locust.Form: Locust namespace not found (use 'Locust.Base.js')");
		return;
    }
	if (!w.Locust.Logging) {
		__error("Locust.Form: Locust.Logging namespace not found (use 'Locust.Logging.js')");
		return;
	}
	if (!w.jQuery) {
        __error("Locust.Form: jQuery library not found");
        return;
    }
    if (!w.Locust.Form) {
        w.Locust.Form = {};
    }
    Locust.Form.post = function (url, args) {
        var f = w.jQuery("form").attr('method', 'POST').attr('action', url).insertAfter(w.jQuery("body"));
        w.jQuery.each(args, function (propName, propValue) {
            w.jQuery('<input>').attr('type', 'hidden').attr('name', propName).val(propValue).appendTo(f);
        });
        f.submit();
    }
})(__locustMainContext);

//================================= Locust.Hash =================================
(function (w) {
    function __error(msg) {
		if (w.console && w.console.error) {
			w.console.error(msg);
		} else {
			throw msg;
		}
	}
	if (!w) {
        throw "Locust.Page: no context given (use 'Locust.Base.js')";
    }
    if (!w.Locust) {
		__error("Locust.Page: Locust namespace not found (use 'Locust.Base.js')");
		return;
    }
    if (!w.Locust.Page) {
        w.Locust.Page = {}
    }

    w.Locust.Page.HashClass = function (paramSeparator, keyValueSeparator) {
		var _self = this;
        var hash = {};
        var generateHash = function (arg) {
            var result = "";
            for (var property in arg) {
                if (arg.hasOwnProperty(property)) {
                    result += paramSeparator + property + keyValueSeparator + arg[property];
                }
            }
            return result.substr(1);
        }
        var getHash = function () {
            return w.location.hash;
        }
        var setHash = function (arg) {
            w.location.hash = arg;
        }
        if (!paramSeparator) {
            paramSeparator = '&';
        }
        if (!keyValueSeparator) {
            keyValueSeparator = '=';
        }

        getHash().substr(1).split(paramSeparator).forEach(function (item, index) {
            var i = item.indexOf(keyValueSeparator);
            if (i > 0) {
                hash[item.substr(0, i).trim()] = item.substr(i + 1).trim();
            } else {
                var key = item.replace(keyValueSeparator, "");
                if (key) {
                    hash[key] = "";
                }
            }
        });
        _self.getString = function () {
            return generateHash(hash);
        };
        _self.get = function (arg) {
            if (typeof arg == "undefined") {
                return hash;
            }
            if (typeof arg == 'string') {
                return hash[arg];
            }
            if (typeof arg == 'number') {
                var i = 0;
                for (var property in hash) {
                    if (hash.hasOwnProperty(property)) {
                        if (arg == i++) {
                            return hash[property];
                        }
                    }
                }

                return "";
            }
        };
        _self.set = function (key, value) {
            if (value) {
                if (key) {
                    hash[key] = value;
                    setHash(generateHash(hash));
					
                    return getHash();
                } else {
                    return null;
                }
            }
            if (typeof key == 'string') {
                hash[key] = "";
                setHash(generateHash(hash));
				
                return getHash();
            }
            if (typeof key == 'object') {
                hash = key;
                setHash(generateHash(key));
				
                return getHash();
            }
        };
    }

    w.Locust.Page.Hash = new w.Locust.Page.HashClass();
})(__locustMainContext);

//================================= Locust.Mime =================================
(function (w) {
    function __error(msg) {
		if (w.console && w.console.error) {
			w.console.error(msg);
		} else {
			throw msg;
		}
	}
	if (!w) {
        throw "Locust.Mime: no context given (use 'Locust.Base.js')";
    }
    if (!w.Locust) {
		__error("Locust.Mime: Locust namespace not found (use 'Locust.Base.js')");
		return;
    }
    
    var __mimes;
    var __mimeTypes;

    // disclaimer: I obtained this mime list some years ago. I cannot remember from where.

    // we don't fill __mimes & __mimeTypes not to waste memory.
    // these variables are only initialized at first call to getMime().
    function _initMimes() {
        __mimes = [
              { "id": 1, "source": "iana", "value": "application/1d-interleaved-parityfec", "compressible": false, "charSet": "UTF-8", "extensions": "" }
            , { "id": 2, "source": "iana", "value": "application/3gpdash-qoe-report+xml", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 3, "source": "iana", "value": "application/3gpp-ims+xml", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 4, "source": "iana", "value": "application/a2l", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 5, "source": "iana", "value": "application/activemessage", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 6, "source": "iana", "value": "application/alto-costmap+json", "compressible": true, "charSet": "", "extensions": "" }
            , { "id": 7, "source": "iana", "value": "application/alto-costmapfilter+json", "compressible": true, "charSet": "", "extensions": "" }
            , { "id": 8, "source": "iana", "value": "application/alto-directory+json", "compressible": true, "charSet": "", "extensions": "" }
            , { "id": 9, "source": "iana", "value": "application/alto-endpointcost+json", "compressible": true, "charSet": "", "extensions": "" }
            , { "id": 10, "source": "iana", "value": "application/alto-endpointcostparams+json", "compressible": true, "charSet": "", "extensions": "" }
            , { "id": 11, "source": "iana", "value": "application/alto-endpointprop+json", "compressible": true, "charSet": "", "extensions": "" }
            , { "id": 12, "source": "iana", "value": "application/alto-endpointpropparams+json", "compressible": true, "charSet": "", "extensions": "" }
            , { "id": 13, "source": "iana", "value": "application/alto-error+json", "compressible": true, "charSet": "", "extensions": "" }
            , { "id": 14, "source": "iana", "value": "application/alto-networkmap+json", "compressible": true, "charSet": "", "extensions": "" }
            , { "id": 15, "source": "iana", "value": "application/alto-networkmapfilter+json", "compressible": true, "charSet": "", "extensions": "" }
            , { "id": 16, "source": "iana", "value": "application/aml", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 17, "source": "iana", "value": "application/andrew-inset", "compressible": false, "charSet": "", "extensions": "ez" }
            , { "id": 18, "source": "iana", "value": "application/applefile", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 19, "source": "apache", "value": "application/applixware", "compressible": false, "charSet": "", "extensions": "aw" }
            , { "id": 20, "source": "iana", "value": "application/atf", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 21, "source": "iana", "value": "application/atfx", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 22, "source": "iana", "value": "application/atom+xml", "compressible": true, "charSet": "", "extensions": "atom" }
            , { "id": 23, "source": "iana", "value": "application/atomcat+xml", "compressible": false, "charSet": "", "extensions": "atomcat" }
            , { "id": 24, "source": "iana", "value": "application/atomdeleted+xml", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 25, "source": "iana", "value": "application/atomicmail", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 26, "source": "iana", "value": "application/atomsvc+xml", "compressible": false, "charSet": "", "extensions": "atomsvc" }
            , { "id": 27, "source": "iana", "value": "application/atxml", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 28, "source": "iana", "value": "application/auth-policy+xml", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 29, "source": "iana", "value": "application/bacnet-xdd+zip", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 30, "source": "iana", "value": "application/batch-smtp", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 31, "source": "", "value": "application/bdoc", "compressible": false, "charSet": "", "extensions": "bdoc" }
            , { "id": 32, "source": "iana", "value": "application/beep+xml", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 33, "source": "iana", "value": "application/calendar+json", "compressible": true, "charSet": "", "extensions": "" }
            , { "id": 34, "source": "iana", "value": "application/calendar+xml", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 35, "source": "iana", "value": "application/call-completion", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 36, "source": "iana", "value": "application/cals-1840", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 37, "source": "iana", "value": "application/cbor", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 38, "source": "iana", "value": "application/ccmp+xml", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 39, "source": "iana", "value": "application/ccxml+xml", "compressible": false, "charSet": "", "extensions": "ccxml" }
            , { "id": 40, "source": "iana", "value": "application/cdfx+xml", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 41, "source": "iana", "value": "application/cdmi-capability", "compressible": false, "charSet": "", "extensions": "cdmia" }
            , { "id": 42, "source": "iana", "value": "application/cdmi-container", "compressible": false, "charSet": "", "extensions": "cdmic" }
            , { "id": 43, "source": "iana", "value": "application/cdmi-domain", "compressible": false, "charSet": "", "extensions": "cdmid" }
            , { "id": 44, "source": "iana", "value": "application/cdmi-object", "compressible": false, "charSet": "", "extensions": "cdmio" }
            , { "id": 45, "source": "iana", "value": "application/cdmi-queue", "compressible": false, "charSet": "", "extensions": "cdmiq" }
            , { "id": 46, "source": "iana", "value": "application/cdni", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 47, "source": "iana", "value": "application/cea", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 48, "source": "iana", "value": "application/cea-2018+xml", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 49, "source": "iana", "value": "application/cellml+xml", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 50, "source": "iana", "value": "application/cfw", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 51, "source": "iana", "value": "application/cms", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 52, "source": "iana", "value": "application/cnrp+xml", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 53, "source": "iana", "value": "application/coap-group+json", "compressible": true, "charSet": "", "extensions": "" }
            , { "id": 54, "source": "iana", "value": "application/commonground", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 55, "source": "iana", "value": "application/conference-info+xml", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 56, "source": "iana", "value": "application/cpl+xml", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 57, "source": "iana", "value": "application/csrattrs", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 58, "source": "iana", "value": "application/csta+xml", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 59, "source": "iana", "value": "application/cstadata+xml", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 60, "source": "iana", "value": "application/csvm+json", "compressible": true, "charSet": "", "extensions": "" }
            , { "id": 61, "source": "apache", "value": "application/cu-seeme", "compressible": false, "charSet": "", "extensions": "cu" }
            , { "id": 62, "source": "iana", "value": "application/cybercash", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 63, "source": "", "value": "application/dart", "compressible": true, "charSet": "", "extensions": "" }
            , { "id": 64, "source": "iana", "value": "application/dash+xml", "compressible": false, "charSet": "", "extensions": "mpd" }
            , { "id": 65, "source": "iana", "value": "application/dashdelta", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 66, "source": "iana", "value": "application/davmount+xml", "compressible": false, "charSet": "", "extensions": "davmount" }
            , { "id": 67, "source": "iana", "value": "application/dca-rft", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 68, "source": "iana", "value": "application/dcd", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 69, "source": "iana", "value": "application/dec-dx", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 70, "source": "iana", "value": "application/dialog-info+xml", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 71, "source": "iana", "value": "application/dicom", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 72, "source": "iana", "value": "application/dii", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 73, "source": "iana", "value": "application/dit", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 74, "source": "iana", "value": "application/dns", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 75, "source": "apache", "value": "application/docbook+xml", "compressible": false, "charSet": "", "extensions": "dbk" }
            , { "id": 76, "source": "iana", "value": "application/dskpp+xml", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 77, "source": "iana", "value": "application/dssc+der", "compressible": false, "charSet": "", "extensions": "dssc" }
            , { "id": 78, "source": "iana", "value": "application/dssc+xml", "compressible": false, "charSet": "", "extensions": "xdssc" }
            , { "id": 79, "source": "iana", "value": "application/dvcs", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 80, "source": "iana", "value": "application/ecmascript", "compressible": true, "charSet": "", "extensions": "ecma" }
            , { "id": 81, "source": "iana", "value": "application/edi-consent", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 82, "source": "iana", "value": "application/edi-x12", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 83, "source": "iana", "value": "application/edifact", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 84, "source": "iana", "value": "application/efi", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 85, "source": "iana", "value": "application/emergencycalldata.comment+xml", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 86, "source": "iana", "value": "application/emergencycalldata.deviceinfo+xml", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 87, "source": "iana", "value": "application/emergencycalldata.providerinfo+xml", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 88, "source": "iana", "value": "application/emergencycalldata.serviceinfo+xml", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 89, "source": "iana", "value": "application/emergencycalldata.subscriberinfo+xml", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 90, "source": "iana", "value": "application/emma+xml", "compressible": false, "charSet": "", "extensions": "emma" }
            , { "id": 91, "source": "iana", "value": "application/emotionml+xml", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 92, "source": "iana", "value": "application/encaprtp", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 93, "source": "iana", "value": "application/epp+xml", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 94, "source": "iana", "value": "application/epub+zip", "compressible": false, "charSet": "", "extensions": "epub" }
            , { "id": 95, "source": "iana", "value": "application/eshop", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 96, "source": "iana", "value": "application/exi", "compressible": false, "charSet": "", "extensions": "exi" }
            , { "id": 97, "source": "iana", "value": "application/fastinfoset", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 98, "source": "iana", "value": "application/fastsoap", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 99, "source": "iana", "value": "application/fdt+xml", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 100, "source": "iana", "value": "application/fits", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 101, "source": "iana", "value": "application/font-sfnt", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 102, "source": "iana", "value": "application/font-tdpfr", "compressible": false, "charSet": "", "extensions": "pfr" }
            , { "id": 103, "source": "iana", "value": "application/font-woff", "compressible": false, "charSet": "", "extensions": "woff" }
            , { "id": 104, "source": "", "value": "application/font-woff2", "compressible": false, "charSet": "", "extensions": "woff2" }
            , { "id": 105, "source": "iana", "value": "application/framework-attributes+xml", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 106, "source": "apache", "value": "application/gml+xml", "compressible": false, "charSet": "", "extensions": "gml" }
            , { "id": 107, "source": "apache", "value": "application/gpx+xml", "compressible": false, "charSet": "", "extensions": "gpx" }
            , { "id": 108, "source": "apache", "value": "application/gxf", "compressible": false, "charSet": "", "extensions": "gxf" }
            , { "id": 109, "source": "iana", "value": "application/gzip", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 110, "source": "iana", "value": "application/h224", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 111, "source": "iana", "value": "application/held+xml", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 112, "source": "iana", "value": "application/http", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 113, "source": "iana", "value": "application/hyperstudio", "compressible": false, "charSet": "", "extensions": "stk" }
            , { "id": 114, "source": "iana", "value": "application/ibe-key-request+xml", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 115, "source": "iana", "value": "application/ibe-pkg-reply+xml", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 116, "source": "iana", "value": "application/ibe-pp-data", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 117, "source": "iana", "value": "application/iges", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 118, "source": "iana", "value": "application/im-iscomposing+xml", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 119, "source": "iana", "value": "application/index", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 120, "source": "iana", "value": "application/index.cmd", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 121, "source": "iana", "value": "application/index.obj", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 122, "source": "iana", "value": "application/index.response", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 123, "source": "iana", "value": "application/index.vnd", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 124, "source": "iana", "value": "application/inkml+xml", "compressible": false, "charSet": "", "extensions": "ink, inkml" }
            , { "id": 125, "source": "iana", "value": "application/iotp", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 126, "source": "iana", "value": "application/ipfix", "compressible": false, "charSet": "", "extensions": "ipfix" }
            , { "id": 127, "source": "iana", "value": "application/ipp", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 128, "source": "iana", "value": "application/isup", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 129, "source": "iana", "value": "application/its+xml", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 130, "source": "apache", "value": "application/java-archive", "compressible": false, "charSet": "", "extensions": "jar, war, ear" }
            , { "id": 131, "source": "apache", "value": "application/java-serialized-object", "compressible": false, "charSet": "", "extensions": "ser" }
            , { "id": 132, "source": "apache", "value": "application/java-vm", "compressible": false, "charSet": "", "extensions": "class" }
            , { "id": 133, "source": "iana", "value": "application/javascript", "compressible": true, "charSet": "UTF-8", "extensions": "js" }
            , { "id": 134, "source": "iana", "value": "application/jose", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 135, "source": "iana", "value": "application/jose+json", "compressible": true, "charSet": "", "extensions": "" }
            , { "id": 136, "source": "iana", "value": "application/jrd+json", "compressible": true, "charSet": "", "extensions": "" }
            , { "id": 137, "source": "iana", "value": "application/json", "compressible": true, "charSet": "UTF-8", "extensions": "json, map" }
            , { "id": 138, "source": "iana", "value": "application/json-patch+json", "compressible": true, "charSet": "", "extensions": "" }
            , { "id": 139, "source": "iana", "value": "application/json-seq", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 140, "source": "", "value": "application/json5", "compressible": false, "charSet": "", "extensions": "json5" }
            , { "id": 141, "source": "apache", "value": "application/jsonml+json", "compressible": true, "charSet": "", "extensions": "jsonml" }
            , { "id": 142, "source": "iana", "value": "application/jwk+json", "compressible": true, "charSet": "", "extensions": "" }
            , { "id": 143, "source": "iana", "value": "application/jwk-set+json", "compressible": true, "charSet": "", "extensions": "" }
            , { "id": 144, "source": "iana", "value": "application/jwt", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 145, "source": "iana", "value": "application/kpml-request+xml", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 146, "source": "iana", "value": "application/kpml-response+xml", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 147, "source": "iana", "value": "application/ld+json", "compressible": true, "charSet": "", "extensions": "jsonld" }
            , { "id": 148, "source": "iana", "value": "application/link-format", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 149, "source": "iana", "value": "application/load-control+xml", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 150, "source": "iana", "value": "application/lost+xml", "compressible": false, "charSet": "", "extensions": "lostxml" }
            , { "id": 151, "source": "iana", "value": "application/lostsync+xml", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 152, "source": "iana", "value": "application/lxf", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 153, "source": "iana", "value": "application/mac-binhex40", "compressible": false, "charSet": "", "extensions": "hqx" }
            , { "id": 154, "source": "apache", "value": "application/mac-compactpro", "compressible": false, "charSet": "", "extensions": "cpt" }
            , { "id": 155, "source": "iana", "value": "application/macwriteii", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 156, "source": "iana", "value": "application/mads+xml", "compressible": false, "charSet": "", "extensions": "mads" }
            , { "id": 157, "source": "", "value": "application/manifest+json", "compressible": true, "charSet": "UTF-8", "extensions": "webmanifest" }
            , { "id": 158, "source": "iana", "value": "application/marc", "compressible": false, "charSet": "", "extensions": "mrc" }
            , { "id": 159, "source": "iana", "value": "application/marcxml+xml", "compressible": false, "charSet": "", "extensions": "mrcx" }
            , { "id": 160, "source": "iana", "value": "application/mathematica", "compressible": false, "charSet": "", "extensions": "ma, nb, mb" }
            , { "id": 161, "source": "iana", "value": "application/mathml+xml", "compressible": false, "charSet": "", "extensions": "mathml" }
            , { "id": 162, "source": "iana", "value": "application/mathml-content+xml", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 163, "source": "iana", "value": "application/mathml-presentation+xml", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 164, "source": "iana", "value": "application/mbms-associated-procedure-description+xml", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 165, "source": "iana", "value": "application/mbms-deregister+xml", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 166, "source": "iana", "value": "application/mbms-envelope+xml", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 167, "source": "iana", "value": "application/mbms-msk+xml", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 168, "source": "iana", "value": "application/mbms-msk-response+xml", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 169, "source": "iana", "value": "application/mbms-protection-description+xml", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 170, "source": "iana", "value": "application/mbms-reception-report+xml", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 171, "source": "iana", "value": "application/mbms-register+xml", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 172, "source": "iana", "value": "application/mbms-register-response+xml", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 173, "source": "iana", "value": "application/mbms-schedule+xml", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 174, "source": "iana", "value": "application/mbms-user-service-description+xml", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 175, "source": "iana", "value": "application/mbox", "compressible": false, "charSet": "", "extensions": "mbox" }
            , { "id": 176, "source": "iana", "value": "application/media-policy-dataset+xml", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 177, "source": "iana", "value": "application/media_control+xml", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 178, "source": "iana", "value": "application/mediaservercontrol+xml", "compressible": false, "charSet": "", "extensions": "mscml" }
            , { "id": 179, "source": "iana", "value": "application/merge-patch+json", "compressible": true, "charSet": "", "extensions": "" }
            , { "id": 180, "source": "apache", "value": "application/metalink+xml", "compressible": false, "charSet": "", "extensions": "metalink" }
            , { "id": 181, "source": "iana", "value": "application/metalink4+xml", "compressible": false, "charSet": "", "extensions": "meta4" }
            , { "id": 182, "source": "iana", "value": "application/mets+xml", "compressible": false, "charSet": "", "extensions": "mets" }
            , { "id": 183, "source": "iana", "value": "application/mf4", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 184, "source": "iana", "value": "application/mikey", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 185, "source": "iana", "value": "application/mods+xml", "compressible": false, "charSet": "", "extensions": "mods" }
            , { "id": 186, "source": "iana", "value": "application/moss-keys", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 187, "source": "iana", "value": "application/moss-signature", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 188, "source": "iana", "value": "application/mosskey-data", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 189, "source": "iana", "value": "application/mosskey-request", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 190, "source": "iana", "value": "application/mp21", "compressible": false, "charSet": "", "extensions": "m21, mp21" }
            , { "id": 191, "source": "iana", "value": "application/mp4", "compressible": false, "charSet": "", "extensions": "mp4s, m4p" }
            , { "id": 192, "source": "iana", "value": "application/mpeg4-generic", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 193, "source": "iana", "value": "application/mpeg4-iod", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 194, "source": "iana", "value": "application/mpeg4-iod-xmt", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 195, "source": "iana", "value": "application/mrb-consumer+xml", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 196, "source": "iana", "value": "application/mrb-publish+xml", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 197, "source": "iana", "value": "application/msc-ivr+xml", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 198, "source": "iana", "value": "application/msc-mixer+xml", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 199, "source": "iana", "value": "application/msword", "compressible": false, "charSet": "", "extensions": "doc, dot" }
            , { "id": 200, "source": "iana", "value": "application/mxf", "compressible": false, "charSet": "", "extensions": "mxf" }
            , { "id": 201, "source": "iana", "value": "application/nasdata", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 202, "source": "iana", "value": "application/news-checkgroups", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 203, "source": "iana", "value": "application/news-groupinfo", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 204, "source": "iana", "value": "application/news-transmission", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 205, "source": "iana", "value": "application/nlsml+xml", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 206, "source": "iana", "value": "application/nss", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 207, "source": "iana", "value": "application/ocsp-request", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 208, "source": "iana", "value": "application/ocsp-response", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 209, "source": "iana", "value": "application/octet-stream", "compressible": false, "charSet": "", "extensions": "bin, dms, lrf, mar, so, dist, distz, pkg, bpk, dump, elc, deploy, exe, dll, deb, dmg, iso, img, msi, msp, msm, buffer" }
            , { "id": 210, "source": "iana", "value": "application/oda", "compressible": false, "charSet": "", "extensions": "oda" }
            , { "id": 211, "source": "iana", "value": "application/odx", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 212, "source": "iana", "value": "application/oebps-package+xml", "compressible": false, "charSet": "", "extensions": "opf" }
            , { "id": 213, "source": "iana", "value": "application/ogg", "compressible": false, "charSet": "", "extensions": "ogx" }
            , { "id": 214, "source": "apache", "value": "application/omdoc+xml", "compressible": false, "charSet": "", "extensions": "omdoc" }
            , { "id": 215, "source": "apache", "value": "application/onenote", "compressible": false, "charSet": "", "extensions": "onetoc, onetoc2, onetmp, onepkg" }
            , { "id": 216, "source": "iana", "value": "application/oxps", "compressible": false, "charSet": "", "extensions": "oxps" }
            , { "id": 217, "source": "iana", "value": "application/p2p-overlay+xml", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 218, "source": "iana", "value": "application/parityfec", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 219, "source": "iana", "value": "application/patch-ops-error+xml", "compressible": false, "charSet": "", "extensions": "xer" }
            , { "id": 220, "source": "iana", "value": "application/pdf", "compressible": false, "charSet": "", "extensions": "pdf" }
            , { "id": 221, "source": "iana", "value": "application/pdx", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 222, "source": "iana", "value": "application/pgp-encrypted", "compressible": false, "charSet": "", "extensions": "pgp" }
            , { "id": 223, "source": "iana", "value": "application/pgp-keys", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 224, "source": "iana", "value": "application/pgp-signature", "compressible": false, "charSet": "", "extensions": "asc, sig" }
            , { "id": 225, "source": "apache", "value": "application/pics-rules", "compressible": false, "charSet": "", "extensions": "prf" }
            , { "id": 226, "source": "iana", "value": "application/pidf+xml", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 227, "source": "iana", "value": "application/pidf-diff+xml", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 228, "source": "iana", "value": "application/pkcs10", "compressible": false, "charSet": "", "extensions": "p10" }
            , { "id": 229, "source": "iana", "value": "application/pkcs12", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 230, "source": "iana", "value": "application/pkcs7-mime", "compressible": false, "charSet": "", "extensions": "p7m, p7c" }
            , { "id": 231, "source": "iana", "value": "application/pkcs7-signature", "compressible": false, "charSet": "", "extensions": "p7s" }
            , { "id": 232, "source": "iana", "value": "application/pkcs8", "compressible": false, "charSet": "", "extensions": "p8" }
            , { "id": 233, "source": "iana", "value": "application/pkix-attr-cert", "compressible": false, "charSet": "", "extensions": "ac" }
            , { "id": 234, "source": "iana", "value": "application/pkix-cert", "compressible": false, "charSet": "", "extensions": "cer" }
            , { "id": 235, "source": "iana", "value": "application/pkix-crl", "compressible": false, "charSet": "", "extensions": "crl" }
            , { "id": 236, "source": "iana", "value": "application/pkix-pkipath", "compressible": false, "charSet": "", "extensions": "pkipath" }
            , { "id": 237, "source": "iana", "value": "application/pkixcmp", "compressible": false, "charSet": "", "extensions": "pki" }
            , { "id": 238, "source": "iana", "value": "application/pls+xml", "compressible": false, "charSet": "", "extensions": "pls" }
            , { "id": 239, "source": "iana", "value": "application/poc-settings+xml", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 240, "source": "iana", "value": "application/postscript", "compressible": true, "charSet": "", "extensions": "ai, eps, ps" }
            , { "id": 241, "source": "iana", "value": "application/ppsp-tracker+json", "compressible": true, "charSet": "", "extensions": "" }
            , { "id": 242, "source": "iana", "value": "application/problem+json", "compressible": true, "charSet": "", "extensions": "" }
            , { "id": 243, "source": "iana", "value": "application/problem+xml", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 244, "source": "iana", "value": "application/provenance+xml", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 245, "source": "iana", "value": "application/prs.alvestrand.titrax-sheet", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 246, "source": "iana", "value": "application/prs.cww", "compressible": false, "charSet": "", "extensions": "cww" }
            , { "id": 247, "source": "iana", "value": "application/prs.hpub+zip", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 248, "source": "iana", "value": "application/prs.nprend", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 249, "source": "iana", "value": "application/prs.plucker", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 250, "source": "iana", "value": "application/prs.rdf-xml-crypt", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 251, "source": "iana", "value": "application/prs.xsf+xml", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 252, "source": "iana", "value": "application/pskc+xml", "compressible": false, "charSet": "", "extensions": "pskcxml" }
            , { "id": 253, "source": "iana", "value": "application/qsig", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 254, "source": "iana", "value": "application/raptorfec", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 255, "source": "iana", "value": "application/rdap+json", "compressible": true, "charSet": "", "extensions": "" }
            , { "id": 256, "source": "iana", "value": "application/rdf+xml", "compressible": true, "charSet": "", "extensions": "rdf" }
            , { "id": 257, "source": "iana", "value": "application/reginfo+xml", "compressible": false, "charSet": "", "extensions": "rif" }
            , { "id": 258, "source": "iana", "value": "application/relax-ng-compact-syntax", "compressible": false, "charSet": "", "extensions": "rnc" }
            , { "id": 259, "source": "iana", "value": "application/remote-printing", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 260, "source": "iana", "value": "application/reputon+json", "compressible": true, "charSet": "", "extensions": "" }
            , { "id": 261, "source": "iana", "value": "application/resource-lists+xml", "compressible": false, "charSet": "", "extensions": "rl" }
            , { "id": 262, "source": "iana", "value": "application/resource-lists-diff+xml", "compressible": false, "charSet": "", "extensions": "rld" }
            , { "id": 263, "source": "iana", "value": "application/rfc+xml", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 264, "source": "iana", "value": "application/riscos", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 265, "source": "iana", "value": "application/rlmi+xml", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 266, "source": "iana", "value": "application/rls-services+xml", "compressible": false, "charSet": "", "extensions": "rs" }
            , { "id": 267, "source": "iana", "value": "application/rpki-ghostbusters", "compressible": false, "charSet": "", "extensions": "gbr" }
            , { "id": 268, "source": "iana", "value": "application/rpki-manifest", "compressible": false, "charSet": "", "extensions": "mft" }
            , { "id": 269, "source": "iana", "value": "application/rpki-roa", "compressible": false, "charSet": "", "extensions": "roa" }
            , { "id": 270, "source": "iana", "value": "application/rpki-updown", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 271, "source": "apache", "value": "application/rsd+xml", "compressible": false, "charSet": "", "extensions": "rsd" }
            , { "id": 272, "source": "apache", "value": "application/rss+xml", "compressible": true, "charSet": "", "extensions": "rss" }
            , { "id": 273, "source": "iana", "value": "application/rtf", "compressible": true, "charSet": "", "extensions": "rtf" }
            , { "id": 274, "source": "iana", "value": "application/rtploopback", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 275, "source": "iana", "value": "application/rtx", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 276, "source": "iana", "value": "application/samlassertion+xml", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 277, "source": "iana", "value": "application/samlmetadata+xml", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 278, "source": "iana", "value": "application/sbml+xml", "compressible": false, "charSet": "", "extensions": "sbml" }
            , { "id": 279, "source": "iana", "value": "application/scaip+xml", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 280, "source": "iana", "value": "application/scim+json", "compressible": true, "charSet": "", "extensions": "" }
            , { "id": 281, "source": "iana", "value": "application/scvp-cv-request", "compressible": false, "charSet": "", "extensions": "scq" }
            , { "id": 282, "source": "iana", "value": "application/scvp-cv-response", "compressible": false, "charSet": "", "extensions": "scs" }
            , { "id": 283, "source": "iana", "value": "application/scvp-vp-request", "compressible": false, "charSet": "", "extensions": "spq" }
            , { "id": 284, "source": "iana", "value": "application/scvp-vp-response", "compressible": false, "charSet": "", "extensions": "spp" }
            , { "id": 285, "source": "iana", "value": "application/sdp", "compressible": false, "charSet": "", "extensions": "sdp" }
            , { "id": 286, "source": "iana", "value": "application/sep+xml", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 287, "source": "iana", "value": "application/sep-exi", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 288, "source": "iana", "value": "application/session-info", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 289, "source": "iana", "value": "application/set-payment", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 290, "source": "iana", "value": "application/set-payment-initiation", "compressible": false, "charSet": "", "extensions": "setpay" }
            , { "id": 291, "source": "iana", "value": "application/set-registration", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 292, "source": "iana", "value": "application/set-registration-initiation", "compressible": false, "charSet": "", "extensions": "setreg" }
            , { "id": 293, "source": "iana", "value": "application/sgml", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 294, "source": "iana", "value": "application/sgml-open-catalog", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 295, "source": "iana", "value": "application/shf+xml", "compressible": false, "charSet": "", "extensions": "shf" }
            , { "id": 296, "source": "iana", "value": "application/sieve", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 297, "source": "iana", "value": "application/simple-filter+xml", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 298, "source": "iana", "value": "application/simple-message-summary", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 299, "source": "iana", "value": "application/simplesymbolcontainer", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 300, "source": "iana", "value": "application/slate", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 301, "source": "iana", "value": "application/smil", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 302, "source": "iana", "value": "application/smil+xml", "compressible": false, "charSet": "", "extensions": "smi, smil" }
            , { "id": 303, "source": "iana", "value": "application/smpte336m", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 304, "source": "iana", "value": "application/soap+fastinfoset", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 305, "source": "iana", "value": "application/soap+xml", "compressible": true, "charSet": "", "extensions": "" }
            , { "id": 306, "source": "iana", "value": "application/sparql-query", "compressible": false, "charSet": "", "extensions": "rq" }
            , { "id": 307, "source": "iana", "value": "application/sparql-results+xml", "compressible": false, "charSet": "", "extensions": "srx" }
            , { "id": 308, "source": "iana", "value": "application/spirits-event+xml", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 309, "source": "iana", "value": "application/sql", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 310, "source": "iana", "value": "application/srgs", "compressible": false, "charSet": "", "extensions": "gram" }
            , { "id": 311, "source": "iana", "value": "application/srgs+xml", "compressible": false, "charSet": "", "extensions": "grxml" }
            , { "id": 312, "source": "iana", "value": "application/sru+xml", "compressible": false, "charSet": "", "extensions": "sru" }
            , { "id": 313, "source": "apache", "value": "application/ssdl+xml", "compressible": false, "charSet": "", "extensions": "ssdl" }
            , { "id": 314, "source": "iana", "value": "application/ssml+xml", "compressible": false, "charSet": "", "extensions": "ssml" }
            , { "id": 315, "source": "iana", "value": "application/tamp-apex-update", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 316, "source": "iana", "value": "application/tamp-apex-update-confirm", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 317, "source": "iana", "value": "application/tamp-community-update", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 318, "source": "iana", "value": "application/tamp-community-update-confirm", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 319, "source": "iana", "value": "application/tamp-error", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 320, "source": "iana", "value": "application/tamp-sequence-adjust", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 321, "source": "iana", "value": "application/tamp-sequence-adjust-confirm", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 322, "source": "iana", "value": "application/tamp-status-query", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 323, "source": "iana", "value": "application/tamp-status-response", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 324, "source": "iana", "value": "application/tamp-update", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 325, "source": "iana", "value": "application/tamp-update-confirm", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 326, "source": "", "value": "application/tar", "compressible": true, "charSet": "", "extensions": "" }
            , { "id": 327, "source": "iana", "value": "application/tei+xml", "compressible": false, "charSet": "", "extensions": "tei, teicorpus" }
            , { "id": 328, "source": "iana", "value": "application/thraud+xml", "compressible": false, "charSet": "", "extensions": "tfi" }
            , { "id": 329, "source": "iana", "value": "application/timestamp-query", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 330, "source": "iana", "value": "application/timestamp-reply", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 331, "source": "iana", "value": "application/timestamped-data", "compressible": false, "charSet": "", "extensions": "tsd" }
            , { "id": 332, "source": "iana", "value": "application/ttml+xml", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 333, "source": "iana", "value": "application/tve-trigger", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 334, "source": "iana", "value": "application/ulpfec", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 335, "source": "iana", "value": "application/urc-grpsheet+xml", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 336, "source": "iana", "value": "application/urc-ressheet+xml", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 337, "source": "iana", "value": "application/urc-targetdesc+xml", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 338, "source": "iana", "value": "application/urc-uisocketdesc+xml", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 339, "source": "iana", "value": "application/vcard+json", "compressible": true, "charSet": "", "extensions": "" }
            , { "id": 340, "source": "iana", "value": "application/vcard+xml", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 341, "source": "iana", "value": "application/vemmi", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 342, "source": "apache", "value": "application/vividence.scriptfile", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 343, "source": "iana", "value": "application/vnd.3gpp-prose+xml", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 344, "source": "iana", "value": "application/vnd.3gpp-prose-pc3ch+xml", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 345, "source": "iana", "value": "application/vnd.3gpp.access-transfer-events+xml", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 346, "source": "iana", "value": "application/vnd.3gpp.bsf+xml", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 347, "source": "iana", "value": "application/vnd.3gpp.mid-call+xml", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 348, "source": "iana", "value": "application/vnd.3gpp.pic-bw-large", "compressible": false, "charSet": "", "extensions": "plb" }
            , { "id": 349, "source": "iana", "value": "application/vnd.3gpp.pic-bw-small", "compressible": false, "charSet": "", "extensions": "psb" }
            , { "id": 350, "source": "iana", "value": "application/vnd.3gpp.pic-bw-var", "compressible": false, "charSet": "", "extensions": "pvb" }
            , { "id": 351, "source": "iana", "value": "application/vnd.3gpp.sms", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 352, "source": "iana", "value": "application/vnd.3gpp.sms+xml", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 353, "source": "iana", "value": "application/vnd.3gpp.srvcc-ext+xml", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 354, "source": "iana", "value": "application/vnd.3gpp.srvcc-info+xml", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 355, "source": "iana", "value": "application/vnd.3gpp.state-and-event-info+xml", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 356, "source": "iana", "value": "application/vnd.3gpp.ussd+xml", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 357, "source": "iana", "value": "application/vnd.3gpp2.bcmcsinfo+xml", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 358, "source": "iana", "value": "application/vnd.3gpp2.sms", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 359, "source": "iana", "value": "application/vnd.3gpp2.tcap", "compressible": false, "charSet": "", "extensions": "tcap" }
            , { "id": 360, "source": "iana", "value": "application/vnd.3lightssoftware.imagescal", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 361, "source": "iana", "value": "application/vnd.3m.post-it-notes", "compressible": false, "charSet": "", "extensions": "pwn" }
            , { "id": 362, "source": "iana", "value": "application/vnd.accpac.simply.aso", "compressible": false, "charSet": "", "extensions": "aso" }
            , { "id": 363, "source": "iana", "value": "application/vnd.accpac.simply.imp", "compressible": false, "charSet": "", "extensions": "imp" }
            , { "id": 364, "source": "iana", "value": "application/vnd.acucobol", "compressible": false, "charSet": "", "extensions": "acu" }
            , { "id": 365, "source": "iana", "value": "application/vnd.acucorp", "compressible": false, "charSet": "", "extensions": "atc, acutc" }
            , { "id": 366, "source": "apache", "value": "application/vnd.adobe.air-application-installer-package+zip", "compressible": false, "charSet": "", "extensions": "air" }
            , { "id": 367, "source": "iana", "value": "application/vnd.adobe.flash.movie", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 368, "source": "iana", "value": "application/vnd.adobe.formscentral.fcdt", "compressible": false, "charSet": "", "extensions": "fcdt" }
            , { "id": 369, "source": "iana", "value": "application/vnd.adobe.fxp", "compressible": false, "charSet": "", "extensions": "fxp, fxpl" }
            , { "id": 370, "source": "iana", "value": "application/vnd.adobe.partial-upload", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 371, "source": "iana", "value": "application/vnd.adobe.xdp+xml", "compressible": false, "charSet": "", "extensions": "xdp" }
            , { "id": 372, "source": "iana", "value": "application/vnd.adobe.xfdf", "compressible": false, "charSet": "", "extensions": "xfdf" }
            , { "id": 373, "source": "iana", "value": "application/vnd.aether.imp", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 374, "source": "iana", "value": "application/vnd.ah-barcode", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 375, "source": "iana", "value": "application/vnd.ahead.space", "compressible": false, "charSet": "", "extensions": "ahead" }
            , { "id": 376, "source": "iana", "value": "application/vnd.airzip.filesecure.azf", "compressible": false, "charSet": "", "extensions": "azf" }
            , { "id": 377, "source": "iana", "value": "application/vnd.airzip.filesecure.azs", "compressible": false, "charSet": "", "extensions": "azs" }
            , { "id": 378, "source": "apache", "value": "application/vnd.amazon.ebook", "compressible": false, "charSet": "", "extensions": "azw" }
            , { "id": 379, "source": "iana", "value": "application/vnd.americandynamics.acc", "compressible": false, "charSet": "", "extensions": "acc" }
            , { "id": 380, "source": "iana", "value": "application/vnd.amiga.ami", "compressible": false, "charSet": "", "extensions": "ami" }
            , { "id": 381, "source": "iana", "value": "application/vnd.amundsen.maze+xml", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 382, "source": "apache", "value": "application/vnd.android.package-archive", "compressible": false, "charSet": "", "extensions": "apk" }
            , { "id": 383, "source": "iana", "value": "application/vnd.anki", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 384, "source": "iana", "value": "application/vnd.anser-web-certificate-issue-initiation", "compressible": false, "charSet": "", "extensions": "cii" }
            , { "id": 385, "source": "apache", "value": "application/vnd.anser-web-funds-transfer-initiation", "compressible": false, "charSet": "", "extensions": "fti" }
            , { "id": 386, "source": "iana", "value": "application/vnd.antix.game-component", "compressible": false, "charSet": "", "extensions": "atx" }
            , { "id": 387, "source": "iana", "value": "application/vnd.apache.thrift.binary", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 388, "source": "iana", "value": "application/vnd.apache.thrift.compact", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 389, "source": "iana", "value": "application/vnd.apache.thrift.json", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 390, "source": "iana", "value": "application/vnd.api+json", "compressible": true, "charSet": "", "extensions": "" }
            , { "id": 391, "source": "iana", "value": "application/vnd.apple.installer+xml", "compressible": false, "charSet": "", "extensions": "mpkg" }
            , { "id": 392, "source": "iana", "value": "application/vnd.apple.mpegurl", "compressible": false, "charSet": "", "extensions": "m3u8" }
            , { "id": 393, "source": "", "value": "application/vnd.apple.pkpass", "compressible": false, "charSet": "", "extensions": "pkpass" }
            , { "id": 394, "source": "iana", "value": "application/vnd.arastra.swi", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 395, "source": "iana", "value": "application/vnd.aristanetworks.swi", "compressible": false, "charSet": "", "extensions": "swi" }
            , { "id": 396, "source": "iana", "value": "application/vnd.artsquare", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 397, "source": "iana", "value": "application/vnd.astraea-software.iota", "compressible": false, "charSet": "", "extensions": "iota" }
            , { "id": 398, "source": "iana", "value": "application/vnd.audiograph", "compressible": false, "charSet": "", "extensions": "aep" }
            , { "id": 399, "source": "iana", "value": "application/vnd.autopackage", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 400, "source": "iana", "value": "application/vnd.avistar+xml", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 401, "source": "iana", "value": "application/vnd.balsamiq.bmml+xml", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 402, "source": "iana", "value": "application/vnd.balsamiq.bmpr", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 403, "source": "iana", "value": "application/vnd.bekitzur-stech+json", "compressible": true, "charSet": "", "extensions": "" }
            , { "id": 404, "source": "iana", "value": "application/vnd.biopax.rdf+xml", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 405, "source": "iana", "value": "application/vnd.blueice.multipass", "compressible": false, "charSet": "", "extensions": "mpm" }
            , { "id": 406, "source": "iana", "value": "application/vnd.bluetooth.ep.oob", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 407, "source": "iana", "value": "application/vnd.bluetooth.le.oob", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 408, "source": "iana", "value": "application/vnd.bmi", "compressible": false, "charSet": "", "extensions": "bmi" }
            , { "id": 409, "source": "iana", "value": "application/vnd.businessobjects", "compressible": false, "charSet": "", "extensions": "rep" }
            , { "id": 410, "source": "iana", "value": "application/vnd.cab-jscript", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 411, "source": "iana", "value": "application/vnd.canon-cpdl", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 412, "source": "iana", "value": "application/vnd.canon-lips", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 413, "source": "iana", "value": "application/vnd.cendio.thinlinc.clientconf", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 414, "source": "iana", "value": "application/vnd.century-systems.tcp_stream", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 415, "source": "iana", "value": "application/vnd.chemdraw+xml", "compressible": false, "charSet": "", "extensions": "cdxml" }
            , { "id": 416, "source": "iana", "value": "application/vnd.chipnuts.karaoke-mmd", "compressible": false, "charSet": "", "extensions": "mmd" }
            , { "id": 417, "source": "iana", "value": "application/vnd.cinderella", "compressible": false, "charSet": "", "extensions": "cdy" }
            , { "id": 418, "source": "iana", "value": "application/vnd.cirpack.isdn-ext", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 419, "source": "iana", "value": "application/vnd.citationstyles.style+xml", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 420, "source": "iana", "value": "application/vnd.claymore", "compressible": false, "charSet": "", "extensions": "cla" }
            , { "id": 421, "source": "iana", "value": "application/vnd.cloanto.rp9", "compressible": false, "charSet": "", "extensions": "rp9" }
            , { "id": 422, "source": "iana", "value": "application/vnd.clonk.c4group", "compressible": false, "charSet": "", "extensions": "c4g, c4d, c4f, c4p, c4u" }
            , { "id": 423, "source": "iana", "value": "application/vnd.cluetrust.cartomobile-config", "compressible": false, "charSet": "", "extensions": "c11amc" }
            , { "id": 424, "source": "iana", "value": "application/vnd.cluetrust.cartomobile-config-pkg", "compressible": false, "charSet": "", "extensions": "c11amz" }
            , { "id": 425, "source": "iana", "value": "application/vnd.coffeescript", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 426, "source": "iana", "value": "application/vnd.collection+json", "compressible": true, "charSet": "", "extensions": "" }
            , { "id": 427, "source": "iana", "value": "application/vnd.collection.doc+json", "compressible": true, "charSet": "", "extensions": "" }
            , { "id": 428, "source": "iana", "value": "application/vnd.collection.next+json", "compressible": true, "charSet": "", "extensions": "" }
            , { "id": 429, "source": "iana", "value": "application/vnd.commerce-battelle", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 430, "source": "iana", "value": "application/vnd.commonspace", "compressible": false, "charSet": "", "extensions": "csp" }
            , { "id": 431, "source": "iana", "value": "application/vnd.contact.cmsg", "compressible": false, "charSet": "", "extensions": "cdbcmsg" }
            , { "id": 432, "source": "iana", "value": "application/vnd.coreos.ignition+json", "compressible": true, "charSet": "", "extensions": "" }
            , { "id": 433, "source": "iana", "value": "application/vnd.cosmocaller", "compressible": false, "charSet": "", "extensions": "cmc" }
            , { "id": 434, "source": "iana", "value": "application/vnd.crick.clicker", "compressible": false, "charSet": "", "extensions": "clkx" }
            , { "id": 435, "source": "iana", "value": "application/vnd.crick.clicker.keyboard", "compressible": false, "charSet": "", "extensions": "clkk" }
            , { "id": 436, "source": "iana", "value": "application/vnd.crick.clicker.palette", "compressible": false, "charSet": "", "extensions": "clkp" }
            , { "id": 437, "source": "iana", "value": "application/vnd.crick.clicker.template", "compressible": false, "charSet": "", "extensions": "clkt" }
            , { "id": 438, "source": "iana", "value": "application/vnd.crick.clicker.wordbank", "compressible": false, "charSet": "", "extensions": "clkw" }
            , { "id": 439, "source": "iana", "value": "application/vnd.criticaltools.wbs+xml", "compressible": false, "charSet": "", "extensions": "wbs" }
            , { "id": 440, "source": "iana", "value": "application/vnd.ctc-posml", "compressible": false, "charSet": "", "extensions": "pml" }
            , { "id": 441, "source": "iana", "value": "application/vnd.ctct.ws+xml", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 442, "source": "iana", "value": "application/vnd.cups-pdf", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 443, "source": "iana", "value": "application/vnd.cups-postscript", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 444, "source": "iana", "value": "application/vnd.cups-ppd", "compressible": false, "charSet": "", "extensions": "ppd" }
            , { "id": 445, "source": "iana", "value": "application/vnd.cups-raster", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 446, "source": "iana", "value": "application/vnd.cups-raw", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 447, "source": "iana", "value": "application/vnd.curl", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 448, "source": "apache", "value": "application/vnd.curl.car", "compressible": false, "charSet": "", "extensions": "car" }
            , { "id": 449, "source": "apache", "value": "application/vnd.curl.pcurl", "compressible": false, "charSet": "", "extensions": "pcurl" }
            , { "id": 450, "source": "iana", "value": "application/vnd.cyan.dean.root+xml", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 451, "source": "iana", "value": "application/vnd.cybank", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 452, "source": "iana", "value": "application/vnd.dart", "compressible": true, "charSet": "", "extensions": "dart" }
            , { "id": 453, "source": "iana", "value": "application/vnd.data-vision.rdz", "compressible": false, "charSet": "", "extensions": "rdz" }
            , { "id": 454, "source": "iana", "value": "application/vnd.debian.binary-package", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 455, "source": "iana", "value": "application/vnd.dece.data", "compressible": false, "charSet": "", "extensions": "uvf, uvvf, uvd, uvvd" }
            , { "id": 456, "source": "iana", "value": "application/vnd.dece.ttml+xml", "compressible": false, "charSet": "", "extensions": "uvt, uvvt" }
            , { "id": 457, "source": "iana", "value": "application/vnd.dece.unspecified", "compressible": false, "charSet": "", "extensions": "uvx, uvvx" }
            , { "id": 458, "source": "iana", "value": "application/vnd.dece.zip", "compressible": false, "charSet": "", "extensions": "uvz, uvvz" }
            , { "id": 459, "source": "iana", "value": "application/vnd.denovo.fcselayout-link", "compressible": false, "charSet": "", "extensions": "fe_launch" }
            , { "id": 460, "source": "iana", "value": "application/vnd.desmume-movie", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 461, "source": "apache", "value": "application/vnd.desmume.movie", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 462, "source": "iana", "value": "application/vnd.dir-bi.plate-dl-nosuffix", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 463, "source": "iana", "value": "application/vnd.dm.delegation+xml", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 464, "source": "iana", "value": "application/vnd.dna", "compressible": false, "charSet": "", "extensions": "dna" }
            , { "id": 465, "source": "iana", "value": "application/vnd.document+json", "compressible": true, "charSet": "", "extensions": "" }
            , { "id": 466, "source": "apache", "value": "application/vnd.dolby.mlp", "compressible": false, "charSet": "", "extensions": "mlp" }
            , { "id": 467, "source": "iana", "value": "application/vnd.dolby.mobile.1", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 468, "source": "iana", "value": "application/vnd.dolby.mobile.2", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 469, "source": "iana", "value": "application/vnd.doremir.scorecloud-binary-document", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 470, "source": "iana", "value": "application/vnd.dpgraph", "compressible": false, "charSet": "", "extensions": "dpg" }
            , { "id": 471, "source": "iana", "value": "application/vnd.dreamfactory", "compressible": false, "charSet": "", "extensions": "dfac" }
            , { "id": 472, "source": "iana", "value": "application/vnd.drive+json", "compressible": true, "charSet": "", "extensions": "" }
            , { "id": 473, "source": "apache", "value": "application/vnd.ds-keypoint", "compressible": false, "charSet": "", "extensions": "kpxx" }
            , { "id": 474, "source": "iana", "value": "application/vnd.dtg.local", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 475, "source": "iana", "value": "application/vnd.dtg.local.flash", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 476, "source": "iana", "value": "application/vnd.dtg.local.html", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 477, "source": "iana", "value": "application/vnd.dvb.ait", "compressible": false, "charSet": "", "extensions": "ait" }
            , { "id": 478, "source": "iana", "value": "application/vnd.dvb.dvbj", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 479, "source": "iana", "value": "application/vnd.dvb.esgcontainer", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 480, "source": "iana", "value": "application/vnd.dvb.ipdcdftnotifaccess", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 481, "source": "iana", "value": "application/vnd.dvb.ipdcesgaccess", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 482, "source": "iana", "value": "application/vnd.dvb.ipdcesgaccess2", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 483, "source": "iana", "value": "application/vnd.dvb.ipdcesgpdd", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 484, "source": "iana", "value": "application/vnd.dvb.ipdcroaming", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 485, "source": "iana", "value": "application/vnd.dvb.iptv.alfec-base", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 486, "source": "iana", "value": "application/vnd.dvb.iptv.alfec-enhancement", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 487, "source": "iana", "value": "application/vnd.dvb.notif-aggregate-root+xml", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 488, "source": "iana", "value": "application/vnd.dvb.notif-container+xml", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 489, "source": "iana", "value": "application/vnd.dvb.notif-generic+xml", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 490, "source": "iana", "value": "application/vnd.dvb.notif-ia-msglist+xml", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 491, "source": "iana", "value": "application/vnd.dvb.notif-ia-registration-request+xml", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 492, "source": "iana", "value": "application/vnd.dvb.notif-ia-registration-response+xml", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 493, "source": "iana", "value": "application/vnd.dvb.notif-init+xml", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 494, "source": "iana", "value": "application/vnd.dvb.pfr", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 495, "source": "iana", "value": "application/vnd.dvb.service", "compressible": false, "charSet": "", "extensions": "svc" }
            , { "id": 496, "source": "iana", "value": "application/vnd.dxr", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 497, "source": "iana", "value": "application/vnd.dynageo", "compressible": false, "charSet": "", "extensions": "geo" }
            , { "id": 498, "source": "iana", "value": "application/vnd.dzr", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 499, "source": "iana", "value": "application/vnd.easykaraoke.cdgdownload", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 500, "source": "iana", "value": "application/vnd.ecdis-update", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 501, "source": "iana", "value": "application/vnd.ecowin.chart", "compressible": false, "charSet": "", "extensions": "mag" }
            , { "id": 502, "source": "iana", "value": "application/vnd.ecowin.filerequest", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 503, "source": "iana", "value": "application/vnd.ecowin.fileupdate", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 504, "source": "iana", "value": "application/vnd.ecowin.series", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 505, "source": "iana", "value": "application/vnd.ecowin.seriesrequest", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 506, "source": "iana", "value": "application/vnd.ecowin.seriesupdate", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 507, "source": "iana", "value": "application/vnd.emclient.accessrequest+xml", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 508, "source": "iana", "value": "application/vnd.enliven", "compressible": false, "charSet": "", "extensions": "nml" }
            , { "id": 509, "source": "iana", "value": "application/vnd.enphase.envoy", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 510, "source": "iana", "value": "application/vnd.eprints.data+xml", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 511, "source": "iana", "value": "application/vnd.epson.esf", "compressible": false, "charSet": "", "extensions": "esf" }
            , { "id": 512, "source": "iana", "value": "application/vnd.epson.msf", "compressible": false, "charSet": "", "extensions": "msf" }
            , { "id": 513, "source": "iana", "value": "application/vnd.epson.quickanime", "compressible": false, "charSet": "", "extensions": "qam" }
            , { "id": 514, "source": "iana", "value": "application/vnd.epson.salt", "compressible": false, "charSet": "", "extensions": "slt" }
            , { "id": 515, "source": "iana", "value": "application/vnd.epson.ssf", "compressible": false, "charSet": "", "extensions": "ssf" }
            , { "id": 516, "source": "iana", "value": "application/vnd.ericsson.quickcall", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 517, "source": "iana", "value": "application/vnd.eszigno3+xml", "compressible": false, "charSet": "", "extensions": "es3, et3" }
            , { "id": 518, "source": "iana", "value": "application/vnd.etsi.aoc+xml", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 519, "source": "iana", "value": "application/vnd.etsi.asic-e+zip", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 520, "source": "iana", "value": "application/vnd.etsi.asic-s+zip", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 521, "source": "iana", "value": "application/vnd.etsi.cug+xml", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 522, "source": "iana", "value": "application/vnd.etsi.iptvcommand+xml", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 523, "source": "iana", "value": "application/vnd.etsi.iptvdiscovery+xml", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 524, "source": "iana", "value": "application/vnd.etsi.iptvprofile+xml", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 525, "source": "iana", "value": "application/vnd.etsi.iptvsad-bc+xml", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 526, "source": "iana", "value": "application/vnd.etsi.iptvsad-cod+xml", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 527, "source": "iana", "value": "application/vnd.etsi.iptvsad-npvr+xml", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 528, "source": "iana", "value": "application/vnd.etsi.iptvservice+xml", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 529, "source": "iana", "value": "application/vnd.etsi.iptvsync+xml", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 530, "source": "iana", "value": "application/vnd.etsi.iptvueprofile+xml", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 531, "source": "iana", "value": "application/vnd.etsi.mcid+xml", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 532, "source": "iana", "value": "application/vnd.etsi.mheg5", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 533, "source": "iana", "value": "application/vnd.etsi.overload-control-policy-dataset+xml", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 534, "source": "iana", "value": "application/vnd.etsi.pstn+xml", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 535, "source": "iana", "value": "application/vnd.etsi.sci+xml", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 536, "source": "iana", "value": "application/vnd.etsi.simservs+xml", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 537, "source": "iana", "value": "application/vnd.etsi.timestamp-token", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 538, "source": "iana", "value": "application/vnd.etsi.tsl+xml", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 539, "source": "iana", "value": "application/vnd.etsi.tsl.der", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 540, "source": "iana", "value": "application/vnd.eudora.data", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 541, "source": "iana", "value": "application/vnd.ezpix-album", "compressible": false, "charSet": "", "extensions": "ez2" }
            , { "id": 542, "source": "iana", "value": "application/vnd.ezpix-package", "compressible": false, "charSet": "", "extensions": "ez3" }
            , { "id": 543, "source": "iana", "value": "application/vnd.f-secure.mobile", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 544, "source": "iana", "value": "application/vnd.fastcopy-disk-image", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 545, "source": "iana", "value": "application/vnd.fdf", "compressible": false, "charSet": "", "extensions": "fdf" }
            , { "id": 546, "source": "iana", "value": "application/vnd.fdsn.mseed", "compressible": false, "charSet": "", "extensions": "mseed" }
            , { "id": 547, "source": "iana", "value": "application/vnd.fdsn.seed", "compressible": false, "charSet": "", "extensions": "seed, dataless" }
            , { "id": 548, "source": "iana", "value": "application/vnd.ffsns", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 549, "source": "iana", "value": "application/vnd.filmit.zfc", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 550, "source": "iana", "value": "application/vnd.fints", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 551, "source": "iana", "value": "application/vnd.firemonkeys.cloudcell", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 552, "source": "iana", "value": "application/vnd.flographit", "compressible": false, "charSet": "", "extensions": "gph" }
            , { "id": 553, "source": "iana", "value": "application/vnd.fluxtime.clip", "compressible": false, "charSet": "", "extensions": "ftc" }
            , { "id": 554, "source": "iana", "value": "application/vnd.font-fontforge-sfd", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 555, "source": "iana", "value": "application/vnd.framemaker", "compressible": false, "charSet": "", "extensions": "fm, frame, maker, book" }
            , { "id": 556, "source": "iana", "value": "application/vnd.frogans.fnc", "compressible": false, "charSet": "", "extensions": "fnc" }
            , { "id": 557, "source": "iana", "value": "application/vnd.frogans.ltf", "compressible": false, "charSet": "", "extensions": "ltf" }
            , { "id": 558, "source": "iana", "value": "application/vnd.fsc.weblaunch", "compressible": false, "charSet": "", "extensions": "fsc" }
            , { "id": 559, "source": "iana", "value": "application/vnd.fujitsu.oasys", "compressible": false, "charSet": "", "extensions": "oas" }
            , { "id": 560, "source": "iana", "value": "application/vnd.fujitsu.oasys2", "compressible": false, "charSet": "", "extensions": "oa2" }
            , { "id": 561, "source": "iana", "value": "application/vnd.fujitsu.oasys3", "compressible": false, "charSet": "", "extensions": "oa3" }
            , { "id": 562, "source": "iana", "value": "application/vnd.fujitsu.oasysgp", "compressible": false, "charSet": "", "extensions": "fg5" }
            , { "id": 563, "source": "iana", "value": "application/vnd.fujitsu.oasysprs", "compressible": false, "charSet": "", "extensions": "bh2" }
            , { "id": 564, "source": "iana", "value": "application/vnd.fujixerox.art-ex", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 565, "source": "iana", "value": "application/vnd.fujixerox.art4", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 566, "source": "iana", "value": "application/vnd.fujixerox.ddd", "compressible": false, "charSet": "", "extensions": "ddd" }
            , { "id": 567, "source": "iana", "value": "application/vnd.fujixerox.docuworks", "compressible": false, "charSet": "", "extensions": "xdw" }
            , { "id": 568, "source": "iana", "value": "application/vnd.fujixerox.docuworks.binder", "compressible": false, "charSet": "", "extensions": "xbd" }
            , { "id": 569, "source": "iana", "value": "application/vnd.fujixerox.docuworks.container", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 570, "source": "iana", "value": "application/vnd.fujixerox.hbpl", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 571, "source": "iana", "value": "application/vnd.fut-misnet", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 572, "source": "iana", "value": "application/vnd.fuzzysheet", "compressible": false, "charSet": "", "extensions": "fzs" }
            , { "id": 573, "source": "iana", "value": "application/vnd.genomatix.tuxedo", "compressible": false, "charSet": "", "extensions": "txd" }
            , { "id": 574, "source": "iana", "value": "application/vnd.geo+json", "compressible": true, "charSet": "", "extensions": "" }
            , { "id": 575, "source": "iana", "value": "application/vnd.geocube+xml", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 576, "source": "iana", "value": "application/vnd.geogebra.file", "compressible": false, "charSet": "", "extensions": "ggb" }
            , { "id": 577, "source": "iana", "value": "application/vnd.geogebra.tool", "compressible": false, "charSet": "", "extensions": "ggt" }
            , { "id": 578, "source": "iana", "value": "application/vnd.geometry-explorer", "compressible": false, "charSet": "", "extensions": "gex, gre" }
            , { "id": 579, "source": "iana", "value": "application/vnd.geonext", "compressible": false, "charSet": "", "extensions": "gxt" }
            , { "id": 580, "source": "iana", "value": "application/vnd.geoplan", "compressible": false, "charSet": "", "extensions": "g2w" }
            , { "id": 581, "source": "iana", "value": "application/vnd.geospace", "compressible": false, "charSet": "", "extensions": "g3w" }
            , { "id": 582, "source": "iana", "value": "application/vnd.gerber", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 583, "source": "iana", "value": "application/vnd.globalplatform.card-content-mgt", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 584, "source": "iana", "value": "application/vnd.globalplatform.card-content-mgt-response", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 585, "source": "iana", "value": "application/vnd.gmx", "compressible": false, "charSet": "", "extensions": "gmx" }
            , { "id": 586, "source": "", "value": "application/vnd.google-apps.document", "compressible": false, "charSet": "", "extensions": "gdoc" }
            , { "id": 587, "source": "", "value": "application/vnd.google-apps.presentation", "compressible": false, "charSet": "", "extensions": "gslides" }
            , { "id": 588, "source": "", "value": "application/vnd.google-apps.spreadsheet", "compressible": false, "charSet": "", "extensions": "gsheet" }
            , { "id": 589, "source": "iana", "value": "application/vnd.google-earth.kml+xml", "compressible": true, "charSet": "", "extensions": "kml" }
            , { "id": 590, "source": "iana", "value": "application/vnd.google-earth.kmz", "compressible": false, "charSet": "", "extensions": "kmz" }
            , { "id": 591, "source": "iana", "value": "application/vnd.gov.sk.e-form+xml", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 592, "source": "iana", "value": "application/vnd.gov.sk.e-form+zip", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 593, "source": "iana", "value": "application/vnd.gov.sk.xmldatacontainer+xml", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 594, "source": "iana", "value": "application/vnd.grafeq", "compressible": false, "charSet": "", "extensions": "gqf, gqs" }
            , { "id": 595, "source": "iana", "value": "application/vnd.gridmp", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 596, "source": "iana", "value": "application/vnd.groove-account", "compressible": false, "charSet": "", "extensions": "gac" }
            , { "id": 597, "source": "iana", "value": "application/vnd.groove-help", "compressible": false, "charSet": "", "extensions": "ghf" }
            , { "id": 598, "source": "iana", "value": "application/vnd.groove-identity-message", "compressible": false, "charSet": "", "extensions": "gim" }
            , { "id": 599, "source": "iana", "value": "application/vnd.groove-injector", "compressible": false, "charSet": "", "extensions": "grv" }
            , { "id": 600, "source": "iana", "value": "application/vnd.groove-tool-message", "compressible": false, "charSet": "", "extensions": "gtm" }
            , { "id": 601, "source": "iana", "value": "application/vnd.groove-tool-template", "compressible": false, "charSet": "", "extensions": "tpl" }
            , { "id": 602, "source": "iana", "value": "application/vnd.groove-vcard", "compressible": false, "charSet": "", "extensions": "vcg" }
            , { "id": 603, "source": "iana", "value": "application/vnd.hal+json", "compressible": true, "charSet": "", "extensions": "" }
            , { "id": 604, "source": "iana", "value": "application/vnd.hal+xml", "compressible": false, "charSet": "", "extensions": "hal" }
            , { "id": 605, "source": "iana", "value": "application/vnd.handheld-entertainment+xml", "compressible": false, "charSet": "", "extensions": "zmm" }
            , { "id": 606, "source": "iana", "value": "application/vnd.hbci", "compressible": false, "charSet": "", "extensions": "hbci" }
            , { "id": 607, "source": "iana", "value": "application/vnd.hcl-bireports", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 608, "source": "iana", "value": "application/vnd.hdt", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 609, "source": "iana", "value": "application/vnd.heroku+json", "compressible": true, "charSet": "", "extensions": "" }
            , { "id": 610, "source": "iana", "value": "application/vnd.hhe.lesson-player", "compressible": false, "charSet": "", "extensions": "les" }
            , { "id": 611, "source": "iana", "value": "application/vnd.hp-hpgl", "compressible": false, "charSet": "", "extensions": "hpgl" }
            , { "id": 612, "source": "iana", "value": "application/vnd.hp-hpid", "compressible": false, "charSet": "", "extensions": "hpid" }
            , { "id": 613, "source": "iana", "value": "application/vnd.hp-hps", "compressible": false, "charSet": "", "extensions": "hps" }
            , { "id": 614, "source": "iana", "value": "application/vnd.hp-jlyt", "compressible": false, "charSet": "", "extensions": "jlt" }
            , { "id": 615, "source": "iana", "value": "application/vnd.hp-pcl", "compressible": false, "charSet": "", "extensions": "pcl" }
            , { "id": 616, "source": "iana", "value": "application/vnd.hp-pclxl", "compressible": false, "charSet": "", "extensions": "pclxl" }
            , { "id": 617, "source": "iana", "value": "application/vnd.httphone", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 618, "source": "iana", "value": "application/vnd.hydrostatix.sof-data", "compressible": false, "charSet": "", "extensions": "sfd-hdstx" }
            , { "id": 619, "source": "iana", "value": "application/vnd.hyperdrive+json", "compressible": true, "charSet": "", "extensions": "" }
            , { "id": 620, "source": "iana", "value": "application/vnd.hzn-3d-crossword", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 621, "source": "iana", "value": "application/vnd.ibm.afplinedata", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 622, "source": "iana", "value": "application/vnd.ibm.electronic-media", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 623, "source": "iana", "value": "application/vnd.ibm.minipay", "compressible": false, "charSet": "", "extensions": "mpy" }
            , { "id": 624, "source": "iana", "value": "application/vnd.ibm.modcap", "compressible": false, "charSet": "", "extensions": "afp, listafp, list3820" }
            , { "id": 625, "source": "iana", "value": "application/vnd.ibm.rights-management", "compressible": false, "charSet": "", "extensions": "irm" }
            , { "id": 626, "source": "iana", "value": "application/vnd.ibm.secure-container", "compressible": false, "charSet": "", "extensions": "sc" }
            , { "id": 627, "source": "iana", "value": "application/vnd.iccprofile", "compressible": false, "charSet": "", "extensions": "icc, icm" }
            , { "id": 628, "source": "iana", "value": "application/vnd.ieee.1905", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 629, "source": "iana", "value": "application/vnd.igloader", "compressible": false, "charSet": "", "extensions": "igl" }
            , { "id": 630, "source": "iana", "value": "application/vnd.immervision-ivp", "compressible": false, "charSet": "", "extensions": "ivp" }
            , { "id": 631, "source": "iana", "value": "application/vnd.immervision-ivu", "compressible": false, "charSet": "", "extensions": "ivu" }
            , { "id": 632, "source": "iana", "value": "application/vnd.ims.imsccv1p1", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 633, "source": "iana", "value": "application/vnd.ims.imsccv1p2", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 634, "source": "iana", "value": "application/vnd.ims.imsccv1p3", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 635, "source": "iana", "value": "application/vnd.ims.lis.v2.result+json", "compressible": true, "charSet": "", "extensions": "" }
            , { "id": 636, "source": "iana", "value": "application/vnd.ims.lti.v2.toolconsumerprofile+json", "compressible": true, "charSet": "", "extensions": "" }
            , { "id": 637, "source": "iana", "value": "application/vnd.ims.lti.v2.toolproxy+json", "compressible": true, "charSet": "", "extensions": "" }
            , { "id": 638, "source": "iana", "value": "application/vnd.ims.lti.v2.toolproxy.id+json", "compressible": true, "charSet": "", "extensions": "" }
            , { "id": 639, "source": "iana", "value": "application/vnd.ims.lti.v2.toolsettings+json", "compressible": true, "charSet": "", "extensions": "" }
            , { "id": 640, "source": "iana", "value": "application/vnd.ims.lti.v2.toolsettings.simple+json", "compressible": true, "charSet": "", "extensions": "" }
            , { "id": 641, "source": "iana", "value": "application/vnd.informedcontrol.rms+xml", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 642, "source": "iana", "value": "application/vnd.informix-visionary", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 643, "source": "iana", "value": "application/vnd.infotech.project", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 644, "source": "iana", "value": "application/vnd.infotech.project+xml", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 645, "source": "iana", "value": "application/vnd.innopath.wamp.notification", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 646, "source": "iana", "value": "application/vnd.insors.igm", "compressible": false, "charSet": "", "extensions": "igm" }
            , { "id": 647, "source": "iana", "value": "application/vnd.intercon.formnet", "compressible": false, "charSet": "", "extensions": "xpw, xpx" }
            , { "id": 648, "source": "iana", "value": "application/vnd.intergeo", "compressible": false, "charSet": "", "extensions": "i2g" }
            , { "id": 649, "source": "iana", "value": "application/vnd.intertrust.digibox", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 650, "source": "iana", "value": "application/vnd.intertrust.nncp", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 651, "source": "iana", "value": "application/vnd.intu.qbo", "compressible": false, "charSet": "", "extensions": "qbo" }
            , { "id": 652, "source": "iana", "value": "application/vnd.intu.qfx", "compressible": false, "charSet": "", "extensions": "qfx" }
            , { "id": 653, "source": "iana", "value": "application/vnd.iptc.g2.catalogitem+xml", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 654, "source": "iana", "value": "application/vnd.iptc.g2.conceptitem+xml", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 655, "source": "iana", "value": "application/vnd.iptc.g2.knowledgeitem+xml", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 656, "source": "iana", "value": "application/vnd.iptc.g2.newsitem+xml", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 657, "source": "iana", "value": "application/vnd.iptc.g2.newsmessage+xml", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 658, "source": "iana", "value": "application/vnd.iptc.g2.packageitem+xml", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 659, "source": "iana", "value": "application/vnd.iptc.g2.planningitem+xml", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 660, "source": "iana", "value": "application/vnd.ipunplugged.rcprofile", "compressible": false, "charSet": "", "extensions": "rcprofile" }
            , { "id": 661, "source": "iana", "value": "application/vnd.irepository.package+xml", "compressible": false, "charSet": "", "extensions": "irp" }
            , { "id": 662, "source": "iana", "value": "application/vnd.is-xpr", "compressible": false, "charSet": "", "extensions": "xpr" }
            , { "id": 663, "source": "iana", "value": "application/vnd.isac.fcs", "compressible": false, "charSet": "", "extensions": "fcs" }
            , { "id": 664, "source": "iana", "value": "application/vnd.jam", "compressible": false, "charSet": "", "extensions": "jam" }
            , { "id": 665, "source": "iana", "value": "application/vnd.japannet-directory-service", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 666, "source": "iana", "value": "application/vnd.japannet-jpnstore-wakeup", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 667, "source": "iana", "value": "application/vnd.japannet-payment-wakeup", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 668, "source": "iana", "value": "application/vnd.japannet-registration", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 669, "source": "iana", "value": "application/vnd.japannet-registration-wakeup", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 670, "source": "iana", "value": "application/vnd.japannet-setstore-wakeup", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 671, "source": "iana", "value": "application/vnd.japannet-verification", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 672, "source": "iana", "value": "application/vnd.japannet-verification-wakeup", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 673, "source": "iana", "value": "application/vnd.jcp.javame.midlet-rms", "compressible": false, "charSet": "", "extensions": "rms" }
            , { "id": 674, "source": "iana", "value": "application/vnd.jisp", "compressible": false, "charSet": "", "extensions": "jisp" }
            , { "id": 675, "source": "iana", "value": "application/vnd.joost.joda-archive", "compressible": false, "charSet": "", "extensions": "joda" }
            , { "id": 676, "source": "iana", "value": "application/vnd.jsk.isdn-ngn", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 677, "source": "iana", "value": "application/vnd.kahootz", "compressible": false, "charSet": "", "extensions": "ktz, ktr" }
            , { "id": 678, "source": "iana", "value": "application/vnd.kde.karbon", "compressible": false, "charSet": "", "extensions": "karbon" }
            , { "id": 679, "source": "iana", "value": "application/vnd.kde.kchart", "compressible": false, "charSet": "", "extensions": "chrt" }
            , { "id": 680, "source": "iana", "value": "application/vnd.kde.kformula", "compressible": false, "charSet": "", "extensions": "kfo" }
            , { "id": 681, "source": "iana", "value": "application/vnd.kde.kivio", "compressible": false, "charSet": "", "extensions": "flw" }
            , { "id": 682, "source": "iana", "value": "application/vnd.kde.kontour", "compressible": false, "charSet": "", "extensions": "kon" }
            , { "id": 683, "source": "iana", "value": "application/vnd.kde.kpresenter", "compressible": false, "charSet": "", "extensions": "kpr, kpt" }
            , { "id": 684, "source": "iana", "value": "application/vnd.kde.kspread", "compressible": false, "charSet": "", "extensions": "ksp" }
            , { "id": 685, "source": "iana", "value": "application/vnd.kde.kword", "compressible": false, "charSet": "", "extensions": "kwd, kwt" }
            , { "id": 686, "source": "iana", "value": "application/vnd.kenameaapp", "compressible": false, "charSet": "", "extensions": "htke" }
            , { "id": 687, "source": "iana", "value": "application/vnd.kidspiration", "compressible": false, "charSet": "", "extensions": "kia" }
            , { "id": 688, "source": "iana", "value": "application/vnd.kinar", "compressible": false, "charSet": "", "extensions": "kne, knp" }
            , { "id": 689, "source": "iana", "value": "application/vnd.koan", "compressible": false, "charSet": "", "extensions": "skp, skd, skt, skm" }
            , { "id": 690, "source": "iana", "value": "application/vnd.kodak-descriptor", "compressible": false, "charSet": "", "extensions": "sse" }
            , { "id": 691, "source": "iana", "value": "application/vnd.las.las+xml", "compressible": false, "charSet": "", "extensions": "lasxml" }
            , { "id": 692, "source": "iana", "value": "application/vnd.liberty-request+xml", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 693, "source": "iana", "value": "application/vnd.llamagraphics.life-balance.desktop", "compressible": false, "charSet": "", "extensions": "lbd" }
            , { "id": 694, "source": "iana", "value": "application/vnd.llamagraphics.life-balance.exchange+xml", "compressible": false, "charSet": "", "extensions": "lbe" }
            , { "id": 695, "source": "iana", "value": "application/vnd.lotus-1-2-3", "compressible": false, "charSet": "", "extensions": "123" }
            , { "id": 696, "source": "iana", "value": "application/vnd.lotus-approach", "compressible": false, "charSet": "", "extensions": "apr" }
            , { "id": 697, "source": "iana", "value": "application/vnd.lotus-freelance", "compressible": false, "charSet": "", "extensions": "pre" }
            , { "id": 698, "source": "iana", "value": "application/vnd.lotus-notes", "compressible": false, "charSet": "", "extensions": "nsf" }
            , { "id": 699, "source": "iana", "value": "application/vnd.lotus-organizer", "compressible": false, "charSet": "", "extensions": "org" }
            , { "id": 700, "source": "iana", "value": "application/vnd.lotus-screencam", "compressible": false, "charSet": "", "extensions": "scm" }
            , { "id": 701, "source": "iana", "value": "application/vnd.lotus-wordpro", "compressible": false, "charSet": "", "extensions": "lwp" }
            , { "id": 702, "source": "iana", "value": "application/vnd.macports.portpkg", "compressible": false, "charSet": "", "extensions": "portpkg" }
            , { "id": 703, "source": "iana", "value": "application/vnd.mapbox-vector-tile", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 704, "source": "iana", "value": "application/vnd.marlin.drm.actiontoken+xml", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 705, "source": "iana", "value": "application/vnd.marlin.drm.conftoken+xml", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 706, "source": "iana", "value": "application/vnd.marlin.drm.license+xml", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 707, "source": "iana", "value": "application/vnd.marlin.drm.mdcf", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 708, "source": "iana", "value": "application/vnd.mason+json", "compressible": true, "charSet": "", "extensions": "" }
            , { "id": 709, "source": "iana", "value": "application/vnd.maxmind.maxmind-db", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 710, "source": "iana", "value": "application/vnd.mcd", "compressible": false, "charSet": "", "extensions": "mcd" }
            , { "id": 711, "source": "iana", "value": "application/vnd.medcalcdata", "compressible": false, "charSet": "", "extensions": "mc1" }
            , { "id": 712, "source": "iana", "value": "application/vnd.mediastation.cdkey", "compressible": false, "charSet": "", "extensions": "cdkey" }
            , { "id": 713, "source": "iana", "value": "application/vnd.meridian-slingshot", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 714, "source": "iana", "value": "application/vnd.mfer", "compressible": false, "charSet": "", "extensions": "mwf" }
            , { "id": 715, "source": "iana", "value": "application/vnd.mfmp", "compressible": false, "charSet": "", "extensions": "mfm" }
            , { "id": 716, "source": "iana", "value": "application/vnd.micro+json", "compressible": true, "charSet": "", "extensions": "" }
            , { "id": 717, "source": "iana", "value": "application/vnd.micrografx.flo", "compressible": false, "charSet": "", "extensions": "flo" }
            , { "id": 718, "source": "iana", "value": "application/vnd.micrografx.igx", "compressible": false, "charSet": "", "extensions": "igx" }
            , { "id": 719, "source": "iana", "value": "application/vnd.microsoft.portable-executable", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 720, "source": "iana", "value": "application/vnd.miele+json", "compressible": true, "charSet": "", "extensions": "" }
            , { "id": 721, "source": "iana", "value": "application/vnd.mif", "compressible": false, "charSet": "", "extensions": "mif" }
            , { "id": 722, "source": "iana", "value": "application/vnd.minisoft-hp3000-save", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 723, "source": "iana", "value": "application/vnd.mitsubishi.misty-guard.trustweb", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 724, "source": "iana", "value": "application/vnd.mobius.daf", "compressible": false, "charSet": "", "extensions": "daf" }
            , { "id": 725, "source": "iana", "value": "application/vnd.mobius.dis", "compressible": false, "charSet": "", "extensions": "dis" }
            , { "id": 726, "source": "iana", "value": "application/vnd.mobius.mbk", "compressible": false, "charSet": "", "extensions": "mbk" }
            , { "id": 727, "source": "iana", "value": "application/vnd.mobius.mqy", "compressible": false, "charSet": "", "extensions": "mqy" }
            , { "id": 728, "source": "iana", "value": "application/vnd.mobius.msl", "compressible": false, "charSet": "", "extensions": "msl" }
            , { "id": 729, "source": "iana", "value": "application/vnd.mobius.plc", "compressible": false, "charSet": "", "extensions": "plc" }
            , { "id": 730, "source": "iana", "value": "application/vnd.mobius.txf", "compressible": false, "charSet": "", "extensions": "txf" }
            , { "id": 731, "source": "iana", "value": "application/vnd.mophun.application", "compressible": false, "charSet": "", "extensions": "mpn" }
            , { "id": 732, "source": "iana", "value": "application/vnd.mophun.certificate", "compressible": false, "charSet": "", "extensions": "mpc" }
            , { "id": 733, "source": "iana", "value": "application/vnd.motorola.flexsuite", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 734, "source": "iana", "value": "application/vnd.motorola.flexsuite.adsi", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 735, "source": "iana", "value": "application/vnd.motorola.flexsuite.fis", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 736, "source": "iana", "value": "application/vnd.motorola.flexsuite.gotap", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 737, "source": "iana", "value": "application/vnd.motorola.flexsuite.kmr", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 738, "source": "iana", "value": "application/vnd.motorola.flexsuite.ttc", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 739, "source": "iana", "value": "application/vnd.motorola.flexsuite.wem", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 740, "source": "iana", "value": "application/vnd.motorola.iprm", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 741, "source": "iana", "value": "application/vnd.mozilla.xul+xml", "compressible": true, "charSet": "", "extensions": "xul" }
            , { "id": 742, "source": "iana", "value": "application/vnd.ms-3mfdocument", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 743, "source": "iana", "value": "application/vnd.ms-artgalry", "compressible": false, "charSet": "", "extensions": "cil" }
            , { "id": 744, "source": "iana", "value": "application/vnd.ms-asf", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 745, "source": "iana", "value": "application/vnd.ms-cab-compressed", "compressible": false, "charSet": "", "extensions": "cab" }
            , { "id": 746, "source": "apache", "value": "application/vnd.ms-color.iccprofile", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 747, "source": "iana", "value": "application/vnd.ms-excel", "compressible": false, "charSet": "", "extensions": "xls, xlm, xla, xlc, xlt, xlw" }
            , { "id": 748, "source": "iana", "value": "application/vnd.ms-excel.addin.macroenabled.12", "compressible": false, "charSet": "", "extensions": "xlam" }
            , { "id": 749, "source": "iana", "value": "application/vnd.ms-excel.sheet.binary.macroenabled.12", "compressible": false, "charSet": "", "extensions": "xlsb" }
            , { "id": 750, "source": "iana", "value": "application/vnd.ms-excel.sheet.macroenabled.12", "compressible": false, "charSet": "", "extensions": "xlsm" }
            , { "id": 751, "source": "iana", "value": "application/vnd.ms-excel.template.macroenabled.12", "compressible": false, "charSet": "", "extensions": "xltm" }
            , { "id": 752, "source": "iana", "value": "application/vnd.ms-fontobject", "compressible": true, "charSet": "", "extensions": "eot" }
            , { "id": 753, "source": "iana", "value": "application/vnd.ms-htmlhelp", "compressible": false, "charSet": "", "extensions": "chm" }
            , { "id": 754, "source": "iana", "value": "application/vnd.ms-ims", "compressible": false, "charSet": "", "extensions": "ims" }
            , { "id": 755, "source": "iana", "value": "application/vnd.ms-lrm", "compressible": false, "charSet": "", "extensions": "lrm" }
            , { "id": 756, "source": "iana", "value": "application/vnd.ms-office.activex+xml", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 757, "source": "iana", "value": "application/vnd.ms-officetheme", "compressible": false, "charSet": "", "extensions": "thmx" }
            , { "id": 758, "source": "apache", "value": "application/vnd.ms-opentype", "compressible": true, "charSet": "", "extensions": "" }
            , { "id": 759, "source": "apache", "value": "application/vnd.ms-package.obfuscated-opentype", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 760, "source": "apache", "value": "application/vnd.ms-pki.seccat", "compressible": false, "charSet": "", "extensions": "cat" }
            , { "id": 761, "source": "apache", "value": "application/vnd.ms-pki.stl", "compressible": false, "charSet": "", "extensions": "stl" }
            , { "id": 762, "source": "iana", "value": "application/vnd.ms-playready.initiator+xml", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 763, "source": "iana", "value": "application/vnd.ms-powerpoint", "compressible": false, "charSet": "", "extensions": "ppt, pps, pot" }
            , { "id": 764, "source": "iana", "value": "application/vnd.ms-powerpoint.addin.macroenabled.12", "compressible": false, "charSet": "", "extensions": "ppam" }
            , { "id": 765, "source": "iana", "value": "application/vnd.ms-powerpoint.presentation.macroenabled.12", "compressible": false, "charSet": "", "extensions": "pptm" }
            , { "id": 766, "source": "iana", "value": "application/vnd.ms-powerpoint.slide.macroenabled.12", "compressible": false, "charSet": "", "extensions": "sldm" }
            , { "id": 767, "source": "iana", "value": "application/vnd.ms-powerpoint.slideshow.macroenabled.12", "compressible": false, "charSet": "", "extensions": "ppsm" }
            , { "id": 768, "source": "iana", "value": "application/vnd.ms-powerpoint.template.macroenabled.12", "compressible": false, "charSet": "", "extensions": "potm" }
            , { "id": 769, "source": "iana", "value": "application/vnd.ms-printdevicecapabilities+xml", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 770, "source": "apache", "value": "application/vnd.ms-printing.printticket+xml", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 771, "source": "iana", "value": "application/vnd.ms-printschematicket+xml", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 772, "source": "iana", "value": "application/vnd.ms-project", "compressible": false, "charSet": "", "extensions": "mpp, mpt" }
            , { "id": 773, "source": "iana", "value": "application/vnd.ms-tnef", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 774, "source": "iana", "value": "application/vnd.ms-windows.devicepairing", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 775, "source": "iana", "value": "application/vnd.ms-windows.nwprinting.oob", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 776, "source": "iana", "value": "application/vnd.ms-windows.printerpairing", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 777, "source": "iana", "value": "application/vnd.ms-windows.wsd.oob", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 778, "source": "iana", "value": "application/vnd.ms-wmdrm.lic-chlg-req", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 779, "source": "iana", "value": "application/vnd.ms-wmdrm.lic-resp", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 780, "source": "iana", "value": "application/vnd.ms-wmdrm.meter-chlg-req", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 781, "source": "iana", "value": "application/vnd.ms-wmdrm.meter-resp", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 782, "source": "iana", "value": "application/vnd.ms-word.document.macroenabled.12", "compressible": false, "charSet": "", "extensions": "docm" }
            , { "id": 783, "source": "iana", "value": "application/vnd.ms-word.template.macroenabled.12", "compressible": false, "charSet": "", "extensions": "dotm" }
            , { "id": 784, "source": "iana", "value": "application/vnd.ms-works", "compressible": false, "charSet": "", "extensions": "wps, wks, wcm, wdb" }
            , { "id": 785, "source": "iana", "value": "application/vnd.ms-wpl", "compressible": false, "charSet": "", "extensions": "wpl" }
            , { "id": 786, "source": "iana", "value": "application/vnd.ms-xpsdocument", "compressible": false, "charSet": "", "extensions": "xps" }
            , { "id": 787, "source": "iana", "value": "application/vnd.msa-disk-image", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 788, "source": "iana", "value": "application/vnd.mseq", "compressible": false, "charSet": "", "extensions": "mseq" }
            , { "id": 789, "source": "iana", "value": "application/vnd.msign", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 790, "source": "iana", "value": "application/vnd.multiad.creator", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 791, "source": "iana", "value": "application/vnd.multiad.creator.cif", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 792, "source": "iana", "value": "application/vnd.music-niff", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 793, "source": "iana", "value": "application/vnd.musician", "compressible": false, "charSet": "", "extensions": "mus" }
            , { "id": 794, "source": "iana", "value": "application/vnd.muvee.style", "compressible": false, "charSet": "", "extensions": "msty" }
            , { "id": 795, "source": "iana", "value": "application/vnd.mynfc", "compressible": false, "charSet": "", "extensions": "taglet" }
            , { "id": 796, "source": "iana", "value": "application/vnd.ncd.control", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 797, "source": "iana", "value": "application/vnd.ncd.reference", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 798, "source": "iana", "value": "application/vnd.nervana", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 799, "source": "iana", "value": "application/vnd.netfpx", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 800, "source": "iana", "value": "application/vnd.neurolanguage.nlu", "compressible": false, "charSet": "", "extensions": "nlu" }
            , { "id": 801, "source": "iana", "value": "application/vnd.nintendo.nitro.rom", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 802, "source": "iana", "value": "application/vnd.nintendo.snes.rom", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 803, "source": "iana", "value": "application/vnd.nitf", "compressible": false, "charSet": "", "extensions": "ntf, nitf" }
            , { "id": 804, "source": "iana", "value": "application/vnd.noblenet-directory", "compressible": false, "charSet": "", "extensions": "nnd" }
            , { "id": 805, "source": "iana", "value": "application/vnd.noblenet-sealer", "compressible": false, "charSet": "", "extensions": "nns" }
            , { "id": 806, "source": "iana", "value": "application/vnd.noblenet-web", "compressible": false, "charSet": "", "extensions": "nnw" }
            , { "id": 807, "source": "iana", "value": "application/vnd.nokia.catalogs", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 808, "source": "iana", "value": "application/vnd.nokia.conml+wbxml", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 809, "source": "iana", "value": "application/vnd.nokia.conml+xml", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 810, "source": "iana", "value": "application/vnd.nokia.iptv.config+xml", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 811, "source": "iana", "value": "application/vnd.nokia.isds-radio-presets", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 812, "source": "iana", "value": "application/vnd.nokia.landmark+wbxml", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 813, "source": "iana", "value": "application/vnd.nokia.landmark+xml", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 814, "source": "iana", "value": "application/vnd.nokia.landmarkcollection+xml", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 815, "source": "iana", "value": "application/vnd.nokia.n-gage.ac+xml", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 816, "source": "iana", "value": "application/vnd.nokia.n-gage.data", "compressible": false, "charSet": "", "extensions": "ngdat" }
            , { "id": 817, "source": "iana", "value": "application/vnd.nokia.n-gage.symbian.install", "compressible": false, "charSet": "", "extensions": "n-gage" }
            , { "id": 818, "source": "iana", "value": "application/vnd.nokia.ncd", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 819, "source": "iana", "value": "application/vnd.nokia.pcd+wbxml", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 820, "source": "iana", "value": "application/vnd.nokia.pcd+xml", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 821, "source": "iana", "value": "application/vnd.nokia.radio-preset", "compressible": false, "charSet": "", "extensions": "rpst" }
            , { "id": 822, "source": "iana", "value": "application/vnd.nokia.radio-presets", "compressible": false, "charSet": "", "extensions": "rpss" }
            , { "id": 823, "source": "iana", "value": "application/vnd.novadigm.edm", "compressible": false, "charSet": "", "extensions": "edm" }
            , { "id": 824, "source": "iana", "value": "application/vnd.novadigm.edx", "compressible": false, "charSet": "", "extensions": "edx" }
            , { "id": 825, "source": "iana", "value": "application/vnd.novadigm.ext", "compressible": false, "charSet": "", "extensions": "ext" }
            , { "id": 826, "source": "iana", "value": "application/vnd.ntt-local.content-share", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 827, "source": "iana", "value": "application/vnd.ntt-local.file-transfer", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 828, "source": "iana", "value": "application/vnd.ntt-local.ogw_remote-access", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 829, "source": "iana", "value": "application/vnd.ntt-local.sip-ta_remote", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 830, "source": "iana", "value": "application/vnd.ntt-local.sip-ta_tcp_stream", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 831, "source": "iana", "value": "application/vnd.oasis.opendocument.chart", "compressible": false, "charSet": "", "extensions": "odc" }
            , { "id": 832, "source": "iana", "value": "application/vnd.oasis.opendocument.chart-template", "compressible": false, "charSet": "", "extensions": "otc" }
            , { "id": 833, "source": "iana", "value": "application/vnd.oasis.opendocument.database", "compressible": false, "charSet": "", "extensions": "odb" }
            , { "id": 834, "source": "iana", "value": "application/vnd.oasis.opendocument.formula", "compressible": false, "charSet": "", "extensions": "odf" }
            , { "id": 835, "source": "iana", "value": "application/vnd.oasis.opendocument.formula-template", "compressible": false, "charSet": "", "extensions": "odft" }
            , { "id": 836, "source": "iana", "value": "application/vnd.oasis.opendocument.graphics", "compressible": false, "charSet": "", "extensions": "odg" }
            , { "id": 837, "source": "iana", "value": "application/vnd.oasis.opendocument.graphics-template", "compressible": false, "charSet": "", "extensions": "otg" }
            , { "id": 838, "source": "iana", "value": "application/vnd.oasis.opendocument.image", "compressible": false, "charSet": "", "extensions": "odi" }
            , { "id": 839, "source": "iana", "value": "application/vnd.oasis.opendocument.image-template", "compressible": false, "charSet": "", "extensions": "oti" }
            , { "id": 840, "source": "iana", "value": "application/vnd.oasis.opendocument.presentation", "compressible": false, "charSet": "", "extensions": "odp" }
            , { "id": 841, "source": "iana", "value": "application/vnd.oasis.opendocument.presentation-template", "compressible": false, "charSet": "", "extensions": "otp" }
            , { "id": 842, "source": "iana", "value": "application/vnd.oasis.opendocument.spreadsheet", "compressible": false, "charSet": "", "extensions": "ods" }
            , { "id": 843, "source": "iana", "value": "application/vnd.oasis.opendocument.spreadsheet-template", "compressible": false, "charSet": "", "extensions": "ots" }
            , { "id": 844, "source": "iana", "value": "application/vnd.oasis.opendocument.text", "compressible": false, "charSet": "", "extensions": "odt" }
            , { "id": 845, "source": "iana", "value": "application/vnd.oasis.opendocument.text-master", "compressible": false, "charSet": "", "extensions": "odm" }
            , { "id": 846, "source": "iana", "value": "application/vnd.oasis.opendocument.text-template", "compressible": false, "charSet": "", "extensions": "ott" }
            , { "id": 847, "source": "iana", "value": "application/vnd.oasis.opendocument.text-web", "compressible": false, "charSet": "", "extensions": "oth" }
            , { "id": 848, "source": "iana", "value": "application/vnd.obn", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 849, "source": "iana", "value": "application/vnd.oftn.l10n+json", "compressible": true, "charSet": "", "extensions": "" }
            , { "id": 850, "source": "iana", "value": "application/vnd.oipf.contentaccessdownload+xml", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 851, "source": "iana", "value": "application/vnd.oipf.contentaccessstreaming+xml", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 852, "source": "iana", "value": "application/vnd.oipf.cspg-hexbinary", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 853, "source": "iana", "value": "application/vnd.oipf.dae.svg+xml", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 854, "source": "iana", "value": "application/vnd.oipf.dae.xhtml+xml", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 855, "source": "iana", "value": "application/vnd.oipf.mippvcontrolmessage+xml", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 856, "source": "iana", "value": "application/vnd.oipf.pae.gem", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 857, "source": "iana", "value": "application/vnd.oipf.spdiscovery+xml", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 858, "source": "iana", "value": "application/vnd.oipf.spdlist+xml", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 859, "source": "iana", "value": "application/vnd.oipf.ueprofile+xml", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 860, "source": "iana", "value": "application/vnd.oipf.userprofile+xml", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 861, "source": "iana", "value": "application/vnd.olpc-sugar", "compressible": false, "charSet": "", "extensions": "xo" }
            , { "id": 862, "source": "iana", "value": "application/vnd.oma-scws-config", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 863, "source": "iana", "value": "application/vnd.oma-scws-http-request", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 864, "source": "iana", "value": "application/vnd.oma-scws-http-response", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 865, "source": "iana", "value": "application/vnd.oma.bcast.associated-procedure-parameter+xml", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 866, "source": "iana", "value": "application/vnd.oma.bcast.drm-trigger+xml", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 867, "source": "iana", "value": "application/vnd.oma.bcast.imd+xml", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 868, "source": "iana", "value": "application/vnd.oma.bcast.ltkm", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 869, "source": "iana", "value": "application/vnd.oma.bcast.notification+xml", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 870, "source": "iana", "value": "application/vnd.oma.bcast.provisioningtrigger", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 871, "source": "iana", "value": "application/vnd.oma.bcast.sgboot", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 872, "source": "iana", "value": "application/vnd.oma.bcast.sgdd+xml", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 873, "source": "iana", "value": "application/vnd.oma.bcast.sgdu", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 874, "source": "iana", "value": "application/vnd.oma.bcast.simple-symbol-container", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 875, "source": "iana", "value": "application/vnd.oma.bcast.smartcard-trigger+xml", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 876, "source": "iana", "value": "application/vnd.oma.bcast.sprov+xml", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 877, "source": "iana", "value": "application/vnd.oma.bcast.stkm", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 878, "source": "iana", "value": "application/vnd.oma.cab-address-book+xml", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 879, "source": "iana", "value": "application/vnd.oma.cab-feature-handler+xml", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 880, "source": "iana", "value": "application/vnd.oma.cab-pcc+xml", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 881, "source": "iana", "value": "application/vnd.oma.cab-subs-invite+xml", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 882, "source": "iana", "value": "application/vnd.oma.cab-user-prefs+xml", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 883, "source": "iana", "value": "application/vnd.oma.dcd", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 884, "source": "iana", "value": "application/vnd.oma.dcdc", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 885, "source": "iana", "value": "application/vnd.oma.dd2+xml", "compressible": false, "charSet": "", "extensions": "dd2" }
            , { "id": 886, "source": "iana", "value": "application/vnd.oma.drm.risd+xml", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 887, "source": "iana", "value": "application/vnd.oma.group-usage-list+xml", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 888, "source": "iana", "value": "application/vnd.oma.pal+xml", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 889, "source": "iana", "value": "application/vnd.oma.poc.detailed-progress-report+xml", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 890, "source": "iana", "value": "application/vnd.oma.poc.final-report+xml", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 891, "source": "iana", "value": "application/vnd.oma.poc.groups+xml", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 892, "source": "iana", "value": "application/vnd.oma.poc.invocation-descriptor+xml", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 893, "source": "iana", "value": "application/vnd.oma.poc.optimized-progress-report+xml", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 894, "source": "iana", "value": "application/vnd.oma.push", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 895, "source": "iana", "value": "application/vnd.oma.scidm.messages+xml", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 896, "source": "iana", "value": "application/vnd.oma.xcap-directory+xml", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 897, "source": "iana", "value": "application/vnd.omads-email+xml", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 898, "source": "iana", "value": "application/vnd.omads-file+xml", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 899, "source": "iana", "value": "application/vnd.omads-folder+xml", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 900, "source": "iana", "value": "application/vnd.omaloc-supl-init", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 901, "source": "iana", "value": "application/vnd.onepager", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 902, "source": "iana", "value": "application/vnd.openblox.game+xml", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 903, "source": "iana", "value": "application/vnd.openblox.game-binary", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 904, "source": "iana", "value": "application/vnd.openeye.oeb", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 905, "source": "apache", "value": "application/vnd.openofficeorg.extension", "compressible": false, "charSet": "", "extensions": "oxt" }
            , { "id": 906, "source": "iana", "value": "application/vnd.openxmlformats-officedocument.custom-properties+xml", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 907, "source": "iana", "value": "application/vnd.openxmlformats-officedocument.customxmlproperties+xml", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 908, "source": "iana", "value": "application/vnd.openxmlformats-officedocument.drawing+xml", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 909, "source": "iana", "value": "application/vnd.openxmlformats-officedocument.drawingml.chart+xml", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 910, "source": "iana", "value": "application/vnd.openxmlformats-officedocument.drawingml.chartshapes+xml", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 911, "source": "iana", "value": "application/vnd.openxmlformats-officedocument.drawingml.diagramcolors+xml", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 912, "source": "iana", "value": "application/vnd.openxmlformats-officedocument.drawingml.diagramdata+xml", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 913, "source": "iana", "value": "application/vnd.openxmlformats-officedocument.drawingml.diagramlayout+xml", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 914, "source": "iana", "value": "application/vnd.openxmlformats-officedocument.drawingml.diagramstyle+xml", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 915, "source": "iana", "value": "application/vnd.openxmlformats-officedocument.extended-properties+xml", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 916, "source": "iana", "value": "application/vnd.openxmlformats-officedocument.presentationml-template", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 917, "source": "iana", "value": "application/vnd.openxmlformats-officedocument.presentationml.commentauthors+xml", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 918, "source": "iana", "value": "application/vnd.openxmlformats-officedocument.presentationml.comments+xml", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 919, "source": "iana", "value": "application/vnd.openxmlformats-officedocument.presentationml.handoutmaster+xml", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 920, "source": "iana", "value": "application/vnd.openxmlformats-officedocument.presentationml.notesmaster+xml", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 921, "source": "iana", "value": "application/vnd.openxmlformats-officedocument.presentationml.notesslide+xml", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 922, "source": "iana", "value": "application/vnd.openxmlformats-officedocument.presentationml.presentation", "compressible": false, "charSet": "", "extensions": "pptx" }
            , { "id": 923, "source": "iana", "value": "application/vnd.openxmlformats-officedocument.presentationml.presentation.main+xml", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 924, "source": "iana", "value": "application/vnd.openxmlformats-officedocument.presentationml.presprops+xml", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 925, "source": "iana", "value": "application/vnd.openxmlformats-officedocument.presentationml.slide", "compressible": false, "charSet": "", "extensions": "sldx" }
            , { "id": 926, "source": "iana", "value": "application/vnd.openxmlformats-officedocument.presentationml.slide+xml", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 927, "source": "iana", "value": "application/vnd.openxmlformats-officedocument.presentationml.slidelayout+xml", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 928, "source": "iana", "value": "application/vnd.openxmlformats-officedocument.presentationml.slidemaster+xml", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 929, "source": "iana", "value": "application/vnd.openxmlformats-officedocument.presentationml.slideshow", "compressible": false, "charSet": "", "extensions": "ppsx" }
            , { "id": 930, "source": "iana", "value": "application/vnd.openxmlformats-officedocument.presentationml.slideshow.main+xml", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 931, "source": "iana", "value": "application/vnd.openxmlformats-officedocument.presentationml.slideupdateinfo+xml", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 932, "source": "iana", "value": "application/vnd.openxmlformats-officedocument.presentationml.tablestyles+xml", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 933, "source": "iana", "value": "application/vnd.openxmlformats-officedocument.presentationml.tags+xml", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 934, "source": "apache", "value": "application/vnd.openxmlformats-officedocument.presentationml.template", "compressible": false, "charSet": "", "extensions": "potx" }
            , { "id": 935, "source": "iana", "value": "application/vnd.openxmlformats-officedocument.presentationml.template.main+xml", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 936, "source": "iana", "value": "application/vnd.openxmlformats-officedocument.presentationml.viewprops+xml", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 937, "source": "iana", "value": "application/vnd.openxmlformats-officedocument.spreadsheetml-template", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 938, "source": "iana", "value": "application/vnd.openxmlformats-officedocument.spreadsheetml.calcchain+xml", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 939, "source": "iana", "value": "application/vnd.openxmlformats-officedocument.spreadsheetml.chartsheet+xml", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 940, "source": "iana", "value": "application/vnd.openxmlformats-officedocument.spreadsheetml.comments+xml", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 941, "source": "iana", "value": "application/vnd.openxmlformats-officedocument.spreadsheetml.connections+xml", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 942, "source": "iana", "value": "application/vnd.openxmlformats-officedocument.spreadsheetml.dialogsheet+xml", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 943, "source": "iana", "value": "application/vnd.openxmlformats-officedocument.spreadsheetml.externallink+xml", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 944, "source": "iana", "value": "application/vnd.openxmlformats-officedocument.spreadsheetml.pivotcachedefinition+xml", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 945, "source": "iana", "value": "application/vnd.openxmlformats-officedocument.spreadsheetml.pivotcacherecords+xml", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 946, "source": "iana", "value": "application/vnd.openxmlformats-officedocument.spreadsheetml.pivottable+xml", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 947, "source": "iana", "value": "application/vnd.openxmlformats-officedocument.spreadsheetml.querytable+xml", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 948, "source": "iana", "value": "application/vnd.openxmlformats-officedocument.spreadsheetml.revisionheaders+xml", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 949, "source": "iana", "value": "application/vnd.openxmlformats-officedocument.spreadsheetml.revisionlog+xml", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 950, "source": "iana", "value": "application/vnd.openxmlformats-officedocument.spreadsheetml.sharedstrings+xml", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 951, "source": "iana", "value": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", "compressible": false, "charSet": "", "extensions": "xlsx" }
            , { "id": 952, "source": "iana", "value": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 953, "source": "iana", "value": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheetmetadata+xml", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 954, "source": "iana", "value": "application/vnd.openxmlformats-officedocument.spreadsheetml.styles+xml", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 955, "source": "iana", "value": "application/vnd.openxmlformats-officedocument.spreadsheetml.table+xml", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 956, "source": "iana", "value": "application/vnd.openxmlformats-officedocument.spreadsheetml.tablesinglecells+xml", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 957, "source": "apache", "value": "application/vnd.openxmlformats-officedocument.spreadsheetml.template", "compressible": false, "charSet": "", "extensions": "xltx" }
            , { "id": 958, "source": "iana", "value": "application/vnd.openxmlformats-officedocument.spreadsheetml.template.main+xml", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 959, "source": "iana", "value": "application/vnd.openxmlformats-officedocument.spreadsheetml.usernames+xml", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 960, "source": "iana", "value": "application/vnd.openxmlformats-officedocument.spreadsheetml.volatiledependencies+xml", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 961, "source": "iana", "value": "application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 962, "source": "iana", "value": "application/vnd.openxmlformats-officedocument.theme+xml", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 963, "source": "iana", "value": "application/vnd.openxmlformats-officedocument.themeoverride+xml", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 964, "source": "iana", "value": "application/vnd.openxmlformats-officedocument.vmldrawing", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 965, "source": "iana", "value": "application/vnd.openxmlformats-officedocument.wordprocessingml-template", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 966, "source": "iana", "value": "application/vnd.openxmlformats-officedocument.wordprocessingml.comments+xml", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 967, "source": "iana", "value": "application/vnd.openxmlformats-officedocument.wordprocessingml.document", "compressible": false, "charSet": "", "extensions": "docx" }
            , { "id": 968, "source": "iana", "value": "application/vnd.openxmlformats-officedocument.wordprocessingml.document.glossary+xml", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 969, "source": "iana", "value": "application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 970, "source": "iana", "value": "application/vnd.openxmlformats-officedocument.wordprocessingml.endnotes+xml", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 971, "source": "iana", "value": "application/vnd.openxmlformats-officedocument.wordprocessingml.fonttable+xml", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 972, "source": "iana", "value": "application/vnd.openxmlformats-officedocument.wordprocessingml.footer+xml", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 973, "source": "iana", "value": "application/vnd.openxmlformats-officedocument.wordprocessingml.footnotes+xml", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 974, "source": "iana", "value": "application/vnd.openxmlformats-officedocument.wordprocessingml.numbering+xml", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 975, "source": "iana", "value": "application/vnd.openxmlformats-officedocument.wordprocessingml.settings+xml", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 976, "source": "iana", "value": "application/vnd.openxmlformats-officedocument.wordprocessingml.styles+xml", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 977, "source": "apache", "value": "application/vnd.openxmlformats-officedocument.wordprocessingml.template", "compressible": false, "charSet": "", "extensions": "dotx" }
            , { "id": 978, "source": "iana", "value": "application/vnd.openxmlformats-officedocument.wordprocessingml.template.main+xml", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 979, "source": "iana", "value": "application/vnd.openxmlformats-officedocument.wordprocessingml.websettings+xml", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 980, "source": "iana", "value": "application/vnd.openxmlformats-package.core-properties+xml", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 981, "source": "iana", "value": "application/vnd.openxmlformats-package.digital-signature-xmlsignature+xml", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 982, "source": "iana", "value": "application/vnd.openxmlformats-package.relationships+xml", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 983, "source": "iana", "value": "application/vnd.oracle.resource+json", "compressible": true, "charSet": "", "extensions": "" }
            , { "id": 984, "source": "iana", "value": "application/vnd.orange.indata", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 985, "source": "iana", "value": "application/vnd.osa.netdeploy", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 986, "source": "iana", "value": "application/vnd.osgeo.mapguide.package", "compressible": false, "charSet": "", "extensions": "mgp" }
            , { "id": 987, "source": "iana", "value": "application/vnd.osgi.bundle", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 988, "source": "iana", "value": "application/vnd.osgi.dp", "compressible": false, "charSet": "", "extensions": "dp" }
            , { "id": 989, "source": "iana", "value": "application/vnd.osgi.subsystem", "compressible": false, "charSet": "", "extensions": "esa" }
            , { "id": 990, "source": "iana", "value": "application/vnd.otps.ct-kip+xml", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 991, "source": "iana", "value": "application/vnd.oxli.countgraph", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 992, "source": "iana", "value": "application/vnd.pagerduty+json", "compressible": true, "charSet": "", "extensions": "" }
            , { "id": 993, "source": "iana", "value": "application/vnd.palm", "compressible": false, "charSet": "", "extensions": "pdb, pqa, oprc" }
            , { "id": 994, "source": "iana", "value": "application/vnd.panoply", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 995, "source": "iana", "value": "application/vnd.paos+xml", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 996, "source": "apache", "value": "application/vnd.paos.xml", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 997, "source": "iana", "value": "application/vnd.pawaafile", "compressible": false, "charSet": "", "extensions": "paw" }
            , { "id": 998, "source": "iana", "value": "application/vnd.pcos", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 999, "source": "iana", "value": "application/vnd.pg.format", "compressible": false, "charSet": "", "extensions": "str" }
            , { "id": 1000, "source": "iana", "value": "application/vnd.pg.osasli", "compressible": false, "charSet": "", "extensions": "ei6" }
            , { "id": 1001, "source": "iana", "value": "application/vnd.piaccess.application-licence", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 1002, "source": "iana", "value": "application/vnd.picsel", "compressible": false, "charSet": "", "extensions": "efif" }
            , { "id": 1003, "source": "iana", "value": "application/vnd.pmi.widget", "compressible": false, "charSet": "", "extensions": "wg" }
            , { "id": 1004, "source": "iana", "value": "application/vnd.poc.group-advertisement+xml", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 1005, "source": "iana", "value": "application/vnd.pocketlearn", "compressible": false, "charSet": "", "extensions": "plf" }
            , { "id": 1006, "source": "iana", "value": "application/vnd.powerbuilder6", "compressible": false, "charSet": "", "extensions": "pbd" }
            , { "id": 1007, "source": "iana", "value": "application/vnd.powerbuilder6-s", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 1008, "source": "iana", "value": "application/vnd.powerbuilder7", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 1009, "source": "iana", "value": "application/vnd.powerbuilder7-s", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 1010, "source": "iana", "value": "application/vnd.powerbuilder75", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 1011, "source": "iana", "value": "application/vnd.powerbuilder75-s", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 1012, "source": "iana", "value": "application/vnd.preminet", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 1013, "source": "iana", "value": "application/vnd.previewsystems.box", "compressible": false, "charSet": "", "extensions": "box" }
            , { "id": 1014, "source": "iana", "value": "application/vnd.proteus.magazine", "compressible": false, "charSet": "", "extensions": "mgz" }
            , { "id": 1015, "source": "iana", "value": "application/vnd.publishare-delta-tree", "compressible": false, "charSet": "", "extensions": "qps" }
            , { "id": 1016, "source": "iana", "value": "application/vnd.pvi.ptid1", "compressible": false, "charSet": "", "extensions": "ptid" }
            , { "id": 1017, "source": "iana", "value": "application/vnd.pwg-multiplexed", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 1018, "source": "iana", "value": "application/vnd.pwg-xhtml-print+xml", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 1019, "source": "iana", "value": "application/vnd.qualcomm.brew-app-res", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 1020, "source": "iana", "value": "application/vnd.quark.quarkxpress", "compressible": false, "charSet": "", "extensions": "qxd, qxt, qwd, qwt, qxl, qxb" }
            , { "id": 1021, "source": "iana", "value": "application/vnd.quobject-quoxdocument", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 1022, "source": "iana", "value": "application/vnd.radisys.moml+xml", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 1023, "source": "iana", "value": "application/vnd.radisys.msml+xml", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 1024, "source": "iana", "value": "application/vnd.radisys.msml-audit+xml", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 1025, "source": "iana", "value": "application/vnd.radisys.msml-audit-conf+xml", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 1026, "source": "iana", "value": "application/vnd.radisys.msml-audit-conn+xml", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 1027, "source": "iana", "value": "application/vnd.radisys.msml-audit-dialog+xml", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 1028, "source": "iana", "value": "application/vnd.radisys.msml-audit-stream+xml", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 1029, "source": "iana", "value": "application/vnd.radisys.msml-conf+xml", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 1030, "source": "iana", "value": "application/vnd.radisys.msml-dialog+xml", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 1031, "source": "iana", "value": "application/vnd.radisys.msml-dialog-base+xml", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 1032, "source": "iana", "value": "application/vnd.radisys.msml-dialog-fax-detect+xml", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 1033, "source": "iana", "value": "application/vnd.radisys.msml-dialog-fax-sendrecv+xml", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 1034, "source": "iana", "value": "application/vnd.radisys.msml-dialog-group+xml", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 1035, "source": "iana", "value": "application/vnd.radisys.msml-dialog-speech+xml", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 1036, "source": "iana", "value": "application/vnd.radisys.msml-dialog-transform+xml", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 1037, "source": "iana", "value": "application/vnd.rainstor.data", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 1038, "source": "iana", "value": "application/vnd.rapid", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 1039, "source": "iana", "value": "application/vnd.realvnc.bed", "compressible": false, "charSet": "", "extensions": "bed" }
            , { "id": 1040, "source": "iana", "value": "application/vnd.recordare.musicxml", "compressible": false, "charSet": "", "extensions": "mxl" }
            , { "id": 1041, "source": "iana", "value": "application/vnd.recordare.musicxml+xml", "compressible": false, "charSet": "", "extensions": "musicxml" }
            , { "id": 1042, "source": "iana", "value": "application/vnd.renlearn.rlprint", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 1043, "source": "iana", "value": "application/vnd.rig.cryptonote", "compressible": false, "charSet": "", "extensions": "cryptonote" }
            , { "id": 1044, "source": "apache", "value": "application/vnd.rim.cod", "compressible": false, "charSet": "", "extensions": "cod" }
            , { "id": 1045, "source": "apache", "value": "application/vnd.rn-realmedia", "compressible": false, "charSet": "", "extensions": "rm" }
            , { "id": 1046, "source": "apache", "value": "application/vnd.rn-realmedia-vbr", "compressible": false, "charSet": "", "extensions": "rmvb" }
            , { "id": 1047, "source": "iana", "value": "application/vnd.route66.link66+xml", "compressible": false, "charSet": "", "extensions": "link66" }
            , { "id": 1048, "source": "iana", "value": "application/vnd.rs-274x", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 1049, "source": "iana", "value": "application/vnd.ruckus.download", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 1050, "source": "iana", "value": "application/vnd.s3sms", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 1051, "source": "iana", "value": "application/vnd.sailingtracker.track", "compressible": false, "charSet": "", "extensions": "st" }
            , { "id": 1052, "source": "iana", "value": "application/vnd.sbm.cid", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 1053, "source": "iana", "value": "application/vnd.sbm.mid2", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 1054, "source": "iana", "value": "application/vnd.scribus", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 1055, "source": "iana", "value": "application/vnd.sealed.3df", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 1056, "source": "iana", "value": "application/vnd.sealed.csf", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 1057, "source": "iana", "value": "application/vnd.sealed.doc", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 1058, "source": "iana", "value": "application/vnd.sealed.eml", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 1059, "source": "iana", "value": "application/vnd.sealed.mht", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 1060, "source": "iana", "value": "application/vnd.sealed.net", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 1061, "source": "iana", "value": "application/vnd.sealed.ppt", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 1062, "source": "iana", "value": "application/vnd.sealed.tiff", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 1063, "source": "iana", "value": "application/vnd.sealed.xls", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 1064, "source": "iana", "value": "application/vnd.sealedmedia.softseal.html", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 1065, "source": "iana", "value": "application/vnd.sealedmedia.softseal.pdf", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 1066, "source": "iana", "value": "application/vnd.seemail", "compressible": false, "charSet": "", "extensions": "see" }
            , { "id": 1067, "source": "iana", "value": "application/vnd.sema", "compressible": false, "charSet": "", "extensions": "sema" }
            , { "id": 1068, "source": "iana", "value": "application/vnd.semd", "compressible": false, "charSet": "", "extensions": "semd" }
            , { "id": 1069, "source": "iana", "value": "application/vnd.semf", "compressible": false, "charSet": "", "extensions": "semf" }
            , { "id": 1070, "source": "iana", "value": "application/vnd.shana.informed.formdata", "compressible": false, "charSet": "", "extensions": "ifm" }
            , { "id": 1071, "source": "iana", "value": "application/vnd.shana.informed.formtemplate", "compressible": false, "charSet": "", "extensions": "itp" }
            , { "id": 1072, "source": "iana", "value": "application/vnd.shana.informed.interchange", "compressible": false, "charSet": "", "extensions": "iif" }
            , { "id": 1073, "source": "iana", "value": "application/vnd.shana.informed.package", "compressible": false, "charSet": "", "extensions": "ipk" }
            , { "id": 1074, "source": "iana", "value": "application/vnd.simtech-mindmapper", "compressible": false, "charSet": "", "extensions": "twd, twds" }
            , { "id": 1075, "source": "iana", "value": "application/vnd.siren+json", "compressible": true, "charSet": "", "extensions": "" }
            , { "id": 1076, "source": "iana", "value": "application/vnd.smaf", "compressible": false, "charSet": "", "extensions": "mmf" }
            , { "id": 1077, "source": "iana", "value": "application/vnd.smart.notebook", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 1078, "source": "iana", "value": "application/vnd.smart.teacher", "compressible": false, "charSet": "", "extensions": "teacher" }
            , { "id": 1079, "source": "iana", "value": "application/vnd.software602.filler.form+xml", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 1080, "source": "iana", "value": "application/vnd.software602.filler.form-xml-zip", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 1081, "source": "iana", "value": "application/vnd.solent.sdkm+xml", "compressible": false, "charSet": "", "extensions": "sdkm, sdkd" }
            , { "id": 1082, "source": "iana", "value": "application/vnd.spotfire.dxp", "compressible": false, "charSet": "", "extensions": "dxp" }
            , { "id": 1083, "source": "iana", "value": "application/vnd.spotfire.sfs", "compressible": false, "charSet": "", "extensions": "sfs" }
            , { "id": 1084, "source": "iana", "value": "application/vnd.sss-cod", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 1085, "source": "iana", "value": "application/vnd.sss-dtf", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 1086, "source": "iana", "value": "application/vnd.sss-ntf", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 1087, "source": "apache", "value": "application/vnd.stardivision.calc", "compressible": false, "charSet": "", "extensions": "sdc" }
            , { "id": 1088, "source": "apache", "value": "application/vnd.stardivision.draw", "compressible": false, "charSet": "", "extensions": "sda" }
            , { "id": 1089, "source": "apache", "value": "application/vnd.stardivision.impress", "compressible": false, "charSet": "", "extensions": "sdd" }
            , { "id": 1090, "source": "apache", "value": "application/vnd.stardivision.math", "compressible": false, "charSet": "", "extensions": "smf" }
            , { "id": 1091, "source": "apache", "value": "application/vnd.stardivision.writer", "compressible": false, "charSet": "", "extensions": "sdw, vor" }
            , { "id": 1092, "source": "apache", "value": "application/vnd.stardivision.writer-global", "compressible": false, "charSet": "", "extensions": "sgl" }
            , { "id": 1093, "source": "iana", "value": "application/vnd.stepmania.package", "compressible": false, "charSet": "", "extensions": "smzip" }
            , { "id": 1094, "source": "iana", "value": "application/vnd.stepmania.stepchart", "compressible": false, "charSet": "", "extensions": "sm" }
            , { "id": 1095, "source": "iana", "value": "application/vnd.street-stream", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 1096, "source": "iana", "value": "application/vnd.sun.wadl+xml", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 1097, "source": "apache", "value": "application/vnd.sun.xml.calc", "compressible": false, "charSet": "", "extensions": "sxc" }
            , { "id": 1098, "source": "apache", "value": "application/vnd.sun.xml.calc.template", "compressible": false, "charSet": "", "extensions": "stc" }
            , { "id": 1099, "source": "apache", "value": "application/vnd.sun.xml.draw", "compressible": false, "charSet": "", "extensions": "sxd" }
            , { "id": 1100, "source": "apache", "value": "application/vnd.sun.xml.draw.template", "compressible": false, "charSet": "", "extensions": "std" }
            , { "id": 1101, "source": "apache", "value": "application/vnd.sun.xml.impress", "compressible": false, "charSet": "", "extensions": "sxi" }
            , { "id": 1102, "source": "apache", "value": "application/vnd.sun.xml.impress.template", "compressible": false, "charSet": "", "extensions": "sti" }
            , { "id": 1103, "source": "apache", "value": "application/vnd.sun.xml.math", "compressible": false, "charSet": "", "extensions": "sxm" }
            , { "id": 1104, "source": "apache", "value": "application/vnd.sun.xml.writer", "compressible": false, "charSet": "", "extensions": "sxw" }
            , { "id": 1105, "source": "apache", "value": "application/vnd.sun.xml.writer.global", "compressible": false, "charSet": "", "extensions": "sxg" }
            , { "id": 1106, "source": "apache", "value": "application/vnd.sun.xml.writer.template", "compressible": false, "charSet": "", "extensions": "stw" }
            , { "id": 1107, "source": "iana", "value": "application/vnd.sus-calendar", "compressible": false, "charSet": "", "extensions": "sus, susp" }
            , { "id": 1108, "source": "iana", "value": "application/vnd.svd", "compressible": false, "charSet": "", "extensions": "svd" }
            , { "id": 1109, "source": "iana", "value": "application/vnd.swiftview-ics", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 1110, "source": "apache", "value": "application/vnd.symbian.install", "compressible": false, "charSet": "", "extensions": "sis, sisx" }
            , { "id": 1111, "source": "iana", "value": "application/vnd.syncml+xml", "compressible": false, "charSet": "", "extensions": "xsm" }
            , { "id": 1112, "source": "iana", "value": "application/vnd.syncml.dm+wbxml", "compressible": false, "charSet": "", "extensions": "bdm" }
            , { "id": 1113, "source": "iana", "value": "application/vnd.syncml.dm+xml", "compressible": false, "charSet": "", "extensions": "xdm" }
            , { "id": 1114, "source": "iana", "value": "application/vnd.syncml.dm.notification", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 1115, "source": "iana", "value": "application/vnd.syncml.dmddf+wbxml", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 1116, "source": "iana", "value": "application/vnd.syncml.dmddf+xml", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 1117, "source": "iana", "value": "application/vnd.syncml.dmtnds+wbxml", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 1118, "source": "iana", "value": "application/vnd.syncml.dmtnds+xml", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 1119, "source": "iana", "value": "application/vnd.syncml.ds.notification", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 1120, "source": "iana", "value": "application/vnd.tao.intent-module-archive", "compressible": false, "charSet": "", "extensions": "tao" }
            , { "id": 1121, "source": "iana", "value": "application/vnd.tcpdump.pcap", "compressible": false, "charSet": "", "extensions": "pcap, cap, dmp" }
            , { "id": 1122, "source": "iana", "value": "application/vnd.tmd.mediaflex.api+xml", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 1123, "source": "iana", "value": "application/vnd.tml", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 1124, "source": "iana", "value": "application/vnd.tmobile-livetv", "compressible": false, "charSet": "", "extensions": "tmo" }
            , { "id": 1125, "source": "iana", "value": "application/vnd.trid.tpt", "compressible": false, "charSet": "", "extensions": "tpt" }
            , { "id": 1126, "source": "iana", "value": "application/vnd.triscape.mxs", "compressible": false, "charSet": "", "extensions": "mxs" }
            , { "id": 1127, "source": "iana", "value": "application/vnd.trueapp", "compressible": false, "charSet": "", "extensions": "tra" }
            , { "id": 1128, "source": "iana", "value": "application/vnd.truedoc", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 1129, "source": "iana", "value": "application/vnd.ubisoft.webplayer", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 1130, "source": "iana", "value": "application/vnd.ufdl", "compressible": false, "charSet": "", "extensions": "ufd, ufdl" }
            , { "id": 1131, "source": "iana", "value": "application/vnd.uiq.theme", "compressible": false, "charSet": "", "extensions": "utz" }
            , { "id": 1132, "source": "iana", "value": "application/vnd.umajin", "compressible": false, "charSet": "", "extensions": "umj" }
            , { "id": 1133, "source": "iana", "value": "application/vnd.unity", "compressible": false, "charSet": "", "extensions": "unityweb" }
            , { "id": 1134, "source": "iana", "value": "application/vnd.uoml+xml", "compressible": false, "charSet": "", "extensions": "uoml" }
            , { "id": 1135, "source": "iana", "value": "application/vnd.uplanet.alert", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 1136, "source": "iana", "value": "application/vnd.uplanet.alert-wbxml", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 1137, "source": "iana", "value": "application/vnd.uplanet.bearer-choice", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 1138, "source": "iana", "value": "application/vnd.uplanet.bearer-choice-wbxml", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 1139, "source": "iana", "value": "application/vnd.uplanet.cacheop", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 1140, "source": "iana", "value": "application/vnd.uplanet.cacheop-wbxml", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 1141, "source": "iana", "value": "application/vnd.uplanet.channel", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 1142, "source": "iana", "value": "application/vnd.uplanet.channel-wbxml", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 1143, "source": "iana", "value": "application/vnd.uplanet.list", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 1144, "source": "iana", "value": "application/vnd.uplanet.list-wbxml", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 1145, "source": "iana", "value": "application/vnd.uplanet.listcmd", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 1146, "source": "iana", "value": "application/vnd.uplanet.listcmd-wbxml", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 1147, "source": "iana", "value": "application/vnd.uplanet.signal", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 1148, "source": "iana", "value": "application/vnd.uri-map", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 1149, "source": "iana", "value": "application/vnd.valve.source.material", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 1150, "source": "iana", "value": "application/vnd.vcx", "compressible": false, "charSet": "", "extensions": "vcx" }
            , { "id": 1151, "source": "iana", "value": "application/vnd.vd-study", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 1152, "source": "iana", "value": "application/vnd.vectorworks", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 1153, "source": "iana", "value": "application/vnd.vel+json", "compressible": true, "charSet": "", "extensions": "" }
            , { "id": 1154, "source": "iana", "value": "application/vnd.verimatrix.vcas", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 1155, "source": "iana", "value": "application/vnd.vidsoft.vidconference", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 1156, "source": "iana", "value": "application/vnd.visio", "compressible": false, "charSet": "", "extensions": "vsd, vst, vss, vsw" }
            , { "id": 1157, "source": "iana", "value": "application/vnd.visionary", "compressible": false, "charSet": "", "extensions": "vis" }
            , { "id": 1158, "source": "iana", "value": "application/vnd.vividence.scriptfile", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 1159, "source": "iana", "value": "application/vnd.vsf", "compressible": false, "charSet": "", "extensions": "vsf" }
            , { "id": 1160, "source": "iana", "value": "application/vnd.wap.sic", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 1161, "source": "iana", "value": "application/vnd.wap.slc", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 1162, "source": "iana", "value": "application/vnd.wap.wbxml", "compressible": false, "charSet": "", "extensions": "wbxml" }
            , { "id": 1163, "source": "iana", "value": "application/vnd.wap.wmlc", "compressible": false, "charSet": "", "extensions": "wmlc" }
            , { "id": 1164, "source": "iana", "value": "application/vnd.wap.wmlscriptc", "compressible": false, "charSet": "", "extensions": "wmlsc" }
            , { "id": 1165, "source": "iana", "value": "application/vnd.webturbo", "compressible": false, "charSet": "", "extensions": "wtb" }
            , { "id": 1166, "source": "iana", "value": "application/vnd.wfa.p2p", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 1167, "source": "iana", "value": "application/vnd.wfa.wsc", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 1168, "source": "iana", "value": "application/vnd.windows.devicepairing", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 1169, "source": "iana", "value": "application/vnd.wmc", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 1170, "source": "iana", "value": "application/vnd.wmf.bootstrap", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 1171, "source": "iana", "value": "application/vnd.wolfram.mathematica", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 1172, "source": "iana", "value": "application/vnd.wolfram.mathematica.package", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 1173, "source": "iana", "value": "application/vnd.wolfram.player", "compressible": false, "charSet": "", "extensions": "nbp" }
            , { "id": 1174, "source": "iana", "value": "application/vnd.wordperfect", "compressible": false, "charSet": "", "extensions": "wpd" }
            , { "id": 1175, "source": "iana", "value": "application/vnd.wqd", "compressible": false, "charSet": "", "extensions": "wqd" }
            , { "id": 1176, "source": "iana", "value": "application/vnd.wrq-hp3000-labelled", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 1177, "source": "iana", "value": "application/vnd.wt.stf", "compressible": false, "charSet": "", "extensions": "stf" }
            , { "id": 1178, "source": "iana", "value": "application/vnd.wv.csp+wbxml", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 1179, "source": "iana", "value": "application/vnd.wv.csp+xml", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 1180, "source": "iana", "value": "application/vnd.wv.ssp+xml", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 1181, "source": "iana", "value": "application/vnd.xacml+json", "compressible": true, "charSet": "", "extensions": "" }
            , { "id": 1182, "source": "iana", "value": "application/vnd.xara", "compressible": false, "charSet": "", "extensions": "xar" }
            , { "id": 1183, "source": "iana", "value": "application/vnd.xfdl", "compressible": false, "charSet": "", "extensions": "xfdl" }
            , { "id": 1184, "source": "iana", "value": "application/vnd.xfdl.webform", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 1185, "source": "iana", "value": "application/vnd.xmi+xml", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 1186, "source": "iana", "value": "application/vnd.xmpie.cpkg", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 1187, "source": "iana", "value": "application/vnd.xmpie.dpkg", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 1188, "source": "iana", "value": "application/vnd.xmpie.plan", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 1189, "source": "iana", "value": "application/vnd.xmpie.ppkg", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 1190, "source": "iana", "value": "application/vnd.xmpie.xlim", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 1191, "source": "iana", "value": "application/vnd.yamaha.hv-dic", "compressible": false, "charSet": "", "extensions": "hvd" }
            , { "id": 1192, "source": "iana", "value": "application/vnd.yamaha.hv-script", "compressible": false, "charSet": "", "extensions": "hvs" }
            , { "id": 1193, "source": "iana", "value": "application/vnd.yamaha.hv-voice", "compressible": false, "charSet": "", "extensions": "hvp" }
            , { "id": 1194, "source": "iana", "value": "application/vnd.yamaha.openscoreformat", "compressible": false, "charSet": "", "extensions": "osf" }
            , { "id": 1195, "source": "iana", "value": "application/vnd.yamaha.openscoreformat.osfpvg+xml", "compressible": false, "charSet": "", "extensions": "osfpvg" }
            , { "id": 1196, "source": "iana", "value": "application/vnd.yamaha.remote-setup", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 1197, "source": "iana", "value": "application/vnd.yamaha.smaf-audio", "compressible": false, "charSet": "", "extensions": "saf" }
            , { "id": 1198, "source": "iana", "value": "application/vnd.yamaha.smaf-phrase", "compressible": false, "charSet": "", "extensions": "spf" }
            , { "id": 1199, "source": "iana", "value": "application/vnd.yamaha.through-ngn", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 1200, "source": "iana", "value": "application/vnd.yamaha.tunnel-udpencap", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 1201, "source": "iana", "value": "application/vnd.yaoweme", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 1202, "source": "iana", "value": "application/vnd.yellowriver-custom-menu", "compressible": false, "charSet": "", "extensions": "cmp" }
            , { "id": 1203, "source": "iana", "value": "application/vnd.zul", "compressible": false, "charSet": "", "extensions": "zir, zirz" }
            , { "id": 1204, "source": "iana", "value": "application/vnd.zzazz.deck+xml", "compressible": false, "charSet": "", "extensions": "zaz" }
            , { "id": 1205, "source": "iana", "value": "application/voicexml+xml", "compressible": false, "charSet": "", "extensions": "vxml" }
            , { "id": 1206, "source": "iana", "value": "application/vq-rtcpxr", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 1207, "source": "iana", "value": "application/watcherinfo+xml", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 1208, "source": "iana", "value": "application/whoispp-query", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 1209, "source": "iana", "value": "application/whoispp-response", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 1210, "source": "iana", "value": "application/widget", "compressible": false, "charSet": "", "extensions": "wgt" }
            , { "id": 1211, "source": "apache", "value": "application/winhlp", "compressible": false, "charSet": "", "extensions": "hlp" }
            , { "id": 1212, "source": "iana", "value": "application/wita", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 1213, "source": "iana", "value": "application/wordperfect5.1", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 1214, "source": "iana", "value": "application/wsdl+xml", "compressible": false, "charSet": "", "extensions": "wsdl" }
            , { "id": 1215, "source": "iana", "value": "application/wspolicy+xml", "compressible": false, "charSet": "", "extensions": "wspolicy" }
            , { "id": 1216, "source": "apache", "value": "application/x-7z-compressed", "compressible": false, "charSet": "", "extensions": "7z" }
            , { "id": 1217, "source": "apache", "value": "application/x-abiword", "compressible": false, "charSet": "", "extensions": "abw" }
            , { "id": 1218, "source": "apache", "value": "application/x-ace-compressed", "compressible": false, "charSet": "", "extensions": "ace" }
            , { "id": 1219, "source": "apache", "value": "application/x-amf", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 1220, "source": "apache", "value": "application/x-apple-diskimage", "compressible": false, "charSet": "", "extensions": "dmg" }
            , { "id": 1221, "source": "apache", "value": "application/x-authorware-bin", "compressible": false, "charSet": "", "extensions": "aab, x32, u32, vox" }
            , { "id": 1222, "source": "apache", "value": "application/x-authorware-map", "compressible": false, "charSet": "", "extensions": "aam" }
            , { "id": 1223, "source": "apache", "value": "application/x-authorware-seg", "compressible": false, "charSet": "", "extensions": "aas" }
            , { "id": 1224, "source": "apache", "value": "application/x-bcpio", "compressible": false, "charSet": "", "extensions": "bcpio" }
            , { "id": 1225, "source": "", "value": "application/x-bdoc", "compressible": false, "charSet": "", "extensions": "bdoc" }
            , { "id": 1226, "source": "apache", "value": "application/x-bittorrent", "compressible": false, "charSet": "", "extensions": "torrent" }
            , { "id": 1227, "source": "apache", "value": "application/x-blorb", "compressible": false, "charSet": "", "extensions": "blb, blorb" }
            , { "id": 1228, "source": "apache", "value": "application/x-bzip", "compressible": false, "charSet": "", "extensions": "bz" }
            , { "id": 1229, "source": "apache", "value": "application/x-bzip2", "compressible": false, "charSet": "", "extensions": "bz2, boz" }
            , { "id": 1230, "source": "apache", "value": "application/x-cbr", "compressible": false, "charSet": "", "extensions": "cbr, cba, cbt, cbz, cb7" }
            , { "id": 1231, "source": "apache", "value": "application/x-cdlink", "compressible": false, "charSet": "", "extensions": "vcd" }
            , { "id": 1232, "source": "apache", "value": "application/x-cfs-compressed", "compressible": false, "charSet": "", "extensions": "cfs" }
            , { "id": 1233, "source": "apache", "value": "application/x-chat", "compressible": false, "charSet": "", "extensions": "chat" }
            , { "id": 1234, "source": "apache", "value": "application/x-chess-pgn", "compressible": false, "charSet": "", "extensions": "pgn" }
            , { "id": 1235, "source": "", "value": "application/x-chrome-extension", "compressible": false, "charSet": "", "extensions": "crx" }
            , { "id": 1236, "source": "nginx", "value": "application/x-cocoa", "compressible": false, "charSet": "", "extensions": "cco" }
            , { "id": 1237, "source": "apache", "value": "application/x-compress", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 1238, "source": "apache", "value": "application/x-conference", "compressible": false, "charSet": "", "extensions": "nsc" }
            , { "id": 1239, "source": "apache", "value": "application/x-cpio", "compressible": false, "charSet": "", "extensions": "cpio" }
            , { "id": 1240, "source": "apache", "value": "application/x-csh", "compressible": false, "charSet": "", "extensions": "csh" }
            , { "id": 1241, "source": "", "value": "application/x-deb", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 1242, "source": "apache", "value": "application/x-debian-package", "compressible": false, "charSet": "", "extensions": "deb, udeb" }
            , { "id": 1243, "source": "apache", "value": "application/x-dgc-compressed", "compressible": false, "charSet": "", "extensions": "dgc" }
            , { "id": 1244, "source": "apache", "value": "application/x-director", "compressible": false, "charSet": "", "extensions": "dir, dcr, dxr, cst, cct, cxt, w3d, fgd, swa" }
            , { "id": 1245, "source": "apache", "value": "application/x-doom", "compressible": false, "charSet": "", "extensions": "wad" }
            , { "id": 1246, "source": "apache", "value": "application/x-dtbncx+xml", "compressible": false, "charSet": "", "extensions": "ncx" }
            , { "id": 1247, "source": "apache", "value": "application/x-dtbook+xml", "compressible": false, "charSet": "", "extensions": "dtb" }
            , { "id": 1248, "source": "apache", "value": "application/x-dtbresource+xml", "compressible": false, "charSet": "", "extensions": "res" }
            , { "id": 1249, "source": "apache", "value": "application/x-dvi", "compressible": false, "charSet": "", "extensions": "dvi" }
            , { "id": 1250, "source": "apache", "value": "application/x-envoy", "compressible": false, "charSet": "", "extensions": "evy" }
            , { "id": 1251, "source": "apache", "value": "application/x-eva", "compressible": false, "charSet": "", "extensions": "eva" }
            , { "id": 1252, "source": "apache", "value": "application/x-font-bdf", "compressible": false, "charSet": "", "extensions": "bdf" }
            , { "id": 1253, "source": "apache", "value": "application/x-font-dos", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 1254, "source": "apache", "value": "application/x-font-framemaker", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 1255, "source": "apache", "value": "application/x-font-ghostscript", "compressible": false, "charSet": "", "extensions": "gsf" }
            , { "id": 1256, "source": "apache", "value": "application/x-font-libgrx", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 1257, "source": "apache", "value": "application/x-font-linux-psf", "compressible": false, "charSet": "", "extensions": "psf" }
            , { "id": 1258, "source": "apache", "value": "application/x-font-otf", "compressible": true, "charSet": "", "extensions": "otf" }
            , { "id": 1259, "source": "apache", "value": "application/x-font-pcf", "compressible": false, "charSet": "", "extensions": "pcf" }
            , { "id": 1260, "source": "apache", "value": "application/x-font-snf", "compressible": false, "charSet": "", "extensions": "snf" }
            , { "id": 1261, "source": "apache", "value": "application/x-font-speedo", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 1262, "source": "apache", "value": "application/x-font-sunos-news", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 1263, "source": "apache", "value": "application/x-font-ttf", "compressible": true, "charSet": "", "extensions": "ttf, ttc" }
            , { "id": 1264, "source": "apache", "value": "application/x-font-type1", "compressible": false, "charSet": "", "extensions": "pfa, pfb, pfm, afm" }
            , { "id": 1265, "source": "apache", "value": "application/x-font-vfont", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 1266, "source": "apache", "value": "application/x-freearc", "compressible": false, "charSet": "", "extensions": "arc" }
            , { "id": 1267, "source": "apache", "value": "application/x-futuresplash", "compressible": false, "charSet": "", "extensions": "spl" }
            , { "id": 1268, "source": "apache", "value": "application/x-gca-compressed", "compressible": false, "charSet": "", "extensions": "gca" }
            , { "id": 1269, "source": "apache", "value": "application/x-glulx", "compressible": false, "charSet": "", "extensions": "ulx" }
            , { "id": 1270, "source": "apache", "value": "application/x-gnumeric", "compressible": false, "charSet": "", "extensions": "gnumeric" }
            , { "id": 1271, "source": "apache", "value": "application/x-gramps-xml", "compressible": false, "charSet": "", "extensions": "gramps" }
            , { "id": 1272, "source": "apache", "value": "application/x-gtar", "compressible": false, "charSet": "", "extensions": "gtar" }
            , { "id": 1273, "source": "apache", "value": "application/x-gzip", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 1274, "source": "apache", "value": "application/x-hdf", "compressible": false, "charSet": "", "extensions": "hdf" }
            , { "id": 1275, "source": "", "value": "application/x-httpd-php", "compressible": true, "charSet": "", "extensions": "php" }
            , { "id": 1276, "source": "apache", "value": "application/x-install-instructions", "compressible": false, "charSet": "", "extensions": "install" }
            , { "id": 1277, "source": "apache", "value": "application/x-iso9660-image", "compressible": false, "charSet": "", "extensions": "iso" }
            , { "id": 1278, "source": "nginx", "value": "application/x-java-archive-diff", "compressible": false, "charSet": "", "extensions": "jardiff" }
            , { "id": 1279, "source": "apache", "value": "application/x-java-jnlp-file", "compressible": false, "charSet": "", "extensions": "jnlp" }
            , { "id": 1280, "source": "", "value": "application/x-javascript", "compressible": true, "charSet": "", "extensions": "" }
            , { "id": 1281, "source": "apache", "value": "application/x-latex", "compressible": false, "charSet": "", "extensions": "latex" }
            , { "id": 1282, "source": "", "value": "application/x-lua-bytecode", "compressible": false, "charSet": "", "extensions": "luac" }
            , { "id": 1283, "source": "apache", "value": "application/x-lzh-compressed", "compressible": false, "charSet": "", "extensions": "lzh, lha" }
            , { "id": 1284, "source": "nginx", "value": "application/x-makeself", "compressible": false, "charSet": "", "extensions": "run" }
            , { "id": 1285, "source": "apache", "value": "application/x-mie", "compressible": false, "charSet": "", "extensions": "mie" }
            , { "id": 1286, "source": "apache", "value": "application/x-mobipocket-ebook", "compressible": false, "charSet": "", "extensions": "prc, mobi" }
            , { "id": 1287, "source": "", "value": "application/x-mpegurl", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 1288, "source": "apache", "value": "application/x-ms-application", "compressible": false, "charSet": "", "extensions": "application" }
            , { "id": 1289, "source": "apache", "value": "application/x-ms-shortcut", "compressible": false, "charSet": "", "extensions": "lnk" }
            , { "id": 1290, "source": "apache", "value": "application/x-ms-wmd", "compressible": false, "charSet": "", "extensions": "wmd" }
            , { "id": 1291, "source": "apache", "value": "application/x-ms-wmz", "compressible": false, "charSet": "", "extensions": "wmz" }
            , { "id": 1292, "source": "apache", "value": "application/x-ms-xbap", "compressible": false, "charSet": "", "extensions": "xbap" }
            , { "id": 1293, "source": "apache", "value": "application/x-msaccess", "compressible": false, "charSet": "", "extensions": "mdb" }
            , { "id": 1294, "source": "apache", "value": "application/x-msbinder", "compressible": false, "charSet": "", "extensions": "obd" }
            , { "id": 1295, "source": "apache", "value": "application/x-mscardfile", "compressible": false, "charSet": "", "extensions": "crd" }
            , { "id": 1296, "source": "apache", "value": "application/x-msclip", "compressible": false, "charSet": "", "extensions": "clp" }
            , { "id": 1297, "source": "", "value": "application/x-msdos-program", "compressible": false, "charSet": "", "extensions": "exe" }
            , { "id": 1298, "source": "apache", "value": "application/x-msdownload", "compressible": false, "charSet": "", "extensions": "exe, dll, com, bat, msi" }
            , { "id": 1299, "source": "apache", "value": "application/x-msmediaview", "compressible": false, "charSet": "", "extensions": "mvb, m13, m14" }
            , { "id": 1300, "source": "apache", "value": "application/x-msmetafile", "compressible": false, "charSet": "", "extensions": "wmf, wmz, emf, emz" }
            , { "id": 1301, "source": "apache", "value": "application/x-msmoney", "compressible": false, "charSet": "", "extensions": "mny" }
            , { "id": 1302, "source": "apache", "value": "application/x-mspublisher", "compressible": false, "charSet": "", "extensions": "pub" }
            , { "id": 1303, "source": "apache", "value": "application/x-msschedule", "compressible": false, "charSet": "", "extensions": "scd" }
            , { "id": 1304, "source": "apache", "value": "application/x-msterminal", "compressible": false, "charSet": "", "extensions": "trm" }
            , { "id": 1305, "source": "apache", "value": "application/x-mswrite", "compressible": false, "charSet": "", "extensions": "wri" }
            , { "id": 1306, "source": "apache", "value": "application/x-netcdf", "compressible": false, "charSet": "", "extensions": "nc, cdf" }
            , { "id": 1307, "source": "", "value": "application/x-ns-proxy-autoconfig", "compressible": true, "charSet": "", "extensions": "pac" }
            , { "id": 1308, "source": "apache", "value": "application/x-nzb", "compressible": false, "charSet": "", "extensions": "nzb" }
            , { "id": 1309, "source": "nginx", "value": "application/x-perl", "compressible": false, "charSet": "", "extensions": "pl, pm" }
            , { "id": 1310, "source": "nginx", "value": "application/x-pilot", "compressible": false, "charSet": "", "extensions": "prc, pdb" }
            , { "id": 1311, "source": "apache", "value": "application/x-pkcs12", "compressible": false, "charSet": "", "extensions": "p12, pfx" }
            , { "id": 1312, "source": "apache", "value": "application/x-pkcs7-certificates", "compressible": false, "charSet": "", "extensions": "p7b, spc" }
            , { "id": 1313, "source": "apache", "value": "application/x-pkcs7-certreqresp", "compressible": false, "charSet": "", "extensions": "p7r" }
            , { "id": 1314, "source": "apache", "value": "application/x-rar-compressed", "compressible": false, "charSet": "", "extensions": "rar" }
            , { "id": 1315, "source": "nginx", "value": "application/x-redhat-package-manager", "compressible": false, "charSet": "", "extensions": "rpm" }
            , { "id": 1316, "source": "apache", "value": "application/x-research-info-systems", "compressible": false, "charSet": "", "extensions": "ris" }
            , { "id": 1317, "source": "nginx", "value": "application/x-sea", "compressible": false, "charSet": "", "extensions": "sea" }
            , { "id": 1318, "source": "apache", "value": "application/x-sh", "compressible": true, "charSet": "", "extensions": "sh" }
            , { "id": 1319, "source": "apache", "value": "application/x-shar", "compressible": false, "charSet": "", "extensions": "shar" }
            , { "id": 1320, "source": "apache", "value": "application/x-shockwave-flash", "compressible": false, "charSet": "", "extensions": "swf" }
            , { "id": 1321, "source": "apache", "value": "application/x-silverlight-app", "compressible": false, "charSet": "", "extensions": "xap" }
            , { "id": 1322, "source": "apache", "value": "application/x-sql", "compressible": false, "charSet": "", "extensions": "sql" }
            , { "id": 1323, "source": "apache", "value": "application/x-stuffit", "compressible": false, "charSet": "", "extensions": "sit" }
            , { "id": 1324, "source": "apache", "value": "application/x-stuffitx", "compressible": false, "charSet": "", "extensions": "sitx" }
            , { "id": 1325, "source": "apache", "value": "application/x-subrip", "compressible": false, "charSet": "", "extensions": "srt" }
            , { "id": 1326, "source": "apache", "value": "application/x-sv4cpio", "compressible": false, "charSet": "", "extensions": "sv4cpio" }
            , { "id": 1327, "source": "apache", "value": "application/x-sv4crc", "compressible": false, "charSet": "", "extensions": "sv4crc" }
            , { "id": 1328, "source": "apache", "value": "application/x-t3vm-image", "compressible": false, "charSet": "", "extensions": "t3" }
            , { "id": 1329, "source": "apache", "value": "application/x-tads", "compressible": false, "charSet": "", "extensions": "gam" }
            , { "id": 1330, "source": "apache", "value": "application/x-tar", "compressible": true, "charSet": "", "extensions": "tar" }
            , { "id": 1331, "source": "apache", "value": "application/x-tcl", "compressible": false, "charSet": "", "extensions": "tcl, tk" }
            , { "id": 1332, "source": "apache", "value": "application/x-tex", "compressible": false, "charSet": "", "extensions": "tex" }
            , { "id": 1333, "source": "apache", "value": "application/x-tex-tfm", "compressible": false, "charSet": "", "extensions": "tfm" }
            , { "id": 1334, "source": "apache", "value": "application/x-texinfo", "compressible": false, "charSet": "", "extensions": "texinfo, texi" }
            , { "id": 1335, "source": "apache", "value": "application/x-tgif", "compressible": false, "charSet": "", "extensions": "obj" }
            , { "id": 1336, "source": "apache", "value": "application/x-ustar", "compressible": false, "charSet": "", "extensions": "ustar" }
            , { "id": 1337, "source": "apache", "value": "application/x-wais-source", "compressible": false, "charSet": "", "extensions": "src" }
            , { "id": 1338, "source": "", "value": "application/x-web-app-manifest+json", "compressible": true, "charSet": "", "extensions": "webapp" }
            , { "id": 1339, "source": "iana", "value": "application/x-www-form-urlencoded", "compressible": true, "charSet": "", "extensions": "" }
            , { "id": 1340, "source": "apache", "value": "application/x-x509-ca-cert", "compressible": false, "charSet": "", "extensions": "der, crt, pem" }
            , { "id": 1341, "source": "apache", "value": "application/x-xfig", "compressible": false, "charSet": "", "extensions": "fig" }
            , { "id": 1342, "source": "apache", "value": "application/x-xliff+xml", "compressible": false, "charSet": "", "extensions": "xlf" }
            , { "id": 1343, "source": "apache", "value": "application/x-xpinstall", "compressible": false, "charSet": "", "extensions": "xpi" }
            , { "id": 1344, "source": "apache", "value": "application/x-xz", "compressible": false, "charSet": "", "extensions": "xz" }
            , { "id": 1345, "source": "apache", "value": "application/x-zmachine", "compressible": false, "charSet": "", "extensions": "z1, z2, z3, z4, z5, z6, z7, z8" }
            , { "id": 1346, "source": "iana", "value": "application/x400-bp", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 1347, "source": "iana", "value": "application/xacml+xml", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 1348, "source": "apache", "value": "application/xaml+xml", "compressible": false, "charSet": "", "extensions": "xaml" }
            , { "id": 1349, "source": "iana", "value": "application/xcap-att+xml", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 1350, "source": "iana", "value": "application/xcap-caps+xml", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 1351, "source": "iana", "value": "application/xcap-diff+xml", "compressible": false, "charSet": "", "extensions": "xdf" }
            , { "id": 1352, "source": "iana", "value": "application/xcap-el+xml", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 1353, "source": "iana", "value": "application/xcap-error+xml", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 1354, "source": "iana", "value": "application/xcap-ns+xml", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 1355, "source": "iana", "value": "application/xcon-conference-info+xml", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 1356, "source": "iana", "value": "application/xcon-conference-info-diff+xml", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 1357, "source": "iana", "value": "application/xenc+xml", "compressible": false, "charSet": "", "extensions": "xenc" }
            , { "id": 1358, "source": "iana", "value": "application/xhtml+xml", "compressible": true, "charSet": "", "extensions": "xhtml, xht" }
            , { "id": 1359, "source": "apache", "value": "application/xhtml-voice+xml", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 1360, "source": "iana", "value": "application/xml", "compressible": true, "charSet": "", "extensions": "xml, xsl, xsd, rng" }
            , { "id": 1361, "source": "iana", "value": "application/xml-dtd", "compressible": true, "charSet": "", "extensions": "dtd" }
            , { "id": 1362, "source": "iana", "value": "application/xml-external-parsed-entity", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 1363, "source": "iana", "value": "application/xml-patch+xml", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 1364, "source": "iana", "value": "application/xmpp+xml", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 1365, "source": "iana", "value": "application/xop+xml", "compressible": true, "charSet": "", "extensions": "xop" }
            , { "id": 1366, "source": "apache", "value": "application/xproc+xml", "compressible": false, "charSet": "", "extensions": "xpl" }
            , { "id": 1367, "source": "iana", "value": "application/xslt+xml", "compressible": false, "charSet": "", "extensions": "xslt" }
            , { "id": 1368, "source": "apache", "value": "application/xspf+xml", "compressible": false, "charSet": "", "extensions": "xspf" }
            , { "id": 1369, "source": "iana", "value": "application/xv+xml", "compressible": false, "charSet": "", "extensions": "mxml, xhvml, xvml, xvm" }
            , { "id": 1370, "source": "iana", "value": "application/yang", "compressible": false, "charSet": "", "extensions": "yang" }
            , { "id": 1371, "source": "iana", "value": "application/yin+xml", "compressible": false, "charSet": "", "extensions": "yin" }
            , { "id": 1372, "source": "iana", "value": "application/zip", "compressible": false, "charSet": "", "extensions": "zip" }
            , { "id": 1373, "source": "iana", "value": "application/zlib", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 1374, "source": "iana", "value": "audio/1d-interleaved-parityfec", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 1375, "source": "iana", "value": "audio/32kadpcm", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 1376, "source": "iana", "value": "audio/3gpp", "compressible": false, "charSet": "", "extensions": "3gpp" }
            , { "id": 1377, "source": "iana", "value": "audio/3gpp2", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 1378, "source": "iana", "value": "audio/ac3", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 1379, "source": "apache", "value": "audio/adpcm", "compressible": false, "charSet": "", "extensions": "adp" }
            , { "id": 1380, "source": "iana", "value": "audio/amr", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 1381, "source": "iana", "value": "audio/amr-wb", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 1382, "source": "iana", "value": "audio/amr-wb+", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 1383, "source": "iana", "value": "audio/aptx", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 1384, "source": "iana", "value": "audio/asc", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 1385, "source": "iana", "value": "audio/atrac-advanced-lossless", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 1386, "source": "iana", "value": "audio/atrac-x", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 1387, "source": "iana", "value": "audio/atrac3", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 1388, "source": "iana", "value": "audio/basic", "compressible": false, "charSet": "", "extensions": "au, snd" }
            , { "id": 1389, "source": "iana", "value": "audio/bv16", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 1390, "source": "iana", "value": "audio/bv32", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 1391, "source": "iana", "value": "audio/clearmode", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 1392, "source": "iana", "value": "audio/cn", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 1393, "source": "iana", "value": "audio/dat12", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 1394, "source": "iana", "value": "audio/dls", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 1395, "source": "iana", "value": "audio/dsr-es201108", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 1396, "source": "iana", "value": "audio/dsr-es202050", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 1397, "source": "iana", "value": "audio/dsr-es202211", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 1398, "source": "iana", "value": "audio/dsr-es202212", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 1399, "source": "iana", "value": "audio/dv", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 1400, "source": "iana", "value": "audio/dvi4", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 1401, "source": "iana", "value": "audio/eac3", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 1402, "source": "iana", "value": "audio/encaprtp", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 1403, "source": "iana", "value": "audio/evrc", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 1404, "source": "iana", "value": "audio/evrc-qcp", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 1405, "source": "iana", "value": "audio/evrc0", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 1406, "source": "iana", "value": "audio/evrc1", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 1407, "source": "iana", "value": "audio/evrcb", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 1408, "source": "iana", "value": "audio/evrcb0", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 1409, "source": "iana", "value": "audio/evrcb1", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 1410, "source": "iana", "value": "audio/evrcnw", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 1411, "source": "iana", "value": "audio/evrcnw0", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 1412, "source": "iana", "value": "audio/evrcnw1", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 1413, "source": "iana", "value": "audio/evrcwb", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 1414, "source": "iana", "value": "audio/evrcwb0", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 1415, "source": "iana", "value": "audio/evrcwb1", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 1416, "source": "iana", "value": "audio/evs", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 1417, "source": "iana", "value": "audio/fwdred", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 1418, "source": "iana", "value": "audio/g711-0", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 1419, "source": "iana", "value": "audio/g719", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 1420, "source": "iana", "value": "audio/g722", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 1421, "source": "iana", "value": "audio/g7221", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 1422, "source": "iana", "value": "audio/g723", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 1423, "source": "iana", "value": "audio/g726-16", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 1424, "source": "iana", "value": "audio/g726-24", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 1425, "source": "iana", "value": "audio/g726-32", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 1426, "source": "iana", "value": "audio/g726-40", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 1427, "source": "iana", "value": "audio/g728", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 1428, "source": "iana", "value": "audio/g729", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 1429, "source": "iana", "value": "audio/g7291", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 1430, "source": "iana", "value": "audio/g729d", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 1431, "source": "iana", "value": "audio/g729e", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 1432, "source": "iana", "value": "audio/gsm", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 1433, "source": "iana", "value": "audio/gsm-efr", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 1434, "source": "iana", "value": "audio/gsm-hr-08", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 1435, "source": "iana", "value": "audio/ilbc", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 1436, "source": "iana", "value": "audio/ip-mr_v2.5", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 1437, "source": "apache", "value": "audio/isac", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 1438, "source": "iana", "value": "audio/l16", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 1439, "source": "iana", "value": "audio/l20", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 1440, "source": "iana", "value": "audio/l24", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 1441, "source": "iana", "value": "audio/l8", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 1442, "source": "iana", "value": "audio/lpc", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 1443, "source": "apache", "value": "audio/midi", "compressible": false, "charSet": "", "extensions": "mid, midi, kar, rmi" }
            , { "id": 1444, "source": "iana", "value": "audio/mobile-xmf", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 1445, "source": "iana", "value": "audio/mp4", "compressible": false, "charSet": "", "extensions": "m4a, mp4a" }
            , { "id": 1446, "source": "iana", "value": "audio/mp4a-latm", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 1447, "source": "iana", "value": "audio/mpa", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 1448, "source": "iana", "value": "audio/mpa-robust", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 1449, "source": "iana", "value": "audio/mpeg", "compressible": false, "charSet": "", "extensions": "mpga, mp2, mp2a, mp3, m2a, m3a" }
            , { "id": 1450, "source": "iana", "value": "audio/mpeg4-generic", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 1451, "source": "apache", "value": "audio/musepack", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 1452, "source": "iana", "value": "audio/ogg", "compressible": false, "charSet": "", "extensions": "oga, ogg, spx" }
            , { "id": 1453, "source": "iana", "value": "audio/opus", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 1454, "source": "iana", "value": "audio/parityfec", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 1455, "source": "iana", "value": "audio/pcma", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 1456, "source": "iana", "value": "audio/pcma-wb", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 1457, "source": "iana", "value": "audio/pcmu", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 1458, "source": "iana", "value": "audio/pcmu-wb", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 1459, "source": "iana", "value": "audio/prs.sid", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 1460, "source": "iana", "value": "audio/qcelp", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 1461, "source": "iana", "value": "audio/raptorfec", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 1462, "source": "iana", "value": "audio/red", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 1463, "source": "iana", "value": "audio/rtp-enc-aescm128", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 1464, "source": "iana", "value": "audio/rtp-midi", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 1465, "source": "iana", "value": "audio/rtploopback", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 1466, "source": "iana", "value": "audio/rtx", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 1467, "source": "apache", "value": "audio/s3m", "compressible": false, "charSet": "", "extensions": "s3m" }
            , { "id": 1468, "source": "apache", "value": "audio/silk", "compressible": false, "charSet": "", "extensions": "sil" }
            , { "id": 1469, "source": "iana", "value": "audio/smv", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 1470, "source": "iana", "value": "audio/smv-qcp", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 1471, "source": "iana", "value": "audio/smv0", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 1472, "source": "iana", "value": "audio/sp-midi", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 1473, "source": "iana", "value": "audio/speex", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 1474, "source": "iana", "value": "audio/t140c", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 1475, "source": "iana", "value": "audio/t38", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 1476, "source": "iana", "value": "audio/telephone-event", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 1477, "source": "iana", "value": "audio/tone", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 1478, "source": "iana", "value": "audio/uemclip", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 1479, "source": "iana", "value": "audio/ulpfec", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 1480, "source": "iana", "value": "audio/vdvi", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 1481, "source": "iana", "value": "audio/vmr-wb", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 1482, "source": "iana", "value": "audio/vnd.3gpp.iufp", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 1483, "source": "iana", "value": "audio/vnd.4sb", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 1484, "source": "iana", "value": "audio/vnd.audiokoz", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 1485, "source": "iana", "value": "audio/vnd.celp", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 1486, "source": "iana", "value": "audio/vnd.cisco.nse", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 1487, "source": "iana", "value": "audio/vnd.cmles.radio-events", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 1488, "source": "iana", "value": "audio/vnd.cns.anp1", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 1489, "source": "iana", "value": "audio/vnd.cns.inf1", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 1490, "source": "iana", "value": "audio/vnd.dece.audio", "compressible": false, "charSet": "", "extensions": "uva, uvva" }
            , { "id": 1491, "source": "iana", "value": "audio/vnd.digital-winds", "compressible": false, "charSet": "", "extensions": "eol" }
            , { "id": 1492, "source": "iana", "value": "audio/vnd.dlna.adts", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 1493, "source": "iana", "value": "audio/vnd.dolby.heaac.1", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 1494, "source": "iana", "value": "audio/vnd.dolby.heaac.2", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 1495, "source": "iana", "value": "audio/vnd.dolby.mlp", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 1496, "source": "iana", "value": "audio/vnd.dolby.mps", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 1497, "source": "iana", "value": "audio/vnd.dolby.pl2", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 1498, "source": "iana", "value": "audio/vnd.dolby.pl2x", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 1499, "source": "iana", "value": "audio/vnd.dolby.pl2z", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 1500, "source": "iana", "value": "audio/vnd.dolby.pulse.1", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 1501, "source": "iana", "value": "audio/vnd.dra", "compressible": false, "charSet": "", "extensions": "dra" }
            , { "id": 1502, "source": "iana", "value": "audio/vnd.dts", "compressible": false, "charSet": "", "extensions": "dts" }
            , { "id": 1503, "source": "iana", "value": "audio/vnd.dts.hd", "compressible": false, "charSet": "", "extensions": "dtshd" }
            , { "id": 1504, "source": "iana", "value": "audio/vnd.dvb.file", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 1505, "source": "iana", "value": "audio/vnd.everad.plj", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 1506, "source": "iana", "value": "audio/vnd.hns.audio", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 1507, "source": "iana", "value": "audio/vnd.lucent.voice", "compressible": false, "charSet": "", "extensions": "lvp" }
            , { "id": 1508, "source": "iana", "value": "audio/vnd.ms-playready.media.pya", "compressible": false, "charSet": "", "extensions": "pya" }
            , { "id": 1509, "source": "iana", "value": "audio/vnd.nokia.mobile-xmf", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 1510, "source": "iana", "value": "audio/vnd.nortel.vbk", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 1511, "source": "iana", "value": "audio/vnd.nuera.ecelp4800", "compressible": false, "charSet": "", "extensions": "ecelp4800" }
            , { "id": 1512, "source": "iana", "value": "audio/vnd.nuera.ecelp7470", "compressible": false, "charSet": "", "extensions": "ecelp7470" }
            , { "id": 1513, "source": "iana", "value": "audio/vnd.nuera.ecelp9600", "compressible": false, "charSet": "", "extensions": "ecelp9600" }
            , { "id": 1514, "source": "iana", "value": "audio/vnd.octel.sbc", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 1515, "source": "iana", "value": "audio/vnd.qcelp", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 1516, "source": "iana", "value": "audio/vnd.rhetorex.32kadpcm", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 1517, "source": "iana", "value": "audio/vnd.rip", "compressible": false, "charSet": "", "extensions": "rip" }
            , { "id": 1518, "source": "", "value": "audio/vnd.rn-realaudio", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 1519, "source": "iana", "value": "audio/vnd.sealedmedia.softseal.mpeg", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 1520, "source": "iana", "value": "audio/vnd.vmx.cvsd", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 1521, "source": "", "value": "audio/vnd.wave", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 1522, "source": "iana", "value": "audio/vorbis", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 1523, "source": "iana", "value": "audio/vorbis-config", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 1524, "source": "", "value": "audio/wav", "compressible": false, "charSet": "", "extensions": "wav" }
            , { "id": 1525, "source": "", "value": "audio/wave", "compressible": false, "charSet": "", "extensions": "wav" }
            , { "id": 1526, "source": "apache", "value": "audio/webm", "compressible": false, "charSet": "", "extensions": "weba" }
            , { "id": 1527, "source": "apache", "value": "audio/x-aac", "compressible": false, "charSet": "", "extensions": "aac" }
            , { "id": 1528, "source": "apache", "value": "audio/x-aiff", "compressible": false, "charSet": "", "extensions": "aif, aiff, aifc" }
            , { "id": 1529, "source": "apache", "value": "audio/x-caf", "compressible": false, "charSet": "", "extensions": "caf" }
            , { "id": 1530, "source": "apache", "value": "audio/x-flac", "compressible": false, "charSet": "", "extensions": "flac" }
            , { "id": 1531, "source": "nginx", "value": "audio/x-m4a", "compressible": false, "charSet": "", "extensions": "m4a" }
            , { "id": 1532, "source": "apache", "value": "audio/x-matroska", "compressible": false, "charSet": "", "extensions": "mka" }
            , { "id": 1533, "source": "apache", "value": "audio/x-mpegurl", "compressible": false, "charSet": "", "extensions": "m3u" }
            , { "id": 1534, "source": "apache", "value": "audio/x-ms-wax", "compressible": false, "charSet": "", "extensions": "wax" }
            , { "id": 1535, "source": "apache", "value": "audio/x-ms-wma", "compressible": false, "charSet": "", "extensions": "wma" }
            , { "id": 1536, "source": "apache", "value": "audio/x-pn-realaudio", "compressible": false, "charSet": "", "extensions": "ram, ra" }
            , { "id": 1537, "source": "apache", "value": "audio/x-pn-realaudio-plugin", "compressible": false, "charSet": "", "extensions": "rmp" }
            , { "id": 1538, "source": "nginx", "value": "audio/x-realaudio", "compressible": false, "charSet": "", "extensions": "ra" }
            , { "id": 1539, "source": "apache", "value": "audio/x-tta", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 1540, "source": "apache", "value": "audio/x-wav", "compressible": false, "charSet": "", "extensions": "wav" }
            , { "id": 1541, "source": "apache", "value": "audio/xm", "compressible": false, "charSet": "", "extensions": "xm" }
            , { "id": 1542, "source": "apache", "value": "chemical/x-cdx", "compressible": false, "charSet": "", "extensions": "cdx" }
            , { "id": 1543, "source": "apache", "value": "chemical/x-cif", "compressible": false, "charSet": "", "extensions": "cif" }
            , { "id": 1544, "source": "apache", "value": "chemical/x-cmdf", "compressible": false, "charSet": "", "extensions": "cmdf" }
            , { "id": 1545, "source": "apache", "value": "chemical/x-cml", "compressible": false, "charSet": "", "extensions": "cml" }
            , { "id": 1546, "source": "apache", "value": "chemical/x-csml", "compressible": false, "charSet": "", "extensions": "csml" }
            , { "id": 1547, "source": "apache", "value": "chemical/x-pdb", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 1548, "source": "apache", "value": "chemical/x-xyz", "compressible": false, "charSet": "", "extensions": "xyz" }
            , { "id": 1549, "source": "", "value": "font/opentype", "compressible": true, "charSet": "", "extensions": "otf" }
            , { "id": 1550, "source": "apache", "value": "image/bmp", "compressible": true, "charSet": "", "extensions": "bmp" }
            , { "id": 1551, "source": "iana", "value": "image/cgm", "compressible": false, "charSet": "", "extensions": "cgm" }
            , { "id": 1552, "source": "iana", "value": "image/fits", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 1553, "source": "iana", "value": "image/g3fax", "compressible": false, "charSet": "", "extensions": "g3" }
            , { "id": 1554, "source": "iana", "value": "image/gif", "compressible": false, "charSet": "", "extensions": "gif" }
            , { "id": 1555, "source": "iana", "value": "image/ief", "compressible": false, "charSet": "", "extensions": "ief" }
            , { "id": 1556, "source": "iana", "value": "image/jp2", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 1557, "source": "iana", "value": "image/jpeg", "compressible": false, "charSet": "", "extensions": "jpeg, jpg, jpe" }
            , { "id": 1558, "source": "iana", "value": "image/jpm", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 1559, "source": "iana", "value": "image/jpx", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 1560, "source": "iana", "value": "image/ktx", "compressible": false, "charSet": "", "extensions": "ktx" }
            , { "id": 1561, "source": "iana", "value": "image/naplps", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 1562, "source": "", "value": "image/pjpeg", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 1563, "source": "iana", "value": "image/png", "compressible": false, "charSet": "", "extensions": "png" }
            , { "id": 1564, "source": "iana", "value": "image/prs.btif", "compressible": false, "charSet": "", "extensions": "btif" }
            , { "id": 1565, "source": "iana", "value": "image/prs.pti", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 1566, "source": "iana", "value": "image/pwg-raster", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 1567, "source": "apache", "value": "image/sgi", "compressible": false, "charSet": "", "extensions": "sgi" }
            , { "id": 1568, "source": "iana", "value": "image/svg+xml", "compressible": true, "charSet": "", "extensions": "svg, svgz" }
            , { "id": 1569, "source": "iana", "value": "image/t38", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 1570, "source": "iana", "value": "image/tiff", "compressible": false, "charSet": "", "extensions": "tiff, tif" }
            , { "id": 1571, "source": "iana", "value": "image/tiff-fx", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 1572, "source": "iana", "value": "image/vnd.adobe.photoshop", "compressible": true, "charSet": "", "extensions": "psd" }
            , { "id": 1573, "source": "iana", "value": "image/vnd.airzip.accelerator.azv", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 1574, "source": "iana", "value": "image/vnd.cns.inf2", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 1575, "source": "iana", "value": "image/vnd.dece.graphic", "compressible": false, "charSet": "", "extensions": "uvi, uvvi, uvg, uvvg" }
            , { "id": 1576, "source": "iana", "value": "image/vnd.djvu", "compressible": false, "charSet": "", "extensions": "djvu, djv" }
            , { "id": 1577, "source": "iana", "value": "image/vnd.dvb.subtitle", "compressible": false, "charSet": "", "extensions": "sub" }
            , { "id": 1578, "source": "iana", "value": "image/vnd.dwg", "compressible": false, "charSet": "", "extensions": "dwg" }
            , { "id": 1579, "source": "iana", "value": "image/vnd.dxf", "compressible": false, "charSet": "", "extensions": "dxf" }
            , { "id": 1580, "source": "iana", "value": "image/vnd.fastbidsheet", "compressible": false, "charSet": "", "extensions": "fbs" }
            , { "id": 1581, "source": "iana", "value": "image/vnd.fpx", "compressible": false, "charSet": "", "extensions": "fpx" }
            , { "id": 1582, "source": "iana", "value": "image/vnd.fst", "compressible": false, "charSet": "", "extensions": "fst" }
            , { "id": 1583, "source": "iana", "value": "image/vnd.fujixerox.edmics-mmr", "compressible": false, "charSet": "", "extensions": "mmr" }
            , { "id": 1584, "source": "iana", "value": "image/vnd.fujixerox.edmics-rlc", "compressible": false, "charSet": "", "extensions": "rlc" }
            , { "id": 1585, "source": "iana", "value": "image/vnd.globalgraphics.pgb", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 1586, "source": "iana", "value": "image/vnd.microsoft.icon", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 1587, "source": "iana", "value": "image/vnd.mix", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 1588, "source": "iana", "value": "image/vnd.mozilla.apng", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 1589, "source": "iana", "value": "image/vnd.ms-modi", "compressible": false, "charSet": "", "extensions": "mdi" }
            , { "id": 1590, "source": "apache", "value": "image/vnd.ms-photo", "compressible": false, "charSet": "", "extensions": "wdp" }
            , { "id": 1591, "source": "iana", "value": "image/vnd.net-fpx", "compressible": false, "charSet": "", "extensions": "npx" }
            , { "id": 1592, "source": "iana", "value": "image/vnd.radiance", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 1593, "source": "iana", "value": "image/vnd.sealed.png", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 1594, "source": "iana", "value": "image/vnd.sealedmedia.softseal.gif", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 1595, "source": "iana", "value": "image/vnd.sealedmedia.softseal.jpg", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 1596, "source": "iana", "value": "image/vnd.svf", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 1597, "source": "iana", "value": "image/vnd.tencent.tap", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 1598, "source": "iana", "value": "image/vnd.valve.source.texture", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 1599, "source": "iana", "value": "image/vnd.wap.wbmp", "compressible": false, "charSet": "", "extensions": "wbmp" }
            , { "id": 1600, "source": "iana", "value": "image/vnd.xiff", "compressible": false, "charSet": "", "extensions": "xif" }
            , { "id": 1601, "source": "iana", "value": "image/vnd.zbrush.pcx", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 1602, "source": "apache", "value": "image/webp", "compressible": false, "charSet": "", "extensions": "webp" }
            , { "id": 1603, "source": "apache", "value": "image/x-3ds", "compressible": false, "charSet": "", "extensions": "3ds" }
            , { "id": 1604, "source": "apache", "value": "image/x-cmu-raster", "compressible": false, "charSet": "", "extensions": "ras" }
            , { "id": 1605, "source": "apache", "value": "image/x-cmx", "compressible": false, "charSet": "", "extensions": "cmx" }
            , { "id": 1606, "source": "apache", "value": "image/x-freehand", "compressible": false, "charSet": "", "extensions": "fh, fhc, fh4, fh5, fh7" }
            , { "id": 1607, "source": "apache", "value": "image/x-icon", "compressible": true, "charSet": "", "extensions": "ico" }
            , { "id": 1608, "source": "nginx", "value": "image/x-jng", "compressible": false, "charSet": "", "extensions": "jng" }
            , { "id": 1609, "source": "apache", "value": "image/x-mrsid-image", "compressible": false, "charSet": "", "extensions": "sid" }
            , { "id": 1610, "source": "nginx", "value": "image/x-ms-bmp", "compressible": true, "charSet": "", "extensions": "bmp" }
            , { "id": 1611, "source": "apache", "value": "image/x-pcx", "compressible": false, "charSet": "", "extensions": "pcx" }
            , { "id": 1612, "source": "apache", "value": "image/x-pict", "compressible": false, "charSet": "", "extensions": "pic, pct" }
            , { "id": 1613, "source": "apache", "value": "image/x-portable-anymap", "compressible": false, "charSet": "", "extensions": "pnm" }
            , { "id": 1614, "source": "apache", "value": "image/x-portable-bitmap", "compressible": false, "charSet": "", "extensions": "pbm" }
            , { "id": 1615, "source": "apache", "value": "image/x-portable-graymap", "compressible": false, "charSet": "", "extensions": "pgm" }
            , { "id": 1616, "source": "apache", "value": "image/x-portable-pixmap", "compressible": false, "charSet": "", "extensions": "ppm" }
            , { "id": 1617, "source": "apache", "value": "image/x-rgb", "compressible": false, "charSet": "", "extensions": "rgb" }
            , { "id": 1618, "source": "apache", "value": "image/x-tga", "compressible": false, "charSet": "", "extensions": "tga" }
            , { "id": 1619, "source": "apache", "value": "image/x-xbitmap", "compressible": false, "charSet": "", "extensions": "xbm" }
            , { "id": 1620, "source": "", "value": "image/x-xcf", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 1621, "source": "apache", "value": "image/x-xpixmap", "compressible": false, "charSet": "", "extensions": "xpm" }
            , { "id": 1622, "source": "apache", "value": "image/x-xwindowdump", "compressible": false, "charSet": "", "extensions": "xwd" }
            , { "id": 1623, "source": "iana", "value": "message/cpim", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 1624, "source": "iana", "value": "message/delivery-status", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 1625, "source": "iana", "value": "message/disposition-notification", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 1626, "source": "iana", "value": "message/external-body", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 1627, "source": "iana", "value": "message/feedback-report", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 1628, "source": "iana", "value": "message/global", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 1629, "source": "iana", "value": "message/global-delivery-status", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 1630, "source": "iana", "value": "message/global-disposition-notification", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 1631, "source": "iana", "value": "message/global-headers", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 1632, "source": "iana", "value": "message/http", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 1633, "source": "iana", "value": "message/imdn+xml", "compressible": true, "charSet": "", "extensions": "" }
            , { "id": 1634, "source": "iana", "value": "message/news", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 1635, "source": "iana", "value": "message/partial", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 1636, "source": "iana", "value": "message/rfc822", "compressible": true, "charSet": "", "extensions": "eml, mime" }
            , { "id": 1637, "source": "iana", "value": "message/s-http", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 1638, "source": "iana", "value": "message/sip", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 1639, "source": "iana", "value": "message/sipfrag", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 1640, "source": "iana", "value": "message/tracking-status", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 1641, "source": "iana", "value": "message/vnd.si.simp", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 1642, "source": "iana", "value": "message/vnd.wfa.wsc", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 1643, "source": "iana", "value": "model/iges", "compressible": false, "charSet": "", "extensions": "igs, iges" }
            , { "id": 1644, "source": "iana", "value": "model/mesh", "compressible": false, "charSet": "", "extensions": "msh, mesh, silo" }
            , { "id": 1645, "source": "iana", "value": "model/vnd.collada+xml", "compressible": false, "charSet": "", "extensions": "dae" }
            , { "id": 1646, "source": "iana", "value": "model/vnd.dwf", "compressible": false, "charSet": "", "extensions": "dwf" }
            , { "id": 1647, "source": "iana", "value": "model/vnd.flatland.3dml", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 1648, "source": "iana", "value": "model/vnd.gdl", "compressible": false, "charSet": "", "extensions": "gdl" }
            , { "id": 1649, "source": "apache", "value": "model/vnd.gs-gdl", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 1650, "source": "iana", "value": "model/vnd.gs.gdl", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 1651, "source": "iana", "value": "model/vnd.gtw", "compressible": false, "charSet": "", "extensions": "gtw" }
            , { "id": 1652, "source": "iana", "value": "model/vnd.moml+xml", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 1653, "source": "iana", "value": "model/vnd.mts", "compressible": false, "charSet": "", "extensions": "mts" }
            , { "id": 1654, "source": "iana", "value": "model/vnd.opengex", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 1655, "source": "iana", "value": "model/vnd.parasolid.transmit.binary", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 1656, "source": "iana", "value": "model/vnd.parasolid.transmit.text", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 1657, "source": "iana", "value": "model/vnd.rosette.annotated-data-model", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 1658, "source": "iana", "value": "model/vnd.valve.source.compiled-map", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 1659, "source": "iana", "value": "model/vnd.vtu", "compressible": false, "charSet": "", "extensions": "vtu" }
            , { "id": 1660, "source": "iana", "value": "model/vrml", "compressible": false, "charSet": "", "extensions": "wrl, vrml" }
            , { "id": 1661, "source": "apache", "value": "model/x3d+binary", "compressible": false, "charSet": "", "extensions": "x3db, x3dbz" }
            , { "id": 1662, "source": "iana", "value": "model/x3d+fastinfoset", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 1663, "source": "apache", "value": "model/x3d+vrml", "compressible": false, "charSet": "", "extensions": "x3dv, x3dvz" }
            , { "id": 1664, "source": "iana", "value": "model/x3d+xml", "compressible": true, "charSet": "", "extensions": "x3d, x3dz" }
            , { "id": 1665, "source": "iana", "value": "model/x3d-vrml", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 1666, "source": "iana", "value": "multipart/alternative", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 1667, "source": "iana", "value": "multipart/appledouble", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 1668, "source": "iana", "value": "multipart/byteranges", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 1669, "source": "iana", "value": "multipart/digest", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 1670, "source": "iana", "value": "multipart/encrypted", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 1671, "source": "iana", "value": "multipart/form-data", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 1672, "source": "iana", "value": "multipart/header-set", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 1673, "source": "iana", "value": "multipart/mixed", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 1674, "source": "iana", "value": "multipart/parallel", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 1675, "source": "iana", "value": "multipart/related", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 1676, "source": "iana", "value": "multipart/report", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 1677, "source": "iana", "value": "multipart/signed", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 1678, "source": "iana", "value": "multipart/voice-message", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 1679, "source": "iana", "value": "multipart/x-mixed-replace", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 1680, "source": "iana", "value": "text/1d-interleaved-parityfec", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 1681, "source": "iana", "value": "text/cache-manifest", "compressible": true, "charSet": "", "extensions": "appcache, manifest" }
            , { "id": 1682, "source": "iana", "value": "text/calendar", "compressible": false, "charSet": "", "extensions": "ics, ifb" }
            , { "id": 1683, "source": "", "value": "text/calender", "compressible": true, "charSet": "", "extensions": "" }
            , { "id": 1684, "source": "", "value": "text/cmd", "compressible": true, "charSet": "", "extensions": "" }
            , { "id": 1685, "source": "", "value": "text/coffeescript", "compressible": false, "charSet": "", "extensions": "coffee, litcoffee" }
            , { "id": 1686, "source": "iana", "value": "text/css", "compressible": true, "charSet": "", "extensions": "css" }
            , { "id": 1687, "source": "iana", "value": "text/csv", "compressible": true, "charSet": "", "extensions": "csv" }
            , { "id": 1688, "source": "iana", "value": "text/csv-schema", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 1689, "source": "iana", "value": "text/directory", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 1690, "source": "iana", "value": "text/dns", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 1691, "source": "iana", "value": "text/ecmascript", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 1692, "source": "iana", "value": "text/encaprtp", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 1693, "source": "iana", "value": "text/enriched", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 1694, "source": "iana", "value": "text/fwdred", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 1695, "source": "iana", "value": "text/grammar-ref-list", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 1696, "source": "", "value": "text/json", "compressible": false, "charSet": "", "extensions": "json" }
            , { "id": 1697, "source": "iana", "value": "text/html", "compressible": true, "charSet": "", "extensions": "html, htm, shtml" }
            , { "id": 1698, "source": "", "value": "text/jade", "compressible": false, "charSet": "", "extensions": "jade" }
            , { "id": 1699, "source": "iana", "value": "text/javascript", "compressible": true, "charSet": "", "extensions": "" }
            , { "id": 1700, "source": "iana", "value": "text/jcr-cnd", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 1701, "source": "", "value": "text/jsx", "compressible": true, "charSet": "", "extensions": "jsx" }
            , { "id": 1702, "source": "", "value": "text/less", "compressible": false, "charSet": "", "extensions": "less" }
            , { "id": 1703, "source": "iana", "value": "text/markdown", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 1704, "source": "nginx", "value": "text/mathml", "compressible": false, "charSet": "", "extensions": "mml" }
            , { "id": 1705, "source": "iana", "value": "text/mizar", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 1706, "source": "iana", "value": "text/n3", "compressible": true, "charSet": "", "extensions": "n3" }
            , { "id": 1707, "source": "iana", "value": "text/parameters", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 1708, "source": "iana", "value": "text/parityfec", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 1709, "source": "iana", "value": "text/plain", "compressible": true, "charSet": "", "extensions": "txt, text, conf, def, list, log, in, ini" }
            , { "id": 1710, "source": "iana", "value": "text/provenance-notation", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 1711, "source": "iana", "value": "text/prs.fallenstein.rst", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 1712, "source": "iana", "value": "text/prs.lines.tag", "compressible": false, "charSet": "", "extensions": "dsc" }
            , { "id": 1713, "source": "iana", "value": "text/prs.prop.logic", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 1714, "source": "iana", "value": "text/raptorfec", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 1715, "source": "iana", "value": "text/red", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 1716, "source": "iana", "value": "text/rfc822-headers", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 1717, "source": "iana", "value": "text/richtext", "compressible": true, "charSet": "", "extensions": "rtx" }
            , { "id": 1718, "source": "iana", "value": "text/rtf", "compressible": true, "charSet": "", "extensions": "rtf" }
            , { "id": 1719, "source": "iana", "value": "text/rtp-enc-aescm128", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 1720, "source": "iana", "value": "text/rtploopback", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 1721, "source": "iana", "value": "text/rtx", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 1722, "source": "iana", "value": "text/sgml", "compressible": false, "charSet": "", "extensions": "sgml, sgm" }
            , { "id": 1723, "source": "", "value": "text/slim", "compressible": false, "charSet": "", "extensions": "slim, slm" }
            , { "id": 1724, "source": "", "value": "text/stylus", "compressible": false, "charSet": "", "extensions": "stylus, styl" }
            , { "id": 1725, "source": "iana", "value": "text/t140", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 1726, "source": "iana", "value": "text/tab-separated-values", "compressible": true, "charSet": "", "extensions": "tsv" }
            , { "id": 1727, "source": "iana", "value": "text/troff", "compressible": false, "charSet": "", "extensions": "t, tr, roff, man, me, ms" }
            , { "id": 1728, "source": "iana", "value": "text/turtle", "compressible": false, "charSet": "", "extensions": "ttl" }
            , { "id": 1729, "source": "iana", "value": "text/ulpfec", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 1730, "source": "iana", "value": "text/uri-list", "compressible": true, "charSet": "", "extensions": "uri, uris, urls" }
            , { "id": 1731, "source": "iana", "value": "text/vcard", "compressible": true, "charSet": "", "extensions": "vcard" }
            , { "id": 1732, "source": "iana", "value": "text/vnd.a", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 1733, "source": "iana", "value": "text/vnd.abc", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 1734, "source": "iana", "value": "text/vnd.curl", "compressible": false, "charSet": "", "extensions": "curl" }
            , { "id": 1735, "source": "apache", "value": "text/vnd.curl.dcurl", "compressible": false, "charSet": "", "extensions": "dcurl" }
            , { "id": 1736, "source": "apache", "value": "text/vnd.curl.mcurl", "compressible": false, "charSet": "", "extensions": "mcurl" }
            , { "id": 1737, "source": "apache", "value": "text/vnd.curl.scurl", "compressible": false, "charSet": "", "extensions": "scurl" }
            , { "id": 1738, "source": "iana", "value": "text/vnd.debian.copyright", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 1739, "source": "iana", "value": "text/vnd.dmclientscript", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 1740, "source": "iana", "value": "text/vnd.dvb.subtitle", "compressible": false, "charSet": "", "extensions": "sub" }
            , { "id": 1741, "source": "iana", "value": "text/vnd.esmertec.theme-descriptor", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 1742, "source": "iana", "value": "text/vnd.fly", "compressible": false, "charSet": "", "extensions": "fly" }
            , { "id": 1743, "source": "iana", "value": "text/vnd.fmi.flexstor", "compressible": false, "charSet": "", "extensions": "flx" }
            , { "id": 1744, "source": "iana", "value": "text/vnd.graphviz", "compressible": false, "charSet": "", "extensions": "gv" }
            , { "id": 1745, "source": "iana", "value": "text/vnd.in3d.3dml", "compressible": false, "charSet": "", "extensions": "3dml" }
            , { "id": 1746, "source": "iana", "value": "text/vnd.in3d.spot", "compressible": false, "charSet": "", "extensions": "spot" }
            , { "id": 1747, "source": "iana", "value": "text/vnd.iptc.newsml", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 1748, "source": "iana", "value": "text/vnd.iptc.nitf", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 1749, "source": "iana", "value": "text/vnd.latex-z", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 1750, "source": "iana", "value": "text/vnd.motorola.reflex", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 1751, "source": "iana", "value": "text/vnd.ms-mediapackage", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 1752, "source": "iana", "value": "text/vnd.net2phone.commcenter.command", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 1753, "source": "iana", "value": "text/vnd.radisys.msml-basic-layout", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 1754, "source": "iana", "value": "text/vnd.si.uricatalogue", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 1755, "source": "iana", "value": "text/vnd.sun.j2me.app-descriptor", "compressible": false, "charSet": "", "extensions": "jad" }
            , { "id": 1756, "source": "iana", "value": "text/vnd.trolltech.linguist", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 1757, "source": "iana", "value": "text/vnd.wap.si", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 1758, "source": "iana", "value": "text/vnd.wap.sl", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 1759, "source": "iana", "value": "text/vnd.wap.wml", "compressible": false, "charSet": "", "extensions": "wml" }
            , { "id": 1760, "source": "iana", "value": "text/vnd.wap.wmlscript", "compressible": false, "charSet": "", "extensions": "wmls" }
            , { "id": 1761, "source": "", "value": "text/vtt", "compressible": true, "charSet": "UTF-8", "extensions": "vtt" }
            , { "id": 1762, "source": "apache", "value": "text/x-asm", "compressible": false, "charSet": "", "extensions": "s, asm" }
            , { "id": 1763, "source": "apache", "value": "text/x-c", "compressible": false, "charSet": "", "extensions": "c, cc, cxx, cpp, h, hh, dic" }
            , { "id": 1764, "source": "nginx", "value": "text/x-component", "compressible": false, "charSet": "", "extensions": "htc" }
            , { "id": 1765, "source": "apache", "value": "text/x-fortran", "compressible": false, "charSet": "", "extensions": "f, for, f77, f90" }
            , { "id": 1766, "source": "", "value": "text/x-gwt-rpc", "compressible": true, "charSet": "", "extensions": "" }
            , { "id": 1767, "source": "", "value": "text/x-handlebars-template", "compressible": false, "charSet": "", "extensions": "hbs" }
            , { "id": 1768, "source": "apache", "value": "text/x-java-source", "compressible": false, "charSet": "", "extensions": "java" }
            , { "id": 1769, "source": "", "value": "text/x-jquery-tmpl", "compressible": true, "charSet": "", "extensions": "" }
            , { "id": 1770, "source": "", "value": "text/x-lua", "compressible": false, "charSet": "", "extensions": "lua" }
            , { "id": 1771, "source": "", "value": "text/x-markdown", "compressible": true, "charSet": "", "extensions": "markdown, md, mkd" }
            , { "id": 1772, "source": "apache", "value": "text/x-nfo", "compressible": false, "charSet": "", "extensions": "nfo" }
            , { "id": 1773, "source": "apache", "value": "text/x-opml", "compressible": false, "charSet": "", "extensions": "opml" }
            , { "id": 1774, "source": "apache", "value": "text/x-pascal", "compressible": false, "charSet": "", "extensions": "p, pas" }
            , { "id": 1775, "source": "", "value": "text/x-processing", "compressible": true, "charSet": "", "extensions": "pde" }
            , { "id": 1776, "source": "", "value": "text/x-sass", "compressible": false, "charSet": "", "extensions": "sass" }
            , { "id": 1777, "source": "", "value": "text/x-scss", "compressible": false, "charSet": "", "extensions": "scss" }
            , { "id": 1778, "source": "apache", "value": "text/x-setext", "compressible": false, "charSet": "", "extensions": "etx" }
            , { "id": 1779, "source": "apache", "value": "text/x-sfv", "compressible": false, "charSet": "", "extensions": "sfv" }
            , { "id": 1780, "source": "", "value": "text/x-suse-ymp", "compressible": true, "charSet": "", "extensions": "ymp" }
            , { "id": 1781, "source": "apache", "value": "text/x-uuencode", "compressible": false, "charSet": "", "extensions": "uu" }
            , { "id": 1782, "source": "apache", "value": "text/x-vcalendar", "compressible": false, "charSet": "", "extensions": "vcs" }
            , { "id": 1783, "source": "apache", "value": "text/x-vcard", "compressible": false, "charSet": "", "extensions": "vcf" }
            , { "id": 1784, "source": "iana", "value": "text/xml", "compressible": true, "charSet": "", "extensions": "xml" }
            , { "id": 1785, "source": "iana", "value": "text/xml-external-parsed-entity", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 1786, "source": "", "value": "text/yaml", "compressible": false, "charSet": "", "extensions": "yaml, yml" }
            , { "id": 1787, "source": "apache", "value": "video/1d-interleaved-parityfec", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 1788, "source": "apache", "value": "video/3gpp", "compressible": false, "charSet": "", "extensions": "3gp, 3gpp" }
            , { "id": 1789, "source": "apache", "value": "video/3gpp-tt", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 1790, "source": "apache", "value": "video/3gpp2", "compressible": false, "charSet": "", "extensions": "3g2" }
            , { "id": 1791, "source": "apache", "value": "video/bmpeg", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 1792, "source": "apache", "value": "video/bt656", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 1793, "source": "apache", "value": "video/celb", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 1794, "source": "apache", "value": "video/dv", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 1795, "source": "apache", "value": "video/encaprtp", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 1796, "source": "apache", "value": "video/h261", "compressible": false, "charSet": "", "extensions": "h261" }
            , { "id": 1797, "source": "apache", "value": "video/h263", "compressible": false, "charSet": "", "extensions": "h263" }
            , { "id": 1798, "source": "apache", "value": "video/h263-1998", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 1799, "source": "apache", "value": "video/h263-2000", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 1800, "source": "apache", "value": "video/h264", "compressible": false, "charSet": "", "extensions": "h264" }
            , { "id": 1801, "source": "apache", "value": "video/h264-rcdo", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 1802, "source": "apache", "value": "video/h264-svc", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 1803, "source": "apache", "value": "video/h265", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 1804, "source": "apache", "value": "video/iso.segment", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 1805, "source": "apache", "value": "video/jpeg", "compressible": false, "charSet": "", "extensions": "jpgv" }
            , { "id": 1806, "source": "apache", "value": "video/jpeg2000", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 1807, "source": "apache", "value": "video/jpm", "compressible": false, "charSet": "", "extensions": "jpm, jpgm" }
            , { "id": 1808, "source": "apache", "value": "video/mj2", "compressible": false, "charSet": "", "extensions": "mj2, mjp2" }
            , { "id": 1809, "source": "apache", "value": "video/mp1s", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 1810, "source": "apache", "value": "video/mp2p", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 1811, "source": "apache", "value": "video/mp2t", "compressible": false, "charSet": "", "extensions": "ts" }
            , { "id": 1812, "source": "apache", "value": "video/mp4", "compressible": false, "charSet": "", "extensions": "mp4, mp4v, mpg4" }
            , { "id": 1813, "source": "apache", "value": "video/mp4v-es", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 1814, "source": "apache", "value": "video/mpeg", "compressible": false, "charSet": "", "extensions": "mpeg, mpg, mpe, m1v, m2v" }
            , { "id": 1815, "source": "apache", "value": "video/mpeg4-generic", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 1816, "source": "apache", "value": "video/mpv", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 1817, "source": "apache", "value": "video/nv", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 1818, "source": "apache", "value": "video/ogg", "compressible": false, "charSet": "", "extensions": "ogv" }
            , { "id": 1819, "source": "apache", "value": "video/parityfec", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 1820, "source": "apache", "value": "video/pointer", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 1821, "source": "apache", "value": "video/quicktime", "compressible": false, "charSet": "", "extensions": "qt, mov" }
            , { "id": 1822, "source": "apache", "value": "video/raptorfec", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 1823, "source": "apache", "value": "video/raw", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 1824, "source": "apache", "value": "video/rtp-enc-aescm128", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 1825, "source": "apache", "value": "video/rtploopback", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 1826, "source": "apache", "value": "video/rtx", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 1827, "source": "apache", "value": "video/smpte292m", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 1828, "source": "apache", "value": "video/ulpfec", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 1829, "source": "apache", "value": "video/vc1", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 1830, "source": "apache", "value": "video/vnd.cctv", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 1831, "source": "apache", "value": "video/vnd.dece.hd", "compressible": false, "charSet": "", "extensions": "uvh, uvvh" }
            , { "id": 1832, "source": "apache", "value": "video/vnd.dece.mobile", "compressible": false, "charSet": "", "extensions": "uvm, uvvm" }
            , { "id": 1833, "source": "apache", "value": "video/vnd.dece.mp4", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 1834, "source": "apache", "value": "video/vnd.dece.pd", "compressible": false, "charSet": "", "extensions": "uvp, uvvp" }
            , { "id": 1835, "source": "apache", "value": "video/vnd.dece.sd", "compressible": false, "charSet": "", "extensions": "uvs, uvvs" }
            , { "id": 1836, "source": "apache", "value": "video/vnd.dece.video", "compressible": false, "charSet": "", "extensions": "uvv, uvvv" }
            , { "id": 1837, "source": "apache", "value": "video/vnd.directv.mpeg", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 1838, "source": "apache", "value": "video/vnd.directv.mpeg-tts", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 1839, "source": "apache", "value": "video/vnd.dlna.mpeg-tts", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 1840, "source": "apache", "value": "video/vnd.dvb.file", "compressible": false, "charSet": "", "extensions": "dvb" }
            , { "id": 1841, "source": "apache", "value": "video/vnd.fvt", "compressible": false, "charSet": "", "extensions": "fvt" }
            , { "id": 1842, "source": "apache", "value": "video/vnd.hns.video", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 1843, "source": "apache", "value": "video/vnd.iptvforum.1dparityfec-1010", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 1844, "source": "apache", "value": "video/vnd.iptvforum.1dparityfec-2005", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 1845, "source": "apache", "value": "video/vnd.iptvforum.2dparityfec-1010", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 1846, "source": "apache", "value": "video/vnd.iptvforum.2dparityfec-2005", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 1847, "source": "apache", "value": "video/vnd.iptvforum.ttsavc", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 1848, "source": "apache", "value": "video/vnd.iptvforum.ttsmpeg2", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 1849, "source": "apache", "value": "video/vnd.motorola.video", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 1850, "source": "apache", "value": "video/vnd.motorola.videop", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 1851, "source": "apache", "value": "video/vnd.mpegurl", "compressible": false, "charSet": "", "extensions": "mxu, m4u" }
            , { "id": 1852, "source": "apache", "value": "video/vnd.ms-playready.media.pyv", "compressible": false, "charSet": "", "extensions": "pyv" }
            , { "id": 1853, "source": "apache", "value": "video/vnd.nokia.interleaved-multimedia", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 1854, "source": "apache", "value": "video/vnd.nokia.videovoip", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 1855, "source": "apache", "value": "video/vnd.objectvideo", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 1856, "source": "apache", "value": "video/vnd.radgamettools.bink", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 1857, "source": "apache", "value": "video/vnd.radgamettools.smacker", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 1858, "source": "apache", "value": "video/vnd.sealed.mpeg1", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 1859, "source": "apache", "value": "video/vnd.sealed.mpeg4", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 1860, "source": "apache", "value": "video/vnd.sealed.swf", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 1861, "source": "apache", "value": "video/vnd.sealedmedia.softseal.mov", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 1862, "source": "apache", "value": "video/vnd.uvvu.mp4", "compressible": false, "charSet": "", "extensions": "uvu, uvvu" }
            , { "id": 1863, "source": "apache", "value": "video/vnd.vivo", "compressible": false, "charSet": "", "extensions": "viv" }
            , { "id": 1864, "source": "apache", "value": "video/vp8", "compressible": false, "charSet": "", "extensions": "" }
            , { "id": 1865, "source": "apache", "value": "video/webm", "compressible": false, "charSet": "", "extensions": "webm" }
            , { "id": 1866, "source": "apache", "value": "video/x-f4v", "compressible": false, "charSet": "", "extensions": "f4v" }
            , { "id": 1867, "source": "apache", "value": "video/x-fli", "compressible": false, "charSet": "", "extensions": "fli" }
            , { "id": 1868, "source": "apache", "value": "video/x-flv", "compressible": false, "charSet": "", "extensions": "flv" }
            , { "id": 1869, "source": "apache", "value": "video/x-m4v", "compressible": false, "charSet": "", "extensions": "m4v" }
            , { "id": 1870, "source": "apache", "value": "video/x-matroska", "compressible": false, "charSet": "", "extensions": "mkv, mk3d, mks" }
            , { "id": 1871, "source": "apache", "value": "video/x-mng", "compressible": false, "charSet": "", "extensions": "mng" }
            , { "id": 1872, "source": "apache", "value": "video/x-ms-asf", "compressible": false, "charSet": "", "extensions": "asf, asx" }
            , { "id": 1873, "source": "apache", "value": "video/x-ms-vob", "compressible": false, "charSet": "", "extensions": "vob" }
            , { "id": 1874, "source": "apache", "value": "video/x-ms-wm", "compressible": false, "charSet": "", "extensions": "wm" }
            , { "id": 1875, "source": "apache", "value": "video/x-ms-wmv", "compressible": false, "charSet": "", "extensions": "wmv" }
            , { "id": 1876, "source": "apache", "value": "video/x-ms-wmx", "compressible": false, "charSet": "", "extensions": "wmx" }
            , { "id": 1877, "source": "apache", "value": "video/x-ms-wvx", "compressible": false, "charSet": "", "extensions": "wvx" }
            , { "id": 1878, "source": "apache", "value": "video/x-msvideo", "compressible": false, "charSet": "", "extensions": "avi" }
            , { "id": 1879, "source": "apache", "value": "video/x-sgi-movie", "compressible": false, "charSet": "", "extensions": "movie" }
            , { "id": 1880, "source": "apache", "value": "video/x-smv", "compressible": false, "charSet": "", "extensions": "smv" }
            , { "id": 1881, "source": "apache", "value": "x-conference/x-cooltalk", "compressible": false, "charSet": "", "extensions": "ice" }
            , { "id": 1882, "source": "", "value": "x-shader/x-fragment", "compressible": true, "charSet": "", "extensions": "" }
            , { "id": 1883, "source": "", "value": "x-shader/x-vertex", "compressible": true, "charSet": "", "extensions": "" }
        ]
    }
    function _initMimeTypes() {
        __mimeTypes = [
            { "mimeId": 17, "extension": "ez", "isDefault": true },
            { "mimeId": 19, "extension": "aw", "isDefault": true },
            { "mimeId": 22, "extension": "atom", "isDefault": true },
            { "mimeId": 23, "extension": "atomcat", "isDefault": true },
            { "mimeId": 26, "extension": "atomsvc", "isDefault": true },
            { "mimeId": 31, "extension": "bdoc", "isDefault": true },
            { "mimeId": 39, "extension": "ccxml", "isDefault": true },
            { "mimeId": 41, "extension": "cdmia", "isDefault": true },
            { "mimeId": 42, "extension": "cdmic", "isDefault": true },
            { "mimeId": 43, "extension": "cdmid", "isDefault": true },
            { "mimeId": 44, "extension": "cdmio", "isDefault": true },
            { "mimeId": 45, "extension": "cdmiq", "isDefault": true },
            { "mimeId": 61, "extension": "cu", "isDefault": true },
            { "mimeId": 64, "extension": "mpd", "isDefault": true },
            { "mimeId": 66, "extension": "davmount", "isDefault": true },
            { "mimeId": 75, "extension": "dbk", "isDefault": true },
            { "mimeId": 77, "extension": "dssc", "isDefault": true },
            { "mimeId": 78, "extension": "xdssc", "isDefault": true },
            { "mimeId": 80, "extension": "ecma", "isDefault": true },
            { "mimeId": 90, "extension": "emma", "isDefault": true },
            { "mimeId": 94, "extension": "epub", "isDefault": true },
            { "mimeId": 96, "extension": "exi", "isDefault": true },
            { "mimeId": 102, "extension": "pfr", "isDefault": true },
            { "mimeId": 103, "extension": "woff", "isDefault": true },
            { "mimeId": 104, "extension": "woff2", "isDefault": true },
            { "mimeId": 106, "extension": "gml", "isDefault": true },
            { "mimeId": 107, "extension": "gpx", "isDefault": true },
            { "mimeId": 108, "extension": "gxf", "isDefault": true },
            { "mimeId": 113, "extension": "stk", "isDefault": true },
            { "mimeId": 124, "extension": "ink", "isDefault": true },
            { "mimeId": 124, "extension": "inkml", "isDefault": true },
            { "mimeId": 126, "extension": "ipfix", "isDefault": true },
            { "mimeId": 130, "extension": "ear", "isDefault": true },
            { "mimeId": 130, "extension": "jar", "isDefault": true },
            { "mimeId": 130, "extension": "war", "isDefault": true },
            { "mimeId": 131, "extension": "ser", "isDefault": true },
            { "mimeId": 132, "extension": "class", "isDefault": true },
            { "mimeId": 133, "extension": "js", "isDefault": true },
            { "mimeId": 137, "extension": "json", "isDefault": true },
            { "mimeId": 137, "extension": "map", "isDefault": true },
            { "mimeId": 140, "extension": "json5", "isDefault": true },
            { "mimeId": 141, "extension": "jsonml", "isDefault": true },
            { "mimeId": 147, "extension": "jsonld", "isDefault": true },
            { "mimeId": 150, "extension": "lostxml", "isDefault": true },
            { "mimeId": 153, "extension": "hqx", "isDefault": true },
            { "mimeId": 154, "extension": "cpt", "isDefault": true },
            { "mimeId": 156, "extension": "mads", "isDefault": true },
            { "mimeId": 157, "extension": "webmanifest", "isDefault": true },
            { "mimeId": 158, "extension": "mrc", "isDefault": true },
            { "mimeId": 159, "extension": "mrcx", "isDefault": true },
            { "mimeId": 160, "extension": "ma", "isDefault": true },
            { "mimeId": 160, "extension": "mb", "isDefault": true },
            { "mimeId": 160, "extension": "nb", "isDefault": true },
            { "mimeId": 161, "extension": "mathml", "isDefault": true },
            { "mimeId": 175, "extension": "mbox", "isDefault": true },
            { "mimeId": 178, "extension": "mscml", "isDefault": true },
            { "mimeId": 180, "extension": "metalink", "isDefault": true },
            { "mimeId": 181, "extension": "meta4", "isDefault": true },
            { "mimeId": 182, "extension": "mets", "isDefault": true },
            { "mimeId": 185, "extension": "mods", "isDefault": true },
            { "mimeId": 190, "extension": "m21", "isDefault": true },
            { "mimeId": 190, "extension": "mp21", "isDefault": true },
            { "mimeId": 191, "extension": "m4p", "isDefault": true },
            { "mimeId": 191, "extension": "mp4s", "isDefault": true },
            { "mimeId": 199, "extension": "doc", "isDefault": true },
            { "mimeId": 199, "extension": "dot", "isDefault": true },
            { "mimeId": 200, "extension": "mxf", "isDefault": true },
            { "mimeId": 209, "extension": "bin", "isDefault": true },
            { "mimeId": 209, "extension": "bpk", "isDefault": true },
            { "mimeId": 209, "extension": "buffer", "isDefault": true },
            { "mimeId": 209, "extension": "deb", "isDefault": false },
            { "mimeId": 209, "extension": "deploy", "isDefault": true },
            { "mimeId": 209, "extension": "dist", "isDefault": true },
            { "mimeId": 209, "extension": "distz", "isDefault": true },
            { "mimeId": 209, "extension": "dll", "isDefault": true },
            { "mimeId": 209, "extension": "dmg", "isDefault": false },
            { "mimeId": 209, "extension": "dms", "isDefault": true },
            { "mimeId": 209, "extension": "dump", "isDefault": true },
            { "mimeId": 209, "extension": "elc", "isDefault": true },
            { "mimeId": 209, "extension": "exe", "isDefault": true },
            { "mimeId": 209, "extension": "img", "isDefault": true },
            { "mimeId": 209, "extension": "iso", "isDefault": false },
            { "mimeId": 209, "extension": "lrf", "isDefault": true },
            { "mimeId": 209, "extension": "mar", "isDefault": true },
            { "mimeId": 209, "extension": "msi", "isDefault": true },
            { "mimeId": 209, "extension": "msm", "isDefault": true },
            { "mimeId": 209, "extension": "msp", "isDefault": true },
            { "mimeId": 209, "extension": "pkg", "isDefault": true },
            { "mimeId": 209, "extension": "so", "isDefault": true },
            { "mimeId": 210, "extension": "oda", "isDefault": true },
            { "mimeId": 212, "extension": "opf", "isDefault": true },
            { "mimeId": 213, "extension": "ogx", "isDefault": true },
            { "mimeId": 214, "extension": "omdoc", "isDefault": true },
            { "mimeId": 215, "extension": "onepkg", "isDefault": true },
            { "mimeId": 215, "extension": "onetmp", "isDefault": true },
            { "mimeId": 215, "extension": "onetoc", "isDefault": true },
            { "mimeId": 215, "extension": "onetoc2", "isDefault": true },
            { "mimeId": 216, "extension": "oxps", "isDefault": true },
            { "mimeId": 219, "extension": "xer", "isDefault": true },
            { "mimeId": 220, "extension": "pdf", "isDefault": true },
            { "mimeId": 222, "extension": "pgp", "isDefault": true },
            { "mimeId": 224, "extension": "asc", "isDefault": true },
            { "mimeId": 224, "extension": "sig", "isDefault": true },
            { "mimeId": 225, "extension": "prf", "isDefault": true },
            { "mimeId": 228, "extension": "p10", "isDefault": true },
            { "mimeId": 230, "extension": "p7c", "isDefault": true },
            { "mimeId": 230, "extension": "p7m", "isDefault": true },
            { "mimeId": 231, "extension": "p7s", "isDefault": true },
            { "mimeId": 232, "extension": "p8", "isDefault": true },
            { "mimeId": 233, "extension": "ac", "isDefault": true },
            { "mimeId": 234, "extension": "cer", "isDefault": true },
            { "mimeId": 235, "extension": "crl", "isDefault": true },
            { "mimeId": 236, "extension": "pkipath", "isDefault": true },
            { "mimeId": 237, "extension": "pki", "isDefault": true },
            { "mimeId": 238, "extension": "pls", "isDefault": true },
            { "mimeId": 240, "extension": "ai", "isDefault": true },
            { "mimeId": 240, "extension": "eps", "isDefault": true },
            { "mimeId": 240, "extension": "ps", "isDefault": true },
            { "mimeId": 246, "extension": "cww", "isDefault": true },
            { "mimeId": 252, "extension": "pskcxml", "isDefault": true },
            { "mimeId": 256, "extension": "rdf", "isDefault": true },
            { "mimeId": 257, "extension": "rif", "isDefault": true },
            { "mimeId": 258, "extension": "rnc", "isDefault": true },
            { "mimeId": 261, "extension": "rl", "isDefault": true },
            { "mimeId": 262, "extension": "rld", "isDefault": true },
            { "mimeId": 266, "extension": "rs", "isDefault": true },
            { "mimeId": 267, "extension": "gbr", "isDefault": true },
            { "mimeId": 268, "extension": "mft", "isDefault": true },
            { "mimeId": 269, "extension": "roa", "isDefault": true },
            { "mimeId": 271, "extension": "rsd", "isDefault": true },
            { "mimeId": 272, "extension": "rss", "isDefault": true },
            { "mimeId": 273, "extension": "rtf", "isDefault": true },
            { "mimeId": 278, "extension": "sbml", "isDefault": true },
            { "mimeId": 281, "extension": "scq", "isDefault": true },
            { "mimeId": 282, "extension": "scs", "isDefault": true },
            { "mimeId": 283, "extension": "spq", "isDefault": true },
            { "mimeId": 284, "extension": "spp", "isDefault": true },
            { "mimeId": 285, "extension": "sdp", "isDefault": true },
            { "mimeId": 290, "extension": "setpay", "isDefault": true },
            { "mimeId": 292, "extension": "setreg", "isDefault": true },
            { "mimeId": 295, "extension": "shf", "isDefault": true },
            { "mimeId": 302, "extension": "smi", "isDefault": true },
            { "mimeId": 302, "extension": "smil", "isDefault": true },
            { "mimeId": 306, "extension": "rq", "isDefault": true },
            { "mimeId": 307, "extension": "srx", "isDefault": true },
            { "mimeId": 310, "extension": "gram", "isDefault": true },
            { "mimeId": 311, "extension": "grxml", "isDefault": true },
            { "mimeId": 312, "extension": "sru", "isDefault": true },
            { "mimeId": 313, "extension": "ssdl", "isDefault": true },
            { "mimeId": 314, "extension": "ssml", "isDefault": true },
            { "mimeId": 327, "extension": "tei", "isDefault": true },
            { "mimeId": 327, "extension": "teicorpus", "isDefault": true },
            { "mimeId": 328, "extension": "tfi", "isDefault": true },
            { "mimeId": 331, "extension": "tsd", "isDefault": true },
            { "mimeId": 348, "extension": "plb", "isDefault": true },
            { "mimeId": 349, "extension": "psb", "isDefault": true },
            { "mimeId": 350, "extension": "pvb", "isDefault": true },
            { "mimeId": 359, "extension": "tcap", "isDefault": true },
            { "mimeId": 361, "extension": "pwn", "isDefault": true },
            { "mimeId": 362, "extension": "aso", "isDefault": true },
            { "mimeId": 363, "extension": "imp", "isDefault": true },
            { "mimeId": 364, "extension": "acu", "isDefault": true },
            { "mimeId": 365, "extension": "acutc", "isDefault": true },
            { "mimeId": 365, "extension": "atc", "isDefault": true },
            { "mimeId": 366, "extension": "air", "isDefault": true },
            { "mimeId": 368, "extension": "fcdt", "isDefault": true },
            { "mimeId": 369, "extension": "fxp", "isDefault": true },
            { "mimeId": 369, "extension": "fxpl", "isDefault": true },
            { "mimeId": 371, "extension": "xdp", "isDefault": true },
            { "mimeId": 372, "extension": "xfdf", "isDefault": true },
            { "mimeId": 375, "extension": "ahead", "isDefault": true },
            { "mimeId": 376, "extension": "azf", "isDefault": true },
            { "mimeId": 377, "extension": "azs", "isDefault": true },
            { "mimeId": 378, "extension": "azw", "isDefault": true },
            { "mimeId": 379, "extension": "acc", "isDefault": true },
            { "mimeId": 380, "extension": "ami", "isDefault": true },
            { "mimeId": 382, "extension": "apk", "isDefault": true },
            { "mimeId": 384, "extension": "cii", "isDefault": true },
            { "mimeId": 385, "extension": "fti", "isDefault": true },
            { "mimeId": 386, "extension": "atx", "isDefault": true },
            { "mimeId": 391, "extension": "mpkg", "isDefault": true },
            { "mimeId": 392, "extension": "m3u8", "isDefault": true },
            { "mimeId": 393, "extension": "pkpass", "isDefault": true },
            { "mimeId": 395, "extension": "swi", "isDefault": true },
            { "mimeId": 397, "extension": "iota", "isDefault": true },
            { "mimeId": 398, "extension": "aep", "isDefault": true },
            { "mimeId": 405, "extension": "mpm", "isDefault": true },
            { "mimeId": 408, "extension": "bmi", "isDefault": true },
            { "mimeId": 409, "extension": "rep", "isDefault": true },
            { "mimeId": 415, "extension": "cdxml", "isDefault": true },
            { "mimeId": 416, "extension": "mmd", "isDefault": true },
            { "mimeId": 417, "extension": "cdy", "isDefault": true },
            { "mimeId": 420, "extension": "cla", "isDefault": true },
            { "mimeId": 421, "extension": "rp9", "isDefault": true },
            { "mimeId": 422, "extension": "c4d", "isDefault": true },
            { "mimeId": 422, "extension": "c4f", "isDefault": true },
            { "mimeId": 422, "extension": "c4g", "isDefault": true },
            { "mimeId": 422, "extension": "c4p", "isDefault": true },
            { "mimeId": 422, "extension": "c4u", "isDefault": true },
            { "mimeId": 423, "extension": "c11amc", "isDefault": true },
            { "mimeId": 424, "extension": "c11amz", "isDefault": true },
            { "mimeId": 430, "extension": "csp", "isDefault": true },
            { "mimeId": 431, "extension": "cdbcmsg", "isDefault": true },
            { "mimeId": 433, "extension": "cmc", "isDefault": true },
            { "mimeId": 434, "extension": "clkx", "isDefault": true },
            { "mimeId": 435, "extension": "clkk", "isDefault": true },
            { "mimeId": 436, "extension": "clkp", "isDefault": true },
            { "mimeId": 437, "extension": "clkt", "isDefault": true },
            { "mimeId": 438, "extension": "clkw", "isDefault": true },
            { "mimeId": 439, "extension": "wbs", "isDefault": true },
            { "mimeId": 440, "extension": "pml", "isDefault": true },
            { "mimeId": 444, "extension": "ppd", "isDefault": true },
            { "mimeId": 448, "extension": "car", "isDefault": true },
            { "mimeId": 449, "extension": "pcurl", "isDefault": true },
            { "mimeId": 452, "extension": "dart", "isDefault": true },
            { "mimeId": 453, "extension": "rdz", "isDefault": true },
            { "mimeId": 455, "extension": "uvd", "isDefault": true },
            { "mimeId": 455, "extension": "uvf", "isDefault": true },
            { "mimeId": 455, "extension": "uvvd", "isDefault": true },
            { "mimeId": 455, "extension": "uvvf", "isDefault": true },
            { "mimeId": 456, "extension": "uvt", "isDefault": true },
            { "mimeId": 456, "extension": "uvvt", "isDefault": true },
            { "mimeId": 457, "extension": "uvvx", "isDefault": true },
            { "mimeId": 457, "extension": "uvx", "isDefault": true },
            { "mimeId": 458, "extension": "uvvz", "isDefault": true },
            { "mimeId": 458, "extension": "uvz", "isDefault": true },
            { "mimeId": 459, "extension": "fe_launch", "isDefault": true },
            { "mimeId": 464, "extension": "dna", "isDefault": true },
            { "mimeId": 466, "extension": "mlp", "isDefault": true },
            { "mimeId": 470, "extension": "dpg", "isDefault": true },
            { "mimeId": 471, "extension": "dfac", "isDefault": true },
            { "mimeId": 473, "extension": "kpxx", "isDefault": true },
            { "mimeId": 477, "extension": "ait", "isDefault": true },
            { "mimeId": 495, "extension": "svc", "isDefault": true },
            { "mimeId": 497, "extension": "geo", "isDefault": true },
            { "mimeId": 501, "extension": "mag", "isDefault": true },
            { "mimeId": 508, "extension": "nml", "isDefault": true },
            { "mimeId": 511, "extension": "esf", "isDefault": true },
            { "mimeId": 512, "extension": "msf", "isDefault": true },
            { "mimeId": 513, "extension": "qam", "isDefault": true },
            { "mimeId": 514, "extension": "slt", "isDefault": true },
            { "mimeId": 515, "extension": "ssf", "isDefault": true },
            { "mimeId": 517, "extension": "es3", "isDefault": true },
            { "mimeId": 517, "extension": "et3", "isDefault": true },
            { "mimeId": 541, "extension": "ez2", "isDefault": true },
            { "mimeId": 542, "extension": "ez3", "isDefault": true },
            { "mimeId": 545, "extension": "fdf", "isDefault": true },
            { "mimeId": 546, "extension": "mseed", "isDefault": true },
            { "mimeId": 547, "extension": "dataless", "isDefault": true },
            { "mimeId": 547, "extension": "seed", "isDefault": true },
            { "mimeId": 552, "extension": "gph", "isDefault": true },
            { "mimeId": 553, "extension": "ftc", "isDefault": true },
            { "mimeId": 555, "extension": "book", "isDefault": true },
            { "mimeId": 555, "extension": "fm", "isDefault": true },
            { "mimeId": 555, "extension": "frame", "isDefault": true },
            { "mimeId": 555, "extension": "maker", "isDefault": true },
            { "mimeId": 556, "extension": "fnc", "isDefault": true },
            { "mimeId": 557, "extension": "ltf", "isDefault": true },
            { "mimeId": 558, "extension": "fsc", "isDefault": true },
            { "mimeId": 559, "extension": "oas", "isDefault": true },
            { "mimeId": 560, "extension": "oa2", "isDefault": true },
            { "mimeId": 561, "extension": "oa3", "isDefault": true },
            { "mimeId": 562, "extension": "fg5", "isDefault": true },
            { "mimeId": 563, "extension": "bh2", "isDefault": true },
            { "mimeId": 566, "extension": "ddd", "isDefault": true },
            { "mimeId": 567, "extension": "xdw", "isDefault": true },
            { "mimeId": 568, "extension": "xbd", "isDefault": true },
            { "mimeId": 572, "extension": "fzs", "isDefault": true },
            { "mimeId": 573, "extension": "txd", "isDefault": true },
            { "mimeId": 576, "extension": "ggb", "isDefault": true },
            { "mimeId": 577, "extension": "ggt", "isDefault": true },
            { "mimeId": 578, "extension": "gex", "isDefault": true },
            { "mimeId": 578, "extension": "gre", "isDefault": true },
            { "mimeId": 579, "extension": "gxt", "isDefault": true },
            { "mimeId": 580, "extension": "g2w", "isDefault": true },
            { "mimeId": 581, "extension": "g3w", "isDefault": true },
            { "mimeId": 585, "extension": "gmx", "isDefault": true },
            { "mimeId": 586, "extension": "gdoc", "isDefault": true },
            { "mimeId": 587, "extension": "gslides", "isDefault": true },
            { "mimeId": 588, "extension": "gsheet", "isDefault": true },
            { "mimeId": 589, "extension": "kml", "isDefault": true },
            { "mimeId": 590, "extension": "kmz", "isDefault": true },
            { "mimeId": 594, "extension": "gqf", "isDefault": true },
            { "mimeId": 594, "extension": "gqs", "isDefault": true },
            { "mimeId": 596, "extension": "gac", "isDefault": true },
            { "mimeId": 597, "extension": "ghf", "isDefault": true },
            { "mimeId": 598, "extension": "gim", "isDefault": true },
            { "mimeId": 599, "extension": "grv", "isDefault": true },
            { "mimeId": 600, "extension": "gtm", "isDefault": true },
            { "mimeId": 601, "extension": "tpl", "isDefault": true },
            { "mimeId": 602, "extension": "vcg", "isDefault": true },
            { "mimeId": 604, "extension": "hal", "isDefault": true },
            { "mimeId": 605, "extension": "zmm", "isDefault": true },
            { "mimeId": 606, "extension": "hbci", "isDefault": true },
            { "mimeId": 610, "extension": "les", "isDefault": true },
            { "mimeId": 611, "extension": "hpgl", "isDefault": true },
            { "mimeId": 612, "extension": "hpid", "isDefault": true },
            { "mimeId": 613, "extension": "hps", "isDefault": true },
            { "mimeId": 614, "extension": "jlt", "isDefault": true },
            { "mimeId": 615, "extension": "pcl", "isDefault": true },
            { "mimeId": 616, "extension": "pclxl", "isDefault": true },
            { "mimeId": 618, "extension": "sfd-hdstx", "isDefault": true },
            { "mimeId": 623, "extension": "mpy", "isDefault": true },
            { "mimeId": 624, "extension": "afp", "isDefault": true },
            { "mimeId": 624, "extension": "list3820", "isDefault": true },
            { "mimeId": 624, "extension": "listafp", "isDefault": true },
            { "mimeId": 625, "extension": "irm", "isDefault": true },
            { "mimeId": 626, "extension": "sc", "isDefault": true },
            { "mimeId": 627, "extension": "icc", "isDefault": true },
            { "mimeId": 627, "extension": "icm", "isDefault": true },
            { "mimeId": 629, "extension": "igl", "isDefault": true },
            { "mimeId": 630, "extension": "ivp", "isDefault": true },
            { "mimeId": 631, "extension": "ivu", "isDefault": true },
            { "mimeId": 646, "extension": "igm", "isDefault": true },
            { "mimeId": 647, "extension": "xpw", "isDefault": true },
            { "mimeId": 647, "extension": "xpx", "isDefault": true },
            { "mimeId": 648, "extension": "i2g", "isDefault": true },
            { "mimeId": 651, "extension": "qbo", "isDefault": true },
            { "mimeId": 652, "extension": "qfx", "isDefault": true },
            { "mimeId": 660, "extension": "rcprofile", "isDefault": true },
            { "mimeId": 661, "extension": "irp", "isDefault": true },
            { "mimeId": 662, "extension": "xpr", "isDefault": true },
            { "mimeId": 663, "extension": "fcs", "isDefault": true },
            { "mimeId": 664, "extension": "jam", "isDefault": true },
            { "mimeId": 673, "extension": "rms", "isDefault": true },
            { "mimeId": 674, "extension": "jisp", "isDefault": true },
            { "mimeId": 675, "extension": "joda", "isDefault": true },
            { "mimeId": 677, "extension": "ktr", "isDefault": true },
            { "mimeId": 677, "extension": "ktz", "isDefault": true },
            { "mimeId": 678, "extension": "karbon", "isDefault": true },
            { "mimeId": 679, "extension": "chrt", "isDefault": true },
            { "mimeId": 680, "extension": "kfo", "isDefault": true },
            { "mimeId": 681, "extension": "flw", "isDefault": true },
            { "mimeId": 682, "extension": "kon", "isDefault": true },
            { "mimeId": 683, "extension": "kpr", "isDefault": true },
            { "mimeId": 683, "extension": "kpt", "isDefault": true },
            { "mimeId": 684, "extension": "ksp", "isDefault": true },
            { "mimeId": 685, "extension": "kwd", "isDefault": true },
            { "mimeId": 685, "extension": "kwt", "isDefault": true },
            { "mimeId": 686, "extension": "htke", "isDefault": true },
            { "mimeId": 687, "extension": "kia", "isDefault": true },
            { "mimeId": 688, "extension": "kne", "isDefault": true },
            { "mimeId": 688, "extension": "knp", "isDefault": true },
            { "mimeId": 689, "extension": "skd", "isDefault": true },
            { "mimeId": 689, "extension": "skm", "isDefault": true },
            { "mimeId": 689, "extension": "skp", "isDefault": true },
            { "mimeId": 689, "extension": "skt", "isDefault": true },
            { "mimeId": 690, "extension": "sse", "isDefault": true },
            { "mimeId": 691, "extension": "lasxml", "isDefault": true },
            { "mimeId": 693, "extension": "lbd", "isDefault": true },
            { "mimeId": 694, "extension": "lbe", "isDefault": true },
            { "mimeId": 695, "extension": "123", "isDefault": true },
            { "mimeId": 696, "extension": "apr", "isDefault": true },
            { "mimeId": 697, "extension": "pre", "isDefault": true },
            { "mimeId": 698, "extension": "nsf", "isDefault": true },
            { "mimeId": 699, "extension": "org", "isDefault": true },
            { "mimeId": 700, "extension": "scm", "isDefault": true },
            { "mimeId": 701, "extension": "lwp", "isDefault": true },
            { "mimeId": 702, "extension": "portpkg", "isDefault": true },
            { "mimeId": 710, "extension": "mcd", "isDefault": true },
            { "mimeId": 711, "extension": "mc1", "isDefault": true },
            { "mimeId": 712, "extension": "cdkey", "isDefault": true },
            { "mimeId": 714, "extension": "mwf", "isDefault": true },
            { "mimeId": 715, "extension": "mfm", "isDefault": true },
            { "mimeId": 717, "extension": "flo", "isDefault": true },
            { "mimeId": 718, "extension": "igx", "isDefault": true },
            { "mimeId": 721, "extension": "mif", "isDefault": true },
            { "mimeId": 724, "extension": "daf", "isDefault": true },
            { "mimeId": 725, "extension": "dis", "isDefault": true },
            { "mimeId": 726, "extension": "mbk", "isDefault": true },
            { "mimeId": 727, "extension": "mqy", "isDefault": true },
            { "mimeId": 728, "extension": "msl", "isDefault": true },
            { "mimeId": 729, "extension": "plc", "isDefault": true },
            { "mimeId": 730, "extension": "txf", "isDefault": true },
            { "mimeId": 731, "extension": "mpn", "isDefault": true },
            { "mimeId": 732, "extension": "mpc", "isDefault": true },
            { "mimeId": 741, "extension": "xul", "isDefault": true },
            { "mimeId": 743, "extension": "cil", "isDefault": true },
            { "mimeId": 745, "extension": "cab", "isDefault": true },
            { "mimeId": 747, "extension": "xla", "isDefault": true },
            { "mimeId": 747, "extension": "xlc", "isDefault": true },
            { "mimeId": 747, "extension": "xlm", "isDefault": true },
            { "mimeId": 747, "extension": "xls", "isDefault": true },
            { "mimeId": 747, "extension": "xlt", "isDefault": true },
            { "mimeId": 747, "extension": "xlw", "isDefault": true },
            { "mimeId": 748, "extension": "xlam", "isDefault": true },
            { "mimeId": 749, "extension": "xlsb", "isDefault": true },
            { "mimeId": 750, "extension": "xlsm", "isDefault": true },
            { "mimeId": 751, "extension": "xltm", "isDefault": true },
            { "mimeId": 752, "extension": "eot", "isDefault": true },
            { "mimeId": 753, "extension": "chm", "isDefault": true },
            { "mimeId": 754, "extension": "ims", "isDefault": true },
            { "mimeId": 755, "extension": "lrm", "isDefault": true },
            { "mimeId": 757, "extension": "thmx", "isDefault": true },
            { "mimeId": 760, "extension": "cat", "isDefault": true },
            { "mimeId": 761, "extension": "stl", "isDefault": true },
            { "mimeId": 763, "extension": "pot", "isDefault": true },
            { "mimeId": 763, "extension": "pps", "isDefault": true },
            { "mimeId": 763, "extension": "ppt", "isDefault": true },
            { "mimeId": 764, "extension": "ppam", "isDefault": true },
            { "mimeId": 765, "extension": "pptm", "isDefault": true },
            { "mimeId": 766, "extension": "sldm", "isDefault": true },
            { "mimeId": 767, "extension": "ppsm", "isDefault": true },
            { "mimeId": 768, "extension": "potm", "isDefault": true },
            { "mimeId": 772, "extension": "mpp", "isDefault": true },
            { "mimeId": 772, "extension": "mpt", "isDefault": true },
            { "mimeId": 782, "extension": "docm", "isDefault": true },
            { "mimeId": 783, "extension": "dotm", "isDefault": true },
            { "mimeId": 784, "extension": "wcm", "isDefault": true },
            { "mimeId": 784, "extension": "wdb", "isDefault": true },
            { "mimeId": 784, "extension": "wks", "isDefault": true },
            { "mimeId": 784, "extension": "wps", "isDefault": true },
            { "mimeId": 785, "extension": "wpl", "isDefault": true },
            { "mimeId": 786, "extension": "xps", "isDefault": true },
            { "mimeId": 788, "extension": "mseq", "isDefault": true },
            { "mimeId": 793, "extension": "mus", "isDefault": true },
            { "mimeId": 794, "extension": "msty", "isDefault": true },
            { "mimeId": 795, "extension": "taglet", "isDefault": true },
            { "mimeId": 800, "extension": "nlu", "isDefault": true },
            { "mimeId": 803, "extension": "nitf", "isDefault": true },
            { "mimeId": 803, "extension": "ntf", "isDefault": true },
            { "mimeId": 804, "extension": "nnd", "isDefault": true },
            { "mimeId": 805, "extension": "nns", "isDefault": true },
            { "mimeId": 806, "extension": "nnw", "isDefault": true },
            { "mimeId": 816, "extension": "ngdat", "isDefault": true },
            { "mimeId": 817, "extension": "n-gage", "isDefault": true },
            { "mimeId": 821, "extension": "rpst", "isDefault": true },
            { "mimeId": 822, "extension": "rpss", "isDefault": true },
            { "mimeId": 823, "extension": "edm", "isDefault": true },
            { "mimeId": 824, "extension": "edx", "isDefault": true },
            { "mimeId": 825, "extension": "ext", "isDefault": true },
            { "mimeId": 831, "extension": "odc", "isDefault": true },
            { "mimeId": 832, "extension": "otc", "isDefault": true },
            { "mimeId": 833, "extension": "odb", "isDefault": true },
            { "mimeId": 834, "extension": "odf", "isDefault": true },
            { "mimeId": 835, "extension": "odft", "isDefault": true },
            { "mimeId": 836, "extension": "odg", "isDefault": true },
            { "mimeId": 837, "extension": "otg", "isDefault": true },
            { "mimeId": 838, "extension": "odi", "isDefault": true },
            { "mimeId": 839, "extension": "oti", "isDefault": true },
            { "mimeId": 840, "extension": "odp", "isDefault": true },
            { "mimeId": 841, "extension": "otp", "isDefault": true },
            { "mimeId": 842, "extension": "ods", "isDefault": true },
            { "mimeId": 843, "extension": "ots", "isDefault": true },
            { "mimeId": 844, "extension": "odt", "isDefault": true },
            { "mimeId": 845, "extension": "odm", "isDefault": true },
            { "mimeId": 846, "extension": "ott", "isDefault": true },
            { "mimeId": 847, "extension": "oth", "isDefault": true },
            { "mimeId": 861, "extension": "xo", "isDefault": true },
            { "mimeId": 885, "extension": "dd2", "isDefault": true },
            { "mimeId": 905, "extension": "oxt", "isDefault": true },
            { "mimeId": 922, "extension": "pptx", "isDefault": true },
            { "mimeId": 925, "extension": "sldx", "isDefault": true },
            { "mimeId": 929, "extension": "ppsx", "isDefault": true },
            { "mimeId": 934, "extension": "potx", "isDefault": true },
            { "mimeId": 951, "extension": "xlsx", "isDefault": true },
            { "mimeId": 957, "extension": "xltx", "isDefault": true },
            { "mimeId": 967, "extension": "docx", "isDefault": true },
            { "mimeId": 977, "extension": "dotx", "isDefault": true },
            { "mimeId": 986, "extension": "mgp", "isDefault": true },
            { "mimeId": 988, "extension": "dp", "isDefault": true },
            { "mimeId": 989, "extension": "esa", "isDefault": true },
            { "mimeId": 993, "extension": "oprc", "isDefault": true },
            { "mimeId": 993, "extension": "pdb", "isDefault": true },
            { "mimeId": 993, "extension": "pqa", "isDefault": true },
            { "mimeId": 997, "extension": "paw", "isDefault": true },
            { "mimeId": 999, "extension": "str", "isDefault": true },
            { "mimeId": 1000, "extension": "ei6", "isDefault": true },
            { "mimeId": 1002, "extension": "efif", "isDefault": true },
            { "mimeId": 1003, "extension": "wg", "isDefault": true },
            { "mimeId": 1005, "extension": "plf", "isDefault": true },
            { "mimeId": 1006, "extension": "pbd", "isDefault": true },
            { "mimeId": 1013, "extension": "box", "isDefault": true },
            { "mimeId": 1014, "extension": "mgz", "isDefault": true },
            { "mimeId": 1015, "extension": "qps", "isDefault": true },
            { "mimeId": 1016, "extension": "ptid", "isDefault": true },
            { "mimeId": 1020, "extension": "qwd", "isDefault": true },
            { "mimeId": 1020, "extension": "qwt", "isDefault": true },
            { "mimeId": 1020, "extension": "qxb", "isDefault": true },
            { "mimeId": 1020, "extension": "qxd", "isDefault": true },
            { "mimeId": 1020, "extension": "qxl", "isDefault": true },
            { "mimeId": 1020, "extension": "qxt", "isDefault": true },
            { "mimeId": 1039, "extension": "bed", "isDefault": true },
            { "mimeId": 1040, "extension": "mxl", "isDefault": true },
            { "mimeId": 1041, "extension": "musicxml", "isDefault": true },
            { "mimeId": 1043, "extension": "cryptonote", "isDefault": true },
            { "mimeId": 1044, "extension": "cod", "isDefault": true },
            { "mimeId": 1045, "extension": "rm", "isDefault": true },
            { "mimeId": 1046, "extension": "rmvb", "isDefault": true },
            { "mimeId": 1047, "extension": "link66", "isDefault": true },
            { "mimeId": 1051, "extension": "st", "isDefault": true },
            { "mimeId": 1066, "extension": "see", "isDefault": true },
            { "mimeId": 1067, "extension": "sema", "isDefault": true },
            { "mimeId": 1068, "extension": "semd", "isDefault": true },
            { "mimeId": 1069, "extension": "semf", "isDefault": true },
            { "mimeId": 1070, "extension": "ifm", "isDefault": true },
            { "mimeId": 1071, "extension": "itp", "isDefault": true },
            { "mimeId": 1072, "extension": "iif", "isDefault": true },
            { "mimeId": 1073, "extension": "ipk", "isDefault": true },
            { "mimeId": 1074, "extension": "twd", "isDefault": true },
            { "mimeId": 1074, "extension": "twds", "isDefault": true },
            { "mimeId": 1076, "extension": "mmf", "isDefault": true },
            { "mimeId": 1078, "extension": "teacher", "isDefault": true },
            { "mimeId": 1081, "extension": "sdkd", "isDefault": true },
            { "mimeId": 1081, "extension": "sdkm", "isDefault": true },
            { "mimeId": 1082, "extension": "dxp", "isDefault": true },
            { "mimeId": 1083, "extension": "sfs", "isDefault": true },
            { "mimeId": 1087, "extension": "sdc", "isDefault": true },
            { "mimeId": 1088, "extension": "sda", "isDefault": true },
            { "mimeId": 1089, "extension": "sdd", "isDefault": true },
            { "mimeId": 1090, "extension": "smf", "isDefault": true },
            { "mimeId": 1091, "extension": "sdw", "isDefault": true },
            { "mimeId": 1091, "extension": "vor", "isDefault": true },
            { "mimeId": 1092, "extension": "sgl", "isDefault": true },
            { "mimeId": 1093, "extension": "smzip", "isDefault": true },
            { "mimeId": 1094, "extension": "sm", "isDefault": true },
            { "mimeId": 1097, "extension": "sxc", "isDefault": true },
            { "mimeId": 1098, "extension": "stc", "isDefault": true },
            { "mimeId": 1099, "extension": "sxd", "isDefault": true },
            { "mimeId": 1100, "extension": "std", "isDefault": true },
            { "mimeId": 1101, "extension": "sxi", "isDefault": true },
            { "mimeId": 1102, "extension": "sti", "isDefault": true },
            { "mimeId": 1103, "extension": "sxm", "isDefault": true },
            { "mimeId": 1104, "extension": "sxw", "isDefault": true },
            { "mimeId": 1105, "extension": "sxg", "isDefault": true },
            { "mimeId": 1106, "extension": "stw", "isDefault": true },
            { "mimeId": 1107, "extension": "sus", "isDefault": true },
            { "mimeId": 1107, "extension": "susp", "isDefault": true },
            { "mimeId": 1108, "extension": "svd", "isDefault": true },
            { "mimeId": 1110, "extension": "sis", "isDefault": true },
            { "mimeId": 1110, "extension": "sisx", "isDefault": true },
            { "mimeId": 1111, "extension": "xsm", "isDefault": true },
            { "mimeId": 1112, "extension": "bdm", "isDefault": true },
            { "mimeId": 1113, "extension": "xdm", "isDefault": true },
            { "mimeId": 1120, "extension": "tao", "isDefault": true },
            { "mimeId": 1121, "extension": "cap", "isDefault": true },
            { "mimeId": 1121, "extension": "dmp", "isDefault": true },
            { "mimeId": 1121, "extension": "pcap", "isDefault": true },
            { "mimeId": 1124, "extension": "tmo", "isDefault": true },
            { "mimeId": 1125, "extension": "tpt", "isDefault": true },
            { "mimeId": 1126, "extension": "mxs", "isDefault": true },
            { "mimeId": 1127, "extension": "tra", "isDefault": true },
            { "mimeId": 1130, "extension": "ufd", "isDefault": true },
            { "mimeId": 1130, "extension": "ufdl", "isDefault": true },
            { "mimeId": 1131, "extension": "utz", "isDefault": true },
            { "mimeId": 1132, "extension": "umj", "isDefault": true },
            { "mimeId": 1133, "extension": "unityweb", "isDefault": true },
            { "mimeId": 1134, "extension": "uoml", "isDefault": true },
            { "mimeId": 1150, "extension": "vcx", "isDefault": true },
            { "mimeId": 1156, "extension": "vsd", "isDefault": true },
            { "mimeId": 1156, "extension": "vss", "isDefault": true },
            { "mimeId": 1156, "extension": "vst", "isDefault": true },
            { "mimeId": 1156, "extension": "vsw", "isDefault": true },
            { "mimeId": 1157, "extension": "vis", "isDefault": true },
            { "mimeId": 1159, "extension": "vsf", "isDefault": true },
            { "mimeId": 1162, "extension": "wbxml", "isDefault": true },
            { "mimeId": 1163, "extension": "wmlc", "isDefault": true },
            { "mimeId": 1164, "extension": "wmlsc", "isDefault": true },
            { "mimeId": 1165, "extension": "wtb", "isDefault": true },
            { "mimeId": 1173, "extension": "nbp", "isDefault": true },
            { "mimeId": 1174, "extension": "wpd", "isDefault": true },
            { "mimeId": 1175, "extension": "wqd", "isDefault": true },
            { "mimeId": 1177, "extension": "stf", "isDefault": true },
            { "mimeId": 1182, "extension": "xar", "isDefault": true },
            { "mimeId": 1183, "extension": "xfdl", "isDefault": true },
            { "mimeId": 1191, "extension": "hvd", "isDefault": true },
            { "mimeId": 1192, "extension": "hvs", "isDefault": true },
            { "mimeId": 1193, "extension": "hvp", "isDefault": true },
            { "mimeId": 1194, "extension": "osf", "isDefault": true },
            { "mimeId": 1195, "extension": "osfpvg", "isDefault": true },
            { "mimeId": 1197, "extension": "saf", "isDefault": true },
            { "mimeId": 1198, "extension": "spf", "isDefault": true },
            { "mimeId": 1202, "extension": "cmp", "isDefault": true },
            { "mimeId": 1203, "extension": "zir", "isDefault": true },
            { "mimeId": 1203, "extension": "zirz", "isDefault": true },
            { "mimeId": 1204, "extension": "zaz", "isDefault": true },
            { "mimeId": 1205, "extension": "vxml", "isDefault": true },
            { "mimeId": 1210, "extension": "wgt", "isDefault": true },
            { "mimeId": 1211, "extension": "hlp", "isDefault": true },
            { "mimeId": 1214, "extension": "wsdl", "isDefault": true },
            { "mimeId": 1215, "extension": "wspolicy", "isDefault": true },
            { "mimeId": 1216, "extension": "7z", "isDefault": true },
            { "mimeId": 1217, "extension": "abw", "isDefault": true },
            { "mimeId": 1218, "extension": "ace", "isDefault": true },
            { "mimeId": 1220, "extension": "dmg", "isDefault": true },
            { "mimeId": 1221, "extension": "aab", "isDefault": true },
            { "mimeId": 1221, "extension": "u32", "isDefault": true },
            { "mimeId": 1221, "extension": "vox", "isDefault": true },
            { "mimeId": 1221, "extension": "x32", "isDefault": true },
            { "mimeId": 1222, "extension": "aam", "isDefault": true },
            { "mimeId": 1223, "extension": "aas", "isDefault": true },
            { "mimeId": 1224, "extension": "bcpio", "isDefault": true },
            { "mimeId": 1225, "extension": "bdoc", "isDefault": false },
            { "mimeId": 1226, "extension": "torrent", "isDefault": true },
            { "mimeId": 1227, "extension": "blb", "isDefault": true },
            { "mimeId": 1227, "extension": "blorb", "isDefault": true },
            { "mimeId": 1228, "extension": "bz", "isDefault": true },
            { "mimeId": 1229, "extension": "boz", "isDefault": true },
            { "mimeId": 1229, "extension": "bz2", "isDefault": true },
            { "mimeId": 1230, "extension": "cb7", "isDefault": true },
            { "mimeId": 1230, "extension": "cba", "isDefault": true },
            { "mimeId": 1230, "extension": "cbr", "isDefault": true },
            { "mimeId": 1230, "extension": "cbt", "isDefault": true },
            { "mimeId": 1230, "extension": "cbz", "isDefault": true },
            { "mimeId": 1231, "extension": "vcd", "isDefault": true },
            { "mimeId": 1232, "extension": "cfs", "isDefault": true },
            { "mimeId": 1233, "extension": "chat", "isDefault": true },
            { "mimeId": 1234, "extension": "pgn", "isDefault": true },
            { "mimeId": 1235, "extension": "crx", "isDefault": true },
            { "mimeId": 1236, "extension": "cco", "isDefault": true },
            { "mimeId": 1238, "extension": "nsc", "isDefault": true },
            { "mimeId": 1239, "extension": "cpio", "isDefault": true },
            { "mimeId": 1240, "extension": "csh", "isDefault": true },
            { "mimeId": 1242, "extension": "deb", "isDefault": true },
            { "mimeId": 1242, "extension": "udeb", "isDefault": true },
            { "mimeId": 1243, "extension": "dgc", "isDefault": true },
            { "mimeId": 1244, "extension": "cct", "isDefault": true },
            { "mimeId": 1244, "extension": "cst", "isDefault": true },
            { "mimeId": 1244, "extension": "cxt", "isDefault": true },
            { "mimeId": 1244, "extension": "dcr", "isDefault": true },
            { "mimeId": 1244, "extension": "dir", "isDefault": true },
            { "mimeId": 1244, "extension": "dxr", "isDefault": true },
            { "mimeId": 1244, "extension": "fgd", "isDefault": true },
            { "mimeId": 1244, "extension": "swa", "isDefault": true },
            { "mimeId": 1244, "extension": "w3d", "isDefault": true },
            { "mimeId": 1245, "extension": "wad", "isDefault": true },
            { "mimeId": 1246, "extension": "ncx", "isDefault": true },
            { "mimeId": 1247, "extension": "dtb", "isDefault": true },
            { "mimeId": 1248, "extension": "res", "isDefault": true },
            { "mimeId": 1249, "extension": "dvi", "isDefault": true },
            { "mimeId": 1250, "extension": "evy", "isDefault": true },
            { "mimeId": 1251, "extension": "eva", "isDefault": true },
            { "mimeId": 1252, "extension": "bdf", "isDefault": true },
            { "mimeId": 1255, "extension": "gsf", "isDefault": true },
            { "mimeId": 1257, "extension": "psf", "isDefault": true },
            { "mimeId": 1258, "extension": "otf", "isDefault": true },
            { "mimeId": 1259, "extension": "pcf", "isDefault": true },
            { "mimeId": 1260, "extension": "snf", "isDefault": true },
            { "mimeId": 1263, "extension": "ttc", "isDefault": true },
            { "mimeId": 1263, "extension": "ttf", "isDefault": true },
            { "mimeId": 1264, "extension": "afm", "isDefault": true },
            { "mimeId": 1264, "extension": "pfa", "isDefault": true },
            { "mimeId": 1264, "extension": "pfb", "isDefault": true },
            { "mimeId": 1264, "extension": "pfm", "isDefault": true },
            { "mimeId": 1266, "extension": "arc", "isDefault": true },
            { "mimeId": 1267, "extension": "spl", "isDefault": true },
            { "mimeId": 1268, "extension": "gca", "isDefault": true },
            { "mimeId": 1269, "extension": "ulx", "isDefault": true },
            { "mimeId": 1270, "extension": "gnumeric", "isDefault": true },
            { "mimeId": 1271, "extension": "gramps", "isDefault": true },
            { "mimeId": 1272, "extension": "gtar", "isDefault": true },
            { "mimeId": 1274, "extension": "hdf", "isDefault": true },
            { "mimeId": 1275, "extension": "php", "isDefault": true },
            { "mimeId": 1276, "extension": "install", "isDefault": true },
            { "mimeId": 1277, "extension": "iso", "isDefault": true },
            { "mimeId": 1278, "extension": "jardiff", "isDefault": true },
            { "mimeId": 1279, "extension": "jnlp", "isDefault": true },
            { "mimeId": 1281, "extension": "latex", "isDefault": true },
            { "mimeId": 1282, "extension": "luac", "isDefault": true },
            { "mimeId": 1283, "extension": "lha", "isDefault": true },
            { "mimeId": 1283, "extension": "lzh", "isDefault": true },
            { "mimeId": 1284, "extension": "run", "isDefault": true },
            { "mimeId": 1285, "extension": "mie", "isDefault": true },
            { "mimeId": 1286, "extension": "mobi", "isDefault": true },
            { "mimeId": 1286, "extension": "prc", "isDefault": true },
            { "mimeId": 1288, "extension": "application", "isDefault": true },
            { "mimeId": 1289, "extension": "lnk", "isDefault": true },
            { "mimeId": 1290, "extension": "wmd", "isDefault": true },
            { "mimeId": 1291, "extension": "wmz", "isDefault": true },
            { "mimeId": 1292, "extension": "xbap", "isDefault": true },
            { "mimeId": 1293, "extension": "mdb", "isDefault": true },
            { "mimeId": 1294, "extension": "obd", "isDefault": true },
            { "mimeId": 1295, "extension": "crd", "isDefault": true },
            { "mimeId": 1296, "extension": "clp", "isDefault": true },
            { "mimeId": 1297, "extension": "exe", "isDefault": false },
            { "mimeId": 1298, "extension": "bat", "isDefault": true },
            { "mimeId": 1298, "extension": "com", "isDefault": true },
            { "mimeId": 1298, "extension": "dll", "isDefault": false },
            { "mimeId": 1298, "extension": "exe", "isDefault": false },
            { "mimeId": 1298, "extension": "msi", "isDefault": false },
            { "mimeId": 1299, "extension": "m13", "isDefault": true },
            { "mimeId": 1299, "extension": "m14", "isDefault": true },
            { "mimeId": 1299, "extension": "mvb", "isDefault": true },
            { "mimeId": 1300, "extension": "emf", "isDefault": true },
            { "mimeId": 1300, "extension": "emz", "isDefault": true },
            { "mimeId": 1300, "extension": "wmf", "isDefault": true },
            { "mimeId": 1300, "extension": "wmz", "isDefault": false },
            { "mimeId": 1301, "extension": "mny", "isDefault": true },
            { "mimeId": 1302, "extension": "pub", "isDefault": true },
            { "mimeId": 1303, "extension": "scd", "isDefault": true },
            { "mimeId": 1304, "extension": "trm", "isDefault": true },
            { "mimeId": 1305, "extension": "wri", "isDefault": true },
            { "mimeId": 1306, "extension": "cdf", "isDefault": true },
            { "mimeId": 1306, "extension": "nc", "isDefault": true },
            { "mimeId": 1307, "extension": "pac", "isDefault": true },
            { "mimeId": 1308, "extension": "nzb", "isDefault": true },
            { "mimeId": 1309, "extension": "pl", "isDefault": true },
            { "mimeId": 1309, "extension": "pm", "isDefault": true },
            { "mimeId": 1310, "extension": "pdb", "isDefault": false },
            { "mimeId": 1310, "extension": "prc", "isDefault": false },
            { "mimeId": 1311, "extension": "p12", "isDefault": true },
            { "mimeId": 1311, "extension": "pfx", "isDefault": true },
            { "mimeId": 1312, "extension": "p7b", "isDefault": true },
            { "mimeId": 1312, "extension": "spc", "isDefault": true },
            { "mimeId": 1313, "extension": "p7r", "isDefault": true },
            { "mimeId": 1314, "extension": "rar", "isDefault": true },
            { "mimeId": 1315, "extension": "rpm", "isDefault": true },
            { "mimeId": 1316, "extension": "ris", "isDefault": true },
            { "mimeId": 1317, "extension": "sea", "isDefault": true },
            { "mimeId": 1318, "extension": "sh", "isDefault": true },
            { "mimeId": 1319, "extension": "shar", "isDefault": true },
            { "mimeId": 1320, "extension": "swf", "isDefault": true },
            { "mimeId": 1321, "extension": "xap", "isDefault": true },
            { "mimeId": 1322, "extension": "sql", "isDefault": true },
            { "mimeId": 1323, "extension": "sit", "isDefault": true },
            { "mimeId": 1324, "extension": "sitx", "isDefault": true },
            { "mimeId": 1325, "extension": "srt", "isDefault": true },
            { "mimeId": 1326, "extension": "sv4cpio", "isDefault": true },
            { "mimeId": 1327, "extension": "sv4crc", "isDefault": true },
            { "mimeId": 1328, "extension": "t3", "isDefault": true },
            { "mimeId": 1329, "extension": "gam", "isDefault": true },
            { "mimeId": 1330, "extension": "tar", "isDefault": true },
            { "mimeId": 1331, "extension": "tcl", "isDefault": true },
            { "mimeId": 1331, "extension": "tk", "isDefault": true },
            { "mimeId": 1332, "extension": "tex", "isDefault": true },
            { "mimeId": 1333, "extension": "tfm", "isDefault": true },
            { "mimeId": 1334, "extension": "texi", "isDefault": true },
            { "mimeId": 1334, "extension": "texinfo", "isDefault": true },
            { "mimeId": 1335, "extension": "obj", "isDefault": true },
            { "mimeId": 1336, "extension": "ustar", "isDefault": true },
            { "mimeId": 1337, "extension": "src", "isDefault": true },
            { "mimeId": 1338, "extension": "webapp", "isDefault": true },
            { "mimeId": 1340, "extension": "crt", "isDefault": true },
            { "mimeId": 1340, "extension": "der", "isDefault": true },
            { "mimeId": 1340, "extension": "pem", "isDefault": true },
            { "mimeId": 1341, "extension": "fig", "isDefault": true },
            { "mimeId": 1342, "extension": "xlf", "isDefault": true },
            { "mimeId": 1343, "extension": "xpi", "isDefault": true },
            { "mimeId": 1344, "extension": "xz", "isDefault": true },
            { "mimeId": 1345, "extension": "z1", "isDefault": true },
            { "mimeId": 1345, "extension": "z2", "isDefault": true },
            { "mimeId": 1345, "extension": "z3", "isDefault": true },
            { "mimeId": 1345, "extension": "z4", "isDefault": true },
            { "mimeId": 1345, "extension": "z5", "isDefault": true },
            { "mimeId": 1345, "extension": "z6", "isDefault": true },
            { "mimeId": 1345, "extension": "z7", "isDefault": true },
            { "mimeId": 1345, "extension": "z8", "isDefault": true },
            { "mimeId": 1348, "extension": "xaml", "isDefault": true },
            { "mimeId": 1351, "extension": "xdf", "isDefault": true },
            { "mimeId": 1357, "extension": "xenc", "isDefault": true },
            { "mimeId": 1358, "extension": "xht", "isDefault": true },
            { "mimeId": 1358, "extension": "xhtml", "isDefault": true },
            { "mimeId": 1360, "extension": "rng", "isDefault": true },
            { "mimeId": 1360, "extension": "xml", "isDefault": true },
            { "mimeId": 1360, "extension": "xsd", "isDefault": true },
            { "mimeId": 1360, "extension": "xsl", "isDefault": true },
            { "mimeId": 1361, "extension": "dtd", "isDefault": true },
            { "mimeId": 1365, "extension": "xop", "isDefault": true },
            { "mimeId": 1366, "extension": "xpl", "isDefault": true },
            { "mimeId": 1367, "extension": "xslt", "isDefault": true },
            { "mimeId": 1368, "extension": "xspf", "isDefault": true },
            { "mimeId": 1369, "extension": "mxml", "isDefault": true },
            { "mimeId": 1369, "extension": "xhvml", "isDefault": true },
            { "mimeId": 1369, "extension": "xvm", "isDefault": true },
            { "mimeId": 1369, "extension": "xvml", "isDefault": true },
            { "mimeId": 1370, "extension": "yang", "isDefault": true },
            { "mimeId": 1371, "extension": "yin", "isDefault": true },
            { "mimeId": 1372, "extension": "zip", "isDefault": true },
            { "mimeId": 1376, "extension": "3gpp", "isDefault": false },
            { "mimeId": 1379, "extension": "adp", "isDefault": true },
            { "mimeId": 1388, "extension": "au", "isDefault": true },
            { "mimeId": 1388, "extension": "snd", "isDefault": true },
            { "mimeId": 1443, "extension": "kar", "isDefault": true },
            { "mimeId": 1443, "extension": "mid", "isDefault": true },
            { "mimeId": 1443, "extension": "midi", "isDefault": true },
            { "mimeId": 1443, "extension": "rmi", "isDefault": true },
            { "mimeId": 1445, "extension": "m4a", "isDefault": false },
            { "mimeId": 1445, "extension": "mp4a", "isDefault": true },
            { "mimeId": 1449, "extension": "m2a", "isDefault": true },
            { "mimeId": 1449, "extension": "m3a", "isDefault": true },
            { "mimeId": 1449, "extension": "mp2", "isDefault": true },
            { "mimeId": 1449, "extension": "mp2a", "isDefault": true },
            { "mimeId": 1449, "extension": "mp3", "isDefault": true },
            { "mimeId": 1449, "extension": "mpga", "isDefault": true },
            { "mimeId": 1452, "extension": "oga", "isDefault": true },
            { "mimeId": 1452, "extension": "ogg", "isDefault": true },
            { "mimeId": 1452, "extension": "spx", "isDefault": true },
            { "mimeId": 1467, "extension": "s3m", "isDefault": true },
            { "mimeId": 1468, "extension": "sil", "isDefault": true },
            { "mimeId": 1490, "extension": "uva", "isDefault": true },
            { "mimeId": 1490, "extension": "uvva", "isDefault": true },
            { "mimeId": 1491, "extension": "eol", "isDefault": true },
            { "mimeId": 1501, "extension": "dra", "isDefault": true },
            { "mimeId": 1502, "extension": "dts", "isDefault": true },
            { "mimeId": 1503, "extension": "dtshd", "isDefault": true },
            { "mimeId": 1507, "extension": "lvp", "isDefault": true },
            { "mimeId": 1508, "extension": "pya", "isDefault": true },
            { "mimeId": 1511, "extension": "ecelp4800", "isDefault": true },
            { "mimeId": 1512, "extension": "ecelp7470", "isDefault": true },
            { "mimeId": 1513, "extension": "ecelp9600", "isDefault": true },
            { "mimeId": 1517, "extension": "rip", "isDefault": true },
            { "mimeId": 1524, "extension": "wav", "isDefault": false },
            { "mimeId": 1525, "extension": "wav", "isDefault": true },
            { "mimeId": 1526, "extension": "weba", "isDefault": true },
            { "mimeId": 1527, "extension": "aac", "isDefault": true },
            { "mimeId": 1528, "extension": "aif", "isDefault": true },
            { "mimeId": 1528, "extension": "aifc", "isDefault": true },
            { "mimeId": 1528, "extension": "aiff", "isDefault": true },
            { "mimeId": 1529, "extension": "caf", "isDefault": true },
            { "mimeId": 1530, "extension": "flac", "isDefault": true },
            { "mimeId": 1531, "extension": "m4a", "isDefault": true },
            { "mimeId": 1532, "extension": "mka", "isDefault": true },
            { "mimeId": 1533, "extension": "m3u", "isDefault": true },
            { "mimeId": 1534, "extension": "wax", "isDefault": true },
            { "mimeId": 1535, "extension": "wma", "isDefault": true },
            { "mimeId": 1536, "extension": "ra", "isDefault": false },
            { "mimeId": 1536, "extension": "ram", "isDefault": true },
            { "mimeId": 1537, "extension": "rmp", "isDefault": true },
            { "mimeId": 1538, "extension": "ra", "isDefault": true },
            { "mimeId": 1540, "extension": "wav", "isDefault": false },
            { "mimeId": 1541, "extension": "xm", "isDefault": true },
            { "mimeId": 1542, "extension": "cdx", "isDefault": true },
            { "mimeId": 1543, "extension": "cif", "isDefault": true },
            { "mimeId": 1544, "extension": "cmdf", "isDefault": true },
            { "mimeId": 1545, "extension": "cml", "isDefault": true },
            { "mimeId": 1546, "extension": "csml", "isDefault": true },
            { "mimeId": 1548, "extension": "xyz", "isDefault": true },
            { "mimeId": 1549, "extension": "otf", "isDefault": false },
            { "mimeId": 1550, "extension": "bmp", "isDefault": true },
            { "mimeId": 1551, "extension": "cgm", "isDefault": true },
            { "mimeId": 1553, "extension": "g3", "isDefault": true },
            { "mimeId": 1554, "extension": "gif", "isDefault": true },
            { "mimeId": 1555, "extension": "ief", "isDefault": true },
            { "mimeId": 1557, "extension": "jpe", "isDefault": true },
            { "mimeId": 1557, "extension": "jpeg", "isDefault": true },
            { "mimeId": 1557, "extension": "jpg", "isDefault": true },
            { "mimeId": 1560, "extension": "ktx", "isDefault": true },
            { "mimeId": 1563, "extension": "png", "isDefault": true },
            { "mimeId": 1564, "extension": "btif", "isDefault": true },
            { "mimeId": 1567, "extension": "sgi", "isDefault": true },
            { "mimeId": 1568, "extension": "svg", "isDefault": true },
            { "mimeId": 1568, "extension": "svgz", "isDefault": true },
            { "mimeId": 1570, "extension": "tif", "isDefault": true },
            { "mimeId": 1570, "extension": "tiff", "isDefault": true },
            { "mimeId": 1572, "extension": "psd", "isDefault": true },
            { "mimeId": 1575, "extension": "uvg", "isDefault": true },
            { "mimeId": 1575, "extension": "uvi", "isDefault": true },
            { "mimeId": 1575, "extension": "uvvg", "isDefault": true },
            { "mimeId": 1575, "extension": "uvvi", "isDefault": true },
            { "mimeId": 1576, "extension": "djv", "isDefault": true },
            { "mimeId": 1576, "extension": "djvu", "isDefault": true },
            { "mimeId": 1577, "extension": "sub", "isDefault": false },
            { "mimeId": 1578, "extension": "dwg", "isDefault": true },
            { "mimeId": 1579, "extension": "dxf", "isDefault": true },
            { "mimeId": 1580, "extension": "fbs", "isDefault": true },
            { "mimeId": 1581, "extension": "fpx", "isDefault": true },
            { "mimeId": 1582, "extension": "fst", "isDefault": true },
            { "mimeId": 1583, "extension": "mmr", "isDefault": true },
            { "mimeId": 1584, "extension": "rlc", "isDefault": true },
            { "mimeId": 1589, "extension": "mdi", "isDefault": true },
            { "mimeId": 1590, "extension": "wdp", "isDefault": true },
            { "mimeId": 1591, "extension": "npx", "isDefault": true },
            { "mimeId": 1599, "extension": "wbmp", "isDefault": true },
            { "mimeId": 1600, "extension": "xif", "isDefault": true },
            { "mimeId": 1602, "extension": "webp", "isDefault": true },
            { "mimeId": 1603, "extension": "3ds", "isDefault": true },
            { "mimeId": 1604, "extension": "ras", "isDefault": true },
            { "mimeId": 1605, "extension": "cmx", "isDefault": true },
            { "mimeId": 1606, "extension": "fh", "isDefault": true },
            { "mimeId": 1606, "extension": "fh4", "isDefault": true },
            { "mimeId": 1606, "extension": "fh5", "isDefault": true },
            { "mimeId": 1606, "extension": "fh7", "isDefault": true },
            { "mimeId": 1606, "extension": "fhc", "isDefault": true },
            { "mimeId": 1607, "extension": "ico", "isDefault": true },
            { "mimeId": 1608, "extension": "jng", "isDefault": true },
            { "mimeId": 1609, "extension": "sid", "isDefault": true },
            { "mimeId": 1610, "extension": "bmp", "isDefault": false },
            { "mimeId": 1611, "extension": "pcx", "isDefault": true },
            { "mimeId": 1612, "extension": "pct", "isDefault": true },
            { "mimeId": 1612, "extension": "pic", "isDefault": true },
            { "mimeId": 1613, "extension": "pnm", "isDefault": true },
            { "mimeId": 1614, "extension": "pbm", "isDefault": true },
            { "mimeId": 1615, "extension": "pgm", "isDefault": true },
            { "mimeId": 1616, "extension": "ppm", "isDefault": true },
            { "mimeId": 1617, "extension": "rgb", "isDefault": true },
            { "mimeId": 1618, "extension": "tga", "isDefault": true },
            { "mimeId": 1619, "extension": "xbm", "isDefault": true },
            { "mimeId": 1621, "extension": "xpm", "isDefault": true },
            { "mimeId": 1622, "extension": "xwd", "isDefault": true },
            { "mimeId": 1636, "extension": "eml", "isDefault": true },
            { "mimeId": 1636, "extension": "mime", "isDefault": true },
            { "mimeId": 1643, "extension": "iges", "isDefault": true },
            { "mimeId": 1643, "extension": "igs", "isDefault": true },
            { "mimeId": 1644, "extension": "mesh", "isDefault": true },
            { "mimeId": 1644, "extension": "msh", "isDefault": true },
            { "mimeId": 1644, "extension": "silo", "isDefault": true },
            { "mimeId": 1645, "extension": "dae", "isDefault": true },
            { "mimeId": 1646, "extension": "dwf", "isDefault": true },
            { "mimeId": 1648, "extension": "gdl", "isDefault": true },
            { "mimeId": 1651, "extension": "gtw", "isDefault": true },
            { "mimeId": 1653, "extension": "mts", "isDefault": true },
            { "mimeId": 1659, "extension": "vtu", "isDefault": true },
            { "mimeId": 1660, "extension": "vrml", "isDefault": true },
            { "mimeId": 1660, "extension": "wrl", "isDefault": true },
            { "mimeId": 1661, "extension": "x3db", "isDefault": true },
            { "mimeId": 1661, "extension": "x3dbz", "isDefault": true },
            { "mimeId": 1663, "extension": "x3dv", "isDefault": true },
            { "mimeId": 1663, "extension": "x3dvz", "isDefault": true },
            { "mimeId": 1664, "extension": "x3d", "isDefault": true },
            { "mimeId": 1664, "extension": "x3dz", "isDefault": true },
            { "mimeId": 1681, "extension": "appcache", "isDefault": true },
            { "mimeId": 1681, "extension": "manifest", "isDefault": true },
            { "mimeId": 1682, "extension": "ics", "isDefault": true },
            { "mimeId": 1682, "extension": "ifb", "isDefault": true },
            { "mimeId": 1685, "extension": "coffee", "isDefault": true },
            { "mimeId": 1685, "extension": "litcoffee", "isDefault": true },
            { "mimeId": 1686, "extension": "css", "isDefault": true },
            { "mimeId": 1687, "extension": "csv", "isDefault": true },
            { "mimeId": 1696, "extension": "hjson", "isDefault": true },
            { "mimeId": 1697, "extension": "htm", "isDefault": true },
            { "mimeId": 1697, "extension": "html", "isDefault": true },
            { "mimeId": 1697, "extension": "shtml", "isDefault": true },
            { "mimeId": 1698, "extension": "jade", "isDefault": true },
            { "mimeId": 1701, "extension": "jsx", "isDefault": true },
            { "mimeId": 1702, "extension": "less", "isDefault": true },
            { "mimeId": 1704, "extension": "mml", "isDefault": true },
            { "mimeId": 1706, "extension": "n3", "isDefault": true },
            { "mimeId": 1709, "extension": "conf", "isDefault": true },
            { "mimeId": 1709, "extension": "def", "isDefault": true },
            { "mimeId": 1709, "extension": "in", "isDefault": true },
            { "mimeId": 1709, "extension": "ini", "isDefault": true },
            { "mimeId": 1709, "extension": "list", "isDefault": true },
            { "mimeId": 1709, "extension": "log", "isDefault": true },
            { "mimeId": 1709, "extension": "text", "isDefault": true },
            { "mimeId": 1709, "extension": "txt", "isDefault": true },
            { "mimeId": 1712, "extension": "dsc", "isDefault": true },
            { "mimeId": 1717, "extension": "rtx", "isDefault": true },
            { "mimeId": 1718, "extension": "rtf", "isDefault": false },
            { "mimeId": 1722, "extension": "sgm", "isDefault": true },
            { "mimeId": 1722, "extension": "sgml", "isDefault": true },
            { "mimeId": 1723, "extension": "slim", "isDefault": true },
            { "mimeId": 1723, "extension": "slm", "isDefault": true },
            { "mimeId": 1724, "extension": "styl", "isDefault": true },
            { "mimeId": 1724, "extension": "stylus", "isDefault": true },
            { "mimeId": 1726, "extension": "tsv", "isDefault": true },
            { "mimeId": 1727, "extension": "man", "isDefault": true },
            { "mimeId": 1727, "extension": "me", "isDefault": true },
            { "mimeId": 1727, "extension": "ms", "isDefault": true },
            { "mimeId": 1727, "extension": "roff", "isDefault": true },
            { "mimeId": 1727, "extension": "t", "isDefault": true },
            { "mimeId": 1727, "extension": "tr", "isDefault": true },
            { "mimeId": 1728, "extension": "ttl", "isDefault": true },
            { "mimeId": 1730, "extension": "uri", "isDefault": true },
            { "mimeId": 1730, "extension": "uris", "isDefault": true },
            { "mimeId": 1730, "extension": "urls", "isDefault": true },
            { "mimeId": 1731, "extension": "vcard", "isDefault": true },
            { "mimeId": 1734, "extension": "curl", "isDefault": true },
            { "mimeId": 1735, "extension": "dcurl", "isDefault": true },
            { "mimeId": 1736, "extension": "mcurl", "isDefault": true },
            { "mimeId": 1737, "extension": "scurl", "isDefault": true },
            { "mimeId": 1740, "extension": "sub", "isDefault": true },
            { "mimeId": 1742, "extension": "fly", "isDefault": true },
            { "mimeId": 1743, "extension": "flx", "isDefault": true },
            { "mimeId": 1744, "extension": "gv", "isDefault": true },
            { "mimeId": 1745, "extension": "3dml", "isDefault": true },
            { "mimeId": 1746, "extension": "spot", "isDefault": true },
            { "mimeId": 1755, "extension": "jad", "isDefault": true },
            { "mimeId": 1759, "extension": "wml", "isDefault": true },
            { "mimeId": 1760, "extension": "wmls", "isDefault": true },
            { "mimeId": 1761, "extension": "vtt", "isDefault": true },
            { "mimeId": 1762, "extension": "asm", "isDefault": true },
            { "mimeId": 1762, "extension": "s", "isDefault": true },
            { "mimeId": 1763, "extension": "c", "isDefault": true },
            { "mimeId": 1763, "extension": "cc", "isDefault": true },
            { "mimeId": 1763, "extension": "cpp", "isDefault": true },
            { "mimeId": 1763, "extension": "cxx", "isDefault": true },
            { "mimeId": 1763, "extension": "dic", "isDefault": true },
            { "mimeId": 1763, "extension": "h", "isDefault": true },
            { "mimeId": 1763, "extension": "hh", "isDefault": true },
            { "mimeId": 1764, "extension": "htc", "isDefault": true },
            { "mimeId": 1765, "extension": "f", "isDefault": true },
            { "mimeId": 1765, "extension": "f77", "isDefault": true },
            { "mimeId": 1765, "extension": "f90", "isDefault": true },
            { "mimeId": 1765, "extension": "for", "isDefault": true },
            { "mimeId": 1767, "extension": "hbs", "isDefault": true },
            { "mimeId": 1768, "extension": "java", "isDefault": true },
            { "mimeId": 1770, "extension": "lua", "isDefault": true },
            { "mimeId": 1771, "extension": "markdown", "isDefault": true },
            { "mimeId": 1771, "extension": "md", "isDefault": true },
            { "mimeId": 1771, "extension": "mkd", "isDefault": true },
            { "mimeId": 1772, "extension": "nfo", "isDefault": true },
            { "mimeId": 1773, "extension": "opml", "isDefault": true },
            { "mimeId": 1774, "extension": "p", "isDefault": true },
            { "mimeId": 1774, "extension": "pas", "isDefault": true },
            { "mimeId": 1775, "extension": "pde", "isDefault": true },
            { "mimeId": 1776, "extension": "sass", "isDefault": true },
            { "mimeId": 1777, "extension": "scss", "isDefault": true },
            { "mimeId": 1778, "extension": "etx", "isDefault": true },
            { "mimeId": 1779, "extension": "sfv", "isDefault": true },
            { "mimeId": 1780, "extension": "ymp", "isDefault": true },
            { "mimeId": 1781, "extension": "uu", "isDefault": true },
            { "mimeId": 1782, "extension": "vcs", "isDefault": true },
            { "mimeId": 1783, "extension": "vcf", "isDefault": true },
            { "mimeId": 1784, "extension": "xml", "isDefault": false },
            { "mimeId": 1786, "extension": "yaml", "isDefault": true },
            { "mimeId": 1786, "extension": "yml", "isDefault": true },
            { "mimeId": 1788, "extension": "3gp", "isDefault": true },
            { "mimeId": 1788, "extension": "3gpp", "isDefault": true },
            { "mimeId": 1790, "extension": "3g2", "isDefault": true },
            { "mimeId": 1796, "extension": "h261", "isDefault": true },
            { "mimeId": 1797, "extension": "h263", "isDefault": true },
            { "mimeId": 1800, "extension": "h264", "isDefault": true },
            { "mimeId": 1805, "extension": "jpgv", "isDefault": true },
            { "mimeId": 1807, "extension": "jpgm", "isDefault": true },
            { "mimeId": 1807, "extension": "jpm", "isDefault": true },
            { "mimeId": 1808, "extension": "mj2", "isDefault": true },
            { "mimeId": 1808, "extension": "mjp2", "isDefault": true },
            { "mimeId": 1811, "extension": "ts", "isDefault": true },
            { "mimeId": 1812, "extension": "mp4", "isDefault": true },
            { "mimeId": 1812, "extension": "mp4v", "isDefault": true },
            { "mimeId": 1812, "extension": "mpg4", "isDefault": true },
            { "mimeId": 1814, "extension": "m1v", "isDefault": true },
            { "mimeId": 1814, "extension": "m2v", "isDefault": true },
            { "mimeId": 1814, "extension": "mpe", "isDefault": true },
            { "mimeId": 1814, "extension": "mpeg", "isDefault": true },
            { "mimeId": 1814, "extension": "mpg", "isDefault": true },
            { "mimeId": 1818, "extension": "ogv", "isDefault": true },
            { "mimeId": 1821, "extension": "mov", "isDefault": true },
            { "mimeId": 1821, "extension": "qt", "isDefault": true },
            { "mimeId": 1831, "extension": "uvh", "isDefault": true },
            { "mimeId": 1831, "extension": "uvvh", "isDefault": true },
            { "mimeId": 1832, "extension": "uvm", "isDefault": true },
            { "mimeId": 1832, "extension": "uvvm", "isDefault": true },
            { "mimeId": 1834, "extension": "uvp", "isDefault": true },
            { "mimeId": 1834, "extension": "uvvp", "isDefault": true },
            { "mimeId": 1835, "extension": "uvs", "isDefault": true },
            { "mimeId": 1835, "extension": "uvvs", "isDefault": true },
            { "mimeId": 1836, "extension": "uvv", "isDefault": true },
            { "mimeId": 1836, "extension": "uvvv", "isDefault": true },
            { "mimeId": 1840, "extension": "dvb", "isDefault": true },
            { "mimeId": 1841, "extension": "fvt", "isDefault": true },
            { "mimeId": 1851, "extension": "m4u", "isDefault": true },
            { "mimeId": 1851, "extension": "mxu", "isDefault": true },
            { "mimeId": 1852, "extension": "pyv", "isDefault": true },
            { "mimeId": 1862, "extension": "uvu", "isDefault": true },
            { "mimeId": 1862, "extension": "uvvu", "isDefault": true },
            { "mimeId": 1863, "extension": "viv", "isDefault": true },
            { "mimeId": 1865, "extension": "webm", "isDefault": true },
            { "mimeId": 1866, "extension": "f4v", "isDefault": true },
            { "mimeId": 1867, "extension": "fli", "isDefault": true },
            { "mimeId": 1868, "extension": "flv", "isDefault": true },
            { "mimeId": 1869, "extension": "m4v", "isDefault": true },
            { "mimeId": 1870, "extension": "mk3d", "isDefault": true },
            { "mimeId": 1870, "extension": "mks", "isDefault": true },
            { "mimeId": 1870, "extension": "mkv", "isDefault": true },
            { "mimeId": 1871, "extension": "mng", "isDefault": true },
            { "mimeId": 1872, "extension": "asf", "isDefault": true },
            { "mimeId": 1872, "extension": "asx", "isDefault": true },
            { "mimeId": 1873, "extension": "vob", "isDefault": true },
            { "mimeId": 1874, "extension": "wm", "isDefault": true },
            { "mimeId": 1875, "extension": "wmv", "isDefault": true },
            { "mimeId": 1876, "extension": "wmx", "isDefault": true },
            { "mimeId": 1877, "extension": "wvx", "isDefault": true },
            { "mimeId": 1878, "extension": "avi", "isDefault": true },
            { "mimeId": 1879, "extension": "movie", "isDefault": true },
            { "mimeId": 1880, "extension": "smv", "isDefault": true },
            { "mimeId": 1881, "extension": "ice", "isDefault": true },
            { "mimeId": 1696, "extension": "json", "isDefault": false }
        ];
    }

	if (!w.Locust.Mime) {
        w.Locust.Mime = {
			get MimeTypes() {
				if (!__mimes) {
					_initMimes();
					_initMimeTypes();
				}
				
				return __mimeTypes;
			},
			get Mimes() {
				if (!__mimes) {
					_initMimes();
					_initMimeTypes();
				}
				
				return __mimes;
			},
			getExtension: function(filenameOrExtension) {
				var result = "";
				var dotIndex = (filenameOrExtension || "").lastIndexOf('.');
				
				if (dotIndex >= 0) {
					result = (filenameOrExtension.substr(dotIndex + 1) || "").toLowerCase();
				}
				
				return result;
			},
			getFullMime: function(filenameOrExtension) {
				if (!__mimes) {
					_initMimes();
					_initMimeTypes();
				}

				var result = __mimes[208];
				var ext = w.Locust.Mime.getExtension(filenameOrExtension);

				if (ext) {
					var mimeType = __mimeTypes.find(function (mt) { return mt.extension == ext && mt.isDefault });
					if (mimeType) {
						result = __mimes[mimeType.mimeId - 1];
					}
				}

				return result;
			},
			getMimeType: function (filenameOrExtension) {
				if (!__mimes) {
					_initMimes();
					_initMimeTypes();
				}

				var result = "application/octet-stream";
				var ext = w.Locust.Mime.getExtension(filenameOrExtension);

				if (ext) {
					var mimeType = __mimeTypes.find(function (mt) { return mt.extension == ext && mt.isDefault });
					if (mimeType) {
						result = __mimes[mimeType.mimeId - 1].value;
					}
				}

				return result;
			}
		};
    }
})(__locustMainContext);

//================================= Locust.IO =================================
(function (w) {
    function __error(msg) {
		if (w.console && w.console.error) {
			w.console.error(msg);
		} else {
			throw msg;
		}
	};
	if (!w) {
        throw "Locust.IO: no context given (use 'Locust.Base.js')";
    }
    if (!w.Locust) {
		__error("Locust.IO: Locust namespace not found (use 'Locust.Base.js')");
		return;
    }
	if (!w.Locust.Mime) {
		__error("Locust.IO: Locust.Mime namespace not found (use 'Locust.Base.js')");
		return;
    }
	if (!w.Locust.Logging) {
		__error("Locust.IO: Locust.Logging namespace not found (use 'Locust.Logging.js')");
		return;
	}
    if (!w.Locust.IO) {
        w.Locust.IO = {};
    }
    w.Locust.IO.File = function (filename, logger) {
        var _self = this;
        var _name = "Locust.IO.File";
        var _nameAndExtension;
        var _nameWithoutExtension;
        var _path;
        var _extension;
        var _mime;
        var _config = {
            filename: filename,
            logger: logger
        };

        _config.logger = w.Locust.getLogger(_config.logger);

        _self.getName = function () {
            var result = "";

            if (!_nameAndExtension) {
                if (_config.filename) {
                    var i = _config.filename.lastIndexOf('/');
                    if (i == -1) {
                        i = _config.filename.lastIndexOf('\\');
                    }
                    _nameAndExtension = i >= 0 ? _config.filename.substr(i + 1) : "";
                }
            }

            result = _nameAndExtension;

            return result;
        }
        _self.getNameWithoutExtension = function () {
            var result = "";

            if (!_nameWithoutExtension) {
                var nameAndExtension = _self.getName();

                if (nameAndExtension) {
                    var i = nameAndExtension.indexOf('.');
                    if (i == -1)
                        i = nameAndExtension.length;
                    _nameWithoutExtension = nameAndExtension.substr(0, i);
                }
            }

            result = _nameWithoutExtension;

            return result;
        }
        _self.getExtension = function () {
            var result = "";

            if (!_extension) {
                if (_config.filename) {
                    var i = _config.filename.lastIndexOf('.');
                    _extension = i >= 0 ? _config.filename.substr(i + 1) : "";
                }
            }
            
            result = _extension;

            return result;
        }
        _self.getPath = function () {
            var result = "";

            if (!_path) {
                if (_config.filename) {
                    var i = _config.filename.lastIndexOf('/');
                    if (i == -1) {
                        i = _config.filename.lastIndexOf('\\');
                    }
                    _path = i >= 0 ? _config.filename.substr(0, i) : "";
                }
            }

            result = _path;

            return result;
        }
        _self.getMime = function () {
            var result = "";
            
            if (!_mime) {
                var ext = _self.getExtension();
                if (ext) {
                    _mime = w.Locust.Mime.getMimeType(ext);
                }
            }

            result = _mime;

            return result;
        }

        _self.Name = _self.getName();
        _self.Extension = _self.getExtension();
        _self.Mime = _self.getMime();
        _self.Path = _self.getPath();
        _self.NameWithoutExtension = _self.getNameWithoutExtension();

        _self.Info = function () {
            return {
                Name : _self.getName(),
                Extension : _self.getExtension(),
                Mime : _self.getMime(),
                Path : _self.getPath(),
                NameWithoutExtension : _self.getNameWithoutExtension()
            }
        }
    }
})(__locustMainContext);

//================================= Locust.jQuery.Extend =================================
(function (w) {
    function __error(msg) {
		if (w.console && w.console.error) {
			w.console.error(msg);
		} else {
			throw msg;
		}
	};
	if (!w) {
        throw "Locust.jQuery.Extend: no context given (use 'Locust.Base.js')";
    }
    if (!w.Locust) {
		__error("Locust.jQuery.Extend: Locust namespace not found (use 'Locust.Base.js')");
		return;
    }
    if (!w.jQuery) {
        __error("Locust.jQuery.Extend: jQuery library not found");
        return;
    }
    (function ($) {
        $.fn.disableSelection = function () {
            return this
                     .attr('unselectable', 'on')
                     .css('user-select', 'none')
                     .on('selectstart', false);
        };
        $.fn.visible = function () {
            return this.css('visibility', 'visible');
        };

        $.fn.invisible = function () {
            return this.css('visibility', 'hidden');
        };
        $.fn.swapClass = function (class1, class2, fnSwap) {
            var _this = $(this);
            if (_this.hasClass(class1)) {
                _this.removeClass(class1);
                _this.addClass(class2);
                if ($.isFunction(fnSwap)) {
                    fnSwap(true);
                }
            } else {
                _this.removeClass(class2);
                _this.addClass(class1);
                if ($.isFunction(fnSwap)) {
                    fnSwap(false);
                }
            }
        }
        $.fn.visibilityToggle = function () {
            return this.css('visibility', function (i, visibility) {
                return (visibility == 'visible') ? 'hidden' : 'visible';
            });
        };
        $.fn.getPostData = function () {
            var result;
            var data = $(this).data();
            result = data['post'];
            if ($.isPlainObject(result))
                return result;
            result = {};
            $.each(data, function (propName, propValue) {
                if (propName.length > 4 && propName.substring(0, 4) == "post") {
                    result[propName.substring(4)] = propValue;
                }
            });
            return result;
        };
        $.fn.post = function () {
            var element = $(this);
            if (element.length == 1) {
                if (element[0].tagName.toLowerCase() == "a") {
                    var url = element.attr("href");
                    var postData = element.getPostData();
                    if (!url) {
                        url = postData.url;
                        delete postData["url"];
                    }
                    if (url) {
                        Locust.Form.post(url, postData);
                    }
                }
            }
        };
        $.fn.loadPost = function (url, data, success, dataType) {
            var element = $(this);
            var _config = { url: url };

            if (success && !$.isFunction(success)) {
                _config.data = success;
            } else {
                if (data && !$.isFunction(data)) {
                    _config.data = data;
                }
            }
            if (dataType) {
                _config.dataType = dataType;
            }

            $.post(_config).done(function (result) {
                element.html(result);

                if (data && $.isFunction(data)) {
                    _config.success = data;
                } else {
                    if (success && $.isFunction(success)) {
                        _config.success = success;
                    }
                }

                if (_config.success) {
                    _config.success(result);
                }
            });
        }
    })(w.jQuery);
})(__locustMainContext);

//================================= Locust.jQuery.Validation.Extend =================================
(function (w) {
    function __error(msg) {
		if (w.console && w.console.error) {
			w.console.error(msg);
		} else {
			throw msg;
		}
	};
	if (!w) {
        throw "Locust.jQuery.Validation.Unobtrusive.Extend: no context given (use 'Locust.Base.js')";
    }
    if (!w.Locust) {
		__error("Locust.jQuery.Validation.Unobtrusive.Extend: Locust namespace not found (use 'Locust.Base.js')");
		return;
    }
	if (!w.Locust.Logging) {
		__error("Locust.jQuery.Validation.Unobtrusive.Extend: Locust.Logging namespace not found (use 'Locust.Logging.js')");
		return;
	}
    if (!w.jQuery) {
        __error("Locust.jQuery.Validation.Unobtrusive.Extend: jQuery library not found");
        return;
    };
    (function ($) {
		var _logger = w.Locust.getLogger();
		
		// source: http://jasonwatmore.com/post/2013/10/16/aspnet-mvc-required-checkbox-with-data-annotations
		$(function () {
			if ($.validator && $.validator.methods) {
				var defaultRangeValidator = $.validator.methods.range;
				$.validator.methods.range = function (value, element, param) {
					if (element.type === 'checkbox') {
						// if it's a checkbox return true if it is checked
						return element.checked;
					} else {
						// otherwise run the default validation function
						return defaultRangeValidator.call(this, value, element, param);
					}
				}
			} else {
				_logger.fail("Locust.jQuery.Validation.Unobtrusive.Extend: jQuery-validation not found.");
			}
		});
    })(w.jQuery);
})(__locustMainContext);

//================================= Locust.Language =================================
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

//================================= Locust.Storage =================================
(function (w) {
	function __error(msg) {
		if (w.console && w.console.error) {
			w.console.error(msg);
		} else {
			throw msg;
		}
	}
	if (!w) {
        throw "Locust.Storage: no context given (use 'Locust.Base.js')";
    }
    if (!w.Locust) {
		__error("Locust.Storage: Locust namespace not found (use 'Locust.Base.js')");
		return;
    }
	if (!w.Locust.Logging) {
		__error("Locust.Storage: Locust.Logging namespace not found (use 'Locust.Logging.js')");
		return;
	}
	if (!w.jQuery) {
        console.log("Locust.Storage: jQuery library not found");
        return;
    }
    if (!w.Locust.Storage) {
        w.Locust.Storage = {};
    }
	w.Locust.Storage.NoKeyProtector = function() {
		this.fixedLength = false;
		this.length = 0;
		this.separator = '#';
		this.encode = function(key) { return key; }
		this.decode = function (key) { return key; }
	}
	w.Locust.Storage.fixedSizeReverseStrippedIntKeyProtector = function (length){
		var _self = this;
		
		_self.fixedLength = true;
		_self.length = length;
		_self.separator = '';
		_self.encode = function(n) {
			var _length = _self.length;
            var arr = [];
            var s = n.toString();

            arr.push(String.fromCharCode(109 + w.Math.rand(0, 10)));

            for (var i = s.length - 1; i >= 0; i--) {
                arr.push(String.fromCharCode((i % 2 == 0 ? 65 + parseInt(s[i]) : 97 + parseInt(s[i]))));
            };

            if (arr.length < _self.length)
                arr.unshift(String.fromCharCode(77 + w.Math.rand(0, 10)));
            if (arr.length < _self.length)
                arr.push(String.fromCharCode(77 + w.Math.rand(0, 10)));
            if (arr.length < _self.length)
                arr.push(String.fromCharCode(109 + w.Math.rand(0, 10)));

            return arr.join("");
        }
        _self.decode = function(code) {
            var arr = [];
			
            for (var i = code.length; i >= 0; i--) {
                var c = code.charCodeAt(i);
                if (c >= 65 && c <= 76) {
                    arr.push((c - 65).toString());
                }
                if (c >= 97 && c <= 108) {
                    arr.push((c - 97).toString());
                }
            }
            return parseInt(arr.join(""));
        }
	}
	w.Locust.Storage.LocalDataStore = function (config) {
        w.Locust.Storage.LocalDataStore._id = (w.Locust.Storage.LocalDataStore._id || 0) + 1;
		var _defaultKeyProtector = new w.Locust.Storage.NoKeyProtector();
		var _defaultValueChannel = {
			serialize: function(data) { return JSON.stringify(data); },
			deserialize: function(data) { return JSON.parse(data); }
		};
        var _self = this;
        var _name = "Locust.Storage.LocalDataStore";
        var _id = w.Locust.Storage.LocalDataStore._id;
        var _config = w.jQuery.extend({
			name: "",
            useCompression: false,
			keyProtector: null,
			valueChannel: null,
            compressor: null,
			separator: "$",
            logger: null
        }, config);

		_config.logger = w.Locust.getLogger(_config.logger);
		
		if (!_config.keyProtector || !_config.keyProtector.encode || !_config.keyProtector.decode || typeof _config.keyProtector.encode != "function" || typeof _config.keyProtector.decode != "function") {
			_config.logger.warning("Locust.Storage.LocalDataStore", "bad keyProtector. default keyProtector used.");
			_config.keyProtector = _defaultKeyProtector;
		}
		if (!_config.valueChannel || !_config.valueChannel.serialize || !_config.valueChannel.deserialize || typeof _config.valueChannel.serialize != "function" || typeof _config.valueChannel.deserialize != "function") {
			_config.logger.warning("Locust.Storage.LocalDataStore", "bad valueChannel. default valueChannel used.");
			_config.valueChannel = _defaultValueChannel;
		}
		if (!_config.name) {
            _config.name = "_locust.storage.lds" + _id;
        }
		if (_config.useCompression && !w.Locust.Compression) {
			_config.logger.abort("Locust.Storage.LocalDataStore", "Locust.Compression namespace not found.");
			_config.logger.suggest("Locust.Storage.LocalDataStore", "use 'Locust.Compression.js')");
			return;
		}
        if (_config.useCompression && !_config.compressor) {
            _config.compressor = new w.Locust.Compression.ZLibCompression({ logger: _config.logger });
        }

        var _data = [];
        
        w.Locust.Storage.LocalDataStore.prototype.dispose = function () {
            return w.Locust.Storage.LocalDataStore._id -= 1;
        };
        _self.getConfig = function () {
            return _config;
        };
        _self.getId = function () {
            return _id;
        };
        // constructor
        function _ctor() {
			if (!w.localStorage) {
				_config.logger.abort("Locust.Storage.LocalDataStore._ctor(): client does not support localStorage.");
				
				return;
			}
			
            try {
                var str = w.localStorage.getItem(_config.name);
                var decompressed = (_config.useCompression)? _config.compressor.decompressString(str): str;

                if (decompressed) {
                    var arr = decompressed.split(_config.separator);

                    for (var i = 0; i < arr.length; i++) {
						if (arr[i]) {
							if (_config.keyProtector.fixedLength) {
								if (arr[i].length > _config.keyProtector.length) {
									var _encodedKey = arr[i].substr(0, _config.keyProtector.length);
									try {
										var _key = _config.keyProtector.decode(_encodedKey);
										var _value = arr[i].substr(_config.keyProtector.length);
										_value = _config.valueChannel.deserialize(_value);
										_data.push({ key: _key, value: _value });
									} catch (e) { }
								}
							} else {
								var keySeparatorIndex = arr[i].indexOf(_config.keyProtector.separator);
								if (keySeparatorIndex > 0) {
									var _encodedKey = arr[i].substr(0, keySeparatorIndex);
									try {
										var _key = _config.keyProtector.decode(_encodedKey);
										var _value = arr[i].substr(keySeparatorIndex + 1);
										_value = _config.valueChannel.deserialize(_value);
										_data.push({ key: _key, value: _value });
									} catch (e) { }
								}
							}
						}
                    }
                }
            } catch (e) {
                _config.logger.danger(_name, "_ctor()", e);
                _data = [];
                save();
            }
        };

        _ctor();

        // private methods

        function save() {
			if (!w.localStorage) {
				_config.logger.abort("Locust.Storage.LocalDataStore.save(): client does not support localStorage.");
				
				return;
			}
			
            try {
                var result = [];
                for (var i = 0; i < _data.length; i++) {
					try {
						var d = _config.valueChannel.serialize(_data[i].value);
						result.push(_config.keyProtector.encode(_data[i].key) + _config.keyProtector.separator + d);
					} catch(e) {
						_config.logger.danger(_name, "save(): item[" + i + "]", e);
					}
                };
                var str = result.join(_config.separator);
                var compressed = (_config.useCompression)? _config.compressor.compressString(str): str;

                w.localStorage.setItem(_config.name, compressed);
            } catch (e) {
                _config.logger.danger(_name, "save()", e);
            }
        };

        // public methods
		_self.keyExists = function(key) {
			var found = false;
			
			for(var i = 0; i < _data.length; i++) {
				if (_data[i].key == key) {
					found = true;
					break;
				}
			}
			
			return found;
		}
        _self.getByKey = function (key) {
            var x = _data.length ? _data.find(function (item) {return item.key == key;}) : null;
			
            return x;
        };
        _self.getByIndex = function (index) {
            if (_data.length && index && index >= 0 && index < _data.length)
                return _data[index];
            else
                return null;
        };
        _self.indexOf = function (key) {
            for (var i = 0; i < _data.length; i++) {
                if (_data[i].key == key) {
                    return i;
                }
            };
            return -1;
        };
        _self.setByKey = function (key, value) {
            var index = _self.indexOf(key);

            if (index >= 0) {
                _self.setByIndex(index, value);
            }
        };
        _self.setByIndex = function (index, value) {
            if (index >= 0 && index < _data.length) {
                _data[index].value = value;
                save();
            }
        };
        _self.add = function (key, value) {
            var index = _self.indexOf(key);
            if (index < 0) {
                _data.push({ key: key, value: value });
            };
            save();
        };
        _self.addOrUpdate = function (key, value, fnUpdate) {
            var x = _self.getByKey(key);
            if (!x) {
                _data.push({ key: key, value: value });
            } else {
                if (fnUpdate && typeof fnUpdate == "function") {
                    _self.setByKey(key, fnUpdate(x));
                } else {
                    _self.setByKey(key, value);
                }
            };
            save();
        };
        _self.removeByKey = function (key) {
            var index = _self.indexOf(key);
            if (index >= 0) {
                _self.removeByIndex(index);
            }
        };
        _self.removeByIndex = function (index) {
            _data.splice(index, 1);
            save();
        };
        _self.count = function () {
            return _data.length;
        };
        _self.removeAll = function () {
            _data = [];
            save();
        };
    };
})(__locustMainContext);


//================================= Locust.Translation =================================
(function (w) {
    function __error(msg) {
		if (w.console && w.console.error) {
			w.console.error(msg);
		} else {
			throw msg;
		}
	}
	if (!w) {
        throw "Locust.Translation: no context given (use 'Locust.Base.js')";
    }
    if (!w.Locust) {
		__error("Locust.Translation: Locust namespace not found (use 'Locust.Base.js')");
		return;
    }
	if (!w.Locust.Logging) {
		__error("Locust.Translation: Locust.Logging namespace not found (use 'Locust.Logging.js')");
		return;
	}
    if (!w.Locust.Language) {
        __error("Locust.Translation: Locust.Language namespace not found (use 'Locust.Language.js')");
        return;
    }
	if (!w.Locust.Storage) {
        __error("Locust.Translation: Locust.Storage namespace not found (use 'Locust.Language.js')");
        return;
    }
    if (!w.jQuery) {
        __error("Locust.Translation: jQuery library not found");
        return;
    }
	if (!w.Locust.Translation) {
		w.Locust.Translation = {};
	}
	if (!w.Locust.Translation.ManualContentTranslator) {
		w.Locust.Translation.ManualContentTranslator = function(config) {
			var _self = this;
			var _config = w.jQuery.extend({
                logger: null
            }, config);

            _config.logger = w.Locust.getLogger(_config.logger);

            var _self = this;
			var _texts = [];

            function _getValues(rawValues) {
                var result = [];

                if (rawValues) {
                    var buffer = [];
                    var i = 0;
                    var state = 0;

                    while (i < rawValues.length) {
                        var ch = rawValues[i++];

                        switch (state) {
                            case 0:
                                switch (ch) {
                                    case '\\':
                                        state = 1;
                                        break;
                                    case ',':
                                        var value = buffer.join("");
                                        if (value) {
                                            result.push(value);
                                        }
                                        buffer = [];
                                        break;
                                    default:
                                        buffer.push(ch);
                                        break;
                                }

                                break;
                            case 1:
                                if (ch == ',')
                                    buffer.push(ch);
                                else
                                    buffer.push('\\');

                                state = 0;

                                break;
                        }
                    }

                    if (buffer.length > 0) {
                        var value = buffer.join("");

                        if (value) {
                            result.push(value);
                        }
                    }
                }

                return result;
            }
            function _loadCit(content) {
                if (content) {
                    var _lines = content.splitString("\n", w.StringSplitOptions.TrimAndRemoveEmptyEntries);

                    w.jQuery(_lines).each(function (i, line) {
                        line = line ? line.trim() : "";

                        if (line && line[0] != '#') {
                            var left = line.splitString("/", w.StringSplitOptions.TrimAndRemoveEmptyEntries);

                            if (left.length == 3) {
                                var key = left[0].trim();
                                var value = left[1].trim();
                                var dotIndex = left[2].indexOf(':');
                                var lang = left[2].substr(0, dotIndex);
                                var values = left[2].substr(dotIndex + 1).trim();

                                _texts.push({
                                    key: (key + "/" + value + "/" + lang),
                                    values: _getValues(values)
                                });
                            }
                        }
                    })
                }
            }
            function _loadCdt(content) {
                if (content) {
                    var _lines = content.splitString("\n", w.StringSplitOptions.TrimAndRemoveEmptyEntries);

                    w.jQuery(_lines).each(function (i, line) {
                        line = line ? line.trim() : "";

                        if (line && line[0] != '#') {
                            var left = line.splitString("/", w.StringSplitOptions.TrimAndRemoveEmptyEntries);

                            if (left.length == 4) {
                                var key = left[0].trim();
                                var globalValue = left[1].trim();
                                var culture = left[2].trim();
                                var dotIndex = left[3].indexOf(':');
                                var lang = left[3].substr(0, dotIndex);
                                var values = left[3].substr(dotIndex + 1).trim();

                                _texts.push({
                                    key: (key + "/" + globalValue + "/" + culture + "/" + lang),
                                    values: _getValues(values)
                                });
                            }
                        }
                    })
                }
            }
			_self.load = function(content, type) {
				if (type == "cdt") {
					_loadCdt(content);
				} else if (type == "cit") {
					_loadCit(content);
				}
			}
			_self.get = function(key, value1, value2, lang) {
				var result = [];
				var _lang;
				var _key = key;
				var _globalValue = "";
				var _value = "";
				var searchKey = "";
				
				if (value1 == undefined && value2 == undefined && lang == undefined) {
					searchKey = key;
				} else {
					if (lang == undefined) {
						_value = value1;
						_lang = value2 || w.Locust.Language.Current.shortName;
						
						searchKey = "/" + _key + "/" + _value + "/" + _lang;
					} else {
						_globalValue = value1;
						_value = value2;
						_lang = lang || w.Locust.Language.Current.shortName;
						
						searchKey = "/" + _key + "/" + _globalValue + "/" + _value + "/" + _lang;
					}
				}
				
				if (searchKey) {
					var item = _texts.find(function(x) { return x.key == searchKey; });
					if (item) {
						result = item.values;
					}
				}
				
				return result;
			}
			_self.getSingle = function(key, value1, value2, lang) {
				var result = "";
				var values = _self.get(key, value1, value2, lang);
				
				if (values && values.length) {
					result = values[0];
				}
				
				return result;
			}
		}
	}
    if (!w.Locust.Translation.TranslatorProxy) {
        w.Locust.Translation.TranslatorProxy = function (config) {
            var _config = w.jQuery.extend({
                name: "Texts",
                basePath: "/localization",
                logger: null
            }, config);

            _config.logger = w.Locust.getLogger(_config.logger);

            var _self = this;
            var _store = new Locust.Storage.LocalDataStore({ name: _config.name, useCompression: true });
            
            var loadTexts = function(storenames, type) {
				w.jQuery(storenames).each(function (i, storename) {
					var hash = "";
					var item = _store.getByKey(storename);
					
					if (item && item.value) {
						hash = item.value.hash;
					}
					
                    var file = _config.basePath + "/" + type + "/" + storename;
					
                    w.jQuery.post(file,{hash:hash}).done(function (result) {
                        if (result) {
							if (!hash || (!result.Hash && hash != result.Hash)) {
								_store.addOrUpdate(storename, { hash: result.Hash, items: result.Data });
							}
						} else {
							_config.logger.alert("Locust.Translation.loadTexts", "no response: " + file + ", type: " + type);
						}
                    }).fail(function (xhr, text, msg) {
                        _config.logger.fail("Locust.Translation.loadTexts", "failed: " + file + ", type: " + type);
                    });
                });
			};
			
			_self.load = function () {
				loadTexts(_config.cit, "cit");
				loadTexts(_config.cdt, "cdt");
            };
			_self.get = function(key, value1, value2, lang) {
				var _lang;
				var _key = key;
				var _globalValue = "";
				var _value = "";
				var searchKey = "";
				
				if (value1 == undefined && value2 == undefined && lang == undefined) {
					searchKey = key;
				} else {
					if (lang == undefined) {
						_value = value1;
						_lang = value2 || w.Locust.Language.Current.shortName;
						
						searchKey = "/" + _key + "/" + _value + "/" + _lang;
					} else {
						_globalValue = value1;
						_value = value2;
						_lang = lang || w.Locust.Language.Current.shortName;
						
						searchKey = "/" + _key + "/" + _globalValue + "/" + _value + "/" + _lang;
					}
				}
				
				if (searchKey) {
					try {
						for (var i = 0; i < _store.count(); i++) {
							var item = _store.getByIndex(i);
							var items = item.value.items;
							
							if (items) {
								for (var __key in items) {
									if (__key == searchKey) {
										return items[key];
									}
								}
							}
						}
					} catch (e) {
						_config.logger.danger("Translation.getSingle error: " + e + ", args: key=" + key + ", value1=" + value1 + ", value2=" + value2 + ", lang=" + lang);
					}
				}
				
				return [];
			}
			_self.getSingle = function(key, value1, value2, lang) {
				var result = "";
				var values = _self.get(key, value1, value2, lang);
				
				if (values && values.length) {
					result = values[0];
				}
				
				return result;
			}
        }
    }
})(__locustMainContext);

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
