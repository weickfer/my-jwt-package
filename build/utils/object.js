"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.deleteFalsyFields = deleteFalsyFields;
exports.hasObject = hasObject;
exports.safeJsonParse = safeJsonParse;

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

function deleteFalsyFields(obj) {
  for (var key in obj) {
    if (!obj[key]) {
      delete obj[key];
    }
  }

  return obj;
}

function hasObject(thing) {
  return _typeof(thing) === 'object' && thing !== null;
}

function safeJsonParse(thing) {
  if (hasObject(thing)) {
    return thing;
  }

  try {
    return JSON.parse(thing);
  } catch (_unused) {
    return undefined;
  }
}