"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.base64url = base64url;
exports.base64urlDecode = base64urlDecode;
exports.fromBase64 = fromBase64;
exports.toBase64 = toBase64;

function base64url(string, encoding) {
  return Buffer.from(string, encoding).toString('base64').replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_');
}

function base64urlDecode(str) {
  return Buffer.from(str, 'base64').toString('utf8');
}

function fromBase64(base64) {
  return base64.replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_');
}

function toBase64(base64url) {
  base64url = base64url.toString();
  var padding = 4 - base64url.length % 4;

  if (padding !== 4) {
    for (var i = 0; i < padding; ++i) {
      base64url += '=';
    }
  }

  return base64url.replace(/\-/g, '+').replace(/_/g, '/');
}