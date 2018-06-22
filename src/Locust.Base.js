(function (w) {
	if (!w) {
        throw "Locust.Base: no context given. aborting.";
		
        return;
    }
    if (!w.Locust) {
        w.Locust = { };
    }
    if (!w.Locust.Name) {
        w.Locust.Name = "Locust";
    }
    if (!w.Locust.Version) {
        w.Locust.Version = "1.1.0";
    }
    if (!w.Locust.isEmpty || typeof w.Locust.isEmpty != "function") {
        w.Locust.isEmpty = function(x) {
            if (!x)
                return true;

            for (var key in x) {
                return !x.hasOwnProperty(key);
            }

            return true;
        };
    }
    
	w.$$ = w.Locust;
})(__locustMainContext);
