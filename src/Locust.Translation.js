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
    
	if (!w.Locust.TextFileTranslator) {
		w.Locust.TextFileTranslator = function (config) {
			var _config = $.extend({
                logger: null,
                files: {
                    cdt: [],
                    cit: []
                }
            }, config);

            _config.logger = w.Locust.validateLogger(_config.logger);

            var _self = this;
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
            };
            function _loadCitFile(content) {
				var result = [];
				
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

                                result.push({
                                    key: (key + "/" + value + "/" + lang),
                                    values: _getValues(values)
                                });
                            }
                        }
                    })
                }
				
				return result;
            };
            function _loadCdtFile(content) {
				var result = [];
				
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

                                result.push({
                                    key: (key + "/" + globalValue + "/" + culture + "/" + lang),
                                    values: _getValues(values)
                                });
                            }
                        }
                    })
                }
				
				return result;
            };
		}
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
                        log: function (category, data) { console.log((category ? category + (data ? ": " + data : "") : data)); }
                    }
                }
            }

            var _self = this;
            var _store = new Locust.Storage.LocalDataStore({ name: _config.name, useCompression: true });
            
            var loadTexts = function(storenames, type) {
				$(storenames).each(function (i, storename) {
					var hash = "";
					var item = _store.getByKey(storename);
					
					if (item && item.value) {
						hash = item.value.hash;
					}
					
                    var file = _config.basePath + "/" + type + "/" + storename;
					
                    $.post(file,{hash:hash}).done(function (result) {
                        if (result && result.Hash) {
							_store.addOrUpdate(storename, { hash: result.Hash, items: result.Data });
						} else {
							_config.logger.log("Locust.Translation.loadTexts", "no response: " + file + ", type: " + type);
						}
                    }).fail(function (xhr, text, msg) {
                        _config.logger.log("Locust.Translation.loadTexts", "failed: " + file + ", type: " + type);
                    });
                });
			};
			
			_self.load = function () {
				loadTexts(_config.cit, "cit");
				loadTexts(_config.cdt, "cdt");
            };
			_self.get = function(key, value1, value2, lang) {
				var _lang;
				var _key = key;
				var _globalValue = "";
				var _value = "";
				var searchKey = "";
				
				if (value1 == undefined && value2 == undefined && lang == undefined) {
					searchKey = key;
				} else {
					if (lang == undefined) {
						_value = value1;
						_lang = value2 || w.Locust.Language.Current.shortName;
						
						searchKey = "/" + _key + "/" + _value + "/" + _lang;
					} else {
						_globalValue = value1;
						_value = value2;
						_lang = lang || w.Locust.Language.Current.shortName;
						
						searchKey = "/" + _key + "/" + _globalValue + "/" + _value + "/" + _lang;
					}
				}
				
				if (searchKey) {
					try {
						for (var i = 0; i < _store.count(); i++) {
							var item = _store.getByIndex(i);
							var items = item.value.items;
							
							if (items) {
								for (var __key in items) {
									if (__key == searchKey) {
										return items[key];
									}
								}
							}
						}
					} catch (e) {
						_config.logger.log("Translation.getSingle error: " + e + ", args: key=" + key + ", value1=" + value1 + ", value2=" + value2 + ", lang=" + lang);
					}
				}
				
				return [];
			};
			_self.getSingle = function(key, value1, value2, lang) {
				var result = "";
				var values = _self.get(key, value1, value2, lang);
				
				if (values && values.length) {
					result = values[0];
				}
				
				return result;
			}
        }
    }
})(__locustMainContext);
