(function (w) {
    if (!w) {
        console.log("Locust.Translation: no context given (use 'Locust.Base.js')");
        return;
    }
    if (!w.Locust) {
        console.log("Locust.Translation: Locust namespace not found (use 'Locust.Base.js')");
        return;
    }
    if (!w.Locust.Language) {
        console.log("Locust.Translation: Locust.Language namespace not found (use 'Locust.Language.js')");
        return;
    }
    if (!w.Locust.Logging) {
        console.log("Locust.Logging: Locust.Logging namespace not found (use 'Locust.Logging.js')");
        return;
    }

    if (!w.Locust.TextFileTranslator) {
        w.Locust.TextFileTranslator = function (config) {
            var _config = $.extend({
                name: "Texts",
                basePath: "/localization",
                logger: null,
                files: {
                    cdt: [],
                    cit: []
                }
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

            var _self = this;
            var _store = new Locust.Storage.LocalDataStore({ name: _config.name, useCompression: true });
            var _texts = [];

            function _getValues(rawValues) {
                var result = [];

                if (rawValues) {
                    var buffer = [];
                    var i = 0;
                    var state = 0;

                    while (i < rawValues.length) {
                        var ch = rawValues[i++];

                        switch (state) {
                            case 0:
                                switch (ch) {
                                    case '\\':
                                        state = 1;
                                        break;
                                    case ',':
                                        var value = buffer.join("");
                                        if (value) {
                                            result.push(value);
                                        }
                                        buffer = [];
                                        break;
                                    default:
                                        buffer.push(ch);
                                        break;
                                }

                                break;
                            case 1:
                                if (ch == ',')
                                    buffer.push(ch);
                                else
                                    buffer.push('\\');

                                state = 0;

                                break;
                        }
                    }

                    if (buffer.length > 0) {
                        var value = buffer.join("");

                        if (value) {
                            result.push(value);
                        }
                    }
                }

                return result;
            }
            function _loadCitFile(content) {
                if (content) {
                    var _lines = content.splitString("\n", StringSplitOptions.TrimAndRemoveEmptyEntries);

                    $(_lines).each(function (i, line) {
                        line = line ? line.trim() : "";

                        if (line && line[0] != '#') {
                            var left = line.splitString("/", StringSplitOptions.TrimAndRemoveEmptyEntries);

                            if (left.length == 3) {
                                var key = left[0].trim();
                                var value = left[1].trim();
                                var dotIndex = left[2].indexOf(':');
                                var lang = left[2].substr(0, dotIndex);
                                var values = left[2].substr(dotIndex + 1).trim();

                                _texts.push({
                                    key: (key + "/" + value + "/" + lang),
                                    values: _getValues(values)
                                });
                            }
                        }
                    })
                }
            }
            function _loadCdtFile(content) {
                if (content) {
                    var _lines = content.splitString("\n", StringSplitOptions.TrimAndRemoveEmptyEntries);

                    $(_lines).each(function (i, line) {
                        line = line ? line.trim() : "";

                        if (line && line[0] != '#') {
                            var left = line.splitString("/", StringSplitOptions.TrimAndRemoveEmptyEntries);

                            if (left.length == 4) {
                                var key = left[0].trim();
                                var globalValue = left[1].trim();
                                var culture = left[2].trim();
                                var dotIndex = left[3].indexOf(':');
                                var lang = left[3].substr(0, dotIndex);
                                var values = left[3].substr(dotIndex + 1).trim();

                                _texts.push({
                                    key: (key + "/" + globalValue + "/" + culture + "/" + lang),
                                    values: _getValues(values)
                                });
                            }
                        }
                    })
                }
            }

            _self.load = function () {
                $(_config.cit).each(function (i, f) {
                    var file = _config.basePath + "/cit/" + f;
                    $.post(file).done(function (result) {
                        // _store.addOrUpdate(file, result);
                        _loadCitFile(result);
                    }).fail(function (xhr, text, msg) {
                        _config.logger.log("Locust.Translation.loadCit", "Load fialed: " + file);
                    });
                });

                $(_config.cdt).each(function (i, f) {
                    var file = _config.basePath + "/cdt/" + f;
                    $.post(file).done(function (result) {
                        //_store.addOrUpdate(file, result);
                        _loadCdtFile(result);
                    }).fail(function (xhr, text, msg) {
                        _config.logger.log("Locust.Translation.loadCdt", "Load fialed: " + file);
                    });
                });
            }

            _self.getIndependent = function (key, value, lang) {
                var _lang = lang || w.Locust.Language.Current.shortName;
                var arr = _texts.filter(function (item) {
                    return item.key == (key + "/" + value + "/" + _lang);
                });

                if ($.isArray(arr) && arr.length) {
                    return arr[0];
                }

                return null;
            }
            _self.getDependent = function (key, globalValue, culture, lang) {
                var _lang = lang || w.Locust.Language.Current.shortName;
                var arr = _texts.filter(function (item) {
                    return item.key == (key + "/" + globalValue + "/" + culture + "/" + _lang);
                });

                if ($.isArray(arr) && arr.length) {
                    return arr[0];
                }

                return null;
            }
        }
    }
})(__locustMainContext);
