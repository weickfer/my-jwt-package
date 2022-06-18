"use strict";
exports.__esModule = true;
exports.toMs = void 0;
var times = {
    s: 1,
    m: 60,
    h: 60 * 60,
    d: 60 * 60 * 24,
    w: 60 * 60 * 24 * 7,
    M: 60 * 60 * 24 * 30,
    y: 60 * 60 * 24 * 365
};
function toMs(value) {
    var unit = Object.keys(times).find(function (key) { return value.endsWith(key); });
    if (!unit) {
        return 0;
    }
    var amount = value.replace(unit, '').toLocaleLowerCase();
    // verify if amount have letter
    if (/[a-z]/i.test(amount)) {
        return 0;
    }
    var multiplier = times[unit];
    return multiplier * Number(amount);
}
exports.toMs = toMs;
