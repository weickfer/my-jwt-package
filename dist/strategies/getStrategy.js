"use strict";
exports.__esModule = true;
exports.getStrategy = void 0;
var hmac_1 = require("./hmac");
var rsa_1 = require("./rsa");
var supportedAlgorithms = ['HS', 'RS'];
var supportedBits = ['256', '384', '512'];
var regex = new RegExp("^(".concat(supportedAlgorithms.join('|'), ")(").concat(supportedBits.join('|'), ")$"));
var strategies = {
    HS: new hmac_1.HmacSignature(),
    RS: new rsa_1.RsaStrategy()
};
function getStrategy(algorithm) {
    // regex to match the algorithm name and bits
    var match = regex.exec(algorithm);
    if (!match) {
        throw new Error("Unsupported algorithm: ".concat(algorithm));
    }
    var name = match[1], bits = match[2];
    return {
        signer: strategies[name].signer(bits),
        verifier: strategies[name].verifier(bits)
    };
}
exports.getStrategy = getStrategy;
