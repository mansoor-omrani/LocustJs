(function (w) {
    if (!w) {
        console.log("Locust.Compression: no context given (use 'Locust.Base.js')");
        return;
    }
    if (!w.Locust) {
        console.log("Locust.Compression: Locust namespace not found (use 'Locust.Base.js')");
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

        if (!_config.logger) {
            if (Locust && Locust.Logging && Locust.Logging.ConsoleLogger) {
                _config.logger = new Locust.Logging.ConsoleLogger();
            } else {
                _config.logger = {
                    log: function (category, message) { console.log((category ? category + (data ? ": " + data : "") : data)); }
                }
            }
        }

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
