// ------------------------ Array extensions -----------------------------//
Array.prototype.clone = function () {
    return this.slice(0);
};
// https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
Array.prototype.shuffle = function () {
    var currentIndex = this.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = this[currentIndex];
        this[currentIndex] = this[randomIndex];
        this[randomIndex] = temporaryValue;
    }

    return this;
};
Array.prototype.insertAt = function (index, item) {
    return this.splice(index, 0, item);
};
Array.prototype.removeAt = function (index) {
    return this.splice(index, 1)[0];
};