"use strict";
exports.__esModule = true;
exports.toBase64 = exports.fromBase64 = exports.base64urlDecode = exports.base64url = void 0;
function base64url(string, encoding) {
    return Buffer
        .from(string, encoding)
        .toString('base64')
        .replace(/=/g, '')
        .replace(/\+/g, '-')
        .replace(/\//g, '_');
}
exports.base64url = base64url;
function base64urlDecode(str) {
    return Buffer.from(str, 'base64').toString('utf8');
}
exports.base64urlDecode = base64urlDecode;
function fromBase64(base64) {
    return base64
        .replace(/=/g, '')
        .replace(/\+/g, '-')
        .replace(/\//g, '_');
}
exports.fromBase64 = fromBase64;
function toBase64(base64url) {
    base64url = base64url.toString();
    var padding = 4 - base64url.length % 4;
    if (padding !== 4) {
        for (var i = 0; i < padding; ++i) {
            base64url += '=';
        }
    }
    return base64url
        .replace(/\-/g, '+')
        .replace(/_/g, '/');
}
exports.toBase64 = toBase64;
