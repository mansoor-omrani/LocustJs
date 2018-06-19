(function (w) {
    if (!w) {
        console.log("Locust.jQuery.Extend: no context given (use 'Locust.Base.js')");
        return;
    }
    if (!w.Locust) {
        console.log("Locust.jQuery.Extend: Locust namespace not found (use 'Locust.Base.js')");
        return;
    }
    if (!w.jQuery) {
        console.log("Locust.jQuery.Extend: jQuery library not found");
        return;
    };
    (function ($) {
        // source: http://jasonwatmore.com/post/2013/10/16/aspnet-mvc-required-checkbox-with-data-annotations
        $(function () {
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
        });
    })(w.jQuery);
})(__locustMainContext);
