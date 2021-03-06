﻿//================================= Locust.jQuery.Extend =================================
(function (w) {
    function __error(msg) {
		if (w.console && w.console.error) {
			w.console.error(msg);
		} else {
			throw msg;
		}
	};
	if (!w) {
        throw "Locust.jQuery.Extend: no context given (use 'Locust.Base.js')";
    }
    if (!w.Locust) {
		__error("Locust.jQuery.Extend: Locust namespace not found (use 'Locust.Base.js')");
		return;
    }
    if (!w.jQuery) {
        __error("Locust.jQuery.Extend: jQuery library not found");
        return;
    }
    (function ($) {
        $.fn.disableSelection = function () {
            return this
                     .attr('unselectable', 'on')
                     .css('user-select', 'none')
                     .on('selectstart', false);
        };
        $.fn.visible = function () {
            return this.css('visibility', 'visible');
        };

        $.fn.invisible = function () {
            return this.css('visibility', 'hidden');
        };
        $.fn.swapClass = function (class1, class2, fnSwap) {
            var _this = $(this);
            if (_this.hasClass(class1)) {
                _this.removeClass(class1);
                _this.addClass(class2);
                if ($.isFunction(fnSwap)) {
                    fnSwap(true);
                }
            } else {
                _this.removeClass(class2);
                _this.addClass(class1);
                if ($.isFunction(fnSwap)) {
                    fnSwap(false);
                }
            }
        }
        $.fn.visibilityToggle = function () {
            return this.css('visibility', function (i, visibility) {
                return (visibility == 'visible') ? 'hidden' : 'visible';
            });
        };
        $.fn.getPostData = function () {
            var result;
            var data = $(this).data();
            result = data['post'];
            if ($.isPlainObject(result))
                return result;
            result = {};
            $.each(data, function (propName, propValue) {
                if (propName.length > 4 && propName.substring(0, 4) == "post") {
                    result[propName.substring(4)] = propValue;
                }
            });
            return result;
        };
        $.fn.post = function (data, target) {
            var element = $(this);
            if (element.length == 1) {
                //if (element[0].tagName.toLowerCase() == "a") {
                    var postData = element.getPostData();

                    $.extend(postData, data);

                    if (target == undefined && postData.target != undefined) {
                        target = postData.target;
                        delete postData["target"];
                    }

                    var url = element.attr("href");

                    if (!url || url == "#") {
                        url = postData.url;
                        delete postData["url"];
                    }

                    if (url) {
                        w.Locust.Form.post(url, postData, target);
                    }
                //}
            }
        };
        $.fn.loadPost = function (url, data, success, dataType) {
            var element = $(this);
            var _config = { url: url };

            if (success && !$.isFunction(success)) {
                _config.data = success;
            } else {
                if (data && !$.isFunction(data)) {
                    _config.data = data;
                }
            }
            if (dataType) {
                _config.dataType = dataType;
            }

            $.post(_config).done(function (result) {
                element.html(result);

                if (data && $.isFunction(data)) {
                    _config.success = data;
                } else {
                    if (success && $.isFunction(success)) {
                        _config.success = success;
                    }
                }

                if (_config.success) {
                    _config.success(result);
                }
            });
        };
		$.fn.secureClick = function (config) {
            var _config = {
                key: "xpr",
                onValue: "1",
                offValue: "l",
                click: null
            };
            
            if ($.isFunction(config)) {
                _config.click = config;
            } else {
                if ($.isPlainObject(config)) {
                    _config = $.extend({}, _config, config);
                }
            }

            return $(this).each(function (i, x) {
                var _this = $(x);

                _this.on("mouseover", function () {
                    _this.data(_config.key, _config.onValue);
                }).on("mouseout", function () {
                    _this.data(_config.key, _config.offValue);
                }).click(function (e) {
                    if (_this.data(_config.key) == _config.onValue) {
                        if ($.isFunction(_config.click)) {
                            _config.click.call(_this, e);
                        }
                    }
                });
            });
        }
    })(w.jQuery);
})(__locustMainContext);
