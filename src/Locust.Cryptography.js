(function (w) {
    function __error(msg) {
		if (w.console && w.console.log) {
			console.log(msg);
		} else {
			throw msg;
		}
	};
	if (!w) {
        throw "Locust.Cryptography: no context given (use 'Locust.Base.js')";
    }
    if (!w.Locust) {
		__error("Locust.Cryptography: Locust namespace not found (use 'Locust.Base.js')");
		return;
    }
	if (!w.Base64) {
		__error("Locust.Cryptography: js-base64 library not found (https://www.npmjs.com/package/js-base64).");
		return;
    }
    if (!w.Locust.Cryptography) {
        w.Locust.Cryptography = {};
    }
	// source: https://jsfiddle.net/orlovsky/sxk584d6/
    // with a little alteration regarding salt and also applying Base64 to encrypt/decrypt
    // requires: js-base64
    w.Locust.Cryptography.XorCrypt = function (config) {
        var _config = { base64: true };
        if (config && typeof config.base64 == "boolean" && !config.base64) {
            _config.base64 = false;
        }
        function keyCharAt(key, i) {
            return key.charCodeAt(Math.floor(i % key.length));
        }

        this.encrypt = function (str, key) {
            var result = '';
            for (var i = 0; i < str.length; i++) {
                result += String.fromCharCode(keyCharAt(key, i) ^ str.charCodeAt(i));

            }
            if (_config.base64)
                return Base64.encode(result);
            else
                return result;
        }

        this.decrypt = function (hash, key) {
            var result = '';
            _hash = _config.base64 ? Base64.decode(hash) : hash;
            for (var i = 0; i < _hash.length; i++) {
                result += String.fromCharCode(keyCharAt(key, i) ^ _hash.charCodeAt(i));
            }
            return result;
        }
    }
})(__locustMainContext);
