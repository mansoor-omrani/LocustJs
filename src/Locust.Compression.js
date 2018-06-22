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
