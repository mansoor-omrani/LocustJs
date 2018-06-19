(function (w) {
    if (!w) {
        console.log("Locust.IO: no context given (use 'Locust.Base.js')");
        return;
    }
    if (!w.Locust) {
        console.log("Locust.IO: Locust namespace not found (use 'Locust.Base.js')");
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

        if (!_config.logger) {
            if (Locust && Locust.Logging && Locust.Logging.ConsoleLogger) {
                _config.logger = new Locust.Logging.ConsoleLogger();
            } else {
                _config.logger = {
                    log: function (category, message) { console.log((category ? category + (data ? ": " + data : "") : data)); }
                }
            }
        }

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
                    if (ext.substr(0, 1) == ".") {
                        ext = ext.substr(1);
                    }
                    if (ext == "mp3") {
                        _mime = "audio/mpeg";
                    } else if (ext == "wav") {
                        _mime = "audio/wav";
                    } else if (ext == "ogg") {
                        _mime = "audio/ogg";
                    } else if (ext == "webm") {
                        _mime = "audio/webm";
                    }
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
