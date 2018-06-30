//================================= Locust.Conversion =================================
(function (w) {
    function __error(msg) {
		if (w.console && w.console.error) {
			w.console.error(msg);
		} else {
			throw msg;
		}
	}
	if (!w) {
        throw "Locust.Convert: no context given (use 'Locust.Base.js')";
    }
    if (!w.Locust) {
		__error("Locust.Convert: Locust namespace not found (use 'Locust.Base.js')");
		return;
    }
	if (!w.jQuery) {
        __error("Locust.Convert: jQuery library not found");
        return;
    }
    if (!w.Locust.Convert) {
        w.Locust.Convert = {};
    }
    w.Locust.Convert.TryParseInt = function (str, defaultValue) {
        // source: http://pietschsoft.com/post/2008/01/14/JavaScript-intTryParse-Equivalent
        var result = defaultValue;
		
        if (str !== null) {
            if (str.length > 0) {
                if (!w.isNaN(str)) {
                    result = w.parseInt(str);
                }
            }
        }
		
        return result;
    }
	if (!w.Locust.Convert.ToArrayBuffer) {
        w.Locust.Convert.ToArrayBuffer = function (buf) {
            var ab = new ArrayBuffer(buf.length);
            var view = new Uint8Array(ab);
			
            for (var i = 0; i < buf.length; ++i) {
                view[i] = buf[i];
            }
			
            return ab;
        }
    }
    if (!w.Locust.Convert.BytesToString) {
        w.Locust.Convert.BytesToString = function (bytes, utf8) {
            utf8 = !!utf8;

            var len = bytes.length,
                chars = new Array(len);

            for (var i = 0, j = 0; i < len; i++) {
                var b = bytes[i];
                if (!utf8 || b < 128) {
                    chars[j++] = b;
                } else if (b >= 192 && b < 224 && i + 1 < len) {
                    chars[j++] = ((b & 0x1f) << 6) | (bytes[++i] & 0x3f);
                } else if (b >= 224 && b < 240 && i + 2 < len) {
                    chars[j++] = ((b & 0xf) << 12) | ((bytes[++i] & 0x3f) << 6) | (bytes[++i] & 0x3f);
                } else if (b >= 240 && b < 248 && i + 3 < len) {
                    var c = ((b & 7) << 18) |
                        ((bytes[++i] & 0x3f) << 12) |
                        ((bytes[++i] & 0x3f) << 6) |
                        (bytes[++i] & 0x3f);
                    if (c <= 0xffff) {
                        chars[j++] = c;
                    } else {
                        c ^= 0x10000;
                        chars[j++] = 0xd800 | (c >> 10);
                        chars[j++] = 0xdc00 | (c & 0x3ff);
                    }
                } else {
                    throw new Error("Malformed UTF8 character at byte offset " + i);
                }
            }

            var str = '',
                bs = 16384;
            for (var i = 0; i < j; i += bs) {
                str += String.fromCharCode.apply(String, chars.slice(i, i + bs <= j ? i + bs : j));
            }

            return str;
        }
    }
    if (!w.Locust.Convert.StringToBytes) {
        w.Locust.Convert.StringToBytes = function (str, utf8) {
            utf8 = !!utf8;

            var len = str.length,
                bytes = new Uint8Array(utf8 ? 4 * len : len);

            for (var i = 0, j = 0; i < len; i++) {
                var c = str.charCodeAt(i);

                if (utf8 && 0xd800 <= c && c <= 0xdbff) {
                    if (++i >= len) throw new Error("Malformed string, low surrogate expected at position " + i);
                    c = ((c ^ 0xd800) << 10) | 0x10000 | (str.charCodeAt(i) ^ 0xdc00);
                } else if (!utf8 && c >>> 8) {
                    throw new Error("Wide characters are not allowed.");
                }

                if (!utf8 || c <= 0x7f) {
                    bytes[j++] = c;
                } else if (c <= 0x7ff) {
                    bytes[j++] = 0xc0 | (c >> 6);
                    bytes[j++] = 0x80 | (c & 0x3f);
                } else if (c <= 0xffff) {
                    bytes[j++] = 0xe0 | (c >> 12);
                    bytes[j++] = 0x80 | (c >> 6 & 0x3f);
                    bytes[j++] = 0x80 | (c & 0x3f);
                } else {
                    bytes[j++] = 0xf0 | (c >> 18);
                    bytes[j++] = 0x80 | (c >> 12 & 0x3f);
                    bytes[j++] = 0x80 | (c >> 6 & 0x3f);
                    bytes[j++] = 0x80 | (c & 0x3f);
                }
            }

            return bytes.subarray(0, j);
        }
    }
    if (!w.Locust.Convert.BytesToBase64String) {
        w.Locust.Convert.BytesToBase64String = function (arr) {
            return btoa(w.Locust.Convert.BytesToString(arr));
        }
    }
    if (!w.Locust.Convert.Base64StringToBytes) {
        w.Locust.Convert.Base64StringToBytes = function (str) {
            return w.Locust.Convert.StringToBytes(atob(str));
        }
    }
	if (!w.Locust.ToXml) {
        w.Locust.ToXml = function (json) {
            var doc = w.jQuery.parseXML("<xml/>");
            var xml = doc.getElementsByTagName("xml")[0];
            var key, elem;

            for (key in json) {
                if (key && json.hasOwnProperty(key)) {
                    elem = doc.createElement(key);
                    w.jQuery(elem).text(json[key]);
                    xml.appendChild(elem);
                }
            }

            return xml;
        }
    }
	if (w.$c == undefined) {
		w.$c = w.Locust.Convert;
	}
})(__locustMainContext);
