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
	
	if (!w.Locust.DOM.CreateElement) {
        w.Locust.DOM.CreateElement = function (tag, config) {
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
						for (var key in Object.keys(config)) {
							if (config.hasOwnProperty(key)) {
								var _key = key.toLowerCase();
								switch (_key) {
									case "style":
										if (typeof config.style == "string") {
											result.attr("style", config.style);
										} else {
											for (var key in Object.keys(config.style)) {
												if (config.style.hasOwnProperty(key)) {
													result.css(key, config.style[key]);
												}
											}
										}
										break;
									case "data":
										for (var key in Object.keys(config.data)) {
											if (config.data.hasOwnProperty(key)) {
												result.data(key, config.data[key]);
											}
										}
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
							}
						}
					}
				}
			}
			
			return result;
        }
    }
	if (!w.Locust.DOM.CreateOption) {
        w.Locust.DOM.CreateOption = function (config) {
			if (typeof config != "object") {
				config = { text: config, value: config };
			}
            var result = w.Locust.DOM.CreateElement("<option>", config);
			
			return result;
        }
    }
	if (!w.Locust.DOM.AppendOptions) {
        w.Locust.DOM.AppendOptions = function (parentElement, config) {
			if (parentElement) {
				var _options = (config && config.options) || config;
				
				if (w.jQuery.isArray(_options)) {
					_options.forEach(function(x) {
						var _option = w.Locust.DOM.CreateOption(x);
						parentElement.append(_option);
					});
				}
			}
			
			return parentElement;
		}
	}
	if (!w.Locust.DOM.CreateSelect) {
        w.Locust.DOM.CreateSelect = function (config) {
            var result = w.Locust.DOM.CreateElement("<select>", config);
			
			w.Locust.DOM.AppendOptions(result, config);
			
			return result;
        }
    }
	if (!w.Locust.DOM.CreateItem) {
        w.Locust.DOM.CreateItem = function (config) {
			if (typeof config != "object") {
				config = { html: config };
			}
            var result = w.Locust.DOM.CreateElement("<li>", config);
			
			return result;
        }
    }
	if (!w.Locust.DOM.AppendItems) {
        w.Locust.DOM.AppendItems = function (parentElement, config) {
			if (parentElement) {
				var _items = (config && config.items) || config;
				
				if (w.jQuery.isArray(_items)) {
					_items.forEach(function(x) {
						var _item = w.Locust.DOM.CreateItem(x);
						parentElement.append(_item);
					});
				}
			}
			
			return parentElement;
		}
	}
	if (!w.Locust.DOM.CreateList) {
        w.Locust.DOM.CreateList = function (config) {
			var tag = "<ul>";
			if (config && config.type != undefined) {
				tag = "<ol>";
			}
            var result = w.Locust.DOM.CreateElement(tag, config);
			
			w.Locust.DOM.AppendItems(result, config);
			
			return result;
        }
    }
	if (!w.Locust.DOM.CreateTableCell) {
        w.Locust.DOM.CreateTableCell = function (config, tag) {
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
				result = w.Locust.DOM.CreateElement(_tag, config);
			}
			
			return result;
		}
	}
	if (!w.Locust.DOM.CreateTableRow) {
        w.Locust.DOM.CreateTableRow = function (config) {
            var result;

			if (w.jQuery.isArray(config)) {
				result = w.jQuery("<tr>");
				config.forEach(function(x) {
					var td = w.Locust.DOM.CreateTableCell(x);
					result.append(td);
				});
			} else {
				result = w.Locust.DOM.CreateElement("<tr>", config);
			
				if (w.jQuery.isArray(config.cols)) {
					config.cols.forEach(function(x) {
						var td = w.Locust.DOM.CreateTableCell(x);
						result.append(td);
					});
				}
			}
			
			return result;
        }
    }
	if (!w.Locust.DOM.AppendTableCells) {
        w.Locust.DOM.AppendTableCells = function (parentElement, config, tag) {
			if (parentElement) {
				var _cells = (config && config.cols) || (config && config.cells) || config;
				
				if (w.jQuery.isArray(_cells)) {
					_cells.forEach(function(x) {
						var td = w.Locust.DOM.CreateTableCell(x, tag);
						parentElement.append(td);
					});
				}
			}
			
			return parentElement;
		}
	}
	if (!w.Locust.DOM.AppendTableRows) {
        w.Locust.DOM.AppendTableRows = function (parentElement, config) {
			if (parentElement) {
				var _rows = (config && config.rows) || config;
				
				if (w.jQuery.isArray(_rows)) {
					_rows.forEach(function(x) {
						var tr = w.Locust.DOM.CreateTableRow(x);
						parentElement.append(tr);
					});
				}
			}
			return parentElement;
		}
	}
	if (!w.Locust.DOM.CreateTableHead) {
        w.Locust.DOM.CreateTableHead = function (config) {
            var result = w.Locust.DOM.CreateElement("<thead>", config);
			
			if (config && config.cells) {
				w.Locust.DOM.AppendTableCells(result, config.cells, "th");
			}
			
			return result;
        }
    }
	if (!w.Locust.DOM.CreateTableFoot) {
        w.Locust.DOM.CreateTableFoot = function (config) {
            var result = w.Locust.DOM.CreateElement("<tfoot>", config);
			
			if (config && config.cells) {
				w.Locust.DOM.AppendTableCells(result, config.cells);
			}
			
			return result;
        }
    }
	if (!w.Locust.DOM.CreateTableBody) {
        w.Locust.DOM.CreateTableBody = function (config) {
            var result = w.Locust.DOM.CreateElement("<tbody>", config);
			
			w.Locust.DOM.AppendTableRows(result, config);
			
			return result;
        }
    }
	if (!w.Locust.DOM.CreateTable) {
        w.Locust.DOM.CreateTable = function (config) {
            var result = w.Locust.DOM.CreateElement("<table>", config);
			
			if (config && config.caption) {
				var caption = w.Locust.DOM.CreateElement("<caption>", config.caption);
				result.append(caption);
			}
			
			if (config && config.head) {
				var head = w.Locust.DOM.CreateTableHead(config.head);
				result.append(head);
			}
			
			if (config && config.body) {
				var body = w.Locust.DOM.CreateTableBody(config.body);
				result.append(body);
			}
			else {
				w.Locust.DOM.AppendTableRows(result, config);
			}
			
			if (config && config.foot) {
				var foot = w.Locust.DOM.CreateTableFoot(config.foot);
				result.append(foot);
			}
			
			return result;
        }
    }
	if (w.$d == undefined) {
		w.$d = w.Locust.DOM;
	}
})(__locustMainContext);
