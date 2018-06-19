Math.roundBy = function (n, decimalPlaces) {
    var scale = Math.pow(10, decimalPlaces);
    return Math.round(scale * n) / scale;
};