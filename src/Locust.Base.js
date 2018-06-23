//================================= Locust.Base =================================
(function (w) {
	if (!w) {
        throw "Locust.Base: no context given. aborting.";
    }
    if (!w.Locust) {
        w.Locust = { };
    }
    if (!w.Locust.Name) {
        w.Locust.Name = "Locust";
    }
    if (!w.Locust.Version) {
        w.Locust.Version = "1.2.4";
    }
    if (!w.Locust.isEmpty || typeof w.Locust.isEmpty != "function") {
        w.Locust.isEmpty = function(x) {
            if (x == undefined || x == null) {
                return true;
			}
			
            for (var key in x) {
                if (x.hasOwnProperty(key)) {
					return false;
				}
            }

            return true;
        };
    }
    
	w.$$ = w.Locust;
})(__locustMainContext);
