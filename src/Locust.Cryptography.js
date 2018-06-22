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
