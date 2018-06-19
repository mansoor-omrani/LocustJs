// ------------------------ String extensions -----------------------------//
var StringSplitOptions =
{
    None: 0,
    RemoveEmptyEntries: 1,
    TrimEntries: 2,
    TrimAndRemoveEmptyEntries: 3,
    ToLowerEntries: 4,
    TrimToLowerAndRemoveEmptyEntries: 5,
    ToUpperEntries: 6,
    TrimToUpperAndRemoveEmptyEntries: 7
};
String.prototype.replaceAll = function (find, replace) {
    var str = this;
    return str.replace(new RegExp(find.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&'), 'g'), replace);
};
String.prototype.reverse = function () {
    return this.split("").reverse().join("");
};
if (!String.prototype.ltrim) {
    String.prototype.ltrim = function () { return this.replace(/^\s+/, ''); };
};
if (!String.prototype.rtrim) {
    String.prototype.rtrim = function () { return this.replace(/\s+$/, ''); };
};
String.prototype.toBytes = function () {
    var data = [];
    for (var i = 0; i < this.length; i++) {
        data.push(this.charCodeAt(i));
    }
    return data;
};
String.prototype.format = function (arrValues) {
    var s = this;

    if ($.isArray(arrValues)) {
        $(arrValues).each(function (i, value) {
            s = s.replaceAll("{" + i + "}", value);
        })
    }

    return s;
};
String.prototype.isPunctuation = function () {
    var __punctutationChars = ".,;:?!()-'\"/\\{}[]%#";

    return this && this.length == 1 && (__punctutationChars.indexOf(this) >= 0);
};
String.prototype.isControl = function () {
    var __chars = "~!@#$%^&*()_+|<>?:\"{}[];',./-=\\`";

    return this && this.length == 1 && (__chars.indexOf(this) >= 0);
};
String.prototype.isAlpha = function () {
    if (!this || this.length != 1)
        return false;
    var code = this.charCodeAt(0);
    return (code >= 65 && code <= 90) || (code >= 97 && code <= 122);
};
String.prototype.isLetter = function () {
    return this.isAlpha();
};
String.prototype.isLower = function () {
    if (!this || this.length != 1)
        return false;
    var code = this.charCodeAt(0);
    return (code >= 97 && code <= 122);
};
String.prototype.isUpper = function () {
    if (!this || this.length != 1)
        return false;
    var code = this.charCodeAt(0);
    return (code >= 65 && code <= 90);
};
String.prototype.isDigit = function () {
    if (!this || this.length != 1)
        return false;
    var code = this.charCodeAt(0);
    return (code >= 48 && code <= 57);
};
String.prototype.isAlphaNum = function () {
    return this.isAlpha() || this.isDigit();
};
String.prototype.isArithmatic = function () {
    var __chars = "/\\+-()%^*";

    return this && this.length == 1 && (__chars.indexOf(this) >= 0);
};
String.prototype.isLogic = function () {
    var __items = ["&&", "||", "!"];

    return this && this.length == 1 && (__items.indexOf(this) >= 0);
};
String.prototype.isBitwise = function () {
    var __items = ["&", "|", ">>", "<<"];

    return this && (this.length == 1 || this.length == 2) && (__items.indexOf(this) >= 0);
};
String.prototype.isComparison = function () {
    var __items = ["==", "!=", "<>", ">", "<", ">=", "<="];

    return this && (this.length == 1 || this.length == 2) && (__items.indexOf(this) >= 0);
};
String.prototype.isWhitespace = function () {
    return this && this.length == 1 && (this == '\r' || this == '\n' || this == ' ' || this == '\t' || this == '\v');
};
String.prototype.isMath = function () {
    return this.isArithmatic() || this.isLogic() || this.isBitwise() || this.isComparison();
};
String.prototype.splitString = function (separator, splitOptions) {
    var result = [];
    var arr = this.split(separator);
    i = 0;
    while (i < arr.length) {
        var _item;
        var item = arr[i++];
        switch (splitOptions) {
            case StringSplitOptions.RemoveEmptyEntries: if (item) result.push(item); break;
            case StringSplitOptions.TrimEntries: result.push((item || "").trim()); break;
            case StringSplitOptions.TrimAndRemoveEmptyEntries:
                _item = (item || "").toString().trim();
                if (_item)
                    result.push(_item);
                break;
            case StringSplitOptions.ToLowerEntries: result.push((item || "").toString().toLowerCase()); break;
            case StringSplitOptions.TrimToLowerAndRemoveEmptyEntries:
                _item = (item || "").toString().trim().toLowerCase();
                if (_item)
                    result.push(_item);
                break;
            case StringSplitOptions.ToUpperEntries: result.push((item || "").toString().toUpperCase()); break;
            case StringSplitOptions.TrimToUpperAndRemoveEmptyEntries:
                _item = (item || "").toString().trim().toUpperCase();
                if (_item)
                    result.push(_item);
                break;
            default: result.push(item); break;
        }
    }
    return result;
};