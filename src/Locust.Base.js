var __locustMainContext = window;

(function (w) {
    if (!w.$$) {
        w.$$ = { };
    }
    if (!w.$$.Name) {
        w.$$.Name = "Locust";
    }
    if (!w.$$.Version) {
        w.$$.Version = "1.0.0";
    }
    if (!w.$$.isEmpty || typeof w.$$.isEmpty != "function") {
        w.$$.isEmpty = function(x) {
            if (!x)
                return true;

            for (var key in x) {
                return !x.hasOwnProperty(key);
            }

            return true;
        };
    }
    w.Locust = w.$$;
})(__locustMainContext);
