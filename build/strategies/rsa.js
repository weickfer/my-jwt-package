"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RsaStrategy = void 0;

var _nodeCrypto = require("node:crypto");

var _base = require("../utils/base64");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

var RsaStrategy = /*#__PURE__*/function () {
  function RsaStrategy() {
    _classCallCheck(this, RsaStrategy);
  }

  _createClass(RsaStrategy, [{
    key: "signer",
    value: function signer(bits) {
      return function (input, privateKey) {
        var signature = (0, _nodeCrypto.createSign)("RSA-SHA".concat(bits)).update(input).sign(privateKey, 'base64');
        return (0, _base.fromBase64)(signature);
      };
    }
  }, {
    key: "verifier",
    value: function verifier(bits) {
      return function (input, signature, publicKey) {
        var verifier = (0, _nodeCrypto.createVerify)("RSA-SHA".concat(bits)).update(input);
        return verifier.verify(publicKey, (0, _base.toBase64)(signature), 'base64');
      };
    }
  }]);

  return RsaStrategy;
}();

exports.RsaStrategy = RsaStrategy;