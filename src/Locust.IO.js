//================================= Locust.IO =================================
(function (w) {
    function __error(msg) {
		if (w.console && w.console.error) {
			w.console.error(msg);
		} else {
			throw msg;
		}
	};
	if (!w) {
        throw "Locust.IO: no context given (use 'Locust.Base.js')";
    }
    if (!w.Locust) {
		__error("Locust.IO: Locust namespace not found (use 'Locust.Base.js')");
		return;
    }
	if (!w.Locust.Mime) {
		__error("Locust.IO: Locust.Mime namespace not found (use 'Locust.Base.js')");
		return;
    }
	if (!w.Locust.Logging) {
		__error("Locust.IO: Locust.Logging namespace not found (use 'Locust.Logging.js')");
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

        _config.logger = w.Locust.getLogger(_config.logger);

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
                    _mime = w.Locust.Mime.getMimeType(ext);
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
	if (w.$i == undefined) {
		w.$i = w.Locust.IO;
	}
})(__locustMainContext);
