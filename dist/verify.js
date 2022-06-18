"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
exports.verifyToken = void 0;
var decode_1 = require("./decode");
var getStrategy_1 = require("./strategies/getStrategy");
function verifyToken(token, secretOrPublicKey) {
    var _a = (0, decode_1.decodeToken)(token), header = _a.header, payload = _a.payload, signature = _a.signature;
    var strategy = (0, getStrategy_1.getStrategy)(header.alg);
    var now = Date.now() / 1000;
    if (now > payload.exp) {
        throw new Error("Token expired");
    }
    var securedInput = token.split('.', 2).join('.');
    var isValid = strategy.verifier(securedInput, signature, secretOrPublicKey);
    if (!isValid) {
        throw new Error("Token signature is invalid");
    }
    return __assign(__assign({}, payload), header);
}
exports.verifyToken = verifyToken;
