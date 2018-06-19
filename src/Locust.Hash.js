(function (w) {
    if (!w) {
        console.log("Locust.Hash: no context given (use 'Locust.Base.js')");
        return;
    }
    if (!w.Locust) {
        console.log("Locust.Hash: Locust namespace not found (use 'Locust.Base.js')");
        return;
    }
    if (!w.Locust.Page) {
        w.Locust.Page = {}
    }

    w.Locust.Page.HashClass = function (paramSeparator, keyValueSeparator) {
        var hash = {};
        var generateHash = function (arg) {
            var result = "";
            for (var property in arg) {
                if (arg.hasOwnProperty(property)) {
                    result += paramSeparator + property + keyValueSeparator + arg[property];
                }
            }
            return result.substr(1);
        }
        var getHash = function () {
            return window.location.hash;
        }
        var setHash = function (arg) {
            window.location.hash = arg;
        }
        if (!paramSeparator) {
            paramSeparator = '&';
        }
        if (!keyValueSeparator) {
            keyValueSeparator = '=';
        }

        getHash().substr(1).split(paramSeparator).forEach(function (item, index) {
            var i = item.indexOf(keyValueSeparator);
            if (i > 0) {
                hash[item.substr(0, i).trim()] = item.substr(i + 1).trim();
            } else {
                var key = item.replace(keyValueSeparator, "");
                if (key) {
                    hash[key] = "";
                }
            }
        });
        this.GetString = function () {
            return generateHash(hash);
        };
        this.Get = function (arg) {
            if (typeof arg == "undefined") {
                return hash;
            }
            if (typeof arg == 'string') {
                return hash[arg];
            }
            if (typeof arg == 'number') {
                var i = 0;
                for (var property in hash) {
                    if (hash.hasOwnProperty(property)) {
                        if (arg == i++) {
                            return hash[property];
                        }
                    }
                }

                return "";
            }
        };
        this.Set = function (key, value) {
            if (value) {
                if (key) {
                    hash[key] = value;
                    setHash(generateHash(hash));
                    return getHash();
                } else {
                    return null;
                }
            }
            if (typeof key == 'string') {
                hash[key] = "";
                setHash(generateHash(hash));
                return getHash();
            }
            if (typeof key == 'object') {
                hash = key;
                setHash(generateHash(key));
                return getHash();
            }
        };
    }

    w.Locust.Page.Hash = new w.Locust.Page.HashClass();
})(__locustMainContext);
