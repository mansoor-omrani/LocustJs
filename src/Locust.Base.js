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
        w.Locust.Version = "1.4.8";
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
    
	w.Locust.eachKey = function (obj, callback) {
		var _keys = Object.keys(obj);
		var result;
		
		if (typeof callback == "function") {
			for (var i = 0; i < _keys.length; i++) {
				var r = callback(_keys[i], i);
				
				if (r != undefined && r != null && r.toString() != "") {
					result = r;
					
					break;
				}
			}
		}
		
		return result;
	}
	
	w.Locust.readyFns = [];
	w.Locust.onready = function (fn) {
	    if (typeof fn == "function") {
	        w.Locust.readyFns.push(fn);
	    }
	};

	w.Locust.ready = function () {
	    for (var i = 0; i < w.Locust.readyFns.length; i++) {
	        w.Locust.readyFns[i]();
	    }
	};
	
	w.$$ = w.Locust;
})(__locustMainContext);
