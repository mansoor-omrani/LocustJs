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
    w.Locust.Logging.__LOG_INFO = false;
	w.Locust.Logging.__LOG_PRIMARY = false;
	w.Locust.Logging.__LOG_SECONDARY = false;
	w.Locust.Logging.__LOG_SUCCESS = false;
	w.Locust.Logging.__LOG_ALERT = false;
	w.Locust.Logging.__LOG_WARNING = false;
    w.Locust.Logging.__LOG_DANGER = false;
    w.Locust.Logging.__LOG_FAIL = false;
    w.Locust.Logging.__LOG_ABORT = false;
    w.Locust.Logging.__LOG_CANCEL = false;
    w.Locust.Logging.__LOG_SUGGEST = false;

    w.Locust.Logging.LoggingLevel = {
        None: 0,
        All: 1,
        Trace: 2,
        Errors: 3,
        Normal: 4,
        Interactive: 5
    }
    w.Locust.Logging.setLoggingLevel = function (loggingLevel) {
        var level;

        if (w.Locust.isNumeric(loggingLevel)) {
            level = loggingLevel;
        } else {
            level = (loggingLevel || "").toLowerCase();

            if (level.charCodeAt(0) >= 97 && level.charCodeAt(0) <= 122) {
                level = String.fromCharCode(level.charCodeAt(0) - 32) + level.substr(1);
            }

            level = w.Locust.Logging.LoggingLevel[level];
        }

        switch (level) {
            case w.Locust.Logging.LoggingLevel.None:
                w.Locust.Logging.__LOG_TRACE = false;
                w.Locust.Logging.__LOG_INFO = false;
                w.Locust.Logging.__LOG_PRIMARY = false;
                w.Locust.Logging.__LOG_SECONDARY = false;
                w.Locust.Logging.__LOG_SUCCESS = false;
                w.Locust.Logging.__LOG_ALERT = false;
                w.Locust.Logging.__LOG_WARNING = false;
                w.Locust.Logging.__LOG_DANGER = false;
                w.Locust.Logging.__LOG_FAIL = false;
                w.Locust.Logging.__LOG_ABORT = false;
                w.Locust.Logging.__LOG_CANCEL = false;
                w.Locust.Logging.__LOG_SUGGEST = false;

                break;
            case w.Locust.Logging.LoggingLevel.Errors:
                w.Locust.Logging.__LOG_TRACE = false;
                w.Locust.Logging.__LOG_INFO = false;
                w.Locust.Logging.__LOG_PRIMARY = false;
                w.Locust.Logging.__LOG_SECONDARY = false;
                w.Locust.Logging.__LOG_SUCCESS = false;
                w.Locust.Logging.__LOG_ALERT = false;
                w.Locust.Logging.__LOG_WARNING = true;
                w.Locust.Logging.__LOG_DANGER = true;
                w.Locust.Logging.__LOG_FAIL = true;
                w.Locust.Logging.__LOG_ABORT = true;
                w.Locust.Logging.__LOG_CANCEL = true;
                w.Locust.Logging.__LOG_SUGGEST = false;

                break;
            case w.Locust.Logging.LoggingLevel.Normal:
                w.Locust.Logging.__LOG_TRACE = false;
                w.Locust.Logging.__LOG_INFO = true;
                w.Locust.Logging.__LOG_PRIMARY = true;
                w.Locust.Logging.__LOG_SECONDARY = true;
                w.Locust.Logging.__LOG_SUCCESS = false;
                w.Locust.Logging.__LOG_ALERT = true;
                w.Locust.Logging.__LOG_WARNING = true;
                w.Locust.Logging.__LOG_DANGER = false;
                w.Locust.Logging.__LOG_FAIL = true;
                w.Locust.Logging.__LOG_ABORT = false;
                w.Locust.Logging.__LOG_CANCEL = false;
                w.Locust.Logging.__LOG_SUGGEST = false;

                break;
            case w.Locust.Logging.LoggingLevel.Interactive:
                w.Locust.Logging.__LOG_TRACE = false;
                w.Locust.Logging.__LOG_INFO = false;
                w.Locust.Logging.__LOG_PRIMARY = true;
                w.Locust.Logging.__LOG_SECONDARY = true;
                w.Locust.Logging.__LOG_SUCCESS = false;
                w.Locust.Logging.__LOG_ALERT = false;
                w.Locust.Logging.__LOG_WARNING = false;
                w.Locust.Logging.__LOG_DANGER = false;
                w.Locust.Logging.__LOG_FAIL = false;
                w.Locust.Logging.__LOG_ABORT = false;
                w.Locust.Logging.__LOG_CANCEL = false;
                w.Locust.Logging.__LOG_SUGGEST = true;

                break;
            case w.Locust.Logging.LoggingLevel.Trace:
                w.Locust.Logging.__LOG_TRACE = true;
                w.Locust.Logging.__LOG_INFO = true;
                w.Locust.Logging.__LOG_PRIMARY = false;
                w.Locust.Logging.__LOG_SECONDARY = false;
                w.Locust.Logging.__LOG_SUCCESS = true;
                w.Locust.Logging.__LOG_ALERT = true;
                w.Locust.Logging.__LOG_WARNING = true;
                w.Locust.Logging.__LOG_DANGER = false;
                w.Locust.Logging.__LOG_FAIL = false;
                w.Locust.Logging.__LOG_ABORT = true;
                w.Locust.Logging.__LOG_CANCEL = true;
                w.Locust.Logging.__LOG_SUGGEST = false;

                break;
            case w.Locust.Logging.LoggingLevel.All:
                w.Locust.Logging.__LOG_TRACE = true;
                w.Locust.Logging.__LOG_INFO = true;
                w.Locust.Logging.__LOG_PRIMARY = true;
                w.Locust.Logging.__LOG_SECONDARY = true;
                w.Locust.Logging.__LOG_SUCCESS = true;
                w.Locust.Logging.__LOG_ALERT = true;
                w.Locust.Logging.__LOG_WARNING = true;
                w.Locust.Logging.__LOG_DANGER = true;
                w.Locust.Logging.__LOG_FAIL = true;
                w.Locust.Logging.__LOG_ABORT = true;
                w.Locust.Logging.__LOG_CANCEL = true;
                w.Locust.Logging.__LOG_SUGGEST = true;

                break;
        }
    }

    w.Locust.Logging.setLoggingLevel(w.Locust.Logging.LoggingLevel.Interactive);

	// ------------------------- Locust.Logging.BaseLogger ----------------------------
	
	w.Locust.Logging.BaseLogger = function() {
		var _self = this;
    };
    w.Locust.Logging.BaseLogger.prototype.prepareMessage = function (category, message) {
        var msg = "";

        try {
            msg = (message ? JSON.stringify(message) : "");
        } catch (e) {
            msg = "";
        }

        return (category ? category + ": " : "") + msg;
	};
	w.Locust.Logging.BaseLogger.prototype.log = function (category, message, type) {
		type = type ? type.toLowerCase() : "";
		
		switch (type) {
			case "primary": this.primary(category, message); break;
			case "secondary": this.secondary(category, message); break;
			case "success": this.success(category, message); break;
			case "warn": this.warn(category, message); break;
            case "warning": this.warn(category, message); break;
			case "alert": this.alert(category, message); break;
			case "fail": this.fail(category, message); break;
			case "error": this.danger(category, message); break;
            case "danger": this.danger(category, message); break;
			case "abort": this.abort(category, message); break;
			case "cancel": this.cancel(category, message); break;
			case "suggest": this.suggest(category, message); break;
			case "trace": this.trace(category, message); break;
			default: this.info(category, message);
		}
	};
	
	w.Locust.Logging.BaseLogger.prototype.info = function(category, message) { };
	w.Locust.Logging.BaseLogger.prototype.primary = function(category, message) { };
	w.Locust.Logging.BaseLogger.prototype.secondary = function(category, message) { };
	w.Locust.Logging.BaseLogger.prototype.success = function(category, message) { };
	w.Locust.Logging.BaseLogger.prototype.alert = function(category, message) { };
	w.Locust.Logging.BaseLogger.prototype.warn = function(category, message) { };
    w.Locust.Logging.BaseLogger.prototype.error = function (category, message) {
        this.danger(category, message);
    };
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
		if (category) {
			w.console.log(category);
		}

		w.console.log(message);
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
	w.Locust.Logging.ConsoleLogger.prototype.warn = function(category, message) {
		if (w.Locust.Logging.__LOG_WARNING)
			w.console.warn('%c' + this.prepareMessage(category, message), 'color: ' + w.Locust.Logging.__LOG_WARNING_COLOR);
	};
	w.Locust.Logging.ConsoleLogger.prototype.danger = function(category, message) {
		if (w.Locust.Logging.__LOG_DANGER)
			w.console.error('%c' + this.prepareMessage(category, message), 'color: ' + w.Locust.Logging.__LOG_DANGER_COLOR + ';font-weight:bold');
    };
    w.Locust.Logging.ConsoleLogger.prototype.error = function(category, message) {
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
	w.Locust.Logging.DOMLogger.prototype.warn = function(category, message) {
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
        var methods = ["trace", "info", "primary", "secondary", "success", "alert", "warning", "danger", "error","fail","abort","cancel","suggest"];
		
		if (!logger || typeof logger != "object") {
			ok = false;
		} else {
			for (var i = 0; i < methods.length; i++) {
				if (typeof logger[methods[i]] != "function") {
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
	
	if (w.$lg == undefined) {
		w.$lg = w.Locust.Logging;
	}
})(__locustMainContext);
