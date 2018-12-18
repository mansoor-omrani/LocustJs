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

        _self.compressString = function (rawStr, base64) {
            if (!pako) {
                _config.logger.fail(_name, "compressString(): pako library not loaded.");
                _config.logger.suggest(_name, "https://www.npmjs.com/package/pako");
				
                return "";
            }

            var result = pako.deflate(rawStr, { to: 'string' });

            if (base64 != undefined && base64) {
                if (!Base64) {
                    _config.logger.fail(_name, "compressString(): js-base64 library not loaded.");
                    _config.logger.suggest(_name, "http://travis-ci.org/dankogai/js-base64");
                } else {
                    result = Base64.encode(result);
                }
            }

            return result;
        }
        _self.decompressString = function (compressedStr, base64) {
            if (!pako) {
                _config.logger.fail(_name, "decompressString(): pako library not loaded.");
				_config.logger.suggest(_name, "https://www.npmjs.com/package/pako");
				
                return "";
            }

            var result = compressedStr;

            if (base64 != undefined && base64) {
                if (!Base64) {
                    _config.logger.fail(_name, "decompressString(): js-base64 library not loaded.");
                    _config.logger.suggest(_name, "http://travis-ci.org/dankogai/js-base64");
                } else {
                    result = Base64.decode(result);
                }
            }

            result = pako.inflate(result, { to: 'string' });

            return result;
        }
    }
	if (w.$cm == undefined) {
		w.$cm = w.Locust.Compression;
	}
})(__locustMainContext);
