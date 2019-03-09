//================================= Locust.DOM =================================
(function (w) {
    function __error(msg) {
		if (w.console && w.console.error) {
			w.console.error(msg);
		} else {
			throw msg;
		}
	}
	if (!w) {
        throw "Locust.DOM: no context given (use 'Locust.Base.js')";
    }
    if (!w.Locust) {
		__error("Locust.DOM: Locust namespace not found (use 'Locust.Base.js')");
		return;
    }
	if (!w.Locust.Logging) {
		__error("Locust.DOM: Locust.Logging namespace not found (use 'Locust.Logging.js')");
		return;
	}
	if (!w.jQuery) {
        __error("Locust.DOM: jQuery library not found");
        return;
    }
    if (!w.Locust.DOM) {
        w.Locust.DOM = {};
    }
    w.Locust.DOM.NodeTypes = {
        1: "ELEMENT_NODE",
        2: "ATTRIBUTE_NODE",
        3: "TEXT_NODE",
        8: "COMMENT_NODE",
        9: "DOCUMENT_NODE",
        10: "DOCUMENT_TYPE_NODE",

        "ELEMENT_NODE":	1,
        "ATTRIBUTE_NODE": 2,
        "TEXT_NODE": 3,
        "COMMENT_NODE": 8,
        "DOCUMENT_NODE": 9,
        "DOCUMENT_TYPE_NODE": 10
    };

    if (!w.Locust.DOM.AppendScript) {
        w.Locust.DOM.AppendScript = function (src) {
			if (!w.document) return;
			
            var _script = w.document.createElement('script');

            _script.setAttribute('src', src);

            w.document.body.appendChild(_script);
        }
    }
    if (!w.Locust.DOM.AppendStyle) {
        w.Locust.DOM.AppendStyle = function (href) {
			if (!w.document) return;
			
            var _link = w.document.createElement('link');

            _link.setAttribute('href', href);
            _link.setAttribute('rel', 'stylesheet');

            w.document.head.appendChild(_link);
        }
    }
	
	w.Locust.DOM.__events = ["click","dblclick","keydown","keyup","keypress","focus","blur","focusin","focusout","contextmenu","select","mouseover","mouseout","mouseenter","mouseleave","mouseup","mousedown","mousemove","load","unload","change","submit","hover", "change","resize","scroll"];
	
	if (!w.Locust.DOM.createElement) {
        w.Locust.DOM.createElement = function (tag, config) {
			var result;
			
			if (tag && tag.length) {
				if (tag[0] != '<') {
					tag = '<' + tag + '>';
				}
				
				result = w.jQuery(tag);
				
				if (config) {
					if (typeof config == "string") {
						result.html(config);
					} else {
						w.Locust.eachKey(config, function(key) {
							var _key = key.toLowerCase();
							
							switch (_key) {
								case "style":
									if (typeof config.style == "string") {
										result.attr("style", config.style);
									} else {
										w.Locust.eachKey(config.style, function(key) {
											result.css(key, config.style[key]);
										});
									}
									break;
								case "data":
									w.Locust.eachKey(config.data, function(key) {
										result.data(key, config.data[key]);
									});
									break;
								case "value":
									result.val(config.value);
									break;
								case "text":
									result.text(config.text);
									break;
								case "children":
									result.append(config.children);
									break;
								case "html":
									result.html(config.html);
									break;
								default:
									if (w.jQuery.isFunction(config[key])) {
										var _eventIndex = w.Locust.DOM.__events.indexOf(_key);
										
										if (_eventIndex >= 0) {
											result[w.Locust.DOM.__events[_eventIndex]](config[key]);
										}
									} else {
										if (w.Locust.isEmpty(config[key])) {
											result.attr(key, config[key]);
										}
									}
									
									break;
							}
						});
					}
				}
			}
			
			return result;
        }
    }
	if (!w.Locust.DOM.createOption) {
        w.Locust.DOM.createOption = function (config) {
			if (typeof config != "object") {
				config = { text: config, value: config };
			}
            var result = w.Locust.DOM.createElement("<option>", config);
			
			return result;
        }
    }
	if (!w.Locust.DOM.appendOptions) {
        w.Locust.DOM.appendOptions = function (parentElement, config) {
			if (parentElement) {
				var _options = (config && config.options) || config;
				
				if (w.jQuery.isArray(_options)) {
					_options.forEach(function(x) {
						var _option = w.Locust.DOM.createOption(x);
						parentElement.append(_option);
					});
				}
			}
			
			return parentElement;
		}
	}
	if (!w.Locust.DOM.createSelect) {
        w.Locust.DOM.createSelect = function (config) {
            var result = w.Locust.DOM.createElement("<select>", config);
			
			w.Locust.DOM.appendOptions(result, config);
			
			return result;
        }
    }
	if (!w.Locust.DOM.createItem) {
        w.Locust.DOM.createItem = function (config) {
			if (typeof config != "object") {
				config = { html: config };
			}
            var result = w.Locust.DOM.createElement("<li>", config);
			
			return result;
        }
    }
	if (!w.Locust.DOM.appendItems) {
        w.Locust.DOM.appendItems = function (parentElement, config) {
			if (parentElement) {
				var _items = (config && config.items) || config;
				
				if (w.jQuery.isArray(_items)) {
					_items.forEach(function(x) {
						var _item = w.Locust.DOM.createItem(x);
						parentElement.append(_item);
					});
				}
			}
			
			return parentElement;
		}
	}
	if (!w.Locust.DOM.createList) {
        w.Locust.DOM.createList = function (config) {
			var tag = "<ul>";
			if (config && config.type != undefined) {
				tag = "<ol>";
			}
            var result = w.Locust.DOM.createElement(tag, config);
			
			w.Locust.DOM.appendItems(result, config);
			
			return result;
        }
    }
	if (!w.Locust.DOM.createTableCell) {
        w.Locust.DOM.createTableCell = function (config, tag) {
			var result;
			var _tag = "<td>";
			
			if (tag) {
				tag = tag.toString().toLowerCase();
				if (tag == "th" || tag == "<th>") {
					_tag = "<th>";
				}
			}
			if (w.Locust.isEmpty(config)) {
				result = w.jQuery(_tag).html(config);
			} else {
				result = w.Locust.DOM.createElement(_tag, config);
			}
			
			return result;
		}
	}
	if (!w.Locust.DOM.createTableRow) {
        w.Locust.DOM.createTableRow = function (config) {
            var result;

			if (w.jQuery.isArray(config)) {
				result = w.jQuery("<tr>");
				config.forEach(function(x) {
					var td = w.Locust.DOM.createTableCell(x);
					result.append(td);
				});
			} else {
				result = w.Locust.DOM.createElement("<tr>", config);
			
				if (w.jQuery.isArray(config.cols)) {
					config.cols.forEach(function(x) {
						var td = w.Locust.DOM.createTableCell(x);
						result.append(td);
					});
				}
			}
			
			return result;
        }
    }
	if (!w.Locust.DOM.appendTableCells) {
        w.Locust.DOM.appendTableCells = function (parentElement, config, tag) {
			if (parentElement) {
				var _cells = (config && config.cols) || (config && config.cells) || config;
				
				if (w.jQuery.isArray(_cells)) {
					_cells.forEach(function(x) {
						var td = w.Locust.DOM.createTableCell(x, tag);
						parentElement.append(td);
					});
				}
			}
			
			return parentElement;
		}
	}
	if (!w.Locust.DOM.appendTableRows) {
        w.Locust.DOM.appendTableRows = function (parentElement, config) {
			if (parentElement) {
				var _rows = (config && config.rows) || config;
				
				if (w.jQuery.isArray(_rows)) {
					_rows.forEach(function(x) {
						var tr = w.Locust.DOM.createTableRow(x);
						parentElement.append(tr);
					});
				}
			}
			return parentElement;
		}
	}
	if (!w.Locust.DOM.createTableHead) {
        w.Locust.DOM.createTableHead = function (config) {
            var result = w.Locust.DOM.createElement("<thead>", config);
			
			if (config && config.cells) {
				w.Locust.DOM.appendTableCells(result, config.cells, "th");
			}
			
			return result;
        }
    }
	if (!w.Locust.DOM.createTableFoot) {
        w.Locust.DOM.createTableFoot = function (config) {
            var result = w.Locust.DOM.createElement("<tfoot>", config);
			
			if (config && config.cells) {
				w.Locust.DOM.appendTableCells(result, config.cells);
			}
			
			return result;
        }
    }
	if (!w.Locust.DOM.createTableBody) {
        w.Locust.DOM.createTableBody = function (config) {
            var result = w.Locust.DOM.createElement("<tbody>", config);
			
			w.Locust.DOM.appendTableRows(result, config);
			
			return result;
        }
    }
	if (!w.Locust.DOM.createTable) {
        w.Locust.DOM.createTable = function (config) {
            var result = w.Locust.DOM.createElement("<table>", config);
			
			if (config && config.caption) {
				var caption = w.Locust.DOM.createElement("<caption>", config.caption);
				result.append(caption);
			}
			
			if (config && config.head) {
				var head = w.Locust.DOM.createTableHead(config.head);
				result.append(head);
			}
			
			if (config && config.body) {
				var body = w.Locust.DOM.createTableBody(config.body);
				result.append(body);
			}
			else {
				w.Locust.DOM.appendTableRows(result, config);
			}
			
			if (config && config.foot) {
				var foot = w.Locust.DOM.createTableFoot(config.foot);
				result.append(foot);
			}
			
			return result;
        }
    }
    w.Locust.DOM.traverse = function (node, fnCallback, depth) {
        if (!depth) {
            depth = 0;
        }

        if (node && node.childNodes && node.childNodes.length && fnCallback && typeof fnCallback == "function") {
            for (var i = 0; i < node.childNodes.length; i++) {
                var n = node.childNodes[i];

                fnCallback(n, i, depth);

                w.Locust.DOM.traverse(n, fnCallback, depth + 1);
            }
        }
    }
	if (w.$d == undefined) {
		w.$d = w.Locust.DOM;
	}
})(__locustMainContext);
