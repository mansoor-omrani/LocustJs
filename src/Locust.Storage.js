(function (w) {
    if (!w) {
        console.log("Locust.Storage: no context given (use 'Locust.Base.js')");
        return;
    }
    if (!w.Locust) {
        console.log("Locust.Storage: Locust namespace not found (use 'Locust.Base.js')");
        return;
    }
    if (!w.Locust.Logging) {
        console.log("Locust.Storage: Locust.Logging namespace not found (use 'Locust.Logging.js')");
        return;
    }
    if (!w.Locust.Storage) {
        w.Locust.Storage = {};
    }

    w.Locust.Storage.LocalDataStore = function (config) {
        w.Locust.Storage.LocalDataStore._id = (w.Locust.Storage.LocalDataStore._id || 0) + 1;

        var _self = this;
        var _name = "Locust.Storage.LocalDataStore";
        var _id = w.Locust.Storage.LocalDataStore._id;
        var _config = $.extend({
            name: "",
            separator: "$",
            useCompression: false,
            compressor: null,
            logger: null
        }, config);

        if (!_config.name) {
            _config.name = "_locust.storage.lds" + _id;
        }
        if (!_config.separator) {
            _config.separator = "$";
        }
        if (!_config.logger) {
            if (Locust && Locust.Logging && Locust.Logging.ConsoleLogger) {
                _config.logger = new Locust.Logging.ConsoleLogger();
            } else {
                _config.logger = {
                    log: function (category, message) { console.log((category ? category + (data ? ": " + data : "") : data)); }
                }
            }
        }
        if (_config.useCompression && !_config.compressor) {
            _config.compressor = new Locust.Compression.ZLibCompression({ logger: _config.logger });
        }

        var _data = [];
        var MAX_LENGTH = 5;

        w.Locust.Storage.LocalDataStore.prototype.dispose = function () {
            return w.Locust.Storage.LocalDataStore._id -= 1;
        };
        _self.getConfig = function () {
            return _config;
        };
        _self.getId = function () {
            return _id;
        };
        function rand(i, j) {
            return Math.floor(Math.random() * j) + 1;
        };
        function NumToCode(n) {
            var arr = [];
            var s = n.toString();

            arr.push(String.fromCharCode(109 + rand(0, 10)));

            for (var i = s.length - 1; i >= 0; i--) {
                arr.push(String.fromCharCode((i % 2 == 0 ? 65 + parseInt(s[i]) : 97 + parseInt(s[i]))));
            };

            if (arr.length < MAX_LENGTH)
                arr.unshift(String.fromCharCode(77 + rand(0, 10)));
            if (arr.length < MAX_LENGTH)
                arr.push(String.fromCharCode(77 + rand(0, 10)));
            if (arr.length < MAX_LENGTH)
                arr.push(String.fromCharCode(109 + rand(0, 10)));

            return arr.join("");
        };
        function CodeToNum(code) {
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
        // constructor
        function _ctor() {
            try {
                var str = localStorage.getItem(_config.name);
                var decompressed = (_config.useCompression)? _config.compressor.decompressString(str): str;

                if (decompressed) {
                    var arr = decompressed.split(_config.separator);

                    for (var i = 0; i < arr.length; i++) {
                        if (arr[i].length >= MAX_LENGTH) {
                            try {
                                var p = CodeToNum(arr[i].substr(0, MAX_LENGTH))
                                _data.push({ id: p, data: arr[i].substr(MAX_LENGTH) });
                            } catch (e) { }
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
            try {
                var result = [];
                for (var i = 0; i < _data.length; i++) {
                    result.push(NumToCode(_data[i].id) + _data[i].data);
                };
                var str = result.join(_config.separator);
                var compressed = (_config.useCompression)? _config.compressor.compressString(str): str;

                localStorage.setItem(_config.name, compressed);
            } catch (e) {
                _config.logger.log(_name, "save()", e);
            }
        };

        // public methods
        _self.getById = function (id) {
            var x = _data.length ?
                _data.filter(function (item) {
                    return item.id == id;
                })[0] : null;
            return (x) ? x.data : null;
        };
        _self.getByIndex = function (index) {
            if (_data.length && index && index >= 0 && index < _data.length)
                return _data[index];
            else
                return null;
        };
        _self.indexOf = function (id) {
            for (var i = 0; i < _data.length; i++) {
                if (_data[i].id == id) {
                    return i;
                }
            };
            return -1;
        };
        _self.updateById = function (id, data) {
            var index = _self.indexOf(id);

            if (index >= 0) {
                _self.updateByIndex(index, data);
            }
        };
        _self.updateByIndex = function (index, data) {
            if (index >= 0 && index < _data.length) {
                _data[index].data = data;
                save();
            }
        };
        _self.add = function (id, data) {
            var index = _self.indexOf(id);
            if (index < 0) {
                _data.push({ id: id, data: data });
            };
            save();
        };
        _self.addOrUpdate = function (id, data, fnUpdate) {
            var x = _self.getById(id);
            if (!x) {
                _data.push({ id: id, data: data });
            } else {
                if (fnUpdate && typeof fnUpdate == "function") {
                    _self.updateById(id, fnUpdate(x));
                } else {
                    // this seems to be unnecessary. because the item
                    // was already in the storage. there's no need to update it.

                    //_self.updateById(id, x);
                }
            };
            save();
        };
        _self.removeById = function (id) {
            var index = _self.indexOf(id);
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

