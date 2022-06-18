"use strict";
exports.__esModule = true;
exports.secureCompare = void 0;
var crypto = require("node:crypto");
function secureCompare(_a, _b) {
    var a = Buffer.from(_a);
    var b = Buffer.from(_b);
    if (a.length !== b.length) {
        return false;
    }
    if (crypto.timingSafeEqual) {
        return crypto.timingSafeEqual(a, b);
    }
    var result = 0;
    for (var i = 0; i < a.length; i += 1) {
        /* eslint-disable no-bitwise */
        result |= a[i] ^ b[i];
    }
    return result === 0;
}
exports.secureCompare = secureCompare;
