"use strict";
exports.__esModule = true;
exports.decodeToken = void 0;
var object_1 = require("./utils/object");
var base64_1 = require("./utils/base64");
var tokenRegex = /^[a-zA-Z0-9\-_]+?\.[a-zA-Z0-9\-_]+?\.([a-zA-Z0-9\-_]+)?$/;
function decodeToken(token) {
    if (!tokenRegex.test(token)) {
        throw new Error('Invalid token format');
    }
    var _a = token.split('.'), header = _a[0], payload = _a[1], signature = _a[2];
    var headerJson = (0, base64_1.base64urlDecode)(header);
    var payloadJson = (0, base64_1.base64urlDecode)(payload);
    return {
        header: (0, object_1.safeJsonParse)(headerJson),
        payload: (0, object_1.safeJsonParse)(payloadJson),
        signature: signature
    };
}
exports.decodeToken = decodeToken;
