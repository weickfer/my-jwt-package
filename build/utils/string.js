"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.hasBufferOrString = hasBufferOrString;
exports.normalizeInput = normalizeInput;
exports.splitAlgorithmNameBits = splitAlgorithmNameBits;
exports.toString = toString;

function splitAlgorithmNameBits(algorithm) {
  return [algorithm.slice(0, 2).toUpperCase(), algorithm.slice(2)];
}

function toString(obj) {
  if (typeof obj === 'string') {
    return obj;
  }

  if (typeof obj === 'number' || Buffer.isBuffer(obj)) {
    return obj.toString();
  }

  return JSON.stringify(obj);
}

function hasBufferOrString(obj) {
  return Buffer.isBuffer(obj) || typeof obj === 'string';
}

function normalizeInput(thing) {
  if (hasBufferOrString(thing)) {
    return thing;
  }

  return JSON.stringify(thing);
}