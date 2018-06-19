(function (w) {
    if (!w) {
        console.log("Locust.Form: no context given (use 'Locust.Base.js')");
        return;
    }
    if (!w.Locust) {
        console.log("Locust.Form: Locust namespace not found (use 'Locust.Base.js')");
        return;
    }
    if (!w.Locust.Form) {
        w.Locust.Form = {};
    }
    Locust.Form.post = function (url, args) {
        var f = $("form").attr('method', 'POST').attr('action', url).insertAfter($("body"));
        $.each(args, function (propName, propValue) {
            $('<input>').attr('type', 'hidden').attr('name', propName).val(propValue).appendTo(f);
        });
        f.submit();
    }
})(__locustMainContext);
