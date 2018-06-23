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
			_config.logger("Locust.Storage.LocalDataStore", "bad keyProtector. default keyProtector used.");
			_config.keyProtector = _defaultKeyProtector;
		}
		if (!_config.valueChannel || !_config.valueChannel.serialize || !_config.valueChannel.deserialize || typeof _config.valueChannel.serialize != "function" || typeof _config.valueChannel.deserialize != "function") {
			_config.logger("Locust.Storage.LocalDataStore", "bad valueChannel. default valueChannel used.");
			_config.valueChannel = _defaultValueChannel;
		}
		if (!_config.name) {
            _config.name = "_locust.storage.lds" + _id;
        }
		if (_config.useCompression && !w.Locust.Compression) {
			_config.logger("Locust.Storage.LocalDataStore", "Locust.Compression namespace not found (use 'Locust.Compression.js'). aborting.");
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
				_config.logger.log("Locust.Storage.LocalDataStore._ctor(): client does not support localStorage.");
				
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
                _config.logger.log(_name, "_ctor()", e);
                _data = [];
                save();
            }
        };

        _ctor();

        // private methods

        function save() {
			if (!w.localStorage) {
				_config.logger.log("Locust.Storage.LocalDataStore.save(): client does not support localStorage.");
				
				return;
			}
			
            try {
                var result = [];
                for (var i = 0; i < _data.length; i++) {
					try {
						var d = _config.valueChannel.serialize(_data[i].value);
						result.push(_config.keyProtector.encode(_data[i].key) + _config.keyProtector.separator + d);
					} catch(e) {
						_config.logger.log(_name, "save(): item[" + i + "]", e);
					}
                };
                var str = result.join(_config.separator);
                var compressed = (_config.useCompression)? _config.compressor.compressString(str): str;

                w.localStorage.setItem(_config.name, compressed);
            } catch (e) {
                _config.logger.log(_name, "save()", e);
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

