//================================= Locust.Extensions.String =================================
(function(w) {
	function __error(msg) {
		if (w.console && w.console.error) {
			w.console.error(msg);
		} else {
			throw msg;
		}
	};
	if (!w) {
		throw "Locust.Extensions.String: no context given (use 'Locust.Base.js')";
	}
	if (!w.Locust) {
		__error("Locust.Extensions.String: Locust namespace not found (use 'Locust.Base.js')");
		return;
	}
	if (!w.Locust.Logging) {
		__error("Locust.Extensions.Array: Locust.Logging namespace not found (use 'Locust.Logging.js')");
		return;
	}
	var _logger = w.Locust.getLogger();
	// ------------------------ String extensions -----------------------------//
	w.StringSplitOptions =
	{
		None: 0,
		RemoveEmptyEntries: 1,
		TrimEntries: 2,
		TrimAndRemoveEmptyEntries: 3,
		ToLowerEntries: 4,
		TrimToLowerAndRemoveEmptyEntries: 5,
		ToUpperEntries: 6,
		TrimToUpperAndRemoveEmptyEntries: 7
	};
	
	if (!w.String.prototype.replaceAll) {
		w.String.prototype.replaceAll = function (find, replace) {
			var str = this;
			return str.replace(new RegExp(find.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&'), 'g'), replace);
		}
	} else {
		_logger.warning("Locust.Extensions.String", "String.prototype.replaceAll already declared.");
	}
	
	if (!w.String.prototype.reverse) {
		w.String.prototype.reverse = function () {
			return this.split("").reverse().join("");
		}
	} else {
		_logger.warning("Locust.Extensions.String", "String.prototype.reverse already declared.");
	}
	
	if (!w.String.prototype.ltrim) {
		w.String.prototype.ltrim = function () {
			return this.replace(/^\s+/, '');
		}
	} else {
		_logger.warning("Locust.Extensions.String", "String.prototype.ltrim already declared.");
	}
	
	if (!w.String.prototype.rtrim) {
		w.String.prototype.rtrim = function () {
			return this.replace(/\s+$/, '');
		}
	} else {
		_logger.warning("Locust.Extensions.String", "String.prototype.rtrim already declared.");
	}
	
	if (!w.String.prototype.toBytes) {
		w.String.prototype.toBytes = function () {
			var data = [];
			for (var i = 0; i < this.length; i++) {
				data.push(this.charCodeAt(i));
			}
			return data;
		}
	} else {
		_logger.warning("Locust.Extensions.String", "String.prototype.toBytes already declared.");
	}
	
	if (!w.String.prototype.format) {
		w.String.prototype.format = function () {
			var s = this;
			if (arguments.length > 0) {
				if (arguments.length == 1) {
					var values = arguments[0];
					
					if (w.Array.isArray(values)) {
						var i = 0;
						values.forEach(function (value) {
							s = s.replaceAll("{" + i + "}", value);
							i++;
						})
					} else if (typeof values == "string") {
						s = s.replaceAll("{0}", values);
					} else {
						for (var key in Object.keys(values)) {
							s = s.replaceAll("{" + key + "}", values[key]);
						}
					}
				} else {
					s = this.replace(/{(\d+)}/g, function (match, number) { return args[number] != undefined ? args[number] : match; });
				}
			}
			
			return s;
		}
	} else {
		_logger.warning("Locust.Extensions.String", "String.prototype.format already declared.");
	}
	
	if (!w.String.prototype.isPunctuation) {
		w.String.prototype.isPunctuation = function () {
			var __punctutationChars = ".,;:?!()-'\"/\\{}[]%#";

			return this.length == 1 && (__punctutationChars.indexOf(this) >= 0);
		}
	} else {
		_logger.warning("Locust.Extensions.String", "String.prototype.isPunctuation already declared.");
	}
	
	if (!w.String.prototype.isControl) {
		w.String.prototype.isControl = function () {
			var __chars = "~!@#$%^&*()_+|<>?:\"{}[];',./-=\\`";

			return this.length == 1 && (__chars.indexOf(this) >= 0);
		}
	} else {
		_logger.warning("Locust.Extensions.String", "String.prototype.isControl already declared.");
	}
	
	if (!w.String.prototype.isAlpha) {
		w.String.prototype.isAlpha = function () {
			return this.match(/^[a-z]+$/i) !== null;
		}
	} else {
		_logger.warning("Locust.Extensions.String", "String.prototype.isAlpha already declared.");
	}
	
	
	if (!w.String.prototype.isLetter) {
		w.String.prototype.isLetter = function () {
			return this.isAlpha();
		}
	} else {
		_logger.warning("Locust.Extensions.String", "String.prototype.isLetter already declared.");
	}
	
	if (!w.String.prototype.isLower) {
		w.String.prototype.isLower = function () {
			return this.match(/^[a-z]+$/) !== null;
		}
	} else {
		_logger.warning("Locust.Extensions.String", "String.prototype.isLower already declared.");
	}
	
	if (!w.String.prototype.isUpper) {
		w.String.prototype.isUpper = function () {
			return this.match(/^[A-Z]+$/) !== null;
		}
	} else {
		_logger.warning("Locust.Extensions.String", "String.prototype.isUpper already declared.");
	}
	
	if (!w.String.prototype.isDigit) {
		w.String.prototype.isDigit = function () {
			return this.match(/^[0-9]+$/) !== null;
		}
	} else {
		_logger.warning("Locust.Extensions.String", "String.prototype.isDigit already declared.");
	}
	
	if (!w.String.prototype.isAlphaNum) {
		w.String.prototype.isAlphaNum = function () {
			return this.match(/^[a-z0-9]+$/i) !== null;
		}
	} else {
		_logger.warning("Locust.Extensions.String", "String.prototype.isAlphaNum already declared.");
	}
	
	if (!w.String.prototype.isArithmatic) {
		w.String.prototype.isArithmatic = function () {
			var __chars = "/\\+-()%^*";
			var result = true;
			
			for (var i = 0; i < this.length; i++) {
				if (__chars.indexOf(this[i]) == -1) {
					result = false;
					break;
				}
			}
			return result && this.length;
		}
	} else {
		_logger.warning("Locust.Extensions.String", "String.prototype.isArithmatic already declared.");
	}
	
	if (!w.String.prototype.isLogic) {
		w.String.prototype.isLogic = function () {
			var __items = ["&&", "||", "!"];

			return (this.length == 1 || this.length == 2) && (__items.indexOf(this) >= 0);
		}
	} else {
		_logger.warning("Locust.Extensions.String", "String.prototype.isLogic already declared.");
	}
	
	if (!w.String.prototype.isBitwise) {
		w.String.prototype.isBitwise = function () {
			var __items = ["&", "|", ">>", "<<"];

			return (this.length == 1 || this.length == 2) && (__items.indexOf(this) >= 0);
		}
	} else {
		_logger.warning("Locust.Extensions.String", "String.prototype.isBitwise already declared.");
	}
	
	if (!w.String.prototype.isComparison) {
		w.String.prototype.isComparison = function () {
			var __items = ["==", "!=", "<>", ">", "<", ">=", "<="];

			return (this.length == 1 || this.length == 2) && (__items.indexOf(this) >= 0);
		}
	} else {
		_logger.warning("Locust.Extensions.String", "String.prototype.isComparison already declared.");
	}
	
	if (!w.String.prototype.isWhitespace) {
		w.String.prototype.isWhitespace = function () {
			return this.length == 1 && (this == '\r' || this == '\n' || this == ' ' || this == '\t' || this == '\v');
		}
	} else {
		_logger.warning("Locust.Extensions.String", "String.prototype.isWhitespace already declared.");
	}
	
	if (!w.String.prototype.isMath) {
		w.String.prototype.isMath = function () {
			return this.isArithmatic() || this.isLogic() || this.isBitwise() || this.isComparison();
		}
	} else {
		_logger.warning("Locust.Extensions.String", "String.prototype.isMath already declared.");
	}
	
	if (!w.String.prototype.splitString) {
		w.String.prototype.splitString = function (separator, splitOptions) {
			var result = [];
			var arr = this.split(separator);
			i = 0;
			while (i < arr.length) {
				var _item;
				var item = arr[i++];
				switch (splitOptions) {
					case w.StringSplitOptions.RemoveEmptyEntries: if (item) result.push(item); break;
					case w.StringSplitOptions.TrimEntries: result.push((item || "").trim()); break;
					case w.StringSplitOptions.TrimAndRemoveEmptyEntries:
						_item = (item || "").toString().trim();
						if (_item)
							result.push(_item);
						break;
					case w.StringSplitOptions.ToLowerEntries: result.push((item || "").toString().toLowerCase()); break;
					case w.StringSplitOptions.TrimToLowerAndRemoveEmptyEntries:
						_item = (item || "").toString().trim().toLowerCase();
						if (_item)
							result.push(_item);
						break;
					case w.StringSplitOptions.ToUpperEntries: result.push((item || "").toString().toUpperCase()); break;
					case w.StringSplitOptions.TrimToUpperAndRemoveEmptyEntries:
						_item = (item || "").toString().trim().toUpperCase();
						if (_item)
							result.push(_item);
						break;
					default: result.push(item); break;
				}
			}
			return result;
		}
	} else {
		_logger.warning("Locust.Extensions.String", "String.prototype.splitString already declared.");
	}
	
	if (!w.String.prototype.nestedSplit) {
		/* examples
			input: "a=1&b=ali"
			output:
			[
				["a",1],
				["b","ali"]
			]
			
			input: "a=1:b=ali&a=2:b=reza:c=true&a=3:b=:c=false&b=saeed:c=true"
			output:
				[
					[ ["a",1],["b", "ali"] ],
					[ ["a",2],["b", "reza"],["c", true] ],
					[ ["a",3],["b"],["c", false] ],
					[ ["b", "saeed"],["c", true] ]
				]
		*/
		w.String.prototype.nestedSplit = function () {
			var result = [];
			
			if (arguments.length > 0) {
				var splitOptions = w.StringSplitOptions.None;
				var separatorsCount = arguments.length;
				
				if (arguments.length > 1) {
					splitOptions = arguments[arguments.length - 1];
					if (splitOptions == w.StringSplitOptions.RemoveEmptyEntries ||
						splitOptions == w.StringSplitOptions.TrimEntries ||
						splitOptions == w.StringSplitOptions.TrimAndRemoveEmptyEntries ||
						splitOptions == w.StringSplitOptions.ToLowerEntries ||
						splitOptions == w.StringSplitOptions.TrimToLowerAndRemoveEmptyEntries ||
						splitOptions == w.StringSplitOptions.ToUpperEntries ||
						splitOptions == w.StringSplitOptions.TrimToUpperAndRemoveEmptyEntries) {
						separatorsCount--;
					} else {
					  splitOptions = w.StringSplitOptions.None;
					}
				}
				
				function splitStringArray(arr, separators, options, i) {
					var _result = [];
					
					if (i < separatorsCount) {
						for (var index in Object.keys(arr)) {
							if (typeof arr[index] == "string") {
								var tempArr = arr[index].splitString(separators[i], options);
								var tempItem = splitStringArray(tempArr, separators, options, i + 1);
								_result.push(tempItem);
							}
						}
					} else {
						_result = arr;
					}
					
					return _result;
				}
				
				result = splitStringArray([this.toString()], arguments, splitOptions, 0)[0];
			}
			
			return result;
		}
	} else {
		_logger.warning("Locust.Extensions.String", "String.prototype.nestedSplit already declared.");
	}
})(__locustMainContext);