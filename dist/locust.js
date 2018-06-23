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
        w.Locust.Version = "1.2.0";
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
        __mimes = [];
        [
			 [1,"iana","application/1d-interleaved-parityfec",false,"UTF-8",""]
			,[2,"iana","application/3gpdash-qoe-report+xml",false,"",""]
			,[3,"iana","application/3gpp-ims+xml",false,"",""]
			,[4,"iana","application/a2l",false,"",""]
			,[5,"iana","application/activemessage",false,"",""]
			,[6,"iana","application/alto-costmap+json",true,"",""]
			,[7,"iana","application/alto-costmapfilter+json",true,"",""]
			,[8,"iana","application/alto-directory+json",true,"",""]
			,[9,"iana","application/alto-endpointcost+json",true,"",""]
			,[10,"iana","application/alto-endpointcostparams+json",true,"",""]
			,[11,"iana","application/alto-endpointprop+json",true,"",""]
			,[12,"iana","application/alto-endpointpropparams+json",true,"",""]
			,[13,"iana","application/alto-error+json",true,"",""]
			,[14,"iana","application/alto-networkmap+json",true,"",""]
			,[15,"iana","application/alto-networkmapfilter+json",true,"",""]
			,[16,"iana","application/aml",false,"",""]
			,[17,"iana","application/andrew-inset",false,"","ez"]
			,[18,"iana","application/applefile",false,"",""]
			,[19,"apache","application/applixware",false,"","aw"]
			,[20,"iana","application/atf",false,"",""]
			,[21,"iana","application/atfx",false,"",""]
			,[22,"iana","application/atom+xml",true,"","atom"]
			,[23,"iana","application/atomcat+xml",false,"","atomcat"]
			,[24,"iana","application/atomdeleted+xml",false,"",""]
			,[25,"iana","application/atomicmail",false,"",""]
			,[26,"iana","application/atomsvc+xml",false,"","atomsvc"]
			,[27,"iana","application/atxml",false,"",""]
			,[28,"iana","application/auth-policy+xml",false,"",""]
			,[29,"iana","application/bacnet-xdd+zip",false,"",""]
			,[30,"iana","application/batch-smtp",false,"",""]
			,[31,"","application/bdoc",false,"","bdoc"]
			,[32,"iana","application/beep+xml",false,"",""]
			,[33,"iana","application/calendar+json",true,"",""]
			,[34,"iana","application/calendar+xml",false,"",""]
			,[35,"iana","application/call-completion",false,"",""]
			,[36,"iana","application/cals-1840",false,"",""]
			,[37,"iana","application/cbor",false,"",""]
			,[38,"iana","application/ccmp+xml",false,"",""]
			,[39,"iana","application/ccxml+xml",false,"","ccxml"]
			,[40,"iana","application/cdfx+xml",false,"",""]
			,[41,"iana","application/cdmi-capability",false,"","cdmia"]
			,[42,"iana","application/cdmi-container",false,"","cdmic"]
			,[43,"iana","application/cdmi-domain",false,"","cdmid"]
			,[44,"iana","application/cdmi-object",false,"","cdmio"]
			,[45,"iana","application/cdmi-queue",false,"","cdmiq"]
			,[46,"iana","application/cdni",false,"",""]
			,[47,"iana","application/cea",false,"",""]
			,[48,"iana","application/cea-2018+xml",false,"",""]
			,[49,"iana","application/cellml+xml",false,"",""]
			,[50,"iana","application/cfw",false,"",""]
			,[51,"iana","application/cms",false,"",""]
			,[52,"iana","application/cnrp+xml",false,"",""]
			,[53,"iana","application/coap-group+json",true,"",""]
			,[54,"iana","application/commonground",false,"",""]
			,[55,"iana","application/conference-info+xml",false,"",""]
			,[56,"iana","application/cpl+xml",false,"",""]
			,[57,"iana","application/csrattrs",false,"",""]
			,[58,"iana","application/csta+xml",false,"",""]
			,[59,"iana","application/cstadata+xml",false,"",""]
			,[60,"iana","application/csvm+json",true,"",""]
			,[61,"apache","application/cu-seeme",false,"","cu"]
			,[62,"iana","application/cybercash",false,"",""]
			,[63,"","application/dart",true,"",""]
			,[64,"iana","application/dash+xml",false,"","mpd"]
			,[65,"iana","application/dashdelta",false,"",""]
			,[66,"iana","application/davmount+xml",false,"","davmount"]
			,[67,"iana","application/dca-rft",false,"",""]
			,[68,"iana","application/dcd",false,"",""]
			,[69,"iana","application/dec-dx",false,"",""]
			,[70,"iana","application/dialog-info+xml",false,"",""]
			,[71,"iana","application/dicom",false,"",""]
			,[72,"iana","application/dii",false,"",""]
			,[73,"iana","application/dit",false,"",""]
			,[74,"iana","application/dns",false,"",""]
			,[75,"apache","application/docbook+xml",false,"","dbk"]
			,[76,"iana","application/dskpp+xml",false,"",""]
			,[77,"iana","application/dssc+der",false,"","dssc"]
			,[78,"iana","application/dssc+xml",false,"","xdssc"]
			,[79,"iana","application/dvcs",false,"",""]
			,[80,"iana","application/ecmascript",true,"","ecma"]
			,[81,"iana","application/edi-consent",false,"",""]
			,[82,"iana","application/edi-x12",false,"",""]
			,[83,"iana","application/edifact",false,"",""]
			,[84,"iana","application/efi",false,"",""]
			,[85,"iana","application/emergencycalldata.comment+xml",false,"",""]
			,[86,"iana","application/emergencycalldata.deviceinfo+xml",false,"",""]
			,[87,"iana","application/emergencycalldata.providerinfo+xml",false,"",""]
			,[88,"iana","application/emergencycalldata.serviceinfo+xml",false,"",""]
			,[89,"iana","application/emergencycalldata.subscriberinfo+xml",false,"",""]
			,[90,"iana","application/emma+xml",false,"","emma"]
			,[91,"iana","application/emotionml+xml",false,"",""]
			,[92,"iana","application/encaprtp",false,"",""]
			,[93,"iana","application/epp+xml",false,"",""]
			,[94,"iana","application/epub+zip",false,"","epub"]
			,[95,"iana","application/eshop",false,"",""]
			,[96,"iana","application/exi",false,"","exi"]
			,[97,"iana","application/fastinfoset",false,"",""]
			,[98,"iana","application/fastsoap",false,"",""]
			,[99,"iana","application/fdt+xml",false,"",""]
			,[100,"iana","application/fits",false,"",""]
			,[101,"iana","application/font-sfnt",false,"",""]
			,[102,"iana","application/font-tdpfr",false,"","pfr"]
			,[103,"iana","application/font-woff",false,"","woff"]
			,[104,"","application/font-woff2",false,"","woff2"]
			,[105,"iana","application/framework-attributes+xml",false,"",""]
			,[106,"apache","application/gml+xml",false,"","gml"]
			,[107,"apache","application/gpx+xml",false,"","gpx"]
			,[108,"apache","application/gxf",false,"","gxf"]
			,[109,"iana","application/gzip",false,"",""]
			,[110,"iana","application/h224",false,"",""]
			,[111,"iana","application/held+xml",false,"",""]
			,[112,"iana","application/http",false,"",""]
			,[113,"iana","application/hyperstudio",false,"","stk"]
			,[114,"iana","application/ibe-key-request+xml",false,"",""]
			,[115,"iana","application/ibe-pkg-reply+xml",false,"",""]
			,[116,"iana","application/ibe-pp-data",false,"",""]
			,[117,"iana","application/iges",false,"",""]
			,[118,"iana","application/im-iscomposing+xml",false,"",""]
			,[119,"iana","application/index",false,"",""]
			,[120,"iana","application/index.cmd",false,"",""]
			,[121,"iana","application/index.obj",false,"",""]
			,[122,"iana","application/index.response",false,"",""]
			,[123,"iana","application/index.vnd",false,"",""]
			,[124,"iana","application/inkml+xml",false,"","ink, inkml"]
			,[125,"iana","application/iotp",false,"",""]
			,[126,"iana","application/ipfix",false,"","ipfix"]
			,[127,"iana","application/ipp",false,"",""]
			,[128,"iana","application/isup",false,"",""]
			,[129,"iana","application/its+xml",false,"",""]
			,[130,"apache","application/java-archive",false,"","jar, war, ear"]
			,[131,"apache","application/java-serialized-object",false,"","ser"]
			,[132,"apache","application/java-vm",false,"","class"]
			,[133,"iana","application/javascript",true,"UTF-8","js"]
			,[134,"iana","application/jose",false,"",""]
			,[135,"iana","application/jose+json",true,"",""]
			,[136,"iana","application/jrd+json",true,"",""]
			,[137,"iana","application/json",true,"UTF-8","json, map"]
			,[138,"iana","application/json-patch+json",true,"",""]
			,[139,"iana","application/json-seq",false,"",""]
			,[140,"","application/json5",false,"","json5"]
			,[141,"apache","application/jsonml+json",true,"","jsonml"]
			,[142,"iana","application/jwk+json",true,"",""]
			,[143,"iana","application/jwk-set+json",true,"",""]
			,[144,"iana","application/jwt",false,"",""]
			,[145,"iana","application/kpml-request+xml",false,"",""]
			,[146,"iana","application/kpml-response+xml",false,"",""]
			,[147,"iana","application/ld+json",true,"","jsonld"]
			,[148,"iana","application/link-format",false,"",""]
			,[149,"iana","application/load-control+xml",false,"",""]
			,[150,"iana","application/lost+xml",false,"","lostxml"]
			,[151,"iana","application/lostsync+xml",false,"",""]
			,[152,"iana","application/lxf",false,"",""]
			,[153,"iana","application/mac-binhex40",false,"","hqx"]
			,[154,"apache","application/mac-compactpro",false,"","cpt"]
			,[155,"iana","application/macwriteii",false,"",""]
			,[156,"iana","application/mads+xml",false,"","mads"]
			,[157,"","application/manifest+json",true,"UTF-8","webmanifest"]
			,[158,"iana","application/marc",false,"","mrc"]
			,[159,"iana","application/marcxml+xml",false,"","mrcx"]
			,[160,"iana","application/mathematica",false,"","ma, nb, mb"]
			,[161,"iana","application/mathml+xml",false,"","mathml"]
			,[162,"iana","application/mathml-content+xml",false,"",""]
			,[163,"iana","application/mathml-presentation+xml",false,"",""]
			,[164,"iana","application/mbms-associated-procedure-description+xml",false,"",""]
			,[165,"iana","application/mbms-deregister+xml",false,"",""]
			,[166,"iana","application/mbms-envelope+xml",false,"",""]
			,[167,"iana","application/mbms-msk+xml",false,"",""]
			,[168,"iana","application/mbms-msk-response+xml",false,"",""]
			,[169,"iana","application/mbms-protection-description+xml",false,"",""]
			,[170,"iana","application/mbms-reception-report+xml",false,"",""]
			,[171,"iana","application/mbms-register+xml",false,"",""]
			,[172,"iana","application/mbms-register-response+xml",false,"",""]
			,[173,"iana","application/mbms-schedule+xml",false,"",""]
			,[174,"iana","application/mbms-user-service-description+xml",false,"",""]
			,[175,"iana","application/mbox",false,"","mbox"]
			,[176,"iana","application/media-policy-dataset+xml",false,"",""]
			,[177,"iana","application/media_control+xml",false,"",""]
			,[178,"iana","application/mediaservercontrol+xml",false,"","mscml"]
			,[179,"iana","application/merge-patch+json",true,"",""]
			,[180,"apache","application/metalink+xml",false,"","metalink"]
			,[181,"iana","application/metalink4+xml",false,"","meta4"]
			,[182,"iana","application/mets+xml",false,"","mets"]
			,[183,"iana","application/mf4",false,"",""]
			,[184,"iana","application/mikey",false,"",""]
			,[185,"iana","application/mods+xml",false,"","mods"]
			,[186,"iana","application/moss-keys",false,"",""]
			,[187,"iana","application/moss-signature",false,"",""]
			,[188,"iana","application/mosskey-data",false,"",""]
			,[189,"iana","application/mosskey-request",false,"",""]
			,[190,"iana","application/mp21",false,"","m21, mp21"]
			,[191,"iana","application/mp4",false,"","mp4s, m4p"]
			,[192,"iana","application/mpeg4-generic",false,"",""]
			,[193,"iana","application/mpeg4-iod",false,"",""]
			,[194,"iana","application/mpeg4-iod-xmt",false,"",""]
			,[195,"iana","application/mrb-consumer+xml",false,"",""]
			,[196,"iana","application/mrb-publish+xml",false,"",""]
			,[197,"iana","application/msc-ivr+xml",false,"",""]
			,[198,"iana","application/msc-mixer+xml",false,"",""]
			,[199,"iana","application/msword",false,"","doc, dot"]
			,[200,"iana","application/mxf",false,"","mxf"]
			,[201,"iana","application/nasdata",false,"",""]
			,[202,"iana","application/news-checkgroups",false,"",""]
			,[203,"iana","application/news-groupinfo",false,"",""]
			,[204,"iana","application/news-transmission",false,"",""]
			,[205,"iana","application/nlsml+xml",false,"",""]
			,[206,"iana","application/nss",false,"",""]
			,[207,"iana","application/ocsp-request",false,"",""]
			,[208,"iana","application/ocsp-response",false,"",""]
			,[209,"iana","application/octet-stream",false,"","bin, dms, lrf, mar, so, dist, distz, pkg, bpk, dump, elc, deploy, exe, dll, deb, dmg, iso, img, msi, msp, msm, buffer"]
			,[210,"iana","application/oda",false,"","oda"]
			,[211,"iana","application/odx",false,"",""]
			,[212,"iana","application/oebps-package+xml",false,"","opf"]
			,[213,"iana","application/ogg",false,"","ogx"]
			,[214,"apache","application/omdoc+xml",false,"","omdoc"]
			,[215,"apache","application/onenote",false,"","onetoc, onetoc2, onetmp, onepkg"]
			,[216,"iana","application/oxps",false,"","oxps"]
			,[217,"iana","application/p2p-overlay+xml",false,"",""]
			,[218,"iana","application/parityfec",false,"",""]
			,[219,"iana","application/patch-ops-error+xml",false,"","xer"]
			,[220,"iana","application/pdf",false,"","pdf"]
			,[221,"iana","application/pdx",false,"",""]
			,[222,"iana","application/pgp-encrypted",false,"","pgp"]
			,[223,"iana","application/pgp-keys",false,"",""]
			,[224,"iana","application/pgp-signature",false,"","asc, sig"]
			,[225,"apache","application/pics-rules",false,"","prf"]
			,[226,"iana","application/pidf+xml",false,"",""]
			,[227,"iana","application/pidf-diff+xml",false,"",""]
			,[228,"iana","application/pkcs10",false,"","p10"]
			,[229,"iana","application/pkcs12",false,"",""]
			,[230,"iana","application/pkcs7-mime",false,"","p7m, p7c"]
			,[231,"iana","application/pkcs7-signature",false,"","p7s"]
			,[232,"iana","application/pkcs8",false,"","p8"]
			,[233,"iana","application/pkix-attr-cert",false,"","ac"]
			,[234,"iana","application/pkix-cert",false,"","cer"]
			,[235,"iana","application/pkix-crl",false,"","crl"]
			,[236,"iana","application/pkix-pkipath",false,"","pkipath"]
			,[237,"iana","application/pkixcmp",false,"","pki"]
			,[238,"iana","application/pls+xml",false,"","pls"]
			,[239,"iana","application/poc-settings+xml",false,"",""]
			,[240,"iana","application/postscript",true,"","ai, eps, ps"]
			,[241,"iana","application/ppsp-tracker+json",true,"",""]
			,[242,"iana","application/problem+json",true,"",""]
			,[243,"iana","application/problem+xml",false,"",""]
			,[244,"iana","application/provenance+xml",false,"",""]
			,[245,"iana","application/prs.alvestrand.titrax-sheet",false,"",""]
			,[246,"iana","application/prs.cww",false,"","cww"]
			,[247,"iana","application/prs.hpub+zip",false,"",""]
			,[248,"iana","application/prs.nprend",false,"",""]
			,[249,"iana","application/prs.plucker",false,"",""]
			,[250,"iana","application/prs.rdf-xml-crypt",false,"",""]
			,[251,"iana","application/prs.xsf+xml",false,"",""]
			,[252,"iana","application/pskc+xml",false,"","pskcxml"]
			,[253,"iana","application/qsig",false,"",""]
			,[254,"iana","application/raptorfec",false,"",""]
			,[255,"iana","application/rdap+json",true,"",""]
			,[256,"iana","application/rdf+xml",true,"","rdf"]
			,[257,"iana","application/reginfo+xml",false,"","rif"]
			,[258,"iana","application/relax-ng-compact-syntax",false,"","rnc"]
			,[259,"iana","application/remote-printing",false,"",""]
			,[260,"iana","application/reputon+json",true,"",""]
			,[261,"iana","application/resource-lists+xml",false,"","rl"]
			,[262,"iana","application/resource-lists-diff+xml",false,"","rld"]
			,[263,"iana","application/rfc+xml",false,"",""]
			,[264,"iana","application/riscos",false,"",""]
			,[265,"iana","application/rlmi+xml",false,"",""]
			,[266,"iana","application/rls-services+xml",false,"","rs"]
			,[267,"iana","application/rpki-ghostbusters",false,"","gbr"]
			,[268,"iana","application/rpki-manifest",false,"","mft"]
			,[269,"iana","application/rpki-roa",false,"","roa"]
			,[270,"iana","application/rpki-updown",false,"",""]
			,[271,"apache","application/rsd+xml",false,"","rsd"]
			,[272,"apache","application/rss+xml",true,"","rss"]
			,[273,"iana","application/rtf",true,"","rtf"]
			,[274,"iana","application/rtploopback",false,"",""]
			,[275,"iana","application/rtx",false,"",""]
			,[276,"iana","application/samlassertion+xml",false,"",""]
			,[277,"iana","application/samlmetadata+xml",false,"",""]
			,[278,"iana","application/sbml+xml",false,"","sbml"]
			,[279,"iana","application/scaip+xml",false,"",""]
			,[280,"iana","application/scim+json",true,"",""]
			,[281,"iana","application/scvp-cv-request",false,"","scq"]
			,[282,"iana","application/scvp-cv-response",false,"","scs"]
			,[283,"iana","application/scvp-vp-request",false,"","spq"]
			,[284,"iana","application/scvp-vp-response",false,"","spp"]
			,[285,"iana","application/sdp",false,"","sdp"]
			,[286,"iana","application/sep+xml",false,"",""]
			,[287,"iana","application/sep-exi",false,"",""]
			,[288,"iana","application/session-info",false,"",""]
			,[289,"iana","application/set-payment",false,"",""]
			,[290,"iana","application/set-payment-initiation",false,"","setpay"]
			,[291,"iana","application/set-registration",false,"",""]
			,[292,"iana","application/set-registration-initiation",false,"","setreg"]
			,[293,"iana","application/sgml",false,"",""]
			,[294,"iana","application/sgml-open-catalog",false,"",""]
			,[295,"iana","application/shf+xml",false,"","shf"]
			,[296,"iana","application/sieve",false,"",""]
			,[297,"iana","application/simple-filter+xml",false,"",""]
			,[298,"iana","application/simple-message-summary",false,"",""]
			,[299,"iana","application/simplesymbolcontainer",false,"",""]
			,[300,"iana","application/slate",false,"",""]
			,[301,"iana","application/smil",false,"",""]
			,[302,"iana","application/smil+xml",false,"","smi, smil"]
			,[303,"iana","application/smpte336m",false,"",""]
			,[304,"iana","application/soap+fastinfoset",false,"",""]
			,[305,"iana","application/soap+xml",true,"",""]
			,[306,"iana","application/sparql-query",false,"","rq"]
			,[307,"iana","application/sparql-results+xml",false,"","srx"]
			,[308,"iana","application/spirits-event+xml",false,"",""]
			,[309,"iana","application/sql",false,"",""]
			,[310,"iana","application/srgs",false,"","gram"]
			,[311,"iana","application/srgs+xml",false,"","grxml"]
			,[312,"iana","application/sru+xml",false,"","sru"]
			,[313,"apache","application/ssdl+xml",false,"","ssdl"]
			,[314,"iana","application/ssml+xml",false,"","ssml"]
			,[315,"iana","application/tamp-apex-update",false,"",""]
			,[316,"iana","application/tamp-apex-update-confirm",false,"",""]
			,[317,"iana","application/tamp-community-update",false,"",""]
			,[318,"iana","application/tamp-community-update-confirm",false,"",""]
			,[319,"iana","application/tamp-error",false,"",""]
			,[320,"iana","application/tamp-sequence-adjust",false,"",""]
			,[321,"iana","application/tamp-sequence-adjust-confirm",false,"",""]
			,[322,"iana","application/tamp-status-query",false,"",""]
			,[323,"iana","application/tamp-status-response",false,"",""]
			,[324,"iana","application/tamp-update",false,"",""]
			,[325,"iana","application/tamp-update-confirm",false,"",""]
			,[326,"","application/tar",true,"",""]
			,[327,"iana","application/tei+xml",false,"","tei, teicorpus"]
			,[328,"iana","application/thraud+xml",false,"","tfi"]
			,[329,"iana","application/timestamp-query",false,"",""]
			,[330,"iana","application/timestamp-reply",false,"",""]
			,[331,"iana","application/timestamped-data",false,"","tsd"]
			,[332,"iana","application/ttml+xml",false,"",""]
			,[333,"iana","application/tve-trigger",false,"",""]
			,[334,"iana","application/ulpfec",false,"",""]
			,[335,"iana","application/urc-grpsheet+xml",false,"",""]
			,[336,"iana","application/urc-ressheet+xml",false,"",""]
			,[337,"iana","application/urc-targetdesc+xml",false,"",""]
			,[338,"iana","application/urc-uisocketdesc+xml",false,"",""]
			,[339,"iana","application/vcard+json",true,"",""]
			,[340,"iana","application/vcard+xml",false,"",""]
			,[341,"iana","application/vemmi",false,"",""]
			,[342,"apache","application/vividence.scriptfile",false,"",""]
			,[343,"iana","application/vnd.3gpp-prose+xml",false,"",""]
			,[344,"iana","application/vnd.3gpp-prose-pc3ch+xml",false,"",""]
			,[345,"iana","application/vnd.3gpp.access-transfer-events+xml",false,"",""]
			,[346,"iana","application/vnd.3gpp.bsf+xml",false,"",""]
			,[347,"iana","application/vnd.3gpp.mid-call+xml",false,"",""]
			,[348,"iana","application/vnd.3gpp.pic-bw-large",false,"","plb"]
			,[349,"iana","application/vnd.3gpp.pic-bw-small",false,"","psb"]
			,[350,"iana","application/vnd.3gpp.pic-bw-var",false,"","pvb"]
			,[351,"iana","application/vnd.3gpp.sms",false,"",""]
			,[352,"iana","application/vnd.3gpp.sms+xml",false,"",""]
			,[353,"iana","application/vnd.3gpp.srvcc-ext+xml",false,"",""]
			,[354,"iana","application/vnd.3gpp.srvcc-info+xml",false,"",""]
			,[355,"iana","application/vnd.3gpp.state-and-event-info+xml",false,"",""]
			,[356,"iana","application/vnd.3gpp.ussd+xml",false,"",""]
			,[357,"iana","application/vnd.3gpp2.bcmcsinfo+xml",false,"",""]
			,[358,"iana","application/vnd.3gpp2.sms",false,"",""]
			,[359,"iana","application/vnd.3gpp2.tcap",false,"","tcap"]
			,[360,"iana","application/vnd.3lightssoftware.imagescal",false,"",""]
			,[361,"iana","application/vnd.3m.post-it-notes",false,"","pwn"]
			,[362,"iana","application/vnd.accpac.simply.aso",false,"","aso"]
			,[363,"iana","application/vnd.accpac.simply.imp",false,"","imp"]
			,[364,"iana","application/vnd.acucobol",false,"","acu"]
			,[365,"iana","application/vnd.acucorp",false,"","atc, acutc"]
			,[366,"apache","application/vnd.adobe.air-application-installer-package+zip",false,"","air"]
			,[367,"iana","application/vnd.adobe.flash.movie",false,"",""]
			,[368,"iana","application/vnd.adobe.formscentral.fcdt",false,"","fcdt"]
			,[369,"iana","application/vnd.adobe.fxp",false,"","fxp, fxpl"]
			,[370,"iana","application/vnd.adobe.partial-upload",false,"",""]
			,[371,"iana","application/vnd.adobe.xdp+xml",false,"","xdp"]
			,[372,"iana","application/vnd.adobe.xfdf",false,"","xfdf"]
			,[373,"iana","application/vnd.aether.imp",false,"",""]
			,[374,"iana","application/vnd.ah-barcode",false,"",""]
			,[375,"iana","application/vnd.ahead.space",false,"","ahead"]
			,[376,"iana","application/vnd.airzip.filesecure.azf",false,"","azf"]
			,[377,"iana","application/vnd.airzip.filesecure.azs",false,"","azs"]
			,[378,"apache","application/vnd.amazon.ebook",false,"","azw"]
			,[379,"iana","application/vnd.americandynamics.acc",false,"","acc"]
			,[380,"iana","application/vnd.amiga.ami",false,"","ami"]
			,[381,"iana","application/vnd.amundsen.maze+xml",false,"",""]
			,[382,"apache","application/vnd.android.package-archive",false,"","apk"]
			,[383,"iana","application/vnd.anki",false,"",""]
			,[384,"iana","application/vnd.anser-web-certificate-issue-initiation",false,"","cii"]
			,[385,"apache","application/vnd.anser-web-funds-transfer-initiation",false,"","fti"]
			,[386,"iana","application/vnd.antix.game-component",false,"","atx"]
			,[387,"iana","application/vnd.apache.thrift.binary",false,"",""]
			,[388,"iana","application/vnd.apache.thrift.compact",false,"",""]
			,[389,"iana","application/vnd.apache.thrift.json",false,"",""]
			,[390,"iana","application/vnd.api+json",true,"",""]
			,[391,"iana","application/vnd.apple.installer+xml",false,"","mpkg"]
			,[392,"iana","application/vnd.apple.mpegurl",false,"","m3u8"]
			,[393,"","application/vnd.apple.pkpass",false,"","pkpass"]
			,[394,"iana","application/vnd.arastra.swi",false,"",""]
			,[395,"iana","application/vnd.aristanetworks.swi",false,"","swi"]
			,[396,"iana","application/vnd.artsquare",false,"",""]
			,[397,"iana","application/vnd.astraea-software.iota",false,"","iota"]
			,[398,"iana","application/vnd.audiograph",false,"","aep"]
			,[399,"iana","application/vnd.autopackage",false,"",""]
			,[400,"iana","application/vnd.avistar+xml",false,"",""]
			,[401,"iana","application/vnd.balsamiq.bmml+xml",false,"",""]
			,[402,"iana","application/vnd.balsamiq.bmpr",false,"",""]
			,[403,"iana","application/vnd.bekitzur-stech+json",true,"",""]
			,[404,"iana","application/vnd.biopax.rdf+xml",false,"",""]
			,[405,"iana","application/vnd.blueice.multipass",false,"","mpm"]
			,[406,"iana","application/vnd.bluetooth.ep.oob",false,"",""]
			,[407,"iana","application/vnd.bluetooth.le.oob",false,"",""]
			,[408,"iana","application/vnd.bmi",false,"","bmi"]
			,[409,"iana","application/vnd.businessobjects",false,"","rep"]
			,[410,"iana","application/vnd.cab-jscript",false,"",""]
			,[411,"iana","application/vnd.canon-cpdl",false,"",""]
			,[412,"iana","application/vnd.canon-lips",false,"",""]
			,[413,"iana","application/vnd.cendio.thinlinc.clientconf",false,"",""]
			,[414,"iana","application/vnd.century-systems.tcp_stream",false,"",""]
			,[415,"iana","application/vnd.chemdraw+xml",false,"","cdxml"]
			,[416,"iana","application/vnd.chipnuts.karaoke-mmd",false,"","mmd"]
			,[417,"iana","application/vnd.cinderella",false,"","cdy"]
			,[418,"iana","application/vnd.cirpack.isdn-ext",false,"",""]
			,[419,"iana","application/vnd.citationstyles.style+xml",false,"",""]
			,[420,"iana","application/vnd.claymore",false,"","cla"]
			,[421,"iana","application/vnd.cloanto.rp9",false,"","rp9"]
			,[422,"iana","application/vnd.clonk.c4group",false,"","c4g, c4d, c4f, c4p, c4u"]
			,[423,"iana","application/vnd.cluetrust.cartomobile-config",false,"","c11amc"]
			,[424,"iana","application/vnd.cluetrust.cartomobile-config-pkg",false,"","c11amz"]
			,[425,"iana","application/vnd.coffeescript",false,"",""]
			,[426,"iana","application/vnd.collection+json",true,"",""]
			,[427,"iana","application/vnd.collection.doc+json",true,"",""]
			,[428,"iana","application/vnd.collection.next+json",true,"",""]
			,[429,"iana","application/vnd.commerce-battelle",false,"",""]
			,[430,"iana","application/vnd.commonspace",false,"","csp"]
			,[431,"iana","application/vnd.contact.cmsg",false,"","cdbcmsg"]
			,[432,"iana","application/vnd.coreos.ignition+json",true,"",""]
			,[433,"iana","application/vnd.cosmocaller",false,"","cmc"]
			,[434,"iana","application/vnd.crick.clicker",false,"","clkx"]
			,[435,"iana","application/vnd.crick.clicker.keyboard",false,"","clkk"]
			,[436,"iana","application/vnd.crick.clicker.palette",false,"","clkp"]
			,[437,"iana","application/vnd.crick.clicker.template",false,"","clkt"]
			,[438,"iana","application/vnd.crick.clicker.wordbank",false,"","clkw"]
			,[439,"iana","application/vnd.criticaltools.wbs+xml",false,"","wbs"]
			,[440,"iana","application/vnd.ctc-posml",false,"","pml"]
			,[441,"iana","application/vnd.ctct.ws+xml",false,"",""]
			,[442,"iana","application/vnd.cups-pdf",false,"",""]
			,[443,"iana","application/vnd.cups-postscript",false,"",""]
			,[444,"iana","application/vnd.cups-ppd",false,"","ppd"]
			,[445,"iana","application/vnd.cups-raster",false,"",""]
			,[446,"iana","application/vnd.cups-raw",false,"",""]
			,[447,"iana","application/vnd.curl",false,"",""]
			,[448,"apache","application/vnd.curl.car",false,"","car"]
			,[449,"apache","application/vnd.curl.pcurl",false,"","pcurl"]
			,[450,"iana","application/vnd.cyan.dean.root+xml",false,"",""]
			,[451,"iana","application/vnd.cybank",false,"",""]
			,[452,"iana","application/vnd.dart",true,"","dart"]
			,[453,"iana","application/vnd.data-vision.rdz",false,"","rdz"]
			,[454,"iana","application/vnd.debian.binary-package",false,"",""]
			,[455,"iana","application/vnd.dece.data",false,"","uvf, uvvf, uvd, uvvd"]
			,[456,"iana","application/vnd.dece.ttml+xml",false,"","uvt, uvvt"]
			,[457,"iana","application/vnd.dece.unspecified",false,"","uvx, uvvx"]
			,[458,"iana","application/vnd.dece.zip",false,"","uvz, uvvz"]
			,[459,"iana","application/vnd.denovo.fcselayout-link",false,"","fe_launch"]
			,[460,"iana","application/vnd.desmume-movie",false,"",""]
			,[461,"apache","application/vnd.desmume.movie",false,"",""]
			,[462,"iana","application/vnd.dir-bi.plate-dl-nosuffix",false,"",""]
			,[463,"iana","application/vnd.dm.delegation+xml",false,"",""]
			,[464,"iana","application/vnd.dna",false,"","dna"]
			,[465,"iana","application/vnd.document+json",true,"",""]
			,[466,"apache","application/vnd.dolby.mlp",false,"","mlp"]
			,[467,"iana","application/vnd.dolby.mobile.1",false,"",""]
			,[468,"iana","application/vnd.dolby.mobile.2",false,"",""]
			,[469,"iana","application/vnd.doremir.scorecloud-binary-document",false,"",""]
			,[470,"iana","application/vnd.dpgraph",false,"","dpg"]
			,[471,"iana","application/vnd.dreamfactory",false,"","dfac"]
			,[472,"iana","application/vnd.drive+json",true,"",""]
			,[473,"apache","application/vnd.ds-keypoint",false,"","kpxx"]
			,[474,"iana","application/vnd.dtg.local",false,"",""]
			,[475,"iana","application/vnd.dtg.local.flash",false,"",""]
			,[476,"iana","application/vnd.dtg.local.html",false,"",""]
			,[477,"iana","application/vnd.dvb.ait",false,"","ait"]
			,[478,"iana","application/vnd.dvb.dvbj",false,"",""]
			,[479,"iana","application/vnd.dvb.esgcontainer",false,"",""]
			,[480,"iana","application/vnd.dvb.ipdcdftnotifaccess",false,"",""]
			,[481,"iana","application/vnd.dvb.ipdcesgaccess",false,"",""]
			,[482,"iana","application/vnd.dvb.ipdcesgaccess2",false,"",""]
			,[483,"iana","application/vnd.dvb.ipdcesgpdd",false,"",""]
			,[484,"iana","application/vnd.dvb.ipdcroaming",false,"",""]
			,[485,"iana","application/vnd.dvb.iptv.alfec-base",false,"",""]
			,[486,"iana","application/vnd.dvb.iptv.alfec-enhancement",false,"",""]
			,[487,"iana","application/vnd.dvb.notif-aggregate-root+xml",false,"",""]
			,[488,"iana","application/vnd.dvb.notif-container+xml",false,"",""]
			,[489,"iana","application/vnd.dvb.notif-generic+xml",false,"",""]
			,[490,"iana","application/vnd.dvb.notif-ia-msglist+xml",false,"",""]
			,[491,"iana","application/vnd.dvb.notif-ia-registration-request+xml",false,"",""]
			,[492,"iana","application/vnd.dvb.notif-ia-registration-response+xml",false,"",""]
			,[493,"iana","application/vnd.dvb.notif-init+xml",false,"",""]
			,[494,"iana","application/vnd.dvb.pfr",false,"",""]
			,[495,"iana","application/vnd.dvb.service",false,"","svc"]
			,[496,"iana","application/vnd.dxr",false,"",""]
			,[497,"iana","application/vnd.dynageo",false,"","geo"]
			,[498,"iana","application/vnd.dzr",false,"",""]
			,[499,"iana","application/vnd.easykaraoke.cdgdownload",false,"",""]
			,[500,"iana","application/vnd.ecdis-update",false,"",""]
			,[501,"iana","application/vnd.ecowin.chart",false,"","mag"]
			,[502,"iana","application/vnd.ecowin.filerequest",false,"",""]
			,[503,"iana","application/vnd.ecowin.fileupdate",false,"",""]
			,[504,"iana","application/vnd.ecowin.series",false,"",""]
			,[505,"iana","application/vnd.ecowin.seriesrequest",false,"",""]
			,[506,"iana","application/vnd.ecowin.seriesupdate",false,"",""]
			,[507,"iana","application/vnd.emclient.accessrequest+xml",false,"",""]
			,[508,"iana","application/vnd.enliven",false,"","nml"]
			,[509,"iana","application/vnd.enphase.envoy",false,"",""]
			,[510,"iana","application/vnd.eprints.data+xml",false,"",""]
			,[511,"iana","application/vnd.epson.esf",false,"","esf"]
			,[512,"iana","application/vnd.epson.msf",false,"","msf"]
			,[513,"iana","application/vnd.epson.quickanime",false,"","qam"]
			,[514,"iana","application/vnd.epson.salt",false,"","slt"]
			,[515,"iana","application/vnd.epson.ssf",false,"","ssf"]
			,[516,"iana","application/vnd.ericsson.quickcall",false,"",""]
			,[517,"iana","application/vnd.eszigno3+xml",false,"","es3, et3"]
			,[518,"iana","application/vnd.etsi.aoc+xml",false,"",""]
			,[519,"iana","application/vnd.etsi.asic-e+zip",false,"",""]
			,[520,"iana","application/vnd.etsi.asic-s+zip",false,"",""]
			,[521,"iana","application/vnd.etsi.cug+xml",false,"",""]
			,[522,"iana","application/vnd.etsi.iptvcommand+xml",false,"",""]
			,[523,"iana","application/vnd.etsi.iptvdiscovery+xml",false,"",""]
			,[524,"iana","application/vnd.etsi.iptvprofile+xml",false,"",""]
			,[525,"iana","application/vnd.etsi.iptvsad-bc+xml",false,"",""]
			,[526,"iana","application/vnd.etsi.iptvsad-cod+xml",false,"",""]
			,[527,"iana","application/vnd.etsi.iptvsad-npvr+xml",false,"",""]
			,[528,"iana","application/vnd.etsi.iptvservice+xml",false,"",""]
			,[529,"iana","application/vnd.etsi.iptvsync+xml",false,"",""]
			,[530,"iana","application/vnd.etsi.iptvueprofile+xml",false,"",""]
			,[531,"iana","application/vnd.etsi.mcid+xml",false,"",""]
			,[532,"iana","application/vnd.etsi.mheg5",false,"",""]
			,[533,"iana","application/vnd.etsi.overload-control-policy-dataset+xml",false,"",""]
			,[534,"iana","application/vnd.etsi.pstn+xml",false,"",""]
			,[535,"iana","application/vnd.etsi.sci+xml",false,"",""]
			,[536,"iana","application/vnd.etsi.simservs+xml",false,"",""]
			,[537,"iana","application/vnd.etsi.timestamp-token",false,"",""]
			,[538,"iana","application/vnd.etsi.tsl+xml",false,"",""]
			,[539,"iana","application/vnd.etsi.tsl.der",false,"",""]
			,[540,"iana","application/vnd.eudora.data",false,"",""]
			,[541,"iana","application/vnd.ezpix-album",false,"","ez2"]
			,[542,"iana","application/vnd.ezpix-package",false,"","ez3"]
			,[543,"iana","application/vnd.f-secure.mobile",false,"",""]
			,[544,"iana","application/vnd.fastcopy-disk-image",false,"",""]
			,[545,"iana","application/vnd.fdf",false,"","fdf"]
			,[546,"iana","application/vnd.fdsn.mseed",false,"","mseed"]
			,[547,"iana","application/vnd.fdsn.seed",false,"","seed, dataless"]
			,[548,"iana","application/vnd.ffsns",false,"",""]
			,[549,"iana","application/vnd.filmit.zfc",false,"",""]
			,[550,"iana","application/vnd.fints",false,"",""]
			,[551,"iana","application/vnd.firemonkeys.cloudcell",false,"",""]
			,[552,"iana","application/vnd.flographit",false,"","gph"]
			,[553,"iana","application/vnd.fluxtime.clip",false,"","ftc"]
			,[554,"iana","application/vnd.font-fontforge-sfd",false,"",""]
			,[555,"iana","application/vnd.framemaker",false,"","fm, frame, maker, book"]
			,[556,"iana","application/vnd.frogans.fnc",false,"","fnc"]
			,[557,"iana","application/vnd.frogans.ltf",false,"","ltf"]
			,[558,"iana","application/vnd.fsc.weblaunch",false,"","fsc"]
			,[559,"iana","application/vnd.fujitsu.oasys",false,"","oas"]
			,[560,"iana","application/vnd.fujitsu.oasys2",false,"","oa2"]
			,[561,"iana","application/vnd.fujitsu.oasys3",false,"","oa3"]
			,[562,"iana","application/vnd.fujitsu.oasysgp",false,"","fg5"]
			,[563,"iana","application/vnd.fujitsu.oasysprs",false,"","bh2"]
			,[564,"iana","application/vnd.fujixerox.art-ex",false,"",""]
			,[565,"iana","application/vnd.fujixerox.art4",false,"",""]
			,[566,"iana","application/vnd.fujixerox.ddd",false,"","ddd"]
			,[567,"iana","application/vnd.fujixerox.docuworks",false,"","xdw"]
			,[568,"iana","application/vnd.fujixerox.docuworks.binder",false,"","xbd"]
			,[569,"iana","application/vnd.fujixerox.docuworks.container",false,"",""]
			,[570,"iana","application/vnd.fujixerox.hbpl",false,"",""]
			,[571,"iana","application/vnd.fut-misnet",false,"",""]
			,[572,"iana","application/vnd.fuzzysheet",false,"","fzs"]
			,[573,"iana","application/vnd.genomatix.tuxedo",false,"","txd"]
			,[574,"iana","application/vnd.geo+json",true,"",""]
			,[575,"iana","application/vnd.geocube+xml",false,"",""]
			,[576,"iana","application/vnd.geogebra.file",false,"","ggb"]
			,[577,"iana","application/vnd.geogebra.tool",false,"","ggt"]
			,[578,"iana","application/vnd.geometry-explorer",false,"","gex, gre"]
			,[579,"iana","application/vnd.geonext",false,"","gxt"]
			,[580,"iana","application/vnd.geoplan",false,"","g2w"]
			,[581,"iana","application/vnd.geospace",false,"","g3w"]
			,[582,"iana","application/vnd.gerber",false,"",""]
			,[583,"iana","application/vnd.globalplatform.card-content-mgt",false,"",""]
			,[584,"iana","application/vnd.globalplatform.card-content-mgt-response",false,"",""]
			,[585,"iana","application/vnd.gmx",false,"","gmx"]
			,[586,"","application/vnd.google-apps.document",false,"","gdoc"]
			,[587,"","application/vnd.google-apps.presentation",false,"","gslides"]
			,[588,"","application/vnd.google-apps.spreadsheet",false,"","gsheet"]
			,[589,"iana","application/vnd.google-earth.kml+xml",true,"","kml"]
			,[590,"iana","application/vnd.google-earth.kmz",false,"","kmz"]
			,[591,"iana","application/vnd.gov.sk.e-form+xml",false,"",""]
			,[592,"iana","application/vnd.gov.sk.e-form+zip",false,"",""]
			,[593,"iana","application/vnd.gov.sk.xmldatacontainer+xml",false,"",""]
			,[594,"iana","application/vnd.grafeq",false,"","gqf, gqs"]
			,[595,"iana","application/vnd.gridmp",false,"",""]
			,[596,"iana","application/vnd.groove-account",false,"","gac"]
			,[597,"iana","application/vnd.groove-help",false,"","ghf"]
			,[598,"iana","application/vnd.groove-identity-message",false,"","gim"]
			,[599,"iana","application/vnd.groove-injector",false,"","grv"]
			,[600,"iana","application/vnd.groove-tool-message",false,"","gtm"]
			,[601,"iana","application/vnd.groove-tool-template",false,"","tpl"]
			,[602,"iana","application/vnd.groove-vcard",false,"","vcg"]
			,[603,"iana","application/vnd.hal+json",true,"",""]
			,[604,"iana","application/vnd.hal+xml",false,"","hal"]
			,[605,"iana","application/vnd.handheld-entertainment+xml",false,"","zmm"]
			,[606,"iana","application/vnd.hbci",false,"","hbci"]
			,[607,"iana","application/vnd.hcl-bireports",false,"",""]
			,[608,"iana","application/vnd.hdt",false,"",""]
			,[609,"iana","application/vnd.heroku+json",true,"",""]
			,[610,"iana","application/vnd.hhe.lesson-player",false,"","les"]
			,[611,"iana","application/vnd.hp-hpgl",false,"","hpgl"]
			,[612,"iana","application/vnd.hp-hpid",false,"","hpid"]
			,[613,"iana","application/vnd.hp-hps",false,"","hps"]
			,[614,"iana","application/vnd.hp-jlyt",false,"","jlt"]
			,[615,"iana","application/vnd.hp-pcl",false,"","pcl"]
			,[616,"iana","application/vnd.hp-pclxl",false,"","pclxl"]
			,[617,"iana","application/vnd.httphone",false,"",""]
			,[618,"iana","application/vnd.hydrostatix.sof-data",false,"","sfd-hdstx"]
			,[619,"iana","application/vnd.hyperdrive+json",true,"",""]
			,[620,"iana","application/vnd.hzn-3d-crossword",false,"",""]
			,[621,"iana","application/vnd.ibm.afplinedata",false,"",""]
			,[622,"iana","application/vnd.ibm.electronic-media",false,"",""]
			,[623,"iana","application/vnd.ibm.minipay",false,"","mpy"]
			,[624,"iana","application/vnd.ibm.modcap",false,"","afp, listafp, list3820"]
			,[625,"iana","application/vnd.ibm.rights-management",false,"","irm"]
			,[626,"iana","application/vnd.ibm.secure-container",false,"","sc"]
			,[627,"iana","application/vnd.iccprofile",false,"","icc, icm"]
			,[628,"iana","application/vnd.ieee.1905",false,"",""]
			,[629,"iana","application/vnd.igloader",false,"","igl"]
			,[630,"iana","application/vnd.immervision-ivp",false,"","ivp"]
			,[631,"iana","application/vnd.immervision-ivu",false,"","ivu"]
			,[632,"iana","application/vnd.ims.imsccv1p1",false,"",""]
			,[633,"iana","application/vnd.ims.imsccv1p2",false,"",""]
			,[634,"iana","application/vnd.ims.imsccv1p3",false,"",""]
			,[635,"iana","application/vnd.ims.lis.v2.result+json",true,"",""]
			,[636,"iana","application/vnd.ims.lti.v2.toolconsumerprofile+json",true,"",""]
			,[637,"iana","application/vnd.ims.lti.v2.toolproxy+json",true,"",""]
			,[638,"iana","application/vnd.ims.lti.v2.toolproxy.id+json",true,"",""]
			,[639,"iana","application/vnd.ims.lti.v2.toolsettings+json",true,"",""]
			,[640,"iana","application/vnd.ims.lti.v2.toolsettings.simple+json",true,"",""]
			,[641,"iana","application/vnd.informedcontrol.rms+xml",false,"",""]
			,[642,"iana","application/vnd.informix-visionary",false,"",""]
			,[643,"iana","application/vnd.infotech.project",false,"",""]
			,[644,"iana","application/vnd.infotech.project+xml",false,"",""]
			,[645,"iana","application/vnd.innopath.wamp.notification",false,"",""]
			,[646,"iana","application/vnd.insors.igm",false,"","igm"]
			,[647,"iana","application/vnd.intercon.formnet",false,"","xpw, xpx"]
			,[648,"iana","application/vnd.intergeo",false,"","i2g"]
			,[649,"iana","application/vnd.intertrust.digibox",false,"",""]
			,[650,"iana","application/vnd.intertrust.nncp",false,"",""]
			,[651,"iana","application/vnd.intu.qbo",false,"","qbo"]
			,[652,"iana","application/vnd.intu.qfx",false,"","qfx"]
			,[653,"iana","application/vnd.iptc.g2.catalogitem+xml",false,"",""]
			,[654,"iana","application/vnd.iptc.g2.conceptitem+xml",false,"",""]
			,[655,"iana","application/vnd.iptc.g2.knowledgeitem+xml",false,"",""]
			,[656,"iana","application/vnd.iptc.g2.newsitem+xml",false,"",""]
			,[657,"iana","application/vnd.iptc.g2.newsmessage+xml",false,"",""]
			,[658,"iana","application/vnd.iptc.g2.packageitem+xml",false,"",""]
			,[659,"iana","application/vnd.iptc.g2.planningitem+xml",false,"",""]
			,[660,"iana","application/vnd.ipunplugged.rcprofile",false,"","rcprofile"]
			,[661,"iana","application/vnd.irepository.package+xml",false,"","irp"]
			,[662,"iana","application/vnd.is-xpr",false,"","xpr"]
			,[663,"iana","application/vnd.isac.fcs",false,"","fcs"]
			,[664,"iana","application/vnd.jam",false,"","jam"]
			,[665,"iana","application/vnd.japannet-directory-service",false,"",""]
			,[666,"iana","application/vnd.japannet-jpnstore-wakeup",false,"",""]
			,[667,"iana","application/vnd.japannet-payment-wakeup",false,"",""]
			,[668,"iana","application/vnd.japannet-registration",false,"",""]
			,[669,"iana","application/vnd.japannet-registration-wakeup",false,"",""]
			,[670,"iana","application/vnd.japannet-setstore-wakeup",false,"",""]
			,[671,"iana","application/vnd.japannet-verification",false,"",""]
			,[672,"iana","application/vnd.japannet-verification-wakeup",false,"",""]
			,[673,"iana","application/vnd.jcp.javame.midlet-rms",false,"","rms"]
			,[674,"iana","application/vnd.jisp",false,"","jisp"]
			,[675,"iana","application/vnd.joost.joda-archive",false,"","joda"]
			,[676,"iana","application/vnd.jsk.isdn-ngn",false,"",""]
			,[677,"iana","application/vnd.kahootz",false,"","ktz, ktr"]
			,[678,"iana","application/vnd.kde.karbon",false,"","karbon"]
			,[679,"iana","application/vnd.kde.kchart",false,"","chrt"]
			,[680,"iana","application/vnd.kde.kformula",false,"","kfo"]
			,[681,"iana","application/vnd.kde.kivio",false,"","flw"]
			,[682,"iana","application/vnd.kde.kontour",false,"","kon"]
			,[683,"iana","application/vnd.kde.kpresenter",false,"","kpr, kpt"]
			,[684,"iana","application/vnd.kde.kspread",false,"","ksp"]
			,[685,"iana","application/vnd.kde.kword",false,"","kwd, kwt"]
			,[686,"iana","application/vnd.kenameaapp",false,"","htke"]
			,[687,"iana","application/vnd.kidspiration",false,"","kia"]
			,[688,"iana","application/vnd.kinar",false,"","kne, knp"]
			,[689,"iana","application/vnd.koan",false,"","skp, skd, skt, skm"]
			,[690,"iana","application/vnd.kodak-descriptor",false,"","sse"]
			,[691,"iana","application/vnd.las.las+xml",false,"","lasxml"]
			,[692,"iana","application/vnd.liberty-request+xml",false,"",""]
			,[693,"iana","application/vnd.llamagraphics.life-balance.desktop",false,"","lbd"]
			,[694,"iana","application/vnd.llamagraphics.life-balance.exchange+xml",false,"","lbe"]
			,[695,"iana","application/vnd.lotus-1-2-3",false,"","123"]
			,[696,"iana","application/vnd.lotus-approach",false,"","apr"]
			,[697,"iana","application/vnd.lotus-freelance",false,"","pre"]
			,[698,"iana","application/vnd.lotus-notes",false,"","nsf"]
			,[699,"iana","application/vnd.lotus-organizer",false,"","org"]
			,[700,"iana","application/vnd.lotus-screencam",false,"","scm"]
			,[701,"iana","application/vnd.lotus-wordpro",false,"","lwp"]
			,[702,"iana","application/vnd.macports.portpkg",false,"","portpkg"]
			,[703,"iana","application/vnd.mapbox-vector-tile",false,"",""]
			,[704,"iana","application/vnd.marlin.drm.actiontoken+xml",false,"",""]
			,[705,"iana","application/vnd.marlin.drm.conftoken+xml",false,"",""]
			,[706,"iana","application/vnd.marlin.drm.license+xml",false,"",""]
			,[707,"iana","application/vnd.marlin.drm.mdcf",false,"",""]
			,[708,"iana","application/vnd.mason+json",true,"",""]
			,[709,"iana","application/vnd.maxmind.maxmind-db",false,"",""]
			,[710,"iana","application/vnd.mcd",false,"","mcd"]
			,[711,"iana","application/vnd.medcalcdata",false,"","mc1"]
			,[712,"iana","application/vnd.mediastation.cdkey",false,"","cdkey"]
			,[713,"iana","application/vnd.meridian-slingshot",false,"",""]
			,[714,"iana","application/vnd.mfer",false,"","mwf"]
			,[715,"iana","application/vnd.mfmp",false,"","mfm"]
			,[716,"iana","application/vnd.micro+json",true,"",""]
			,[717,"iana","application/vnd.micrografx.flo",false,"","flo"]
			,[718,"iana","application/vnd.micrografx.igx",false,"","igx"]
			,[719,"iana","application/vnd.microsoft.portable-executable",false,"",""]
			,[720,"iana","application/vnd.miele+json",true,"",""]
			,[721,"iana","application/vnd.mif",false,"","mif"]
			,[722,"iana","application/vnd.minisoft-hp3000-save",false,"",""]
			,[723,"iana","application/vnd.mitsubishi.misty-guard.trustweb",false,"",""]
			,[724,"iana","application/vnd.mobius.daf",false,"","daf"]
			,[725,"iana","application/vnd.mobius.dis",false,"","dis"]
			,[726,"iana","application/vnd.mobius.mbk",false,"","mbk"]
			,[727,"iana","application/vnd.mobius.mqy",false,"","mqy"]
			,[728,"iana","application/vnd.mobius.msl",false,"","msl"]
			,[729,"iana","application/vnd.mobius.plc",false,"","plc"]
			,[730,"iana","application/vnd.mobius.txf",false,"","txf"]
			,[731,"iana","application/vnd.mophun.application",false,"","mpn"]
			,[732,"iana","application/vnd.mophun.certificate",false,"","mpc"]
			,[733,"iana","application/vnd.motorola.flexsuite",false,"",""]
			,[734,"iana","application/vnd.motorola.flexsuite.adsi",false,"",""]
			,[735,"iana","application/vnd.motorola.flexsuite.fis",false,"",""]
			,[736,"iana","application/vnd.motorola.flexsuite.gotap",false,"",""]
			,[737,"iana","application/vnd.motorola.flexsuite.kmr",false,"",""]
			,[738,"iana","application/vnd.motorola.flexsuite.ttc",false,"",""]
			,[739,"iana","application/vnd.motorola.flexsuite.wem",false,"",""]
			,[740,"iana","application/vnd.motorola.iprm",false,"",""]
			,[741,"iana","application/vnd.mozilla.xul+xml",true,"","xul"]
			,[742,"iana","application/vnd.ms-3mfdocument",false,"",""]
			,[743,"iana","application/vnd.ms-artgalry",false,"","cil"]
			,[744,"iana","application/vnd.ms-asf",false,"",""]
			,[745,"iana","application/vnd.ms-cab-compressed",false,"","cab"]
			,[746,"apache","application/vnd.ms-color.iccprofile",false,"",""]
			,[747,"iana","application/vnd.ms-excel",false,"","xls, xlm, xla, xlc, xlt, xlw"]
			,[748,"iana","application/vnd.ms-excel.addin.macroenabled.12",false,"","xlam"]
			,[749,"iana","application/vnd.ms-excel.sheet.binary.macroenabled.12",false,"","xlsb"]
			,[750,"iana","application/vnd.ms-excel.sheet.macroenabled.12",false,"","xlsm"]
			,[751,"iana","application/vnd.ms-excel.template.macroenabled.12",false,"","xltm"]
			,[752,"iana","application/vnd.ms-fontobject",true,"","eot"]
			,[753,"iana","application/vnd.ms-htmlhelp",false,"","chm"]
			,[754,"iana","application/vnd.ms-ims",false,"","ims"]
			,[755,"iana","application/vnd.ms-lrm",false,"","lrm"]
			,[756,"iana","application/vnd.ms-office.activex+xml",false,"",""]
			,[757,"iana","application/vnd.ms-officetheme",false,"","thmx"]
			,[758,"apache","application/vnd.ms-opentype",true,"",""]
			,[759,"apache","application/vnd.ms-package.obfuscated-opentype",false,"",""]
			,[760,"apache","application/vnd.ms-pki.seccat",false,"","cat"]
			,[761,"apache","application/vnd.ms-pki.stl",false,"","stl"]
			,[762,"iana","application/vnd.ms-playready.initiator+xml",false,"",""]
			,[763,"iana","application/vnd.ms-powerpoint",false,"","ppt, pps, pot"]
			,[764,"iana","application/vnd.ms-powerpoint.addin.macroenabled.12",false,"","ppam"]
			,[765,"iana","application/vnd.ms-powerpoint.presentation.macroenabled.12",false,"","pptm"]
			,[766,"iana","application/vnd.ms-powerpoint.slide.macroenabled.12",false,"","sldm"]
			,[767,"iana","application/vnd.ms-powerpoint.slideshow.macroenabled.12",false,"","ppsm"]
			,[768,"iana","application/vnd.ms-powerpoint.template.macroenabled.12",false,"","potm"]
			,[769,"iana","application/vnd.ms-printdevicecapabilities+xml",false,"",""]
			,[770,"apache","application/vnd.ms-printing.printticket+xml",false,"",""]
			,[771,"iana","application/vnd.ms-printschematicket+xml",false,"",""]
			,[772,"iana","application/vnd.ms-project",false,"","mpp, mpt"]
			,[773,"iana","application/vnd.ms-tnef",false,"",""]
			,[774,"iana","application/vnd.ms-windows.devicepairing",false,"",""]
			,[775,"iana","application/vnd.ms-windows.nwprinting.oob",false,"",""]
			,[776,"iana","application/vnd.ms-windows.printerpairing",false,"",""]
			,[777,"iana","application/vnd.ms-windows.wsd.oob",false,"",""]
			,[778,"iana","application/vnd.ms-wmdrm.lic-chlg-req",false,"",""]
			,[779,"iana","application/vnd.ms-wmdrm.lic-resp",false,"",""]
			,[780,"iana","application/vnd.ms-wmdrm.meter-chlg-req",false,"",""]
			,[781,"iana","application/vnd.ms-wmdrm.meter-resp",false,"",""]
			,[782,"iana","application/vnd.ms-word.document.macroenabled.12",false,"","docm"]
			,[783,"iana","application/vnd.ms-word.template.macroenabled.12",false,"","dotm"]
			,[784,"iana","application/vnd.ms-works",false,"","wps, wks, wcm, wdb"]
			,[785,"iana","application/vnd.ms-wpl",false,"","wpl"]
			,[786,"iana","application/vnd.ms-xpsdocument",false,"","xps"]
			,[787,"iana","application/vnd.msa-disk-image",false,"",""]
			,[788,"iana","application/vnd.mseq",false,"","mseq"]
			,[789,"iana","application/vnd.msign",false,"",""]
			,[790,"iana","application/vnd.multiad.creator",false,"",""]
			,[791,"iana","application/vnd.multiad.creator.cif",false,"",""]
			,[792,"iana","application/vnd.music-niff",false,"",""]
			,[793,"iana","application/vnd.musician",false,"","mus"]
			,[794,"iana","application/vnd.muvee.style",false,"","msty"]
			,[795,"iana","application/vnd.mynfc",false,"","taglet"]
			,[796,"iana","application/vnd.ncd.control",false,"",""]
			,[797,"iana","application/vnd.ncd.reference",false,"",""]
			,[798,"iana","application/vnd.nervana",false,"",""]
			,[799,"iana","application/vnd.netfpx",false,"",""]
			,[800,"iana","application/vnd.neurolanguage.nlu",false,"","nlu"]
			,[801,"iana","application/vnd.nintendo.nitro.rom",false,"",""]
			,[802,"iana","application/vnd.nintendo.snes.rom",false,"",""]
			,[803,"iana","application/vnd.nitf",false,"","ntf, nitf"]
			,[804,"iana","application/vnd.noblenet-directory",false,"","nnd"]
			,[805,"iana","application/vnd.noblenet-sealer",false,"","nns"]
			,[806,"iana","application/vnd.noblenet-web",false,"","nnw"]
			,[807,"iana","application/vnd.nokia.catalogs",false,"",""]
			,[808,"iana","application/vnd.nokia.conml+wbxml",false,"",""]
			,[809,"iana","application/vnd.nokia.conml+xml",false,"",""]
			,[810,"iana","application/vnd.nokia.iptv.config+xml",false,"",""]
			,[811,"iana","application/vnd.nokia.isds-radio-presets",false,"",""]
			,[812,"iana","application/vnd.nokia.landmark+wbxml",false,"",""]
			,[813,"iana","application/vnd.nokia.landmark+xml",false,"",""]
			,[814,"iana","application/vnd.nokia.landmarkcollection+xml",false,"",""]
			,[815,"iana","application/vnd.nokia.n-gage.ac+xml",false,"",""]
			,[816,"iana","application/vnd.nokia.n-gage.data",false,"","ngdat"]
			,[817,"iana","application/vnd.nokia.n-gage.symbian.install",false,"","n-gage"]
			,[818,"iana","application/vnd.nokia.ncd",false,"",""]
			,[819,"iana","application/vnd.nokia.pcd+wbxml",false,"",""]
			,[820,"iana","application/vnd.nokia.pcd+xml",false,"",""]
			,[821,"iana","application/vnd.nokia.radio-preset",false,"","rpst"]
			,[822,"iana","application/vnd.nokia.radio-presets",false,"","rpss"]
			,[823,"iana","application/vnd.novadigm.edm",false,"","edm"]
			,[824,"iana","application/vnd.novadigm.edx",false,"","edx"]
			,[825,"iana","application/vnd.novadigm.ext",false,"","ext"]
			,[826,"iana","application/vnd.ntt-local.content-share",false,"",""]
			,[827,"iana","application/vnd.ntt-local.file-transfer",false,"",""]
			,[828,"iana","application/vnd.ntt-local.ogw_remote-access",false,"",""]
			,[829,"iana","application/vnd.ntt-local.sip-ta_remote",false,"",""]
			,[830,"iana","application/vnd.ntt-local.sip-ta_tcp_stream",false,"",""]
			,[831,"iana","application/vnd.oasis.opendocument.chart",false,"","odc"]
			,[832,"iana","application/vnd.oasis.opendocument.chart-template",false,"","otc"]
			,[833,"iana","application/vnd.oasis.opendocument.database",false,"","odb"]
			,[834,"iana","application/vnd.oasis.opendocument.formula",false,"","odf"]
			,[835,"iana","application/vnd.oasis.opendocument.formula-template",false,"","odft"]
			,[836,"iana","application/vnd.oasis.opendocument.graphics",false,"","odg"]
			,[837,"iana","application/vnd.oasis.opendocument.graphics-template",false,"","otg"]
			,[838,"iana","application/vnd.oasis.opendocument.image",false,"","odi"]
			,[839,"iana","application/vnd.oasis.opendocument.image-template",false,"","oti"]
			,[840,"iana","application/vnd.oasis.opendocument.presentation",false,"","odp"]
			,[841,"iana","application/vnd.oasis.opendocument.presentation-template",false,"","otp"]
			,[842,"iana","application/vnd.oasis.opendocument.spreadsheet",false,"","ods"]
			,[843,"iana","application/vnd.oasis.opendocument.spreadsheet-template",false,"","ots"]
			,[844,"iana","application/vnd.oasis.opendocument.text",false,"","odt"]
			,[845,"iana","application/vnd.oasis.opendocument.text-master",false,"","odm"]
			,[846,"iana","application/vnd.oasis.opendocument.text-template",false,"","ott"]
			,[847,"iana","application/vnd.oasis.opendocument.text-web",false,"","oth"]
			,[848,"iana","application/vnd.obn",false,"",""]
			,[849,"iana","application/vnd.oftn.l10n+json",true,"",""]
			,[850,"iana","application/vnd.oipf.contentaccessdownload+xml",false,"",""]
			,[851,"iana","application/vnd.oipf.contentaccessstreaming+xml",false,"",""]
			,[852,"iana","application/vnd.oipf.cspg-hexbinary",false,"",""]
			,[853,"iana","application/vnd.oipf.dae.svg+xml",false,"",""]
			,[854,"iana","application/vnd.oipf.dae.xhtml+xml",false,"",""]
			,[855,"iana","application/vnd.oipf.mippvcontrolmessage+xml",false,"",""]
			,[856,"iana","application/vnd.oipf.pae.gem",false,"",""]
			,[857,"iana","application/vnd.oipf.spdiscovery+xml",false,"",""]
			,[858,"iana","application/vnd.oipf.spdlist+xml",false,"",""]
			,[859,"iana","application/vnd.oipf.ueprofile+xml",false,"",""]
			,[860,"iana","application/vnd.oipf.userprofile+xml",false,"",""]
			,[861,"iana","application/vnd.olpc-sugar",false,"","xo"]
			,[862,"iana","application/vnd.oma-scws-config",false,"",""]
			,[863,"iana","application/vnd.oma-scws-http-request",false,"",""]
			,[864,"iana","application/vnd.oma-scws-http-response",false,"",""]
			,[865,"iana","application/vnd.oma.bcast.associated-procedure-parameter+xml",false,"",""]
			,[866,"iana","application/vnd.oma.bcast.drm-trigger+xml",false,"",""]
			,[867,"iana","application/vnd.oma.bcast.imd+xml",false,"",""]
			,[868,"iana","application/vnd.oma.bcast.ltkm",false,"",""]
			,[869,"iana","application/vnd.oma.bcast.notification+xml",false,"",""]
			,[870,"iana","application/vnd.oma.bcast.provisioningtrigger",false,"",""]
			,[871,"iana","application/vnd.oma.bcast.sgboot",false,"",""]
			,[872,"iana","application/vnd.oma.bcast.sgdd+xml",false,"",""]
			,[873,"iana","application/vnd.oma.bcast.sgdu",false,"",""]
			,[874,"iana","application/vnd.oma.bcast.simple-symbol-container",false,"",""]
			,[875,"iana","application/vnd.oma.bcast.smartcard-trigger+xml",false,"",""]
			,[876,"iana","application/vnd.oma.bcast.sprov+xml",false,"",""]
			,[877,"iana","application/vnd.oma.bcast.stkm",false,"",""]
			,[878,"iana","application/vnd.oma.cab-address-book+xml",false,"",""]
			,[879,"iana","application/vnd.oma.cab-feature-handler+xml",false,"",""]
			,[880,"iana","application/vnd.oma.cab-pcc+xml",false,"",""]
			,[881,"iana","application/vnd.oma.cab-subs-invite+xml",false,"",""]
			,[882,"iana","application/vnd.oma.cab-user-prefs+xml",false,"",""]
			,[883,"iana","application/vnd.oma.dcd",false,"",""]
			,[884,"iana","application/vnd.oma.dcdc",false,"",""]
			,[885,"iana","application/vnd.oma.dd2+xml",false,"","dd2"]
			,[886,"iana","application/vnd.oma.drm.risd+xml",false,"",""]
			,[887,"iana","application/vnd.oma.group-usage-list+xml",false,"",""]
			,[888,"iana","application/vnd.oma.pal+xml",false,"",""]
			,[889,"iana","application/vnd.oma.poc.detailed-progress-report+xml",false,"",""]
			,[890,"iana","application/vnd.oma.poc.final-report+xml",false,"",""]
			,[891,"iana","application/vnd.oma.poc.groups+xml",false,"",""]
			,[892,"iana","application/vnd.oma.poc.invocation-descriptor+xml",false,"",""]
			,[893,"iana","application/vnd.oma.poc.optimized-progress-report+xml",false,"",""]
			,[894,"iana","application/vnd.oma.push",false,"",""]
			,[895,"iana","application/vnd.oma.scidm.messages+xml",false,"",""]
			,[896,"iana","application/vnd.oma.xcap-directory+xml",false,"",""]
			,[897,"iana","application/vnd.omads-email+xml",false,"",""]
			,[898,"iana","application/vnd.omads-file+xml",false,"",""]
			,[899,"iana","application/vnd.omads-folder+xml",false,"",""]
			,[900,"iana","application/vnd.omaloc-supl-init",false,"",""]
			,[901,"iana","application/vnd.onepager",false,"",""]
			,[902,"iana","application/vnd.openblox.game+xml",false,"",""]
			,[903,"iana","application/vnd.openblox.game-binary",false,"",""]
			,[904,"iana","application/vnd.openeye.oeb",false,"",""]
			,[905,"apache","application/vnd.openofficeorg.extension",false,"","oxt"]
			,[906,"iana","application/vnd.openxmlformats-officedocument.custom-properties+xml",false,"",""]
			,[907,"iana","application/vnd.openxmlformats-officedocument.customxmlproperties+xml",false,"",""]
			,[908,"iana","application/vnd.openxmlformats-officedocument.drawing+xml",false,"",""]
			,[909,"iana","application/vnd.openxmlformats-officedocument.drawingml.chart+xml",false,"",""]
			,[910,"iana","application/vnd.openxmlformats-officedocument.drawingml.chartshapes+xml",false,"",""]
			,[911,"iana","application/vnd.openxmlformats-officedocument.drawingml.diagramcolors+xml",false,"",""]
			,[912,"iana","application/vnd.openxmlformats-officedocument.drawingml.diagramdata+xml",false,"",""]
			,[913,"iana","application/vnd.openxmlformats-officedocument.drawingml.diagramlayout+xml",false,"",""]
			,[914,"iana","application/vnd.openxmlformats-officedocument.drawingml.diagramstyle+xml",false,"",""]
			,[915,"iana","application/vnd.openxmlformats-officedocument.extended-properties+xml",false,"",""]
			,[916,"iana","application/vnd.openxmlformats-officedocument.presentationml-template",false,"",""]
			,[917,"iana","application/vnd.openxmlformats-officedocument.presentationml.commentauthors+xml",false,"",""]
			,[918,"iana","application/vnd.openxmlformats-officedocument.presentationml.comments+xml",false,"",""]
			,[919,"iana","application/vnd.openxmlformats-officedocument.presentationml.handoutmaster+xml",false,"",""]
			,[920,"iana","application/vnd.openxmlformats-officedocument.presentationml.notesmaster+xml",false,"",""]
			,[921,"iana","application/vnd.openxmlformats-officedocument.presentationml.notesslide+xml",false,"",""]
			,[922,"iana","application/vnd.openxmlformats-officedocument.presentationml.presentation",false,"","pptx"]
			,[923,"iana","application/vnd.openxmlformats-officedocument.presentationml.presentation.main+xml",false,"",""]
			,[924,"iana","application/vnd.openxmlformats-officedocument.presentationml.presprops+xml",false,"",""]
			,[925,"iana","application/vnd.openxmlformats-officedocument.presentationml.slide",false,"","sldx"]
			,[926,"iana","application/vnd.openxmlformats-officedocument.presentationml.slide+xml",false,"",""]
			,[927,"iana","application/vnd.openxmlformats-officedocument.presentationml.slidelayout+xml",false,"",""]
			,[928,"iana","application/vnd.openxmlformats-officedocument.presentationml.slidemaster+xml",false,"",""]
			,[929,"iana","application/vnd.openxmlformats-officedocument.presentationml.slideshow",false,"","ppsx"]
			,[930,"iana","application/vnd.openxmlformats-officedocument.presentationml.slideshow.main+xml",false,"",""]
			,[931,"iana","application/vnd.openxmlformats-officedocument.presentationml.slideupdateinfo+xml",false,"",""]
			,[932,"iana","application/vnd.openxmlformats-officedocument.presentationml.tablestyles+xml",false,"",""]
			,[933,"iana","application/vnd.openxmlformats-officedocument.presentationml.tags+xml",false,"",""]
			,[934,"apache","application/vnd.openxmlformats-officedocument.presentationml.template",false,"","potx"]
			,[935,"iana","application/vnd.openxmlformats-officedocument.presentationml.template.main+xml",false,"",""]
			,[936,"iana","application/vnd.openxmlformats-officedocument.presentationml.viewprops+xml",false,"",""]
			,[937,"iana","application/vnd.openxmlformats-officedocument.spreadsheetml-template",false,"",""]
			,[938,"iana","application/vnd.openxmlformats-officedocument.spreadsheetml.calcchain+xml",false,"",""]
			,[939,"iana","application/vnd.openxmlformats-officedocument.spreadsheetml.chartsheet+xml",false,"",""]
			,[940,"iana","application/vnd.openxmlformats-officedocument.spreadsheetml.comments+xml",false,"",""]
			,[941,"iana","application/vnd.openxmlformats-officedocument.spreadsheetml.connections+xml",false,"",""]
			,[942,"iana","application/vnd.openxmlformats-officedocument.spreadsheetml.dialogsheet+xml",false,"",""]
			,[943,"iana","application/vnd.openxmlformats-officedocument.spreadsheetml.externallink+xml",false,"",""]
			,[944,"iana","application/vnd.openxmlformats-officedocument.spreadsheetml.pivotcachedefinition+xml",false,"",""]
			,[945,"iana","application/vnd.openxmlformats-officedocument.spreadsheetml.pivotcacherecords+xml",false,"",""]
			,[946,"iana","application/vnd.openxmlformats-officedocument.spreadsheetml.pivottable+xml",false,"",""]
			,[947,"iana","application/vnd.openxmlformats-officedocument.spreadsheetml.querytable+xml",false,"",""]
			,[948,"iana","application/vnd.openxmlformats-officedocument.spreadsheetml.revisionheaders+xml",false,"",""]
			,[949,"iana","application/vnd.openxmlformats-officedocument.spreadsheetml.revisionlog+xml",false,"",""]
			,[950,"iana","application/vnd.openxmlformats-officedocument.spreadsheetml.sharedstrings+xml",false,"",""]
			,[951,"iana","application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",false,"","xlsx"]
			,[952,"iana","application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml",false,"",""]
			,[953,"iana","application/vnd.openxmlformats-officedocument.spreadsheetml.sheetmetadata+xml",false,"",""]
			,[954,"iana","application/vnd.openxmlformats-officedocument.spreadsheetml.styles+xml",false,"",""]
			,[955,"iana","application/vnd.openxmlformats-officedocument.spreadsheetml.table+xml",false,"",""]
			,[956,"iana","application/vnd.openxmlformats-officedocument.spreadsheetml.tablesinglecells+xml",false,"",""]
			,[957,"apache","application/vnd.openxmlformats-officedocument.spreadsheetml.template",false,"","xltx"]
			,[958,"iana","application/vnd.openxmlformats-officedocument.spreadsheetml.template.main+xml",false,"",""]
			,[959,"iana","application/vnd.openxmlformats-officedocument.spreadsheetml.usernames+xml",false,"",""]
			,[960,"iana","application/vnd.openxmlformats-officedocument.spreadsheetml.volatiledependencies+xml",false,"",""]
			,[961,"iana","application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml",false,"",""]
			,[962,"iana","application/vnd.openxmlformats-officedocument.theme+xml",false,"",""]
			,[963,"iana","application/vnd.openxmlformats-officedocument.themeoverride+xml",false,"",""]
			,[964,"iana","application/vnd.openxmlformats-officedocument.vmldrawing",false,"",""]
			,[965,"iana","application/vnd.openxmlformats-officedocument.wordprocessingml-template",false,"",""]
			,[966,"iana","application/vnd.openxmlformats-officedocument.wordprocessingml.comments+xml",false,"",""]
			,[967,"iana","application/vnd.openxmlformats-officedocument.wordprocessingml.document",false,"","docx"]
			,[968,"iana","application/vnd.openxmlformats-officedocument.wordprocessingml.document.glossary+xml",false,"",""]
			,[969,"iana","application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml",false,"",""]
			,[970,"iana","application/vnd.openxmlformats-officedocument.wordprocessingml.endnotes+xml",false,"",""]
			,[971,"iana","application/vnd.openxmlformats-officedocument.wordprocessingml.fonttable+xml",false,"",""]
			,[972,"iana","application/vnd.openxmlformats-officedocument.wordprocessingml.footer+xml",false,"",""]
			,[973,"iana","application/vnd.openxmlformats-officedocument.wordprocessingml.footnotes+xml",false,"",""]
			,[974,"iana","application/vnd.openxmlformats-officedocument.wordprocessingml.numbering+xml",false,"",""]
			,[975,"iana","application/vnd.openxmlformats-officedocument.wordprocessingml.settings+xml",false,"",""]
			,[976,"iana","application/vnd.openxmlformats-officedocument.wordprocessingml.styles+xml",false,"",""]
			,[977,"apache","application/vnd.openxmlformats-officedocument.wordprocessingml.template",false,"","dotx"]
			,[978,"iana","application/vnd.openxmlformats-officedocument.wordprocessingml.template.main+xml",false,"",""]
			,[979,"iana","application/vnd.openxmlformats-officedocument.wordprocessingml.websettings+xml",false,"",""]
			,[980,"iana","application/vnd.openxmlformats-package.core-properties+xml",false,"",""]
			,[981,"iana","application/vnd.openxmlformats-package.digital-signature-xmlsignature+xml",false,"",""]
			,[982,"iana","application/vnd.openxmlformats-package.relationships+xml",false,"",""]
			,[983,"iana","application/vnd.oracle.resource+json",true,"",""]
			,[984,"iana","application/vnd.orange.indata",false,"",""]
			,[985,"iana","application/vnd.osa.netdeploy",false,"",""]
			,[986,"iana","application/vnd.osgeo.mapguide.package",false,"","mgp"]
			,[987,"iana","application/vnd.osgi.bundle",false,"",""]
			,[988,"iana","application/vnd.osgi.dp",false,"","dp"]
			,[989,"iana","application/vnd.osgi.subsystem",false,"","esa"]
			,[990,"iana","application/vnd.otps.ct-kip+xml",false,"",""]
			,[991,"iana","application/vnd.oxli.countgraph",false,"",""]
			,[992,"iana","application/vnd.pagerduty+json",true,"",""]
			,[993,"iana","application/vnd.palm",false,"","pdb, pqa, oprc"]
			,[994,"iana","application/vnd.panoply",false,"",""]
			,[995,"iana","application/vnd.paos+xml",false,"",""]
			,[996,"apache","application/vnd.paos.xml",false,"",""]
			,[997,"iana","application/vnd.pawaafile",false,"","paw"]
			,[998,"iana","application/vnd.pcos",false,"",""]
			,[999,"iana","application/vnd.pg.format",false,"","str"]
			,[1000,"iana","application/vnd.pg.osasli",false,"","ei6"]
			,[1001,"iana","application/vnd.piaccess.application-licence",false,"",""]
			,[1002,"iana","application/vnd.picsel",false,"","efif"]
			,[1003,"iana","application/vnd.pmi.widget",false,"","wg"]
			,[1004,"iana","application/vnd.poc.group-advertisement+xml",false,"",""]
			,[1005,"iana","application/vnd.pocketlearn",false,"","plf"]
			,[1006,"iana","application/vnd.powerbuilder6",false,"","pbd"]
			,[1007,"iana","application/vnd.powerbuilder6-s",false,"",""]
			,[1008,"iana","application/vnd.powerbuilder7",false,"",""]
			,[1009,"iana","application/vnd.powerbuilder7-s",false,"",""]
			,[1010,"iana","application/vnd.powerbuilder75",false,"",""]
			,[1011,"iana","application/vnd.powerbuilder75-s",false,"",""]
			,[1012,"iana","application/vnd.preminet",false,"",""]
			,[1013,"iana","application/vnd.previewsystems.box",false,"","box"]
			,[1014,"iana","application/vnd.proteus.magazine",false,"","mgz"]
			,[1015,"iana","application/vnd.publishare-delta-tree",false,"","qps"]
			,[1016,"iana","application/vnd.pvi.ptid1",false,"","ptid"]
			,[1017,"iana","application/vnd.pwg-multiplexed",false,"",""]
			,[1018,"iana","application/vnd.pwg-xhtml-print+xml",false,"",""]
			,[1019,"iana","application/vnd.qualcomm.brew-app-res",false,"",""]
			,[1020,"iana","application/vnd.quark.quarkxpress",false,"","qxd, qxt, qwd, qwt, qxl, qxb"]
			,[1021,"iana","application/vnd.quobject-quoxdocument",false,"",""]
			,[1022,"iana","application/vnd.radisys.moml+xml",false,"",""]
			,[1023,"iana","application/vnd.radisys.msml+xml",false,"",""]
			,[1024,"iana","application/vnd.radisys.msml-audit+xml",false,"",""]
			,[1025,"iana","application/vnd.radisys.msml-audit-conf+xml",false,"",""]
			,[1026,"iana","application/vnd.radisys.msml-audit-conn+xml",false,"",""]
			,[1027,"iana","application/vnd.radisys.msml-audit-dialog+xml",false,"",""]
			,[1028,"iana","application/vnd.radisys.msml-audit-stream+xml",false,"",""]
			,[1029,"iana","application/vnd.radisys.msml-conf+xml",false,"",""]
			,[1030,"iana","application/vnd.radisys.msml-dialog+xml",false,"",""]
			,[1031,"iana","application/vnd.radisys.msml-dialog-base+xml",false,"",""]
			,[1032,"iana","application/vnd.radisys.msml-dialog-fax-detect+xml",false,"",""]
			,[1033,"iana","application/vnd.radisys.msml-dialog-fax-sendrecv+xml",false,"",""]
			,[1034,"iana","application/vnd.radisys.msml-dialog-group+xml",false,"",""]
			,[1035,"iana","application/vnd.radisys.msml-dialog-speech+xml",false,"",""]
			,[1036,"iana","application/vnd.radisys.msml-dialog-transform+xml",false,"",""]
			,[1037,"iana","application/vnd.rainstor.data",false,"",""]
			,[1038,"iana","application/vnd.rapid",false,"",""]
			,[1039,"iana","application/vnd.realvnc.bed",false,"","bed"]
			,[1040,"iana","application/vnd.recordare.musicxml",false,"","mxl"]
			,[1041,"iana","application/vnd.recordare.musicxml+xml",false,"","musicxml"]
			,[1042,"iana","application/vnd.renlearn.rlprint",false,"",""]
			,[1043,"iana","application/vnd.rig.cryptonote",false,"","cryptonote"]
			,[1044,"apache","application/vnd.rim.cod",false,"","cod"]
			,[1045,"apache","application/vnd.rn-realmedia",false,"","rm"]
			,[1046,"apache","application/vnd.rn-realmedia-vbr",false,"","rmvb"]
			,[1047,"iana","application/vnd.route66.link66+xml",false,"","link66"]
			,[1048,"iana","application/vnd.rs-274x",false,"",""]
			,[1049,"iana","application/vnd.ruckus.download",false,"",""]
			,[1050,"iana","application/vnd.s3sms",false,"",""]
			,[1051,"iana","application/vnd.sailingtracker.track",false,"","st"]
			,[1052,"iana","application/vnd.sbm.cid",false,"",""]
			,[1053,"iana","application/vnd.sbm.mid2",false,"",""]
			,[1054,"iana","application/vnd.scribus",false,"",""]
			,[1055,"iana","application/vnd.sealed.3df",false,"",""]
			,[1056,"iana","application/vnd.sealed.csf",false,"",""]
			,[1057,"iana","application/vnd.sealed.doc",false,"",""]
			,[1058,"iana","application/vnd.sealed.eml",false,"",""]
			,[1059,"iana","application/vnd.sealed.mht",false,"",""]
			,[1060,"iana","application/vnd.sealed.net",false,"",""]
			,[1061,"iana","application/vnd.sealed.ppt",false,"",""]
			,[1062,"iana","application/vnd.sealed.tiff",false,"",""]
			,[1063,"iana","application/vnd.sealed.xls",false,"",""]
			,[1064,"iana","application/vnd.sealedmedia.softseal.html",false,"",""]
			,[1065,"iana","application/vnd.sealedmedia.softseal.pdf",false,"",""]
			,[1066,"iana","application/vnd.seemail",false,"","see"]
			,[1067,"iana","application/vnd.sema",false,"","sema"]
			,[1068,"iana","application/vnd.semd",false,"","semd"]
			,[1069,"iana","application/vnd.semf",false,"","semf"]
			,[1070,"iana","application/vnd.shana.informed.formdata",false,"","ifm"]
			,[1071,"iana","application/vnd.shana.informed.formtemplate",false,"","itp"]
			,[1072,"iana","application/vnd.shana.informed.interchange",false,"","iif"]
			,[1073,"iana","application/vnd.shana.informed.package",false,"","ipk"]
			,[1074,"iana","application/vnd.simtech-mindmapper",false,"","twd, twds"]
			,[1075,"iana","application/vnd.siren+json",true,"",""]
			,[1076,"iana","application/vnd.smaf",false,"","mmf"]
			,[1077,"iana","application/vnd.smart.notebook",false,"",""]
			,[1078,"iana","application/vnd.smart.teacher",false,"","teacher"]
			,[1079,"iana","application/vnd.software602.filler.form+xml",false,"",""]
			,[1080,"iana","application/vnd.software602.filler.form-xml-zip",false,"",""]
			,[1081,"iana","application/vnd.solent.sdkm+xml",false,"","sdkm, sdkd"]
			,[1082,"iana","application/vnd.spotfire.dxp",false,"","dxp"]
			,[1083,"iana","application/vnd.spotfire.sfs",false,"","sfs"]
			,[1084,"iana","application/vnd.sss-cod",false,"",""]
			,[1085,"iana","application/vnd.sss-dtf",false,"",""]
			,[1086,"iana","application/vnd.sss-ntf",false,"",""]
			,[1087,"apache","application/vnd.stardivision.calc",false,"","sdc"]
			,[1088,"apache","application/vnd.stardivision.draw",false,"","sda"]
			,[1089,"apache","application/vnd.stardivision.impress",false,"","sdd"]
			,[1090,"apache","application/vnd.stardivision.math",false,"","smf"]
			,[1091,"apache","application/vnd.stardivision.writer",false,"","sdw, vor"]
			,[1092,"apache","application/vnd.stardivision.writer-global",false,"","sgl"]
			,[1093,"iana","application/vnd.stepmania.package",false,"","smzip"]
			,[1094,"iana","application/vnd.stepmania.stepchart",false,"","sm"]
			,[1095,"iana","application/vnd.street-stream",false,"",""]
			,[1096,"iana","application/vnd.sun.wadl+xml",false,"",""]
			,[1097,"apache","application/vnd.sun.xml.calc",false,"","sxc"]
			,[1098,"apache","application/vnd.sun.xml.calc.template",false,"","stc"]
			,[1099,"apache","application/vnd.sun.xml.draw",false,"","sxd"]
			,[1100,"apache","application/vnd.sun.xml.draw.template",false,"","std"]
			,[1101,"apache","application/vnd.sun.xml.impress",false,"","sxi"]
			,[1102,"apache","application/vnd.sun.xml.impress.template",false,"","sti"]
			,[1103,"apache","application/vnd.sun.xml.math",false,"","sxm"]
			,[1104,"apache","application/vnd.sun.xml.writer",false,"","sxw"]
			,[1105,"apache","application/vnd.sun.xml.writer.global",false,"","sxg"]
			,[1106,"apache","application/vnd.sun.xml.writer.template",false,"","stw"]
			,[1107,"iana","application/vnd.sus-calendar",false,"","sus, susp"]
			,[1108,"iana","application/vnd.svd",false,"","svd"]
			,[1109,"iana","application/vnd.swiftview-ics",false,"",""]
			,[1110,"apache","application/vnd.symbian.install",false,"","sis, sisx"]
			,[1111,"iana","application/vnd.syncml+xml",false,"","xsm"]
			,[1112,"iana","application/vnd.syncml.dm+wbxml",false,"","bdm"]
			,[1113,"iana","application/vnd.syncml.dm+xml",false,"","xdm"]
			,[1114,"iana","application/vnd.syncml.dm.notification",false,"",""]
			,[1115,"iana","application/vnd.syncml.dmddf+wbxml",false,"",""]
			,[1116,"iana","application/vnd.syncml.dmddf+xml",false,"",""]
			,[1117,"iana","application/vnd.syncml.dmtnds+wbxml",false,"",""]
			,[1118,"iana","application/vnd.syncml.dmtnds+xml",false,"",""]
			,[1119,"iana","application/vnd.syncml.ds.notification",false,"",""]
			,[1120,"iana","application/vnd.tao.intent-module-archive",false,"","tao"]
			,[1121,"iana","application/vnd.tcpdump.pcap",false,"","pcap, cap, dmp"]
			,[1122,"iana","application/vnd.tmd.mediaflex.api+xml",false,"",""]
			,[1123,"iana","application/vnd.tml",false,"",""]
			,[1124,"iana","application/vnd.tmobile-livetv",false,"","tmo"]
			,[1125,"iana","application/vnd.trid.tpt",false,"","tpt"]
			,[1126,"iana","application/vnd.triscape.mxs",false,"","mxs"]
			,[1127,"iana","application/vnd.trueapp",false,"","tra"]
			,[1128,"iana","application/vnd.truedoc",false,"",""]
			,[1129,"iana","application/vnd.ubisoft.webplayer",false,"",""]
			,[1130,"iana","application/vnd.ufdl",false,"","ufd, ufdl"]
			,[1131,"iana","application/vnd.uiq.theme",false,"","utz"]
			,[1132,"iana","application/vnd.umajin",false,"","umj"]
			,[1133,"iana","application/vnd.unity",false,"","unityweb"]
			,[1134,"iana","application/vnd.uoml+xml",false,"","uoml"]
			,[1135,"iana","application/vnd.uplanet.alert",false,"",""]
			,[1136,"iana","application/vnd.uplanet.alert-wbxml",false,"",""]
			,[1137,"iana","application/vnd.uplanet.bearer-choice",false,"",""]
			,[1138,"iana","application/vnd.uplanet.bearer-choice-wbxml",false,"",""]
			,[1139,"iana","application/vnd.uplanet.cacheop",false,"",""]
			,[1140,"iana","application/vnd.uplanet.cacheop-wbxml",false,"",""]
			,[1141,"iana","application/vnd.uplanet.channel",false,"",""]
			,[1142,"iana","application/vnd.uplanet.channel-wbxml",false,"",""]
			,[1143,"iana","application/vnd.uplanet.list",false,"",""]
			,[1144,"iana","application/vnd.uplanet.list-wbxml",false,"",""]
			,[1145,"iana","application/vnd.uplanet.listcmd",false,"",""]
			,[1146,"iana","application/vnd.uplanet.listcmd-wbxml",false,"",""]
			,[1147,"iana","application/vnd.uplanet.signal",false,"",""]
			,[1148,"iana","application/vnd.uri-map",false,"",""]
			,[1149,"iana","application/vnd.valve.source.material",false,"",""]
			,[1150,"iana","application/vnd.vcx",false,"","vcx"]
			,[1151,"iana","application/vnd.vd-study",false,"",""]
			,[1152,"iana","application/vnd.vectorworks",false,"",""]
			,[1153,"iana","application/vnd.vel+json",true,"",""]
			,[1154,"iana","application/vnd.verimatrix.vcas",false,"",""]
			,[1155,"iana","application/vnd.vidsoft.vidconference",false,"",""]
			,[1156,"iana","application/vnd.visio",false,"","vsd, vst, vss, vsw"]
			,[1157,"iana","application/vnd.visionary",false,"","vis"]
			,[1158,"iana","application/vnd.vividence.scriptfile",false,"",""]
			,[1159,"iana","application/vnd.vsf",false,"","vsf"]
			,[1160,"iana","application/vnd.wap.sic",false,"",""]
			,[1161,"iana","application/vnd.wap.slc",false,"",""]
			,[1162,"iana","application/vnd.wap.wbxml",false,"","wbxml"]
			,[1163,"iana","application/vnd.wap.wmlc",false,"","wmlc"]
			,[1164,"iana","application/vnd.wap.wmlscriptc",false,"","wmlsc"]
			,[1165,"iana","application/vnd.webturbo",false,"","wtb"]
			,[1166,"iana","application/vnd.wfa.p2p",false,"",""]
			,[1167,"iana","application/vnd.wfa.wsc",false,"",""]
			,[1168,"iana","application/vnd.windows.devicepairing",false,"",""]
			,[1169,"iana","application/vnd.wmc",false,"",""]
			,[1170,"iana","application/vnd.wmf.bootstrap",false,"",""]
			,[1171,"iana","application/vnd.wolfram.mathematica",false,"",""]
			,[1172,"iana","application/vnd.wolfram.mathematica.package",false,"",""]
			,[1173,"iana","application/vnd.wolfram.player",false,"","nbp"]
			,[1174,"iana","application/vnd.wordperfect",false,"","wpd"]
			,[1175,"iana","application/vnd.wqd",false,"","wqd"]
			,[1176,"iana","application/vnd.wrq-hp3000-labelled",false,"",""]
			,[1177,"iana","application/vnd.wt.stf",false,"","stf"]
			,[1178,"iana","application/vnd.wv.csp+wbxml",false,"",""]
			,[1179,"iana","application/vnd.wv.csp+xml",false,"",""]
			,[1180,"iana","application/vnd.wv.ssp+xml",false,"",""]
			,[1181,"iana","application/vnd.xacml+json",true,"",""]
			,[1182,"iana","application/vnd.xara",false,"","xar"]
			,[1183,"iana","application/vnd.xfdl",false,"","xfdl"]
			,[1184,"iana","application/vnd.xfdl.webform",false,"",""]
			,[1185,"iana","application/vnd.xmi+xml",false,"",""]
			,[1186,"iana","application/vnd.xmpie.cpkg",false,"",""]
			,[1187,"iana","application/vnd.xmpie.dpkg",false,"",""]
			,[1188,"iana","application/vnd.xmpie.plan",false,"",""]
			,[1189,"iana","application/vnd.xmpie.ppkg",false,"",""]
			,[1190,"iana","application/vnd.xmpie.xlim",false,"",""]
			,[1191,"iana","application/vnd.yamaha.hv-dic",false,"","hvd"]
			,[1192,"iana","application/vnd.yamaha.hv-script",false,"","hvs"]
			,[1193,"iana","application/vnd.yamaha.hv-voice",false,"","hvp"]
			,[1194,"iana","application/vnd.yamaha.openscoreformat",false,"","osf"]
			,[1195,"iana","application/vnd.yamaha.openscoreformat.osfpvg+xml",false,"","osfpvg"]
			,[1196,"iana","application/vnd.yamaha.remote-setup",false,"",""]
			,[1197,"iana","application/vnd.yamaha.smaf-audio",false,"","saf"]
			,[1198,"iana","application/vnd.yamaha.smaf-phrase",false,"","spf"]
			,[1199,"iana","application/vnd.yamaha.through-ngn",false,"",""]
			,[1200,"iana","application/vnd.yamaha.tunnel-udpencap",false,"",""]
			,[1201,"iana","application/vnd.yaoweme",false,"",""]
			,[1202,"iana","application/vnd.yellowriver-custom-menu",false,"","cmp"]
			,[1203,"iana","application/vnd.zul",false,"","zir, zirz"]
			,[1204,"iana","application/vnd.zzazz.deck+xml",false,"","zaz"]
			,[1205,"iana","application/voicexml+xml",false,"","vxml"]
			,[1206,"iana","application/vq-rtcpxr",false,"",""]
			,[1207,"iana","application/watcherinfo+xml",false,"",""]
			,[1208,"iana","application/whoispp-query",false,"",""]
			,[1209,"iana","application/whoispp-response",false,"",""]
			,[1210,"iana","application/widget",false,"","wgt"]
			,[1211,"apache","application/winhlp",false,"","hlp"]
			,[1212,"iana","application/wita",false,"",""]
			,[1213,"iana","application/wordperfect5.1",false,"",""]
			,[1214,"iana","application/wsdl+xml",false,"","wsdl"]
			,[1215,"iana","application/wspolicy+xml",false,"","wspolicy"]
			,[1216,"apache","application/x-7z-compressed",false,"","7z"]
			,[1217,"apache","application/x-abiword",false,"","abw"]
			,[1218,"apache","application/x-ace-compressed",false,"","ace"]
			,[1219,"apache","application/x-amf",false,"",""]
			,[1220,"apache","application/x-apple-diskimage",false,"","dmg"]
			,[1221,"apache","application/x-authorware-bin",false,"","aab, x32, u32, vox"]
			,[1222,"apache","application/x-authorware-map",false,"","aam"]
			,[1223,"apache","application/x-authorware-seg",false,"","aas"]
			,[1224,"apache","application/x-bcpio",false,"","bcpio"]
			,[1225,"","application/x-bdoc",false,"","bdoc"]
			,[1226,"apache","application/x-bittorrent",false,"","torrent"]
			,[1227,"apache","application/x-blorb",false,"","blb, blorb"]
			,[1228,"apache","application/x-bzip",false,"","bz"]
			,[1229,"apache","application/x-bzip2",false,"","bz2, boz"]
			,[1230,"apache","application/x-cbr",false,"","cbr, cba, cbt, cbz, cb7"]
			,[1231,"apache","application/x-cdlink",false,"","vcd"]
			,[1232,"apache","application/x-cfs-compressed",false,"","cfs"]
			,[1233,"apache","application/x-chat",false,"","chat"]
			,[1234,"apache","application/x-chess-pgn",false,"","pgn"]
			,[1235,"","application/x-chrome-extension",false,"","crx"]
			,[1236,"nginx","application/x-cocoa",false,"","cco"]
			,[1237,"apache","application/x-compress",false,"",""]
			,[1238,"apache","application/x-conference",false,"","nsc"]
			,[1239,"apache","application/x-cpio",false,"","cpio"]
			,[1240,"apache","application/x-csh",false,"","csh"]
			,[1241,"","application/x-deb",false,"",""]
			,[1242,"apache","application/x-debian-package",false,"","deb, udeb"]
			,[1243,"apache","application/x-dgc-compressed",false,"","dgc"]
			,[1244,"apache","application/x-director",false,"","dir, dcr, dxr, cst, cct, cxt, w3d, fgd, swa"]
			,[1245,"apache","application/x-doom",false,"","wad"]
			,[1246,"apache","application/x-dtbncx+xml",false,"","ncx"]
			,[1247,"apache","application/x-dtbook+xml",false,"","dtb"]
			,[1248,"apache","application/x-dtbresource+xml",false,"","res"]
			,[1249,"apache","application/x-dvi",false,"","dvi"]
			,[1250,"apache","application/x-envoy",false,"","evy"]
			,[1251,"apache","application/x-eva",false,"","eva"]
			,[1252,"apache","application/x-font-bdf",false,"","bdf"]
			,[1253,"apache","application/x-font-dos",false,"",""]
			,[1254,"apache","application/x-font-framemaker",false,"",""]
			,[1255,"apache","application/x-font-ghostscript",false,"","gsf"]
			,[1256,"apache","application/x-font-libgrx",false,"",""]
			,[1257,"apache","application/x-font-linux-psf",false,"","psf"]
			,[1258,"apache","application/x-font-otf",true,"","otf"]
			,[1259,"apache","application/x-font-pcf",false,"","pcf"]
			,[1260,"apache","application/x-font-snf",false,"","snf"]
			,[1261,"apache","application/x-font-speedo",false,"",""]
			,[1262,"apache","application/x-font-sunos-news",false,"",""]
			,[1263,"apache","application/x-font-ttf",true,"","ttf, ttc"]
			,[1264,"apache","application/x-font-type1",false,"","pfa, pfb, pfm, afm"]
			,[1265,"apache","application/x-font-vfont",false,"",""]
			,[1266,"apache","application/x-freearc",false,"","arc"]
			,[1267,"apache","application/x-futuresplash",false,"","spl"]
			,[1268,"apache","application/x-gca-compressed",false,"","gca"]
			,[1269,"apache","application/x-glulx",false,"","ulx"]
			,[1270,"apache","application/x-gnumeric",false,"","gnumeric"]
			,[1271,"apache","application/x-gramps-xml",false,"","gramps"]
			,[1272,"apache","application/x-gtar",false,"","gtar"]
			,[1273,"apache","application/x-gzip",false,"",""]
			,[1274,"apache","application/x-hdf",false,"","hdf"]
			,[1275,"","application/x-httpd-php",true,"","php"]
			,[1276,"apache","application/x-install-instructions",false,"","install"]
			,[1277,"apache","application/x-iso9660-image",false,"","iso"]
			,[1278,"nginx","application/x-java-archive-diff",false,"","jardiff"]
			,[1279,"apache","application/x-java-jnlp-file",false,"","jnlp"]
			,[1280,"","application/x-javascript",true,"",""]
			,[1281,"apache","application/x-latex",false,"","latex"]
			,[1282,"","application/x-lua-bytecode",false,"","luac"]
			,[1283,"apache","application/x-lzh-compressed",false,"","lzh, lha"]
			,[1284,"nginx","application/x-makeself",false,"","run"]
			,[1285,"apache","application/x-mie",false,"","mie"]
			,[1286,"apache","application/x-mobipocket-ebook",false,"","prc, mobi"]
			,[1287,"","application/x-mpegurl",false,"",""]
			,[1288,"apache","application/x-ms-application",false,"","application"]
			,[1289,"apache","application/x-ms-shortcut",false,"","lnk"]
			,[1290,"apache","application/x-ms-wmd",false,"","wmd"]
			,[1291,"apache","application/x-ms-wmz",false,"","wmz"]
			,[1292,"apache","application/x-ms-xbap",false,"","xbap"]
			,[1293,"apache","application/x-msaccess",false,"","mdb"]
			,[1294,"apache","application/x-msbinder",false,"","obd"]
			,[1295,"apache","application/x-mscardfile",false,"","crd"]
			,[1296,"apache","application/x-msclip",false,"","clp"]
			,[1297,"","application/x-msdos-program",false,"","exe"]
			,[1298,"apache","application/x-msdownload",false,"","exe, dll, com, bat, msi"]
			,[1299,"apache","application/x-msmediaview",false,"","mvb, m13, m14"]
			,[1300,"apache","application/x-msmetafile",false,"","wmf, wmz, emf, emz"]
			,[1301,"apache","application/x-msmoney",false,"","mny"]
			,[1302,"apache","application/x-mspublisher",false,"","pub"]
			,[1303,"apache","application/x-msschedule",false,"","scd"]
			,[1304,"apache","application/x-msterminal",false,"","trm"]
			,[1305,"apache","application/x-mswrite",false,"","wri"]
			,[1306,"apache","application/x-netcdf",false,"","nc, cdf"]
			,[1307,"","application/x-ns-proxy-autoconfig",true,"","pac"]
			,[1308,"apache","application/x-nzb",false,"","nzb"]
			,[1309,"nginx","application/x-perl",false,"","pl, pm"]
			,[1310,"nginx","application/x-pilot",false,"","prc, pdb"]
			,[1311,"apache","application/x-pkcs12",false,"","p12, pfx"]
			,[1312,"apache","application/x-pkcs7-certificates",false,"","p7b, spc"]
			,[1313,"apache","application/x-pkcs7-certreqresp",false,"","p7r"]
			,[1314,"apache","application/x-rar-compressed",false,"","rar"]
			,[1315,"nginx","application/x-redhat-package-manager",false,"","rpm"]
			,[1316,"apache","application/x-research-info-systems",false,"","ris"]
			,[1317,"nginx","application/x-sea",false,"","sea"]
			,[1318,"apache","application/x-sh",true,"","sh"]
			,[1319,"apache","application/x-shar",false,"","shar"]
			,[1320,"apache","application/x-shockwave-flash",false,"","swf"]
			,[1321,"apache","application/x-silverlight-app",false,"","xap"]
			,[1322,"apache","application/x-sql",false,"","sql"]
			,[1323,"apache","application/x-stuffit",false,"","sit"]
			,[1324,"apache","application/x-stuffitx",false,"","sitx"]
			,[1325,"apache","application/x-subrip",false,"","srt"]
			,[1326,"apache","application/x-sv4cpio",false,"","sv4cpio"]
			,[1327,"apache","application/x-sv4crc",false,"","sv4crc"]
			,[1328,"apache","application/x-t3vm-image",false,"","t3"]
			,[1329,"apache","application/x-tads",false,"","gam"]
			,[1330,"apache","application/x-tar",true,"","tar"]
			,[1331,"apache","application/x-tcl",false,"","tcl, tk"]
			,[1332,"apache","application/x-tex",false,"","tex"]
			,[1333,"apache","application/x-tex-tfm",false,"","tfm"]
			,[1334,"apache","application/x-texinfo",false,"","texinfo, texi"]
			,[1335,"apache","application/x-tgif",false,"","obj"]
			,[1336,"apache","application/x-ustar",false,"","ustar"]
			,[1337,"apache","application/x-wais-source",false,"","src"]
			,[1338,"","application/x-web-app-manifest+json",true,"","webapp"]
			,[1339,"iana","application/x-www-form-urlencoded",true,"",""]
			,[1340,"apache","application/x-x509-ca-cert",false,"","der, crt, pem"]
			,[1341,"apache","application/x-xfig",false,"","fig"]
			,[1342,"apache","application/x-xliff+xml",false,"","xlf"]
			,[1343,"apache","application/x-xpinstall",false,"","xpi"]
			,[1344,"apache","application/x-xz",false,"","xz"]
			,[1345,"apache","application/x-zmachine",false,"","z1, z2, z3, z4, z5, z6, z7, z8"]
			,[1346,"iana","application/x400-bp",false,"",""]
			,[1347,"iana","application/xacml+xml",false,"",""]
			,[1348,"apache","application/xaml+xml",false,"","xaml"]
			,[1349,"iana","application/xcap-att+xml",false,"",""]
			,[1350,"iana","application/xcap-caps+xml",false,"",""]
			,[1351,"iana","application/xcap-diff+xml",false,"","xdf"]
			,[1352,"iana","application/xcap-el+xml",false,"",""]
			,[1353,"iana","application/xcap-error+xml",false,"",""]
			,[1354,"iana","application/xcap-ns+xml",false,"",""]
			,[1355,"iana","application/xcon-conference-info+xml",false,"",""]
			,[1356,"iana","application/xcon-conference-info-diff+xml",false,"",""]
			,[1357,"iana","application/xenc+xml",false,"","xenc"]
			,[1358,"iana","application/xhtml+xml",true,"","xhtml, xht"]
			,[1359,"apache","application/xhtml-voice+xml",false,"",""]
			,[1360,"iana","application/xml",true,"","xml, xsl, xsd, rng"]
			,[1361,"iana","application/xml-dtd",true,"","dtd"]
			,[1362,"iana","application/xml-external-parsed-entity",false,"",""]
			,[1363,"iana","application/xml-patch+xml",false,"",""]
			,[1364,"iana","application/xmpp+xml",false,"",""]
			,[1365,"iana","application/xop+xml",true,"","xop"]
			,[1366,"apache","application/xproc+xml",false,"","xpl"]
			,[1367,"iana","application/xslt+xml",false,"","xslt"]
			,[1368,"apache","application/xspf+xml",false,"","xspf"]
			,[1369,"iana","application/xv+xml",false,"","mxml, xhvml, xvml, xvm"]
			,[1370,"iana","application/yang",false,"","yang"]
			,[1371,"iana","application/yin+xml",false,"","yin"]
			,[1372,"iana","application/zip",false,"","zip"]
			,[1373,"iana","application/zlib",false,"",""]
			,[1374,"iana","audio/1d-interleaved-parityfec",false,"",""]
			,[1375,"iana","audio/32kadpcm",false,"",""]
			,[1376,"iana","audio/3gpp",false,"","3gpp"]
			,[1377,"iana","audio/3gpp2",false,"",""]
			,[1378,"iana","audio/ac3",false,"",""]
			,[1379,"apache","audio/adpcm",false,"","adp"]
			,[1380,"iana","audio/amr",false,"",""]
			,[1381,"iana","audio/amr-wb",false,"",""]
			,[1382,"iana","audio/amr-wb+",false,"",""]
			,[1383,"iana","audio/aptx",false,"",""]
			,[1384,"iana","audio/asc",false,"",""]
			,[1385,"iana","audio/atrac-advanced-lossless",false,"",""]
			,[1386,"iana","audio/atrac-x",false,"",""]
			,[1387,"iana","audio/atrac3",false,"",""]
			,[1388,"iana","audio/basic",false,"","au, snd"]
			,[1389,"iana","audio/bv16",false,"",""]
			,[1390,"iana","audio/bv32",false,"",""]
			,[1391,"iana","audio/clearmode",false,"",""]
			,[1392,"iana","audio/cn",false,"",""]
			,[1393,"iana","audio/dat12",false,"",""]
			,[1394,"iana","audio/dls",false,"",""]
			,[1395,"iana","audio/dsr-es201108",false,"",""]
			,[1396,"iana","audio/dsr-es202050",false,"",""]
			,[1397,"iana","audio/dsr-es202211",false,"",""]
			,[1398,"iana","audio/dsr-es202212",false,"",""]
			,[1399,"iana","audio/dv",false,"",""]
			,[1400,"iana","audio/dvi4",false,"",""]
			,[1401,"iana","audio/eac3",false,"",""]
			,[1402,"iana","audio/encaprtp",false,"",""]
			,[1403,"iana","audio/evrc",false,"",""]
			,[1404,"iana","audio/evrc-qcp",false,"",""]
			,[1405,"iana","audio/evrc0",false,"",""]
			,[1406,"iana","audio/evrc1",false,"",""]
			,[1407,"iana","audio/evrcb",false,"",""]
			,[1408,"iana","audio/evrcb0",false,"",""]
			,[1409,"iana","audio/evrcb1",false,"",""]
			,[1410,"iana","audio/evrcnw",false,"",""]
			,[1411,"iana","audio/evrcnw0",false,"",""]
			,[1412,"iana","audio/evrcnw1",false,"",""]
			,[1413,"iana","audio/evrcwb",false,"",""]
			,[1414,"iana","audio/evrcwb0",false,"",""]
			,[1415,"iana","audio/evrcwb1",false,"",""]
			,[1416,"iana","audio/evs",false,"",""]
			,[1417,"iana","audio/fwdred",false,"",""]
			,[1418,"iana","audio/g711-0",false,"",""]
			,[1419,"iana","audio/g719",false,"",""]
			,[1420,"iana","audio/g722",false,"",""]
			,[1421,"iana","audio/g7221",false,"",""]
			,[1422,"iana","audio/g723",false,"",""]
			,[1423,"iana","audio/g726-16",false,"",""]
			,[1424,"iana","audio/g726-24",false,"",""]
			,[1425,"iana","audio/g726-32",false,"",""]
			,[1426,"iana","audio/g726-40",false,"",""]
			,[1427,"iana","audio/g728",false,"",""]
			,[1428,"iana","audio/g729",false,"",""]
			,[1429,"iana","audio/g7291",false,"",""]
			,[1430,"iana","audio/g729d",false,"",""]
			,[1431,"iana","audio/g729e",false,"",""]
			,[1432,"iana","audio/gsm",false,"",""]
			,[1433,"iana","audio/gsm-efr",false,"",""]
			,[1434,"iana","audio/gsm-hr-08",false,"",""]
			,[1435,"iana","audio/ilbc",false,"",""]
			,[1436,"iana","audio/ip-mr_v2.5",false,"",""]
			,[1437,"apache","audio/isac",false,"",""]
			,[1438,"iana","audio/l16",false,"",""]
			,[1439,"iana","audio/l20",false,"",""]
			,[1440,"iana","audio/l24",false,"",""]
			,[1441,"iana","audio/l8",false,"",""]
			,[1442,"iana","audio/lpc",false,"",""]
			,[1443,"apache","audio/midi",false,"","mid, midi, kar, rmi"]
			,[1444,"iana","audio/mobile-xmf",false,"",""]
			,[1445,"iana","audio/mp4",false,"","m4a, mp4a"]
			,[1446,"iana","audio/mp4a-latm",false,"",""]
			,[1447,"iana","audio/mpa",false,"",""]
			,[1448,"iana","audio/mpa-robust",false,"",""]
			,[1449,"iana","audio/mpeg",false,"","mpga, mp2, mp2a, mp3, m2a, m3a"]
			,[1450,"iana","audio/mpeg4-generic",false,"",""]
			,[1451,"apache","audio/musepack",false,"",""]
			,[1452,"iana","audio/ogg",false,"","oga, ogg, spx"]
			,[1453,"iana","audio/opus",false,"",""]
			,[1454,"iana","audio/parityfec",false,"",""]
			,[1455,"iana","audio/pcma",false,"",""]
			,[1456,"iana","audio/pcma-wb",false,"",""]
			,[1457,"iana","audio/pcmu",false,"",""]
			,[1458,"iana","audio/pcmu-wb",false,"",""]
			,[1459,"iana","audio/prs.sid",false,"",""]
			,[1460,"iana","audio/qcelp",false,"",""]
			,[1461,"iana","audio/raptorfec",false,"",""]
			,[1462,"iana","audio/red",false,"",""]
			,[1463,"iana","audio/rtp-enc-aescm128",false,"",""]
			,[1464,"iana","audio/rtp-midi",false,"",""]
			,[1465,"iana","audio/rtploopback",false,"",""]
			,[1466,"iana","audio/rtx",false,"",""]
			,[1467,"apache","audio/s3m",false,"","s3m"]
			,[1468,"apache","audio/silk",false,"","sil"]
			,[1469,"iana","audio/smv",false,"",""]
			,[1470,"iana","audio/smv-qcp",false,"",""]
			,[1471,"iana","audio/smv0",false,"",""]
			,[1472,"iana","audio/sp-midi",false,"",""]
			,[1473,"iana","audio/speex",false,"",""]
			,[1474,"iana","audio/t140c",false,"",""]
			,[1475,"iana","audio/t38",false,"",""]
			,[1476,"iana","audio/telephone-event",false,"",""]
			,[1477,"iana","audio/tone",false,"",""]
			,[1478,"iana","audio/uemclip",false,"",""]
			,[1479,"iana","audio/ulpfec",false,"",""]
			,[1480,"iana","audio/vdvi",false,"",""]
			,[1481,"iana","audio/vmr-wb",false,"",""]
			,[1482,"iana","audio/vnd.3gpp.iufp",false,"",""]
			,[1483,"iana","audio/vnd.4sb",false,"",""]
			,[1484,"iana","audio/vnd.audiokoz",false,"",""]
			,[1485,"iana","audio/vnd.celp",false,"",""]
			,[1486,"iana","audio/vnd.cisco.nse",false,"",""]
			,[1487,"iana","audio/vnd.cmles.radio-events",false,"",""]
			,[1488,"iana","audio/vnd.cns.anp1",false,"",""]
			,[1489,"iana","audio/vnd.cns.inf1",false,"",""]
			,[1490,"iana","audio/vnd.dece.audio",false,"","uva, uvva"]
			,[1491,"iana","audio/vnd.digital-winds",false,"","eol"]
			,[1492,"iana","audio/vnd.dlna.adts",false,"",""]
			,[1493,"iana","audio/vnd.dolby.heaac.1",false,"",""]
			,[1494,"iana","audio/vnd.dolby.heaac.2",false,"",""]
			,[1495,"iana","audio/vnd.dolby.mlp",false,"",""]
			,[1496,"iana","audio/vnd.dolby.mps",false,"",""]
			,[1497,"iana","audio/vnd.dolby.pl2",false,"",""]
			,[1498,"iana","audio/vnd.dolby.pl2x",false,"",""]
			,[1499,"iana","audio/vnd.dolby.pl2z",false,"",""]
			,[1500,"iana","audio/vnd.dolby.pulse.1",false,"",""]
			,[1501,"iana","audio/vnd.dra",false,"","dra"]
			,[1502,"iana","audio/vnd.dts",false,"","dts"]
			,[1503,"iana","audio/vnd.dts.hd",false,"","dtshd"]
			,[1504,"iana","audio/vnd.dvb.file",false,"",""]
			,[1505,"iana","audio/vnd.everad.plj",false,"",""]
			,[1506,"iana","audio/vnd.hns.audio",false,"",""]
			,[1507,"iana","audio/vnd.lucent.voice",false,"","lvp"]
			,[1508,"iana","audio/vnd.ms-playready.media.pya",false,"","pya"]
			,[1509,"iana","audio/vnd.nokia.mobile-xmf",false,"",""]
			,[1510,"iana","audio/vnd.nortel.vbk",false,"",""]
			,[1511,"iana","audio/vnd.nuera.ecelp4800",false,"","ecelp4800"]
			,[1512,"iana","audio/vnd.nuera.ecelp7470",false,"","ecelp7470"]
			,[1513,"iana","audio/vnd.nuera.ecelp9600",false,"","ecelp9600"]
			,[1514,"iana","audio/vnd.octel.sbc",false,"",""]
			,[1515,"iana","audio/vnd.qcelp",false,"",""]
			,[1516,"iana","audio/vnd.rhetorex.32kadpcm",false,"",""]
			,[1517,"iana","audio/vnd.rip",false,"","rip"]
			,[1518,"","audio/vnd.rn-realaudio",false,"",""]
			,[1519,"iana","audio/vnd.sealedmedia.softseal.mpeg",false,"",""]
			,[1520,"iana","audio/vnd.vmx.cvsd",false,"",""]
			,[1521,"","audio/vnd.wave",false,"",""]
			,[1522,"iana","audio/vorbis",false,"",""]
			,[1523,"iana","audio/vorbis-config",false,"",""]
			,[1524,"","audio/wav",false,"","wav"]
			,[1525,"","audio/wave",false,"","wav"]
			,[1526,"apache","audio/webm",false,"","weba"]
			,[1527,"apache","audio/x-aac",false,"","aac"]
			,[1528,"apache","audio/x-aiff",false,"","aif, aiff, aifc"]
			,[1529,"apache","audio/x-caf",false,"","caf"]
			,[1530,"apache","audio/x-flac",false,"","flac"]
			,[1531,"nginx","audio/x-m4a",false,"","m4a"]
			,[1532,"apache","audio/x-matroska",false,"","mka"]
			,[1533,"apache","audio/x-mpegurl",false,"","m3u"]
			,[1534,"apache","audio/x-ms-wax",false,"","wax"]
			,[1535,"apache","audio/x-ms-wma",false,"","wma"]
			,[1536,"apache","audio/x-pn-realaudio",false,"","ram, ra"]
			,[1537,"apache","audio/x-pn-realaudio-plugin",false,"","rmp"]
			,[1538,"nginx","audio/x-realaudio",false,"","ra"]
			,[1539,"apache","audio/x-tta",false,"",""]
			,[1540,"apache","audio/x-wav",false,"","wav"]
			,[1541,"apache","audio/xm",false,"","xm"]
			,[1542,"apache","chemical/x-cdx",false,"","cdx"]
			,[1543,"apache","chemical/x-cif",false,"","cif"]
			,[1544,"apache","chemical/x-cmdf",false,"","cmdf"]
			,[1545,"apache","chemical/x-cml",false,"","cml"]
			,[1546,"apache","chemical/x-csml",false,"","csml"]
			,[1547,"apache","chemical/x-pdb",false,"",""]
			,[1548,"apache","chemical/x-xyz",false,"","xyz"]
			,[1549,"","font/opentype",true,"","otf"]
			,[1550,"apache","image/bmp",true,"","bmp"]
			,[1551,"iana","image/cgm",false,"","cgm"]
			,[1552,"iana","image/fits",false,"",""]
			,[1553,"iana","image/g3fax",false,"","g3"]
			,[1554,"iana","image/gif",false,"","gif"]
			,[1555,"iana","image/ief",false,"","ief"]
			,[1556,"iana","image/jp2",false,"",""]
			,[1557,"iana","image/jpeg",false,"","jpeg, jpg, jpe"]
			,[1558,"iana","image/jpm",false,"",""]
			,[1559,"iana","image/jpx",false,"",""]
			,[1560,"iana","image/ktx",false,"","ktx"]
			,[1561,"iana","image/naplps",false,"",""]
			,[1562,"","image/pjpeg",false,"",""]
			,[1563,"iana","image/png",false,"","png"]
			,[1564,"iana","image/prs.btif",false,"","btif"]
			,[1565,"iana","image/prs.pti",false,"",""]
			,[1566,"iana","image/pwg-raster",false,"",""]
			,[1567,"apache","image/sgi",false,"","sgi"]
			,[1568,"iana","image/svg+xml",true,"","svg, svgz"]
			,[1569,"iana","image/t38",false,"",""]
			,[1570,"iana","image/tiff",false,"","tiff, tif"]
			,[1571,"iana","image/tiff-fx",false,"",""]
			,[1572,"iana","image/vnd.adobe.photoshop",true,"","psd"]
			,[1573,"iana","image/vnd.airzip.accelerator.azv",false,"",""]
			,[1574,"iana","image/vnd.cns.inf2",false,"",""]
			,[1575,"iana","image/vnd.dece.graphic",false,"","uvi, uvvi, uvg, uvvg"]
			,[1576,"iana","image/vnd.djvu",false,"","djvu, djv"]
			,[1577,"iana","image/vnd.dvb.subtitle",false,"","sub"]
			,[1578,"iana","image/vnd.dwg",false,"","dwg"]
			,[1579,"iana","image/vnd.dxf",false,"","dxf"]
			,[1580,"iana","image/vnd.fastbidsheet",false,"","fbs"]
			,[1581,"iana","image/vnd.fpx",false,"","fpx"]
			,[1582,"iana","image/vnd.fst",false,"","fst"]
			,[1583,"iana","image/vnd.fujixerox.edmics-mmr",false,"","mmr"]
			,[1584,"iana","image/vnd.fujixerox.edmics-rlc",false,"","rlc"]
			,[1585,"iana","image/vnd.globalgraphics.pgb",false,"",""]
			,[1586,"iana","image/vnd.microsoft.icon",false,"",""]
			,[1587,"iana","image/vnd.mix",false,"",""]
			,[1588,"iana","image/vnd.mozilla.apng",false,"",""]
			,[1589,"iana","image/vnd.ms-modi",false,"","mdi"]
			,[1590,"apache","image/vnd.ms-photo",false,"","wdp"]
			,[1591,"iana","image/vnd.net-fpx",false,"","npx"]
			,[1592,"iana","image/vnd.radiance",false,"",""]
			,[1593,"iana","image/vnd.sealed.png",false,"",""]
			,[1594,"iana","image/vnd.sealedmedia.softseal.gif",false,"",""]
			,[1595,"iana","image/vnd.sealedmedia.softseal.jpg",false,"",""]
			,[1596,"iana","image/vnd.svf",false,"",""]
			,[1597,"iana","image/vnd.tencent.tap",false,"",""]
			,[1598,"iana","image/vnd.valve.source.texture",false,"",""]
			,[1599,"iana","image/vnd.wap.wbmp",false,"","wbmp"]
			,[1600,"iana","image/vnd.xiff",false,"","xif"]
			,[1601,"iana","image/vnd.zbrush.pcx",false,"",""]
			,[1602,"apache","image/webp",false,"","webp"]
			,[1603,"apache","image/x-3ds",false,"","3ds"]
			,[1604,"apache","image/x-cmu-raster",false,"","ras"]
			,[1605,"apache","image/x-cmx",false,"","cmx"]
			,[1606,"apache","image/x-freehand",false,"","fh, fhc, fh4, fh5, fh7"]
			,[1607,"apache","image/x-icon",true,"","ico"]
			,[1608,"nginx","image/x-jng",false,"","jng"]
			,[1609,"apache","image/x-mrsid-image",false,"","sid"]
			,[1610,"nginx","image/x-ms-bmp",true,"","bmp"]
			,[1611,"apache","image/x-pcx",false,"","pcx"]
			,[1612,"apache","image/x-pict",false,"","pic, pct"]
			,[1613,"apache","image/x-portable-anymap",false,"","pnm"]
			,[1614,"apache","image/x-portable-bitmap",false,"","pbm"]
			,[1615,"apache","image/x-portable-graymap",false,"","pgm"]
			,[1616,"apache","image/x-portable-pixmap",false,"","ppm"]
			,[1617,"apache","image/x-rgb",false,"","rgb"]
			,[1618,"apache","image/x-tga",false,"","tga"]
			,[1619,"apache","image/x-xbitmap",false,"","xbm"]
			,[1620,"","image/x-xcf",false,"",""]
			,[1621,"apache","image/x-xpixmap",false,"","xpm"]
			,[1622,"apache","image/x-xwindowdump",false,"","xwd"]
			,[1623,"iana","message/cpim",false,"",""]
			,[1624,"iana","message/delivery-status",false,"",""]
			,[1625,"iana","message/disposition-notification",false,"",""]
			,[1626,"iana","message/external-body",false,"",""]
			,[1627,"iana","message/feedback-report",false,"",""]
			,[1628,"iana","message/global",false,"",""]
			,[1629,"iana","message/global-delivery-status",false,"",""]
			,[1630,"iana","message/global-disposition-notification",false,"",""]
			,[1631,"iana","message/global-headers",false,"",""]
			,[1632,"iana","message/http",false,"",""]
			,[1633,"iana","message/imdn+xml",true,"",""]
			,[1634,"iana","message/news",false,"",""]
			,[1635,"iana","message/partial",false,"",""]
			,[1636,"iana","message/rfc822",true,"","eml, mime"]
			,[1637,"iana","message/s-http",false,"",""]
			,[1638,"iana","message/sip",false,"",""]
			,[1639,"iana","message/sipfrag",false,"",""]
			,[1640,"iana","message/tracking-status",false,"",""]
			,[1641,"iana","message/vnd.si.simp",false,"",""]
			,[1642,"iana","message/vnd.wfa.wsc",false,"",""]
			,[1643,"iana","model/iges",false,"","igs, iges"]
			,[1644,"iana","model/mesh",false,"","msh, mesh, silo"]
			,[1645,"iana","model/vnd.collada+xml",false,"","dae"]
			,[1646,"iana","model/vnd.dwf",false,"","dwf"]
			,[1647,"iana","model/vnd.flatland.3dml",false,"",""]
			,[1648,"iana","model/vnd.gdl",false,"","gdl"]
			,[1649,"apache","model/vnd.gs-gdl",false,"",""]
			,[1650,"iana","model/vnd.gs.gdl",false,"",""]
			,[1651,"iana","model/vnd.gtw",false,"","gtw"]
			,[1652,"iana","model/vnd.moml+xml",false,"",""]
			,[1653,"iana","model/vnd.mts",false,"","mts"]
			,[1654,"iana","model/vnd.opengex",false,"",""]
			,[1655,"iana","model/vnd.parasolid.transmit.binary",false,"",""]
			,[1656,"iana","model/vnd.parasolid.transmit.text",false,"",""]
			,[1657,"iana","model/vnd.rosette.annotated-data-model",false,"",""]
			,[1658,"iana","model/vnd.valve.source.compiled-map",false,"",""]
			,[1659,"iana","model/vnd.vtu",false,"","vtu"]
			,[1660,"iana","model/vrml",false,"","wrl, vrml"]
			,[1661,"apache","model/x3d+binary",false,"","x3db, x3dbz"]
			,[1662,"iana","model/x3d+fastinfoset",false,"",""]
			,[1663,"apache","model/x3d+vrml",false,"","x3dv, x3dvz"]
			,[1664,"iana","model/x3d+xml",true,"","x3d, x3dz"]
			,[1665,"iana","model/x3d-vrml",false,"",""]
			,[1666,"iana","multipart/alternative",false,"",""]
			,[1667,"iana","multipart/appledouble",false,"",""]
			,[1668,"iana","multipart/byteranges",false,"",""]
			,[1669,"iana","multipart/digest",false,"",""]
			,[1670,"iana","multipart/encrypted",false,"",""]
			,[1671,"iana","multipart/form-data",false,"",""]
			,[1672,"iana","multipart/header-set",false,"",""]
			,[1673,"iana","multipart/mixed",false,"",""]
			,[1674,"iana","multipart/parallel",false,"",""]
			,[1675,"iana","multipart/related",false,"",""]
			,[1676,"iana","multipart/report",false,"",""]
			,[1677,"iana","multipart/signed",false,"",""]
			,[1678,"iana","multipart/voice-message",false,"",""]
			,[1679,"iana","multipart/x-mixed-replace",false,"",""]
			,[1680,"iana","text/1d-interleaved-parityfec",false,"",""]
			,[1681,"iana","text/cache-manifest",true,"","appcache, manifest"]
			,[1682,"iana","text/calendar",false,"","ics, ifb"]
			,[1683,"","text/calender",true,"",""]
			,[1684,"","text/cmd",true,"",""]
			,[1685,"","text/coffeescript",false,"","coffee, litcoffee"]
			,[1686,"iana","text/css",true,"","css"]
			,[1687,"iana","text/csv",true,"","csv"]
			,[1688,"iana","text/csv-schema",false,"",""]
			,[1689,"iana","text/directory",false,"",""]
			,[1690,"iana","text/dns",false,"",""]
			,[1691,"iana","text/ecmascript",false,"",""]
			,[1692,"iana","text/encaprtp",false,"",""]
			,[1693,"iana","text/enriched",false,"",""]
			,[1694,"iana","text/fwdred",false,"",""]
			,[1695,"iana","text/grammar-ref-list",false,"",""]
			,[1696,"","text/json",false,"","json"]
			,[1697,"iana","text/html",true,"","html, htm, shtml"]
			,[1698,"","text/jade",false,"","jade"]
			,[1699,"iana","text/javascript",true,"",""]
			,[1700,"iana","text/jcr-cnd",false,"",""]
			,[1701,"","text/jsx",true,"","jsx"]
			,[1702,"","text/less",false,"","less"]
			,[1703,"iana","text/markdown",false,"",""]
			,[1704,"nginx","text/mathml",false,"","mml"]
			,[1705,"iana","text/mizar",false,"",""]
			,[1706,"iana","text/n3",true,"","n3"]
			,[1707,"iana","text/parameters",false,"",""]
			,[1708,"iana","text/parityfec",false,"",""]
			,[1709,"iana","text/plain",true,"","txt, text, conf, def, list, log, in, ini"]
			,[1710,"iana","text/provenance-notation",false,"",""]
			,[1711,"iana","text/prs.fallenstein.rst",false,"",""]
			,[1712,"iana","text/prs.lines.tag",false,"","dsc"]
			,[1713,"iana","text/prs.prop.logic",false,"",""]
			,[1714,"iana","text/raptorfec",false,"",""]
			,[1715,"iana","text/red",false,"",""]
			,[1716,"iana","text/rfc822-headers",false,"",""]
			,[1717,"iana","text/richtext",true,"","rtx"]
			,[1718,"iana","text/rtf",true,"","rtf"]
			,[1719,"iana","text/rtp-enc-aescm128",false,"",""]
			,[1720,"iana","text/rtploopback",false,"",""]
			,[1721,"iana","text/rtx",false,"",""]
			,[1722,"iana","text/sgml",false,"","sgml, sgm"]
			,[1723,"","text/slim",false,"","slim, slm"]
			,[1724,"","text/stylus",false,"","stylus, styl"]
			,[1725,"iana","text/t140",false,"",""]
			,[1726,"iana","text/tab-separated-values",true,"","tsv"]
			,[1727,"iana","text/troff",false,"","t, tr, roff, man, me, ms"]
			,[1728,"iana","text/turtle",false,"","ttl"]
			,[1729,"iana","text/ulpfec",false,"",""]
			,[1730,"iana","text/uri-list",true,"","uri, uris, urls"]
			,[1731,"iana","text/vcard",true,"","vcard"]
			,[1732,"iana","text/vnd.a",false,"",""]
			,[1733,"iana","text/vnd.abc",false,"",""]
			,[1734,"iana","text/vnd.curl",false,"","curl"]
			,[1735,"apache","text/vnd.curl.dcurl",false,"","dcurl"]
			,[1736,"apache","text/vnd.curl.mcurl",false,"","mcurl"]
			,[1737,"apache","text/vnd.curl.scurl",false,"","scurl"]
			,[1738,"iana","text/vnd.debian.copyright",false,"",""]
			,[1739,"iana","text/vnd.dmclientscript",false,"",""]
			,[1740,"iana","text/vnd.dvb.subtitle",false,"","sub"]
			,[1741,"iana","text/vnd.esmertec.theme-descriptor",false,"",""]
			,[1742,"iana","text/vnd.fly",false,"","fly"]
			,[1743,"iana","text/vnd.fmi.flexstor",false,"","flx"]
			,[1744,"iana","text/vnd.graphviz",false,"","gv"]
			,[1745,"iana","text/vnd.in3d.3dml",false,"","3dml"]
			,[1746,"iana","text/vnd.in3d.spot",false,"","spot"]
			,[1747,"iana","text/vnd.iptc.newsml",false,"",""]
			,[1748,"iana","text/vnd.iptc.nitf",false,"",""]
			,[1749,"iana","text/vnd.latex-z",false,"",""]
			,[1750,"iana","text/vnd.motorola.reflex",false,"",""]
			,[1751,"iana","text/vnd.ms-mediapackage",false,"",""]
			,[1752,"iana","text/vnd.net2phone.commcenter.command",false,"",""]
			,[1753,"iana","text/vnd.radisys.msml-basic-layout",false,"",""]
			,[1754,"iana","text/vnd.si.uricatalogue",false,"",""]
			,[1755,"iana","text/vnd.sun.j2me.app-descriptor",false,"","jad"]
			,[1756,"iana","text/vnd.trolltech.linguist",false,"",""]
			,[1757,"iana","text/vnd.wap.si",false,"",""]
			,[1758,"iana","text/vnd.wap.sl",false,"",""]
			,[1759,"iana","text/vnd.wap.wml",false,"","wml"]
			,[1760,"iana","text/vnd.wap.wmlscript",false,"","wmls"]
			,[1761,"","text/vtt",true,"UTF-8","vtt"]
			,[1762,"apache","text/x-asm",false,"","s, asm"]
			,[1763,"apache","text/x-c",false,"","c, cc, cxx, cpp, h, hh, dic"]
			,[1764,"nginx","text/x-component",false,"","htc"]
			,[1765,"apache","text/x-fortran",false,"","f, for, f77, f90"]
			,[1766,"","text/x-gwt-rpc",true,"",""]
			,[1767,"","text/x-handlebars-template",false,"","hbs"]
			,[1768,"apache","text/x-java-source",false,"","java"]
			,[1769,"","text/x-jquery-tmpl",true,"",""]
			,[1770,"","text/x-lua",false,"","lua"]
			,[1771,"","text/x-markdown",true,"","markdown, md, mkd"]
			,[1772,"apache","text/x-nfo",false,"","nfo"]
			,[1773,"apache","text/x-opml",false,"","opml"]
			,[1774,"apache","text/x-pascal",false,"","p, pas"]
			,[1775,"","text/x-processing",true,"","pde"]
			,[1776,"","text/x-sass",false,"","sass"]
			,[1777,"","text/x-scss",false,"","scss"]
			,[1778,"apache","text/x-setext",false,"","etx"]
			,[1779,"apache","text/x-sfv",false,"","sfv"]
			,[1780,"","text/x-suse-ymp",true,"","ymp"]
			,[1781,"apache","text/x-uuencode",false,"","uu"]
			,[1782,"apache","text/x-vcalendar",false,"","vcs"]
			,[1783,"apache","text/x-vcard",false,"","vcf"]
			,[1784,"iana","text/xml",true,"","xml"]
			,[1785,"iana","text/xml-external-parsed-entity",false,"",""]
			,[1786,"","text/yaml",false,"","yaml, yml"]
			,[1787,"apache","video/1d-interleaved-parityfec",false,"",""]
			,[1788,"apache","video/3gpp",false,"","3gp, 3gpp"]
			,[1789,"apache","video/3gpp-tt",false,"",""]
			,[1790,"apache","video/3gpp2",false,"","3g2"]
			,[1791,"apache","video/bmpeg",false,"",""]
			,[1792,"apache","video/bt656",false,"",""]
			,[1793,"apache","video/celb",false,"",""]
			,[1794,"apache","video/dv",false,"",""]
			,[1795,"apache","video/encaprtp",false,"",""]
			,[1796,"apache","video/h261",false,"","h261"]
			,[1797,"apache","video/h263",false,"","h263"]
			,[1798,"apache","video/h263-1998",false,"",""]
			,[1799,"apache","video/h263-2000",false,"",""]
			,[1800,"apache","video/h264",false,"","h264"]
			,[1801,"apache","video/h264-rcdo",false,"",""]
			,[1802,"apache","video/h264-svc",false,"",""]
			,[1803,"apache","video/h265",false,"",""]
			,[1804,"apache","video/iso.segment",false,"",""]
			,[1805,"apache","video/jpeg",false,"","jpgv"]
			,[1806,"apache","video/jpeg2000",false,"",""]
			,[1807,"apache","video/jpm",false,"","jpm, jpgm"]
			,[1808,"apache","video/mj2",false,"","mj2, mjp2"]
			,[1809,"apache","video/mp1s",false,"",""]
			,[1810,"apache","video/mp2p",false,"",""]
			,[1811,"apache","video/mp2t",false,"","ts"]
			,[1812,"apache","video/mp4",false,"","mp4, mp4v, mpg4"]
			,[1813,"apache","video/mp4v-es",false,"",""]
			,[1814,"apache","video/mpeg",false,"","mpeg, mpg, mpe, m1v, m2v"]
			,[1815,"apache","video/mpeg4-generic",false,"",""]
			,[1816,"apache","video/mpv",false,"",""]
			,[1817,"apache","video/nv",false,"",""]
			,[1818,"apache","video/ogg",false,"","ogv"]
			,[1819,"apache","video/parityfec",false,"",""]
			,[1820,"apache","video/pointer",false,"",""]
			,[1821,"apache","video/quicktime",false,"","qt, mov"]
			,[1822,"apache","video/raptorfec",false,"",""]
			,[1823,"apache","video/raw",false,"",""]
			,[1824,"apache","video/rtp-enc-aescm128",false,"",""]
			,[1825,"apache","video/rtploopback",false,"",""]
			,[1826,"apache","video/rtx",false,"",""]
			,[1827,"apache","video/smpte292m",false,"",""]
			,[1828,"apache","video/ulpfec",false,"",""]
			,[1829,"apache","video/vc1",false,"",""]
			,[1830,"apache","video/vnd.cctv",false,"",""]
			,[1831,"apache","video/vnd.dece.hd",false,"","uvh, uvvh"]
			,[1832,"apache","video/vnd.dece.mobile",false,"","uvm, uvvm"]
			,[1833,"apache","video/vnd.dece.mp4",false,"",""]
			,[1834,"apache","video/vnd.dece.pd",false,"","uvp, uvvp"]
			,[1835,"apache","video/vnd.dece.sd",false,"","uvs, uvvs"]
			,[1836,"apache","video/vnd.dece.video",false,"","uvv, uvvv"]
			,[1837,"apache","video/vnd.directv.mpeg",false,"",""]
			,[1838,"apache","video/vnd.directv.mpeg-tts",false,"",""]
			,[1839,"apache","video/vnd.dlna.mpeg-tts",false,"",""]
			,[1840,"apache","video/vnd.dvb.file",false,"","dvb"]
			,[1841,"apache","video/vnd.fvt",false,"","fvt"]
			,[1842,"apache","video/vnd.hns.video",false,"",""]
			,[1843,"apache","video/vnd.iptvforum.1dparityfec-1010",false,"",""]
			,[1844,"apache","video/vnd.iptvforum.1dparityfec-2005",false,"",""]
			,[1845,"apache","video/vnd.iptvforum.2dparityfec-1010",false,"",""]
			,[1846,"apache","video/vnd.iptvforum.2dparityfec-2005",false,"",""]
			,[1847,"apache","video/vnd.iptvforum.ttsavc",false,"",""]
			,[1848,"apache","video/vnd.iptvforum.ttsmpeg2",false,"",""]
			,[1849,"apache","video/vnd.motorola.video",false,"",""]
			,[1850,"apache","video/vnd.motorola.videop",false,"",""]
			,[1851,"apache","video/vnd.mpegurl",false,"","mxu, m4u"]
			,[1852,"apache","video/vnd.ms-playready.media.pyv",false,"","pyv"]
			,[1853,"apache","video/vnd.nokia.interleaved-multimedia",false,"",""]
			,[1854,"apache","video/vnd.nokia.videovoip",false,"",""]
			,[1855,"apache","video/vnd.objectvideo",false,"",""]
			,[1856,"apache","video/vnd.radgamettools.bink",false,"",""]
			,[1857,"apache","video/vnd.radgamettools.smacker",false,"",""]
			,[1858,"apache","video/vnd.sealed.mpeg1",false,"",""]
			,[1859,"apache","video/vnd.sealed.mpeg4",false,"",""]
			,[1860,"apache","video/vnd.sealed.swf",false,"",""]
			,[1861,"apache","video/vnd.sealedmedia.softseal.mov",false,"",""]
			,[1862,"apache","video/vnd.uvvu.mp4",false,"","uvu, uvvu"]
			,[1863,"apache","video/vnd.vivo",false,"","viv"]
			,[1864,"apache","video/vp8",false,"",""]
			,[1865,"apache","video/webm",false,"","webm"]
			,[1866,"apache","video/x-f4v",false,"","f4v"]
			,[1867,"apache","video/x-fli",false,"","fli"]
			,[1868,"apache","video/x-flv",false,"","flv"]
			,[1869,"apache","video/x-m4v",false,"","m4v"]
			,[1870,"apache","video/x-matroska",false,"","mkv, mk3d, mks"]
			,[1871,"apache","video/x-mng",false,"","mng"]
			,[1872,"apache","video/x-ms-asf",false,"","asf, asx"]
			,[1873,"apache","video/x-ms-vob",false,"","vob"]
			,[1874,"apache","video/x-ms-wm",false,"","wm"]
			,[1875,"apache","video/x-ms-wmv",false,"","wmv"]
			,[1876,"apache","video/x-ms-wmx",false,"","wmx"]
			,[1877,"apache","video/x-ms-wvx",false,"","wvx"]
			,[1878,"apache","video/x-msvideo",false,"","avi"]
			,[1879,"apache","video/x-sgi-movie",false,"","movie"]
			,[1880,"apache","video/x-smv",false,"","smv"]
			,[1881,"apache","x-conference/x-cooltalk",false,"","ice"]
			,[1882,"","x-shader/x-fragment",true,"",""]
			,[1883,"","x-shader/x-vertex",true,"",""]
		].forEach(function(x) {
			__mimes.push({"id": x[0], "source": x[1], "value": x[2], "compressible": x[3], "charSet": x[4], "extensions": x[5] });
		});
    }
    function _initMimeTypes() {
        __mimeTypes = [];
		[
			 [695,"123",true]
			,[1745,"3dml",true]
			,[1603,"3ds",true]
			,[1790,"3g2",true]
			,[1788,"3gp",true]
			,[1788,"3gpp",true]
			,[1376,"3gpp",false]
			,[1216,"7z",true]
			,[1221,"aab",true]
			,[1527,"aac",true]
			,[1222,"aam",true]
			,[1223,"aas",true]
			,[1217,"abw",true]
			,[233,"ac",true]
			,[379,"acc",true]
			,[1218,"ace",true]
			,[364,"acu",true]
			,[365,"acutc",true]
			,[1379,"adp",true]
			,[398,"aep",true]
			,[1264,"afm",true]
			,[624,"afp",true]
			,[375,"ahead",true]
			,[240,"ai",true]
			,[1528,"aif",true]
			,[1528,"aifc",true]
			,[1528,"aiff",true]
			,[366,"air",true]
			,[477,"ait",true]
			,[380,"ami",true]
			,[382,"apk",true]
			,[1681,"appcache",true]
			,[1288,"application",true]
			,[696,"apr",true]
			,[1266,"arc",true]
			,[224,"asc",true]
			,[1872,"asf",true]
			,[1762,"asm",true]
			,[362,"aso",true]
			,[1872,"asx",true]
			,[365,"atc",true]
			,[22,"atom",true]
			,[23,"atomcat",true]
			,[26,"atomsvc",true]
			,[386,"atx",true]
			,[1388,"au",true]
			,[1878,"avi",true]
			,[19,"aw",true]
			,[376,"azf",true]
			,[377,"azs",true]
			,[378,"azw",true]
			,[1298,"bat",true]
			,[1224,"bcpio",true]
			,[1252,"bdf",true]
			,[1112,"bdm",true]
			,[1225,"bdoc",false]
			,[31,"bdoc",true]
			,[1039,"bed",true]
			,[563,"bh2",true]
			,[209,"bin",true]
			,[1227,"blb",true]
			,[1227,"blorb",true]
			,[408,"bmi",true]
			,[1610,"bmp",false]
			,[1550,"bmp",true]
			,[555,"book",true]
			,[1013,"box",true]
			,[1229,"boz",true]
			,[209,"bpk",true]
			,[1564,"btif",true]
			,[209,"buffer",true]
			,[1228,"bz",true]
			,[1229,"bz2",true]
			,[1763,"c",true]
			,[423,"c11amc",true]
			,[424,"c11amz",true]
			,[422,"c4d",true]
			,[422,"c4f",true]
			,[422,"c4g",true]
			,[422,"c4p",true]
			,[422,"c4u",true]
			,[745,"cab",true]
			,[1529,"caf",true]
			,[1121,"cap",true]
			,[448,"car",true]
			,[760,"cat",true]
			,[1230,"cb7",true]
			,[1230,"cba",true]
			,[1230,"cbr",true]
			,[1230,"cbt",true]
			,[1230,"cbz",true]
			,[1763,"cc",true]
			,[1236,"cco",true]
			,[1244,"cct",true]
			,[39,"ccxml",true]
			,[431,"cdbcmsg",true]
			,[1306,"cdf",true]
			,[712,"cdkey",true]
			,[41,"cdmia",true]
			,[42,"cdmic",true]
			,[43,"cdmid",true]
			,[44,"cdmio",true]
			,[45,"cdmiq",true]
			,[1542,"cdx",true]
			,[415,"cdxml",true]
			,[417,"cdy",true]
			,[234,"cer",true]
			,[1232,"cfs",true]
			,[1551,"cgm",true]
			,[1233,"chat",true]
			,[753,"chm",true]
			,[679,"chrt",true]
			,[1543,"cif",true]
			,[384,"cii",true]
			,[743,"cil",true]
			,[420,"cla",true]
			,[132,"class",true]
			,[435,"clkk",true]
			,[436,"clkp",true]
			,[437,"clkt",true]
			,[438,"clkw",true]
			,[434,"clkx",true]
			,[1296,"clp",true]
			,[433,"cmc",true]
			,[1544,"cmdf",true]
			,[1545,"cml",true]
			,[1202,"cmp",true]
			,[1605,"cmx",true]
			,[1044,"cod",true]
			,[1685,"coffee",true]
			,[1298,"com",true]
			,[1709,"conf",true]
			,[1239,"cpio",true]
			,[1763,"cpp",true]
			,[154,"cpt",true]
			,[1295,"crd",true]
			,[235,"crl",true]
			,[1340,"crt",true]
			,[1235,"crx",true]
			,[1043,"cryptonote",true]
			,[1240,"csh",true]
			,[1546,"csml",true]
			,[430,"csp",true]
			,[1686,"css",true]
			,[1244,"cst",true]
			,[1687,"csv",true]
			,[61,"cu",true]
			,[1734,"curl",true]
			,[246,"cww",true]
			,[1244,"cxt",true]
			,[1763,"cxx",true]
			,[1645,"dae",true]
			,[724,"daf",true]
			,[452,"dart",true]
			,[547,"dataless",true]
			,[66,"davmount",true]
			,[75,"dbk",true]
			,[1244,"dcr",true]
			,[1735,"dcurl",true]
			,[885,"dd2",true]
			,[566,"ddd",true]
			,[209,"deb",false]
			,[1242,"deb",true]
			,[1709,"def",true]
			,[209,"deploy",true]
			,[1340,"der",true]
			,[471,"dfac",true]
			,[1243,"dgc",true]
			,[1763,"dic",true]
			,[1244,"dir",true]
			,[725,"dis",true]
			,[209,"dist",true]
			,[209,"distz",true]
			,[1576,"djv",true]
			,[1576,"djvu",true]
			,[1298,"dll",false]
			,[209,"dll",true]
			,[209,"dmg",false]
			,[1220,"dmg",true]
			,[1121,"dmp",true]
			,[209,"dms",true]
			,[464,"dna",true]
			,[199,"doc",true]
			,[782,"docm",true]
			,[967,"docx",true]
			,[199,"dot",true]
			,[783,"dotm",true]
			,[977,"dotx",true]
			,[988,"dp",true]
			,[470,"dpg",true]
			,[1501,"dra",true]
			,[1712,"dsc",true]
			,[77,"dssc",true]
			,[1247,"dtb",true]
			,[1361,"dtd",true]
			,[1502,"dts",true]
			,[1503,"dtshd",true]
			,[209,"dump",true]
			,[1840,"dvb",true]
			,[1249,"dvi",true]
			,[1646,"dwf",true]
			,[1578,"dwg",true]
			,[1579,"dxf",true]
			,[1082,"dxp",true]
			,[1244,"dxr",true]
			,[130,"ear",true]
			,[1511,"ecelp4800",true]
			,[1512,"ecelp7470",true]
			,[1513,"ecelp9600",true]
			,[80,"ecma",true]
			,[823,"edm",true]
			,[824,"edx",true]
			,[1002,"efif",true]
			,[1000,"ei6",true]
			,[209,"elc",true]
			,[1300,"emf",true]
			,[1636,"eml",true]
			,[90,"emma",true]
			,[1300,"emz",true]
			,[1491,"eol",true]
			,[752,"eot",true]
			,[240,"eps",true]
			,[94,"epub",true]
			,[517,"es3",true]
			,[989,"esa",true]
			,[511,"esf",true]
			,[517,"et3",true]
			,[1778,"etx",true]
			,[1251,"eva",true]
			,[1250,"evy",true]
			,[1298,"exe",false]
			,[1297,"exe",false]
			,[209,"exe",true]
			,[96,"exi",true]
			,[825,"ext",true]
			,[17,"ez",true]
			,[541,"ez2",true]
			,[542,"ez3",true]
			,[1765,"f",true]
			,[1866,"f4v",true]
			,[1765,"f77",true]
			,[1765,"f90",true]
			,[1580,"fbs",true]
			,[368,"fcdt",true]
			,[663,"fcs",true]
			,[545,"fdf",true]
			,[459,"fe_launch",true]
			,[562,"fg5",true]
			,[1244,"fgd",true]
			,[1606,"fh",true]
			,[1606,"fh4",true]
			,[1606,"fh5",true]
			,[1606,"fh7",true]
			,[1606,"fhc",true]
			,[1341,"fig",true]
			,[1530,"flac",true]
			,[1867,"fli",true]
			,[717,"flo",true]
			,[1868,"flv",true]
			,[681,"flw",true]
			,[1743,"flx",true]
			,[1742,"fly",true]
			,[555,"fm",true]
			,[556,"fnc",true]
			,[1765,"for",true]
			,[1581,"fpx",true]
			,[555,"frame",true]
			,[558,"fsc",true]
			,[1582,"fst",true]
			,[553,"ftc",true]
			,[385,"fti",true]
			,[1841,"fvt",true]
			,[369,"fxp",true]
			,[369,"fxpl",true]
			,[572,"fzs",true]
			,[580,"g2w",true]
			,[1553,"g3",true]
			,[581,"g3w",true]
			,[596,"gac",true]
			,[1329,"gam",true]
			,[267,"gbr",true]
			,[1268,"gca",true]
			,[1648,"gdl",true]
			,[586,"gdoc",true]
			,[497,"geo",true]
			,[578,"gex",true]
			,[576,"ggb",true]
			,[577,"ggt",true]
			,[597,"ghf",true]
			,[1554,"gif",true]
			,[598,"gim",true]
			,[106,"gml",true]
			,[585,"gmx",true]
			,[1270,"gnumeric",true]
			,[552,"gph",true]
			,[107,"gpx",true]
			,[594,"gqf",true]
			,[594,"gqs",true]
			,[310,"gram",true]
			,[1271,"gramps",true]
			,[578,"gre",true]
			,[599,"grv",true]
			,[311,"grxml",true]
			,[1255,"gsf",true]
			,[588,"gsheet",true]
			,[587,"gslides",true]
			,[1272,"gtar",true]
			,[600,"gtm",true]
			,[1651,"gtw",true]
			,[1744,"gv",true]
			,[108,"gxf",true]
			,[579,"gxt",true]
			,[1763,"h",true]
			,[1796,"h261",true]
			,[1797,"h263",true]
			,[1800,"h264",true]
			,[604,"hal",true]
			,[606,"hbci",true]
			,[1767,"hbs",true]
			,[1274,"hdf",true]
			,[1763,"hh",true]
			,[1696,"hjson",true]
			,[1211,"hlp",true]
			,[611,"hpgl",true]
			,[612,"hpid",true]
			,[613,"hps",true]
			,[153,"hqx",true]
			,[1764,"htc",true]
			,[686,"htke",true]
			,[1697,"htm",true]
			,[1697,"html",true]
			,[1191,"hvd",true]
			,[1193,"hvp",true]
			,[1192,"hvs",true]
			,[648,"i2g",true]
			,[627,"icc",true]
			,[1881,"ice",true]
			,[627,"icm",true]
			,[1607,"ico",true]
			,[1682,"ics",true]
			,[1555,"ief",true]
			,[1682,"ifb",true]
			,[1070,"ifm",true]
			,[1643,"iges",true]
			,[629,"igl",true]
			,[646,"igm",true]
			,[1643,"igs",true]
			,[718,"igx",true]
			,[1072,"iif",true]
			,[209,"img",true]
			,[363,"imp",true]
			,[754,"ims",true]
			,[1709,"in",true]
			,[1709,"ini",true]
			,[124,"ink",true]
			,[124,"inkml",true]
			,[1276,"install",true]
			,[397,"iota",true]
			,[126,"ipfix",true]
			,[1073,"ipk",true]
			,[625,"irm",true]
			,[661,"irp",true]
			,[209,"iso",false]
			,[1277,"iso",true]
			,[1071,"itp",true]
			,[630,"ivp",true]
			,[631,"ivu",true]
			,[1755,"jad",true]
			,[1698,"jade",true]
			,[664,"jam",true]
			,[130,"jar",true]
			,[1278,"jardiff",true]
			,[1768,"java",true]
			,[674,"jisp",true]
			,[614,"jlt",true]
			,[1608,"jng",true]
			,[1279,"jnlp",true]
			,[675,"joda",true]
			,[1557,"jpe",true]
			,[1557,"jpeg",true]
			,[1557,"jpg",true]
			,[1807,"jpgm",true]
			,[1805,"jpgv",true]
			,[1807,"jpm",true]
			,[133,"js",true]
			,[137,"json",true]
			,[1696,"json",false]
			,[140,"json5",true]
			,[147,"jsonld",true]
			,[141,"jsonml",true]
			,[1701,"jsx",true]
			,[1443,"kar",true]
			,[678,"karbon",true]
			,[680,"kfo",true]
			,[687,"kia",true]
			,[589,"kml",true]
			,[590,"kmz",true]
			,[688,"kne",true]
			,[688,"knp",true]
			,[682,"kon",true]
			,[683,"kpr",true]
			,[683,"kpt",true]
			,[473,"kpxx",true]
			,[684,"ksp",true]
			,[677,"ktr",true]
			,[1560,"ktx",true]
			,[677,"ktz",true]
			,[685,"kwd",true]
			,[685,"kwt",true]
			,[691,"lasxml",true]
			,[1281,"latex",true]
			,[693,"lbd",true]
			,[694,"lbe",true]
			,[610,"les",true]
			,[1702,"less",true]
			,[1283,"lha",true]
			,[1047,"link66",true]
			,[1709,"list",true]
			,[624,"list3820",true]
			,[624,"listafp",true]
			,[1685,"litcoffee",true]
			,[1289,"lnk",true]
			,[1709,"log",true]
			,[150,"lostxml",true]
			,[209,"lrf",true]
			,[755,"lrm",true]
			,[557,"ltf",true]
			,[1770,"lua",true]
			,[1282,"luac",true]
			,[1507,"lvp",true]
			,[701,"lwp",true]
			,[1283,"lzh",true]
			,[1299,"m13",true]
			,[1299,"m14",true]
			,[1814,"m1v",true]
			,[190,"m21",true]
			,[1449,"m2a",true]
			,[1814,"m2v",true]
			,[1449,"m3a",true]
			,[1533,"m3u",true]
			,[392,"m3u8",true]
			,[1445,"m4a",false]
			,[1531,"m4a",true]
			,[191,"m4p",true]
			,[1851,"m4u",true]
			,[1869,"m4v",true]
			,[160,"ma",true]
			,[156,"mads",true]
			,[501,"mag",true]
			,[555,"maker",true]
			,[1727,"man",true]
			,[1681,"manifest",true]
			,[137,"map",true]
			,[209,"mar",true]
			,[1771,"markdown",true]
			,[161,"mathml",true]
			,[160,"mb",true]
			,[726,"mbk",true]
			,[175,"mbox",true]
			,[711,"mc1",true]
			,[710,"mcd",true]
			,[1736,"mcurl",true]
			,[1771,"md",true]
			,[1293,"mdb",true]
			,[1589,"mdi",true]
			,[1727,"me",true]
			,[1644,"mesh",true]
			,[181,"meta4",true]
			,[180,"metalink",true]
			,[182,"mets",true]
			,[715,"mfm",true]
			,[268,"mft",true]
			,[986,"mgp",true]
			,[1014,"mgz",true]
			,[1443,"mid",true]
			,[1443,"midi",true]
			,[1285,"mie",true]
			,[721,"mif",true]
			,[1636,"mime",true]
			,[1808,"mj2",true]
			,[1808,"mjp2",true]
			,[1870,"mk3d",true]
			,[1532,"mka",true]
			,[1771,"mkd",true]
			,[1870,"mks",true]
			,[1870,"mkv",true]
			,[466,"mlp",true]
			,[416,"mmd",true]
			,[1076,"mmf",true]
			,[1704,"mml",true]
			,[1583,"mmr",true]
			,[1871,"mng",true]
			,[1301,"mny",true]
			,[1286,"mobi",true]
			,[185,"mods",true]
			,[1821,"mov",true]
			,[1879,"movie",true]
			,[1449,"mp2",true]
			,[190,"mp21",true]
			,[1449,"mp2a",true]
			,[1449,"mp3",true]
			,[1812,"mp4",true]
			,[1445,"mp4a",true]
			,[191,"mp4s",true]
			,[1812,"mp4v",true]
			,[732,"mpc",true]
			,[64,"mpd",true]
			,[1814,"mpe",true]
			,[1814,"mpeg",true]
			,[1814,"mpg",true]
			,[1812,"mpg4",true]
			,[1449,"mpga",true]
			,[391,"mpkg",true]
			,[405,"mpm",true]
			,[731,"mpn",true]
			,[772,"mpp",true]
			,[772,"mpt",true]
			,[623,"mpy",true]
			,[727,"mqy",true]
			,[158,"mrc",true]
			,[159,"mrcx",true]
			,[1727,"ms",true]
			,[178,"mscml",true]
			,[546,"mseed",true]
			,[788,"mseq",true]
			,[512,"msf",true]
			,[1644,"msh",true]
			,[1298,"msi",false]
			,[209,"msi",true]
			,[728,"msl",true]
			,[209,"msm",true]
			,[209,"msp",true]
			,[794,"msty",true]
			,[1653,"mts",true]
			,[793,"mus",true]
			,[1041,"musicxml",true]
			,[1299,"mvb",true]
			,[714,"mwf",true]
			,[200,"mxf",true]
			,[1040,"mxl",true]
			,[1369,"mxml",true]
			,[1126,"mxs",true]
			,[1851,"mxu",true]
			,[817,"n-gage",true]
			,[1706,"n3",true]
			,[160,"nb",true]
			,[1173,"nbp",true]
			,[1306,"nc",true]
			,[1246,"ncx",true]
			,[1772,"nfo",true]
			,[816,"ngdat",true]
			,[803,"nitf",true]
			,[800,"nlu",true]
			,[508,"nml",true]
			,[804,"nnd",true]
			,[805,"nns",true]
			,[806,"nnw",true]
			,[1591,"npx",true]
			,[1238,"nsc",true]
			,[698,"nsf",true]
			,[803,"ntf",true]
			,[1308,"nzb",true]
			,[560,"oa2",true]
			,[561,"oa3",true]
			,[559,"oas",true]
			,[1294,"obd",true]
			,[1335,"obj",true]
			,[210,"oda",true]
			,[833,"odb",true]
			,[831,"odc",true]
			,[834,"odf",true]
			,[835,"odft",true]
			,[836,"odg",true]
			,[838,"odi",true]
			,[845,"odm",true]
			,[840,"odp",true]
			,[842,"ods",true]
			,[844,"odt",true]
			,[1452,"oga",true]
			,[1452,"ogg",true]
			,[1818,"ogv",true]
			,[213,"ogx",true]
			,[214,"omdoc",true]
			,[215,"onepkg",true]
			,[215,"onetmp",true]
			,[215,"onetoc",true]
			,[215,"onetoc2",true]
			,[212,"opf",true]
			,[1773,"opml",true]
			,[993,"oprc",true]
			,[699,"org",true]
			,[1194,"osf",true]
			,[1195,"osfpvg",true]
			,[832,"otc",true]
			,[1549,"otf",false]
			,[1258,"otf",true]
			,[837,"otg",true]
			,[847,"oth",true]
			,[839,"oti",true]
			,[841,"otp",true]
			,[843,"ots",true]
			,[846,"ott",true]
			,[216,"oxps",true]
			,[905,"oxt",true]
			,[1774,"p",true]
			,[228,"p10",true]
			,[1311,"p12",true]
			,[1312,"p7b",true]
			,[230,"p7c",true]
			,[230,"p7m",true]
			,[1313,"p7r",true]
			,[231,"p7s",true]
			,[232,"p8",true]
			,[1307,"pac",true]
			,[1774,"pas",true]
			,[997,"paw",true]
			,[1006,"pbd",true]
			,[1614,"pbm",true]
			,[1121,"pcap",true]
			,[1259,"pcf",true]
			,[615,"pcl",true]
			,[616,"pclxl",true]
			,[1612,"pct",true]
			,[449,"pcurl",true]
			,[1611,"pcx",true]
			,[1310,"pdb",false]
			,[993,"pdb",true]
			,[1775,"pde",true]
			,[220,"pdf",true]
			,[1340,"pem",true]
			,[1264,"pfa",true]
			,[1264,"pfb",true]
			,[1264,"pfm",true]
			,[102,"pfr",true]
			,[1311,"pfx",true]
			,[1615,"pgm",true]
			,[1234,"pgn",true]
			,[222,"pgp",true]
			,[1275,"php",true]
			,[1612,"pic",true]
			,[209,"pkg",true]
			,[237,"pki",true]
			,[236,"pkipath",true]
			,[393,"pkpass",true]
			,[1309,"pl",true]
			,[348,"plb",true]
			,[729,"plc",true]
			,[1005,"plf",true]
			,[238,"pls",true]
			,[1309,"pm",true]
			,[440,"pml",true]
			,[1563,"png",true]
			,[1613,"pnm",true]
			,[702,"portpkg",true]
			,[763,"pot",true]
			,[768,"potm",true]
			,[934,"potx",true]
			,[764,"ppam",true]
			,[444,"ppd",true]
			,[1616,"ppm",true]
			,[763,"pps",true]
			,[767,"ppsm",true]
			,[929,"ppsx",true]
			,[763,"ppt",true]
			,[765,"pptm",true]
			,[922,"pptx",true]
			,[993,"pqa",true]
			,[1310,"prc",false]
			,[1286,"prc",true]
			,[697,"pre",true]
			,[225,"prf",true]
			,[240,"ps",true]
			,[349,"psb",true]
			,[1572,"psd",true]
			,[1257,"psf",true]
			,[252,"pskcxml",true]
			,[1016,"ptid",true]
			,[1302,"pub",true]
			,[350,"pvb",true]
			,[361,"pwn",true]
			,[1508,"pya",true]
			,[1852,"pyv",true]
			,[513,"qam",true]
			,[651,"qbo",true]
			,[652,"qfx",true]
			,[1015,"qps",true]
			,[1821,"qt",true]
			,[1020,"qwd",true]
			,[1020,"qwt",true]
			,[1020,"qxb",true]
			,[1020,"qxd",true]
			,[1020,"qxl",true]
			,[1020,"qxt",true]
			,[1536,"ra",false]
			,[1538,"ra",true]
			,[1536,"ram",true]
			,[1314,"rar",true]
			,[1604,"ras",true]
			,[660,"rcprofile",true]
			,[256,"rdf",true]
			,[453,"rdz",true]
			,[409,"rep",true]
			,[1248,"res",true]
			,[1617,"rgb",true]
			,[257,"rif",true]
			,[1517,"rip",true]
			,[1316,"ris",true]
			,[261,"rl",true]
			,[1584,"rlc",true]
			,[262,"rld",true]
			,[1045,"rm",true]
			,[1443,"rmi",true]
			,[1537,"rmp",true]
			,[673,"rms",true]
			,[1046,"rmvb",true]
			,[258,"rnc",true]
			,[1360,"rng",true]
			,[269,"roa",true]
			,[1727,"roff",true]
			,[421,"rp9",true]
			,[1315,"rpm",true]
			,[822,"rpss",true]
			,[821,"rpst",true]
			,[306,"rq",true]
			,[266,"rs",true]
			,[271,"rsd",true]
			,[272,"rss",true]
			,[273,"rtf",true]
			,[1718,"rtf",false]
			,[1717,"rtx",true]
			,[1284,"run",true]
			,[1762,"s",true]
			,[1467,"s3m",true]
			,[1197,"saf",true]
			,[1776,"sass",true]
			,[278,"sbml",true]
			,[626,"sc",true]
			,[1303,"scd",true]
			,[700,"scm",true]
			,[281,"scq",true]
			,[282,"scs",true]
			,[1777,"scss",true]
			,[1737,"scurl",true]
			,[1088,"sda",true]
			,[1087,"sdc",true]
			,[1089,"sdd",true]
			,[1081,"sdkd",true]
			,[1081,"sdkm",true]
			,[285,"sdp",true]
			,[1091,"sdw",true]
			,[1317,"sea",true]
			,[1066,"see",true]
			,[547,"seed",true]
			,[1067,"sema",true]
			,[1068,"semd",true]
			,[1069,"semf",true]
			,[131,"ser",true]
			,[290,"setpay",true]
			,[292,"setreg",true]
			,[618,"sfd-hdstx",true]
			,[1083,"sfs",true]
			,[1779,"sfv",true]
			,[1567,"sgi",true]
			,[1092,"sgl",true]
			,[1722,"sgm",true]
			,[1722,"sgml",true]
			,[1318,"sh",true]
			,[1319,"shar",true]
			,[295,"shf",true]
			,[1697,"shtml",true]
			,[1609,"sid",true]
			,[224,"sig",true]
			,[1468,"sil",true]
			,[1644,"silo",true]
			,[1110,"sis",true]
			,[1110,"sisx",true]
			,[1323,"sit",true]
			,[1324,"sitx",true]
			,[689,"skd",true]
			,[689,"skm",true]
			,[689,"skp",true]
			,[689,"skt",true]
			,[766,"sldm",true]
			,[925,"sldx",true]
			,[1723,"slim",true]
			,[1723,"slm",true]
			,[514,"slt",true]
			,[1094,"sm",true]
			,[1090,"smf",true]
			,[302,"smi",true]
			,[302,"smil",true]
			,[1880,"smv",true]
			,[1093,"smzip",true]
			,[1388,"snd",true]
			,[1260,"snf",true]
			,[209,"so",true]
			,[1312,"spc",true]
			,[1198,"spf",true]
			,[1267,"spl",true]
			,[1746,"spot",true]
			,[284,"spp",true]
			,[283,"spq",true]
			,[1452,"spx",true]
			,[1322,"sql",true]
			,[1337,"src",true]
			,[1325,"srt",true]
			,[312,"sru",true]
			,[307,"srx",true]
			,[313,"ssdl",true]
			,[690,"sse",true]
			,[515,"ssf",true]
			,[314,"ssml",true]
			,[1051,"st",true]
			,[1098,"stc",true]
			,[1100,"std",true]
			,[1177,"stf",true]
			,[1102,"sti",true]
			,[113,"stk",true]
			,[761,"stl",true]
			,[999,"str",true]
			,[1106,"stw",true]
			,[1724,"styl",true]
			,[1724,"stylus",true]
			,[1740,"sub",true]
			,[1577,"sub",false]
			,[1107,"sus",true]
			,[1107,"susp",true]
			,[1326,"sv4cpio",true]
			,[1327,"sv4crc",true]
			,[495,"svc",true]
			,[1108,"svd",true]
			,[1568,"svg",true]
			,[1568,"svgz",true]
			,[1244,"swa",true]
			,[1320,"swf",true]
			,[395,"swi",true]
			,[1097,"sxc",true]
			,[1099,"sxd",true]
			,[1105,"sxg",true]
			,[1101,"sxi",true]
			,[1103,"sxm",true]
			,[1104,"sxw",true]
			,[1727,"t",true]
			,[1328,"t3",true]
			,[795,"taglet",true]
			,[1120,"tao",true]
			,[1330,"tar",true]
			,[359,"tcap",true]
			,[1331,"tcl",true]
			,[1078,"teacher",true]
			,[327,"tei",true]
			,[327,"teicorpus",true]
			,[1332,"tex",true]
			,[1334,"texi",true]
			,[1334,"texinfo",true]
			,[1709,"text",true]
			,[328,"tfi",true]
			,[1333,"tfm",true]
			,[1618,"tga",true]
			,[757,"thmx",true]
			,[1570,"tif",true]
			,[1570,"tiff",true]
			,[1331,"tk",true]
			,[1124,"tmo",true]
			,[1226,"torrent",true]
			,[601,"tpl",true]
			,[1125,"tpt",true]
			,[1727,"tr",true]
			,[1127,"tra",true]
			,[1304,"trm",true]
			,[1811,"ts",true]
			,[331,"tsd",true]
			,[1726,"tsv",true]
			,[1263,"ttc",true]
			,[1263,"ttf",true]
			,[1728,"ttl",true]
			,[1074,"twd",true]
			,[1074,"twds",true]
			,[573,"txd",true]
			,[730,"txf",true]
			,[1709,"txt",true]
			,[1221,"u32",true]
			,[1242,"udeb",true]
			,[1130,"ufd",true]
			,[1130,"ufdl",true]
			,[1269,"ulx",true]
			,[1132,"umj",true]
			,[1133,"unityweb",true]
			,[1134,"uoml",true]
			,[1730,"uri",true]
			,[1730,"uris",true]
			,[1730,"urls",true]
			,[1336,"ustar",true]
			,[1131,"utz",true]
			,[1781,"uu",true]
			,[1490,"uva",true]
			,[455,"uvd",true]
			,[455,"uvf",true]
			,[1575,"uvg",true]
			,[1831,"uvh",true]
			,[1575,"uvi",true]
			,[1832,"uvm",true]
			,[1834,"uvp",true]
			,[1835,"uvs",true]
			,[456,"uvt",true]
			,[1862,"uvu",true]
			,[1836,"uvv",true]
			,[1490,"uvva",true]
			,[455,"uvvd",true]
			,[455,"uvvf",true]
			,[1575,"uvvg",true]
			,[1831,"uvvh",true]
			,[1575,"uvvi",true]
			,[1832,"uvvm",true]
			,[1834,"uvvp",true]
			,[1835,"uvvs",true]
			,[456,"uvvt",true]
			,[1862,"uvvu",true]
			,[1836,"uvvv",true]
			,[457,"uvvx",true]
			,[458,"uvvz",true]
			,[457,"uvx",true]
			,[458,"uvz",true]
			,[1731,"vcard",true]
			,[1231,"vcd",true]
			,[1783,"vcf",true]
			,[602,"vcg",true]
			,[1782,"vcs",true]
			,[1150,"vcx",true]
			,[1157,"vis",true]
			,[1863,"viv",true]
			,[1873,"vob",true]
			,[1091,"vor",true]
			,[1221,"vox",true]
			,[1660,"vrml",true]
			,[1156,"vsd",true]
			,[1159,"vsf",true]
			,[1156,"vss",true]
			,[1156,"vst",true]
			,[1156,"vsw",true]
			,[1761,"vtt",true]
			,[1659,"vtu",true]
			,[1205,"vxml",true]
			,[1244,"w3d",true]
			,[1245,"wad",true]
			,[130,"war",true]
			,[1540,"wav",false]
			,[1524,"wav",false]
			,[1525,"wav",true]
			,[1534,"wax",true]
			,[1599,"wbmp",true]
			,[439,"wbs",true]
			,[1162,"wbxml",true]
			,[784,"wcm",true]
			,[784,"wdb",true]
			,[1590,"wdp",true]
			,[1526,"weba",true]
			,[1338,"webapp",true]
			,[1865,"webm",true]
			,[157,"webmanifest",true]
			,[1602,"webp",true]
			,[1003,"wg",true]
			,[1210,"wgt",true]
			,[784,"wks",true]
			,[1874,"wm",true]
			,[1535,"wma",true]
			,[1290,"wmd",true]
			,[1300,"wmf",true]
			,[1759,"wml",true]
			,[1163,"wmlc",true]
			,[1760,"wmls",true]
			,[1164,"wmlsc",true]
			,[1875,"wmv",true]
			,[1876,"wmx",true]
			,[1300,"wmz",false]
			,[1291,"wmz",true]
			,[103,"woff",true]
			,[104,"woff2",true]
			,[1174,"wpd",true]
			,[785,"wpl",true]
			,[784,"wps",true]
			,[1175,"wqd",true]
			,[1305,"wri",true]
			,[1660,"wrl",true]
			,[1214,"wsdl",true]
			,[1215,"wspolicy",true]
			,[1165,"wtb",true]
			,[1877,"wvx",true]
			,[1221,"x32",true]
			,[1664,"x3d",true]
			,[1661,"x3db",true]
			,[1661,"x3dbz",true]
			,[1663,"x3dv",true]
			,[1663,"x3dvz",true]
			,[1664,"x3dz",true]
			,[1348,"xaml",true]
			,[1321,"xap",true]
			,[1182,"xar",true]
			,[1292,"xbap",true]
			,[568,"xbd",true]
			,[1619,"xbm",true]
			,[1351,"xdf",true]
			,[1113,"xdm",true]
			,[371,"xdp",true]
			,[78,"xdssc",true]
			,[567,"xdw",true]
			,[1357,"xenc",true]
			,[219,"xer",true]
			,[372,"xfdf",true]
			,[1183,"xfdl",true]
			,[1358,"xht",true]
			,[1358,"xhtml",true]
			,[1369,"xhvml",true]
			,[1600,"xif",true]
			,[747,"xla",true]
			,[748,"xlam",true]
			,[747,"xlc",true]
			,[1342,"xlf",true]
			,[747,"xlm",true]
			,[747,"xls",true]
			,[749,"xlsb",true]
			,[750,"xlsm",true]
			,[951,"xlsx",true]
			,[747,"xlt",true]
			,[751,"xltm",true]
			,[957,"xltx",true]
			,[747,"xlw",true]
			,[1541,"xm",true]
			,[1360,"xml",true]
			,[1784,"xml",false]
			,[861,"xo",true]
			,[1365,"xop",true]
			,[1343,"xpi",true]
			,[1366,"xpl",true]
			,[1621,"xpm",true]
			,[662,"xpr",true]
			,[786,"xps",true]
			,[647,"xpw",true]
			,[647,"xpx",true]
			,[1360,"xsd",true]
			,[1360,"xsl",true]
			,[1367,"xslt",true]
			,[1111,"xsm",true]
			,[1368,"xspf",true]
			,[741,"xul",true]
			,[1369,"xvm",true]
			,[1369,"xvml",true]
			,[1622,"xwd",true]
			,[1548,"xyz",true]
			,[1344,"xz",true]
			,[1786,"yaml",true]
			,[1370,"yang",true]
			,[1371,"yin",true]
			,[1786,"yml",true]
			,[1780,"ymp",true]
			,[1345,"z1",true]
			,[1345,"z2",true]
			,[1345,"z3",true]
			,[1345,"z4",true]
			,[1345,"z5",true]
			,[1345,"z6",true]
			,[1345,"z7",true]
			,[1345,"z8",true]
			,[1204,"zaz",true]
			,[1372,"zip",true]
			,[1203,"zir",true]
			,[1203,"zirz",true]
			,[605,"zmm",true]
		].forEach(function(x){
			__mimeTypes.push({ "mimeId": x[0], "extension": x[1], "isDefault": x[2] });
		});
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
