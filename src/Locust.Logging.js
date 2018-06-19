(function (w) {
    if (!w) {
        console.log("Locust.Logging: no context given (use 'Locust.Base.js')");
        return;
    }
    if (!w.Locust) {
        console.log("Locust.Logging: Locust namespace not found (use 'Locust.Base.js')");
        return;
    }
    if (!w.Locust.Logging) {
        w.Locust.Logging = {};
    }
    w.Locust.Logging.ConsoleLogger = function () {
        this.log = function (category, message) {
            console.log((category ? category + (message ? ": " + message : "") : message));
        }
    }
})(__locustMainContext);
