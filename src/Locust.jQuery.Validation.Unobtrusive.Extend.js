//================================= Locust.jQuery.Validation.Extend =================================
(function (w) {
    function __error(msg) {
		if (w.console && w.console.error) {
			w.console.error(msg);
		} else {
			throw msg;
		}
	};
	if (!w) {
        throw "Locust.jQuery.Validation.Unobtrusive.Extend: no context given (use 'Locust.Base.js')";
    }
    if (!w.Locust) {
		__error("Locust.jQuery.Validation.Unobtrusive.Extend: Locust namespace not found (use 'Locust.Base.js')");
		return;
    }
	if (!w.Locust.Logging) {
		__error("Locust.jQuery.Validation.Unobtrusive.Extend: Locust.Logging namespace not found (use 'Locust.Logging.js')");
		return;
	}
    if (!w.jQuery) {
        __error("Locust.jQuery.Validation.Unobtrusive.Extend: jQuery library not found");
        return;
    };
    (function ($) {
		var _logger = w.Locust.getLogger();
		
		// source: http://jasonwatmore.com/post/2013/10/16/aspnet-mvc-required-checkbox-with-data-annotations
		$(function () {
			if ($.validator && $.validator.methods) {
				var defaultRangeValidator = $.validator.methods.range;
				$.validator.methods.range = function (value, element, param) {
					if (element.type === 'checkbox') {
						// if it's a checkbox return true if it is checked
						return element.checked;
					} else {
						// otherwise run the default validation function
						return defaultRangeValidator.call(this, value, element, param);
					}
				}
			} else {
				_logger.fail("Locust.jQuery.Validation.Unobtrusive.Extend: jQuery-validation not found.");
			}
		});
    })(w.jQuery);
})(__locustMainContext);
