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
exports.createSignedToken = void 0;
var ms_1 = require("./utils/ms");
var base64_1 = require("./utils/base64");
var string_1 = require("./utils/string");
var getStrategy_1 = require("./strategies/getStrategy");
var object_1 = require("./utils/object");
var defaultSignOptions = {
    algorithm: 'HS256',
    noTimestamp: false
};
function getExpiresIn(iat, expiresIn) {
    var exp = 0;
    if (typeof expiresIn === 'number') {
        exp = iat + expiresIn;
    }
    if (typeof expiresIn === 'string') {
        var milliseconds = (0, ms_1.toMs)(expiresIn);
        exp = iat + milliseconds;
    }
    return exp;
}
function createSecuredInput(header, payload, payloadEncoding) {
    if (payloadEncoding === void 0) { payloadEncoding = 'utf8'; }
    var encodedHeader = (0, base64_1.base64url)((0, string_1.toString)(header), 'binary');
    var encodedPayload = (0, base64_1.base64url)((0, string_1.toString)(payload), payloadEncoding);
    return "".concat(encodedHeader, ".").concat(encodedPayload);
}
function createTokenData(options) {
    var iat = Math.floor(Date.now() / 1000);
    var header = (0, object_1.deleteFalsyFields)({
        typ: 'JWT',
        alg: options.algorithm,
        kid: options.keyId
    });
    var payload = (0, object_1.deleteFalsyFields)({
        iat: options.noTimestamp ? undefined : iat,
        exp: getExpiresIn(iat, options.expiresIn || '1h'),
        jti: options.jwtId,
        aud: options.audience,
        iss: options.issuer,
        sub: options.subject
    });
    return { header: header, payload: payload };
}
function createSignedToken(payload, secretOrPrivateKey, options) {
    options = Object.assign(defaultSignOptions, options || {});
    if (!options)
        return;
    var _a = createTokenData(options), header = _a.header, _payload = _a.payload;
    var securedInput = createSecuredInput(header, __assign(__assign({}, _payload), payload));
    var strategy = (0, getStrategy_1.getStrategy)(options.algorithm);
    var signature = strategy.signer(securedInput, secretOrPrivateKey);
    return "".concat(securedInput, ".").concat(signature);
}
exports.createSignedToken = createSignedToken;
