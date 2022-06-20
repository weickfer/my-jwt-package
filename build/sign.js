"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createSignedToken = createSignedToken;

var _ms = require("./utils/ms");

var _base = require("./utils/base64");

var _string = require("./utils/string");

var _getStrategy = require("./strategies/getStrategy");

var _object = require("./utils/object");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

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
    var milliseconds = (0, _ms.toMs)(expiresIn);
    exp = iat + milliseconds;
  }

  return exp;
}

function createSecuredInput(header, payload) {
  var payloadEncoding = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'utf8';
  var encodedHeader = (0, _base.base64url)((0, _string.toString)(header), 'binary');
  var encodedPayload = (0, _base.base64url)((0, _string.toString)(payload), payloadEncoding);
  return "".concat(encodedHeader, ".").concat(encodedPayload);
}

function createTokenData(options) {
  var iat = Math.floor(Date.now() / 1000);
  var header = (0, _object.deleteFalsyFields)({
    typ: 'JWT',
    alg: options.algorithm,
    kid: options.keyId
  });
  var payload = (0, _object.deleteFalsyFields)({
    iat: options.noTimestamp ? undefined : iat,
    exp: getExpiresIn(iat, options.expiresIn || '1h'),
    jti: options.jwtId,
    aud: options.audience,
    iss: options.issuer,
    sub: options.subject
  });
  return {
    header: header,
    payload: payload
  };
}

function createSignedToken(payload, secretOrPrivateKey, options) {
  options = Object.assign(defaultSignOptions, options || {});
  if (!options) return;

  var _createTokenData = createTokenData(options),
      header = _createTokenData.header,
      _payload = _createTokenData.payload;

  var securedInput = createSecuredInput(header, _objectSpread(_objectSpread({}, _payload), payload));
  var strategy = (0, _getStrategy.getStrategy)(options.algorithm);
  var signature = strategy.signer(securedInput, secretOrPrivateKey);
  return "".concat(securedInput, ".").concat(signature);
}