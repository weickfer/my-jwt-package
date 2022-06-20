"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.toMs = toMs;
var times = {
  s: 1,
  // second
  m: 60,
  // minute
  h: 60 * 60,
  // hour
  d: 60 * 60 * 24,
  // day
  w: 60 * 60 * 24 * 7,
  // week
  M: 60 * 60 * 24 * 30,
  // month
  y: 60 * 60 * 24 * 365 // year

};

function toMs(value) {
  var unit = Object.keys(times).find(function (key) {
    return value.endsWith(key);
  });

  if (!unit) {
    return 0;
  }

  var amount = value.replace(unit, '').toLocaleLowerCase(); // verify if amount have letter

  if (/[a-z]/i.test(amount)) {
    return 0;
  }

  var multiplier = times[unit];
  return multiplier * Number(amount);
}