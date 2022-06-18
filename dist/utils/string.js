"use strict";
exports.__esModule = true;
exports.normalizeInput = exports.hasBufferOrString = exports.toString = exports.splitAlgorithmNameBits = void 0;
function splitAlgorithmNameBits(algorithm) {
    return [
        algorithm.slice(0, 2).toUpperCase(),
        algorithm.slice(2)
    ];
}
exports.splitAlgorithmNameBits = splitAlgorithmNameBits;
function toString(obj) {
    if (typeof obj === 'string') {
        return obj;
    }
    if (typeof obj === 'number' || Buffer.isBuffer(obj)) {
        return obj.toString();
    }
    return JSON.stringify(obj);
}
exports.toString = toString;
function hasBufferOrString(obj) {
    return Buffer.isBuffer(obj) || typeof obj === 'string';
}
exports.hasBufferOrString = hasBufferOrString;
function normalizeInput(thing) {
    if (hasBufferOrString(thing)) {
        return thing;
    }
    return JSON.stringify(thing);
}
exports.normalizeInput = normalizeInput;
