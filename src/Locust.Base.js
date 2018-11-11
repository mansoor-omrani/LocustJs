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
        w.Locust.Version = "1.5.1";
    }
	if (!w.jQuery) {
        console.log("Locust.Base: jQuery library not found");
        return;
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
			    var r = callback(_keys[i], i, _keys.length);
				
				if (r != undefined && r != null && r.toString() != "") {
					result = r;
					
					break;
				}
			}
		}
		
		return result;
	}
	
	w.Locust.toArray = function (obj) {
	    var result = [];

		if (obj != undefined) {
			if (w.jQuery.isPlainObject(obj)) {
				w.Locust.eachKey(obj, function (key, i) {
					result.push(obj[key]);
				});
			} else {
				result.push(obj);
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
