"use strict";
exports.__esModule = true;
exports.HmacSignature = void 0;
var node_crypto_1 = require("node:crypto");
var buffer_1 = require("../utils/buffer");
var base64_1 = require("../utils/base64");
var HmacSignature = /** @class */ (function () {
    function HmacSignature() {
    }
    HmacSignature.prototype.signer = function (bits) {
        return function (input, secret) {
            var signature = (0, node_crypto_1.createHmac)("sha".concat(bits), secret)
                .update(input)
                .digest('base64');
            return (0, base64_1.fromBase64)(signature);
        };
    };
    HmacSignature.prototype.verifier = function (bits) {
        var signer = this.signer(bits);
        return function (input, signature, secret) {
            var computedSignature = signer(input, secret);
            return (0, buffer_1.secureCompare)(computedSignature, signature);
        };
    };
    return HmacSignature;
}());
exports.HmacSignature = HmacSignature;
