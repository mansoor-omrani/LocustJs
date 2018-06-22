(function (w) {
	function __error(msg) {
		if (w.console && w.console.log) {
			console.log(msg);
		} else {
			throw msg;
		}
	};
	if (!w) {
        throw "Locust.Compression: no context given (use 'Locust.Base.js')";
    }
    if (!w.Locust) {
		__error("Locust.Compression: Locust namespace not found (use 'Locust.Base.js')");
		return;
    }
    if (!w.Locust.Compression) {
        w.Locust.Compression = {};
    }
    w.Locust.Compression.ZLibCompression = function (config) {
        var _self = this;
        var _name = "Locust.Compression.ZLibCompression";
        var _config = $.extend({
            logger: null
        }, config);

        _config.logger = w.Locust.validateLogger(_config.logger);

        _self.compressString = function (rawStr) {
            if (!pako) {
                _config.logger.log(_name, "compressString(): pako library not loaded.");
                return "";
            }
            return pako.deflate(rawStr, { to: 'string' })
        }
        _self.decompressString = function (compressedStr) {
            if (!pako) {
                _config.logger.log(_name, "decompressString(): pako library not loaded.");
                return "";
            }
            return pako.inflate(compressedStr, { to: 'string' });
        }
    }
})(__locustMainContext);
