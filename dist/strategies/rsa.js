"use strict";
exports.__esModule = true;
exports.RsaStrategy = void 0;
var node_crypto_1 = require("node:crypto");
var base64_1 = require("../utils/base64");
var RsaStrategy = /** @class */ (function () {
    function RsaStrategy() {
    }
    RsaStrategy.prototype.signer = function (bits) {
        return function (input, privateKey) {
            var signature = (0, node_crypto_1.createSign)("RSA-SHA".concat(bits))
                .update(input)
                .sign(privateKey, 'base64');
            return (0, base64_1.fromBase64)(signature);
        };
    };
    RsaStrategy.prototype.verifier = function (bits) {
        return function (input, signature, publicKey) {
            var verifier = (0, node_crypto_1.createVerify)("RSA-SHA".concat(bits)).update(input);
            return verifier.verify(publicKey, (0, base64_1.toBase64)(signature), 'base64');
        };
    };
    return RsaStrategy;
}());
exports.RsaStrategy = RsaStrategy;
